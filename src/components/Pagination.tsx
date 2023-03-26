import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { Pagination, PaginationItem } from "@mui/material";

const CustomPagination = () => {
  return (
    <Pagination
      count={10}
      color="primary"
      renderItem={(item) => (
        <PaginationItem
          slots={{ previous: ChevronRightIcon, next: ChevronLeftIcon }}
          {...item}
        />
      )}
    />
  );
};
export default CustomPagination;
