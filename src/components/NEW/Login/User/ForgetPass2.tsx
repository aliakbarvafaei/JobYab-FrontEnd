import React, { useState } from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import LockResetOutlinedIcon from "@mui/icons-material/LockResetOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useForm, SubmitHandler } from "react-hook-form";
import { object, string, TypeOf } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const userForgetSchema2 = object({
  email: string().nonempty("ایمیل اجباری است").email("ایمیل نادرست است"),
  password: string()
    .nonempty("رمزعبور اجباری است")
    .min(8, "رمزعبور باید حداقل 8 کاراکتر باشد")
    .max(32, "رمز عبور بیشتر از 32 کاراکتر نمیتواند باشد"),
  code: string()
    .nonempty("کد ارسالی اجباری است")
    .max(5, "کد ارسالی باید 5 رقم باشد"),
});

type userForgetInput2 = TypeOf<typeof userForgetSchema2>;

const ForgetPass2User: React.FC<{
  changeLoginSign: (userORcompany: String, index: Number) => void;
}> = ({ changeLoginSign }) => {
  const userForget2 = useForm<userForgetInput2>({
    resolver: zodResolver(userForgetSchema2),
  });

  const onSubmitHandlerUserForget2: SubmitHandler<userForgetInput2> = (
    values
  ) => {
    console.log(values);
    userForget2.reset();
  };

  const [iconPassword, setIconPassword] = useState("fa-eye-slash");
  const [passType, setPassType] = useState("password");
  function handlePassword() {
    setIconPassword((old) =>
      old === "fa-eye-slash" ? "fa-eye" : "fa-eye-slash"
    );
    setPassType((old) => (old === "password" ? "text" : "password"));
  }

  return (
      <Container
        style={{
          border: "1px solid rgba(5, 5, 5, 0.06)",
          borderTopColor: "white",
          backgroundColor: "white",
        }}
        component="main"
        maxWidth="xs"
      >
        <CssBaseline />
        <Box
          sx={{
            marginTop: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "green" }}>
            <LockResetOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            فراموشی رمز حساب کارجو
          </Typography>
          <Box
            component="form"
            // onSubmit={handleSubmit}
            onSubmit={userForget2.handleSubmit(onSubmitHandlerUserForget2)}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="ایمیل"
              error={!!userForget2.formState.errors["email"]}
              helperText={
                userForget2.formState.errors["email"]
                  ? userForget2.formState.errors["email"].message
                  : ""
              }
              {...userForget2.register("email")}
              sx={{
                "& label": {
                  fontFamily: "IRANSans",
                  left: "unset",
                  right: "1.75rem",
                  transformOrigin: "right",
                  fontSize: "1rem",
                },
                "& legend": {
                  textAlign: "right",
                  fontSize: "1rem",
                },
              }}
              // autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              type={"number"}
              id="code"
              label="کد ارسالی"
              error={!!userForget2.formState.errors["code"]}
              helperText={
                userForget2.formState.errors["code"]
                  ? userForget2.formState.errors["code"].message
                  : ""
              }
              {...userForget2.register("code")}
              sx={{
                "& label": {
                  fontFamily: "IRANSans",
                  left: "unset",
                  right: "1.75rem",
                  transformOrigin: "right",
                  fontSize: "1rem",
                },
                "& legend": {
                  textAlign: "right",
                  fontSize: "1rem",
                },
              }}
              // autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              error={!!userForget2.formState.errors["password"]}
              helperText={
                userForget2.formState.errors["password"]
                  ? userForget2.formState.errors["password"].message
                  : ""
              }
              {...userForget2.register("password")}
              sx={{
                "& label": {
                  fontFamily: "IRANSans",
                  left: "unset",
                  right: "1.75rem",
                  transformOrigin: "right",
                  fontSize: "1rem",
                },
                "& legend": {
                  textAlign: "right",
                  fontSize: "1rem",
                },
              }}
              label="رمز جدید"
              type={passType}
              id="password"
              // autoComplete="current-password"
            />
            <i
              className={`fa ${iconPassword} absolute left-[40px] mt-[38px] cursor-pointer`}
              onClick={handlePassword}
              aria-hidden="true"
            ></i>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 0 }}
            >
              ارسال
            </Button>
            <Button
              type="button"
              fullWidth
              onClick={() => changeLoginSign("user", 0)}
              sx={{ mt: 1, mb: 2 }}
            >
              بازگشت
            </Button>
          </Box>
        </Box>
      </Container>
  );
};

export default ForgetPass2User;
