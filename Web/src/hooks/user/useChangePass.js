import { useContext, useState } from 'react';
import { UserContext } from '~/context/authContext';

const useChangePassword = () => {
  const { user, setUser } = useContext(UserContext);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

   const changePassword = async () => {
    setError('');

      if (newPassword !== confirmPassword) {
      setError('Mật khẩu mới không trùng khớp.');
      return;
      }

       try {
      const response = await fetch('/Api/api/user/changePassword', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user.id,
          oldPassword,
          newPassword,
        }),
      });

      const data = await response.json();

     if (response.ok) {
        console.log('Đổi mật khẩu thành công');
        // setUser({ ...user, password: newPassword });
        setError('');
      } else {
        setError(data?.message || 'Đã xảy ra lỗi khi đổi mật khẩu.');
      }
    } catch (error) {
      console.error(error);
      setError('Đã xảy ra lỗi không xác định.');
    }
  };

  return {
    oldPassword,
    setOldPassword,
    newPassword,
    setNewPassword,
    confirmPassword,
    setConfirmPassword,
    changePassword,
    error,
  };
};

export default useChangePassword;
