import React, { useState, useId, ChangeEvent } from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import UploadIcon from "@mui/icons-material/Upload";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
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
import { addItemOnce } from "../../../ts/functions";
import { eachToast } from "../../../ts/interfaces";
import { useHistory } from "react-router-dom";
import { useToast } from "../../../contexts/ToastState";
import { registerCompanyAPI } from "../../../services/api";

const companyRegisterSchema = object({
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

type companyRegisterInput = TypeOf<typeof companyRegisterSchema>;

const RegisterCompany: React.FC<{
  changeLoginSign: (userORcompany: String, index: Number) => void;
}> = ({ changeLoginSign }) => {
  const { setToastState } = useToast();
  const [loadingReq, setloadingReq] = useState<boolean>(false);
  const history = useHistory();

  const [typeValue, setTypeValue] = useState<string>("حقیقی");
  const photoId = useId();
  const [fileValue, setFileValue] = useState<File | null>(null);

  const companyRegiter = useForm<companyRegisterInput>({
    resolver: zodResolver(companyRegisterSchema),
  });

  const onSubmitHandlerCompanyRegister: SubmitHandler<companyRegisterInput> = (
    values
  ) => {
    console.log(values);
    const data = {
      company_english_name: values.nameEnglish,
      company_persian_name: values.namePersian,
      introduction: values.bio,
      website: values.websit,
      username: values.email,
      company_phone_number: values.phone,
      password: values.password,
      activity_field: values.activity,
      number_of_personnel: values.count,
      type: typeValue,
      logo: fileValue,
    };
    console.log(data);

    setloadingReq(true);

    registerCompanyAPI(data)
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
        changeLoginSign("company", 4);
        companyRegiter.reset();
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
      maxWidth="md"
    >
      <CssBaseline />
      <Box
        style={{
          marginTop: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar style={{ margin: "4px", backgroundColor: "green" }}>
          <LockOpenOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          ثبت نام کارفرما
        </Typography>
        <Box
          component="form"
          onSubmit={companyRegiter.handleSubmit(onSubmitHandlerCompanyRegister)}
          noValidate
          style={{
            marginTop: "0.8px",
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
            error={!!companyRegiter.formState.errors["namePersian"]}
            helperText={
              companyRegiter.formState.errors["namePersian"]
                ? companyRegiter.formState.errors["namePersian"].message
                : ""
            }
            {...companyRegiter.register("namePersian")}
            sx={{
              width: "45%",
              "@media (max-width: 576px)": {
                width: "100%",
              },
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
            id="nameEnglish"
            label="نام شرکت (انگلیسی)"
            error={!!companyRegiter.formState.errors["nameEnglish"]}
            helperText={
              companyRegiter.formState.errors["nameEnglish"]
                ? companyRegiter.formState.errors["nameEnglish"].message
                : ""
            }
            {...companyRegiter.register("nameEnglish")}
            sx={{
              width: "45%",
              "@media (max-width: 576px)": {
                width: "100%",
              },
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
            type={"number"}
            id="phone"
            label="شماره تماس شرکت"
            error={!!companyRegiter.formState.errors["phone"]}
            helperText={
              companyRegiter.formState.errors["phone"]
                ? companyRegiter.formState.errors["phone"].message
                : ""
            }
            {...companyRegiter.register("phone")}
            style={{}}
            sx={{
              width: "45%",
              "@media (max-width: 576px)": {
                width: "100%",
              },
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
            id="email"
            label="ایمیل"
            error={!!companyRegiter.formState.errors["email"]}
            helperText={
              companyRegiter.formState.errors["email"]
                ? companyRegiter.formState.errors["email"].message
                : ""
            }
            {...companyRegiter.register("email")}
            sx={{
              width: "45%",
              "@media (max-width: 576px)": {
                width: "100%",
              },
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
            error={!!companyRegiter.formState.errors["password"]}
            helperText={
              companyRegiter.formState.errors["password"]
                ? companyRegiter.formState.errors["password"].message
                : ""
            }
            {...companyRegiter.register("password")}
            sx={{
              width: "45%",
              "@media (max-width: 576px)": {
                width: "100%",
              },
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
            className={`fa ${iconPassword} absolute smmin:right-[40%] smmin:top-[286px] sm:left-[30px] sm:top-[445px] cursor-pointer`}
            onClick={handlePassword}
            aria-hidden="true"
          ></i>
          <TextField
            margin="normal"
            type={"text"}
            id="website"
            label="آدرس وبسایت (اختیاری)"
            error={!!companyRegiter.formState.errors["websit"]}
            helperText={
              companyRegiter.formState.errors["websit"]
                ? companyRegiter.formState.errors["websit"].message
                : ""
            }
            {...companyRegiter.register("websit")}
            sx={{
              width: "45%",
              "@media (max-width: 576px)": {
                width: "100%",
              },
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

          <FormControl
            required
            sx={{
              width: "45%",
              "@media (max-width: 576px)": {
                width: "100%",
              },
              mt: "12px",
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
          >
            <InputLabel id="demo-simple-select-label">تعداد پرسنل</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              defaultValue={""}
              label="تعداد پرسنل"
              error={!!companyRegiter.formState.errors["count"]}
              {...companyRegiter.register("count")}
              style={{ justifyContent: "center", alignItems: "center" }}
            >
              <MenuItem value={"1"}>کمتر از 10</MenuItem>
              <MenuItem value={"2"}>کمتر از 100</MenuItem>
              <MenuItem value={"3"}>بیشتر از 100</MenuItem>
            </Select>
            {companyRegiter.formState.errors["count"] ? (
              <p className="text-[12px] text-error mx-[14px] mt-[3px] font-[IRANSans]">
                {companyRegiter.formState.errors["count"].message}
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
          >
            <InputLabel id="demo-simple-select-label">حوزه فعالیت</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              defaultValue={""}
              label="حوزه فعالیت"
              error={!!companyRegiter.formState.errors["activity"]}
              {...companyRegiter.register("activity")}
              style={{ justifyContent: "center", alignItems: "center" }}
            >
              <MenuItem value={"فناوری اطلاعات"}>فناوری اطلاعات</MenuItem>
              <MenuItem value={"برنامه نویسی"}>برنامه نویسی</MenuItem>
              <MenuItem value={"مهندسی نرم افزار"}>مهندسی نرم افزار</MenuItem>
            </Select>
            {companyRegiter.formState.errors["activity"] ? (
              <p className="text-[12px] text-error mx-[14px] mt-[3px] font-[IRANSans]">
                {companyRegiter.formState.errors["activity"].message}
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
            multiline
            error={!!companyRegiter.formState.errors["bio"]}
            helperText={
              companyRegiter.formState.errors["bio"]
                ? companyRegiter.formState.errors["bio"].message
                : ""
            }
            {...companyRegiter.register("bio")}
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
            className="sm:w-[100%]"
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginTop: "12px",
              marginBottom: "8px",
              width: "45%",
            }}
          >
            <div
              style={{
                fontFamily: "IRANSans",
                width: "30%",
                color: "var(--lightBlack)",
              }}
            >
              لوگوی شرکت:{" "}
            </div>

            <Button
              variant="outlined"
              component="label"
              className="sm:text-[10px] smmin:text-[14px]"
              style={{
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

          <FormControl
            className="sm:w-[100%]"
            style={{
              justifyContent: "center",
              width: "45%",
            }}
          >
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              value={typeValue}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setTypeValue((event.target as HTMLInputElement).value);
              }}
              name="radio-buttons-group"
              style={{ flexDirection: "row" }}
            >
              <FormControlLabel
                style={{ margin: "0px" }}
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
            style={{ marginTop: "8px", marginBottom: "16px" }}
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
                onClick={() => changeLoginSign("company", 0)}
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

export default RegisterCompany;
