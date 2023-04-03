import { IconButton, Typography } from "@mui/material";

interface DetailItemProps {
  title: string;
  value: string;
  logo: React.ReactNode;
}
const DetailItem = ({ title, value, logo }: DetailItemProps) => {
  return (
    <>
      <IconButton disabled style={{ marginLeft: 5 }}>
        {logo}
      </IconButton>
      <Typography style={{ fontSize: 13, fontWeight: "bold" }}>
        {`${title}: `}
      </Typography>
      <Typography style={{ fontSize: 14 }}>{value}</Typography>
    </>
  );
};
export default DetailItem;
