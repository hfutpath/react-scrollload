# react-scrollload

一个 react 的 function 组件，使用 IntersectionObserver API 实现了滚动加载功能。

_A React Function component that implements scrolling loading using the IntersectionObserver API._

IntersectionObserver API 目前在标准中的状态为 wd(W3C 手稿)，在[www.caniuse.com](https://www.caniuse.com/?search=IntersectionObserver)上查询，该 API 已得到[92.19% + 1.6% = 93.79%](https://www.caniuse.com/?search=IntersectionObserver)的全球浏览器支持。

_The IntersectionObserver API is currently in the standard status of WD (W3C Manuscript)，The API is supported by [92.19% + 1.6% = 93.79%](https://www.caniuse.com/?search=IntersectionObserver) of the world's browsers at [www.caniuse.com](https://www.caniuse.com/?search=IntersectionObserver)._

如果您在使用中遇到兼容问题，可以安装[intersection-observer](https://www.npmjs.com/package/intersection-observer)这一 IntersectionObserver polyfill，进行兼容处理。

_If you run into compatibility problems, you can install the intersectionObserver polyfill, [intersection-observer](https://www.npmjs.com/package/intersection-observer), for compatibility._

## Installation

```
npm install --save @xiaoluxiaolu/react-scrollload
```

## Usage

### Basic Example

---

```javascript
import React, { useRef, useState, useMemo, useCallback } from 'react';
import { render } from 'react-dom';
import Scrollload from '@xiaoluxiaolu/react-scrollload';

const Example = () => {
  const [list, setList] = useState([]);

  const loadMoreFun = useCallback(() => {
    setList((oldList) => oldList.concat(Array.from({ length: 10 })));
    // if you wan'to stop loading more, return false in this function
    // if (some condition) {
    //    return false
    // }
  }, []);

  const option = useMemo(() => ({}), []);

  return (
    <ul>
      {list.map((item, index) => (
        <li key={index}>item-{index + 1}</li>
      ))}
      <Scrollload loadMoreFun={loadMoreFun} option={option} />
    </ul>
  );
};
const App = () => <Example />;
render(<App />, document.getElementById('root'));
```

## Props

### loadMoreFun(required) \| defaultValue： -

当加载触发时，执行的回调。

_The callback that is executed when the load is triggered._

当需要停止继续加载数据时，在这个 function 中 return false 即可。

_When it is time to stop loading data, return false in this function._

请使用 useCallback 包裹，以免触发 re-render

_Please use the useCallback to avoid triggering re-render_

### option(optional) \| type: {root:HTMLElement,rootMargin:string,threshold: number} \| defaultValue： {}

一个可以用来配置 observer 实例的对象,参考：[MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/IntersectionObserver/IntersectionObserver)

_An optional object which customizes the observe,reference:[MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/IntersectionObserver/IntersectionObserver)_

如果传入，请使用 useMemo 包裹，以免触发 re-render

_If passed in, use the useMemo to avoid triggering re-render_

### loadingContent(optional) \| type: ReactNode \| defaultValue： 'loading...'

被监听元素的内容

_The contents of the element being listened on_
