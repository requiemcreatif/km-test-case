import React from 'react';

interface SearchBarProps {
    searchTerm: string,
    setSearchTerm: (searchTerm: string) => void
}

const SearchBar: React.FC<SearchBarProps> = ({searchTerm, setSearchTerm}) => {
    return (
        <div className="py-2">
            <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                placeholder="Search Campaigns"
                value={searchTerm}
                onChange={event => setSearchTerm(event.target.value)}
            />
        </div>
    );
}

export default SearchBar;
