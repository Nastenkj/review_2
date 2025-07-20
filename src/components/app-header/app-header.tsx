import React, { FC } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from '../../services/store';
import { RootState } from '../../services/store';
import styles from './app-header.module.css';
import { TAppHeaderUIProps } from '../ui/app-header/type';
import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon
} from '@zlden/react-developer-burger-ui-components';

export const AppHeaderUI: FC<TAppHeaderUIProps> = ({ userName }) => {
  const location = useLocation();
  
  return (
    <header className={styles.header}>
      <nav className={`${styles.menu} p-4`}>
        <div className={styles.menu_part_left}>
          <Link to="/" className={styles.link}>
            <BurgerIcon type={'primary'} />
            <p className='text text_type_main-default ml-2 mr-10'>Конструктор</p>
          </Link>
          <Link to="/feed" className={styles.link}>
            <ListIcon type={'primary'} />
            <p className='text text_type_main-default ml-2'>Лента заказов</p>
          </Link>
        </div>
        <div className={styles.logo}>
          <Link to="/">
            <Logo className='' />
          </Link>
        </div>
        <div className={styles.link_position_last}>
          <Link to="/profile" className={styles.link}>
            <ProfileIcon type={'primary'} />
            <p className='text text_type_main-default ml-2'>
              {userName || 'Личный кабинет'}
            </p>
          </Link>
        </div>
      </nav>
    </header>
  );
};

export const AppHeader: FC = () => {
  const { user } = useSelector((state: RootState) => state.user);
  return <AppHeaderUI userName={user?.name || ''} />;
};
