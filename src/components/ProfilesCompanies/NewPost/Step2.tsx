import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { number, object, TypeOf } from "zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import SingleDropdownWithSearch from "../../SingleDropdownWithSearch";
import { Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import {
  getCities,
  getJobTypes,
  getSkills,
  getStates,
} from "../../../services/api";

const step2Schema = object({
  province: number({ required_error: "استان اجباری است" }),
  city: number({ required_error: "شهر اجباری است" }),
  jobCategory: number({ required_error: "دسته‌بندی شغلی اجباری است" }),
  technology: number({ required_error: "مهارت‌ها اجباری است" }),
});

type step2Input = TypeOf<typeof step2Schema>;

const Step2: React.FC<{ handleNext: (values: any) => void }> = ({
  handleNext,
}) => {
  const [technology, setTechnology] = useState<Array<number>>([]);

  const [jobType, setJobType] = useState<Array<{ id: number; title: string }>>(
    []
  );
  const [skill, setSkill] = useState<Array<{ id: number; title: string }>>([]);
  const [state, setState] = useState<Array<{ id: number; title: string }>>([]);
  const [city, setCity] = useState<Array<{ id: number; title: string }>>([]);

  useEffect(() => {
    getSkills()
      .then((response) => {
        setSkill(response.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
    getJobTypes()
      .then((response) => {
        setJobType(response.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
    getStates()
      .then((response) => {
        setState(response.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const find = (
    store: Array<{ id: number; title: string }>,
    value: number
  ): string => {
    for (let i = 0; i < store.length; i++) {
      if (store[i].id === value) return store[i].title;
    }
    return "";
  };
  const step2 = useForm<step2Input>({
    resolver: zodResolver(step2Schema),
  });
  const onSubmitHandlerStep2: SubmitHandler<step2Input> = (values) => {
    console.log({
      ...values,
      technology: technology,
    });
    handleNext({
      ...values,
      technology: technology,
    });
  };

  useEffect(() => {
    if (technology.length === 0) step2.setValue("technology", parseInt(""));
    else
      step2.setValue("technology", technology[technology.length - 1] as number);
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
          options={jobType.map((item: any) => {
            return { label: item.title, value: item.id };
          })}
          defaultValue={
            step2.getValues("jobCategory") === undefined
              ? undefined
              : {
                  label: find(jobType, step2.getValues("jobCategory")),
                  value: step2.getValues("jobCategory"),
                }
          }
          onChange={(e) => {
            step2.setValue("jobCategory", e?.value as number);
            step2.clearErrors("jobCategory");
          }}
          placeholder="دسته‌بندی شغلی"
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
        }}
      >
        <SingleDropdownWithSearch
          {...step2.register("technology")}
          isError={!!step2.formState.errors["technology"]}
          errorMessage={
            !!step2.formState.errors["technology"] ? "مهارت‌ها اجباری است" : ""
          }
          options={skill.map((item: any) => {
            return { label: item.title, value: item.id };
          })}
          defaultValue={
            technology.length === 0
              ? {
                  value: "",
                  label: "",
                }
              : {
                  label: find(skill, technology[technology.length - 1]),
                  value: technology[technology.length - 1],
                }
          }
          onChange={(e) => {
            setTechnology((old) => {
              if (old.indexOf(e?.value as number) < 0)
                return [...old, e?.value as number];
              else return old;
            });

            step2.setValue("technology", e?.value as number);
            step2.clearErrors("technology");
          }}
          placeholder="مهارت ها"
        />
        <Typography component={"div"} sx={{ paddingTop: "10px" }}>
          {technology.map((item) => {
            return (
              <Typography
                component={"span"}
                sx={{
                  backgroundColor: "var(--primary)",
                  color: "white",
                  borderRadius: "4px",
                  fontSize: "10px",
                  padding: "1%",
                  margin: "2px",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                {find(skill,item)}
                <CloseIcon
                  sx={{ cursor: "pointer",fontSize:"14px" }}
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
          options={state.map((item: any) => {
            return { label: item.title, value: item.id };
          })}
          defaultValue={
            step2.getValues("province") === undefined
              ? undefined
              : {
                  label: find(state, step2.getValues("province")),
                  value: step2.getValues("province"),
                }
          }
          onChange={(e) => {
            step2.setValue("province", e?.value as number);
            getCities(e?.value as number)
              .then((response) => {
                setCity(response.data.data);
              })
              .catch((err) => {
                console.log(err);
              });
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
          options={city.map((item: any) => {
            return { label: item.title, value: item.id };
          })}
          defaultValue={
            step2.getValues("city") === undefined
              ? undefined
              : {
                  label: find(city, step2.getValues("city")),
                  value: step2.getValues("city"),
                }
          }
          onChange={(e) => {
            step2.setValue("city", e?.value as number);
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
