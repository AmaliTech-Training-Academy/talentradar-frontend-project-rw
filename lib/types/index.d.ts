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
  rating?: string;
};
export type DimensionScore = {
  name: string;
  rating: number;
};export type User = {
  id: string;
  name: string;
  email: string;
  joinDate: string;
  avatar: string;
  role: string;
};

export type DimensionFeedback = {
  dimension_definition_id: string;
  rating: number;
  comment: string;
};

export type CommentFeedback = {
  id: string;
  comment_title: string;
  comment_content: string;
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