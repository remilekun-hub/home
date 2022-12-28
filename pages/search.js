import Head from "next/head";
import React, { useState } from "react";
import { fetchApi, baseUrl } from "../service/fetchApi";
import Layout from "../src/components/Layout";
import SearchFilters from "../src/components/SearchFilters";
import { useRouter } from "next/router";
import Property from "../src/components/Property";

function Search({ properties }) {
  const router = useRouter();
  const { purpose } = router.query;
  const [filter, setFilter] = useState(false);
  const purposeFn = (purpose) => {
    switch (purpose) {
      case "for-rent":
        return "For Rent";
        break;
      case "for-sale":
        return "For sale";
        break;
      default:
        "";
    }
  };
  return (
    <div>
      <Head>
        <title>Search for a home</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <div className="flex justify-center">
          <button
            onClick={() => setFilter(!filter)}
            className="cursor-pointer py-[7px] px-3 text-[15px] rounded-[10px] justify-center flex items-center bg-slate-200"
          >
            <span className="mr-3">Search property by filter</span>
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-5 h-5"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z"
                />
              </svg>
            </span>
          </button>
        </div>
        <div className="flex flex-col gap-1 mt-1">
          {filter && <SearchFilters />}

          <div className="mb-5 mt-3">
            <h1 className="font-semibold text-[19px] pl-[10px]">
              Properties {purposeFn(purpose)}
            </h1>
          </div>
          <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 lg:grid-cols-3 mx-auto px-[12px]">
            {properties.map((property) => (
              <Property property={property} key={property.id} />
            ))}
          </div>
        </div>
      </Layout>
    </div>
  );
}

export default Search;

export const getServerSideProps = async ({ query }) => {
  const purpose = query.purpose || "for-rent";
  const rentFrequency = query.rentFrequency || "yearly";
  const minPrice = query.minPrice || "0";
  const maxPrice = query.maxPrice || "1000000";
  const roomsMin = query.roomsMin || "0";
  const bathsMin = query.bathsMin || "0";
  const sort = query.sort || "price-desc";
  const areaMax = query.areaMax || "35000";
  const locationExternalIDs = query.locationExternalIDs || "5002";
  const categoryExternalID = query.categoryExternalID || "4";

  const data = await fetchApi(
    `${baseUrl}/properties/list?locationExternalIDs=${locationExternalIDs}&purpose=${purpose}&categoryExternalID=${categoryExternalID}&bathsMin=${bathsMin}&rentFrequency=${rentFrequency}&priceMin=${minPrice}&priceMax=${maxPrice}&roomsMin=${roomsMin}&sort=${sort}&areaMax=${areaMax}`
  );

  return {
    props: {
      properties: data?.hits,
    },
  };
};
