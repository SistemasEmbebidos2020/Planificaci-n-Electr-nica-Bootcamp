
export interface WeekPlan {
  week: number;
  title: string;
  topics: string[];
}

export interface MonthPlan {
  month: number;
  title: string;
  weeks: WeekPlan[];
}
