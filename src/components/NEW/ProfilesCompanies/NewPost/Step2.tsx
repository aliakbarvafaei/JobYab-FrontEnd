import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { object, string, TypeOf } from "zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import SingleDropdownWithSearch from "../../../SingleDropdownWithSearch";
import { Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const step2Schema = object({
  province: string().nonempty("استان اجباری است"),
  city: string().nonempty("شهر اجباری است"),
  jobCategory: string().nonempty("دسته‌بندی شغلی اجباری است"),
  technology: string().nonempty("تکنولوژی اجباری است"),
});

type step2Input = TypeOf<typeof step2Schema>;

const Step2: React.FC<{ handleNext: (values: any) => void }> = ({
  handleNext,
}) => {
  const [jobCategory, setJobCategory] = useState<Array<String>>([]);
  const [technology, setTechnology] = useState<Array<String>>([]);

  const step2 = useForm<step2Input>({
    resolver: zodResolver(step2Schema),
  });
  const onSubmitHandlerStep2: SubmitHandler<step2Input> = (values) => {
    console.log({
      ...values,
      technology: technology,
      jobCategory: jobCategory,
    });
    handleNext({
      ...values,
      technology: technology,
      jobCategory: jobCategory,
    });
  };

  useEffect(() => {
    if (jobCategory.length === 0) step2.setValue("jobCategory", "");
    else
      step2.setValue(
        "jobCategory",
        jobCategory[jobCategory.length - 1] as string
      );
  }, [jobCategory]);

  useEffect(() => {
    if (technology.length === 0) step2.setValue("technology", "");
    else
      step2.setValue("technology", technology[technology.length - 1] as string);
  }, [technology]);

  return (
    <Box
      component="form"
      onSubmit={step2.handleSubmit(onSubmitHandlerStep2)}
      noValidate
      sx={{
        mt: 0.1,
        display: "flex",
        minHeight: "285px",
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
        }}
      >
        <SingleDropdownWithSearch
          {...step2.register("jobCategory")}
          isError={!!step2.formState.errors["jobCategory"]}
          errorMessage={
            !!step2.formState.errors["jobCategory"]
              ? "دسته‌بندی شغلی اجباری است"
              : ""
          }
          options={[
            { label: "فناوری اطلاعات", value: "فناوری اطلاعات" },
            { label: "مهندسی نرم افزار", value: "مهندسی نرم افزار" },
            { label: "برنامه نویس", value: "برنامه نویس" },
          ]}
          defaultValue={
            jobCategory.length === 0
              ? {
                  value: "",
                  label: "",
                }
              : {
                  value: jobCategory[jobCategory.length - 1] as string,
                  label: jobCategory[jobCategory.length - 1] as string,
                }
          }
          onChange={(e) => {
            setJobCategory((old) => {
              if (old.indexOf(e?.label as String) < 0)
                return [...old, e?.label as String];
              else return old;
            });

            step2.setValue("jobCategory", e?.label as string);
            step2.clearErrors("jobCategory");
          }}
          placeholder="دسته بندی شغلی"
        />
        <Typography component={"div"} sx={{ paddingTop: "10px" }}>
          {jobCategory.map((item) => {
            return (
              <Typography
                component={"span"}
                sx={{
                  backgroundColor: "#555555",
                  color: "white",
                  borderRadius: "4px",
                  fontSize: "10px",
                  padding: "1%",
                  margin: "2px",
                  display: "inline-flex",
                  alignItems: "center",
                }}
              >
                {item}
                <CloseIcon
                  sx={{ cursor: "pointer" }}
                  onClick={() =>
                    setJobCategory((old) =>
                      old.filter((element) => element !== item)
                    )
                  }
                />
              </Typography>
            );
          })}
        </Typography>
      </Box>

      <Box
        sx={{
          width: "45%",
          marginTop: "16px",
          marginBottom: "8px",
          "@media (max-width: 576px)": {
            width: "100%",
          },
        }}
      >
        <SingleDropdownWithSearch
          {...step2.register("technology")}
          isError={!!step2.formState.errors["technology"]}
          errorMessage={
            !!step2.formState.errors["technology"] ? "تکتولوژی اجباری است" : ""
          }
          options={[
            { label: "React", value: "React" },
            { label: "Flutter", value: "Flutter" },
            { label: "Python", value: "Python" },
          ]}
          defaultValue={
            technology.length === 0
              ? {
                  value: "",
                  label: "",
                }
              : {
                  value: technology[technology.length - 1] as string,
                  label: technology[technology.length - 1] as string,
                }
          }
          onChange={(e) => {
            setTechnology((old) => {
              if (old.indexOf(e?.label as String) < 0)
                return [...old, e?.label as String];
              else return old;
            });

            step2.setValue("technology", e?.label as string);
            step2.clearErrors("technology");
          }}
          placeholder="تکنولوژی و برچسب"
        />
        <Typography component={"div"} sx={{ paddingTop: "10px" }}>
          {technology.map((item) => {
            return (
              <Typography
                component={"span"}
                sx={{
                  backgroundColor: "#555555",
                  color: "white",
                  borderRadius: "4px",
                  fontSize: "10px",
                  padding: "1%",
                  margin: "2px",
                  display: "inline-flex",
                  alignItems: "center",
                }}
              >
                {item}
                <CloseIcon
                  sx={{ cursor: "pointer" }}
                  onClick={() =>
                    setTechnology((old) =>
                      old.filter((element) => element !== item)
                    )
                  }
                />
              </Typography>
            );
          })}
        </Typography>
      </Box>

      <Box
        sx={{
          width: "45%",
          marginTop: "16px",
          marginBottom: "8px",
          "@media (max-width: 576px)": {
            width: "100%",
          },
        }}
      >
        <SingleDropdownWithSearch
          {...step2.register("province")}
          isError={!!step2.formState.errors["province"]}
          errorMessage={
            !!step2.formState.errors["province"] ? "استان اجباری است" : ""
          }
          options={[
            { label: "تهران", value: "تهران" },
            { label: "اصفهان", value: "اصفهان" },
            { label: "خراسان رضوی", value: "خراسان رضوی" },
          ]}
          defaultValue={
            step2.getValues("province") === undefined
              ? undefined
              : {
                  label: step2.getValues("province") as string,
                  value: step2.getValues("province") as string,
                }
          }
          onChange={(e) => {
            step2.setValue("province", e?.label as string);
            step2.clearErrors("province");
          }}
          placeholder="استان"
        />
      </Box>

      <Box
        sx={{
          width: "45%",
          marginTop: "16px",
          marginBottom: "8px",
          marginRight: "auto",
          "@media (max-width: 576px)": {
            width: "100%",
          },
        }}
      >
        <SingleDropdownWithSearch
          {...step2.register("city")}
          isError={!!step2.formState.errors["city"]}
          errorMessage={
            !!step2.formState.errors["city"] ? "شهر اجباری است" : ""
          }
          options={[
            { label: "تهران", value: "تهران" },
            { label: "اصفهان", value: "اصفهان" },
            { label: "مشهد", value: "مشهد" },
          ]}
          defaultValue={
            step2.getValues("city") === undefined
              ? undefined
              : {
                  label: step2.getValues("city") as string,
                  value: step2.getValues("city") as string,
                }
          }
          onChange={(e) => {
            step2.setValue("city", e?.label as string);
            step2.clearErrors("city");
          }}
          placeholder="شهر"
        />
      </Box>

      <Button id="step2" type="submit" sx={{ display: "none !important" }} />
    </Box>
  );
};

export default Step2;
