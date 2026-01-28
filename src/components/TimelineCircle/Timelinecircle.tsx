import React, { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { TimePeriod } from "../../data/types";
import AnimatedYears from "../AnimatedYears/AnimatedYears";
import "./TimelineCircle.scss";

interface TimelineCircleProps {
  periods: TimePeriod[];
  activePeriodIndex: number;
  onPeriodClick: (index: number) => void;
  startYear: string;
  endYear: string;
}

const TimelineCircle: React.FC<TimelineCircleProps> = ({
  periods,
  activePeriodIndex,
  onPeriodClick,
  startYear,
  endYear,
}) => {
  const circleRef = useRef<HTMLDivElement>(null);
  const [isTextVisible, setIsTextVisible] = useState(false);
  const totalPeriods = periods.length;
  const angleStep = 360 / totalPeriods;
  const activePositionAngle = 30;

  useGSAP(() => {
    if (!circleRef.current) return;

    setIsTextVisible(false);

    const targetRotation = (activePeriodIndex * angleStep) % 360;
    const finalRotation = -targetRotation + activePositionAngle;

    gsap.to(circleRef.current, {
      rotation: finalRotation,
      duration: 1,
      ease: "power2.out",
      onComplete: () => {
        setIsTextVisible(true);
      },
    });

    periods.forEach((_, index) => {
      const pointAngle = index * angleStep;
      gsap.to(`.point-content-${index}`, {
        rotation: -finalRotation - pointAngle,
        duration: 1,
        ease: "back.out(1.2)",
      });
    });
  }, [activePeriodIndex, angleStep, periods.length]);

  const getPointAngle = (index: number) => index * angleStep;

  const handlePointClick = (index: number) => {
    onPeriodClick(index);
  };

  return (
    <div className="timeline">
      <div className="timeline__cross-lines"> </div>

      <div className="timeline__circle" ref={circleRef}>
        {periods.map((period, index) => {
          const angle = getPointAngle(index);
          const isActive = index === activePeriodIndex;

          return (
            <div
              key={period.id}
              className={`timeline__point ${isActive ? "timeline__point--active" : ""}`}
              data-index={index}
              style={{ transform: `rotate(${angle}deg)` }}
              onClick={() => handlePointClick(index)}
            >
              <div className={`timeline__point-content point-content-${index}`}>
                <div className="timeline__point-dot">
                  <span className="timeline__point-number">{index + 1}</span>
                </div>

                <div
                  className={`timeline__period-info ${isActive && isTextVisible ? "timeline__period-info--visible" : ""}`}
                >
                  <span className="timeline__period-name">{period.title}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="timeline__center">
        <div className="timeline__years">
          <div className="timeline__year-start">
            <AnimatedYears year={startYear} />
          </div>
          <div className="timeline__year-end">
            <AnimatedYears year={endYear} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimelineCircle;
