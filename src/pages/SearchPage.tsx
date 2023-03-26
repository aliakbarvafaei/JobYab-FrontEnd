import React, { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import Card from "../components/Ads/Card";
import HeaderNewShort from "../components/HeaderNew/HeaderNewShort";
import Box from "../assets/images/box.png";
import TitlePages from "../components/TitlePages/TitlePages";
import { getAdsWithPage } from "../services/api";
import { ads, filtersInterface } from "../ts/interfaces";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Footer from "../components/Footer/Footer";
import MobileMenu from "../components/MobileMenu/MobileMenu";
import SearchBox from "../components/SearchBox";
import { Button, Grid } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import DehazeIcon from "@mui/icons-material/Dehaze";
import SingleDropdownWithSearch from "../components/SingleDropdownWithSearch";

const filtersOption = [
  { title: "دسته‌بندی", content: ["ویلا", "آپارتمان", "باغ", "آپارتمان/برج"] },
  { title: "نوع", content: ["مسکونی", "تجاری"] },
  {
    title: "منطقه",
    content: [
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "10",
      "11",
      "12",
      "13",
      "14",
      "15",
      "16",
      "17",
      "18",
      "19",
      "20",
      "21",
      "22",
    ],
  },
  { title: "اتاق", content: ["0", "1", "2", "3", "4", "5", "6", "7"] },
];
// const top100Films = [
//   { title: 'The Shawshank Redemption'},
//   { title: 'The Godfather'},
//   { title: 'The Godfather: Part II'},
//   { title: 'The Dark Knight'},
//   { title: '12 Angry Men'},
//   { title: "Schindler's List"},
//   { title: 'Pulp Fiction'}];
const n = 6;

const SearchPage: React.FC = () => {
  const history = useHistory();

  const [counterPage, setcounterPage] = useState(1);
  const [filterAds, setfilterAds] = useState<Array<ads>>([]);
  const [priceRange, setPriceRange] = useState({ from: 0, to: 50000 });
  const searchRef = useRef(null);
  const [searchInput, setSearchInput] = useState(() => {
    if (history.location.search.split("=")[1]) {
      return history.location.search.split("=")[1];
    } else return "";
  });
  const [loading, setLoading] = useState(false);

  const [category, setCategory] = useState([]);
  const [type, setType] = useState([]);
  const [roomsNumber, setRoomsNumber] = useState([]);
  const [regionNumber, setRegionNumber] = useState([]);
  const themeClass = "bg-white";
  const themeBorder = "border-darkModeGray";

  useEffect(() => {
    const filters: filtersInterface = {
      searchInput: searchInput === "" ? "" : searchInput,
      category: category.length === 0 ? filtersOption[0].content : category,
      type: type.length === 0 ? filtersOption[1].content : type,
      region:
        regionNumber.length === 0 ? filtersOption[2].content : regionNumber,
      room: roomsNumber.length === 0 ? filtersOption[3].content : roomsNumber,
      priceRange: {
        from: priceRange.from * 1000000,
        to: priceRange.to * 1000000,
      },
    };
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    setLoading(true);
    getAdsWithPage(counterPage, n, filters)
      .then((response) => {
        setfilterAds(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [
    counterPage,
    searchInput,
    regionNumber,
    roomsNumber,
    type,
    category,
    priceRange,
  ]);
  return (
    <div>
      {/* <MobileMenu /> */}
      <HeaderNewShort />
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
        }}
      >
        <div style={{ background: "gray", width: "30%" }}>
          <p>Filter Section</p>
        </div>
        <div style={{ width: "70%" }}></div>
      </div>
      <div style={{ marginTop: 300 }}>
        <Footer />
      </div>
    </div>
  );
};

export default SearchPage;
