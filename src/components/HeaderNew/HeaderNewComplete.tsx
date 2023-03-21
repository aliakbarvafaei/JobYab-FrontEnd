import React, { useState } from 'react';
import bg_header from "../../assets/images/bg-header.jpg"
import Hamburger from "../mainMenu/Hamburger/Hamburger";
import { Link, useHistory } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import logo1_white from "../../assets/images/logo1_white.png";
import predict from "../../assets/images/predict.png";
import { Button } from "@material-ui/core";
import { useDispatch, useSelector } from 'react-redux';
import { eachToast, statesRedux } from '../../ts/interfaces';
import { useToast } from '../../contexts/ToastState';

const titleMenus = [
    {
      title: "خرید",
      submenu: [
        { title: "آپارتمان", pathTo: "/search" },
        { title: "ویلایی", pathTo: "/search" },
      ],
    },
    {
      title: "رهن و اجاره",
      submenu: [
        { title: "آپارتمان", pathTo: "/search" },
        { title: "ویلایی", pathTo: "/search" },
      ],
    },
    {
      title: "قیمت خانه شما",
      submenu: [
        { title: "آپارتمان", pathTo: "/predict" },
        { title: "ویلایی", pathTo: "/predict" },
      ],
    }
  ];

const HeaderNewComplete:React.FC = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const { user } = useSelector((state : statesRedux) => state.userAuth);
    const themeClass = "bg-white";
    const themeAccount:string = "bg-white text-black";

    const history = useHistory();
    const [searchInput, setSearchInput] = useState("");

    const { setToastState } = useToast();
    // const navigate = useNavig
    const dispatch = useDispatch();
    function addItemOnce(arr : Array<eachToast>, value : eachToast):Array<eachToast> {
      arr.push(value);
      return arr;
    }
    function handleChange(e : React.MouseEvent) {
        setSearchInput((e.target as HTMLInputElement).value);
    }
    function handleHamburger() {
        setIsOpen((old) => !old);
      }

    return (
        <div style={{backgroundImage: `url("${bg_header}")`}} className='w-[100%] h-[650px] bg-no-repeat bg-cover bg-center bg-opacity-10 flex flex-col items-center'>
            <div className='flex flex-row justify-between items-center py-[20px] px-total box-border w-[100%]'>
                <div className="flex flex-row smmin:justify-between sm:right-0 items-center gap-[20px]">
                    <span>
                        <Link to="/home">
                        <img
                            className="w-[45px] cursor-pointer sm:w-[25px] sm:right-[3%] sm:absolute mm:mt-[4%] sm:mt-[2%]"
                            src={logo1_white}
                            alt="title"
                        />
                        {/* <img
                            className="smmin:hidden w-[45px] cursor-pointer sm:w-[25px] sm:right-[3%] sm:absolute mm:mt-[-4%] sm:mt-[-2%]"
                            src={logo1_black}
                            alt="title"
                        /> */}
                        </Link>
                    </span>
                    <span>
                        <Link to="/home">
                        <img
                            className="w-[60%] cursor-pointer sm:w-[40%] sm:absolute sm:left-[30%] mm:mt-[2%]"
                            src={logo}
                            alt="title"
                        />
                        </Link>
                    </span>
                </div>
                <div className="flex flex-row items-center justify-between gap-[30px]">
                    <ul className="xl:hidden xlmin:flex flex-row items-center gap-[20px] m-0 list-none p-0">
                        {titleMenus.map((titleMenu, index) => {
                        return (
                            <li className="group relative text-inherit" key={index}>
                            <button className="peer pl-0 text-[12px] text-white font-bold">
                                {titleMenu.title}
                            </button>
                            {/* <i
                                className="fa fa-caret-down text-[12px] pr-[10px] text-darkGray cursor-pointer group-hover:text-red"
                                aria-hidden="true"
                            ></i> */}
                            {index!==titleMenus.length-1 ? <span className="pr-[12px] text-white">|</span>:<></>}
                            <div
                                className={`${themeClass} absolute hidden peer-hover:block rounded-md hover:flex w-[150px] mt-[-2px] left-0
                            flex-col drop-shadow-lg z-[22]`}
                            >
                                {titleMenu.submenu.map((item, index) => {
                                return (
                                    <Link
                                    className={`text-right hover:text-red rounded-md text-[14px] py-[15px] px-[20px] hoverItem`}
                                    to={item.pathTo}
                                    key={index}
                                    >
                                    {item.title}
                                    </Link>
                                );
                                })}
                            </div>
                            </li>
                        );
                        })}
                    </ul>
                    <div className="xl:inline xlmin:hidden curser-pointer">
                        <i
                        style={{ fontSize: "25px",color: 'white' }}
                        className="fa fa-bars cursor-pointer sm:left-[3%] sm:absolute mm:mt-[4%] sm:mt-[2%]"
                        aria-hidden="true"
                        onClick={handleHamburger}
                        ></i>
                        {/* <i
                        style={{ fontSize: "25px",color: 'black' }}
                        className="smmin:hidden fa fa-bars cursor-pointer sm:left-[3%] sm:absolute mm:mt-[-4%] sm:mt-[-2%]"
                        aria-hidden="true"
                        onClick={handleHamburger}
                        ></i> */}
                        <Hamburger
                        isOpen={isOpen}
                        handleHamburger={handleHamburger}
                        items={titleMenus}
                        />
                    </div>
                    <ul className="sm:hidden smmin:flex flex-row m-0 items-center list-none">
                        <li>
                        <Link to="/new-ad"><Button variant="contained" style={{fontFamily: 'inherit',color: 'black'}}>ثبت آگهی</Button></Link>
                        </li>
                    </ul>
                    <div className="peer pl-0 text-[12px] text-white font-bold flex flex-row justify-center items-center sm:hidden">
                        <i style={{fontSize: '16px'}} className='fa fa-user-o pl-[10px]'></i>
                        {
                            (user==="" || user==null) ? 
                                <><Link to="/login">ورود</Link>
                                <span className='px-[8px]'>|</span>
                                <Link to="/register">ثبت نام</Link></>
                                :
                                <div className='group relative'><button className='peer'>حساب کاربری</button>
                                    <div
                                        className={`${themeAccount} absolute hidden rounded-md peer-hover:block hover:flex w-[120px] mt-[-2px] right-0
                                        flex-col drop-shadow-lg z-[22]`}>
                                            <Link
                                                className="text-right text-[14px] hover:text-red rounded-md py-[15px] px-[20px] hoverItem"
                                                to='profile'
                                                >
                                                پروفایل
                                            </Link>
                                            {/* <Link
                                                className="text-right text-[12px] py-[12px] hoverItem"
                                                to='bookmark'
                                                >
                                                نشان شده‌ها
                                            </Link> */}
                                            <Link
                                                className="text-right text-[14px] hover:text-red rounded-md py-[15px] px-[20px] hoverItem"
                                                onClick={() => {
                                                    dispatch({ type: "logout" });
                                                    localStorage.setItem(
                                                    "token_user",
                                                    JSON.stringify("")
                                                    );
                                                    setToastState((old : Array<eachToast>) =>
                                                    addItemOnce(old.slice(), {
                                                        title: "1",
                                                        description: "خروج با موفقیت انجام شد",
                                                        key: Math.random(),
                                                    })
                                                    );
                                                }}
                                                to='/'
                                                >
                                                خروج
                                            </Link>
                                    </div>
                                </div>
                        }
                        
                    </div>
                </div>
            </div>
            <div className='flex flex-col justify-center h-full'>
                <div className='text-center text-white text-[20px] md:text-[12px] font-bold leading-[40px]'>
                    به صورت رایگان و در سریع‌ترین زمان ممکن 
                    <br />
                    قیمت خانه خود را پیش‌بینی کنید
                </div>
                <div className="relative text-center mt-[40px]">
                    <form>
                        <input type="text" value={searchInput} onChange={handleChange as any} className="rounded-3xl w-[500px] lg:w-[400px] sm:w-[300px] mm:w-[200px] h-[50px] text-[10px] pr-[12%] mm:pr-[18%] mdmin:outline mdmin:outline-[10px] mdmin:outline-lightestBlack" placeholder="جستجو آگهی یا منطقه"/>
                        <button type='submit' onClick={()=>{
                            if(searchInput!=="")
                                history.push(`/search?searchText=${searchInput}`)
                        }} className="fa fa-search absolute smmin:right-[3%] sm:right-[5%] mm:right-[15%] top-[35%]"></button>
                    </form>
                </div>
                <div className='flex flex-col items-center gap-[10px] text-center text-white text-[18px] font-bold leading-[40px] pt-[30px]'>
                    <Link to='/predict'><img src={predict} className="peer w-[100px] cursor-pointer hover:scale-125 duration-[500ms]" alt="" /></Link>
                    <Link to='/predict'><span className='peer-hover:text-red hover:text-red cursor-pointer'>پیش‌بینی قیمت</span></Link>
                </div>
            </div>
        </div>
    );
}

export default HeaderNewComplete;