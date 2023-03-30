import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { object, string, TypeOf } from "zod";
import TextField from "@mui/material/TextField";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import SingleDropdownWithSearch from "../../../SingleDropdownWithSearch";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

const THEME = createTheme({
  typography: {
    fontFamily: `IRANYekan`,
  },
});

const step1Schema = object({
  title: string().nonempty("عنوان آگهی اجباری است"),
  type: string().nonempty("نوع همکاری اجباری است"),
  military: string().nonempty("وضعیت سربازی اجباری است"),
  degree: string().nonempty("حداقل مدرک تحصیلی اجباری است"),
  work: string().nonempty("سابقه کاری اجباری است"),
  gender: string().nonempty("جنسیت اجباری است"),
  salary: string().nonempty("پایه حقوق اجباری است"),
});
const step2Schema = object({
  title: string().nonempty("عنوان آگهی اجباری است"),
  type: string().nonempty("نوع همکاری اجباری است"),
  military: string().nonempty("وضعیت سربازی اجباری است"),
  degree: string().nonempty("حداقل مدرک تحصیلی اجباری است"),
  work: string().nonempty("سابقه کاری اجباری است"),
  gender: string().nonempty("جنسیت اجباری است"),
  salary: string().nonempty("پایه حقوق اجباری است"),
});
const step3Schema = object({
  title: string().nonempty("عنوان آگهی اجباری است"),
  type: string().nonempty("نوع همکاری اجباری است"),
  military: string().nonempty("وضعیت سربازی اجباری است"),
  degree: string().nonempty("حداقل مدرک تحصیلی اجباری است"),
  work: string().nonempty("سابقه کاری اجباری است"),
  gender: string().nonempty("جنسیت اجباری است"),
  salary: string().nonempty("پایه حقوق اجباری است"),
});
type step1Input = TypeOf<typeof step1Schema>;
type step2Input = TypeOf<typeof step2Schema>;
type step3Input = TypeOf<typeof step3Schema>;

const NewPosts: React.FC = () => {
  const step1 = useForm<step1Input>({
    resolver: zodResolver(step1Schema),
  });
  const step2 = useForm<step2Input>({
    resolver: zodResolver(step2Schema),
  });
  const step3 = useForm<step3Input>({
    resolver: zodResolver(step3Schema),
  });
  const onSubmitHandlerStep1: SubmitHandler<step1Input> = (values) => {
    console.log(values);
    handleNext();
  };
  const onSubmitHandlerStep2: SubmitHandler<step2Input> = (values) => {
    console.log(values);
    handleNext();
  };
  const onSubmitHandlerStep3: SubmitHandler<step3Input> = (values) => {
    console.log(values);
    handleNext();
  };

  const steps = ["", "", ""];

  const stepsContent = [
    <Box
      component="form"
      onSubmit={step1.handleSubmit(onSubmitHandlerStep1)}
      noValidate
      sx={{
        mt: 0.1,
        display: "flex",
        // flexDirection: "column",
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
            fontFamily: "IRANYekan",
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
            fontFamily: "IRANYekan",
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
          defaultValue={""}
          label="نوع همکاری"
          error={!!step1.formState.errors["type"]}
          {...step1.register("type")}
          sx={{ justifyContent: "center", alignItems: "center" }}
        >
          <MenuItem value={"تمام وقت"}>تمام وقت</MenuItem>
          <MenuItem value={"پاره وقت"}>پاره وقت</MenuItem>
          <MenuItem value={"دور کاری"}>دور کاری</MenuItem>
        </Select>
        {step1.formState.errors["type"] ? (
          <p className="text-[12px] text-[#D32F2F] mx-[14px] mt-[3px] font-[IRANYekan]">
            {step1.formState.errors["type"].message}
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
            fontFamily: "IRANYekan",
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
          defaultValue={""}
          label="وضعیت سربازی"
          error={!!step1.formState.errors["military"]}
          {...step1.register("military")}
          sx={{ justifyContent: "center", alignItems: "center" }}
        >
          <MenuItem value={"مهم نیست"}>مهم نیست</MenuItem>
          <MenuItem value={"دارای کارت پایان خدمت"}>
            دارای کارت پایان خدمت
          </MenuItem>
        </Select>
        {step1.formState.errors["military"] ? (
          <p className="text-[12px] text-[#D32F2F] mx-[14px] mt-[3px] font-[IRANYekan]">
            {step1.formState.errors["military"].message}
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
            fontFamily: "IRANYekan",
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
          defaultValue={""}
          label="حداقل مدرک تحصیلی"
          error={!!step1.formState.errors["degree"]}
          {...step1.register("degree")}
          sx={{ justifyContent: "center", alignItems: "center" }}
        >
          <MenuItem value={"زیر دیپلم"}>زیر دیپلم</MenuItem>
          <MenuItem value={"دیپلم"}>دیپلم</MenuItem>
          <MenuItem value={"کاردانی"}>کاردانی</MenuItem>
          <MenuItem value={"کارشناسی"}>کارشناسی</MenuItem>
          <MenuItem value={"کارشناسی ارشد"}>کارشناسی ارشد</MenuItem>
          <MenuItem value={"دکترا"}>دکترا</MenuItem>
        </Select>
        {step1.formState.errors["degree"] ? (
          <p className="text-[12px] text-[#D32F2F] mx-[14px] mt-[3px] font-[IRANYekan]">
            {step1.formState.errors["degree"].message}
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
            fontFamily: "IRANYekan",
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
          defaultValue={""}
          label="سابقه کاری"
          error={!!step1.formState.errors["work"]}
          {...step1.register("work")}
          sx={{ justifyContent: "center", alignItems: "center" }}
        >
          <MenuItem value={"نیاز نیست"}>نیاز نیست</MenuItem>
          <MenuItem value={"حداقل یک سال"}>حداقل یک سال</MenuItem>
          <MenuItem value={"حداقل 3 سال"}>حداقل 3 سال</MenuItem>
          <MenuItem value={"بالای 3 سال"}>بالای 3 سال</MenuItem>
        </Select>
        {step1.formState.errors["work"] ? (
          <p className="text-[12px] text-[#D32F2F] mx-[14px] mt-[3px] font-[IRANYekan]">
            {step1.formState.errors["work"].message}
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
            fontFamily: "IRANYekan",
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
          defaultValue={""}
          label="جنسیت"
          error={!!step1.formState.errors["gender"]}
          {...step1.register("gender")}
          sx={{ justifyContent: "center", alignItems: "center" }}
        >
          <MenuItem value={"مهم نیست"}>مهم نیست</MenuItem>
          <MenuItem value={"مرد"}>مرد</MenuItem>
          <MenuItem value={"زن"}>زن</MenuItem>
        </Select>
        {step1.formState.errors["gender"] ? (
          <p className="text-[12px] text-[#D32F2F] mx-[14px] mt-[3px] font-[IRANYekan]">
            {step1.formState.errors["gender"].message}
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
            fontFamily: "IRANYekan",
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
          defaultValue={""}
          label="پایه حقوق"
          error={!!step1.formState.errors["salary"]}
          {...step1.register("salary")}
          sx={{ justifyContent: "center", alignItems: "center" }}
        >
          <MenuItem value={"توافقی"}>توافقی</MenuItem>
          <MenuItem value={"حداکثر 5 میلیون تومان"}>
            حداکثر 5 میلیون تومان
          </MenuItem>
          <MenuItem value={"5 تا 7 میلیون تومان"}>5 تا 7 میلیون تومان</MenuItem>
          <MenuItem value={"7 تا 10 میلیون تومان"}>
            7 تا 10 میلیون تومان
          </MenuItem>
          <MenuItem value={"بالای 10 میلیون تومان"}>
            بالای 10 میلیون تومان
          </MenuItem>
        </Select>
        {step1.formState.errors["salary"] ? (
          <p className="text-[12px] text-[#D32F2F] mx-[14px] mt-[3px] font-[IRANYekan]">
            {step1.formState.errors["salary"].message}
          </p>
        ) : (
          ""
        )}
      </FormControl>

      {/* <Box
        sx={{
          width: "45%",
          marginTop: "16px",
          marginBottom: "8px",
          "@media (max-width: 576px)": {
            width: "100%",
          },
          "& label": {
            fontFamily: "IRANYekan",
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
        <SingleDropdownWithSearch
          onChange={() => {}}
          placeholder="دسته بندی مدنظر خود را انتخاب کنید"
        />
      </Box> */}

      <Button id="step1" type="submit" sx={{ display: "none" }} />
    </Box>,
    <Box
      component="form"
      onSubmit={step2.handleSubmit(onSubmitHandlerStep2)}
      noValidate
      sx={{
        mt: 0.1,
        display: "flex",
        // flexDirection: "column",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Box
        sx={{
          width: "45%",
          marginTop: "16px",
          marginBottom: "8px",
          "@media (max-width: 576px)": {
            width: "100%",
          },
          "& label": {
            fontFamily: "IRANYekan",
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
        <SingleDropdownWithSearch
          onChange={() => {}}
          placeholder="دسته بندی شغلی"
        />
      </Box>
      
      <Box
        sx={{
          width: "45%",
          marginTop: "16px",
          marginBottom: "8px",
          "@media (max-width: 576px)": {
            width: "100%",
          },
          "& label": {
            fontFamily: "IRANYekan",
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
        <SingleDropdownWithSearch options={[{label:"sallam",value:1},{label:"bye",value:1}]}
          onChange={(e) => {console.log(e?.label);
          }}
          placeholder="تکنولوژی و برچسب"
        />
      </Box>
      
      <Box
        sx={{
          width: "45%",
          marginTop: "16px",
          marginBottom: "8px",
          "@media (max-width: 576px)": {
            width: "100%",
          },
          "& label": {
            fontFamily: "IRANYekan",
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
        <SingleDropdownWithSearch
          onChange={() => {}}
          placeholder="استان"
        />
      </Box>
      
      <Box
        sx={{
          width: "45%",
          marginTop: "16px",
          marginBottom: "8px",
          marginRight:"auto",
          "@media (max-width: 576px)": {
            width: "100%",
          },
          "& label": {
            fontFamily: "IRANYekan",
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
        <SingleDropdownWithSearch
          onChange={() => {}}
          placeholder="شهر"
        />
      </Box>

      <Button id="step2" type="submit" sx={{ display: "none !important" }} />
    </Box>,
    "",
  ];

  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set<number>());

  const isStepOptional = (step: number) => {
    return step === 1;
  };

  const isStepSkipped = (step: number) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <ThemeProvider theme={THEME}>
      <Box
        className="px-[15%] sm:px-[5%] py-[2%]"
        sx={{
          fontFamily: "IRANYekan",
          backgroundColor: "#e0e5eb",
          minHeight: "90.5vh",
        }}
      >
        <h1 className="text-[20px]">ایجاد آگهی</h1>
        <Box
          sx={{
            backgroundColor: "white",
            borderRadius: "10px",
            marginTop: "10px",
            paddingX: "2%",
            paddingY: "3%",
            minHeight: "70vh",
            fontSize: "1rem",
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            justifyContent: "space-between",
          }}
        >
          <Stepper activeStep={activeStep}>
            {steps.map((label, index) => {
              const stepProps: { completed?: boolean } = {};
              const labelProps: {
                optional?: React.ReactNode;
              } = {};
              if (isStepOptional(index)) {
                // labelProps.optional = (
                //   <Typography variant="caption">اختیاری</Typography>
                // );
              }
              if (isStepSkipped(index)) {
                stepProps.completed = false;
              }
              return (
                <Step
                  key={label}
                  {...stepProps}
                  sx={{
                    "& svg": {
                      width: { xs: "28px", sm: "40px" },
                      height: { xs: "28px", sm: "40px" },
                    },
                  }}
                >
                  <StepLabel {...labelProps}>{label}</StepLabel>
                </Step>
              );
            })}
          </Stepper>
          {activeStep === steps.length ? (
            <React.Fragment>
              <Typography sx={{ mt: 2, mb: 1 }}>
                همه مراحل با موفقیت طی شد.
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                <Box sx={{ flex: "1 1 auto" }} />
                <Button onClick={handleReset}>دوباره</Button>
              </Box>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <Typography sx={{ mt: 2, mb: 1 }}>
                {stepsContent[activeStep]}
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                <Button
                  color="inherit"
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  sx={{ mr: 1 }}
                >
                  قبلی
                </Button>
                <Box sx={{ flex: "1 1 auto" }} />
                {isStepOptional(activeStep) && (
                  <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                    رد
                  </Button>
                )}
                <Button
                  onClick={() => {
                    (
                      document.getElementById(
                        `step${activeStep + 1}`
                      ) as HTMLButtonElement
                    ).click();
                  }}
                >
                  {activeStep === steps.length - 1 ? "پایان" : "بعدی"}
                </Button>
              </Box>
            </React.Fragment>
          )}
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default NewPosts;
