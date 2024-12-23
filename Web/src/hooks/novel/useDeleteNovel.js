const useDeleteNovel = () => {
    const deleteNovel = async (storyId) => {
        try {
            const response = await fetch(`/Api/api/novels/${storyId}`, {
                method: 'DELETE',
            });
            const data = await response.json();
            if (response.ok) {
                window.open('/novelsInfor', '_self');
            }
            console.log(data?.message);
        } catch (error) {
            console.log(error);
        }
    };

    return { deleteNovel };
};

export default useDeleteNovel;
