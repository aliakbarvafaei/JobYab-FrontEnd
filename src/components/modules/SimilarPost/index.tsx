import { Typography } from "@mui/material";
import { PostType } from "../../../constants/types";
import { useHistory } from "react-router-dom";
import { API_URL } from "../../../config";
// import DefaultPicture from "../../assets/images/default.png";

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
      <img
        style={{ width: 90, height: 90, borderRadius: "50%" }}
        src={
          data?.user.logo === null
          // todo....
            ? '../../assets/images/default.png'
            : API_URL.split("api")[0] + (data?.user.logo as string)
        }
        alt=""
      />
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
