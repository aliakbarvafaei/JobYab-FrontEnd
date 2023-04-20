import { Button, InputBase, Typography } from "@mui/material";
import { UserType } from "../../constants/types";
import { useState } from "react";
import { eachToast, statesRedux } from "../../ts/interfaces";
import { useSelector } from "react-redux";
import { useToast } from "../../contexts/ToastState";
import { addItemOnce } from "../../ts/functions";
import { useHistory } from "react-router-dom";

interface SendResumeSectionProps {
  data?: UserType;
  postId?: number;
}
const SendResumeSection = ({ data, postId }: SendResumeSectionProps) => {
  const [innerFile, setFile] = useState<File | undefined>();
  const { token } = useSelector((state: statesRedux) => state.userAuth);
  const { setToastState } = useToast();
  const history = useHistory();
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
        // opacity: token ? 1 : 0.2,
      }}
    >
      <div
        style={{
          position: "absolute",
          background: "#d9dddc",
          opacity: 0.7,
          width: "100%",
          height: "100%",
          right: 0,
          borderRadius: 8,
          zIndex: 9999,
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "35%",
          zIndex: 99999,
          textAlign: "center",
        }}
      >
        {/* <Typography
          style={{
            textAlign: "center",
            fontSize: 12,
            width: 250,
            marginBottom: 10,
          }}
        >
          کاربر گرامی برای ارسال رزومه برای آگهی مربوطه، باید با استفاده از دکمه
          زیر وارد شوید.
        </Typography> */}
        <Button
          style={{ border: "1px solid #1976D2" }}
          onClick={() => {
            history.push("/login");
          }}
        >
          ابتدا باید شوید
        </Button>
      </div>
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
          //@ts-ignore
          data.append("resume", innerFile);
          data.append("post", postId?.toString() ?? "");
          fetch("http://localhost:8000/api/v1/applicant/requests/", {
            method: "POST",
            body: data,
            headers: {
              //@ts-ignore
              Authorization: `Token ${token}`,
            },
          }).then((res) => {
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
