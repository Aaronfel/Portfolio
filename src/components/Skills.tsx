import React from "react";
import Image from "next/image";

const Skills: React.FC = () => {
  const skills = Array.from({ length: 7 });

  return (
    <div className="animate__animated animate__bounceInUp h-[70vh] lg:mt-20 grid lg:grid-cols-2 rounded-md">
      <div className="flex items-center justify-center mb-10 lg:mb-0 text-3xl lg:text-6xl h-full">
        This are <br /> My current skills <br /> Always open to learn more
      </div>
      <div className="flex justify-center items-center h-full">
        <Image
          className="bg-white"
          width={450}
          height={450}
          src={require(`../../public/images/cv.png`)}
          alt="image"
        />
      </div>
    </div>
  );
};

export default Skills;
