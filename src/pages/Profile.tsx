import React from 'react';
import HeaderNewShort from '../components/Header/HeaderNewShort';
import BasicTabs from '../components/NEW/ProfilesUsers/Tab';
import MobileMenu from '../components/MobileMenu/MobileMenu';

const ProfileUser:React.FC = () => {
    return (
        <div>
            <MobileMenu />
            <HeaderNewShort />
            <BasicTabs />
        </div>
    );
}

export default ProfileUser;