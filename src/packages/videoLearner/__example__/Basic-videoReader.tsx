import React, { useState } from "react";

import VideoLearner from "../index";

const VideoLearnerExample = () => {
    
  const FinshCallBack = (msg) => {
    alert(msg);
  };

  const [fileUrl, setFileUrl] = useState<string>(
    "https://shlab-label.oss-accelerate.aliyuncs.com/test4%2F254%2F8.mp4?Expires=1655967776&OSSAccessKeyId=LTAI5tMmp1jihdZ4sDsZPuAT&Signature=qT3sNM%2Bo6RI04jCooiTELbbiNhk%3D"
  );

  return (
    <VideoLearner
    FinshCallBack={FinshCallBack}
    documentUrl={fileUrl}
    width={1000}
    height={600}
  />
  );
};

export default VideoLearnerExample;
