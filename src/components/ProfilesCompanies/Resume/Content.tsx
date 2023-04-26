import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import CardItem from "./Card";
import { getMyReciveResumes } from "../../../services/api";
import { reciveResume } from "../../../ts/interfaces";

const Content: React.FC<{ index: number }> = ({ index }) => {
  const [resumes, setResumes] = useState<null | Array<reciveResume>>(null);

  useEffect(() => {
    if (index === 2) {
      getMyReciveResumes(index + 2)
        .then((response) => {
          setResumes((old: null | Array<reciveResume>) => {
            if (old !== null) return [...old, ...response.data.data];
            else return response.data.data;
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
    getMyReciveResumes(index + 1)
      .then((response) => {
        console.log(response.data.data);

        setResumes((old: null | Array<reciveResume>) => {
          if (old !== null) return [...old, ...response.data.data];
          else return response.data.data;
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <Box className="px-[0px]" style={{ fontFamily: "IRANSans" }}>
      <Box
        className="px-[0px] py-[12px]"
        style={{
          backgroundColor: "#d8dbe2",
          marginTop: "10px",
          fontSize: "1rem",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {resumes === null ? (
          <>
            <i
              style={{ fontSize: "24.5px" }}
              className="fa fa-spinner fa-spin"
              aria-hidden="true"
            ></i>
          </>
        ) : resumes.length > 0 ? (
          <>
            {resumes.map((item) => (
              <CardItem item={item} index={index} />
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

export default Content;
