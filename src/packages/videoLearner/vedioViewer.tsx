import { Prograss } from './index';
import React, { FC } from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';

interface IProps {
  options: any;
  onReady: (play: any) => void;
  readFinshCallBack: (type: Prograss) => void;

}

export const VedioViewer: FC<IProps> = props => {
  const videoRef = React.useRef<HTMLElement>(null);
  const playerRef = React.useRef<any>(null);
  const { options, onReady, readFinshCallBack } = props;
  React.useEffect(() => {
    // // 播放结束，报送学习状态
    videoRef.current?.addEventListener(
      'ended',
      e => {
        e.stopImmediatePropagation();
        readFinshCallBack('documentDone');
      },
      true,
    );

    videoRef.current?.addEventListener(
      'pause',
      e => {
        e.stopImmediatePropagation();
        var myPlayer = videojs('learn-vedio-dom');
      },
      true,
    );

    // make sure Video.js player is only initialized once
    if (!playerRef.current) {
      const videoElement = videoRef.current;
      if (!videoElement) return;

      const player = (playerRef.current = videojs(videoElement, options, () => {
        onReady && onReady(player);
      }));
    } else {
      // you can update player here [update player through props]
      const player = playerRef.current;
      player.src(options.sources[0].src);
      player.autoplay(true);
    }
  }, []);

  return (
    <div data-vjs-player>
      <video
        id="learn-vedio-dom"
        style={{
          width: options.width,
          height: options.height,
        }}
        // @ts-ignore
        ref={videoRef}
        className="video-js vjs-big-play-centered"
      />
    </div>
  );
};
