import React, { FC, useEffect, useMemo, useState } from 'react';
import { Document, Page } from './common';
import styles from './index.scss';
import PageWindow from './pageWindow';
import PdfViewer from './pdfViewer';
import { message } from 'antd';
import { pageWindowProps } from './pageWindow';
import { DownOutlined, LoadingOutlined, UpOutlined } from '@ant-design/icons';

export type Prograss =
  | 'documentDone'
  | 'documentOpen'
  | 'done'
  | 'exerciseDone'
  | 'exerciseOpen'
  | 'questionDone'
  | 'questionOpen';


interface IProps {
  memberId?: number;
  role: string;
  leftWidht: number;
  rightWidth: number;
  documentUrl: string;
  windowHeight: number;
  learnBoxHeigth: number;
  courseId?: number;
  objectKey: string;
  FinshCallBack?: (type: Prograss) => void;
}

const PdfReader: FC<IProps> = props => {
  //分页窗口展示的页码数
  const maxPageNumber = 2;
  const { leftWidht, rightWidth, documentUrl, memberId, objectKey, role, FinshCallBack } = props;
  // pdf 总页数
  const [totalPage, setTotalPage] = useState<number>(1);
  // 当前展示的pdf页码
  const [pageNumber, setPageNumber] = useState<number>(1);
  // 当前页
  const [curentLeaf, setCurrentLeaf] = useState<number>(1);
  // pdf loading
  const [isLoad, setIsLoad] = useState<boolean>(false);

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    // 设置总页数
    setTotalPage(numPages);
    setIsLoad(true);

    // 缓存总页数
    localStorage.setItem(objectKey + memberId + 'totalPage', numPages + '');
    // const readPageStr = localStorage.getItem(objectKey + memberId);
    // if (readPageStr && readPageStr.length > 0) {
    //   const readPageArr = readPageStr.split(',');
    //   if (readPageArr.length > 0) {
    //     setCurrentPage(Number(readPageArr[readPageArr.length - 1]));
    //   }
    // }

    // 设置当前页
    const readPageStr = localStorage.getItem(objectKey + memberId);
    if (readPageStr && readPageStr.length > 0) {
      let tpageArr = readPageStr.split(',');
      if (tpageArr && tpageArr?.length > 0 && tpageArr[tpageArr.length - 1] !== undefined) {
        // 设置当前页为缓存中最后一pdf页
        setCurrentPage(Number(tpageArr[tpageArr.length - 1]));
        // 设置缓存中最后一pdf页所在页为当前页
        const cu = Math.ceil(Number(tpageArr[tpageArr.length - 1]) / maxPageNumber);
        setCurrentLeaf(Math.ceil(Number(tpageArr[tpageArr.length - 1]) / maxPageNumber));
      }
    }
  };

  // const prevPage = () => {
  //   if (pageNumber > 1) setPageNumber(pageNumber - 1);
  // };
  // const nextPage = () => {
  //   if (pageNumber < totalPage) setPageNumber(pageNumber + 1);
  // };

  //题目下翻
  const prevPage = () => {
    if (curentLeaf > 1) {
      let cleaf = curentLeaf - 1;
      setCurrentLeaf(cleaf);
      setCurrentPage((cleaf - 1) * maxPageNumber + 1);
    }
  };

  //题目上翻
  const nextPage = () => {
    if (curentLeaf * maxPageNumber < totalPage) {
      let cleaf = curentLeaf + 1;
      setCurrentLeaf(cleaf);
      setCurrentPage((cleaf - 1) * maxPageNumber + 1);
    }
  };

  const setCurrentPage = (cPage: number) => {
    const readPageStr = localStorage.getItem(objectKey + memberId);
    let readPageArr: string[] = [];
    if (readPageStr && readPageStr?.length > 0) {
      readPageArr = readPageStr.split(',');
      if (readPageArr.indexOf(cPage + '') < 0) {
        readPageArr.push(cPage + '');
      }
    } else {
      readPageArr.push(cPage + '');
    }
    localStorage.setItem(objectKey + memberId, readPageArr.join(','));
    setPageNumber(cPage);
  };

  // 学习完成|开始学习 提交回调
  useEffect(() => {
    if (role !== 'operator' && isLoad) {
      if (totalPage === pageNumber) {
        localStorage.removeItem(objectKey + memberId);
        localStorage.removeItem(objectKey + memberId + 'totalPage');
        FinshCallBack && FinshCallBack('documentDone');
      } else {
        if (pageNumber === 1) {
          FinshCallBack && FinshCallBack('documentOpen');
        }
      }
    }
  }, [totalPage, pageNumber, isLoad]);

  const windowList = useMemo(() => {
    let list: pageWindowProps[] = [];
    const readPageStr: string | null = localStorage.getItem(objectKey + memberId);
    let readPageArr: string[] = [];
    if (readPageStr) {
      readPageArr = readPageStr.split(',');
    }
    for (let i = (curentLeaf - 1) * maxPageNumber + 1; i < curentLeaf * maxPageNumber + 1; i++) {
      let tmp: pageWindowProps = {} as pageWindowProps;
      if (readPageArr.length > 0 && readPageArr.indexOf(i + '') >= 0) {
        tmp.isRead = true;
      } else {
        tmp.isRead = false;
      }
      tmp.setViewCurrentPage = setCurrentPage;
      tmp.width = leftWidht;
      tmp.pageNumber = i;
      i === pageNumber ? (tmp.isView = true) : (tmp.isView = false);
      list.push(tmp);
    }
    console.log(list);
    return list;
  }, [pageNumber, curentLeaf]);

  return (
    <div>
      {
        //@ts-ignore
        <Document file={documentUrl} onLoadSuccess={onDocumentLoadSuccess} loading="" error="">
          <div className={styles.pdfBox}>
            <div className={styles.leftBox} style={{ width: leftWidht + 'px' }}>
              {/* <UpOutlined
                style={{ marginBottom: '8px' }}
                className={styles.middleIcon}
                onClick={prevPage}
              /> */}
              <div className={styles.centerIcomTop}>
                <div className={styles.middleIcon} onClick={prevPage} />
              </div>

              {totalPage &&
                windowList &&
                windowList.length > 0 &&
                windowList.map(item => {
                  if (item.pageNumber <= totalPage) {
                    return (
                      <PageWindow
                        key={item.pageNumber}
                        width={item.width}
                        pageNumber={item.pageNumber}
                        setViewCurrentPage={setCurrentPage}
                        isView={item.isView}
                        isRead={item.isRead}
                        role={role}
                        windowHeight={Number((props.learnBoxHeigth - 98) / 2)}
                      />
                    );
                  }
                })}

              <div className={styles.centerIcomBottom}>
                <div className={styles.middleIcon} onClick={nextPage} />
              </div>

              {/* <img
                src={pdfBottomPageSrc}
                style={{ marginBottom: '8px' }}
                className={styles.middleIcon}
                onClick={nextPage}
              /> */}
              {/* <DownOutlined
                className={styles.middleIcon}
                style={{ marginTop: '0px' }}
                onClick={nextPage}
              /> */}
            </div>
            <PdfViewer width={rightWidth} pageNumber={pageNumber} heigth={props.learnBoxHeigth} />
          </div>
        </Document>
      }
      {!isLoad && leftWidht > 0 && props.learnBoxHeigth > 0 && (
        <div
          style={{
            width: leftWidht + rightWidth - 48,
            height: props.learnBoxHeigth,
            marginLeft: '24px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <span style={{ color: '#333333', marginRight: '15px' }}>文件加载中</span>
          <LoadingOutlined className={styles.loadingIcon} />
        </div>
      )}
    </div>
  );
};
export default PdfReader;
