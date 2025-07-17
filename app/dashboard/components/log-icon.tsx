import { MessageSquare, FileText, Brain, User } from "lucide-react";
import React from "react";

const LogIcon = ({ type }: { type: string }) => {
  return (
    <div>
      {type === "feedback" && <MessageSquare className="w-4 h-4" />}
      {type === "self-assessment" && <FileText className="w-4 h-4" />}
      {type === "ai-score" && <Brain className="w-4 h-4" />}
      {type === "login" && <User className="w-4 h-4" />}
    </div>
  );
};

export default LogIcon;
