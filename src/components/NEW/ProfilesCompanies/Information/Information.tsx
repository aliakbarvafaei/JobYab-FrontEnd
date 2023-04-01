import { Box } from "@mui/material";
import React, { useId, useState } from "react";
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
import UploadIcon from "@mui/icons-material/Upload";

const companyRegisterSchema = object({
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

type companyRegisterInput = TypeOf<typeof companyRegisterSchema>;

const Information: React.FC = () => {
  const logoId = useId();
  const resumeId = useId();

  const [logoValue, setLogoValue] = useState<FileList | null>(null);
  const [resumeValue, setResumeValue] = useState<FileList | null>(null);

  const companyRegiter = useForm<companyRegisterInput>({
    resolver: zodResolver(companyRegisterSchema),
  });

  const onSubmitHandlerCompanyRegister: SubmitHandler<companyRegisterInput> = (
    values
  ) => {
    console.log(values);
    companyRegiter.reset();
  };

  return (
    <Box className="mdmin:mx-[15%]" sx={{ fontFamily: "IRANYekan" }}>
      <h1 className="text-[20px]">پروفایل</h1>
      <Box
        sx={{
          marginTop: "10px",
          fontSize: "1rem",
          backgroundColor: "white",
          padding: "15px",
          borderRadius: "10px",
        }}
      >
        <Box
          component="form"
          onSubmit={companyRegiter.handleSubmit(onSubmitHandlerCompanyRegister)}
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
              error={!!companyRegiter.formState.errors["count"]}
              {...companyRegiter.register("count")}
              sx={{ justifyContent: "center", alignItems: "center" }}
            >
              <MenuItem value={"کمتر از 10"}>کمتر از 10</MenuItem>
              <MenuItem value={"کمتر از 100"}>کمتر از 100</MenuItem>
              <MenuItem value={"بیشتر از 100"}>بیشتر از 100</MenuItem>
            </Select>
            {companyRegiter.formState.errors["count"] ? (
              <p className="text-[12px] text-[#D32F2F] mx-[14px] mt-[3px] font-[IRANYekan]">
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
              error={!!companyRegiter.formState.errors["activity"]}
              {...companyRegiter.register("activity")}
              sx={{ justifyContent: "center", alignItems: "center" }}
            >
              <MenuItem value={"فناوری اطلاعات"}>فناوری اطلاعات</MenuItem>
              <MenuItem value={"برنامه نویسی"}>برنامه نویسی</MenuItem>
              <MenuItem value={"مهندسی نرم افزار"}>مهندسی نرم افزار</MenuItem>
            </Select>
            {companyRegiter.formState.errors["activity"] ? (
              <p className="text-[12px] text-[#D32F2F] mx-[14px] mt-[3px] font-[IRANYekan]">
                {companyRegiter.formState.errors["activity"].message}
              </p>
            ) : (
              ""
            )}
          </FormControl>

          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginTop: "12px",
              marginBottom: "8px",
              width: "45%",
              "@media (max-width: 576px)": {
                width: "100%",
              },
            }}
          >
            <div
              style={{
                fontFamily: "IRANYekan",
                width: "30%",
                color: "#00000099",
              }}
              className="sm:text-[12px]"
            >
              فایل رزومه:{" "}
            </div>

            <Button
              variant="outlined"
              component="label"
              sx={{
                fontSize: { xs: "10px", sm: "14px" },
                width: "65%",
                fontFamily: "IRANYekan",
              }}
            >
              <input
                onChange={() => {
                  setResumeValue(
                    (document.getElementById(resumeId) as HTMLInputElement)
                      .files
                  );
                }}
                id={resumeId}
                accept="application/pdf"
                type="file"
                hidden
              />
              {resumeValue != null ? (
                resumeValue[0].name
              ) : (
                <>
                  <UploadIcon />
                  بارگذاری فایل
                </>
              )}
            </Button>
          </Box>

          <TextField
            margin="normal"
            fullWidth
            type={"textArea"}
            defaultValue={"سلام من شرکت هستم."}
            id="bio"
            label="معرفی شرکت"
            error={!!companyRegiter.formState.errors["bio"]}
            helperText={
              companyRegiter.formState.errors["bio"]
                ? companyRegiter.formState.errors["bio"].message
                : ""
            }
            {...companyRegiter.register("bio")}
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

          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginTop: "12px",
              marginBottom: "8px",
              width: "45%",
              "@media (max-width: 576px)": {
                width: "100%",
              },
            }}
          >
            <div
              style={{
                fontFamily: "IRANYekan",
                width: "30%",
                color: "#00000099",
              }}
              className="sm:text-[12px]"
            >
              لوگوی شرکت:{" "}
            </div>

            <Button
              variant="outlined"
              component="label"
              sx={{
                fontSize: { xs: "10px", sm: "14px" },
                width: "65%",
                fontFamily: "IRANYekan",
              }}
            >
              <input
                onChange={() => {
                  setLogoValue(
                    (document.getElementById(logoId) as HTMLInputElement).files
                  );
                }}
                id={logoId}
                accept="image/*"
                type="file"
                hidden
              />
              {logoValue != null ? (
                logoValue[0].name
              ) : (
                <>
                  <UploadIcon />
                  بارگذاری فایل
                </>
              )}
            </Button>
          </Box>

          <FormControl
            sx={{
              justifyContent: "center",
              width: "45%",
              "@media (max-width: 576px)": {
                width: "100%",
              },
            }}
          >
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

          <Button type="submit" fullWidth variant="contained" sx={{ mt: 1 }}>
            ویرایش
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Information;
