import { useLocation } from 'react-router-dom';
import { useDispatch } from '../../services/store';
import { logoutUser, clearUser } from '../../services/slices/userSlice';
import { ProfileMenuUI } from '@ui';
import { FC } from 'react';

export const ProfileMenu: FC = () => {
  const location = useLocation();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser()).unwrap();
      dispatch(clearUser());
    } catch (error) {
      console.error('Ошибка выхода:', error);
    }
  };

  return <ProfileMenuUI handleLogout={handleLogout} pathname={location.pathname} />;
};
