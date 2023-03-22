import React, { useEffect, useState } from "react";
import Carousel from "react-multi-carousel"; 
import "react-multi-carousel/lib/styles.css";
import Card from "../Ads/Card";
import Skeleton from "@mui/material/Skeleton";
import { getAdsNew } from "../../services/api";
import { ads } from "../../ts/interfaces";

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 1279 },
    items: 4,
  },
  desktop: {
    breakpoint: { max: 1279, min: 767 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 767, min: 0 },
    items: 2,
  }
};

const SectionAdSlider:React.FC = () => {
  const themeClass = "bg-white";
  const [AdsNew, setAdsNew] = useState<Array<ads>>([]);
  useEffect(()=>{
    getAdsNew()
      .then((response) => {
        setAdsNew(response.data);
      })
      .catch((err) => {
        console.error(err);
      });
  },[])

  return (
    <div
      className={`${themeClass} flex flex-col items-center py-[50px] px-total`}
    >
      <h4 className="text-[18px] text-red">پیشنهادهای ویژه</h4>
      <h2 className="sm:text-[24px] smmin:text-[32px] font-bold">
        آگهی‌های جدید
      </h2>
      <h6 className="w-[70px] border-b-red border-b-solid border-b-[3px] mb-[15px]">{}</h6>
      <div className="overflow-hidden w-[100%]">
        <Carousel
          responsive={responsive}
          autoPlay={true}
          infinite={true}
          arrows={false}
        >
          {(AdsNew.length === 0 ? Array.from(new Array(8)) : AdsNew).map(
            (item : any, index : number) => {
              return (
                <>
                  {item ? (
                    <Card key={index} item={item} dir='l' />
                  ) : (
                    <div key={index} className="ml-[5px]">
                      <Skeleton
                        variant="rectangular"
                        width={"100%"}
                        height={"200px"}
                      />
                      <div className="mt-[10px]">
                        <Skeleton
                          variant="rectangular"
                          width={`50%`}
                          height="15px"
                        />
                      </div>
                      <div className="mt-[5px]">
                        <Skeleton
                          variant="rectangular"
                          width={`80%`}
                          height="15px"
                        />
                      </div>
                      <div className="mt-[5px] mb-[30px]">
                        <Skeleton
                          variant="rectangular"
                          width={`30%`}
                          height="15px"
                        />
                      </div>
                    </div>
                  )}
                </>
              );
            }
          )}
        </Carousel>
      </div>
    </div>
  );
}

export default SectionAdSlider;
