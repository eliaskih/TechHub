import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Question } from "../Questions";
import { useParams } from "react-router-dom";
import moment from "moment";

export default function QuestionPage() {
  const { id } = useParams();
  const {
    data: question,
    isLoading,
    isError,
  } = useQuery<Question>({
    queryKey: ["questions", id],
    queryFn: () =>
      fetch("http://localhost:3000/questions/" + id).then((data) =>
        data.json()
      ),
  });
  console.log(question);

  if (isLoading)
    return (
      <div className="flex justify-center py-10">
        <div className="w-7 h-7 rounded-full border-4 border-t-orange-500 animate-spin border-gray-700"></div>
      </div>
    );

  if (isError) return <div>oops, something went wrong...</div>;

  console.log(question);

  return (
    <div className="max-w-4xl mx-auto py-10">
      <div className="border-b pb-4 mb-4">
        <h2 className="text-2xl mb-2 text-gray-700">{question.title}</h2>
        <p className="text-sm text-gray-800">
          Asked:{" "}
          <span className="text-gray-800">
            {moment(question.createdAt).startOf("day").fromNow()}
          </span>
        </p>
      </div>
      <p className="">{question.description}</p>
    </div>
  );
}
