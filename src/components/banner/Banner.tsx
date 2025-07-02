import { useState } from "react";
import { Button } from "@/components/ui/button";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const banners = [
  {
    src: "https://i.ibb.co/gLMKTYjP/b3.png",
    alt: "Discover New Stories",
    title: "Discover New Stories",
    subtitle: "Browse a world of imagination and learning.",
  },
  {
    src: "https://i.ibb.co/PvbNYQTn/b1.png",
    alt: "Read Anytime, Anywhere",
    title: "Read Anytime, Anywhere",
    subtitle: "Access thousands of books from your device.",
  },
  {
    src: "https://i.ibb.co/ym7805zN/b2.png",
    alt: "Expand Your Mind",
    title: "Expand Your Mind",
    subtitle: "From fiction to facts, feed your curiosity daily.",
  },
];

const Banner = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? banners.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === banners.length - 1 ? 0 : prev + 1));
  };

  const handleDotClick = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <section className="w-full overflow-hidden relative">
      {/* Banner Image */}
      <img
        src={banners[currentIndex].src}
        alt={banners[currentIndex].alt}
        className="w-full h-[200px] sm:h-[400px] md:h-[500px] object-cover transition-all duration-700 ease-in-out"
      />

      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-center px-4">
        <h2 className="text-xl sm:text-3xl md:text-4xl font-bold text-white drop-shadow-lg">
          {banners[currentIndex].title}
        </h2>
        <p className="mt-2 text-sm sm:text-lg text-white drop-shadow">
          {banners[currentIndex].subtitle}
        </p>
      </div>

      {/* Controls */}
      <div className="absolute top-1/2 left-0 right-0 flex justify-between px-4 -translate-y-1/2">
        <Button
          onClick={handlePrev}
          variant="secondary"
          size="sm"
          className="bg-black/40 text-white hover:bg-black"
        >
          <FaArrowLeft />
        </Button>
        <Button
          onClick={handleNext}
          variant="secondary"
          size="sm"
          className="bg-black/40 text-white hover:bg-black"
        >
          <FaArrowRight />
        </Button>
      </div>

      {/* Pagination Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {banners.map((_, idx) => (
          <button
            key={idx}
            className={`w-3 h-3 rounded-full ${
              idx === currentIndex ? "bg-white" : "bg-white/50"
            }`}
            onClick={() => handleDotClick(idx)}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default Banner;
