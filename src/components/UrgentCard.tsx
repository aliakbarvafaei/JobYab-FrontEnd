import { Paper } from "@mui/material";
import { Badge, Grid } from "@mui/material";
import ApartmentIcon from "@mui/icons-material/Apartment";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { PostType } from "../constants/types";
import DifferenceData from "../services/utils/DifferenceData";
import { useHistory } from "react-router-dom";

interface UrgentProps {
  data: PostType;
  isUrgent: boolean;
}

const UrgentCard = ({ data, isUrgent }: UrgentProps) => {
  const history = useHistory();
  return (
    <Paper
      style={{
        border: "1.5px solid gray",
        margin: 5,
        padding: 6,
        borderRadius: 8,
        width: isUrgent ? "50%" : "95%",
        cursor: "pointer",
      }}
      onClick={() => {
        history.push(`/postPage/${data.id}/`);
      }}
    >
      <Grid className="flex justify-between item-center">
        <div className="text-blue">{data.title}</div>
        {isUrgent ? (
          <Badge color="primary" badgeContent={"فوری"} className="mt-3 ml-5" />
        ) : (
          <div style={{ fontSize: 12, marginTop: 2 }}>
            {DifferenceData(data.created_date)}
          </div>
        )}
      </Grid>
      <Grid className="flex mt-3">
        <Grid className="flex ml-5">
          <ApartmentIcon />
          <p>{data.user.company_persian_name}</p>
        </Grid>
        <Grid className="flex">
          <LocationOnIcon />
          <p>{data.state.title}</p>
        </Grid>
      </Grid>
    </Paper>
  );
};
export default UrgentCard;
