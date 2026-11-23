import React from 'react';
import {
  AbsoluteFill,
  Audio,
  Img,
  interpolate,
  Sequence,
  Series,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
  Video,
} from 'remotion';

// 30 FPS Frame Constants
export const FPS = 30;
export const CHAMADA_FRAMES = 1402; // 46.73s (camera_chamada.mp4)
export const INTRO_FRAMES = 150;    // 5.00s  (intro_youtube_escuro_1920x1080.mp4)
export const TUTORIAL_START = CHAMADA_FRAMES + INTRO_FRAMES; // Frame 1552 (51.73s)
export const TELA_OFFSET_FRAMES = 1148; // 38.267s offset so tela.mp4 is at 00:01:30 (2700f) when tutorial starts
export const CAM1_FRAMES = 22725;   // 757.50s (camera_01.mp4)
export const CAM2_FRAMES = 1875;    // 62.50s  (camera_02.mp4)
export const TELA_FRAMES = 27128 - TELA_OFFSET_FRAMES; // 25980 frames (866.0s total duration)

export const MainVideo: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#0B0719',
        fontFamily: 'Ubuntu, system-ui, sans-serif',
      }}
    >
      {/* Som da Vinheta Oficial na transição da Intro */}
      <Sequence from={CHAMADA_FRAMES} durationInFrames={INTRO_FRAMES}>
        <Audio src={staticFile('intro/trilha_youtube.wav')} volume={0.55} />
      </Sequence>

      {/* Trilha Sonora Lofi em loop suave apenas quando começar a mostrar a tela (após chamada e intro) */}
      <Sequence from={TUTORIAL_START} durationInFrames={TELA_FRAMES - TUTORIAL_START}>
        <Audio src={staticFile('audio/lofi_bgm.wav')} volume={0.07} loop />
      </Sequence>

      {/* ========================================================================= */}
      {/* CAMADA BASE (0s até 15m04s): Vídeo TELA tocando desde o frame 0 em        */}
      {/* background durante a chamada e a intro para garantir a sincronização!     */}
      {/* ========================================================================= */}
      <AbsoluteFill
        style={{
          backgroundColor: '#0B0719',
          backgroundImage: 'radial-gradient(#2D1F54 1.5px, transparent 1.5px)',
          backgroundSize: '32px 32px',
        }}
      >
        <Video
          src={staticFile('media/tela.mp4')}
          startFrom={TELA_OFFSET_FRAMES}
          muted
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
          }}
        />
      </AbsoluteFill>

      {/* ========================================================================= */}
      {/* FASE 1 (00:00 a 00:46.7): CAMERA_CHAMADA em Full sobre a tela             */}
      {/* ========================================================================= */}
      <Sequence from={0} durationInFrames={CHAMADA_FRAMES}>
        <ChamadaFullSection />
      </Sequence>

      {/* ========================================================================= */}
      {/* FASE 2 (00:46.7 a 00:51.7): VINHETA INTRO ESCURO no final da chamada      */}
      {/* ========================================================================= */}
      <Sequence from={CHAMADA_FRAMES} durationInFrames={INTRO_FRAMES}>
        <AbsoluteFill style={{ backgroundColor: '#0B0719', zIndex: 80 }}>
          <Video
            src={staticFile('intro/intro_youtube_escuro_1920x1080.mp4')}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
        </AbsoluteFill>
      </Sequence>

      {/* ========================================================================= */}
      {/* FASE 3 (00:51.7 até o fim): TELA VISÍVEL + CAMERA PiP + PROMPT 00:09:11   */}
      {/* ========================================================================= */}
      <Sequence from={TUTORIAL_START} durationInFrames={TELA_FRAMES - TUTORIAL_START}>
        <TutorialOverlaySection />
      </Sequence>
    </AbsoluteFill>
  );
};

// Componente da Fase 1: Camera Chamada em Full com elementos visuais da Intro Escuro
const ChamadaFullSection: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const lowerThirdAnim = spring({
    frame: frame - 15,
    fps,
    config: { damping: 14 },
  });

  const xpProgress = Math.min(100, Math.round(interpolate(frame, [0, 360], [10, 100])));

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#0B0719',
        backgroundImage: 'radial-gradient(#2D1F54 2px, transparent 2px)',
        backgroundSize: '32px 32px',
        overflow: 'hidden',
        zIndex: 50,
      }}
    >
      {/* Brilho Roxo da Intro */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '1200px',
          height: '800px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(109,40,217,0.45) 0%, rgba(11,7,25,0) 70%)',
          filter: 'blur(60px)',
        }}
      />

      {/* Vídeo camera_chamada preenchendo a tela (enquadramento focado na criadora) */}
      <Video
        src={staticFile('media/camera_chamada.mp4')}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'center 54%',
        }}
      />

      {/* Vinheta sutil nas bordas para destacar os elementos da Intro */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(circle, rgba(11,7,25,0) 55%, rgba(11,7,25,0.65) 100%)',
          pointerEvents: 'none',
        }}
      />

      {/* Símbolos da Intro nos cantos */}
      <Img
        src={staticFile('brand-assets/simbolos/+ ROXO.png')}
        style={{ position: 'absolute', top: 42, right: 64, width: 42, transform: 'rotate(12deg)' }}
      />
      <Img
        src={staticFile('brand-assets/simbolos/X AMARELO.png')}
        style={{ position: 'absolute', top: 120, right: 130, width: 30, transform: 'rotate(-15deg)' }}
      />
      <Img
        src={staticFile('brand-assets/simbolos/ESTRELA AMARELA.png')}
        style={{ position: 'absolute', bottom: 52, right: 56, width: 64 }}
      />

      {/* Topo Esquerdo: Logo com Colchetes da Intro (Tamanho bom e bem visível) */}
      <div
        style={{
          position: 'absolute',
          top: 32,
          left: 44,
          display: 'flex',
          alignItems: 'center',
          gap: 16,
          backgroundColor: 'rgba(11, 7, 25, 0.88)',
          padding: '14px 30px',
          borderRadius: '9999px',
          border: '3px solid #F59E0B',
          boxShadow: '0 10px 30px rgba(0,0,0,0.7), 0 0 20px rgba(245, 158, 11, 0.25)',
        }}
      >
        <span style={{ fontSize: 48, fontWeight: 900, color: '#F59E0B', lineHeight: 1 }}>{'{'}</span>
        <Img
          src={staticFile('brand-assets/logo/BRANCO E AMARELO.png')}
          style={{ height: 58, objectFit: 'contain' }}
        />
        <span style={{ fontSize: 48, fontWeight: 900, color: '#F59E0B', lineHeight: 1 }}>{'}'}</span>
      </div>

      {/* Lower Third inspirado no layout da Intro Escuro (0s a 12s) */}
      <Sequence from={15} durationInFrames={360}>
        <div
          style={{
            position: 'absolute',
            bottom: 48,
            left: 48,
            transform: `translateY(${interpolate(lowerThirdAnim, [0, 1], [80, 0])}px)`,
            opacity: lowerThirdAnim,
            backgroundColor: 'rgba(11, 7, 25, 0.94)',
            border: '3px solid #F59E0B',
            borderRadius: '24px',
            padding: '18px 32px',
            boxShadow: '0 20px 50px rgba(0,0,0,0.8), 0 0 30px rgba(109,40,217,0.5)',
            display: 'flex',
            flexDirection: 'column',
            gap: 10,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div
              style={{
                backgroundColor: '#F59E0B',
                color: '#0B0719',
                padding: '4px 16px',
                borderRadius: '9999px',
                fontSize: 14,
                fontWeight: 900,
                letterSpacing: '0.06em',
              }}
            >
              PROGRAMAÇÃO & GAME DEV
            </div>
            <span style={{ fontSize: 14, fontWeight: 700, color: '#A78BFA' }}>
              • cmbelem.vercel.app
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ fontSize: 38, fontWeight: 900, color: '#F59E0B' }}>{'{'}</span>
            <span style={{ fontSize: 28, fontWeight: 900, color: '#FFFFFF' }}>
              Criando Minha <span style={{ color: '#F59E0B' }}>Skill de IA</span> para Projetos Pessoais
            </span>
            <span style={{ fontSize: 38, fontWeight: 900, color: '#F59E0B' }}>{'}'}</span>
          </div>

          {/* Barra XP da Intro */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ fontSize: 14, fontWeight: 900, color: '#F59E0B' }}>XP</span>
            <div
              style={{
                flex: 1,
                height: 12,
                backgroundColor: '#231842',
                borderRadius: '9999px',
                overflow: 'hidden',
                padding: 2,
              }}
            >
              <div
                style={{
                  width: `${xpProgress}%`,
                  height: '100%',
                  borderRadius: '9999px',
                  background: 'linear-gradient(90deg, #6D28D9 0%, #EC4899 55%, #F59E0B 100%)',
                }}
              />
            </div>
            <span style={{ fontSize: 13, fontWeight: 900, color: '#FFFFFF' }}>{xpProgress}%</span>
          </div>
        </div>
      </Sequence>
    </AbsoluteFill>
  );
};

// Componente da Fase 3: Webcam PiP no canto + Imagem do Prompt em 00:09:11 + Elementos da Intro
const TutorialOverlaySection: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Minuto 00:09:11 do vídeo camera_01 (551 segundos = 16530 frames)
  const PROMPT_START_FRAME = 16530;
  const PROMPT_DURATION_FRAMES = 750; // 25s de exibição
  const isPromptVisible =
    frame >= PROMPT_START_FRAME && frame < PROMPT_START_FRAME + PROMPT_DURATION_FRAMES;

  const promptAnim = spring({
    frame: frame - PROMPT_START_FRAME,
    fps,
    config: { damping: 12 },
  });

  return (
    <AbsoluteFill style={{ pointerEvents: 'none', zIndex: 40 }}>
      {/* 1. Quadrante da Câmera (PiP) estilizado com elementos da Intro Escuro */}
      <div
        style={{
          position: 'absolute',
          bottom: 42,
          right: 36,
          width: 340,
          height: 420,
          zIndex: 45,
        }}
      >
        {/* Símbolos decorativos da Intro ao redor do PiP */}
        <Img
          src={staticFile('brand-assets/simbolos/+ AMARELO.png')}
          style={{ position: 'absolute', top: -14, left: -14, width: 28, zIndex: 55 }}
        />
        <Img
          src={staticFile('brand-assets/simbolos/ESTRELA ROXA.png')}
          style={{ position: 'absolute', top: -18, right: -14, width: 38, zIndex: 55 }}
        />

        {/* Moldura Arredondada da Câmera */}
        <div
          style={{
            width: '100%',
            height: '100%',
            borderRadius: '26px',
            overflow: 'hidden',
            border: '4px solid #F59E0B',
            boxShadow: '0 16px 45px rgba(0,0,0,0.75), 0 0 28px rgba(109,40,217,0.55)',
            backgroundColor: '#0B0719',
            position: 'relative',
          }}
        >
          <Series>
            {/* camera_01.mp4 */}
            <Series.Sequence durationInFrames={CAM1_FRAMES}>
              <Video
                src={staticFile('media/camera_01.mp4')}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'center 54%',
                }}
              />
            </Series.Sequence>

            {/* camera_02.mp4 */}
            <Series.Sequence durationInFrames={CAM2_FRAMES}>
              <Video
                src={staticFile('media/camera_02.mp4')}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'center 54%',
                }}
              />
            </Series.Sequence>
          </Series>

          {/* Tag Pill da Intro na base da câmera */}
          <div
            style={{
              position: 'absolute',
              bottom: 10,
              left: '50%',
              transform: 'translateX(-50%)',
              backgroundColor: 'rgba(11, 7, 25, 0.9)',
              border: '1.5px solid #F59E0B',
              borderRadius: '9999px',
              padding: '4px 16px',
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              whiteSpace: 'nowrap',
            }}
          >
            <span style={{ fontSize: 14, fontWeight: 900, color: '#F59E0B' }}>{'{'}</span>
            <span style={{ fontSize: 12, fontWeight: 800, color: '#FFFFFF' }}>CAMIS GAMEDEV</span>
            <span style={{ fontSize: 14, fontWeight: 900, color: '#F59E0B' }}>{'}'}</span>
          </div>
        </div>
      </div>

      {/* 2. Imagem do Prompt exibida no minuto 00:09:11 de camera_01 */}
      {isPromptVisible && (
        <div
          style={{
            position: 'absolute',
            top: '48%',
            left: '38%',
            transform: `translate(-50%, -50%) scale(${Math.max(0, promptAnim)})`,
            width: '1220px',
            maxHeight: '840px',
            backgroundColor: '#0B0719',
            borderRadius: '26px',
            overflow: 'hidden',
            border: '4px solid #F59E0B',
            boxShadow: '0 30px 90px rgba(0,0,0,0.9), 0 0 50px rgba(109,40,217,0.65)',
            zIndex: 60,
          }}
        >
          {/* Header com estilo da Intro */}
          <div
            style={{
              height: 54,
              backgroundColor: '#160F30',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '0 24px',
              borderBottom: '2px solid rgba(245,158,11,0.35)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ fontSize: 26, fontWeight: 900, color: '#F59E0B' }}>{'{'}</span>
              <span
                style={{
                  fontSize: 18,
                  fontWeight: 900,
                  color: '#FFFFFF',
                  letterSpacing: '0.03em',
                }}
              >
                PROMPT DA SKILL: <span style={{ color: '#F59E0B' }}>cami-brand-identity</span>
              </span>
              <span style={{ fontSize: 26, fontWeight: 900, color: '#F59E0B' }}>{'}'}</span>
            </div>
            <div
              style={{
                backgroundColor: '#F59E0B',
                color: '#0B0719',
                padding: '5px 16px',
                borderRadius: '9999px',
                fontSize: 13,
                fontWeight: 900,
              }}
            >
              PROGRAMAÇÃO & GAME DEV
            </div>
          </div>

          <Img
            src={staticFile('images/imagem_prompt.png')}
            style={{
              width: '100%',
              height: 'auto',
              display: 'block',
            }}
          />
        </div>
      )}

      {/* 3. Assinatura Oficial no Rodapé (estilo da Intro Escuro) */}
      <div
        style={{
          position: 'absolute',
          bottom: 10,
          left: 36,
          backgroundColor: 'rgba(11, 7, 25, 0.9)',
          border: '1.5px solid rgba(124, 58, 237, 0.5)',
          padding: '6px 20px',
          borderRadius: '9999px',
          fontSize: 13,
          fontWeight: 700,
          color: '#E2E8F0',
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          zIndex: 45,
        }}
      >
        <span style={{ color: '#F59E0B', fontWeight: 900 }}>{'{'}</span>
        <span>
          Desenvolvido por <span style={{ color: '#F59E0B', fontWeight: 800 }}>Camis GameDev</span> (
          <span style={{ color: '#A78BFA' }}>http://cmbelem.vercel.app/</span>)
        </span>
        <span style={{ color: '#F59E0B', fontWeight: 900 }}>{'}'}</span>
      </div>
    </AbsoluteFill>
  );
};
