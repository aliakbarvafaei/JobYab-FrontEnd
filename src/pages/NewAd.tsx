import React from 'react';
import Footer from '../components/Footer/Footer';
import HeaderNewShort from '../components/HeaderNew/HeaderNewShort';
import MobileMenu from '../components/MobileMenu/MobileMenu';
import NewAdBox from '../components/NewAdBox/NewAdBox';
import TitlePages from '../components/TitlePages/TitlePages';

const NewAd:React.FC = () => {
    return (
        <div>
            <MobileMenu />
            <HeaderNewShort />
            <TitlePages title='آگهی جدید' />
            <NewAdBox />
            <Footer />
        </div>
    );
}

export default NewAd;