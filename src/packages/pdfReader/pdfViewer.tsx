import React, { FC, useState } from 'react';
import { Page } from 'react-pdf/dist/esm/entry.webpack';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import styles from './index.scss';

interface RigBoxProps {
  width?: number;
  heigth?: number;
  pageNumber: number;
}

const PdfViewer: FC<RigBoxProps> = props => {
  const { width, heigth, pageNumber } = props;
  return (
    <div className={styles.rightBox} style={{ width: width + 'px', height: heigth }}>
      {
        //@ts-ignore
        <Page pageNumber={pageNumber} width={width - 60} height={heigth} />
      }
    </div>
  );
};
export default PdfViewer;
