import React from "react";
import Header from "../components/ProfilesCompanies/Header";
import UpdatePosts from "../components/ProfilesCompanies/UpdatePost/UpdatePost";

const UpdatePost: React.FC = () => {
  return (
    <div data-testid="update-post">
      <Header />
      <UpdatePosts />
    </div>
  );
};

export default UpdatePost;
