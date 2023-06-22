import React, { useState } from "react";
import { Typography, Stack, Box, Card, Divider, Button } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import FactCheckOutlinedIcon from "@mui/icons-material/FactCheckOutlined";
import { RemovePost } from "../../../services/api";
import { accessToken, addItemOnce } from "../../../ts/functions";
import { eachToast } from "../../../ts/interfaces";
import { useToast } from "../../../contexts/ToastState";
import { useHistory } from "react-router-dom";
import DifferenceData from "../../../services/utils/DifferenceData";
import DefaultPicture from "../../../assets/images/default.png";
import { API_URL } from "../../../config";
import { useDispatch } from "react-redux";

const CardItem: React.FC<{ item: any }> = ({ item }) => {
  const { setToastState } = useToast();
  const [labels] = useState<Array<{ id: number; title: string }>>(item.skills);
  const history = useHistory();
  const dispatch = useDispatch();

  const hanldeRemove = () => {
    accessToken(dispatch);
    RemovePost(item.id)
      .then((response) => {
        setToastState((old: Array<eachToast>) =>
          addItemOnce(old.slice(), {
            title: "1",
            description: "آگهی با موفقیت حذف شد",
            key: Math.random(),
          })
        );
        history.push("/profile-company?section=mypost");
        history.go(0);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const hanldeUpdate = () => {
    window.location.href = `/profile-company/update-post/${item.id}`;
  };

  return (
    <Card
      className="sm:w-[95%] smmin:w-[80%]"
      style={{
        height: "135px",
        fontFamily: "IRANSans",
        display: "flex",
        flexDirection: "row",
      }}
    >
      <Box className="smmin:w-[88%] sm:w-[85%]">
        <Box
          className="sm:py-[8px] smmin:py-[16px] sm:px-[6px] md:px-[16px] mdmin:px-[32px] sm:gap-[10px] smmin:gap-[30px]"
          style={{
            height: "70%",
            display: "flex",
          }}
        >
          <img
            onClick={() => history.push(`/postPage/${item.id}`)}
            src={
              item.user.logo === null
                ? DefaultPicture
                : API_URL.split("api")[0] + (item.user.logo as string)
            }
            alt=""
            className="rounded-[50%] sm:w-[40px] sm:h-[40px] smmin:w-[70px] smmin:h-[70px]"
          />
          <Stack spacing={0.5}>
            <Typography
              fontWeight={700}
              color="var(--primary)"
              style={{
                fontFamily: "IRANSans",
                display: "flex",
                alignItems: "center",
              }}
            >
              <Typography
                onClick={() => history.push(`/postPage/${item.id}`)}
                component={"div"}
                className="sm:text-[12px] md:text-[14px] mdmin:text-[16px]"
                style={{
                  display: "inline",
                }}
              >
                {item.title}
              </Typography>
              <Typography
                component={"span"}
                className="sm:text-[8px] md:text-[9px] mdmin:text-[10px]"
                style={{
                  color: "var(--lightBlack)",

                  marginRight: "5px",
                }}
              >
                <span>{DifferenceData(item.created_date)}</span>
              </Typography>
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              className="sm:text-[8px] md:text-[10px] mdmin:text-[12px]"
              style={{
                fontFamily: "IRANSans",
              }}
            >
              <LocationOnIcon
                style={{ color: "grey[500]", fontSize: "16px" }}
              />{" "}
              {item.city.title}, {item.state.title}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              className="sm:text-[8px] md:text-[10px] mdmin:text-[12px]"
              style={{
                fontFamily: "IRANSans",
              }}
            >
              <FactCheckOutlinedIcon
                style={{ color: "grey[500]", fontSize: "16px" }}
              />{" "}
              {item.cooperation_type} ({item.salary})
            </Typography>
          </Stack>
        </Box>
        <Divider />
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="flex-start"
          gap={"20px"}
          className="sm:pl-[6px] md:pl-[16px] mdmin:pl-[32px] sm:pr-[6px] md:pr-[86px] mdmin:pr-[102px] py-[8px]"
          style={{
            height: "30%",
            backgroundColor: "background.default",
          }}
        >
          {labels.map((item, index) => {
            return (
              <Typography
                component={"span"}
                style={{
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

      <Box
        className="smmin:w-[12%] sm:w-[15%]"
        style={{ display: "flex", flexDirection: "column", height: "100%" }}
      >
        <Button
          onClick={hanldeUpdate}
          className="sm:text-[10px] smmin:text-[14px] hover:opacity-50 hover:bg-black"
          style={{
            backgroundColor: "green",
            color: "white",
            height: "50%",

            fontFamily: "IRANSans",
            borderTopRightRadius: "0px",
            borderBottomRightRadius: "0px",
            borderBottomLeftRadius: "0px",
            minWidth: "0px",
          }}
        >
          ویرایش
        </Button>
        <Button
          onClick={hanldeRemove}
          className="sm:text-[10px] smmin:text-[14px] hover:opacity-50 hover:bg-black"
          style={{
            backgroundColor: "red",
            color: "white",
            height: "50%",

            fontFamily: "IRANSans",
            borderTopRightRadius: "0px",
            borderTopLeftRadius: "0px",
            borderBottomRightRadius: "0px",
            minWidth: "0px",
          }}
        >
          حذف
        </Button>
      </Box>
    </Card>
  );
};

export default CardItem;
