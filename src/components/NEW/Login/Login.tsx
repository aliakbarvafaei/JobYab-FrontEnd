import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { useDispatch } from "react-redux";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import LockOpenOutlinedIcon from '@mui/icons-material/LockOpenOutlined';
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Tabs } from "antd";
import type { SizeType } from "antd/es/config-provider/SizeContext";
import { useForm, SubmitHandler } from "react-hook-form";
import { number, object, string, TypeOf } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const theme = createTheme();
const userLoginSchema = object({
  email: string().nonempty("ایمیل اجباری است").email("ایمیل نادرست است"),
  password: string()
    .nonempty("رمزعبور اجباری است")
    .min(8, "رمزعبور باید حداقل 8 کاراکتر باشد")
    .max(32, "رمز عبور بیشتر از 32 کاراکتر نمیتواند باشد"),
});
const userRegisterSchema = object({
  email: string().nonempty("ایمیل اجباری است").email("ایمیل نادرست است"),
  password: string()
    .nonempty("رمزعبور اجباری است")
    .min(8, "رمزعبور باید حداقل 8 کاراکتر باشد")
    .max(32, "رمز عبور بیشتر از 32 کاراکتر نمیتواند باشد"),
  phone: string()
    .nonempty("موبایل اجباری است")
    .min(11, "موبایل باید 11 رقم باشد")
    .max(11, "موبایل باید 11 رقم باشد"),
  code: string()
    .max(10, "کد ملی باید 10 رقم باشد"),
  name: string().nonempty("نام و نام‌خانوادگی اجباری است"),
  address: string(),
});
const employerLoginSchema = object({
  email: string().nonempty("ایمیل اجباری است").email("ایمیل نادرست است"),
  password: string()
    .nonempty("رمزعبور اجباری است")
    .min(8, "رمزعبور باید حداقل 8 کاراکتر باشد")
    .max(32, "رمز عبور بیشتر از 32 کاراکتر نمیتواند باشد"),
});

type userLoginInput = TypeOf<typeof userLoginSchema>;
type userRegisterInput = TypeOf<typeof userRegisterSchema>;
type employerLoginInput = TypeOf<typeof employerLoginSchema>;


const LoginBox: React.FC = () => {
  const [size, setSize] = useState<SizeType>("small");
  const [user, setUser] = useState<Number>(0);
  const [employer, setEmployer] = useState<Number>(0);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: "logout" });
    try {
      localStorage.setItem("token_user", JSON.stringify(""));
    } catch (e) {
      console.error({ e });
    }
  }, [dispatch]);

  const userLogin = useForm<userLoginInput>({
    resolver: zodResolver(userLoginSchema),
  });
  const userRegister = useForm<userRegisterInput>({
    resolver: zodResolver(userRegisterSchema),
  });
  const employerLogin = useForm<employerLoginInput>({
    resolver: zodResolver(employerLoginSchema),
  });

  const onSubmitHandlerUserLogin: SubmitHandler<userLoginInput> = (values) => {
    console.log(values);
    userLogin.reset();
  };
  const onSubmitHandlerUserRegiter: SubmitHandler<userRegisterInput> = (values) => {
    console.log(values);
    userRegister.reset();
  };
  const onSubmitHandlerEmployerLogin: SubmitHandler<employerLoginInput> = (values) => {
    console.log(values);
    employerLogin.reset();
  };

  const [iconPassword, setIconPassword] = useState("fa-eye-slash");
  const [passType, setPassType] = useState("password");
  function handlePassword() {
    setIconPassword((old) =>
      old === "fa-eye-slash" ? "fa-eye" : "fa-eye-slash"
    );
    setPassType((old) => (old === "password" ? "text" : "password"));
  }

  const [iconPassword2, setIconPassword2] = useState("fa-eye-slash");
  const [passType2, setPassType2] = useState("password");
  function handlePassword2() {
    setIconPassword2((old) =>
      old === "fa-eye-slash" ? "fa-eye" : "fa-eye-slash"
    );
    setPassType2((old) => (old === "password" ? "text" : "password"));
  }

  const changeLoginSign = (userORemployer: String) => {
    if (userORemployer === "user") {
      if (user === 0) setUser(1);
      else setUser(0);
    } else {
      if (employer === 0) setEmployer(1);
      else setEmployer(0);
    }
  };

  const temp = [
    {
      title: "کارجو",
      content: [
        <ThemeProvider theme={theme}>
          <Container
            style={{
              border: "1px solid rgba(5, 5, 5, 0.06)",
              borderTopColor: "white",
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
                ورود به بخش کارجو
              </Typography>
              <Box
                component="form"
                // onSubmit={handleSubmit}
                onSubmit={userLogin.handleSubmit(onSubmitHandlerUserLogin)}
                noValidate
                sx={{ mt: 1 }}
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
                  // autoComplete="email"
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
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  ورود
                </Button>
                <Grid container>
                  <Grid item xs>
                    <Link href="#" variant="body2">
                      فراموشی رمز؟
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link
                      href="#"
                      onClick={() => changeLoginSign("user")}
                      variant="body2"
                    >
                      {"حساب ندارید؟ ایجاد حساب"}
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Container>
        </ThemeProvider>,
        <ThemeProvider theme={theme}>
          <Container
            style={{
              border: "1px solid rgba(5, 5, 5, 0.06)",
              borderTopColor: "white",
            }}
            component="main"
            maxWidth="xs"
          >
            <CssBaseline />
            <Box
              sx={{
                marginTop: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Avatar sx={{ m: 0.5, bgcolor: "green" }}>
                <LockOpenOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                ثبت نام کارجو
              </Typography>
              <Box
                component="form"
                // onSubmit={handleSubmit}
                onSubmit={userRegister.handleSubmit(onSubmitHandlerUserRegiter)}
                noValidate
                sx={{ mt: 0.1 }}
              >
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="name"
                  label="نام و نام‌خانوادگی"
                  error={!!userRegister.formState.errors["name"]}
                  helperText={
                    userRegister.formState.errors["name"]
                      ? userRegister.formState.errors["name"].message
                      : ""
                  }
                  {...userRegister.register("name")}
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
                  // autoComplete="name"
                  autoFocus
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  type={"number"}
                  id="phone"
                  label="موبایل"
                  error={!!userRegister.formState.errors["phone"]}
                  helperText={
                    userRegister.formState.errors["phone"]
                      ? userRegister.formState.errors["phone"].message
                      : ""
                  }
                  {...userRegister.register("phone")}
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
                  id="email"
                  label="ایمیل"
                  error={!!userRegister.formState.errors["email"]}
                  helperText={
                    userRegister.formState.errors["email"]
                      ? userRegister.formState.errors["email"].message
                      : ""
                  }
                  {...userRegister.register("email")}
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
                  // autoComplete="email"
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  error={!!userRegister.formState.errors["password"]}
                  helperText={
                    userRegister.formState.errors["password"]
                      ? userRegister.formState.errors["password"].message
                      : ""
                  }
                  {...userRegister.register("password")}
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
                <TextField
                  margin="normal"
                  fullWidth
                  type={"number"}
                  id="code"
                  label="کد ملی (اختیاری)"
                  error={!!userRegister.formState.errors["code"]}
                  helperText={
                    userRegister.formState.errors["code"]
                      ? userRegister.formState.errors["code"].message
                      : ""
                  }
                  {...userRegister.register("code")}
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
                  // autoComplete="name"
                />
                <TextField
                  margin="normal"
                  fullWidth
                  type={"text"}
                  id="address"
                  label="آدرس (اختیاری)"
                  error={!!userRegister.formState.errors["address"]}
                  helperText={
                    userRegister.formState.errors["address"]
                      ? userRegister.formState.errors["address"].message
                      : ""
                  }
                  {...userRegister.register("address")}
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
                  // autoComplete="name"
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 1, mb: 2 }}
                >
                  ثبت نام
                </Button>
                <Grid container>
                  <Grid item xs>
                    <Link href="#" variant="body2"></Link>
                  </Grid>
                  <Grid item>
                    <Link
                      href="#"
                      onClick={() => changeLoginSign("user")}
                      variant="body2"
                    >
                      {"حساب دارید؟ ورود حساب"}
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Container>
        </ThemeProvider>,
      ],
    },
    {
      title: "کارفرما",
      content: [
        <ThemeProvider theme={theme}>
          <Container
            style={{
              border: "1px solid rgba(5, 5, 5, 0.06)",
              borderTopColor: "white",
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
                onSubmit={employerLogin.handleSubmit(onSubmitHandlerEmployerLogin)}
                noValidate
                sx={{ mt: 1 }}
              >
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="ایمیل"
                  error={!!employerLogin.formState.errors["email"]}
                  helperText={
                    employerLogin.formState.errors["email"]
                      ? employerLogin.formState.errors["email"].message
                      : ""
                  }
                  {...employerLogin.register("email")}
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
                  // autoComplete="email"
                  autoFocus
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  error={!!employerLogin.formState.errors["password"]}
                  helperText={
                    employerLogin.formState.errors["password"]
                      ? employerLogin.formState.errors["password"].message
                      : ""
                  }
                  {...employerLogin.register("password")}
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
                  label="رمزعبور"
                  type={passType2}
                  id="password"
                  // autoComplete="current-password"
                />
                <i
                  className={`fa ${iconPassword2} absolute left-[40px] mt-[38px] cursor-pointer`}
                  onClick={handlePassword2}
                  aria-hidden="true"
                ></i>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  ورود
                </Button>
                <Grid container>
                  <Grid item xs>
                    <Link href="#" variant="body2">
                      فراموشی رمز؟
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link
                      href="#"
                      onClick={() => changeLoginSign("employer")}
                      variant="body2"
                    >
                      {"حساب ندارید؟ ایجاد حساب"}
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Container>
        </ThemeProvider>,
      ],
    },
  ];

  return (
    <div className="flex justify-center items-center bg-white h-[100vh]">
      <Tabs
        defaultActiveKey="1"
        type="card"
        size={size}
        centered
        items={new Array(2).fill(null).map((_, i) => {
          const id = i + 1;
          return {
            label: temp[i].title,
            key: String(id),
            children:
              temp[i].content[
                temp[i].title === "کارجو" ? Number(user) : Number(employer)
              ],
          };
        })}
      />
    </div>
  );
};
export default LoginBox;
