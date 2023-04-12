import HeaderNewShort from "../components/Header/HeaderNewShort";
import TitlePages from "../components/TitlePages/TitlePages";
import Footer from "../components/Footer/Footer";
import SearchBox from "../components/SearchBox";
import { Button } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
// import LocationOnIcon from "@mui/icons-material/LocationOn";
// import DehazeIcon from "@mui/icons-material/Dehaze";
import SingleDropdownWithSearch from "../components/SingleDropdownWithSearch";
import Post from "../components/Post";
import CustomPagination from "../components/Pagination";
import { useHistory } from "react-router-dom";
import MobileMenu from "../components/MobileMenu/MobileMenu";
import { statesRedux } from "../ts/interfaces";
import { useSelector } from "react-redux";
import Header from "../components/NEW/ProfilesCompanies/Header";

const SearchPage: React.FC = () => {
  const history = useHistory();
  const { role } = useSelector((state: statesRedux) => state.userAuth);
  
  return (
    <div>
      <MobileMenu />
      {role && role === "company" ? <Header /> : <HeaderNewShort />}
      <TitlePages title="جستجو" />
      <div style={{ marginInline: 80 }}>
        <div
          style={{
            marginTop: 50,
            background: "lightblue",
            padding: 20,
            borderRadius: 16,
            display: "flex",
            gap: 20,
          }}
        >
          <SearchBox
            icon={<SearchIcon />}
            placeholder="عنوان شغلی، مهارت و..."
          />
          <SingleDropdownWithSearch
            onChange={() => {}}
            placeholder="استان مدنظر خود را انتخاب کنید"
          />
          <SingleDropdownWithSearch
            onChange={() => {}}
            placeholder="دسته بندی مدنظر خود را انتخاب کنید"
          />
          <Button
            style={{
              background: "orange",
              paddingBlock: 10,
              paddingInline: 30,
              flexGrow: 1,
              fontSize: 18,
              fontWeight: "bold",
              color: "black ",
            }}
          >
            جستجو
          </Button>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          height: 500,
          marginInline: 80,
          justifyContent: "center",
        }}
      >
        <div
          style={{
            width: "80%",
            padding: 10,
            gap: 20,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Post
            onClick={() => {
              history.push("/postPage");
            }}
          />
          <Post
            onClick={() => {
              history.push("/postPage");
            }}
          />
          <Post
            onClick={() => {
              history.push("/postPage");
            }}
          />
          <CustomPagination />
        </div>
      </div>
      <div style={{ marginTop: 400 }}>
        <Footer />
      </div>
    </div>
  );
};

export default SearchPage;
