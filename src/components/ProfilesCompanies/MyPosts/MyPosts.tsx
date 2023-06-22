import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import CardItem from "./Card";
import { getMyPosts } from "../../../services/api";
import { accessToken } from "../../../ts/functions";
import { useDispatch } from "react-redux";

const MyPosts: React.FC = () => {
  const [MyPosts, setMyPosts] = useState<null | Array<any>>(null);
  const dispatch = useDispatch();

  useEffect(() => {
    accessToken(dispatch);
    getMyPosts()
      .then((response) => {
        setMyPosts(response.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <Box className="mdmin:mx-[15%]" style={{ fontFamily: "IRANSans" }}>
      <h1 className="text-[20px]">آگهی‌های من</h1>
      <Box
        style={{
          backgroundColor: "#d8dbe2",
          marginTop: "10px",
          paddingTop: "20px",
          paddingBottom: "20px",
          fontSize: "1rem",
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {MyPosts === null ? (
          <>
            <i
              style={{ fontSize: "24.5px" }}
              className="fa fa-spinner fa-spin"
              aria-hidden="true"
            ></i>
          </>
        ) : MyPosts.length > 0 ? (
          <>
            {MyPosts.map((item) => (
              <CardItem item={item} />
            ))}
          </>
        ) : (
          <>
            <SearchIcon style={{ fontSize: "4rem", color: "gray" }} />
            لیست آگهی‌های این بخش خالی است
          </>
        )}
      </Box>
    </Box>
  );
};

export default MyPosts;
