import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { Pagination, PaginationItem, PaginationProps } from "@mui/material";

const CustomPagination = ({ ...props }: PaginationProps) => {
  return (
    <Pagination
      color="primary"
      renderItem={(item) => (
        <PaginationItem
        style={{borderRadius:'50%'}}
          slots={{ previous: ChevronRightIcon, next: ChevronLeftIcon }}
          {...item}
        />
      )}
      {...props}
    />
  );
};
export default CustomPagination;
