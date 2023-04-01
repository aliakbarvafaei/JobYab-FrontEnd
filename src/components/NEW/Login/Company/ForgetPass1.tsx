import React from "react";
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

const companyForgetSchema = object({
  email: string().nonempty("ایمیل اجباری است").email("ایمیل نادرست است"),
});

type companyForgetInput = TypeOf<typeof companyForgetSchema>;

const ForgetPass1Company: React.FC<{
  changeLoginSign: (userORcompany: String, index: Number) => void;
}> = ({ changeLoginSign }) => {
  const companyForget = useForm<companyForgetInput>({
    resolver: zodResolver(companyForgetSchema),
  });

  const onSubmitHandlerCompanyForget: SubmitHandler<companyForgetInput> = (
    values
  ) => {
    console.log(values);
    changeLoginSign("company", 3);
    companyForget.reset();
  };

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
            onSubmit={companyForget.handleSubmit(onSubmitHandlerCompanyForget)}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="ایمیل"
              error={!!companyForget.formState.errors["email"]}
              helperText={
                companyForget.formState.errors["email"]
                  ? companyForget.formState.errors["email"].message
                  : ""
              }
              {...companyForget.register("email")}
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
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 0 }}
            >
              ارسال کد
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

export default ForgetPass1Company;
