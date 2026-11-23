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

const MAIN_SHORT_FRAMES = 1128; // 37.6s
const INTRO_SHORT_FRAMES = 72;  // 2.4s (intro_shorts_escuro_1080x1920.mp4)

export const ShortVideo: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: '#0B0719' }}>
      {/* Efeito sonoro da vinheta de encerramento */}
      <Sequence from={MAIN_SHORT_FRAMES} durationInFrames={INTRO_SHORT_FRAMES}>
        <Audio src={staticFile('intro/trilha_shorts.wav')} volume={0.6} />
      </Sequence>

      <Series>
        {/* Parte Principal: Tela + Camera_Chamada combinadas */}
        <Series.Sequence durationInFrames={MAIN_SHORT_FRAMES}>
          <ShortMainContent />
        </Series.Sequence>

        {/* Final do Short: Vinheta Oficial de Intro (Tema Escuro) */}
        <Series.Sequence durationInFrames={INTRO_SHORT_FRAMES}>
          <AbsoluteFill style={{ backgroundColor: '#0B0719' }}>
            <Video
              src={staticFile('intro/intro_shorts_escuro_1080x1920.mp4')}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />
          </AbsoluteFill>
        </Series.Sequence>
      </Series>
    </AbsoluteFill>
  );
};

const ShortMainContent: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const bannerSpring = spring({
    frame,
    fps,
    config: { damping: 13 },
  });

  const showPromptCard = frame >= 450 && frame <= 920;
  const promptScale = spring({
    frame: frame - 450,
    fps,
    config: { damping: 12 },
  });

  const xpPercent = Math.min(100, Math.round(interpolate(frame, [0, MAIN_SHORT_FRAMES - 30], [15, 100])));

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#0B0719',
        backgroundImage: 'radial-gradient(#2D1F54 2px, transparent 2px)',
        backgroundSize: '32px 32px',
        color: '#FFFFFF',
        fontFamily: 'Ubuntu, system-ui, sans-serif',
        overflow: 'hidden',
      }}
    >
      {/* Trilha Lofi de fundo enquanto o Short passa */}
      <Audio src={staticFile('audio/lofi_bgm.wav')} volume={0.08} loop />

      {/* Brilho Roxo da Intro no fundo */}
      <div
        style={{
          position: 'absolute',
          top: '35%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '850px',
          height: '850px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(109,40,217,0.45) 0%, rgba(11,7,25,0) 70%)',
          filter: 'blur(50px)',
          pointerEvents: 'none',
        }}
      />

      {/* Símbolos Decorativos da Intro */}
      <Img
        src={staticFile('brand-assets/simbolos/+ ROXO.png')}
        style={{ position: 'absolute', top: 38, left: 48, width: 36, transform: 'rotate(-15deg)' }}
      />
      <Img
        src={staticFile('brand-assets/simbolos/X AMARELO.png')}
        style={{ position: 'absolute', top: 44, right: 54, width: 32, transform: 'rotate(18deg)' }}
      />
      <Img
        src={staticFile('brand-assets/simbolos/ESTRELA AMARELA.png')}
        style={{ position: 'absolute', top: 925, left: 26, width: 52, zIndex: 50 }}
      />
      <Img
        src={staticFile('brand-assets/simbolos/ESTRELA ROXA.png')}
        style={{ position: 'absolute', top: 925, right: 26, width: 52, zIndex: 50 }}
      />

      {/* Topo: Header no layout da Intro */}
      <div
        style={{
          position: 'absolute',
          top: 42,
          left: 0,
          right: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 8,
          zIndex: 40,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <span style={{ fontSize: 48, fontWeight: 900, color: '#F59E0B' }}>{'{'}</span>
          <Img
            src={staticFile('brand-assets/logo/BRANCO E AMARELO.png')}
            style={{ height: 54, objectFit: 'contain' }}
          />
          <span style={{ fontSize: 48, fontWeight: 900, color: '#F59E0B' }}>{'}'}</span>
        </div>
        <div
          style={{
            backgroundColor: '#F59E0B',
            color: '#0B0719',
            padding: '4px 20px',
            borderRadius: '9999px',
            fontSize: 15,
            fontWeight: 900,
            letterSpacing: '0.05em',
          }}
        >
          PROGRAMAÇÃO & GAME DEV
        </div>
      </div>

      {/* PARTE SUPERIOR SIGNIFICATIVA: Vídeo TELA (Demonstração Prática) */}
      <div
        style={{
          position: 'absolute',
          top: 155,
          left: '50%',
          transform: 'translateX(-50%)',
          width: '980px',
          height: '735px',
          borderRadius: '28px',
          overflow: 'hidden',
          border: '4px solid #7C3AED',
          boxShadow: '0 18px 45px rgba(0,0,0,0.8), 0 0 30px rgba(124,58,237,0.35)',
          backgroundColor: '#0F172A',
          zIndex: 20,
        }}
      >
        <Video
          src={staticFile('media/tela.mp4')}
          startFrom={2700}
          muted
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'left top',
          }}
        />

        {/* Overlay da imagem do prompt durante o Short */}
        {showPromptCard && (
          <div
            style={{
              position: 'absolute',
              inset: 18,
              backgroundColor: '#0B0719',
              borderRadius: '20px',
              border: '3px solid #F59E0B',
              overflow: 'hidden',
              transform: `scale(${Math.max(0, promptScale)})`,
              boxShadow: '0 20px 50px rgba(0,0,0,0.9)',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <div
              style={{
                backgroundColor: '#1E1438',
                padding: '10px 18px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderBottom: '1px solid rgba(245,158,11,0.3)',
              }}
            >
              <span style={{ fontSize: 18, fontWeight: 800, color: '#F59E0B' }}>
                {'{ PROMPT DA MINHA SKILL }'}
              </span>
              <span style={{ fontSize: 14, fontWeight: 700, color: '#CBD5E1' }}>
                SKILL.md
              </span>
            </div>
            <Img
              src={staticFile('images/imagem_prompt.png')}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'contain',
              }}
            />
          </div>
        )}
      </div>

      {/* FAIXA CENTRAL (Layout inspirado na Intro: Colchetes + Título + Barra XP) */}
      <div
        style={{
          position: 'absolute',
          top: 906,
          left: '50%',
          transform: `translateX(-50%) scale(${bannerSpring})`,
          width: '940px',
          backgroundColor: 'rgba(19, 12, 42, 0.96)',
          border: '3px solid #F59E0B',
          borderRadius: '24px',
          padding: '14px 28px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 8,
          boxShadow: '0 14px 35px rgba(0,0,0,0.85), 0 0 25px rgba(245,158,11,0.3)',
          zIndex: 45,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ fontSize: 38, fontWeight: 900, color: '#F59E0B' }}>{'{'}</span>
          <span
            style={{
              fontSize: 32,
              fontWeight: 900,
              color: '#FFFFFF',
              textTransform: 'uppercase',
              letterSpacing: '0.01em',
            }}
          >
            CRIEI MINHA <span style={{ color: '#F59E0B' }}>SKILL DE IA</span> P/ PROJETOS
          </span>
          <span style={{ fontSize: 38, fontWeight: 900, color: '#F59E0B' }}>{'}'}</span>
        </div>

        {/* Barra XP da Intro */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, width: '85%' }}>
          <span style={{ fontSize: 16, fontWeight: 900, color: '#F59E0B' }}>XP</span>
          <div
            style={{
              flex: 1,
              height: 14,
              backgroundColor: '#231842',
              borderRadius: '9999px',
              overflow: 'hidden',
              padding: 2,
            }}
          >
            <div
              style={{
                width: `${xpPercent}%`,
                height: '100%',
                borderRadius: '9999px',
                background: 'linear-gradient(90deg, #6D28D9 0%, #EC4899 55%, #F59E0B 100%)',
              }}
            />
          </div>
          <span style={{ fontSize: 15, fontWeight: 900, color: '#FFFFFF', minWidth: 45 }}>
            {xpPercent}%
          </span>
        </div>
      </div>

      {/* PARTE INFERIOR SIGNIFICATIVA: Vídeo CAMERA_CHAMADA */}
      <div
        style={{
          position: 'absolute',
          top: 1042,
          left: '50%',
          transform: 'translateX(-50%)',
          width: '980px',
          height: '790px',
          borderRadius: '28px',
          overflow: 'hidden',
          border: '4px solid #F59E0B',
          boxShadow: '0 18px 45px rgba(0,0,0,0.8), 0 0 30px rgba(245,158,11,0.28)',
          backgroundColor: '#000',
          zIndex: 20,
        }}
      >
        <Video
          src={staticFile('media/camera_chamada.mp4')}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center 55%',
          }}
        />
      </div>

      {/* Rodapé Oficial da Marca */}
      <div
        style={{
          position: 'absolute',
          bottom: 24,
          left: 0,
          right: 0,
          textAlign: 'center',
          fontSize: 18,
          fontWeight: 700,
          color: '#E2E8F0',
          zIndex: 40,
        }}
      >
        Desenvolvido por <span style={{ color: '#F59E0B' }}>Camis GameDev</span> • cmbelem.vercel.app
      </div>
    </AbsoluteFill>
  );
};
