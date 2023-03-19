import React from 'react';
import HeaderNewShort from '../components/HeaderNew/HeaderNewShort';
import NewAdBox from '../components/NewAdBox/NewAdBox';
import TitlePages from '../components/TitlePages/TitlePages';

const NewAd:React.FC = () => {
    return (
        <div>
            <HeaderNewShort />
            <TitlePages title='آگهی جدید' />
            <NewAdBox />
        </div>
    );
}

export default NewAd;