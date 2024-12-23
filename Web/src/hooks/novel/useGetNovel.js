import { useState, useEffect } from 'react';

const useGetNovel = (id) => {
    const [novel, setNovel] = useState(null);

    useEffect(() => {
        const getNovelInfor = async () => {
            const response = await fetch(`/Api/api/novels/get-detail/${id}`);
            const data = await response.json();
            if (response.ok) {
                setNovel(data.datas);
            } else {
                console.log(data.message);
            }
        };
        getNovelInfor();
    }, []);
    return { novel };
};

export default useGetNovel;
