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

const THEME = createTheme({
  // typography: {
  //   fontFamily: `IRANYekan`,
  // },
});
const step1Schema = object({
  //   email: string().nonempty("ایمیل اجباری است").email("ایمیل نادرست است"),
  //   password: string()
  //     .nonempty("رمزعبور اجباری است")
  //     .min(8, "رمزعبور باید حداقل 8 کاراکتر باشد")
  //     .max(32, "رمز عبور بیشتر از 32 کاراکتر نمیتواند باشد"),
  phone: string()
    .nonempty("شماره تماس شرکت اجباری است")
    .min(11, "شماره تماس شرکت باید 11 رقم باشد")
    .max(11, "شماره تماس شرکت باید 11 رقم باشد"),
  title: string().nonempty("عنوان آگهی اجباری است"),
  jobCategory: string().nonempty("دسته‌بندی شغلی اجباری است"),
  //   bio: string(),
  //   websit: string(),
  //   activity: string().nonempty("حوزه فعالیت اجباری است"),
  //   count: string().nonempty("تعداد پرسنل اجباری است"),
});

type step1Input = TypeOf<typeof step1Schema>;

const NewPosts: React.FC = () => {
  const step1 = useForm<step1Input>({
    resolver: zodResolver(step1Schema),
  });
  const onSubmitHandlerStep1: SubmitHandler<step1Input> = (values) => {
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
      <TextField
        margin="normal"
        required
        id="jobCategory"
        label="دسته‌بندی شغل"
        error={!!step1.formState.errors["jobCategory"]}
        helperText={
          step1.formState.errors["jobCategory"]
            ? step1.formState.errors["jobCategory"].message
            : ""
        }
        {...step1.register("jobCategory")}
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
            textAlign: "center",
            fontSize: "4rem",
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
        error={!!step1.formState.errors["phone"]}
        helperText={
          step1.formState.errors["phone"]
            ? step1.formState.errors["phone"].message
            : ""
        }
        {...step1.register("phone")}
        style={{}}
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
      <Button id="step1" type="submit" sx={{ display: "none" }} />
    </Box>,
    "",
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
        className="px-[15%] py-[2%]"
        sx={{
          fontFamily: "IRANYekan",
          backgroundColor: "#e0e5eb",
          height: "90.5vh",
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
