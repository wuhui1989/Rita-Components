import React, { FC, useState } from 'react';
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import styles from './index.scss';
import classnames from 'classnames';
import { CheckOutlined, VerticalAlignMiddleOutlined } from '@ant-design/icons';
const isReadSrc = require('@/assets/training/isRead.svg');

export interface pageWindowProps {
  width?: number;
  windowHeight?: number;
  role: string;
  pageNumber: number;
  setViewCurrentPage: (page: number) => void;
  isView?: boolean;
  isRead?: boolean;
}

const LearnPdf: FC<pageWindowProps> = props => {
  const { width, windowHeight, pageNumber, setViewCurrentPage, isView, isRead, role } = props;
  const setCurrentPage = (cPage: number) => {
    // alert(cPage)
    setViewCurrentPage(cPage);
  };

  return (
    <div>
      <div className={classnames({ [styles.windowBox]: true, [styles.isView]: isView })}>
        <div
          className={classnames({ [styles.pageWindow]: true })}
          style={{ height: windowHeight }}
          onClick={() => {
            setCurrentPage(pageNumber);
          }}
        >
          {
            // @ts-ignore
            <Page pageNumber={pageNumber} width={width} />
          }

          {isRead && role !== 'operator' ? (
            <img
              src={isReadSrc}
              className={styles.pageIcon}
              style={{ color: 'rgb(82, 196, 26)' }}
            />
          ) : (
            <></>
          )}
        </div>
      </div>
      <span className={styles.pageSpan}>{pageNumber}</span>
    </div>
  );
};
export default LearnPdf;
