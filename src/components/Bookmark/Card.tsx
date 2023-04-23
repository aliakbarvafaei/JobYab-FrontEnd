import React, { useState } from "react";
import { Typography, Stack, Box, Card, Divider, Button } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import FactCheckOutlinedIcon from "@mui/icons-material/FactCheckOutlined";
import { eachToast, post, statesRedux } from "../../ts/interfaces";
import { addItemOnce } from "../../ts/functions";
import { useToast } from "../../contexts/ToastState";
import { useSelector } from "react-redux";
import { RemoveBookmark } from "../../services/api";
import DifferenceData from "../../services/utils/DifferenceData";
import { API_URL } from "../../config";
import DefaultPicture from "../../assets/images/default.png";
import { useHistory } from "react-router-dom";

const CardItem: React.FC<{ item: { id: number; post: post } }> = ({ item }) => {
  const [labels] = useState<Array<{ id: number; title: string }>>(
    item.post.skills
  );
  const { setToastState } = useToast();
  const { role } = useSelector((state: statesRedux) => state.userAuth);
  const history = useHistory();

  const handleRemove = () => {
    RemoveBookmark(item.id)
      .then((response) => {
        setToastState((old: Array<eachToast>) =>
          addItemOnce(old.slice(), {
            title: "1",
            description: "آگهی با موفقیت حذف شد",
            key: Math.random(),
          })
        );
        if (role === "user") window.location.href = "/profile?section=bookmark";
        else window.location.href = "/profile-company?section=bookmark";
      })
      .catch((err) => {
        console.log(err);
        setToastState((old: Array<eachToast>) =>
          addItemOnce(old.slice(), {
            title: "2",
            description: "عملیات با خطا مواجه شد",
            key: Math.random(),
          })
        );
      });
  };

  return (
    <Card
      sx={{
        width: { sm: "80%", xs: "95%" },
        height: "135px",
        fontFamily: "IRANSans",
        display: "flex",
        flexDirection: "row",
      }}
    >
      <Box className="smmin:w-[88%] sm:w-[85%]">
        <Box
          sx={{
            py: { xs: 1, sm: 2 },
            px: { xs: "6px", sm: 2, md: 4 },
            height: "70%",
            display: "flex",
            gap: "30px",
          }}
        >
          <img
            onClick={() => history.push(`/postPage/${item.post.id}`)}
            src={
              item.post.user.logo === null
                ? DefaultPicture
                : API_URL.split("api")[0] + (item.post.user.logo as string)
            }
            alt=""
            className="rounded-[50%]"
          />
          <Stack spacing={0.5}>
            <Typography
              fontWeight={700}
              color="var(--primary)"
              sx={{
                fontFamily: "IRANSans",
                display: "flex",
                alignItems: "center",
              }}
            >
              <Typography
                component={"div"}
                onClick={() => history.push(`/postPage/${item.post.id}`)}
                sx={{
                  display: "inline",
                  fontSize: { xs: "12px", sm: "14px", md: "16px" },
                }}
              >
                {item.post.title}
              </Typography>
              <Typography
                component={"span"}
                sx={{
                  color: "var(--lightBlack)",
                  fontSize: { xs: "8px", sm: "9px", md: "10px" },
                  marginRight: "5px",
                }}
              >
                <span>{DifferenceData(item.post.created_date)}</span>
              </Typography>
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                fontFamily: "IRANSans",
                fontSize: { xs: "8px", sm: "10px", md: "12px" },
              }}
            >
              <LocationOnIcon sx={{ color: "grey[500]", fontSize: "16px" }} />{" "}
              {item.post.city.title}, {item.post.state.title}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                fontFamily: "IRANSans",
                fontSize: { xs: "8px", sm: "10px", md: "12px" },
              }}
            >
              <FactCheckOutlinedIcon
                sx={{ color: "grey[500]", fontSize: "16px" }}
              />{" "}
              {item.post.cooperation_type} ({item.post.salary})
            </Typography>
          </Stack>
        </Box>
        <Divider />
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="flex-start"
          gap={"20px"}
          sx={{
            pl: { xs: "6px", sm: 2, md: 4 },
            pr: { xs: "6px", sm: "86px", md: "102px" },
            py: 1,
            height: "30%",
            bgcolor: "background.default",
          }}
        >
          {labels.map((item, index) => {
            return (
              <Typography
                component={"span"}
                sx={{
                  backgroundColor: "var(--primary)",
                  color: "white",
                  borderRadius: "4px",
                  fontSize: "10px",
                  padding: "1%",
                  margin: "2px",
                  display: "inline-flex",
                  alignItems: "center",
                }}
              >
                {item.title}
              </Typography>
            );
          })}
        </Stack>
      </Box>

      <Button
        className="smmin:w-[12%] sm:w-[15%]"
        onClick={handleRemove}
        sx={{
          backgroundColor: "red",
          color: "white",
          fontSize: { xs: "10px", sm: "14px" },
          fontFamily: "IRANSans",
          borderTopRightRadius: "0px",
          borderBottomRightRadius: "0px",
          minWidth: "0px",
          "&:hover": {
            opacity: 0.5,
            backgroundColor: "black",
          },
        }}
      >
        حذف
      </Button>
    </Card>
  );
};

export default CardItem;
