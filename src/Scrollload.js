import './ScrollLoad.css';
import React, { useEffect, useRef, useState } from 'react';
import { isFunction } from 'lodash';

const ScrollLoad = ({ container, option, loadMoreFun, loadingContent }) => {
  const [stop, toggleStop] = useState(true);
  const spinRef = useRef(null);

  useEffect(() => {
    let io;
    // container 有值时才进行滚动监听
    if (container) {
      io = new IntersectionObserver(
        (entries) => {
          // 如果不可见，就不再请求数据
          if (entries[0].intersectionRatio <= 0) {
            return;
          }

          if (isFunction(loadMoreFun)) {
            // 请求数据前停止观察，请求结束时再更具数据结果，看是否要继续监听
            io.unobserve(spinRef.current);
            Promise.resolve(loadMoreFun()).then((stop) => {
              toggleStop(stop);
              if (stop) {
                // 关闭观察器
                io.disconnect();
              } else {
                // 继续开启观察
                io.observe(spinRef.current);
              }
            });
          }
        },
        { container, ...option }
      );
      // 初始或container变更时开启观察
      io.observe(spinRef.current);
    }
    return () => {
      // 关闭观察器
      io && io.disconnect();
    };
  }, [container, loadMoreFun, option]);

  return (
    <div ref={spinRef} className='tui-scrollLoad-spin'>
      {!stop && loadingContent}
    </div>
  );
};

ScrollLoad.defaultProps = {
  option: {},
  loadingContent: '加载中...'
};

export default ScrollLoad;
