import { useEffect } from "react";

type UseDebounceProps = {
  value: string | null;
  delay: number;
  setDebouncedValue: React.Dispatch<React.SetStateAction<string | null>>;
};

export const useDebounce = ({ value, delay, setDebouncedValue }: UseDebounceProps) => {
  useEffect(() => {
    const handler = setTimeout(() => {
      if (value !== null) {
        setDebouncedValue(value);
      }
    }, delay);

    return () => clearTimeout(handler);
  }, [value, delay, setDebouncedValue]);
};
