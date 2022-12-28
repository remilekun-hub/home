import React from "react";
import Link from "next/link";
import Image from "next/legacy/image";
import { FaBath, FaBed } from "react-icons/fa";
import { GoVerified } from "react-icons/go";
import { BsGridFill } from "react-icons/bs";
import millify from "millify";

function Property({
  property: {
    coverPhoto,
    price,
    rentFrequency,
    rooms,
    title,
    baths,
    area,
    agency,
    isVerified,
    externalID,
  },
}) {
  return (
    <Link
      href={`/property/${externalID}`}
      className="group flex flex-col duration-500 rounded-md overflow-hidden"
    >
      <Image
        src={coverPhoto ? coverPhoto.url : ""}
        width={500}
        height={330}
        placeholder="blur"
        objectFit="cover"
        blurDataURL={coverPhoto.url}
        className="group-hover:scale-125 duration-500 transition-[transform]"
      />

      <div className="bg-white p-3">
        <div className="flex justify-between mt-3">
          <div className="flex items-center mb-4">
            {isVerified && (
              <div className="text-green-500 mr-3">
                <GoVerified />
              </div>
            )}

            <p className="font-semibold">
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
        <div className="flex max-w-[300px] space-x-3 divide-x-2 divide-black mb-6">
          <span className="flex items-center px-[4px]">
            <span className="mr-2">{rooms}</span> <FaBed />
          </span>{" "}
          <span className="flex items-center px-[4px]">
            <span className="mr-2">{baths}</span> <FaBath />
          </span>
          <span className="flex items-center px-[4px]">
            <span className="mr-2">{millify(area)} sqft</span> <BsGridFill />
          </span>
        </div>
        <p className="line-clamp-1">{title}</p>
      </div>
    </Link>
  );
}

export default Property;
