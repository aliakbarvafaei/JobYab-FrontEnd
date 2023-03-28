import { Box } from "@mui/material";
import React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
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

const employerRegisterSchema = object({
  email: string().nonempty("ایمیل اجباری است").email("ایمیل نادرست است"),
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

type employerRegisterInput = TypeOf<typeof employerRegisterSchema>;

const Information: React.FC = () => {
  const employerRegiter = useForm<employerRegisterInput>({
    resolver: zodResolver(employerRegisterSchema),
  });

  const onSubmitHandlerEmployerRegister: SubmitHandler<
    employerRegisterInput
  > = (values) => {
    console.log(values);
    employerRegiter.reset();
  };

  return (
    <Box className="mdmin:mx-[15%]" sx={{ fontFamily: "IRANYekan" }}>
      <h1 className="text-[20px]">پروفایل</h1>
      <Box
        sx={{
          marginTop: "10px",
          minHeight: "70vh",
          fontSize: "1rem",
          backgroundColor: "white",
          padding: "15px",
          borderRadius: "10px",
        }}
      >
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
            defaultValue={"جابینجا"}
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
                fontFamily: "IRANYekan",
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
            defaultValue={"jobinja"}
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
                fontFamily: "IRANYekan",
                transformOrigin: "right",
                fontSize: "1rem",
              },
              "& legend": {
                textAlign: "right",
                fontSize: "1rem",
              },
            }}
            // autoComplete="name"
          />
          <TextField
            margin="normal"
            required
            defaultValue={"02536661010"}
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
                fontFamily: "IRANYekan",
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
            defaultValue={"ali@gmail.com"}
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
                fontFamily: "IRANYekan",
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
            type={"text"}
            defaultValue={"www.jobinja.ir"}
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
                fontFamily: "IRANYekan",
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
                left: "unset",
                right: "1.75rem",
                fontFamily: "IRANYekan",
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
              defaultValue={"کمتر از 10"}
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
                fontFamily: "IRANYekan",
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
              defaultValue={"فناوری اطلاعات"}
              label="حوزه فعالیت"
              error={!!employerRegiter.formState.errors["activity"]}
              {...employerRegiter.register("activity")}
              sx={{ justifyContent: "center", alignItems: "center" }}
            >
              <MenuItem value={"فناوری اطلاعات"}>فناوری اطلاعات</MenuItem>
              <MenuItem value={"برنامه نویسی"}>برنامه نویسی</MenuItem>
              <MenuItem value={"مهندسی نرم افزار"}>مهندسی نرم افزار</MenuItem>
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
            defaultValue={"سلام من شرکت هستم."}
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
                fontFamily: "IRANYekan",
                transformOrigin: "right",
                fontSize: "1rem",
              },
              "& legend": {
                textAlign: "right",
                fontSize: "1rem",
              },
            }}
          />
          <FormControl fullWidth>
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
            sx={{ mt: 1 }}
          >
            ویرایش
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Information;
