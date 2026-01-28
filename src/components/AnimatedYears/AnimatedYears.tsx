import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const AnimatedYears = ({ year }: { year: string }) => {
  const spanRef = useRef<HTMLSpanElement>(null);
  const prevYearRef = useRef(parseInt(year));

  useGSAP(() => {
    const target = parseInt(year);
    const obj = { value: prevYearRef.current };

    gsap.to(obj, {
      value: target,
      duration: 1,
      ease: "power2.out",
      onUpdate: () => {
        if (spanRef.current) {
          spanRef.current.innerText = Math.round(obj.value).toString();
        }
      },
    });

    prevYearRef.current = target;
  }, [year]);

  return <span ref={spanRef}>{year}</span>;
};

export default AnimatedYears;
