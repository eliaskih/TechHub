import React, { useState } from "react";
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
    const [answer, setAnswer] = useState("");
    async function sendComment() {
        const response = await fetch(
            "http://localhost:3000/questions/" + id + "/comment",
            {
                method: "POST",
                body: JSON.stringify({ text: answer }),
                headers: {
                    "content-Type": "application/json",
                },
            }
        );
        setAnswer("");
    }

    if (isLoading)
        return (
            <div className="flex justify-center py-10">
                <div className="w-7 h-7 rounded-full border-4 border-t-orange-500 animate-spin border-gray-700"></div>
            </div>
        );

    if (isError) return <div>oops, something went wrong...</div>;
    console.log(question);

    return (
        <div>
            <div className="border-b pb-4 mb-4">
                <h2 className="text-2xl text-grey-700">{question.title}</h2>
                <p className="text-sm text-grey-600">
                    Asked:{" "}
                    <span className="text-grey-800">
                        {moment(question.createdAt).startOf("minute").fromNow()}
                    </span>
                </p>
            </div>
            <p className="mb-10">{question.description}</p>
            <div>
                <label className="text-lg" htmlFor="answer-textarea">
                    Leave an answer
                </label>
                <textarea
                    id="Title"
                    className="bg-gray-100 border p-1 w-full min-h-[200px]"
                    placeholder="leave your answer here..."
                    onChange={(e) => setAnswer(e.target.value)}
                    value={answer}
                ></textarea>
                <button
                    onClick={() => sendComment()}
                    className="bg-[#0896ff] hover:opacity-90 ml-auto text-white rounded-md py-1.5 p-2.5 text-[13px]"
                >
                    Ask question
                </button>
            </div>
        </div>
    );
}
