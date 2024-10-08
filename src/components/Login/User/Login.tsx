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
import { useToast } from "../../../contexts/ToastState";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { loginUserAPI } from "../../../services/api";
import { addItemOnce } from "../../../ts/functions";
import { eachToast } from "../../../ts/interfaces";

const userLoginSchema = object({
  email: string().nonempty("ایمیل اجباری است").email("ایمیل نادرست است"),
  password: string()
    .nonempty("رمزعبور اجباری است")
    .min(8, "رمزعبور باید حداقل 8 کاراکتر باشد")
    .max(32, "رمز عبور بیشتر از 32 کاراکتر نمیتواند باشد"),
});
type userLoginInput = TypeOf<typeof userLoginSchema>;

const LoginUser: React.FC<{
  changeLoginSign: (userORcompany: String, index: Number) => void;
}> = ({ changeLoginSign }) => {
  const { setToastState } = useToast();
  const [loadingReq, setloadingReq] = React.useState<boolean>(false);
  const dispatch = useDispatch();
  const history = useHistory();

  const userLogin = useForm<userLoginInput>({
    resolver: zodResolver(userLoginSchema),
  });

  const onSubmitHandlerUserLogin: SubmitHandler<userLoginInput> = (values) => {
    console.log(values);
    setloadingReq(true);
    loginUserAPI(values.email, values.password)
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
            payload: ["user", response.data.token],
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
          userLogin.reset();
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
        style={{
          marginTop: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar style={{ margin: "8px", backgroundColor: "green" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          ورود به بخش کارجو
        </Typography>
        <Box
          component="form"
          onSubmit={userLogin.handleSubmit(onSubmitHandlerUserLogin)}
          noValidate
          style={{ marginTop: "8px" }}
        >
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="ایمیل"
            error={!!userLogin.formState.errors["email"]}
            helperText={
              userLogin.formState.errors["email"]
                ? userLogin.formState.errors["email"].message
                : ""
            }
            {...userLogin.register("email")}
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
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            error={!!userLogin.formState.errors["password"]}
            helperText={
              userLogin.formState.errors["password"]
                ? userLogin.formState.errors["password"].message
                : ""
            }
            {...userLogin.register("password")}
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
            style={{ marginTop: "24px" }}
          >
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
            onClick={() => changeLoginSign("user", 4)}
            style={{ marginTop: "8px", marginBottom: "16px", fontSize: "12px" }}
          >
            فعال‌سازی حساب
          </Button>
          <Grid container>
            <Grid item xs>
              <Link
                href="#"
                onClick={() => changeLoginSign("user", 2)}
                variant="body2"
              >
                فراموشی رمز؟
              </Link>
            </Grid>
            <Grid item>
              <Link
                href="#"
                onClick={() => changeLoginSign("user", 1)}
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

export default LoginUser;
