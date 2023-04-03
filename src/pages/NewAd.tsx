import React from 'react';
import Footer from '../components/Footer/Footer';
import MobileMenu from '../components/MobileMenu/MobileMenu';
import HeaderSection from '../components/NEW/HeaderSection/HeaderSection';
import NewAdBox from '../components/NewAdBox/NewAdBox';
import TitlePages from '../components/TitlePages/TitlePages';

const NewAd:React.FC = () => {
    return (
        <div>
            <MobileMenu />
            <HeaderSection />
            <TitlePages title='آگهی جدید' />
            <NewAdBox />
            <Footer />
        </div>
    );
}

export default NewAd;