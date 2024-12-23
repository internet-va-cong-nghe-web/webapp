import toast from 'react-hot-toast';
function useFollowNovel() {
    const FollowNovel = async (id) => {
        const response = await fetch('/Api/api/novels/follow', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ storyId: id }),
        });
        const data = await response.json();
        if (response.ok) {
            toast.success('Thanh cong!');
        } else {
            toast.error('Vui lòng đăng nhập !!!');

        }
        return { response, data };
    };
    return { FollowNovel };
}

export default useFollowNovel;
