import React from 'react';
import { AbsoluteFill, Img, staticFile } from 'remotion';

export const Thumbnail: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#0B0719',
        backgroundImage: 'radial-gradient(#2D1F54 2px, transparent 2px)',
        backgroundSize: '32px 32px',
        color: '#FFFFFF',
        fontFamily: 'Ubuntu, system-ui, sans-serif',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'row',
      }}
    >
      {/* Subtle Code / Screen Background (like thumb2.jpg) */}
      <Img
        src={staticFile('images/tela_frame.png')}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          opacity: 0.14,
          filter: 'blur(2px)',
        }}
      />

      {/* Ambient Glows matching Intro Escuro */}
      <div
        style={{
          position: 'absolute',
          top: '5%',
          left: '5%',
          width: '680px',
          height: '520px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(109,40,217,0.55) 0%, rgba(11,7,25,0) 70%)',
          filter: 'blur(40px)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '-15%',
          right: '5%',
          width: '620px',
          height: '620px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(245,158,11,0.35) 0%, rgba(11,7,25,0) 70%)',
          filter: 'blur(50px)',
        }}
      />

      {/* Scattered Brand Symbols (like thumb1.jpg & intro) */}
      <Img
        src={staticFile('brand-assets/simbolos/X ROXO.png')}
        style={{ position: 'absolute', top: 26, left: 230, width: 34, transform: 'rotate(-12deg)' }}
      />
      <Img
        src={staticFile('brand-assets/simbolos/ESTRELA ROXA.png')}
        style={{ position: 'absolute', top: -18, left: 720, width: 92, transform: 'rotate(10deg)' }}
      />
      <Img
        src={staticFile('brand-assets/simbolos/+ BRANCO.png')}
        style={{ position: 'absolute', bottom: 95, left: 775, width: 42 }}
      />
      <Img
        src={staticFile('brand-assets/simbolos/+ AMARELO.png')}
        style={{ position: 'absolute', top: 68, right: 48, width: 44, transform: 'rotate(15deg)' }}
      />
      <Img
        src={staticFile('brand-assets/simbolos/ESTRELA AMARELA.png')}
        style={{ position: 'absolute', bottom: -22, left: 560, width: 96, transform: 'rotate(-8deg)' }}
      />
      <Img
        src={staticFile('brand-assets/simbolos/X AMARELO.png')}
        style={{ position: 'absolute', bottom: 32, left: 82, width: 32 }}
      />

      {/* LEFT SIDE: Title Stack with Highlight Blocks & Curly Braces (thumb1.jpg + thumb2.jpg style) */}
      <div
        style={{
          width: '60%',
          height: '100%',
          padding: '44px 20px 40px 52px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          zIndex: 10,
        }}
      >
        {/* Top Tag Pill */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div
            style={{
              backgroundColor: '#F59E0B',
              color: '#0B0719',
              padding: '8px 24px',
              borderRadius: '9999px',
              fontSize: 20,
              fontWeight: 900,
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
              boxShadow: '0 6px 20px rgba(245,158,11,0.4)',
            }}
          >
            PROGRAMAÇÃO & GAME DEV
          </div>
        </div>

        {/* Main Stacked Title with { } and Tilted Highlight Boxes */}
        <div
          style={{
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            gap: 12,
            marginLeft: 10,
          }}
        >
          {/* Line 1: { Criei minha */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <span
              style={{
                fontSize: 92,
                fontWeight: 900,
                color: '#7C3AED',
                lineHeight: 0.85,
                textShadow: '0 4px 16px rgba(124,58,237,0.6)',
              }}
            >
              {'{'}
            </span>
            <span
              style={{
                fontSize: 64,
                fontWeight: 900,
                color: '#FFFFFF',
                letterSpacing: '-0.02em',
                textShadow: '0 6px 18px rgba(0,0,0,0.85)',
              }}
            >
              Criei minha
            </span>
          </div>

          {/* Line 2: SKILL DE IA (inside tilted orange highlight rectangle) */}
          <div
            style={{
              display: 'inline-flex',
              alignSelf: 'flex-start',
              backgroundColor: '#F59E0B',
              padding: '8px 28px 12px 28px',
              borderRadius: '14px',
              transform: 'rotate(-1.8deg)',
              boxShadow: '0 12px 30px rgba(0,0,0,0.65)',
              marginLeft: 24,
            }}
          >
            <span
              style={{
                fontSize: 78,
                fontWeight: 900,
                color: '#FFFFFF',
                letterSpacing: '0.01em',
                lineHeight: 1.0,
                textShadow: '0 4px 12px rgba(11,7,25,0.45)',
              }}
            >
              SKILL DE IA
            </span>
          </div>

          {/* Line 3: p/ PROJETOS! } (inside tilted purple highlight rectangle) */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 16,
              marginLeft: 18,
              marginTop: 4,
            }}
          >
            <span
              style={{
                fontSize: 54,
                fontWeight: 900,
                color: '#FFFFFF',
                textShadow: '0 4px 14px rgba(0,0,0,0.8)',
              }}
            >
              p/
            </span>
            <div
              style={{
                backgroundColor: '#6D28D9',
                padding: '8px 26px 12px 26px',
                borderRadius: '14px',
                transform: 'rotate(-1.2deg)',
                boxShadow: '0 10px 26px rgba(0,0,0,0.6)',
                border: '2px solid rgba(255,255,255,0.18)',
              }}
            >
              <span
                style={{
                  fontSize: 66,
                  fontWeight: 900,
                  color: '#FFFFFF',
                  lineHeight: 1.0,
                }}
              >
                PROJETOS!
              </span>
            </div>
            <span
              style={{
                fontSize: 92,
                fontWeight: 900,
                color: '#F59E0B',
                lineHeight: 0.85,
                textShadow: '0 4px 16px rgba(245,158,11,0.5)',
              }}
            >
              {'}'}
            </span>
          </div>
        </div>

        {/* Bottom Left: Brand Logo + Intro XP Bar */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 28 }}>
          <Img
            src={staticFile('brand-assets/logo/BRANCO E AMARELO.png')}
            style={{ height: 54, objectFit: 'contain' }}
          />
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ fontSize: 18, fontWeight: 900, color: '#F59E0B' }}>XP</span>
            <div
              style={{
                width: 200,
                height: 18,
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
            <span style={{ fontSize: 16, fontWeight: 900, color: '#FFFFFF' }}>100%</span>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE: Creator Photo Frame + Floating Skill Badges (thumb1 & thumb2 style) */}
      <div
        style={{
          width: '40%',
          height: '100%',
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 10,
        }}
      >
        {/* Main Creator Cutout/Frame */}
        <div
          style={{
            width: 370,
            height: 560,
            borderRadius: '180px 180px 36px 36px',
            overflow: 'hidden',
            border: '5px solid #F59E0B',
            boxShadow: '0 24px 60px rgba(0,0,0,0.85), 0 0 40px rgba(109,40,217,0.6)',
            position: 'relative',
            backgroundColor: '#1A103C',
          }}
        >
          <Img
            src={staticFile('images/cam_frame.png')}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center 52%',
            }}
          />
        </div>

        {/* Floating Tilted Rounded Square Badges (like thumb2.jpg: UX, UI, QA, 2D, 3D) */}
        <div
          style={{
            position: 'absolute',
            top: 58,
            right: 26,
            width: 104,
            height: 104,
            borderRadius: '24px',
            background: 'linear-gradient(135deg, #9333EA 0%, #6D28D9 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transform: 'rotate(-10deg)',
            boxShadow: '0 12px 28px rgba(0,0,0,0.6)',
            border: '3px solid rgba(255,255,255,0.25)',
          }}
        >
          <span style={{ fontSize: 42, fontWeight: 900, color: '#FFFFFF' }}>IA</span>
        </div>

        <div
          style={{
            position: 'absolute',
            top: 190,
            right: 18,
            width: 108,
            height: 108,
            borderRadius: '24px',
            background: 'linear-gradient(135deg, #38BDF8 0%, #2563EB 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transform: 'rotate(8deg)',
            boxShadow: '0 12px 28px rgba(0,0,0,0.6)',
            border: '3px solid rgba(255,255,255,0.25)',
          }}
        >
          <span style={{ fontSize: 40, fontWeight: 900, color: '#FFFFFF' }}>UI</span>
        </div>

        <div
          style={{
            position: 'absolute',
            bottom: 50,
            left: 16,
            width: 112,
            height: 100,
            borderRadius: '24px',
            background: 'linear-gradient(135deg, #EC4899 0%, #BE185D 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transform: 'rotate(-12deg)',
            boxShadow: '0 12px 28px rgba(0,0,0,0.6)',
            border: '3px solid rgba(255,255,255,0.25)',
          }}
        >
          <span style={{ fontSize: 34, fontWeight: 900, color: '#FFFFFF' }}>SKILL</span>
        </div>

        <div
          style={{
            position: 'absolute',
            bottom: 36,
            right: 24,
            width: 100,
            height: 96,
            borderRadius: '22px',
            background: 'linear-gradient(135deg, #FBBF24 0%, #D97706 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transform: 'rotate(-8deg)',
            boxShadow: '0 12px 28px rgba(0,0,0,0.6)',
            border: '3px solid rgba(255,255,255,0.3)',
          }}
        >
          <span style={{ fontSize: 34, fontWeight: 900, color: '#0B0719' }}>DEV</span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
