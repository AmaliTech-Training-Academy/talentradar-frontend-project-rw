export type RatingOption = {
  value: number
  color: string
  title: string
  desc: string
}
export type Criterion = {
  id: string;
  criteria_name: string;
};

export type Dimension = {
  id: string;
  dimension_name: string;
  description: string;
  Weight: string;
  criteria: Criterion[];
};
