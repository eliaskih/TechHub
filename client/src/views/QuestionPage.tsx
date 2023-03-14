import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Question } from "../Questions";
import { useParams } from "react-router-dom";

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

  return <div>QuestionPage</div>;
}
