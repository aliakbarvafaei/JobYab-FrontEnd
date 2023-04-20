import React from 'react';
import Header from "../components/ProfilesCompanies/Header";
import NewPosts from '../components/ProfilesCompanies/NewPost/NewPost';

const NewPost:React.FC = () => {
    return (
        <div>
            <Header />
            <NewPosts />
        </div>
    );
}

export default NewPost;