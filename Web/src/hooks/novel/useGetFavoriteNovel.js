import { useEffect, useState } from 'react';

const useGetFavoriteNovel = () => {
    const [listNovels, setListNovel] = useState([]);

    useEffect(() => {
        const getListNovel = async () => {
            const response = await fetch('/Api/api/novels/list-favorite');
            const data = await response.json();
            if (response.ok) {
                setListNovel(data);
            }
        };
        getListNovel();
    }, []);
    return { listNovels };
};

export default useGetFavoriteNovel;
