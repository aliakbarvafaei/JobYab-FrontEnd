import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
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
import { useToast } from "../../../../contexts/ToastState";
import { updateCompanyAPI } from "../../../../services/api";
import { eachToast } from "../../../../ts/interfaces";
import { addItemOnce } from "../../../../ts/functions";

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

const Information: React.FC<{ user: any }> = ({ user }) => {
  const { setToastState } = useToast();
  const [loadingReq, setloadingReq] = useState<boolean>(false);
  const [typeValue, setTypeValue] = useState<string>(user.type);

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
      activity_field: values.activity,
      number_of_personnel: values.count,
      type: typeValue,
    };

    setloadingReq(true);

    updateCompanyAPI(data)
      .then((response) => {
        setloadingReq(false);
        setToastState((old: Array<eachToast>) =>
          addItemOnce(old.slice(), {
            title: "1",
            description: "ویرایش با موفقیت انجام شد",
            key: Math.random(),
          })
        );
      })
      .catch((err) => {
        setloadingReq(false);
        if (err.response && err.response.status === 404) {
          setToastState((old: Array<eachToast>) =>
            addItemOnce(old.slice(), {
              title: "2",
              description: "کاربر یافت نشد",
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

  useEffect(() => {
    companyRegiter.setValue("email", user.data.username);
    companyRegiter.setValue("bio", user.introduction);
    companyRegiter.setValue("namePersian", user.company_persian_name);
    companyRegiter.setValue("nameEnglish", user.company_english_name);
    companyRegiter.setValue("phone", user.company_phone_number);
    companyRegiter.setValue("websit", user.website);
  }, [user]);

  return (
    <Box className="mdmin:mx-[15%]" sx={{ fontFamily: "IRANSans" }}>
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
            InputProps={{
              readOnly: true,
            }}
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
                fontFamily: "IRANSans",
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
                fontFamily: "IRANSans",
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
                fontFamily: "IRANSans",
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
                left: "unset",
                right: "1.75rem",
                fontFamily: "IRANSans",
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
                fontFamily: "IRANSans",
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
                fontFamily: "IRANSans",
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
              label="تعداد پرسنل"
              defaultValue={user.number_of_personnel}
              error={!!companyRegiter.formState.errors["count"]}
              {...companyRegiter.register("count")}
              sx={{ justifyContent: "center", alignItems: "center" }}
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
                left: "unset",
                right: "1.75rem",
                fontFamily: "IRANSans",
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
              defaultValue={user.activity_field}
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
                fontFamily: "IRANSans",
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
            sx={{
              justifyContent: "center",
              width: "45%",
              "@media (max-width: 576px)": {
                width: "100%",
              },
            }}
          >
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              value={typeValue}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setTypeValue((event.target as HTMLInputElement).value);
              }}
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
            {loadingReq ? (
              <i
                style={{ fontSize: "24.5px" }}
                className="fa fa-spinner fa-spin"
                aria-hidden="true"
              ></i>
            ) : (
              "ویرایش"
            )}
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Information;
