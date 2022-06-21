import React, { useState } from "react";

import PdfReader from "../index";

const PdfReaderExample = () => {
  const FinshCallBack = () => {
    alert("finish");
  };

  const [fileUrl, setFileUrl] = useState<string>(
    "http://localhost:3000/sample.pdf"
  );

  return (
    <PdfReader
      FinshCallBack={FinshCallBack}
      role={"admin"}
      windowHeight={1000}
      learnBoxHeigth={6000}
      leftWidht={300}
      rightWidth={700}
      memberId={1}
      courseId={2}
      documentUrl={fileUrl}
      objectKey={"testdfsaf"}
    />
  );
};

export default PdfReaderExample;
