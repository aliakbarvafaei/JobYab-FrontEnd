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
import { RemovePost } from "../../../../services/api";
import { DateDiff, addItemOnce } from "../../../../ts/functions";
import { eachToast } from "../../../../ts/interfaces";
import { useToast } from "../../../../contexts/ToastState";
import { useHistory } from "react-router-dom";

const CardItem: React.FC<{ item: any }> = ({ item }) => {
  const { setToastState } = useToast();
  const [labels] = useState<Array<{ id: number; title: string }>>(item.skills);
  const history = useHistory();

  const hanldeRemove = () => {
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
    // history.push("/profile-company/update-post");
    window.location.href = `/profile-company/update-post/${item.id}`;
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
                display: "flex",
                alignItems: "center",
              }}
            >
              <Typography
                component={"div"}
                sx={{
                  display: "inline",
                  fontSize: { xs: "12px", sm: "14px", md: "16px" },
                }}
              >
                {item.title}
              </Typography>
              <Typography
                component={"span"}
                sx={{
                  color: "#00000099",
                  fontSize: { xs: "8px", sm: "9px", md: "10px" },
                  marginRight: "5px",
                }}
              >
                <span>
                  {DateDiff.inMonths(new Date(item.created_date), new Date()) ===
                  0 ? (
                    DateDiff.inWeeks(new Date(item.created_date), new Date()) ===
                    0 ? (
                      DateDiff.inDays(new Date(item.created_date), new Date()) ===
                      0 ? (
                        DateDiff.inHour(new Date(item.created_date), new Date()) ===
                        0 ? (
                          <>دقایقی پیش</>
                        ) : (
                          <>
                            {DateDiff.inHour(
                              new Date(item.created_date),
                              new Date()
                            )}{" "}
                            ساعت پیش
                          </>
                        )
                      ) : (
                        <>
                          {DateDiff.inDays(new Date(item.created_date), new Date())}{" "}
                          روز پیش
                        </>
                      )
                    ) : (
                      <>
                        {DateDiff.inWeeks(new Date(item.created_date), new Date())}{" "}
                        هفته پیش
                      </>
                    )
                  ) : (
                    <>
                      {DateDiff.inMonths(new Date(item.created_date), new Date())}{" "}
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
              {item.city.title}, {item.state.title}
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

      <Box
        className="smmin:w-[12%] sm:w-[15%]"
        sx={{ display: "flex", flexDirection: "column", height: "100%" }}
      >
        <Button
          onClick={hanldeUpdate}
          sx={{
            backgroundColor: "green",
            color: "white",
            height: "50%",
            fontSize: { xs: "10px", sm: "14px" },
            fontFamily: "IRANSans",
            borderTopRightRadius: "0px",
            borderBottomRightRadius: "0px",
            borderBottomLeftRadius: "0px",
            minWidth: "0px",
            "&:hover": {
              opacity: 0.5,
              backgroundColor: "black",
            },
          }}
        >
          ویرایش
        </Button>
        <Button
          onClick={hanldeRemove}
          sx={{
            backgroundColor: "red",
            color: "white",
            height: "50%",
            fontSize: { xs: "10px", sm: "14px" },
            fontFamily: "IRANSans",
            borderTopRightRadius: "0px",
            borderTopLeftRadius: "0px",
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
      </Box>
    </Card>
  );
};

export default CardItem;
