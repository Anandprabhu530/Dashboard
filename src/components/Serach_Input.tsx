import { useEffect, useState } from "react";

const Search_Input = ({ value: data, onChange }) => {
  const [value, setValue] = useState(data);

  useEffect(() => {
    setValue(data);
  }, [data]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value);
    }, 500);
    return () => clearTimeout(timeout);
  }, [value]);

  return (
    <input
      value={value}
      onChange={(e) => setValue(e.target.value)}
      className="bg-transparent p-2 border-white border outline-none rounded-md"
      placeholder="Serach Here"
    />
  );
};

export default Search_Input;
