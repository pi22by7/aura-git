import { useState } from "react";
import day0 from "../../Assets/Schedule/1.png";
import day1 from "../../Assets/Schedule/2.png";
import day2 from "../../Assets/Schedule/3.png";
import day3 from "../../Assets/Schedule/4.png";

const Schedule = () => {
  const [day, setDay] = useState(0);
  const [curBg, setCurBg] = useState("bg-day0");
  const [curBgC, setCurBgC] = useState("bg-day0c");

  const updateBg = (e) => {
    const bg = document.querySelector(".schedule-bg");
    bg.classList.remove(curBg);
    bg.classList.remove(curBgC);
    const cur = "bg-" + e.currentTarget.dataset.id;
    setCurBg(cur);
    setCurBgC(cur + "c");
    bg.classList.add(cur);
    bg.classList.add(cur + "c");
  };

  return (
    <div className="schedule-bg grid lg:grid-cols-12  grid-cols-1 h-[100vh] bg-schedulec w-screen user-none bg-schedulee bg-day0 md:bg-contain bg-no-repeat bg-cover md:bg-left bg-right bg-scroll overflow-scroll [&::-webkit-scrollbar]:hidden md:px-10 px-1 py-5">
      <div className="w-full h-full relative lg:col-start-3 lg:col-span-10 col-span-1 mx-auto">
        <h1 className="text-3xl font-bold text-center">Schedule</h1>
        <div className="grid grid-cols-4 md:gap-x-4 gap-x-1 my-5">
          <button
            className={`btn hover:bg-[#FF6301] ${
              day == 0 ? "bg-[#FF6301]" : "bg-[#FFD028]"
            }`}
            onClick={(e) => {
              setDay(0);
              updateBg(e);
            }}
            data-id="day0"
          >
            Day 0
          </button>
          <button
            className={`btn hover:bg-[] ${day == 1 ? "bg-[]" : "bg-[#009BE5]"}`}
            onClick={(e) => {
              setDay(1);
              updateBg(e);
            }}
            data-id="day1"
          >
            Day 1
          </button>
          <button
            className={`btn hover:bg-[] ${day == 2 ? "bg-[]" : "bg-[]"}`}
            onClick={(e) => {
              setDay(2);
              updateBg(e);
            }}
            data-id="day2"
          >
            Day 2
          </button>
          <button
            className={`btn hover:bg-[] ${day == 3 ? "bg-[]" : "bg-[]"}`}
            onClick={(e) => {
              setDay(3);
              updateBg(e);
            }}
            data-id="day3"
          >
            Day 3
          </button>
        </div>
        <div className="w-full h-full overflow-x-scroll [&::-webkit-scrollbar]:hidden">
          {day == 0 && (
            <img
              src={day0}
              alt="Day 0 Schedule"
              className="md:w-full md:h-auto h-3/4 max-w-none"
            />
          )}
          {day == 1 && (
            <img
              src={day1}
              alt="Day 1 Schedule"
              className="md:w-full md:h-auto h-3/4 max-w-none"
            />
          )}
          {day == 2 && (
            <img
              src={day2}
              alt="Day 2 Schedule"
              className="md:w-full md:h-auto h-3/4 max-w-none"
            />
          )}
          {day == 3 && (
            <img
              src={day3}
              alt="Day 3 Schedule"
              className="md:w-full md:h-auto h-3/4 max-w-none"
            />
          )}
        </div>
        {/* <h1 className="text-xl font-semibold text-center mt-12">
          Please check updates on our{" "}
          <a href="/#/news" className="text-blue-500">
            News
          </a>{" "}
          page
        </h1> */}
      </div>
    </div>
  );
};

export default Schedule;
