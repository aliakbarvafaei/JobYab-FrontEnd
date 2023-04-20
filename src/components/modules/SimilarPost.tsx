import { Avatar, Typography } from "@mui/material";
import { PostType } from "../../constants/types";
import { useHistory } from "react-router-dom";

interface SimilarPostsProps {
  data: PostType;
}
const SimilarPost = ({ data }: SimilarPostsProps) => {
  const history = useHistory();
  return (
    <div
      style={{
        border: "2px solid lightblue",
        margin: 10,
        borderRadius: 8,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingBlock: 30,
        justifyContent: "space-evenly",
        marginLeft: 5,
        cursor: "pointer",
      }}
      onClick={() => {
        history.push(`/postPage/${data.id}`);
      }}
    >
      <Avatar style={{ width: 90, height: 90 }} src={data.user.logo ?? ""} />
      <Typography style={{ fontSize: 14, marginTop: 15 }}>
        {data.user.company_persian_name}
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
        {data.title}
      </Typography>
    </div>
  );
};
export default SimilarPost;
