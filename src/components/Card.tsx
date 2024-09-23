import { StaticImageData } from "next/image";
import Image from "next/image";
import React, { useState } from "react";

interface CardProps {
  title: string;
  link?: string;
  company: string;
  src: StaticImageData;
  description: string;
  techs?: any;
}

const Card = ({ title, src, description, techs, company, link }: CardProps) => {
  const [showDescription, setShowDescription] = useState(false);

  return (
    <div
      className={`lg:w-[400px] my-5 ${
        !showDescription && "h-[550px]"
      } border rounded-lg shadow bg-gray-800 border-gray-700`}
    >
      <Image
        className="rounded-t-md w-full h-[200px]"
        src={src}
        alt="project1"
      />
      <div className="p-5">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-white">
          {title}
        </h5>
        <p className="mb-3 font-normal text-gray-400">{company}</p>
        <p
          className={`mb-3 font-normal ${
            !showDescription &&
            "max-h-[150px] overflow-hidden text-ellipsis line-clamp-3"
          } text-gray-400`}
        >
          {description}
        </p>
        <button
          onClick={() => setShowDescription(!showDescription)}
          className="mb-3 font-normal"
        >
          {showDescription ? "Hide" : "Show"} Description
        </button>
        <div className="flex gap-2 my-4  h-[35px]">
          {techs?.map((Component: any, index: number) => (
            <Component key={index} />
          ))}
        </div>
        {link ? (
          <a
            href={link ?? ""}
            target="_blank"
            className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-black rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
          >
            Check Website
            <svg
              className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 5h12m0 0L9 1m4 4L9 9"
              />
            </svg>
          </a>
        ) : (
          <div className="inline-flex items-center px-3 py-2 text-sm font-medium">
            Private Link
          </div>
        )}
      </div>
    </div>
  );
};

export default Card;
