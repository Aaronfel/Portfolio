import React from "react";
import Image from "next/image";
import Avatar from "../../public/images/IMG_0195.jpg";

const About: React.FC = () => {
  const arrTechs = Array.from({ length: 6 });

  return (
    <div className="animate__animated animate__bounceInLeft h-[70vh] mt-20 grid lg:grid-cols-2 rounded-md">
      <div className="flex items-center justify-center text-3xl lg:text-6xl h-full">
        Im a Passionate <br /> Full Stack Web Developer <br /> Creative and
        Interested <br /> In Learning new Technologies
      </div>
      <div className="flex justify-center items-center h-full">
        <div>
          <Image
            className="rounded-full flex items-center justify-center w-[300px] lg:w-[450px] h-[300px] lg:h-[450px]"
            src={Avatar}
            alt="Avatar"
          />
          <div className="flex justify-center space-x-3 mt-2">
            {arrTechs.map((_, index) => (
              <Image
                className="rounded-full bg-white p-2"
                src={require(`../../public/images/image${index + 1}.png`)}
                width={50}
                height={50}
                alt="Tech1"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
