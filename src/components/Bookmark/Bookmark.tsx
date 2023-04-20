import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import CardItem from "./Card";
import { getBookmark } from "../../services/api";
import { post } from "../../ts/interfaces";

const Bookmark: React.FC = () => {
  const [bookmarks, setBookmarks] = useState<Array<{ id: number; post: post }>>(
    []
  );
  useEffect(() => {
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
      <Box className="mdmin:mx-[15%]" sx={{ fontFamily: "IRANSans" }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            justifyContent: "space-between",
          }}
        >
          <h1 className="text-[20px]">نشان شده‌ها</h1>
        </Box>
        <Box sx={{ fontFamily: "IRANSans", paddingX: "0px" }}>
          <Box
            sx={{
              backgroundColor: "#d8dbe2",
              paddingX: "0px",
              paddingY: "20px",
              marginTop: "10px",
              fontSize: "1rem",
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              justifyContent: "center",
              alignItems: "center",
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
                <SearchIcon sx={{ fontSize: "4rem", color: "gray" }} />
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
