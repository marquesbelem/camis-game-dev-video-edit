#!/usr/bin/env python3
"""
tratar_audio.py
Skill: tratar-audio-video

Trata e melhora o áudio de arquivos de vídeo 100% localmente usando FFmpeg e DeepFilterNet:
1. Verifica se FFmpeg e deepfilternet estão instalados (instala o que faltar automaticamente).
2. Extrai a faixa de áudio do vídeo original em WAV (48kHz).
3. Aplica o modelo de IA DeepFilterNet para remover ruídos de fundo e limpar a voz.
4. Usa o filtro loudnorm do FFmpeg para nivelar o volume para -16 LUFS.
5. Mescla o áudio tratado de volta ao vídeo sem re-encodar o vídeo (-c:v copy),
   salvando com o sufixo "_tratado.mp4".
"""

import sys
import os
import shutil
import subprocess
import argparse
from pathlib import Path
import tempfile


def check_and_reexec_compatible_python():
    """
    O DeepFilterLib possui wheels pré-compilados para Windows em Python 3.9, 3.10 e 3.11.
    Se estiver rodando no Python >= 3.12 sem a biblioteca 'df' disponível, tenta
    automaticamente re-executar usando um interpretador compatível instalado no sistema (ex: py -3.9).
    """
    try:
        import df  # noqa: F401
        return  # Já está em ambiente com DeepFilterNet disponível
    except ImportError:
        pass

    if sys.version_info >= (3, 12):
        print(f"[tratar-audio] Python atual é {sys.version.split()[0]}. Verificando interpretador compatível (3.9-3.11)...")
        candidates = [
            ["py", "-3.9"],
            ["py", "-3.10"],
            ["py", "-3.11"],
            [os.path.expandvars(r"%LOCALAPPDATA%\Programs\Python\Python39\python.exe")],
            [os.path.expandvars(r"%LOCALAPPDATA%\Programs\Python\Python310\python.exe")],
            [os.path.expandvars(r"%LOCALAPPDATA%\Programs\Python\Python311\python.exe")],
        ]
        for candidate in candidates:
            cmd = candidate if isinstance(candidate, list) else [candidate]
            if not os.path.isabs(cmd[0]):
                which_cmd = shutil.which(cmd[0])
                if not which_cmd:
                    continue
            else:
                if not os.path.exists(cmd[0]):
                    continue
            try:
                res = subprocess.run([*cmd, "-c", "import sys; print(sys.version)"], capture_output=True, text=True)
                if res.returncode == 0:
                    print(f"[tratar-audio] Re-executando com {candidate}...")
                    run_res = subprocess.run([*cmd, __file__, *sys.argv[1:]])
                    sys.exit(run_res.returncode)
            except Exception:
                continue


def ensure_ffmpeg() -> str:
    """Localiza ou instala o executável do FFmpeg."""
    # 1. PATH do sistema
    ffmpeg_on_path = shutil.which("ffmpeg")
    if ffmpeg_on_path:
        return ffmpeg_on_path

    # 2. imageio_ffmpeg
    try:
        import imageio_ffmpeg
        return imageio_ffmpeg.get_ffmpeg_exe()
    except ImportError:
        pass

    # 3. node_modules local ffmpeg-static
    workspace_ffmpeg = Path(__file__).resolve().parents[3] / "node_modules" / "ffmpeg-static" / "ffmpeg.exe"
    if workspace_ffmpeg.exists():
        return str(workspace_ffmpeg)

    # 4. Tentar instalar imageio-ffmpeg automaticamente via pip
    print("[tratar-audio] FFmpeg não encontrado. Instalando imageio-ffmpeg...")
    subprocess.check_call([sys.executable, "-m", "pip", "install", "imageio-ffmpeg"])
    import imageio_ffmpeg
    return imageio_ffmpeg.get_ffmpeg_exe()


def ensure_deepfilternet():
    """Garante que deepfilternet, torch, torchaudio e soundfile estejam instalados."""
    missing = []
    try:
        import df  # noqa: F401
    except ImportError:
        missing.append("deepfilternet")

    try:
        import torch  # noqa: F401
        import torchaudio  # noqa: F401
    except ImportError:
        missing.append("torch")

    try:
        import soundfile  # noqa: F401
    except ImportError:
        missing.append("soundfile")

    if missing:
        print(f"[tratar-audio] Instalando dependências ausentes ({', '.join(missing)})...")
        if "deepfilternet" in missing:
            subprocess.check_call([sys.executable, "-m", "pip", "install", "deepfilternet"])
        if "torch" in missing or "soundfile" in missing:
            subprocess.check_call([
                sys.executable, "-m", "pip", "install",
                "torch", "torchaudio", "soundfile",
                "--extra-index-url", "https://download.pytorch.org/whl/cpu"
            ])
        print("[tratar-audio] Dependências instaladas com sucesso.")


def process_video(
    video_path: Path,
    ffmpeg_exe: str,
    target_lufs: float = -16.0,
    output_dir: Path = None,
    keep_temp: bool = False
) -> Path:
    """Executa o pipeline completo em um arquivo de vídeo."""
    if not video_path.exists():
        raise FileNotFoundError(f"Vídeo não encontrado: {video_path}")

    # Inicializa DeepFilterNet
    from df.enhance import enhance, init_df, load_audio, save_audio
    print(f"\n[tratar-audio] Processando: {video_path.name}")

    if output_dir:
        output_dir = Path(output_dir)
        output_dir.mkdir(parents=True, exist_ok=True)
        output_video = output_dir / f"{video_path.stem}_tratado.mp4"
    else:
        output_video = video_path.with_name(f"{video_path.stem}_tratado.mp4")

    with tempfile.TemporaryDirectory() as temp_dir:
        temp_dir_path = Path(temp_dir)
        raw_audio_wav = temp_dir_path / "01_extracted.wav"
        enhanced_wav = temp_dir_path / "02_enhanced.wav"
        normalized_wav = temp_dir_path / "03_normalized.wav"

        # 1. Extração do áudio original em WAV 48kHz
        print("  -> [1/4] Extraindo áudio original em WAV 48kHz...")
        cmd_extract = [
            ffmpeg_exe, "-y",
            "-i", str(video_path),
            "-vn",
            "-acodec", "pcm_s16le",
            "-ar", "48000",
            str(raw_audio_wav)
        ]
        res = subprocess.run(cmd_extract, capture_output=True, text=True)
        if res.returncode != 0:
            raise RuntimeError(f"Erro ao extrair áudio: {res.stderr}")

        # 2. Remoção de ruído com DeepFilterNet
        print("  -> [2/4] Aplicando IA DeepFilterNet para remoção de ruídos e limpeza da voz...")
        model, df_state, _ = init_df()
        audio, _ = load_audio(str(raw_audio_wav), sr=df_state.sr())
        enhanced_audio = enhance(model, df_state, audio)
        save_audio(str(enhanced_wav), enhanced_audio, sr=df_state.sr())

        # 3. Nivelamento com FFmpeg loudnorm (-16 LUFS)
        print(f"  -> [3/4] Nivelando volume final com loudnorm ({target_lufs} LUFS)...")
        loudnorm_filter = f"loudnorm=I={target_lufs}:TP=-1.5:LRA=11"
        cmd_norm = [
            ffmpeg_exe, "-y",
            "-i", str(enhanced_wav),
            "-af", loudnorm_filter,
            "-ar", "48000",
            str(normalized_wav)
        ]
        res = subprocess.run(cmd_norm, capture_output=True, text=True)
        if res.returncode != 0:
            raise RuntimeError(f"Erro ao aplicar loudnorm: {res.stderr}")

        # 4. Mesclagem sem re-encodar o vídeo (-c:v copy)
        print(f"  -> [4/4] Mesclando áudio ao vídeo original (cópia direta do vídeo)...")
        cmd_remux = [
            ffmpeg_exe, "-y",
            "-i", str(video_path),
            "-i", str(normalized_wav),
            "-map", "0:v:0",
            "-map", "1:a:0",
            "-c:v", "copy",
            "-c:a", "aac",
            "-b:a", "192k",
            str(output_video)
        ]
        res = subprocess.run(cmd_remux, capture_output=True, text=True)
        if res.returncode != 0:
            raise RuntimeError(f"Erro ao mesclar vídeo: {res.stderr}")

        if keep_temp:
            audit_dir = video_path.parent / f"{video_path.stem}_audio_audit"
            audit_dir.mkdir(parents=True, exist_ok=True)
            shutil.copy(raw_audio_wav, audit_dir / "01_extracted.wav")
            shutil.copy(enhanced_wav, audit_dir / "02_enhanced.wav")
            shutil.copy(normalized_wav, audit_dir / "03_normalized.wav")
            print(f"  -> Áudios intermediários salvos em: {audit_dir}")

    print(f"[tratar-audio] Concluído com sucesso: {output_video}")
    return output_video


def main():
    check_and_reexec_compatible_python()

    parser = argparse.ArgumentParser(
        description="Trata e limpa áudio de vídeos localmente com FFmpeg e DeepFilterNet."
    )
    parser.add_argument(
        "videos",
        nargs="*",
        help="Caminhos de um ou mais arquivos de vídeo a serem tratados."
    )
    parser.add_argument(
        "--dir",
        dest="directory",
        help="Processa todos os vídeos (.mp4, .mov, .mkv) do diretório especificado."
    )
    parser.add_argument(
        "--target-lufs",
        type=float,
        default=-16.0,
        help="Volume alvo integrado para o filtro loudnorm (padrão: -16.0 LUFS)."
    )
    parser.add_argument(
        "--output-dir",
        help="Diretório de saída customizado."
    )
    parser.add_argument(
        "--keep-temp",
        action="store_true",
        help="Mantém cópia dos arquivos WAV intermediários para auditoria."
    )

    args = parser.parse_args()

    # 1. Verifica e assegura FFmpeg e DeepFilterNet
    ffmpeg_exe = ensure_ffmpeg()
    ensure_deepfilternet()

    video_files = []
    if args.videos:
        for v in args.videos:
            p = Path(v)
            if p.is_file():
                video_files.append(p)
            else:
                print(f"[tratar-audio] Aviso: Arquivo não encontrado: {v}")

    if args.directory:
        d = Path(args.directory)
        if d.is_dir():
            for ext in ("*.mp4", "*.mov", "*.mkv"):
                for f in d.glob(ext):
                    if not f.stem.endswith("_tratado"):
                        video_files.append(f)
        else:
            print(f"[tratar-audio] Erro: Diretório não encontrado: {args.directory}")
            sys.exit(1)

    if not video_files:
        print("[tratar-audio] Nenhum vídeo fornecido para tratamento.")
        parser.print_help()
        sys.exit(1)

    success_count = 0
    for video in video_files:
        try:
            process_video(
                video_path=video,
                ffmpeg_exe=ffmpeg_exe,
                target_lufs=args.target_lufs,
                output_dir=Path(args.output_dir) if args.output_dir else None,
                keep_temp=args.keep_temp
            )
            success_count += 1
        except Exception as e:
            print(f"[tratar-audio] Erro ao processar {video.name}: {e}")

    print(f"\n[tratar-audio] Finalizado: {success_count}/{len(video_files)} vídeo(s) tratado(s).")


if __name__ == "__main__":
    main()
