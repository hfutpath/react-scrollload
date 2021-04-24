import React, { useState, useMemo, useCallback } from 'react';
import { render } from 'react-dom';
import MyComponent from '../../src';

const Example = () => {
  const [list, setList] = useState([]);

  const loadMoreFun = useCallback(() => {
    setList((oldList) => oldList.concat(Array.from({ length: 10 })));
  }, []);

  const option = useMemo(() => ({}), []);

  return (
    <ul
      style={{
        border: '1px solid #333',
        height: 400,
        width: 200,
        overflowY: 'auto'
      }}
    >
      {list.map((item, index) => (
        <li key={index} style={{ height: 30, borderBottom: '1px solid #333' }}>
          item-{index + 1}
        </li>
      ))}
      <MyComponent loadMoreFun={loadMoreFun} option={option} />
    </ul>
  );
};
const App = () => <Example />;
render(<App />, document.getElementById('root'));
