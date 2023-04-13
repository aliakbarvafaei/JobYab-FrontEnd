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
import { activateAccountAPI } from "../../../../services/api";
import { useToast } from "../../../../contexts/ToastState";
import { eachToast } from "../../../../ts/interfaces";
import { addItemOnce } from "../../../../ts/functions";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

const userActiveSchema2 = object({
  email: string().nonempty("ایمیل اجباری است").email("ایمیل نادرست است"),
  code: string().nonempty("کد ارسالی اجباری است"),
});

type userActiveInput2 = TypeOf<typeof userActiveSchema2>;

const ActiveAccount2User: React.FC<{
  changeLoginSign: (userORcompany: String, index: Number) => void;
}> = ({ changeLoginSign }) => {
  const { setToastState } = useToast();
  const [loadingReq, setloadingReq] = React.useState<boolean>(false);
  const dispatch = useDispatch();
  const history = useHistory();

  const queryParams = new URLSearchParams(window.location.search);

  const userActive2 = useForm<userActiveInput2>({
    resolver: zodResolver(userActiveSchema2),
  });

  const onSubmitHandlerUserActive2: SubmitHandler<userActiveInput2> = (
    values
  ) => {
    console.log(values);
    setloadingReq(true);
    activateAccountAPI(values.code)
      .then((response) => {
        setloadingReq(false);
        if (response.status === 200) {
          setToastState((old: Array<eachToast>) =>
            addItemOnce(old.slice(), {
              title: "1",
              description: `فعال‌سازی انجام شد. خوش آمدید`,
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
        }
        userActive2.reset();
      })
      .catch((err) => {
        setloadingReq(false);
        if (err.response && err.response.status === 404) {
          setToastState((old: Array<eachToast>) =>
            addItemOnce(old.slice(), {
              title: "2",
              description: "کد فعالسازی اشتباه وارد شده است",
              key: Math.random(),
            })
          );
        } else if (err.response && err.response.status === 400) {
          setToastState((old: Array<eachToast>) =>
            addItemOnce(old.slice(), {
              title: "2",
              description: "کد را به شکل درست وارد کنید",
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
          فعال‌سازی حساب کارجو
        </Typography>
        <Box
          component="form"
          // onSubmit={handleSubmit}
          onSubmit={userActive2.handleSubmit(onSubmitHandlerUserActive2)}
          noValidate
          sx={{ mt: 1 }}
        >
          <TextField
            margin="normal"
            required
            defaultValue={
              queryParams.get("email") ? queryParams.get("email") : ""
            }
            fullWidth
            id="email"
            label="ایمیل"
            error={!!userActive2.formState.errors["email"]}
            helperText={
              userActive2.formState.errors["email"]
                ? userActive2.formState.errors["email"].message
                : ""
            }
            {...userActive2.register("email")}
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
            id="code"
            label="کد ارسالی"
            error={!!userActive2.formState.errors["code"]}
            helperText={
              userActive2.formState.errors["code"]
                ? userActive2.formState.errors["code"].message
                : ""
            }
            {...userActive2.register("code")}
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
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 0 }}
          >
            {loadingReq ? (
              <i
                style={{ fontSize: "24.5px" }}
                className="fa fa-spinner fa-spin"
                aria-hidden="true"
              ></i>
            ) : (
              "ارسال"
            )}
          </Button>
          <Button
            type="button"
            fullWidth
            onClick={() => {
              changeLoginSign("user", 4);
            }}
            sx={{ mt: 1, mb: 2 }}
          >
            بازگشت
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default ActiveAccount2User;
