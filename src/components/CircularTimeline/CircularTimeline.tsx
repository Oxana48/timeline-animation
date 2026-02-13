import React from "react";
import { useState } from "react";
import "./CircularTimeline.scss";
import { CircularTimelineProps } from "../../data/types";
import titleline from "../../assets/png/title-line.png";
import TimelineCircle from "../TimelineCircle/Timelinecircle";
import PeriodInfo from "../PeriodInfo/PeriodInfo";
import EventsSlider from "../EventsSlider/EventsSlider";

export interface CircularTimelineProps {
  periods: TimePeriod[];
  initialActivePeriod?: number;
  className?: string;
}

const CircularTimeline: React.FC<CircularTimelineProps> = ({
  periods,
  initialActivePeriod = 0,
  className = "",
}) => {
  const [activePeriodIndex, setActivePeriodIndex] =
    useState<number>(initialActivePeriod);

  const activePeriod = periods[activePeriodIndex];
  const totalPeriods = periods.length;

  const handlePeriodClick = (index: number) => {
    if (index === activePeriodIndex) return;
    setActivePeriodIndex(index);
  };

  const handlePrev = () => {
    setActivePeriodIndex((prev) => (prev > 0 ? prev - 1 : totalPeriods - 1));
  };

  const handleNext = () => {
    setActivePeriodIndex((prev) => (prev < totalPeriods - 1 ? prev + 1 : 0));
  };

  return (
    <div className="circular">
      <div className="circular__content">
        <div className="circular__title">
          <img
            className="circular__title-img"
            src={titleline}
            alt="Декоративная деталь заголовка"
          />
          <div className="circular__title-text">
            <span className="circular__title-word">Исторические</span>
            <span className="circular__title-word">даты</span>
          </div>
        </div>

        <TimelineCircle
          startYear={activePeriod.startYear}
          endYear={activePeriod.endYear}
          periods={periods}
          activePeriodIndex={activePeriodIndex}
          onPeriodClick={handlePeriodClick}
        />

        <PeriodInfo
          current={activePeriodIndex + 1}
          total={totalPeriods}
          onPrev={handlePrev}
          onNext={handleNext}
        />
      </div>

      <div>
        <EventsSlider events={activePeriod.events} />
      </div>
    </div>
  );
};

export default CircularTimeline;
