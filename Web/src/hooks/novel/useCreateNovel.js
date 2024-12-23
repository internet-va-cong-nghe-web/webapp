
const useCreateNovel = () => {
    const createNovel = async (novelInfor) => {
        try {
            const formData = new FormData();
            formData.append('poster', novelInfor.poster_img);
            formData.append('novel', JSON.stringify(novelInfor));
            const response = await fetch('/Api/api/novels/create/', {
                method: 'POST',
                body: formData,
            });
            const data = await response.json();
            if (!response.ok) {
                console.log(data?.message);
            }
            console.log(data?.message);
        } catch (error) {
            console.log(error);
        }
    };
    return { createNovel };
};

export default useCreateNovel;
