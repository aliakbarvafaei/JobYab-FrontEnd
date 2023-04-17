import { Box } from "@mui/material";
import React, { useEffect } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useForm, SubmitHandler } from "react-hook-form";
import { object, string, TypeOf } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const userRegisterSchema = object({
  email: string().nonempty("ایمیل اجباری است").email("ایمیل نادرست است"),
  phone: string()
    .nonempty("موبایل اجباری است")
    .min(11, "موبایل باید 11 رقم باشد")
    .max(11, "موبایل باید 11 رقم باشد"),
  code: string().max(10, "کد ملی باید 10 رقم باشد"),
  name: string().nonempty("نام و نام‌خانوادگی اجباری است"),
  address: string(),
});
type userRegisterInput = TypeOf<typeof userRegisterSchema>;

const Information: React.FC<{ user: any }> = ({ user }) => {
  const userRegister = useForm<userRegisterInput>({
    resolver: zodResolver(userRegisterSchema),
  });

  const onSubmitHandlerUserRegiter: SubmitHandler<userRegisterInput> = (
    values
  ) => {
    console.log(values);
    // userRegister.reset();
  };

  useEffect(() => {
    userRegister.setValue("email", user.data.username);
    userRegister.setValue("address", user.address === null ? "" : user.address);
    userRegister.setValue(
      "code",
      user.national_code === null ? "" : user.national_code
    );
    userRegister.setValue("name", user.full_name);
    userRegister.setValue("phone", user.phone_number);
  }, [user]);

  return (
    <Box className="mdmin:mx-[30%]" sx={{ fontFamily: "IRANSans" }}>
      <h1 className="text-[20px]">پروفایل</h1>
      <Box
        sx={{
          marginTop: "10px",
          fontSize: "1rem",
          backgroundColor: "white",
          padding: "15px",
          paddingTop: "0px !important",
          borderRadius: "10px",
        }}
      >
        <Box
          component="form"
          onSubmit={userRegister.handleSubmit(onSubmitHandlerUserRegiter)}
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
            fullWidth
            defaultValue={"علی اکبر وفایی"}
            id="name"
            label="نام و نام‌خانوادگی"
            error={!!userRegister.formState.errors["name"]}
            helperText={
              userRegister.formState.errors["name"]
                ? userRegister.formState.errors["name"].message
                : ""
            }
            {...userRegister.register("name")}
            sx={{
              "& label": {
                left: "unset",
                right: "1.75rem",
                transformOrigin: "right",
                fontSize: "1rem",
              },
              "& legend": {
                textAlign: "right",
                fontSize: "0.8rem",
              },
            }}
          />

          <TextField
            margin="normal"
            required
            fullWidth
            defaultValue={"09123456789"}
            type={"number"}
            id="phone"
            label="موبایل"
            error={!!userRegister.formState.errors["phone"]}
            helperText={
              userRegister.formState.errors["phone"]
                ? userRegister.formState.errors["phone"].message
                : ""
            }
            {...userRegister.register("phone")}
            sx={{
              "& label": {
                left: "unset",
                right: "1.75rem",
                transformOrigin: "right",
                fontSize: "1rem",
              },
              "& legend": {
                textAlign: "right",
                fontSize: "0.8rem",
              },
            }}
          />

          <TextField
            margin="normal"
            required
            fullWidth
            defaultValue={"ali@gmail.com"}
            id="email"
            label="ایمیل"
            error={!!userRegister.formState.errors["email"]}
            helperText={
              userRegister.formState.errors["email"]
                ? userRegister.formState.errors["email"].message
                : ""
            }
            {...userRegister.register("email")}
            sx={{
              "& label": {
                left: "unset",
                right: "1.75rem",
                transformOrigin: "right",
                fontSize: "1rem",
              },
              "& legend": {
                textAlign: "right",
                fontSize: "0.8rem",
              },
            }}
          />

          <TextField
            margin="normal"
            fullWidth
            type={"number"}
            id="code"
            label="کد ملی (اختیاری)"
            error={!!userRegister.formState.errors["code"]}
            helperText={
              userRegister.formState.errors["code"]
                ? userRegister.formState.errors["code"].message
                : ""
            }
            {...userRegister.register("code")}
            sx={{
              "& label": {
                left: "unset",
                right: "1.75rem",
                transformOrigin: "right",
                fontSize: "1rem",
              },
              "& legend": {
                textAlign: "right",
                fontSize: "0.8rem",
              },
            }}
          />

          <TextField
            margin="normal"
            fullWidth
            type={"text"}
            id="address"
            label="آدرس (اختیاری)"
            error={!!userRegister.formState.errors["address"]}
            helperText={
              userRegister.formState.errors["address"]
                ? userRegister.formState.errors["address"].message
                : ""
            }
            {...userRegister.register("address")}
            sx={{
              "& label": {
                left: "unset",
                right: "1.75rem",
                transformOrigin: "right",
                fontSize: "1rem",
              },
              "& legend": {
                textAlign: "right",
                fontSize: "0.8rem",
              },
            }}
          />

          <Button type="submit" fullWidth variant="contained" sx={{ mt: 1 }}>
            ویرایش
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Information;
