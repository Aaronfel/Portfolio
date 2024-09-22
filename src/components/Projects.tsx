import React from "react";
import asea from "../../public/images/asea.png";
import gifttime from "../../public/images/gifttime.png";
import mcayuda from "../../public/images/mc-ayuda.png";
import docxpresso from "../../public/images/docxpresso.png";
import Card from "./Card";
import Javascript from "@/assets/js";
import ReactIcon from "@/assets/react";
import Tailwind from "@/assets/tailwind";
import Typescript from "@/assets/ts";
import Mysql from "@/assets/mysql";
import NodeJs from "@/assets/node";
import NextJs from "@/assets/next";
import Laravel from "@/assets/laravel";
import Php from "@/assets/php";

const Projects: React.FC = () => {
  return (
    <div className="animate__animated animate__bounceInLeft h-[70vh] flex flex-col lg:flex-row lg:flex-wrap xl:mt-20 justify-evenly rounded-md">
      <Card
        title="Asea Global"
        link="https://www.aseaglobal.com/en-US"
        company="Company: Greelow LLC"
        src={asea}
        description="As a Frontend Developer, I built a responsive landing page for skin care products using React, JavaScript, and Tailwind CSS. I also integrated Formik and Yup for form validation, ensuring a smooth user experience across all devices."
        techs={[Javascript, ReactIcon, Tailwind]}
      />
      <Card
        title="GiftTime"
        link="https://play.google.com/store/apps/details?id=com.gifttime.app&hl=en"
        company="Company: Greelow LLC"
        src={gifttime}
        description="Worked on the backend using Node.js, Express, TypeORM, and MySQL. Developed the backoffice in React with TypeScript, enabling efficient management and control of platform features."
        techs={[Typescript, Mysql, NodeJs, ReactIcon, Tailwind]}
      />
      <Card
        title="McAyuda"
        company="Company: Greelow LLC"
        src={mcayuda}
        description="I worked on Mc-Ayuda, a chatbot designed to assist users with specific document-related issues for Arcos Dorados (McDonald's). The chatbot streamlined user interactions by providing fast, targeted solutions to document problems, enhancing efficiency and support within the company."
        techs={[Typescript, NextJs, Tailwind]}
      />
      <Card
        title="Docxpresso Dx-Legal"
        company="Company: Greelow LLC"
        src={docxpresso}
        description="I worked on Mc-Ayuda, a chatbot designed to assist users with specific document-related issues for Arcos Dorados (McDonald's). The chatbot streamlined user interactions by providing fast, targeted solutions to document problems, enhancing efficiency and support within the company."
        techs={[Laravel, Php, Javascript, ReactIcon, Tailwind]}
      />
    </div>
  );
};

export default Projects;
