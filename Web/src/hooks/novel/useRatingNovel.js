import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
function useRatingNovel(storyId) {
    const [rate, setRate] = useState(0);
    useEffect(() => {
        const getRate = async () => {
            const response = await fetch('/Api/api/novels/getRate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ storyId }),
            });
            const data = await response.json();
            if (response.ok) {
                setRate(data);
            } else {
                console.log(data.error);
            }
        };
        getRate();
    }, []);

    const RatingNovel = async (storyId, rate) => {
        const response = await fetch('/Api/api/novels/rating', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ storyId, star: rate }),
        });
        const data = await response.json();
        if (!response.ok) {
            toast.error('Vui lòng đăng nhập !!!');
        } 
        return { response, data };
    };
    return { RatingNovel, rate, setRate };
}

export default useRatingNovel;
