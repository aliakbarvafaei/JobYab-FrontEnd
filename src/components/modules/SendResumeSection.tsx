import { Button, InputBase, Typography } from "@mui/material";

const SendResumeSection = () => {
  return (
    <div
      className="lgmin:w-3/12 md:w-11/12 "
      style={{
        background: "#F2F3F4",
        marginTop: 40,
        borderRadius: 8,
        flexShrink: 0,
        paddingInline: 20,
        maxHeight: 350,
        position: "relative",
        boxShadow: "0 0 6px rgba(0, 0, 0, 0.2)",
      }}
    >
      <InputBase
        value="سید عرفان نوربخش "
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
        value="ErfanNourbakhsh@gmail.com"
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
        value="09134821558"
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
        <Button variant="contained" component="label">
          آپلود
          <input hidden accept="image/*" multiple type="file" />
        </Button>
      </div>
      <Button
        fullWidth
        variant="outlined"
        style={{ marginTop: 25, marginBottom: 10 }}
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
