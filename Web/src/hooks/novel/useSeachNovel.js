import { useEffect, useState } from 'react';

const useSearchNovel = (name) => {
    const [searchResult, setSearchResult] = useState([])
    useEffect(() => {
        const searchNovels = async () => {
            const response = await fetch('/Api/api/novels/search-novel', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name: name }),
            })

            const data = await response.json();
            if (response.ok) {
                setSearchResult(data)
            }


        };
        searchNovels();
    }, [])
    return { searchResult };


};

export default useSearchNovel;