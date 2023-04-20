import React, { ChangeEvent, useId, useState } from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import UploadIcon from "@mui/icons-material/Upload";
import { useForm, SubmitHandler } from "react-hook-form";
import { object, string, TypeOf } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerUserAPI } from "../../../services/api";
import { eachToast } from "../../../ts/interfaces";
import { useToast } from "../../../contexts/ToastState";
import { addItemOnce } from "../../../ts/functions";
import { useHistory } from "react-router-dom";

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

type userRegisterInput = TypeOf<typeof userRegisterSchema>;

const RegisterUser: React.FC<{
  changeLoginSign: (userORcompany: String, index: Number) => void;
}> = ({ changeLoginSign }) => {
  const { setToastState } = useToast();
  const [loadingReq, setloadingReq] = useState<boolean>(false);
  const history = useHistory();

  const photoId = useId();
  const [fileValue, setFileValue] = useState<File | null>(null);

  const userRegister = useForm<userRegisterInput>({
    resolver: zodResolver(userRegisterSchema),
  });

  const onSubmitHandlerUserRegiter: SubmitHandler<userRegisterInput> = (
    values
  ) => {
    console.log(values);
    const data = {
      full_name: values.name,
      username: values.email,
      address: values.address,
      national_code: values.code,
      phone_number: values.phone,
      password: values.password,
      profile_photo: fileValue,
    };
    setloadingReq(true);

    registerUserAPI(data)
      .then((response) => {
        setloadingReq(false);
        if (response.status === 201) {
          console.log(response.data);

          setToastState((old: Array<eachToast>) =>
            addItemOnce(old.slice(), {
              title: "1",
              description: "ثبت نام با موفقیت انجام شد",
              key: Math.random(),
            })
          );
        }
        history.push(`/login?email=${values.email}`);
        changeLoginSign("user", 4);
        userRegister.reset();
      })
      .catch((err) => {
        setloadingReq(false);
        if (err.response && err.response.status === 403) {
          setToastState((old: Array<eachToast>) =>
            addItemOnce(old.slice(), {
              title: "2",
              description: "کاربر قبلا ثبت نام کرده است",
              key: Math.random(),
            })
          );
        } else {
          setToastState((old: Array<eachToast>) =>
            addItemOnce(old.slice(), {
              title: "2",
              description: "سرور دردسترس نیست",
              key: Math.random(),
            })
          );
          console.error(err);
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
          />
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginTop: "12px",
              marginBottom: "8px",
            }}
          >
            <div
              style={{
                fontFamily: "IRANSans",
                width: "30%",
                color: "var(--lightBlack)",
              }}
            >
              عکس پروفایل:{" "}
            </div>

            <Button
              variant="outlined"
              component="label"
              sx={{
                fontSize: { xs: "10px", sm: "14px" },
                width: "65%",
                fontFamily: "IRANSans",
              }}
            >
              <input
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  if (e.target.files) {
                    setFileValue(e.target.files[0]);
                  }
                }}
                id={photoId}
                accept="image/*"
                type="file"
                hidden
              />
              {fileValue != null ? (
                fileValue.name
              ) : (
                <>
                  <UploadIcon />
                  بارگذاری فایل
                </>
              )}
            </Button>
          </Box>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 1, mb: 2 }}
          >
            {loadingReq ? (
              <i
                style={{ fontSize: "24.5px" }}
                className="fa fa-spinner fa-spin"
                aria-hidden="true"
              ></i>
            ) : (
              "ثبت نام"
            )}
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
  );
};

export default RegisterUser;
