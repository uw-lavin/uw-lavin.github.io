import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const slides = [
  {
    icon: "🎯",
    title: "Member Spotlight",
    subtitle: "My favorite Lavin memory HAS to be Hell Night 2024. So much learning, and my team took 1st!",
    caption: "Arnav P., Class of 2027",
  },
  {
    icon: "📅",
    title: "2025 Applications Opening Soon!",
    subtitle: "Keep an eye out for the 2025 application portal!",
    caption: "Join the next generation of entrepreneurs",
  },
  {
    icon: "🏆",
    title: "Lavin Alumni Success",
    subtitle: "Our alumni go on to do awesome things and join incredible companies",
    caption: "From startups to Fortune 500",
  },
];

export default function SpotlightCarousel() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    centerMode: true,
    centerPadding: "10%",
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: false,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          centerMode: false,
          centerPadding: "0",
        },
      },
    ],
  };

  return (
    <div>
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-encode text-husky-purple mb-4">
          What's happening in the Lavin community?
        </h2>
      </div>
      
      <Slider {...settings}>
        {slides.map((slide, index) => (
          <div key={index} className="px-4">
            <div className="bg-white rounded-2xl p-8 shadow-lg text-center">
              <div className="text-5xl mb-4">{slide.icon}</div>
              <h3 className="text-xl font-semibold mb-2 text-husky-purple">
                {slide.title}
              </h3>
              <p className="italic text-neutral-700 mb-1 font-open">
                "{slide.subtitle}"
              </p>
              <p className="text-sm text-neutral-500 font-open">
                {slide.caption}
              </p>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
} 