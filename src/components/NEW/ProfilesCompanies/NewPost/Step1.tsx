import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { object, string, TypeOf } from "zod";
import TextField from "@mui/material/TextField";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

const step1Schema = object({
  title: string().nonempty("عنوان آگهی اجباری است"),
  type: string().nonempty("نوع همکاری اجباری است"),
  military: string().nonempty("وضعیت سربازی اجباری است"),
  degree: string().nonempty("حداقل مدرک تحصیلی اجباری است"),
  work: string().nonempty("سابقه کاری اجباری است"),
  gender: string().nonempty("جنسیت اجباری است"),
  salary: string().nonempty("پایه حقوق اجباری است"),
});

type step1Input = TypeOf<typeof step1Schema>;

const Step1: React.FC<{ handleNext: (values: any) => void }> = ({
  handleNext,
}) => {
  const step1 = useForm<step1Input>({
    resolver: zodResolver(step1Schema),
  });
  const onSubmitHandlerStep1: SubmitHandler<step1Input> = (values) => {
    console.log(values);
    handleNext(values);
  };

  return (
    <Box
      component="form"
      onSubmit={step1.handleSubmit(onSubmitHandlerStep1)}
      noValidate
      sx={{
        mt: 0.1,
        display: "flex",
        // flexDirection: "column",
        minHeight: "285px",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <TextField
        margin="normal"
        required
        id="title"
        label="عنوان آگهی"
        error={!!step1.formState.errors["title"]}
        helperText={
          step1.formState.errors["title"]
            ? step1.formState.errors["title"].message
            : ""
        }
        {...step1.register("title")}
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
        <InputLabel id="demo-simple-select-label">نوع همکاری</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          defaultValue={step1.getValues("type")}
          label="نوع همکاری"
          error={!!step1.formState.errors["type"]}
          {...step1.register("type")}
          sx={{ justifyContent: "center", alignItems: "center" }}
        >
          <MenuItem value={"ft"}>تمام وقت</MenuItem>
          <MenuItem value={"pt"}>پاره وقت</MenuItem>
          <MenuItem value={"pr"}>دور کاری</MenuItem>
          <MenuItem value={"re"}>پروژه‌ای</MenuItem>
        </Select>
        {step1.formState.errors["type"] ? (
          <Typography
            component={"p"}
            sx={{
              fontSize: "12px",
              color: "#D32F2F",
              marginLeft: "14px",
              marginRight: "12px",
              marginTop: "3px",
              fontFamily: "IRANSans",
            }}
          >
            {step1.formState.errors["type"].message}
          </Typography>
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
        <InputLabel id="demo-simple-select-label">وضعیت سربازی</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          defaultValue={step1.getValues("military")}
          label="وضعیت سربازی"
          error={!!step1.formState.errors["military"]}
          {...step1.register("military")}
          sx={{ justifyContent: "center", alignItems: "center" }}
        >
          <MenuItem value={"1"}>مهم نیست</MenuItem>
          <MenuItem value={"2"}>معافیت تحصیلی</MenuItem>
          <MenuItem value={"3"}>دارای کارت پایان خدمت</MenuItem>
        </Select>
        {step1.formState.errors["military"] ? (
          <Typography
            component={"p"}
            sx={{
              fontSize: "12px",
              color: "#D32F2F",
              marginLeft: "14px",
              marginRight: "12px",
              marginTop: "3px",
              fontFamily: "IRANSans",
            }}
          >
            {step1.formState.errors["military"].message}
          </Typography>
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
        <InputLabel id="demo-simple-select-label">حداقل مدرک تحصیلی</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          defaultValue={step1.getValues("degree")}
          label="حداقل مدرک تحصیلی"
          error={!!step1.formState.errors["degree"]}
          {...step1.register("degree")}
          sx={{ justifyContent: "center", alignItems: "center" }}
        >
          <MenuItem value={"0"}>مهم نیست</MenuItem>
          <MenuItem value={"1"}>زیر دیپلم</MenuItem>
          <MenuItem value={"2"}>دیپلم</MenuItem>
          <MenuItem value={"3"}>فوق دیپلم</MenuItem>
          <MenuItem value={"4"}>لیسانس</MenuItem>
          <MenuItem value={"5"}>فوق لیسانس</MenuItem>
          <MenuItem value={"6"}>دکترا</MenuItem>
          <MenuItem value={"7"}>بالاتر از دکترا</MenuItem>
        </Select>
        {step1.formState.errors["degree"] ? (
          <Typography
            component={"p"}
            sx={{
              fontSize: "12px",
              color: "#D32F2F",
              marginLeft: "14px",
              marginRight: "12px",
              marginTop: "3px",
              fontFamily: "IRANSans",
            }}
          >
            {step1.formState.errors["degree"].message}
          </Typography>
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
        <InputLabel id="demo-simple-select-label">سابقه کاری</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          defaultValue={step1.getValues("work")}
          label="سابقه کاری"
          error={!!step1.formState.errors["work"]}
          {...step1.register("work")}
          sx={{ justifyContent: "center", alignItems: "center" }}
        >
          <MenuItem value={"1"}>مهم نیست</MenuItem>
          <MenuItem value={"2"}>حداقل 1 سال</MenuItem>
          <MenuItem value={"3"}>حداقل 2 سال</MenuItem>
          <MenuItem value={"4"}>حداقل 3 سال</MenuItem>
          <MenuItem value={"5"}>حداقل 4 سال</MenuItem>

        </Select>
        {step1.formState.errors["work"] ? (
          <Typography
            component={"p"}
            sx={{
              fontSize: "12px",
              color: "#D32F2F",
              marginLeft: "14px",
              marginRight: "12px",
              marginTop: "3px",
              fontFamily: "IRANSans",
            }}
          >
            {step1.formState.errors["work"].message}
          </Typography>
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
        <InputLabel id="demo-simple-select-label">جنسیت</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          defaultValue={step1.getValues("gender")}
          label="جنسیت"
          error={!!step1.formState.errors["gender"]}
          {...step1.register("gender")}
          sx={{ justifyContent: "center", alignItems: "center" }}
        >
          <MenuItem value={"1"}>مهم نیست</MenuItem>
          <MenuItem value={"m"}>مرد</MenuItem>
          <MenuItem value={"f"}>زن</MenuItem>
        </Select>
        {step1.formState.errors["gender"] ? (
          <Typography
            component={"p"}
            sx={{
              fontSize: "12px",
              color: "#D32F2F",
              marginLeft: "14px",
              marginRight: "12px",
              marginTop: "3px",
              fontFamily: "IRANSans",
            }}
          >
            {step1.formState.errors["gender"].message}
          </Typography>
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
        <InputLabel id="demo-simple-select-label">پایه حقوق</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          defaultValue={step1.getValues("salary")}
          label="پایه حقوق"
          error={!!step1.formState.errors["salary"]}
          {...step1.register("salary")}
          sx={{ justifyContent: "center", alignItems: "center" }}
        >
          <MenuItem value={"1"}>توافقی</MenuItem>
          <MenuItem value={"2"}>
            از 5 میلیون تومان
          </MenuItem>
          <MenuItem value={"3"}>5 از 10 میلیون تومان</MenuItem>
          <MenuItem value={"4"}>
            7 از 15 میلیون تومان
          </MenuItem>
          <MenuItem value={"5"}>
            از 20 میلیون تومان
          </MenuItem>
        </Select>
        {step1.formState.errors["salary"] ? (
          <Typography
            component={"p"}
            sx={{
              fontSize: "12px",
              color: "#D32F2F",
              marginLeft: "14px",
              marginRight: "12px",
              marginTop: "3px",
              fontFamily: "IRANSans",
            }}
          >
            {step1.formState.errors["salary"].message}
          </Typography>
        ) : (
          ""
        )}
      </FormControl>

      <Button id="step1" type="submit" sx={{ display: "none" }} />
    </Box>
  );
};

export default Step1;
