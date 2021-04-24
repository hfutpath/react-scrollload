import './ScrollLoad.css';
import React, { useEffect, useRef, useState } from 'react';

const ScrollLoad = ({ option, loadMoreFun, loadingContent }) => {
  const [stop, toggleStop] = useState(false);
  const spinRef = useRef(null);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        const entry = entries.find((item) => item.target === spinRef.current);
        // 如果不可见，就不再请求数据
        if (!entry || !entry.isIntersecting) {
          return;
        }
        if (typeof loadMoreFun === 'function') {
          // 请求数据前停止观察，请求结束时再更具数据结果，看是否要继续监听
          io.unobserve(spinRef.current);
          Promise.resolve(loadMoreFun()).then((stop) => {
            toggleStop(!!stop);
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
      { ...option }
    );
    io.observe(spinRef.current);
    return () => {
      // 关闭观察器
      io && io.disconnect();
    };
  }, [loadMoreFun, option]);

  return (
    <div ref={spinRef} className='tui-scrollLoad-spin'>
      {!stop && loadingContent}
    </div>
  );
};

ScrollLoad.defaultProps = {
  option: {},
  loadingContent: 'loading...'
};

export default ScrollLoad;
