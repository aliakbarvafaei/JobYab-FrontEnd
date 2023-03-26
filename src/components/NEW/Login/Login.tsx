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
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import LockResetOutlinedIcon from "@mui/icons-material/LockResetOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Tabs } from "antd";
import type { SizeType } from "antd/es/config-provider/SizeContext";
import { useForm, SubmitHandler } from "react-hook-form";
import { object, string, TypeOf } from "zod";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import { zodResolver } from "@hookform/resolvers/zod";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

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
  code: string().max(10, "کد ملی باید 10 رقم باشد"),
  name: string().nonempty("نام و نام‌خانوادگی اجباری است"),
  address: string(),
});
const userForgetSchema = object({
  email: string().nonempty("ایمیل اجباری است").email("ایمیل نادرست است"),
});
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
const employerLoginSchema = object({
  email: string().nonempty("ایمیل اجباری است").email("ایمیل نادرست است"),
  password: string()
    .nonempty("رمزعبور اجباری است")
    .min(8, "رمزعبور باید حداقل 8 کاراکتر باشد")
    .max(32, "رمز عبور بیشتر از 32 کاراکتر نمیتواند باشد"),
});
const employerRegisterSchema = object({
  email: string().nonempty("ایمیل اجباری است").email("ایمیل نادرست است"),
  password: string()
    .nonempty("رمزعبور اجباری است")
    .min(8, "رمزعبور باید حداقل 8 کاراکتر باشد")
    .max(32, "رمز عبور بیشتر از 32 کاراکتر نمیتواند باشد"),
  phone: string()
    .nonempty("شماره تماس شرکت اجباری است")
    .min(11, "شماره تماس شرکت باید 11 رقم باشد")
    .max(11, "شماره تماس شرکت باید 11 رقم باشد"),
  namePersian: string().nonempty("نام فارسی شرکت اجباری است"),
  nameEnglish: string().nonempty("نام انگلیسی شرکت اجباری است"),
  bio: string(),
  websit: string(),
  activity: string().nonempty("حوزه فعالیت اجباری است"),
  count: string().nonempty("تعداد پرسنل اجباری است"),
});
const employerForgetSchema = object({
  email: string().nonempty("ایمیل اجباری است").email("ایمیل نادرست است"),
});
const employerForgetSchema2 = object({
  email: string().nonempty("ایمیل اجباری است").email("ایمیل نادرست است"),
  password: string()
    .nonempty("رمزعبور اجباری است")
    .min(8, "رمزعبور باید حداقل 8 کاراکتر باشد")
    .max(32, "رمز عبور بیشتر از 32 کاراکتر نمیتواند باشد"),
  code: string()
    .nonempty("کد ارسالی اجباری است")
    .max(5, "کد ارسالی باید 5 رقم باشد"),
});

type userLoginInput = TypeOf<typeof userLoginSchema>;
type userRegisterInput = TypeOf<typeof userRegisterSchema>;
type userForgetInput = TypeOf<typeof userForgetSchema>;
type userForgetInput2 = TypeOf<typeof userForgetSchema2>;
type employerLoginInput = TypeOf<typeof employerLoginSchema>;
type employerRegisterInput = TypeOf<typeof employerRegisterSchema>;
type employerForgetInput = TypeOf<typeof employerForgetSchema>;
type employerForgetInput2 = TypeOf<typeof employerForgetSchema2>;

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
  const userForget = useForm<userForgetInput>({
    resolver: zodResolver(userForgetSchema),
  });
  const userForget2 = useForm<userForgetInput2>({
    resolver: zodResolver(userForgetSchema2),
  });
  const employerLogin = useForm<employerLoginInput>({
    resolver: zodResolver(employerLoginSchema),
  });
  const employerRegiter = useForm<employerRegisterInput>({
    resolver: zodResolver(employerRegisterSchema),
  });
  const employerForget = useForm<employerForgetInput>({
    resolver: zodResolver(employerForgetSchema),
  });
  const employerForget2 = useForm<employerForgetInput2>({
    resolver: zodResolver(employerForgetSchema2),
  });

  const onSubmitHandlerUserLogin: SubmitHandler<userLoginInput> = (values) => {
    console.log(values);
    userLogin.reset();
  };
  const onSubmitHandlerUserRegiter: SubmitHandler<userRegisterInput> = (
    values
  ) => {
    console.log(values);
    userRegister.reset();
  };
  const onSubmitHandlerUserForget: SubmitHandler<userForgetInput> = (
    values
  ) => {
    console.log(values);
    changeLoginSign("user", 3);
    userForget.reset();
  };
  const onSubmitHandlerUserForget2: SubmitHandler<userForgetInput2> = (
    values
  ) => {
    console.log(values);
    userForget2.reset();
  };
  const onSubmitHandlerEmployerLogin: SubmitHandler<employerLoginInput> = (
    values
  ) => {
    console.log(values);
    employerLogin.reset();
  };
  const onSubmitHandlerEmployerRegister: SubmitHandler<
    employerRegisterInput
  > = (values) => {
    console.log(values);
    employerRegiter.reset();
  };
  const onSubmitHandlerEmployerForget: SubmitHandler<employerForgetInput> = (
    values
  ) => {
    console.log(values);
    changeLoginSign("employer", 3);
    employerForget.reset();
  };
  const onSubmitHandlerEmployerForget2: SubmitHandler<employerForgetInput2> = (
    values
  ) => {
    console.log(values);
    employerForget2.reset();
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

  const changeLoginSign = (userORemployer: String, index: Number) => {
    if (userORemployer === "user") {
      setUser(index);
    } else {
      setEmployer(index);
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
        </ThemeProvider>,
        <ThemeProvider theme={theme}>
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
                      onClick={() => changeLoginSign("user", 0)}
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
        <ThemeProvider theme={theme}>
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
                onSubmit={userForget.handleSubmit(onSubmitHandlerUserForget)}
                noValidate
                sx={{ mt: 1 }}
              >
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="ایمیل"
                  error={!!userForget.formState.errors["email"]}
                  helperText={
                    userForget.formState.errors["email"]
                      ? userForget.formState.errors["email"].message
                      : ""
                  }
                  {...userForget.register("email")}
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
                  onClick={() => changeLoginSign("user", 0)}
                  sx={{ mt: 1, mb: 2 }}
                >
                  بازگشت
                </Button>
              </Box>
            </Box>
          </Container>
        </ThemeProvider>,
        <ThemeProvider theme={theme}>
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
                  error={!!userForget2.formState.errors["password"]}
                  helperText={
                    userForget2.formState.errors["password"]
                      ? userForget2.formState.errors["password"].message
                      : ""
                  }
                  {...userForget2.register("password")}
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
                onSubmit={employerLogin.handleSubmit(
                  onSubmitHandlerEmployerLogin
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
                    <Link
                      href="#"
                      onClick={() => changeLoginSign("employer", 2)}
                      variant="body2"
                    >
                      فراموشی رمز؟
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link
                      href="#"
                      onClick={() => changeLoginSign("employer", 1)}
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
              backgroundColor: "white",
            }}
            component="main"
            maxWidth="md"
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
                ثبت نام کارفرما
              </Typography>
              <Box
                component="form"
                onSubmit={employerRegiter.handleSubmit(
                  onSubmitHandlerEmployerRegister
                )}
                noValidate
                sx={{
                  mt: 0.1,
                  display: "flex",
                  flexWrap: "wrap",
                  justifyContent: "space-between",
                }}
              >
                <TextField
                  margin="normal"
                  required
                  id="namePersian"
                  label="نام شرکت (فارسی)"
                  error={!!employerRegiter.formState.errors["namePersian"]}
                  helperText={
                    employerRegiter.formState.errors["namePersian"]
                      ? employerRegiter.formState.errors["namePersian"].message
                      : ""
                  }
                  {...employerRegiter.register("namePersian")}
                  sx={{
                    width: "45%",
                    "@media (max-width: 576px)": {
                      width: "100%",
                    },
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
                  autoFocus
                />
                <TextField
                  margin="normal"
                  required
                  id="nameEnglish"
                  label="نام شرکت (انگلیسی)"
                  error={!!employerRegiter.formState.errors["nameEnglish"]}
                  helperText={
                    employerRegiter.formState.errors["nameEnglish"]
                      ? employerRegiter.formState.errors["nameEnglish"].message
                      : ""
                  }
                  {...employerRegiter.register("nameEnglish")}
                  sx={{
                    width: "45%",
                    "@media (max-width: 576px)": {
                      width: "100%",
                    },
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
                  required
                  type={"number"}
                  id="phone"
                  label="شماره تماس شرکت"
                  error={!!employerRegiter.formState.errors["phone"]}
                  helperText={
                    employerRegiter.formState.errors["phone"]
                      ? employerRegiter.formState.errors["phone"].message
                      : ""
                  }
                  {...employerRegiter.register("phone")}
                  style={{}}
                  sx={{
                    width: "45%",
                    "@media (max-width: 576px)": {
                      width: "100%",
                    },
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
                  id="email"
                  label="ایمیل"
                  error={!!employerRegiter.formState.errors["email"]}
                  helperText={
                    employerRegiter.formState.errors["email"]
                      ? employerRegiter.formState.errors["email"].message
                      : ""
                  }
                  {...employerRegiter.register("email")}
                  sx={{
                    width: "45%",
                    "@media (max-width: 576px)": {
                      width: "100%",
                    },
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
                  error={!!employerRegiter.formState.errors["password"]}
                  helperText={
                    employerRegiter.formState.errors["password"]
                      ? employerRegiter.formState.errors["password"].message
                      : ""
                  }
                  {...employerRegiter.register("password")}
                  sx={{
                    width: "45%",
                    "@media (max-width: 576px)": {
                      width: "100%",
                    },
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
                  className={`fa ${iconPassword2} absolute smmin:right-[40%] smmin:top-[286px] sm:left-[30px] sm:top-[445px] cursor-pointer`}
                  onClick={handlePassword}
                  aria-hidden="true"
                ></i>
                <TextField
                  margin="normal"
                  type={"text"}
                  id="website"
                  label="آدرس وبسایت (اختیاری)"
                  error={!!employerRegiter.formState.errors["websit"]}
                  helperText={
                    employerRegiter.formState.errors["websit"]
                      ? employerRegiter.formState.errors["websit"].message
                      : ""
                  }
                  {...employerRegiter.register("websit")}
                  sx={{
                    width: "45%",
                    "@media (max-width: 576px)": {
                      width: "100%",
                    },
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

                <FormControl
                  required
                  sx={{
                    width: "45%",
                    "@media (max-width: 576px)": {
                      width: "100%",
                    },
                    mt: "12px",
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
                >
                  <InputLabel id="demo-simple-select-label">
                    تعداد پرسنل
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    defaultValue={""}
                    label="تعداد پرسنل"
                    error={!!employerRegiter.formState.errors["count"]}
                    {...employerRegiter.register("count")}
                    sx={{ justifyContent: "center", alignItems: "center" }}
                  >
                    <MenuItem value={"کمتر از 10"}>کمتر از 10</MenuItem>
                    <MenuItem value={"کمتر از 100"}>کمتر از 100</MenuItem>
                    <MenuItem value={"بیشتر از 100"}>بیشتر از 100</MenuItem>
                  </Select>
                  {employerRegiter.formState.errors["count"] ? (
                    <p className="text-[12px] text-[#D32F2F] mx-[14px] mt-[3px] font-Roboto">
                      {employerRegiter.formState.errors["count"].message}
                    </p>
                  ) : (
                    ""
                  )}
                </FormControl>
                <FormControl
                  required
                  sx={{
                    width: "45%",
                    "@media (max-width: 576px)": {
                      width: "100%",
                    },
                    mt: "12px",
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
                >
                  <InputLabel id="demo-simple-select-label">
                    حوزه فعالیت
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    defaultValue={""}
                    label="حوزه فعالیت"
                    error={!!employerRegiter.formState.errors["activity"]}
                    {...employerRegiter.register("activity")}
                    sx={{ justifyContent: "center", alignItems: "center" }}
                  >
                    <MenuItem value={"فناوری اطلاعات"}>فناوری اطلاعات</MenuItem>
                    <MenuItem value={"برنامه نویسی"}>برنامه نویسی</MenuItem>
                    <MenuItem value={"مهندسی نرم افزار"}>
                      مهندسی نرم افزار
                    </MenuItem>
                  </Select>
                  {employerRegiter.formState.errors["activity"] ? (
                    <p className="text-[12px] text-[#D32F2F] mx-[14px] mt-[3px] font-Roboto">
                      {employerRegiter.formState.errors["activity"].message}
                    </p>
                  ) : (
                    ""
                  )}
                </FormControl>
                <TextField
                  margin="normal"
                  fullWidth
                  type={"textArea"}
                  id="bio"
                  label="معرفی شرکت"
                  error={!!employerRegiter.formState.errors["bio"]}
                  helperText={
                    employerRegiter.formState.errors["bio"]
                      ? employerRegiter.formState.errors["bio"].message
                      : ""
                  }
                  {...employerRegiter.register("bio")}
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
                <FormControl fullWidth>
                  {/* <FormLabel id="demo-radio-buttons-group-label">نوع</FormLabel> */}
                  <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue="حقیقی"
                    name="radio-buttons-group"
                    sx={{ flexDirection: "row" }}
                  >
                    <FormControlLabel
                      sx={{ margin: "0px" }}
                      value="حقیقی"
                      control={<Radio />}
                      label="حقیقی"
                    />
                    <FormControlLabel
                      value="حقوقی"
                      control={<Radio />}
                      label="حقوقی"
                    />
                  </RadioGroup>
                </FormControl>

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
                      onClick={() => changeLoginSign("employer", 0)}
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
        <ThemeProvider theme={theme}>
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
                onSubmit={employerForget.handleSubmit(onSubmitHandlerEmployerForget)}
                noValidate
                sx={{ mt: 1 }}
              >
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="ایمیل"
                  error={!!employerForget.formState.errors["email"]}
                  helperText={
                    employerForget.formState.errors["email"]
                      ? employerForget.formState.errors["email"].message
                      : ""
                  }
                  {...employerForget.register("email")}
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
                  onClick={() => changeLoginSign("employer", 0)}
                  sx={{ mt: 1, mb: 2 }}
                >
                  بازگشت
                </Button>
              </Box>
            </Box>
          </Container>
        </ThemeProvider>,
        <ThemeProvider theme={theme}>
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
                onSubmit={employerForget2.handleSubmit(onSubmitHandlerEmployerForget2)}
                noValidate
                sx={{ mt: 1 }}
              >
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="ایمیل"
                  error={!!employerForget2.formState.errors["email"]}
                  helperText={
                    employerForget2.formState.errors["email"]
                      ? employerForget2.formState.errors["email"].message
                      : ""
                  }
                  {...employerForget2.register("email")}
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
                  type={"number"}
                  id="code"
                  label="کد ارسالی"
                  error={!!employerForget2.formState.errors["code"]}
                  helperText={
                    employerForget2.formState.errors["code"]
                      ? employerForget2.formState.errors["code"].message
                      : ""
                  }
                  {...employerForget2.register("code")}
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
                  error={!!employerForget2.formState.errors["password"]}
                  helperText={
                    employerForget2.formState.errors["password"]
                      ? employerForget2.formState.errors["password"].message
                      : ""
                  }
                  {...employerForget2.register("password")}
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
                  onClick={() => changeLoginSign("employer", 0)}
                  sx={{ mt: 1, mb: 2 }}
                >
                  بازگشت
                </Button>
              </Box>
            </Box>
          </Container>
        </ThemeProvider>,
      ],
    },
  ];

  return (
    <div
      className={`flex justify-center items-center bg-lightGray min-h-[100vh] p-[20px]`}
    >
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
