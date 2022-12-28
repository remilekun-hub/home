import React from "react";
import { fetchApi, baseUrl } from "../../service/fetchApi";
import Layout from "../../src/components/Layout";
import { Swiper, SwiperSlide } from "swiper/react";
import { GoVerified } from "react-icons/go";
import { FaBed, FaBath } from "react-icons/fa";
import { BsGridFill } from "react-icons/bs";
import millify from "millify";
import { Navigation } from "swiper";
import Head from "next/head";
import { useRouter } from "next/router";

import "swiper/css/navigation";

function Property({
  propertyDetails: {
    coverPhoto,
    price,
    rentFrequency,
    rooms,
    title,
    baths,
    area,
    description,
    type,
    purpose,
    furnishingStatus,
    amenities,
    photos,
    agency,
    isVerified,
    externalID,
  },
}) {
  const router = useRouter();
  const id = router.query.id;
  return (
    <div className="">
      <Head>
        <title>Homes | property {id}</title>
      </Head>
      <Layout>
        <Swiper slidesPerView={1} navigation={true} modules={[Navigation]}>
          {photos?.map((photo) => (
            <SwiperSlide>
              <img
                src={photo.url}
                alt=""
                className="object-cover w-full h-full md:max-h-[450px]"
              />
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="mt-4 px-3">
          <div className="flex justify-between">
            <h3 className="font-bold text-[27px] mt-3">{title}</h3>
          </div>

          <div className="mt-4">
            <div className="flex justify-between">
              <div className="flex items-center mb-4">
                {isVerified && (
                  <div className="text-green-500 mr-3">
                    <GoVerified />
                  </div>
                )}

                <p className="font-bold text-[16px] mb-2">
                  AED {millify(price)}
                  {rentFrequency && `/${rentFrequency}`}
                </p>
              </div>
              <div>
                <img
                  src={agency?.logo?.url}
                  alt="agency"
                  className="object-cover max-w-[50px] h-[50px] rounded-full"
                />
              </div>
            </div>
            <div className="flex max-w-[300px] space-x-3 mt-2 divide-x-2 divide-green-700 mb-5">
              <span className="flex items-center px-[4px]">
                <span className="mr-2">{rooms}</span> <FaBed />
              </span>{" "}
              <span className="flex items-center px-[4px]">
                <span className="mr-2">{baths}</span> <FaBath />
              </span>
              <span className="flex items-center px-[4px]">
                <span className="mr-2">{millify(area)} sqft</span>{" "}
                <BsGridFill />
              </span>
            </div>

            <p className="mt-2 leading-7">{description}</p>
          </div>

          <div className="flex flex-col md:flex-row md:justify-between mt-4 gap-y-4">
            <div className="flex justify-between w-[300px]">
              <div>TYPE</div>
              <div className="uppercase font-bold">{type}</div>
            </div>
            <div className="flex justify-between w-[300px]">
              <div>PURPOSE</div>
              <div className="uppercase font-bold">{purpose}</div>
            </div>
          </div>

          <div>
            {amenities?.length > 0 && (
              <h3 className="font-bold my-4 text-[23px]">Amenities</h3>
            )}
            <div className="flex flex-wrap">
              {amenities.map((item) =>
                item.amenities.map((amenity) => (
                  <span
                    key={amenity.text}
                    className="font-semibold bg-zinc-300 mr-2 mb-2 p-2 rounded-[5px]"
                  >
                    {amenity.text}
                  </span>
                ))
              )}
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
}

export default Property;
export const getServerSideProps = async ({ res, params: { id } }) => {
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=10, stale-while-revalidate=59"
  );

  const data = await fetchApi(`${baseUrl}/properties/detail?externalID=${id}`);
  return {
    props: {
      propertyDetails: data,
    },
  };
};
