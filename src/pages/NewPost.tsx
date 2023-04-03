import React from 'react';
import Header from "../components/NEW/ProfilesCompanies/Header";
import NewPosts from '../components/NEW/ProfilesCompanies/NewPost/NewPost';

const NewPost:React.FC = () => {
    return (
        <div>
            <Header />
            <NewPosts />
        </div>
    );
}

export default NewPost;