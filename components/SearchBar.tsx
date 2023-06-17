import React from "react";

interface SearchBarProps {
  searchTerm: string;
  setSearchTerm: (searchTerm: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className=' '>
      <input
        className='bg-gray-100 rounded-full w-full py-2 px-3 text-sm text-gray-400 font-light focus:outline-none focus:shadow-outline'
        type='text'
        placeholder='Search '
        value={searchTerm}
        onChange={(event) => setSearchTerm(event.target.value)}
      />
    </div>
  );
};

export default SearchBar;
