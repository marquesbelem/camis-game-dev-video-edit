---
name: tratar-audio-video
description: Limpa ruídos de fundo, tráfego e chiados da voz em arquivos de vídeo 100% localmente usando FFmpeg e IA DeepFilterNet, nivelando o áudio em -16 LUFS sem re-encodar o vídeo.
---

# Tratar Áudio de Vídeo (Local com DeepFilterNet e FFmpeg)

Esta skill executa a extração, redução de ruído por modelo de inteligência artificial DeepFilterNet, normalização de volume para padrão broadcast (-16 LUFS) e remux do áudio tratado no vídeo original sem perda de qualidade visual (`-c:v copy`).

## Funcionalidades

1. **Verificação e Instalação Automática**: Detecta a presença do FFmpeg (no sistema ou via binários instalados) e das bibliotecas `deepfilternet`, `torch` e `soundfile`, instalando automaticamente caso faltem.
2. **Extração de Áudio em Alta Fidelidade**: Extrai a faixa sonora em WAV 48kHz PCM 16-bit.
3. **Isolamento de Voz com IA (DeepFilterNet)**: Remove ruídos de tráfego, carros, ar condicionado e chiados mantendo a naturalidade da fala humana.
4. **Nivelamento de Volume Profissional**: Aplica o filtro `loudnorm` do FFmpeg (`I=-16:TP=-1.5:LRA=11`) para o padrão ideal de YouTube e streaming.
5. **Mesclagem Direta Sem Re-encode**: Preserva os fluxos de vídeo originais intactos e gera o arquivo com o sufixo `_tratado.mp4`.

## Como Executar

### 1. Processar um ou mais vídeos específicos
```bash
python .agents/skills/tratar-audio-video/scripts/tratar_audio.py "caminho/do/video.mp4"
```

Também aceita múltiplos arquivos:
```bash
python .agents/skills/tratar-audio-video/scripts/tratar_audio.py "video1.mp4" "video2.mp4" "video3.mp4"
```

### 2. Processar em lote um diretório
```bash
python .agents/skills/tratar-audio-video/scripts/tratar_audio.py --dir "gravações/video_01"
```

### 3. Argumentos Opcionais
- `--target-lufs`: Alvo de sonoridade integrado (padrão: `-16.0`).
- `--output-dir`: Diretório de saída customizado (por padrão salva na mesma pasta do arquivo original com `_tratado.mp4`).
- `--keep-temp`: Mantém os arquivos intermediários `.wav` para auditoria.
