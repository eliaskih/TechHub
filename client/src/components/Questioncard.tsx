import React from "react";
import { Link } from "react-router-dom";
import { Question } from "../Questions";
type Props = {
  question: Question;
};

export default function QuestionCard({ question }: Props) {
  return (
    <div className="p-4 border-b border-b-gray-300">
      <Link to={"/questions/" + question._id} className="text-lg text-sky-500">
        {question.title}
      </Link>
      <p className="text-sm">{question.description}</p>
    </div>
  );
}
