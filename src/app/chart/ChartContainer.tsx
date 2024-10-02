"use client";

import Chart from "@/app/chart/Chart";
import { useState, Suspense } from "react";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import ChartLoading from "./ChartLoading";

export default function ChartContainer() {
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth() + 1);

  const handlePreviousMonth = () => {
    if (month === 1) {
      setMonth(12);
      setYear((prevYear) => prevYear - 1);
    } else {
      setMonth((prevMonth) => prevMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (month === 12) {
      setMonth(1);
      setYear((prevYear) => prevYear + 1);
    } else {
      setMonth((prevMonth) => prevMonth + 1);
    }
  };

  return (
    <div>
      <div className="flex">
        <button onClick={handlePreviousMonth} className="btn">
          <HiChevronLeft />
        </button>
        <span className="text-xl font-bold">
          {year}년 {month}월
        </span>
        <button onClick={handleNextMonth} className="btn">
          <HiChevronRight />
        </button>
      </div>
      <Suspense fallback={<ChartLoading />}>
        <Chart year={year} month={month} />
      </Suspense>
    </div>
  );
}