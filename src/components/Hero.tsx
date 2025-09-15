import React from "react";
import { useStaticQuery, graphql } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";

import BrandsLogo from "../assets/images/brandslogo-hero.svg";
import Einfraa from "../assets/icons/einfraa.svg";
import IraWhite from "../assets/icons/Irawhite.svg";
const ContactCard = React.lazy(() => import("./common/ContactCard"));

interface FileNode {
  relativePath: string;
  publicURL: string;
  childImageSharp?: any;
}
interface HeroProps {
  setIsModalShow?: React.Dispatch<React.SetStateAction<boolean>>;
  isModalShow:boolean
}
function Hero({ setIsModalShow  ,isModalShow}: HeroProps) {
  const data = useStaticQuery(graphql`
    query HeroImages {
      allFile(
        filter: {
          sourceInstanceName: { eq: "images" }
          relativePath: { in: ["moonglade-hero.png", "mobile-hero.png"] }
        }
      ) {
        nodes {
          relativePath
          publicURL
          childImageSharp {
            gatsbyImageData(
              placeholder: BLURRED
              formats: [AUTO, WEBP, AVIF]
              quality: 85
              layout: FULL_WIDTH
              breakpoints: [480, 768, 1024, 1280, 1920]
              sizes: "(max-width: 768px) 100vw, 100vw"
            )
          }
        }
      }
    }
  `);
  const moonGlade = data.allFile.nodes.find((node: FileNode) => {
    return node.relativePath === "moonglade-hero.png";
  });
  const moonGladeImageData = moonGlade?.childImageSharp
    ? getImage(moonGlade.childImageSharp)
    : null;

  const smallScreenImage = data.allFile.nodes.find((node: FileNode) => {
    return node.relativePath === "mobile-hero.png";
  });
  const smallScreenImageData = smallScreenImage?.childImageSharp
    ? getImage(smallScreenImage.childImageSharp)
    : null;

  return (
    <section
      id="/"
      className="relative w-full h-screen opacity-100 overflow-hidden mt-[64px] sm:mt-[76px] lg:mt-[88px]"
      aria-label="Hero Section"
    >
      <div className="hidden sm:block absolute inset-0 w-full h-full">
        {moonGladeImageData ? (
          <GatsbyImage
            image={moonGladeImageData}
            alt="Moonglade luxury apartments hero"
            className="w-full h-full"
            loading="eager"
            fetchPriority="high"
            style={{ height: "100vh" }}
            objectFit="cover"
            objectPosition="center"
          />
        ) : (
          <div className="w-full h-full bg-gray-200 animate-pulse" />
        )}
      </div>

      <div className="block sm:hidden absolute inset-0 w-full h-full">
        {smallScreenImageData ? (
          <GatsbyImage
            image={smallScreenImageData}
            alt="Moonglade luxury apartments mobile hero"
            className="w-full h-full"
            loading="eager"
            fetchPriority="high"
            style={{ height: "100vh" }}
            objectFit="cover"
            objectPosition="center"
          />
        ) : moonGladeImageData ? (
          <GatsbyImage
            image={moonGladeImageData}
            alt="Moonglade luxury apartments hero"
            className="w-full h-full"
            loading="eager"
            fetchPriority="high"
            style={{ height: "100vh" }}
            objectFit="cover"
            objectPosition="center"
          />
        ) : (
          <div className="w-full h-full bg-gray-200 animate-pulse" />
        )}
      </div>
      <div className="relative z-10 w-full h-full sm:px-[120px] flex md:flex-row flex-col justify-evenly md:justify-between md:pb-12 sm:pt-[76px] lg:pt- pb-6 md:items-center text-center md:text-start">
        <div className="flex flex-col font-medium text-[#1D256C] text-[34px] leading-[41px] md:text-[4rem] md:leading-[72px] tracking-normal pt-16 md:pt-0">
          <span>Where</span>
          <span>your dreams</span>
          <span>take orbit</span>
        </div>
        {!isModalShow && <div className="mx-auto md:mx-0 text-left pt-48 md:pt-0">
         <ContactCard />
        </div>}

        <div className="absolute bottom-9 left-1/2 transform -translate-x-1/2 sm:left-[120px] sm:transform-none flex justify-start items-center hero-icons space-x-6">
          <div className="w-24 md:w-32 lg:w-40 flex items-center">
            <Einfraa />
          </div>
          <div className="w-20 md:w-28 lg:w-36 flex items-center">
            <IraWhite />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
