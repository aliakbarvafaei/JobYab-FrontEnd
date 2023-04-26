import React, { useState } from "react";
import { Typography, Stack, Box, Card, Divider, Button } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import FactCheckOutlinedIcon from "@mui/icons-material/FactCheckOutlined";
import { sentResume } from "../../../ts/interfaces";
import DifferenceData from "../../../services/utils/DifferenceData";
import { API_URL } from "../../../config";
import DefaultPicture from "../../../assets/images/default.png";
import { useHistory } from "react-router-dom";

const CardItem: React.FC<{ index: Number; item: sentResume }> = ({
  index,
  item,
}) => {
  const history = useHistory();
  const [labels] = useState<Array<{ id: number; title: string }>>(
    item.post.skills
  );

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
            onClick={() => history.push(`/postPage/${item.post.id}`)}
            src={
              item.post.user.logo === null
                ? DefaultPicture
                : API_URL.split("api")[0] + (item.post.user.logo as string)
            }
            alt=""
            className="rounded-[50%] sm:w-[40px] sm:h-[40px] smmin:w-[70px] smmin:h-[70px]"
          />
          <Stack spacing={0.5}>
            <Typography
              fontWeight={700}
              color="var(--primary)"
              className="sm:text-[12px] md:text-[14px] mdmin:text-[16px]"
              style={{
                fontFamily: "IRANSans",

                display: "flex",
                alignItems: "center",
              }}
            >
              <Typography
                onClick={() => history.push(`/postPage/${item.post.id}`)}
                component={"div"}
                style={{ display: "inline" }}
              >
                {item.post.title}
              </Typography>
              <Typography
                component={"span"}
                style={{
                  color: "var(--lightBlack)",
                  fontSize: "10px",
                  marginRight: "5px",
                }}
              >
                <span>{DifferenceData(item.sent_date)}</span>
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
              {item.post.city.title}, {item.post.state.title}
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
      {index === 0 ? (
        <Button
          className="smmin:w-[12%] sm:w-[15%] sm:text-[10px] smmin:text-[14px] hover:opacity-50 hover:bg-black"
          style={{
            backgroundColor: "green",
            color: "white",

            fontFamily: "IRANSans",
            borderTopRightRadius: "0px",
            borderBottomRightRadius: "0px",
            minWidth: "0px",
            cursor: "default",
          }}
        >
          ارسال شد
        </Button>
      ) : index === 1 ? (
        <Button
          className="smmin:w-[12%] sm:w-[15%] sm:text-[10px] smmin:text-[14px] hover:opacity-50 hover:bg-black"
          style={{
            backgroundColor: "var(--primary)",
            color: "white",

            fontFamily: "IRANSans",
            borderTopRightRadius: "0px",
            borderBottomRightRadius: "0px",
            minWidth: "0px",
            cursor: "default",
          }}
        >
          در حال بررسی
        </Button>
      ) : (
        <Button
          className="smmin:w-[12%] sm:w-[15%] sm:text-[10px] smmin:text-[14px] hover:opacity-50 hover:bg-black"
          style={{
            backgroundColor: `${item.state === "رد شده" ? "red" : "green"}`,
            color: "white",

            fontFamily: "IRANSans",
            borderTopRightRadius: "0px",
            borderBottomRightRadius: "0px",
            minWidth: "0px",
            cursor: "default",
          }}
        >
          {item.state === "رد شده" ? "رد شد" : "پذیرفته شد"}
        </Button>
      )}
    </Card>
  );
};

export default CardItem;
