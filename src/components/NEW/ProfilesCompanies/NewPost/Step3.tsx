import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { object, string, TypeOf } from "zod";
import TextField from "@mui/material/TextField";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const step3Schema = object({
  bio: string().nonempty("توضیحات آگهی اجباری است"),
});

type step3Input = TypeOf<typeof step3Schema>;

const Step3: React.FC<{ handleNext: () => void }> = ({ handleNext }) => {
  const step3 = useForm<step3Input>({
    resolver: zodResolver(step3Schema),
  });

  const onSubmitHandlerStep3: SubmitHandler<step3Input> = (values) => {
    console.log(values);
    handleNext();
  };

  return (
    <Box
      component="form"
      onSubmit={step3.handleSubmit(onSubmitHandlerStep3)}
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
        fullWidth
        type={"textArea"}
        id="bio"
        label="توضیحات آگهی"
        multiline
        error={!!step3.formState.errors["bio"]}
        helperText={
          step3.formState.errors["bio"]
            ? step3.formState.errors["bio"].message
            : ""
        }
        {...step3.register("bio")}
        inputProps={{
          style: {
            height: "200px",
          },
        }}
        sx={{
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

      <Button id="step3" type="submit" sx={{ display: "none" }} />
    </Box>
  );
};

export default Step3;
