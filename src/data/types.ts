export interface TimelineEvent {
  id: number;
  // title: string;
  description: string;
  date: string;
}

export interface TimePeriod {
  id: number;
  number: number; 
  title: string; 
  startYear: string;
  endYear: string;
  events: TimelineEvent[];
}

export interface CircularTimelineProps {
  periods: TimePeriod[];
  initialActivePeriod?: number;
  className?: string;
}