import { IconButton } from "@mui/material";

interface DetailItemProps {
  title: string;
  value: string;
  logo: React.ReactNode;
}
const DetailItem = ({ title, value, logo }: DetailItemProps) => {
  return (
    <>
      <IconButton disabled style={{ marginLeft: 3 }}>
        {logo}
      </IconButton>
      <div
        className="smmin:text-[13px] sm:text-[14px]"
        style={{ fontWeight: "bold" }}
      >
        {`${title}: `}
      </div>
      <div className="smmin:text-[13px] sm:text-[14px]">{value}</div>
    </>
  );
};
export default DetailItem;
