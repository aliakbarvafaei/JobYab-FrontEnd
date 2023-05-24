import React from "react";
import Header from "../components/ProfilesCompanies/Header";
import NewPosts from "../components/ProfilesCompanies/NewPost/NewPost";

const NewPost: React.FC = () => {
  return (
    <div data-testid="new-post">
      <Header />
      <NewPosts />
    </div>
  );
};

export default NewPost;
