import { Avatar, Typography } from "@mui/material";

const SimilarPost = () => {
  return (
    <div
      style={{
        background: "lightblue",
        margin: 10,
        borderRadius: 8,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingBlock: 30,
        justifyContent: "space-evenly",
      }}
    >
      <Avatar style={{ width: 90, height: 90 }} />
      <Typography style={{ fontSize: 14, marginTop: 15 }}>
        شرکت مستر بلیط
      </Typography>
      <Typography
        className="text-xs"
        style={{
          fontWeight: "bold",
          marginTop: 15,
          textAlign: "center",
          fontSize: 14,
        }}
      >
        فرانت اند دولوپر ری‌اکت
      </Typography>
    </div>
  );
};
export default SimilarPost;
