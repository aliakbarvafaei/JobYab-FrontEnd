import { Box, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import FormDialog from "./Dialog";
import CustomizedTables from "./Table";
import { AddMessages, getMessages } from "../../services/api";
import { addItemOnce } from "../../ts/functions";
import { eachToast, statesRedux } from "../../ts/interfaces";
import { useToast } from "../../contexts/ToastState";
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
      <Box className="mdmin:mx-[15%]" style={{ fontFamily: "IRANSans" }}>
        <Box
          className="flex sm:flex-col smmin:flex-row"
          style={{
            justifyContent: "space-between",
          }}
        >
          <h1 className="text-[20px]">پیام‌ها</h1>
          <Button
            onClick={handleClickOpen}
            className="!bg-primary !text-white md:!text-[8px] mdmin:!text-[14px] md:!mt-[10px] hover:!bg-lightBlack"
          >
            نوشتن پیام
            <AddIcon className="sm:text-[12px] smmin:text-[18px]" />
          </Button>
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
            {messages.length > 0 ? (
              <Box className="px-[20px]">
                <CustomizedTables data={messages} />
              </Box>
            ) : (
              <>
                <SearchIcon style={{ fontSize: "4rem", color: "gray" }} />
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
