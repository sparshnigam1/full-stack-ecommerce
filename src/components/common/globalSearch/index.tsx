import SearchIcon from "@/components/icons/searchIcon";
import useDebounce from "@/hooks/useDebounce";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { MdClose } from "react-icons/md";

interface Props {
  onChange: (value: string) => void;
  searchTerms: string[];
  defaultVal?: string;
}

const GlobalSearch = ({ onChange, searchTerms, defaultVal }: Props) => {
  const [inputVal, setInputVal] = useState(defaultVal || "");
  const { debouncedValue } = useDebounce({ value: inputVal, delay: 500 });

  const [index, setIndex] = useState(0);
  const [word, setWord] = useState("");
  const [letter, setLetter] = useState(0);

  const handleClear = () => {
    setInputVal("");
  };

  useEffect(() => {
    const type = () => {
      setLetter((letter) => letter + 1);
      if (letter === searchTerms[index]?.length) {
        setTimeout(
          () => setIndex((index) => (index + 1) % searchTerms?.length),
          1200
        );
        setTimeout(() => setLetter(0), 1200);
      }
    };
    const interval = setInterval(type, 100);
    return () => clearInterval(interval);
  }, [letter, searchTerms, index]);

  useEffect(() => {
    setWord(searchTerms[index]?.slice(0, letter));
  }, [letter, searchTerms, index]);

  useEffect(() => {
    onChange(debouncedValue);
  }, [debouncedValue]);

  return (
    <div className="w-full max-w-90 h-10 bg-white rounded-std border border-border-grey p-1.5 flex items-center justify-between gap-3">
      <input
        type="text"
        // placeholder={`Search by ${word}`}
        placeholder={searchTerms?.length ? `Search by ${word}` : "Search..."}
        value={inputVal}
        onChange={(e) => setInputVal(e.target.value)}
        className={cn(
          "h-full w-full ml-3.5 text-sm",
          "focus-visible:outline-0"
        )}
      />
      {!inputVal ? (
        <div className="w-full max-w-7.5 h-7.5 rounded-std bg-primary-white flex items-center justify-center aspect-square z-2">
          <SearchIcon className="w-full pointer-events-none text-primary size-4" />
        </div>
      ) : (
        <button
          onClick={handleClear}
          className="w-full max-w-7.5 h-7.5 rounded-std bg-primary-white flex items-center justify-center aspect-square z-2 cursor-pointer"
        >
          <MdClose className="size-4 text-primary" />
        </button>
      )}
    </div>
  );
};

export default GlobalSearch;
