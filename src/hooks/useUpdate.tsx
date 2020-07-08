import {useEffect, useRef} from 'react';

const useUpdate = (fn: ()=>void, dependency:any[]) => {
  const count = useRef(0);
  useEffect(() => {
    count.current += 1;
  });
  useEffect(() => {
    if (count.current > 1) {
      fn();
    }
   // eslint-disable-next-line
  }, [fn, dependency]);
};

export {useUpdate}
