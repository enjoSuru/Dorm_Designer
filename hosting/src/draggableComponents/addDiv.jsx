import React, { useState } from 'react';

function useDynamicDivs(initialCount = 0) {
  const [divCount, setDivCount] = useState(initialCount);

  const addDiv = () => {
    setDivCount(divCount + 1);
  };

  const divs = Array.from({ length: divCount }).map((_, index) => (
    <div key={index}>This is div {index + 1}</div>
  ));

  return { divs, addDiv };
}

function App() {
  const { divs, addDiv } = useDynamicDivs();

  return (
    <div>
      <button onClick={addDiv}>Add Div</button>
      <div>{divs}</div>
    </div>
  );
}

export default useDynamicDivs;