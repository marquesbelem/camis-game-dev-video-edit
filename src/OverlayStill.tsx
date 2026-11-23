import React from 'react';
import { AbsoluteFill, Img, staticFile } from 'remotion';

export const OverlayBase: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        backgroundColor: 'transparent',
        fontFamily: 'Ubuntu, system-ui, sans-serif',
      }}
    >
      {/* Símbolos decorativos da Intro ao redor do PiP */}
      <div
        style={{
          position: 'absolute',
          bottom: 42,
          right: 36,
          width: 340,
          height: 420,
        }}
      >
        <Img
          src={staticFile('brand-assets/simbolos/+ AMARELO.png')}
          style={{ position: 'absolute', top: -14, left: -14, width: 28, zIndex: 55 }}
        />
        <Img
          src={staticFile('brand-assets/simbolos/ESTRELA ROXA.png')}
          style={{ position: 'absolute', top: -18, right: -14, width: 38, zIndex: 55 }}
        />

        {/* Moldura vazada da Câmera */}
        <div
          style={{
            width: '100%',
            height: '100%',
            borderRadius: '26px',
            border: '5px solid #F59E0B',
            boxSizing: 'border-box',
            boxShadow: '0 16px 45px rgba(0,0,0,0.75), 0 0 28px rgba(109,40,217,0.55)',
            position: 'relative',
          }}
        >
          {/* Tag Pill com Logo Oficial na base da câmera (tamanho bom e visível) */}
          <div
            style={{
              position: 'absolute',
              bottom: 10,
              left: '50%',
              transform: 'translateX(-50%)',
              backgroundColor: 'rgba(11, 7, 25, 0.94)',
              border: '2px solid #F59E0B',
              borderRadius: '9999px',
              padding: '6px 18px',
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              whiteSpace: 'nowrap',
              boxShadow: '0 6px 18px rgba(0,0,0,0.8)',
            }}
          >
            <span style={{ fontSize: 22, fontWeight: 900, color: '#F59E0B', lineHeight: 1 }}>{'{'}</span>
            <Img
              src={staticFile('brand-assets/logo/BRANCO E AMARELO.png')}
              style={{ height: 26, objectFit: 'contain' }}
            />
            <span style={{ fontSize: 22, fontWeight: 900, color: '#F59E0B', lineHeight: 1 }}>{'}'}</span>
          </div>
        </div>
      </div>

      {/* Assinatura Oficial no Rodapé (estilo da Intro Escuro) */}
      <div
        style={{
          position: 'absolute',
          bottom: 10,
          left: 36,
          backgroundColor: 'rgba(11, 7, 25, 0.92)',
          border: '1.5px solid rgba(124, 58, 237, 0.65)',
          padding: '6px 20px',
          borderRadius: '9999px',
          fontSize: 13,
          fontWeight: 700,
          color: '#E2E8F0',
          display: 'flex',
          alignItems: 'center',
          gap: 8,
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

export const OverlayPrompt: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        backgroundColor: 'transparent',
        fontFamily: 'Ubuntu, system-ui, sans-serif',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: '48%',
          left: '38%',
          transform: 'translate(-50%, -50%)',
          width: '1220px',
          maxHeight: '840px',
          backgroundColor: '#0B0719',
          borderRadius: '26px',
          overflow: 'hidden',
          border: '4px solid #F59E0B',
          boxShadow: '0 30px 90px rgba(0,0,0,0.9), 0 0 50px rgba(109,40,217,0.65)',
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
    </AbsoluteFill>
  );
};

export const OverlayChamadaTop: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        backgroundColor: 'transparent',
        fontFamily: 'Ubuntu, system-ui, sans-serif',
      }}
    >
      {/* Vinheta sutil nas bordas para destacar os elementos da Intro */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(circle, rgba(11,7,25,0) 55%, rgba(11,7,25,0.65) 100%)',
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
    </AbsoluteFill>
  );
};

export const OverlayChamadaCard: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        backgroundColor: 'transparent',
        fontFamily: 'Ubuntu, system-ui, sans-serif',
      }}
    >
      <div
        style={{
          position: 'absolute',
          bottom: 48,
          left: 48,
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
                width: '100%',
                height: '100%',
                borderRadius: '9999px',
                background: 'linear-gradient(90deg, #6D28D9 0%, #EC4899 55%, #F59E0B 100%)',
              }}
            />
          </div>
          <span style={{ fontSize: 13, fontWeight: 900, color: '#FFFFFF' }}>100%</span>
        </div>
      </div>
    </AbsoluteFill>
  );
};


