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
