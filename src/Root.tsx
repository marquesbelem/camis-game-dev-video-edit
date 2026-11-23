import React from 'react';
import { Composition } from 'remotion';
import { MainVideo, TELA_FRAMES } from './MainVideo';
import { Thumbnail } from './Thumbnail';
import { ShortVideo } from './ShortVideo';
import { OverlayBase, OverlayPrompt, OverlayChamadaTop, OverlayChamadaCard } from './OverlayStill';

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {/* Vídeo Principal Editado */}
      <Composition
        id="MainVideo"
        component={MainVideo}
        durationInFrames={TELA_FRAMES} // 27128 frames (904.28s)
        fps={30}
        width={1920}
        height={1080}
      />

      {/* Thumbnail Oficial do Vídeo (1280x720) */}
      <Composition
        id="Thumbnail"
        component={Thumbnail}
        durationInFrames={30}
        fps={30}
        width={1280}
        height={720}
      />

      {/* Short Vertical do Vídeo (1080x1920) */}
      <Composition
        id="ShortVideo"
        component={ShortVideo}
        durationInFrames={1200} // 40 segundos (37.6s + 2.4s intro)
        fps={30}
        width={1080}
        height={1920}
      />

      {/* Overlays transparentes do Remotion para aceleração NVENC */}
      <Composition
        id="OverlayBase"
        component={OverlayBase}
        durationInFrames={1}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="OverlayPrompt"
        component={OverlayPrompt}
        durationInFrames={1}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="OverlayChamadaTop"
        component={OverlayChamadaTop}
        durationInFrames={1}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="OverlayChamadaCard"
        component={OverlayChamadaCard}
        durationInFrames={1}
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
};
