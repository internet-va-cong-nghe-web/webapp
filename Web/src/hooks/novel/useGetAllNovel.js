import { useState, useEffect } from 'react';

const useGetAllNovel = () => {
    const [novelList, setNovelList] = useState([]);

    useEffect(() => {
        const getNovelsInfor = async () => {
            const response = await fetch('/Api/api/novels/');
            const data = await response.json();
            if (response.ok) {
                setNovelList(data.datas);
            }
            console.log(data.message);
        };
        getNovelsInfor();
    }, []);
    return { novelList };
};

export default useGetAllNovel;
