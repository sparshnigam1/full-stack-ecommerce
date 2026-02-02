import { useState, useEffect } from "react";

interface Props {
  value: string;
  delay: number;
}

function useDebounce({ value, delay }: Props) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timeout);
    };
  }, [value, delay]);

  return { debouncedValue } as const;
}

export default useDebounce;
