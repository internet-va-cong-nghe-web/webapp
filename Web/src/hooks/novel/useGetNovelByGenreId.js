import { useEffect, useState } from 'react';

const useGetNovelByGenreId = (id) => {
    const [listNovels, setListNovel] = useState([]);
    const [genreName, setGenreName] = useState('')

    useEffect(() => {
        const getNovels = async () => {
            const response = await fetch('/Api/api/novels/get-novel-by-genre', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ genreId: id }),
            })

            const data = await response.json();
            if (response.ok) {
                setListNovel(data.novelList);
                setGenreName(data.genreName)
            }

        };
        getNovels();
    }, []);
    return { listNovels, genreName };
};

export default useGetNovelByGenreId;