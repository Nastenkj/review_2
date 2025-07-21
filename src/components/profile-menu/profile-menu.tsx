import { FC } from 'react';
import { useDispatch } from '../../services/store';
import { logoutUser } from '../../services/slices/userSlice';
import { ProfileMenuUI } from '../ui/profile-menu/profile-menu';

interface ProfileMenuProps {
  pathname: string;
}

export const ProfileMenu: FC<ProfileMenuProps> = ({ pathname }) => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return <ProfileMenuUI handleLogout={handleLogout} pathname={pathname} />;
};
