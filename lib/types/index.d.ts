export type RatingOption = {
  value: number;
  color: string;
  title: string;
  desc: string;
};

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
  rating?: string;
  comment_content?: string;
};

export type DimensionScore = {
  name: string;
  rating: number;
};

export type User = {
  id: string;
  email: string;
  fullName: string;
  role: string;
  username: string | null;
  name: string;
  joinDate: string;
  avatar: string;
};

export type DimensionFeedback = {
  dimension_definition_id: string;
  rating: number;
  comment: string;
};

export type CommentFeedback = {
  id: string;
  commentTitle: string;
  commentContent?: string;
};

export type FeedbackPayload = {
  developer_id: string;
  dimensions: DimensionFeedback[];
  comments: CommentFeedback[];
};

export interface UserCardProps {
  user: {
    id: string;
    name: string;
    email: string;
    joinDate: string;
    avatar: string;
    role: string;
  };
  isSelected: boolean;
  onClick: () => void;
}

export type RichTextEditorProps = {
  value: string;
  onChange: (content: string) => void;
};


  export type InitialDimensions={
  id: string;
  }

  export type GradingCriteria = {
  id: string;
  criteriaName: string;
  }

 export type Dimensions = {
  id:string;
  dimensionName: string;
  description: string;
  weight?: string;
  gradingCriteria: {
    id: string;
    criteriaName: string;
  }[];
 }