import React, { useCallback } from 'react'
import { RxCross2 } from "react-icons/rx";

const SearchBar = ({ onSearch }: { onSearch: (value: string) => void }) => {
    const [searchTerm, setSearchTerm] = React.useState('')

    const handleSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value)
        onSearch && onSearch(e.target.value)
    }, [onSearch])

    const handleCloseSearch = useCallback(() => {
        setSearchTerm("")
        onSearch && onSearch("")
    }, [onSearch])

    return (
        <div className="mt-3 md:my-5 relative">
            <input
                className='border-2 border-gray-300 rounded-md p-2 w-full min-w-96 px-5 py-2.5'
                placeholder='Search by product name...'
                value={searchTerm}
                onChange={(e) => handleSearch(e)}
            />
            {searchTerm.length > 0 && (
                <span className='absolute right-2.5 top-[30%] cursor-pointer' onClick={() => handleCloseSearch()}>
                    <RxCross2 size={20} />
                </span>
            )}
        </div>
    )
}

export default SearchBar