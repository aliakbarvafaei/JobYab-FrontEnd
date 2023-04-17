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
import { useEffect, useState } from "react";
import { getJobTypes, getPrivatePosts, getStates } from "../services/api";
import { GeneralType, StateType } from "../constants/types";

const SearchPage: React.FC = () => {
  const history = useHistory();
  const { role } = useSelector((state: statesRedux) => state.userAuth);
  const [allPosts, setAllPosts] = useState([]);
  const [states, setStates] = useState<StateType[]>([]);
  const [jobTypes, setJobTypes] = useState<GeneralType[]>([]);

  useEffect(() => {
    getPrivatePosts().then((data) => {
      setAllPosts(data.data.data);
    });
  }, []);
  useEffect(() => {
    getStates().then((data) => {
      setStates(data.data.data);
    });
  }, []);
  useEffect(() => {
    getJobTypes().then((data) => {
      setJobTypes(data.data.data);
    });
  }, []);
  return (
    <div>
      <MobileMenu />
      {role && role === "company" ? <Header /> : <HeaderNewShort />}
      <TitlePages title="جستجو" />
      <div className="md:mr-10 md:ml-10 xl:ml-3 xl:mr-3 xlmin:mr-20 xlmin:ml-20">
        <div
          className="flex lg:flex-col lgmin:flex-row"
          style={{
            marginTop: 50,
            background: "rgba(25, 118, 210, 0.3)",
            padding: 20,
            borderRadius: 16,
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
            options={states.map((item) => ({
              label: item.title,
              value: item.id,
            }))}
          />
          <SingleDropdownWithSearch
            onChange={() => {}}
            placeholder="دسته بندی مدنظر خود را انتخاب کنید"
            options={jobTypes.map((item) => ({
              label: item.title,
              value: item.id,
            }))}
          />
          <Button
            className="bg-[#ffe11b]"
            style={{
              background: "#ffe11b",
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
        className="md:mr-6 md:ml-6 xl:ml-4 xl:mr-4 xlmin:mr-24 xlmin:ml-24"
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div
          className="xlmin:w-10/12 xl:w-full"
          style={{
            padding: 10,
            marginTop: "20px",
            gap: 20,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {allPosts?.map((postDetail) => (
            <Post
              data={postDetail}
              onClick={(id) => {
                history.push(`/postPage/${id}`);
              }}
            />
          ))}
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
