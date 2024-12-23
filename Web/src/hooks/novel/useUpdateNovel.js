const useUpdateNovel = (id) => {
    const updateNovel = async (novelInfor) => {
        try {
            const formData = new FormData();
            formData.append('poster', novelInfor.poster_img);
            formData.append('novel', JSON.stringify(novelInfor));
            const response = await fetch(`/Api/api/novels/update/${id}`, {
                method: 'POST',
                body: formData,
            });
            console.log(novelInfor);
            const data = await response.json();
            if (!response.ok) {
                console.log(data?.message);
            } else {
                console.log(data?.message);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return { updateNovel };
};

export default useUpdateNovel;
