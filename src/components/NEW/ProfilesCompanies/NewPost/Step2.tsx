import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { object, string, TypeOf } from "zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import SingleDropdownWithSearch from "../../../SingleDropdownWithSearch";

const step2Schema = object({
  province: string().nonempty("استان اجباری است"),
  city: string().nonempty("شهر اجباری است"),
  jobCategory: string().nonempty("دسته‌بندی شغلی اجباری است"),
  technology: string().nonempty("تکنولوژی اجباری است"),
});

type step2Input = TypeOf<typeof step2Schema>;

const Step2: React.FC<{ handleNext: () => void }> = ({ handleNext }) => {
  const step2 = useForm<step2Input>({
    resolver: zodResolver(step2Schema),
  });
  const onSubmitHandlerStep2: SubmitHandler<step2Input> = (values) => {
    console.log(values);
    handleNext();
  };

  return (
    <Box
      component="form"
      onSubmit={step2.handleSubmit(onSubmitHandlerStep2)}
      noValidate
      sx={{
        mt: 0.1,
        display: "flex",
        minHeight: "285px",
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
            step2.getValues("jobCategory") === undefined
              ? undefined
              : {
                  label: step2.getValues("jobCategory") as string,
                  value: step2.getValues("jobCategory") as string,
                }
          }
          onChange={(e) => {
            step2.setValue("jobCategory", e?.label as string);
            step2.clearErrors("jobCategory");
          }}
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
            step2.getValues("technology") === undefined
              ? undefined
              : {
                  label: step2.getValues("technology") as string,
                  value: step2.getValues("technology") as string,
                }
          }
          onChange={(e) => {
            step2.setValue("technology", e?.label as string);
            step2.clearErrors("technology");
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
