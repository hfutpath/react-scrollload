# react-scrollload

一个react的function组件，使用IntersectionObserver API实现了滚动加载功能

## Install
```
npm install --save @xiaoluxiaolu/react-scrollload
```

## Usage

```javascript
import './index.css';
import React, { useRef, useState, useEffect, useCallback } from 'react';
import { render } from 'react-dom';
import MyComponent from '../../src';

const Example = () => {
  const [container, setContainer] = useState();
  const [list, setList] = useState([]);
  const wrapperRef = useRef();

  useEffect(() => {
    setContainer(wrapperRef.current);
  }, []);

  const loadMoreFun = useCallback(() => {
    console.log('>>>>>>>>');
    setList((oldList) => oldList.concat(Array.from({ length: 10 })));
  }, []);

  return (
    <ul className='exampleWrapper' ref={wrapperRef}>
      {list.map((item, index) => (
        <li key={index}>item-{index + 1}</li>
      ))}
      <MyComponent container={container} loadMoreFun={loadMoreFun} />
    </ul>
  );
};
const App = () => <Example />;
render(<App />, document.getElementById('root'));
```
