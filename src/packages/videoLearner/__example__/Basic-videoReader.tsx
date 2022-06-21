import React, { useState } from "react";

import VideoLearner from "../index";

const VideoLearnerExample = () => {
    
  const FinshCallBack = (msg) => {
    alert(msg);
  };

  const [fileUrl, setFileUrl] = useState<string>(
    "https://shlab-data.oss-cn-shanghai.aliyuncs.com/test4/obj/30f135ff-876a-48a3-a8cf-fa92f3197eb0.mp4?X-Amz-Algorithm=AWS4-HMAC-SHA256\u0026X-Amz-Credential=LTAI5tMmp1jihdZ4sDsZPuAT%2F20220621%2Fus-east-1%2Fs3%2Faws4_request\u0026X-Amz-Date=20220621T054912Z\u0026X-Amz-Expires=86400\u0026X-Amz-SignedHeaders=host\u0026X-Amz-Signature=6f725472735204ad7a1325592079fa7fafa6b835df58d6d6ba2e5f8dce66fcaa"
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
