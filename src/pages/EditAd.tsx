import React from 'react';
import EditAdBox from '../components/EditAdBox/EditAdBox';
import Footer from '../components/Footer/Footer';
import MobileMenu from '../components/MobileMenu/MobileMenu';
import HeaderSection from '../components/NEW/HeaderSection/HeaderSection';
import TitlePages from '../components/TitlePages/TitlePages';

const EditAd:React.FC = () => {
    return (
        <div>
            <MobileMenu />
            <HeaderSection />
            <TitlePages title='ویرایش آگهی' />
            <EditAdBox />
            <Footer />
        </div>
    );
}

export default EditAd;