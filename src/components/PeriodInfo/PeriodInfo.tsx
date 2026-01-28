import React from "react";
import ArrowSvg from "../ArrowSvg";
import "./PeriodInfo.scss";

interface PeriodInfoProps {
  current: number;
  total: number;
  onPrev: () => void;
  onNext: () => void;
}

const PeriodInfo: React.FC<PeriodInfoProps> = ({
  current,
  total,
  onPrev,
  onNext,
}) => {
  const formatNumber = (num: number) => num.toString().padStart(2, "0");
  return (
    <div className="period">
      <div className="period__number">
        {formatNumber(current)}/{formatNumber(total)}
      </div>
      <div className="period__control">
        <button className="period__button" onClick={onPrev} disabled={current <= 1}> <ArrowSvg 
          direction="right"
          width={12}
          height={12}
          color="rgba(66, 86, 122, 1)"
        /></button>
        <button className="period__button" onClick={onNext} aria-label="Следующий период"  disabled={current >= total}><ArrowSvg 
          direction="left"
          width={12}
          height={12}
          color="rgba(66, 86, 122, 1)"
        /></button>
      </div>
    </div>
  );
};

export default PeriodInfo;
