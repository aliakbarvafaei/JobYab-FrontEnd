import { Button, InputBase, Typography } from "@mui/material";
import { UserType } from "../../constants/types";
import { useState } from "react";
import { eachToast, statesRedux } from "../../ts/interfaces";
import { useSelector } from "react-redux";
import { useToast } from "../../contexts/ToastState";
import { addItemOnce } from "../../ts/functions";

interface SendResumeSectionProps {
  data?: UserType;
  postId?: number;
}
const SendResumeSection = ({ data, postId }: SendResumeSectionProps) => {
  const [innerFile, setFile] = useState<File | undefined>();
  const { token } = useSelector((state: statesRedux) => state.userAuth);
  const { setToastState } = useToast();

  return (
    <div
      className="lgmin:w-3/12 md:w-11/12 "
      style={{
        background: "#F2F3F4",
        marginTop: 40,
        borderRadius: 8,
        flexShrink: 0,
        paddingInline: 20,
        maxHeight: 280,
        position: "relative",
        boxShadow: "0 0 6px rgba(0, 0, 0, 0.2)",
      }}
    >
      <InputBase
        value={data?.full_name}
        fullWidth
        style={{
          border: "2px solid gray",
          borderRadius: 8,
          textAlign: "center",
          marginTop: 25,
        }}
        disabled
        classes={{ disabled: "text-center" }}
      />
      <InputBase
        value={data?.phone_number}
        fullWidth
        style={{
          border: "2px solid gray",
          borderRadius: 8,
          textAlign: "center",
          marginTop: 25,
        }}
        disabled
        classes={{ disabled: "text-center" }}
      />
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: 25,
        }}
      >
        <Typography style={{ fontSize: 14, color: "gray" }}>
          آپلود رزومه:
        </Typography>
        {innerFile && <div>...{innerFile?.name.slice(0, 5)}</div>}
        <Button variant="contained" component="label">
          آپلود
          <input
            hidden
            accept="application/pdf, application/vnd.ms-excel"
            multiple
            type="file"
            onChange={(event) => {
              if (!event.target?.files?.[0]) {
                return;
              }
              // setInnerImage(
              //   URL.createObjectURL(event.currentTarget?.files?.[0])
              // );
              setFile(event.target.files[0]);
            }}
          />
        </Button>
      </div>
      <Button
        fullWidth
        variant="outlined"
        style={{ marginTop: 25, marginBottom: 10 }}
        onClick={() => {
          const data = new FormData();
          console.log(innerFile);
          //@ts-ignore
          data.append("resume", innerFile);
          data.append("post", postId?.toString() ?? "");
          console.log(data);
          fetch("http://localhost:8000/api/v1/applicant/requests/", {
            method: "POST",
            body: data,
            headers: {
              //@ts-ignore
              Authorization: `Token ${token}`,
            },
          }).then((res) => {
            console.log(res.status, "status");
            if (res.status === 201) {
              setToastState((old: Array<eachToast>) =>
                addItemOnce(old.slice(), {
                  title: "1",
                  description: `رزومه شما با موفقیت ارسال شد`,
                  key: Math.random(),
                })
              );
            } else if (res.status === 400) {
              setToastState((old: Array<eachToast>) =>
                addItemOnce(old.slice(), {
                  title: "2",
                  description: "لطفا رزومه خود را آپلود نمایید",
                  key: Math.random(),
                })
              );
            }
          });
        }}
      >
        ارسال رزومه
      </Button>
      <Typography
        style={{
          fontSize: 12,
          textAlign: "center",
        }}
      >
        فرصت ارسال رزومه:{" "}
        <span>
          تا
          <span style={{ color: "blue" }} children={` ${28} `} />
          روز دیگر
        </span>
      </Typography>
    </div>
  );
};
export default SendResumeSection;
