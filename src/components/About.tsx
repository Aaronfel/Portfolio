import React from "react";
import Image from "next/image";
import Avatar from "../../public/images/IMG_0195.jpg";

const About: React.FC = () => {
  const arrTechs = Array.from({ length: 6 });

  return (
    <div className="animate__animated animate__bounceInLeft h-[70vh] lg:mt-20 grid lg:grid-cols-2 rounded-md">
      <div className="flex items-center justify-center mb-10 lg:mb-0 text-3xl lg:text-6xl h-full">
        Im a passionate <br className="hidden lg:block" /> Full Stack Web
        Developer <br className="hidden lg:block" /> creative and interested
        <br className="hidden lg:block" /> in learning new technologies
      </div>
      <div className="flex justify-center items-center h-full">
        <div>
          <Image
            className="rounded-full flex items-center justify-center w-[300px] lg:w-[450px] h-[300px] lg:h-[450px]"
            src={Avatar}
            alt="Avatar"
          />
          <div className="flex justify-center lg:space-x-3 mt-2">
            {arrTechs.map((_, index) => (
              <Image
                key={index}
                className="rounded-full bg-white p-2"
                src={require(`../../public/images/image${index + 1}.png`)}
                width={50}
                height={50}
                alt={`Tech${index}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
