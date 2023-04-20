import React, { useId } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Box from "@mui/material/Box";
import { useForm, SubmitHandler } from "react-hook-form";
import { object, string, TypeOf } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const MessageSchema = object({
  email: string().nonempty("ایمیل اجباری است").email("ایمیل نادرست است"),
  text: string().nonempty("متن پیام اجباری است"),
  phone_number: string()
    .nonempty("شماره تماس اجباری است")
    .min(11, "شماره تماس باید 11 رقم باشد")
    .max(11, "شماره تماس باید 11 رقم باشد"),
});

type MessageInput = TypeOf<typeof MessageSchema>;

const FormDialog: React.FC<{
  open: boolean;
  handleClose: () => void;
  handleCreate: (message: {
    email: string;
    phone_number: string;
    text: string;
  }) => void;
}> = ({ open, handleClose, handleCreate }) => {
  const submitId = useId();

  const Message = useForm<MessageInput>({
    resolver: zodResolver(MessageSchema),
  });

  const onSubmitHandlerMessage: SubmitHandler<MessageInput> = (values) => {
    console.log(values);
    Message.reset();
    handleCreate(values);
    handleClose();
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <Box
          component="form"
          onSubmit={Message.handleSubmit(onSubmitHandlerMessage)}
          noValidate
          sx={{ mt: 1 }}
        >
          <DialogTitle>پیام جدید</DialogTitle>
          <DialogContent>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="ایمیل"
              error={!!Message.formState.errors["email"]}
              helperText={
                Message.formState.errors["email"]
                  ? Message.formState.errors["email"].message
                  : ""
              }
              {...Message.register("email")}
              sx={{
                "& label": {
                  left: "unset",
                  right: "1.75rem",
                  transformOrigin: "right",
                  fontSize: "1rem",
                },
                "& legend": {
                  textAlign: "right",
                  fontSize: "0.8rem",
                },
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              type="number"
              id="phone_number"
              label="تلفن"
              error={!!Message.formState.errors["phone_number"]}
              helperText={
                Message.formState.errors["phone_number"]
                  ? Message.formState.errors["phone_number"].message
                  : ""
              }
              {...Message.register("phone_number")}
              sx={{
                "& label": {
                  left: "unset",
                  right: "1.75rem",
                  transformOrigin: "right",
                  fontSize: "1rem",
                },
                "& legend": {
                  textAlign: "right",
                  fontSize: "0.8rem",
                },
              }}
            />
            <TextField
              margin="normal"
              fullWidth
              type={"textArea"}
              id="text"
              required
              multiline
              label="متن پیام"
              error={!!Message.formState.errors["text"]}
              helperText={
                Message.formState.errors["text"]
                  ? Message.formState.errors["text"].message
                  : ""
              }
              {...Message.register("text")}
              sx={{
                "& label": {
                  left: "unset",
                  right: "1.75rem",
                  transformOrigin: "right",
                  fontSize: "1rem",
                },
                "& legend": {
                  textAlign: "right",
                  fontSize: "0.8rem",
                },
              }}
            />
            <Button id={submitId} sx={{ display: "none !important" }}></Button>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>لغو</Button>
            <Button type="submit">ارسال</Button>
          </DialogActions>
        </Box>
      </Dialog>
    </div>
  );
};

export default FormDialog;
