import {useState, useEffect} from 'react';

const useDebounce = (
  value: string,
  delay: number,
  callback: (value: string) => void,
): any => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  useEffect(() => {
    if (callback) {
      callback(debouncedValue);
    }
  }, [debouncedValue, callback]);

  return debouncedValue;
};

export default useDebounce;
