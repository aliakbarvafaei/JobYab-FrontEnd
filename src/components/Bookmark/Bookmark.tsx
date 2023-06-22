import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import CardItem from "./Card";
import { getBookmark } from "../../services/api";
import { post } from "../../ts/interfaces";
import { accessToken } from "../../ts/functions";
import { useDispatch } from "react-redux";

const Bookmark: React.FC = () => {
  const [bookmarks, setBookmarks] = useState<Array<{ id: number; post: post }>>(
    []
  );
  const dispatch = useDispatch();
  useEffect(() => {
    accessToken(dispatch);

    getBookmark()
      .then((response) => {
        setBookmarks(response.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <Box className="mdmin:mx-[15%]" style={{ fontFamily: "IRANSans" }}>
        <Box
          className="smmin:flex-row sm:flex-col"
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <h1 className="text-[20px]">نشان شده‌ها</h1>
        </Box>
        <Box
          style={{
            fontFamily: "IRANSans",
            paddingLeft: "0px",
            paddingRight: "0px",
          }}
        >
          <Box
            style={{
              backgroundColor: "#d8dbe2",
              paddingLeft: "0px",
              paddingRight: "0px",
              paddingTop: "20px",
              paddingBottom: "20px",
              marginTop: "10px",
              fontSize: "1rem",
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 4,
            }}
          >
            {bookmarks === null ? (
              <>
                <i
                  style={{ fontSize: "24.5px" }}
                  className="fa fa-spinner fa-spin"
                  aria-hidden="true"
                ></i>
              </>
            ) : bookmarks.length > 0 ? (
              <>
                {bookmarks.map((item) => (
                  <CardItem item={item} />
                ))}
              </>
            ) : (
              <>
                <SearchIcon style={{ fontSize: "4rem", color: "gray" }} />
                لیست نشان شده‌ها خالی است
              </>
            )}
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Bookmark;
