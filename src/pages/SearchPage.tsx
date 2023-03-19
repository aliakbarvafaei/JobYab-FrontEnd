import React, { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import Card from "../components/Ads/Card";
import HeaderNewShort from "../components/HeaderNew/HeaderNewShort";
import Box from "../assets/images/box.png"
import TitlePages from "../components/TitlePages/TitlePages";
import { getAdsWithPage } from "../services/api";
import { ads, filtersInterface } from "../ts/interfaces";
import Chip from '@mui/material/Chip';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';

const filtersOption = [
  { title: "دسته‌بندی", content: ["ویلا", "آپارتمان", "باغ","آپارتمان/برج"] },
  { title: "نوع", content: ["مسکونی", "تجاری"] },
  { title: "منطقه", content: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22"] },
  { title: "اتاق", content: ["0", "1", "2", "3","4","5","6","7"]}
];
// const top100Films = [
//   { title: 'The Shawshank Redemption'},
//   { title: 'The Godfather'},
//   { title: 'The Godfather: Part II'},
//   { title: 'The Dark Knight'},
//   { title: '12 Angry Men'},
//   { title: "Schindler's List"},
//   { title: 'Pulp Fiction'}];
const n=6 ;

const SearchPage:React.FC = () => {

  const history = useHistory();

  const [counterPage, setcounterPage] = useState(1);
  const [filterAds, setfilterAds] = useState<Array<ads>>([]);
  const [priceRange, setPriceRange] = useState({ from: 0, to: 50000 });
  const searchRef = useRef(null);
  const [searchInput, setSearchInput] = useState(()=>{
  if(history.location.search.split('=')[1]){
    return history.location.search.split('=')[1]}
  else return ""
  });
  const [loading, setLoading] = useState(false);

  const [category, setCategory] = useState([]);
  const [type, setType] = useState([]);
  const [roomsNumber, setRoomsNumber] = useState([]);
  const [regionNumber, setRegionNumber] = useState([]);
  const themeClass ="bg-white";
  const themeBorder ="border-darkModeGray";

  useEffect(() => {
    const filters:filtersInterface = {
      searchInput: searchInput === "" ? "" : searchInput,
      category: category.length === 0 ? filtersOption[0].content : category,
      type: type.length === 0 ? filtersOption[1].content : type,
      region: regionNumber.length === 0 ? filtersOption[2].content : regionNumber,
      room: roomsNumber.length === 0 ? filtersOption[3].content : roomsNumber,
      priceRange: { from: priceRange.from*1000000, to: priceRange.to*1000000 },
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

  function handleChange(e : React.MouseEvent) {
    setSearchInput((e.target as HTMLInputElement).value);
    setcounterPage(1);
  }

  // function removeItemOnce(arr : any, value : any) {
  //   var index = arr.indexOf(value);
  //   if (index > -1) {
  //     arr.splice(index, 1);
  //   }
  //   return arr;
  // }
  function handleClick(value : any[], filterName : string) {
    // const target : HTMLInputElement = e.target as HTMLInputElement;
    switch (filterName) {
      case "دسته‌بندی":
        setCategory(value as any);
        setcounterPage(1);
        break;
      case "نوع":
        // (target.checked && setType((old) => [...old, target.value] as any)) ||
        //   (!target.checked &&
        //     setType((old) => removeItemOnce(old.slice(), target.value)));
        setType(value as any);
        setcounterPage(1);
        break;
      case "منطقه":
        // (target.checked && setRegionNumber((old) => [...old, target.value] as any)) ||
        //   (!target.checked &&
        //     setRegionNumber((old) => removeItemOnce(old.slice(), target.value)));
        // setcounterPage(1);
        setRegionNumber(value as any);
        setcounterPage(1);
        break;
      case "اتاق":
        // (target.checked && setRoomsNumber((old) => [...old, target.value] as any)) ||
        //   (!target.checked &&
        //     setRoomsNumber((old) => removeItemOnce(old.slice(), target.value)));
        // setcounterPage(1);
        setRoomsNumber(value as any);
        setcounterPage(1);
        break;
      default:
        break;
    }
  }
  // function findItemArrayInArray(arr1 : any, arr2 : any) {
  //   for (let i = 0; i < arr2.length; i++) {
  //     if (arr1.indexOf(arr2[i]) > -1) return true;
  //   }
  //   return false;
  // }
  return (
    <div>
      <HeaderNewShort />
      <TitlePages title="جستجو" />
      <div
        className={`${themeClass} px-total flex smmin:flex-row sm:flex-col justify-between`}
      >
        <div
          className={`smmin:w-[20%] sm:w-[100%] smmin:my-[50px] sm:my-[20px] py-[20px] sm:px-[8%] smmin:px-[2%] rounded-md border-solid border-[1px] ${themeBorder}`}
        >
          <h2 className="text-center mb-[20px]">فیلترها</h2>
          {filtersOption.map((item, index) => {
            return (
              // <details key={index} className="mb-[20px]">
              //   <summary
              //     className={`text-[16px] list-none flex flex-row justify-between items-center pb-[8px] cursor-pointer border-b-solid border-b-[1px] ${themeBorder}`}
              //   >
              //     {item.title}
              //     <i
              //       className="fa fa-caret-down text-[16px]"
              //       aria-hidden="true"
              //     ></i>
              //   </summary>
              //   <ul className="pl-[10px] text-[14px]">
              //     {item.content.map((subItem, index) => {
              //       return (
              //         <li
              //           key={index}
              //           className="flex flex-row items-center gap-[10px] pt-[10px]"
              //         >
              //           <input
              //             type="checkbox"
              //             value={subItem}
              //             id={item.title + index}
              //             onClick={(e) => handleClick(e, item.title)}
              //           />
              //           <label
              //             className={`w-[100%] py-[8px] cursor-pointer border-b-solid border-b-[1px] ${themeBorder}`}
              //             htmlFor={item.title + index}
              //           >
              //             {item.title==="منطقه"? "منطقه ":""}{subItem}
              //           </label>
              //         </li>
              //       );
              //     })}
              //   </ul>
              // </details>
              <Stack spacing={3}>
                <Autocomplete
                  multiple
                  id={item.title}
                  onChange={(event,value)=>{handleClick(value,item.title)}}
                  options={item.content}
                  getOptionLabel={(option) => option}
                  // defaultValue={[top100Films[13]]}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="standard"
                      label={item.title}
                      placeholder=""
                    />
                  )}
                />
              </Stack>
            );
          })}
          <details className="mb-[20px] mt-[10px]">
            <summary
              className={`text-[12px] pt-[10px] cursor-text text-[#747474] list-none flex flex-row justify-between items-center pb-[8px] border-b-solid border-b-[1px] border-b-[#949494] hover:border-b-[#000000] hover:border-b-[2px]`}
            > 
              <i
                style={{fontSize:"15px"}}
                className="fa fa-caret-down pr-[8px] text-[#000000]"
                aria-hidden="true"
              ></i>
              قیمت
            </summary>
            <ul className="pl-[10px] text-[14px]">
              <li className="flex flex-col gap-[5px] pt-[10px]">
                از : {priceRange.from} میلیون تومان
                <input
                  type="range"
                  min={0}
                  max={50000}
                  step={100}
                  value={priceRange.from}
                  onChange={(e) => {
                    setPriceRange((old) => ({
                      ...old,
                      from: parseInt(e.target.value),
                    }));
                    setcounterPage(1);
                  }}
                  className="w-[100%]"
                />
              </li>
              <li className="flex flex-col gap-[5px] pt-[10px]">
                تا : {priceRange.to} میلیون تومان
                <input
                  type="range"
                  min={0}
                  max={50000}
                  step={100}
                  value={priceRange.to}
                  onChange={(e) => {
                    setPriceRange((old) => ({
                      ...old,
                      to: parseInt(e.target.value),
                    }));
                    setcounterPage(1);
                  }}
                  className="w-[100%]"
                />
              </li>
            </ul>
          </details>
        </div>
        <div
          className={`sm:w-[100%] smmin:w-[78%] smmin:my-[50px] sm:my-[20px]`}
        >
          <div className="relative text-darkGray">
            <i
              className="fa fa-search text-[25px] cursor-pointer absolute top-[20%] right-[3%]"
              aria-hidden="true"
            ></i>
            <input
              ref={searchRef}
              value={searchInput}
              onChange={handleChange as any}
              type="text"
              placeholder="جستجوی عنوان آگهی"
              className={`w-[100%] mb-[20px] sm:text-[12px] py-[10px] px-[10%] rounded-md border-solid border-[1px] ${themeBorder} ${themeClass}`}
            />
          </div>
          {loading && (
            <div className="text-center pt-[20px]">
              <i
                className="fa fa-spinner fa-spin text-[50px]"
                aria-hidden="true"
              ></i>
            </div>
          )}
          {!loading && (
            <div
              className={`flex flex-row ${filterAds.length === 0? "justify-center text-center":""} flex-wrap w-[100%] py-[40px] px-[2%] gap-[1%] rounded-md border-solid border-[1px] ${themeBorder}`}
            >
              {filterAds.length === 0 ? (
                <div className="flex flex-col gap-3">
                  {/* <i
                    className="fa fa-exclamation-triangle text-red mt-[2px]"
                    aria-hidden="true"
                  ></i> */}
                  <img src={Box} alt="" />
                  <div className="flex text-darkGray">آگهی یافت نشد</div>
                </div>
              ) : (
                filterAds.map((item:ads, index:number) => {
                  return (
                    <div
                      key={index}
                      className="md:w-[48%] xl:w-[48%] xlmin:w-[32%]"
                    >
                      <Card item={item} dir='r' />
                    </div>
                  );
                })
              )}
              {filterAds.length ===0 ? <></>:<div className="max-w-[100%] pt-[40px] container flex justify-center mx-auto">
                <div className="flex flex-row mx-auto">
                  <button
                    disabled={counterPage !== 1 ? false : true}
                    onClick={() => setcounterPage((old) => old - 1)}
                    type="button"
                    className={`bg-darkGray text-lightGray rounded-r-md border-l border-lightGray py-2 ${counterPage !== 1 ? "hover:bg-red" : ""} disabled:opacity-60 px-3`}
                  >
                    <div className="flex flex-row align-middle">
                      <svg
                        className="w-5 mr-2"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                          clip-rule="evenodd"
                        ></path>
                      </svg>
                      <p className="mr-2">قبلی</p>
                    </div>
                  </button>
                  <div className="bg-darkGray text-white border-l border-lightGray py-2 hover:bg-red px-3">
                    {counterPage}
                  </div>
                  <button
                    disabled={n <= filterAds.length ? false : true}
                    onClick={() => setcounterPage((old) => old + 1)}
                    type="button"
                    className={`bg-darkGray text-lightGray ${n <= filterAds.length ? "hover:bg-red" : ""} rounded-l-md py-2 disabled:opacity-60 px-3`}
                  >
                    <div className="flex flex-row align-middle">
                      <span className="ml-2">بعدی</span>
                      <svg
                        className="w-5 ml-2"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z"
                          clip-rule="evenodd"
                        ></path>
                      </svg>
                    </div>
                  </button>
                </div>
              </div>}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default SearchPage;