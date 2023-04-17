import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import CardItem from "./Card";
import { getMySentResumes } from "../../../../services/api";
import { sentResume } from "../../../../ts/interfaces";

const Content: React.FC<{ index: number }> = ({ index }) => {
  const [resumes, setResumes] = useState<null | Array<sentResume>>(null);

  useEffect(() => {
    if (index === 2) {
      getMySentResumes(index + 2)
        .then((response) => {
          setResumes((old: null | Array<sentResume>) => {
            if (old !== null) return [...old, ...response.data.data];
            else return response.data.data;
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
    getMySentResumes(index + 1)
      .then((response) => {
        setResumes((old: null | Array<sentResume>) => {
          if (old !== null) return [...old, ...response.data.data];
          else return response.data.data;
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
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
            <SearchIcon sx={{ fontSize: "4rem", color: "gray" }} />
            لیست درخواست‌های این بخش خالی است
          </>
        )}
      </Box>
    </Box>
  );
};

export default Content;
