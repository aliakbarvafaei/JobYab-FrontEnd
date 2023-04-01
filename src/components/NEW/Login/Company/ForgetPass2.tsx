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

const companyForgetSchema2 = object({
  email: string().nonempty("ایمیل اجباری است").email("ایمیل نادرست است"),
  password: string()
    .nonempty("رمزعبور اجباری است")
    .min(8, "رمزعبور باید حداقل 8 کاراکتر باشد")
    .max(32, "رمز عبور بیشتر از 32 کاراکتر نمیتواند باشد"),
  code: string()
    .nonempty("کد ارسالی اجباری است")
    .max(5, "کد ارسالی باید 5 رقم باشد"),
});

type companyForgetInput2 = TypeOf<typeof companyForgetSchema2>;

const ForgetPass2Company: React.FC<{
  changeLoginSign: (userORcompany: String, index: Number) => void;
}> = ({ changeLoginSign }) => {
  const companyForget2 = useForm<companyForgetInput2>({
    resolver: zodResolver(companyForgetSchema2),
  });

  const onSubmitHandlerCompanyForget2: SubmitHandler<companyForgetInput2> = (
    values
  ) => {
    console.log(values);
    companyForget2.reset();
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
            فراموشی رمز حساب کارفرما
          </Typography>
          <Box
            component="form"
            // onSubmit={handleSubmit}
            onSubmit={companyForget2.handleSubmit(
              onSubmitHandlerCompanyForget2
            )}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="ایمیل"
              error={!!companyForget2.formState.errors["email"]}
              helperText={
                companyForget2.formState.errors["email"]
                  ? companyForget2.formState.errors["email"].message
                  : ""
              }
              {...companyForget2.register("email")}
              sx={{
                "& label": {
                  fontFamily: "IRANYekan",
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
              error={!!companyForget2.formState.errors["code"]}
              helperText={
                companyForget2.formState.errors["code"]
                  ? companyForget2.formState.errors["code"].message
                  : ""
              }
              {...companyForget2.register("code")}
              sx={{
                "& label": {
                  fontFamily: "IRANYekan",
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
              error={!!companyForget2.formState.errors["password"]}
              helperText={
                companyForget2.formState.errors["password"]
                  ? companyForget2.formState.errors["password"].message
                  : ""
              }
              {...companyForget2.register("password")}
              sx={{
                "& label": {
                  fontFamily: "IRANYekan",
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
              onClick={() => changeLoginSign("company", 0)}
              sx={{ mt: 1, mb: 2 }}
            >
              بازگشت
            </Button>
          </Box>
        </Box>
      </Container>
  );
};

export default ForgetPass2Company;
