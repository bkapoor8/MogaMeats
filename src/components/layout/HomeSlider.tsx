"use client";
import { Button, Link } from "@nextui-org/react";
import { SectionProps } from "@/types/SectionProps";
import { useEffect } from "react";
import "aos/dist/aos.css";
import SlideBackground from "./SlideBackground"; 



const HomeSlider = ({ className }: SectionProps) => {
  useEffect(() => {
    const AOS = require("aos");
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
    });
  }, []);

  return (
    <section className={`${className} overflow-hidden`}>
      <div
        data-hs-carousel='{"loadingClasses": "opacity-0", "isAutoPlay": false}'
        className="relative h-[850px] z-0"
      >
        <div className="hs-carousel relative w-full h-full">
          <div className="hs-carousel-body w-full absolute top-0 bottom-0 start-0 flex flex-nowrap duration-700 ease-in-out delay-200 opacity-0">
            
            {/* First Slide */}
            <SlideBackground bgImage="/assets/slider_bg_1.jpg">
              <div className="w-full flex flex-col justify-center items-center text-center h-full absolute z-10 pl-4">
                <span
                  className="font-nothingYouCouldDo text-primary text-[32px] sm:text-[36px] md:text-[40px] mb-4"
                  data-aos="fade-up"
                >
                  Welcome
                </span>
                <h1
                  className="mb-8 text-[28px] sm:text-[32px] md:text-[36px] lg:text-[40px] max-w-4xl"
                  data-aos="fade-right"
                >
                  Your Favorite Indian Restaurant <span className="block mt-2">Right at Your Doorstep!</span>
                </h1>
                <div className="flex flex-wrap justify-center gap-2">
                  <Button
                    as={Link}
                    href="/menu"
                    color="primary"
                    radius="none"
                    size="lg"
                    className="py-4 px-6 text-dark"
                    data-aos="fade-left"
                  >
                    Order Now
                  </Button>
                  <Button
                    as={Link}
                    href="/menu"
                    radius="none"
                    size="lg"
                    className="bg-transparent border-2 py-4 px-6"
                    data-aos="fade-right"
                  >
                    View Menu
                  </Button>
                </div>
              </div>
            </SlideBackground>

            {/* Second Slide */}
            <SlideBackground bgImage="">
              <div className="w-full h-full">
                <video
                  src="/assets/moga-meat-video.mp4"
                  className="w-full h-full object-cover"
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata" // Preload only metadata
                />
              </div>
            </SlideBackground>
          </div>
        </div>

        {/* Indicator buttons */}
        <div className="hs-carousel-pagination flex justify-center absolute bottom-3 start-0 end-0 space-x-3">
          <span className="hs-carousel-active:bg-white hs-carousel-active:border-none w-[18px] h-[18px] border-2 border-gray-400 rounded-full cursor-pointer flex items-center justify-center">
            <span className="hs-carousel-active:bg-white hs-carousel-active:border-gray-500 w-3 h-3 border border-gray-400 rounded-full cursor-pointer"></span>
          </span>
          <span className="hs-carousel-active:bg-white hs-carousel-active:border-none w-[18px] h-[18px] border-2 border-gray-400 rounded-full cursor-pointer flex items-center justify-center">
            <span className="hs-carousel-active:bg-white hs-carousel-active:border-gray-500 w-3 h-3 border border-gray-400 rounded-full cursor-pointer"></span>
          </span>
        </div>
      </div>
    </section>
  );
};

export default HomeSlider;
