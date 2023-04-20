import { Box, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import FormDialog from "./Dialog";
import CustomizedTables from "./Table";
import { AddMessages, getMessages } from "../../../services/api";
import { addItemOnce } from "../../../ts/functions";
import { eachToast, statesRedux } from "../../../ts/interfaces";
import { useToast } from "../../../contexts/ToastState";
import { useSelector } from "react-redux";

const Messages: React.FC = () => {
  const [messages, setMessages] = useState<
    Array<{
      email: string;
      phone_number: string;
      text: string;
      created_date: string;
    }>
  >([]);
  const { role } = useSelector((state: statesRedux) => state.userAuth);
  const { setToastState } = useToast();
  useEffect(() => {
    getMessages()
      .then((response) => {
        setMessages(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCreate = (message: {
    email: string;
    phone_number: string;
    text: string;
  }) => {
    AddMessages(message)
      .then((response) => {
        console.log(response);
        if (role === "user") window.location.href = "/profile?section=message";
        else window.location.href = "/profile-company?section=message";
      })
      .catch((err) => {
        console.log(err);
        setToastState((old: Array<eachToast>) =>
          addItemOnce(old.slice(), {
            title: "2",
            description: "عملیات باخطا مواجه شد",
            key: Math.random(),
          })
        );
      });
  };

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
          <h1 className="text-[20px]">پیام‌ها</h1>
          <Button
            onClick={handleClickOpen}
            className="!bg-primary !text-white md:!text-[8px] mdmin:!text-[14px] md:!mt-[10px] hover:!bg-lightBlack"
          >
            نوشتن پیام
            <AddIcon sx={{ fontSize: { xs: "12px", sm: "18px" } }} />
          </Button>
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
            {messages.length > 0 ? (
              <Box sx={{ paddingX: "20px" }}>
                <CustomizedTables data={messages} />
              </Box>
            ) : (
              <>
                <SearchIcon sx={{ fontSize: "4rem", color: "gray" }} />
                لیست پیام‌ها خالی است
              </>
            )}
          </Box>
        </Box>
      </Box>
      <FormDialog
        open={open}
        handleClose={handleClose}
        handleCreate={handleCreate}
      />
    </>
  );
};

export default Messages;
