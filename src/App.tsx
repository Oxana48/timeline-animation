import React from "react";
import CircularTimeline from "./components/CircularTimeline/CircularTimeline";
import { mockTimelineData } from "./data/timelineData";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import "./styles/main.scss";

gsap.registerPlugin(useGSAP);

const App: React.FC = () => {
  return (
    <div className="app">
      <CircularTimeline
        periods={mockTimelineData}
        initialActivePeriod={1}
        className="app__circle"
      />
    </div>
  );
};

export default App;
