import './index.css';
import React, { useRef, useState, useMemo, useCallback } from 'react';
import { render } from 'react-dom';
import MyComponent from '../../src';

const Example = () => {
  const [list, setList] = useState([]);
  const wrapperRef = useRef();

  const loadMoreFun = useCallback(() => {
    setList((oldList) => oldList.concat(Array.from({ length: 10 })));
  }, []);

  const option = useMemo(() => ({}), []);

  return (
    <ul className='exampleWrapper' ref={wrapperRef}>
      {list.map((item, index) => (
        <li key={index}>item-{index + 1}</li>
      ))}
      <MyComponent loadMoreFun={loadMoreFun} option={option} />
    </ul>
  );
};
const App = () => <Example />;
render(<App />, document.getElementById('root'));
