import HeaderNewShort from "../components/Header/HeaderNewShort";
import TitlePages from "../components/TitlePages/TitlePages";
import Footer from "../components/Footer/Footer";
import SearchBox from "../components/SearchBox";
import { Button, CircularProgress } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import SingleDropdownWithSearch from "../components/SingleDropdownWithSearch";
import Post from "../components/Post";
import CustomPagination from "../components/Pagination";
import { useHistory } from "react-router-dom";
import MobileMenu from "../components/MobileMenu/MobileMenu";
import { statesRedux } from "../ts/interfaces";
import { useSelector } from "react-redux";
import Header from "../components/ProfilesCompanies/Header";
import { useEffect, useState } from "react";
import { getJobTypes, getPrivatePosts, getStates } from "../services/api";
import { GeneralType, StateType } from "../constants/types";
import { parseURLParams } from "../services/utils/ParseURL";

const SearchPage: React.FC = () => {
  const history = useHistory();
  const { role, token } = useSelector((state: statesRedux) => state.userAuth);
  const [allPosts, setAllPosts] = useState([]);
  const [states, setStates] = useState<StateType[]>([]);
  const [jobTypes, setJobTypes] = useState<GeneralType[]>([]);

  const [category, setCategory] = useState<string>("");
  const [province, setProvince] = useState<string>("");
  const [counterPage, setcounterPage] = useState(1);
  const [nTotalPosts, setNTotalPosts] = useState(0);
  const [loading1, setLoading1] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [loading3, setLoading3] = useState(false);
  const [loading4, setLoading4] = useState(false);
  const [searchInput, setSearchInput] = useState(() => {
    const parsedValue = parseURLParams(history.location.search);
    //@ts-ignore
    if (parsedValue && parsedValue.searchText?.[0]) {
      //@ts-ignore
      return parsedValue.searchText[0];
    } else return "";
  });
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    getPrivatePosts(
      1,
      200,
      searchInput,
      category === "همه دسته‌بندی‌ها" ? "" : category,
      province === "تمام استان‌ها" ? "" : province,
      token
    ).then((data) => {
      setNTotalPosts(data.data.length);
      setLoading1(true);
    });
    getPrivatePosts(
      counterPage,
      6,
      searchInput,
      category === "همه دسته‌بندی‌ها" ? "" : category,
      province === "تمام استان‌ها" ? "" : province,
      token
    ).then((response) => {
      setAllPosts(response.data);
      setLoading2(true);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    getStates().then((data) => {
      setStates([
        { id: -1, title: "تمام استان‌ها", order: 5 },
        ...data.data.data,
      ]);
      setLoading3(true);
    });
  }, []);
  useEffect(() => {
    getJobTypes().then((data) => {
      setJobTypes([{ id: -1, title: "همه دسته‌بندی‌ها" }, ...data.data.data]);
    });
    setLoading4(true);
  }, []);
  return (
    <div>
      <MobileMenu />
      {role && role === "company" ? <Header /> : <HeaderNewShort />}
      <TitlePages title="جستجو" />
      {loading1 && loading2 && loading3 && loading4 ? (
        <>
          <div className="md:mr-10 md:ml-10 xl:ml-3 xl:mr-3 xlmin:mr-20 xlmin:ml-20">
            <div
              className="flex lg:flex-col lgmin:flex-row lg:min-h-[90px] lgmin:h-[90px]"
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
                value={searchInput}
                onChange={(event) => {
                  setSearchInput(event.target.value);
                }}
              />
              <SingleDropdownWithSearch
                placeholder="استان را انتخاب کنید"
                options={states.map((item) => ({
                  label: item.title,
                  value: item.id,
                }))}
                //@ts-ignore
                value={states.find((item) => item.id === province)}
                onChange={(event) => {
                  setProvince(event?.label.toString() ?? "");
                }}
                scrollColor="rgba(25, 118, 210, 0.3)"
              />
              <SingleDropdownWithSearch
                placeholder="دسته بندی را انتخاب کنید"
                options={jobTypes.map((item) => ({
                  label: item.title,
                  value: item.id,
                }))}
                //@ts-ignore
                value={jobTypes.find((item) => item.id === category)}
                onChange={(event) => {
                  setCategory(event?.label.toString() ?? "");
                }}
                scrollColor="rgba(25, 118, 210, 0.3)"
              />
              <Button  
                className="title"
                style={{
                  background: "#ffe11b",
                  paddingBlock: 10,
                  paddingInline: 30,
                  flexGrow: 1,
                  fontSize: 18,
                  fontWeight: "bold",
                  color: "black ",
                }}
                onClick={() => {
                  history.replace(
                    searchInput
                      ? `/search?searchText=${searchInput}`
                      : `/search/`
                  );
                  getPrivatePosts(
                    1,
                    200,
                    searchInput,
                    category === "همه دسته‌بندی‌ها" ? "" : category,
                    province === "تمام استان‌ها" ? "" : province,
                    token
                  ).then((data) => {
                    setNTotalPosts(data.data.length);
                  });
                  getPrivatePosts(
                    1,
                    6,
                    searchInput,
                    category === "همه دسته‌بندی‌ها" ? "" : category,
                    province === "تمام استان‌ها" ? "" : province,
                    token
                  )
                    .then((response) => {
                      setAllPosts(response.data);
                    })
                    .catch((err) => {
                      console.error(err);
                    });
                  setcounterPage(1);
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
              {allPosts?.map((postDetail: any) => (
                <Post
                  data={postDetail}
                  onClick={(id) => {
                    window.location.href = `/postPage/${id}`;
                  }}
                  updateData={() => {
                    getPrivatePosts(
                      1,
                      200,
                      searchInput,
                      category === "همه دسته‌بندی‌ها" ? "" : category,
                      province === "تمام استان‌ها" ? "" : province,
                      token
                    ).then((data) => {
                      setNTotalPosts(data.data.length);
                    });
                    getPrivatePosts(
                      counterPage,
                      6,
                      searchInput,
                      category === "همه دسته‌بندی‌ها" ? "" : category,
                      province === "تمام استان‌ها" ? "" : province,
                      token
                    ).then((response) => {
                      setAllPosts(response.data);
                    });
                  }}
                />
              ))}
              {!!allPosts.length && (
                <CustomPagination
                  count={
                    nTotalPosts % 6 === 0
                      ? nTotalPosts / 6
                      : Math.floor(nTotalPosts / 6) + 1
                  }
                  page={counterPage}
                  onChange={(_, value) => {
                    setcounterPage(value);
                    getPrivatePosts(
                      1,
                      200,
                      searchInput,
                      category === "همه دسته‌بندی‌ها" ? "" : category,
                      province === "تمام استان‌ها" ? "" : province,
                      token
                    ).then((data) => {
                      setNTotalPosts(data.data.length);
                    });
                    getPrivatePosts(
                      value,
                      6,
                      searchInput,
                      category === "همه دسته‌بندی‌ها" ? "" : category,
                      province === "تمام استان‌ها" ? "" : province,
                      token
                    )
                      .then((response) => {
                        setAllPosts(response.data);
                      })
                      .catch((err) => {
                        console.error(err);
                      });
                  }}
                />
              )}
            </div>
          </div>
        </>
      ) : (
        <div className="flex justify-center mt-20">
          <CircularProgress />
        </div>
      )}
      <div style={{ marginTop: 40 }}>
        <Footer />
      </div>
    </div>
  );
};

export default SearchPage;
