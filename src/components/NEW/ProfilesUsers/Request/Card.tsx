import React, { useState } from "react";
import {
  Typography,
  Stack,
  Box,
  Card,
  Divider,
  Avatar,
  Button,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import FactCheckOutlinedIcon from "@mui/icons-material/FactCheckOutlined";
import { sentResume } from "../../../../ts/interfaces";
import { DateDiff } from "../../../../ts/functions";

const CardItem: React.FC<{ index: Number; item: sentResume }> = ({
  index,
  item,
}) => {
  const [labels] = useState<Array<{ id: number; title: string }>>(
    item.post.skills
  );

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
          <Avatar
            variant="circular"
            src="avatar1.jpg"
            sx={{ display: { xs: "none", sm: "flex" } }}
          />
          <Stack spacing={0.5}>
            <Typography
              fontWeight={700}
              color="#1976D2"
              sx={{
                fontFamily: "IRANSans",
                fontSize: { xs: "12px", sm: "14px", md: "16px" },
                display: "flex",
                alignItems: "center",
              }}
            >
              <Typography component={"div"} sx={{ display: "inline" }}>
                {item.post.title}
              </Typography>
              <Typography
                component={"span"}
                sx={{
                  color: "#00000099",
                  fontSize: "10px",
                  marginRight: "5px",
                }}
              >
                <span>
                  {DateDiff.inMonths(new Date(item.sent_date), new Date()) ===
                  0 ? (
                    DateDiff.inWeeks(new Date(item.sent_date), new Date()) ===
                    0 ? (
                      DateDiff.inDays(new Date(item.sent_date), new Date()) ===
                      0 ? (
                        DateDiff.inHour(
                          new Date(item.sent_date),
                          new Date()
                        ) === 0 ? (
                          <>دقایقی پیش</>
                        ) : (
                          <>
                            {DateDiff.inHour(
                              new Date(item.sent_date),
                              new Date()
                            )}{" "}
                            ساعت پیش
                          </>
                        )
                      ) : (
                        <>
                          {DateDiff.inDays(
                            new Date(item.sent_date),
                            new Date()
                          )}{" "}
                          روز پیش
                        </>
                      )
                    ) : (
                      <>
                        {DateDiff.inWeeks(new Date(item.sent_date), new Date())}{" "}
                        هفته پیش
                      </>
                    )
                  ) : (
                    <>
                      {DateDiff.inMonths(new Date(item.sent_date), new Date())}{" "}
                      ماه پیش
                    </>
                  )}
                </span>
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
                  backgroundColor: "#555555",
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
          className="smmin:w-[12%] sm:w-[15%]"
          sx={{
            backgroundColor: "green",
            color: "white",
            fontSize: { xs: "10px", sm: "14px" },
            fontFamily: "IRANSans",
            borderTopRightRadius: "0px",
            borderBottomRightRadius: "0px",
            minWidth: "0px",
            cursor: "default",
            "&:hover": {
              opacity: 0.5,
              backgroundColor: "black",
            },
          }}
        >
          ارسال شد
        </Button>
      ) : index === 1 ? (
        <Button
          className="smmin:w-[12%] sm:w-[15%]"
          sx={{
            backgroundColor: "#1976D2",
            color: "white",
            fontSize: { xs: "10px", sm: "14px" },
            fontFamily: "IRANSans",
            borderTopRightRadius: "0px",
            borderBottomRightRadius: "0px",
            minWidth: "0px",
            cursor: "default",
            "&:hover": {
              opacity: 0.5,
              backgroundColor: "black",
            },
          }}
        >
          در حال بررسی
        </Button>
      ) : (
        <Button
          className="smmin:w-[12%] sm:w-[15%]"
          sx={{
            backgroundColor: "green",
            color: "white",
            fontSize: { xs: "10px", sm: "14px" },
            fontFamily: "IRANSans",
            borderTopRightRadius: "0px",
            borderBottomRightRadius: "0px",
            minWidth: "0px",
            cursor: "default",
            "&:hover": {
              opacity: 0.5,
              backgroundColor: "black",
            },
          }}
        >
          پذیرفته شد
        </Button>
      )}
    </Card>
  );
};

export default CardItem;
