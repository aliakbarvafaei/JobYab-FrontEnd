import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import { NewPost } from "../../../services/api";
import { Link } from "react-router-dom";
import { eachToast } from "../../../ts/interfaces";
import { accessToken, addItemOnce } from "../../../ts/functions";
import { useToast } from "../../../contexts/ToastState";
import { useDispatch } from "react-redux";

interface step1 {
  title: string;
  type: string;
  military: string;
  degree: string;
  work: string;
  gender: string;
  salary: string;
}
interface step2 {
  province: string;
  city: string;
  jobCategory: string;
  technology: string;
}
interface step3 {
  bio: string;
}

const NewPosts: React.FC = () => {
  const steps = [{ label: "1" }, { label: "2" }, { label: "3" }];

  const { setToastState } = useToast();
  const [loadingReq, setloadingReq] = React.useState<boolean>(false);

  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set<number>());

  const [step1Value, setStep1Value] = React.useState<step1 | null>(null);
  const [step2Value, setStep2Value] = React.useState<step2 | null>(null);
  const [step3Value, setStep3Value] = React.useState<step3 | null>(null);

  const dispatch = useDispatch();
  
  const isStepOptional = (step: number) => {
    return false;
  };

  const isStepSkipped = (step: number) => {
    return skipped.has(step);
  };

  const handleNext = (values: any) => {
    if (activeStep === 0) setStep1Value(values);
    else if (activeStep === 1) setStep2Value(values);
    else if (activeStep === 2) {
      setStep3Value(values);
      const data = {
        title: (step1Value as step1).title,
        sarbazi: (step1Value as step1).military,
        sex: (step1Value as step1).gender,
        degree: (step1Value as step1).degree,
        salary: (step1Value as step1).salary,
        cooperation_type: (step1Value as step1).type,
        experience: (step1Value as step1).work,
        job_type: (step2Value as step2).jobCategory,
        city: (step2Value as step2).city,
        state: (step2Value as step2).province,
        skills: (step2Value as step2).technology,
        description: values.bio,
      };
      setloadingReq(true);
      accessToken(dispatch);
      NewPost(data)
        .then((response) => {
          console.log(response);
          setToastState((old: Array<eachToast>) =>
            addItemOnce(old.slice(), {
              title: "1",
              description: "آگهی با موفقیت اضافه شد",
              key: Math.random(),
            })
          );
          let newSkipped = skipped;
          if (isStepSkipped(activeStep)) {
            newSkipped = new Set(newSkipped.values());
            newSkipped.delete(activeStep);
          }

          setActiveStep((prevActiveStep) => prevActiveStep + 1);
          setSkipped(newSkipped);
          setloadingReq(false);
        })
        .catch((err) => {
          setloadingReq(false);
          console.log(err);
          setToastState((old: Array<eachToast>) =>
            addItemOnce(old.slice(), {
              title: "2",
              description: "عملیات باخطا مواجه شد",
              key: Math.random(),
            })
          );
        });
    }

    if (activeStep === 0 || activeStep === 1) {
      let newSkipped = skipped;
      if (isStepSkipped(activeStep)) {
        newSkipped = new Set(newSkipped.values());
        newSkipped.delete(activeStep);
      }

      setActiveStep((prevActiveStep) => prevActiveStep + 1);
      setSkipped(newSkipped);
    }
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

  return (
    <Box
      className="px-[15%] sm:px-[5%] py-[2%]"
      style={{
        fontFamily: "IRANSans",
        backgroundColor: "var(--tabBg)",
        minHeight: "90.5vh",
      }}
    >
      <h1 className="text-[20px]">ایجاد آگهی</h1>
      <Box
        className="px-[2%] py-[3%]"
        style={{
          backgroundColor: "white",
          borderRadius: "10px",
          marginTop: "10px",

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
            }
            if (isStepSkipped(index)) {
              stepProps.completed = false;
            }
            return (
              <Step
                key={index}
                {...stepProps}
                sx={{
                  "& svg": {
                    width: { xs: "28px", sm: "40px" },
                    height: { xs: "28px", sm: "40px" },
                  },
                }}
              >
                <StepLabel {...labelProps}>{}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
        {activeStep === steps.length ? (
          <React.Fragment>
            <Typography className="mt-[16px] mb-[8px]">
              همه مراحل با موفقیت طی شد.
            </Typography>
            <Box
              style={{
                display: "flex",
                flexDirection: "row",
                paddingTop: "16px",
              }}
            >
              <Box style={{ flex: "1 1 auto" }} />
              <Link to="/profile-company">بازگشت به پروفایل</Link>
            </Box>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <div style={{ display: activeStep === 0 ? "block" : "none" }}>
              <Step1 handleNext={handleNext} />
            </div>
            <div style={{ display: activeStep === 1 ? "block" : "none" }}>
              <Step2 handleNext={handleNext} />
            </div>
            <div style={{ display: activeStep === 2 ? "block" : "none" }}>
              <Step3 handleNext={handleNext} />
            </div>
            <Box
              style={{
                display: "flex",
                flexDirection: "row",
                paddingTop: "16px",
              }}
            >
              <Button
                color="inherit"
                disabled={activeStep === 0}
                onClick={handleBack}
                style={{ marginRight: "8px" }}
              >
                قبلی
              </Button>
              <Box style={{ flex: "1 1 auto" }} />
              {isStepOptional(activeStep) && (
                <Button
                  color="inherit"
                  onClick={handleSkip}
                  style={{ marginRight: "8px" }}
                >
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
                {loadingReq ? (
                  <i
                    style={{ fontSize: "24.5px" }}
                    className="fa fa-spinner fa-spin"
                    aria-hidden="true"
                  ></i>
                ) : activeStep === steps.length - 1 ? (
                  "پایان"
                ) : (
                  "بعدی"
                )}
              </Button>
            </Box>
          </React.Fragment>
        )}
      </Box>
    </Box>
  );
};

export default NewPosts;
