import React, { useState } from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useForm, SubmitHandler } from "react-hook-form";
import { object, string, TypeOf } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { eachToast } from "../../../ts/interfaces";
import { addItemOnce } from "../../../ts/functions";
import { loginCompanyAPI } from "../../../services/api";
import { useDispatch } from "react-redux";
import { useToast } from "../../../contexts/ToastState";
import { useHistory } from "react-router-dom";

const companyLoginSchema = object({
  email: string().nonempty("ایمیل اجباری است").email("ایمیل نادرست است"),
  password: string()
    .nonempty("رمزعبور اجباری است")
    .min(8, "رمزعبور باید حداقل 8 کاراکتر باشد")
    .max(32, "رمز عبور بیشتر از 32 کاراکتر نمیتواند باشد"),
});

type companyLoginInput = TypeOf<typeof companyLoginSchema>;

const LoginCompany: React.FC<{
  changeLoginSign: (userORcompany: String, index: Number) => void;
}> = ({ changeLoginSign }) => {
  const { setToastState } = useToast();
  const [loadingReq, setloadingReq] = React.useState<boolean>(false);
  const dispatch = useDispatch();
  const history = useHistory();

  const companyLogin = useForm<companyLoginInput>({
    resolver: zodResolver(companyLoginSchema),
  });

  const onSubmitHandlerCompanyLogin: SubmitHandler<companyLoginInput> = (
    values
  ) => {
    console.log(values);
    setloadingReq(true);
    loginCompanyAPI(values.email, values.password)
      .then((response) => {
        setloadingReq(false);
        if (response.status === 200) {
          setToastState((old: Array<eachToast>) =>
            addItemOnce(old.slice(), {
              title: "1",
              description: `خوش آمدید`,
              key: Math.random(),
            })
          );
          dispatch({
            type: "login",
            payload: ["company", response.data.token],
          });
          try {
            localStorage.setItem(
              "token_user",
              JSON.stringify(response.data.token)
            );
          } catch (e) {
            console.error({ e });
          }
          history.push("/home");
          window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
          companyLogin.reset();
        }
      })
      .catch((err) => {
        setloadingReq(false);
        if (err.response && err.response.status === 401) {
          setToastState((old: Array<eachToast>) =>
            addItemOnce(old.slice(), {
              title: "2",
              description: "حساب کاربری فعال نشده است",
              key: Math.random(),
            })
          );
        } else if (err.response && err.response.status === 403) {
          setToastState((old: Array<eachToast>) =>
            addItemOnce(old.slice(), {
              title: "2",
              description: "رمز عبور نادرست است",
              key: Math.random(),
            })
          );
        } else if (err.response && err.response.status === 404) {
          setToastState((old: Array<eachToast>) =>
            addItemOnce(old.slice(), {
              title: "2",
              description: "کاربر یافت نشد. ابتدا ثبت نام کنید",
              key: Math.random(),
            })
          );
        } else {
          console.error(err);
          setToastState((old: Array<eachToast>) =>
            addItemOnce(old.slice(), {
              title: "2",
              description: "سرور دردسترس نیست",
              key: Math.random(),
            })
          );
        }
      });
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
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          ورود به بخش کارفرما
        </Typography>
        <Box
          component="form"
          // onSubmit={handleSubmit}
          onSubmit={companyLogin.handleSubmit(onSubmitHandlerCompanyLogin)}
          noValidate
          sx={{ mt: 1 }}
        >
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="ایمیل"
            error={!!companyLogin.formState.errors["email"]}
            helperText={
              companyLogin.formState.errors["email"]
                ? companyLogin.formState.errors["email"].message
                : ""
            }
            {...companyLogin.register("email")}
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
            error={!!companyLogin.formState.errors["password"]}
            helperText={
              companyLogin.formState.errors["password"]
                ? companyLogin.formState.errors["password"].message
                : ""
            }
            {...companyLogin.register("password")}
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
            label="رمزعبور"
            type={passType}
            id="password"
            // autoComplete="current-password"
          />
          <i
            className={`fa ${iconPassword} absolute left-[40px] mt-[38px] cursor-pointer`}
            onClick={handlePassword}
            aria-hidden="true"
          ></i>
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3 }}>
            {loadingReq ? (
              <i
                style={{ fontSize: "24.5px" }}
                className="fa fa-spinner fa-spin"
                aria-hidden="true"
              ></i>
            ) : (
              "ورود"
            )}
          </Button>
          <Button
            type="button"
            fullWidth
            onClick={() => changeLoginSign("company", 4)}
            sx={{ mt: 1, mb: 2, fontSize: "12px" }}
          >
            فعال‌سازی حساب
          </Button>
          <Grid container>
            <Grid item xs>
              <Link
                href="#"
                onClick={() => changeLoginSign("company", 2)}
                variant="body2"
              >
                فراموشی رمز؟
              </Link>
            </Grid>
            <Grid item>
              <Link
                href="#"
                onClick={() => changeLoginSign("company", 1)}
                variant="body2"
              >
                {"حساب ندارید؟ ایجاد حساب"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default LoginCompany;
