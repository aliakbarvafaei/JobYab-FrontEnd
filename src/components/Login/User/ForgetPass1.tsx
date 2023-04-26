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
import { useToast } from "../../../contexts/ToastState";
import { sendEmailForgetPassAPI } from "../../../services/api";
import { eachToast } from "../../../ts/interfaces";
import { addItemOnce } from "../../../ts/functions";
import { useHistory } from "react-router-dom";

const userForgetSchema = object({
  email: string().nonempty("ایمیل اجباری است").email("ایمیل نادرست است"),
});

type userForgetInput = TypeOf<typeof userForgetSchema>;

const ForgetPass1User: React.FC<{
  changeLoginSign: (userORcompany: String, index: Number) => void;
}> = ({ changeLoginSign }) => {
  const { setToastState } = useToast();
  const [loadingReq, setloadingReq] = React.useState<boolean>(false);
  const history = useHistory();

  const queryParams = new URLSearchParams(window.location.search);

  const userForget = useForm<userForgetInput>({
    resolver: zodResolver(userForgetSchema),
  });

  const onSubmitHandlerUserForget: SubmitHandler<userForgetInput> = (
    values
  ) => {
    console.log(values);
    setloadingReq(true);
    sendEmailForgetPassAPI(values.email)
      .then((response) => {
        setloadingReq(false);
        if (response.status === 200) {
          setToastState((old: Array<eachToast>) =>
            addItemOnce(old.slice(), {
              title: "1",
              description: "ایمیل بازیابی رمز با موفقیت ارسال شد",
              key: Math.random(),
            })
          );
          history.push(`/login?email=${values.email}`);
          changeLoginSign("user", 3);
        }
      })
      .catch((err) => {
        userForget.reset();
        setloadingReq(false);
        if (err.response && err.response.status === 404) {
          setToastState((old: Array<eachToast>) =>
            addItemOnce(old.slice(), {
              title: "2",
              description: "نام کاربری وارد شده یافت نشد",
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
          <LockResetOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          فراموشی رمز حساب کارجو
        </Typography>
        <Box
          component="form"
          onSubmit={userForget.handleSubmit(onSubmitHandlerUserForget)}
          noValidate
          style={{ marginTop: "8px" }}
        >
          <TextField
            margin="normal"
            required
            fullWidth
            defaultValue={
              queryParams.get("email") ? queryParams.get("email") : ""
            }
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
          <Button
            type="submit"
            fullWidth
            variant="contained"
            style={{ marginTop: "24px", marginBottom: 0 }}
          >
            {loadingReq ? (
              <i
                style={{ fontSize: "24.5px" }}
                className="fa fa-spinner fa-spin"
                aria-hidden="true"
              ></i>
            ) : (
              "ارسال کد"
            )}
          </Button>
          <Button
            type="button"
            fullWidth
            onClick={() => {
              history.push("/login");
              history.go(0);
            }}
            style={{ marginTop: "8px", marginBottom: "16px" }}
          >
            بازگشت
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default ForgetPass1User;
