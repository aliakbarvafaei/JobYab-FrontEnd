import React from 'react';
import EditAdBox from '../components/EditAdBox/EditAdBox';
import HeaderNewShort from '../components/HeaderNew/HeaderNewShort';
import TitlePages from '../components/TitlePages/TitlePages';

const EditAd:React.FC = () => {
    return (
        <div>
            <HeaderNewShort />
            <TitlePages title='ویرایش آگهی' />
            <EditAdBox />
        </div>
    );
}

export default EditAd;