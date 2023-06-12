import {useRef} from 'react';

const once = func => {
  const executed = useRef(false);

  return (...args) => {
    if (!executed.current) {
      executed.current = true;
      func(...args);
    }
  };
};

export {once};
