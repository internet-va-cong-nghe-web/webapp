import { useState, useEffect } from 'react';

const useGetNovel = (id) => {
    const [novel, setNovel] = useState(null);
    const [testArray, setTestArray] = useState([]);


    useEffect(() => {
        const getNovelInfor = async () => {
            const response = await fetch(`/Api/api/novels/get-detail/${id}`);
            const data = await response.json();
            console.log("API response:", data);
            if (response.ok) {
                setNovel(data.datas);
                console.log("noveldata:", data.datas);
                setTestArray(data.datas);
                console.log("test:", data.datas);
                console.log("Rendered datas", data.datas);  //bug can't setNovel data
            } else {
                console.log(data.message);
            }
        };
        getNovelInfor();
    }, [id]);
    console.log("Returning novel:", novel); // Log giá trị trước khi trả về
    return { novel };
};

export default useGetNovel;
