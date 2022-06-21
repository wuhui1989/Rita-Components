import React, { FC, useRef, useState } from 'react';
import { VedioViewer } from './vedioViewer';
import styles from './index.scss';


export type Prograss =
  | 'documentDone'
  | 'documentOpen'
  | 'done'
  | 'exerciseDone'
  | 'exerciseOpen'
  | 'questionDone'
  | 'questionOpen';

interface IProps {
  width: number;
  documentUrl: string;
  height: number;
  FinshCallBack?: (type: Prograss) => void;
}

const VideoLearner: FC<IProps> = props => {
  const {  documentUrl, width, height } = props;
  const videoRef = React.useRef(null);
  const readFinshCallBack = (progress: Prograss) => {
    props.FinshCallBack && props.FinshCallBack(progress);
  };
  return (
    <div className={styles.vedioBox}>
      {documentUrl && (
        <VedioViewer
          readFinshCallBack={readFinshCallBack}
          options={{
            controls: true,
            // playbackRates:[1.0],
            playbackRates: [1.0], // 播放速度
            autoplay: true, // 如果true,浏览器准备好时开始回放。
            muted: false, // 默认情况下将会消除任何音频。
            loop: false, // 导致视频一结束就重新开始。
            preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
            language: 'zh-CN',
            // aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
            //fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
            sources: [
              {
                src: documentUrl,
                type: 'video/mp4',
              },
            ],
            height: height,
            //  poster: videoInfo.img, // 你的封面地址
            width: width - 48,
            notSupportedMessage: '此视频暂无法播放，请稍后再试', // 允许覆盖Video.js无法播放媒体源时显示的默认信息。
            // controlBar: {
            //   timeDivider: true,
            //   durationDisplay: true,
            //   remainingTimeDisplay: true,
            //   fullscreenToggle: true, // 全屏按钮
            // },
          }}
          onReady={(play: any) => {
            videoRef.current = play;
            play.play();
          }}
        />
      )}
    </div>
  );
};

export default VideoLearner;
