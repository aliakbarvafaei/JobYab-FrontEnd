import React from 'react';
import EditAdBox from '../components/EditAdBox/EditAdBox';
import Footer from '../components/Footer/Footer';
import HeaderNewShort from '../components/HeaderNew/HeaderNewShort';
import MobileMenu from '../components/MobileMenu/MobileMenu';
import TitlePages from '../components/TitlePages/TitlePages';

const EditAd:React.FC = () => {
    return (
        <div>
            <MobileMenu />
            <HeaderNewShort />
            <TitlePages title='ویرایش آگهی' />
            <EditAdBox />
            <Footer />
        </div>
    );
}

export default EditAd;