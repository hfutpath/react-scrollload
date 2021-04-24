# react-scrollload

---

一个 react 的 function 组件，使用 IntersectionObserver API 实现了滚动加载功能

A React Function component that implements scrolling loading using the IntersectionObserver API

IntersectionObserver API 目前在标准中的状态为 wd(W3C 手稿)，在[www.caniuse.com](https://www.caniuse.com/?search=IntersectionObserver)上查询，该 API 已得到[92.19% + 1.6% = 93.79%](https://www.caniuse.com/?search=IntersectionObserver)的全球浏览器支持。

The IntersectionObserver API is currently in the standard status of WD (W3C Manuscript)，The API is supported by [92.19% + 1.6% = 93.79%](https://www.caniuse.com/?search=IntersectionObserver) of the world's browsers at [www.caniuse.com](https://www.caniuse.com/?search=IntersectionObserver)

如果您在使用中遇到兼容问题，可以安装[intersection-observer](https://www.npmjs.com/package/intersection-observer)这一 IntersectionObserver polyfill，进行兼容处理。

If you run into compatibility problems, you can install the intersectionObserver polyfill, [intersection-observer](https://www.npmjs.com/package/intersection-observer), for compatibility.

## Installation

---

```
npm install --save @xiaoluxiaolu/react-scrollload
```

## Usage

---

### Basic Example

---

```javascript
import React, { useRef, useState, useEffect, useCallback } from 'react';
import { render } from 'react-dom';
import Scrollload from '@xiaoluxiaolu/react-scrollload';

const Example = () => {
  const [container, setContainer] = useState();
  const [list, setList] = useState([]);
  const wrapperRef = useRef();

  useEffect(() => {
    setContainer(wrapperRef.current);
  }, []);

  const loadMoreFun = useCallback(() => {
    setList((oldList) => oldList.concat(Array.from({ length: 10 })));
    // if you wan'to stop load more, return false in this function
    // if (some condition) {
    //    return false
    // }
  }, []);

  return (
    <ul ref={wrapperRef}>
      {list.map((item, index) => (
        <li key={index}>item-{index + 1}</li>
      ))}
      <Scrollload container={container} loadMoreFun={loadMoreFun} />
    </ul>
  );
};
const App = () => <Example />;
render(<App />, document.getElementById('root'));
```
