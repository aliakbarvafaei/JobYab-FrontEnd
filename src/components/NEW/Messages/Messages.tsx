import { Box, Button } from "@mui/material";
import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import FormDialog from "./Dialog";
import CustomizedTables from "./Table";

const Messages: React.FC = () => {
  const [messages, setMessages] = useState<
    Array<{
      email: string;
      title: string;
      text: string;
      time: Date;
    }>
  >([]);
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCreate = (message: {
    email: string;
    title: string;
    text: string;
  }) => {
    setMessages((old) => [...old, { ...message, time: new Date() }]);
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
            sx={{
              backgroundColor: "#1976D2",
              color: "white",
              fontSize: { xs: "8px", sm: "14px" },
              marginTop: { xs: "10px", sm: "0px" },
              "&:hover": { backgroundColor: "#00000099" },
            }}
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
