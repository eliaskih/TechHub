import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AskQuestionPage() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const navigate = useNavigate();

    async function sendQuestion() {
        const response = await fetch("http://localhost:3000/question", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ title: title, description: description }),
        });
        const data = await response.json();
        setTitle("");
        setDescription("");
        navigate("/questions/" + data._id);

        console.log(data);
    }

    return (
        <div>
            <h2 className="text-3xl mb-4">Ask a question on Techhub</h2>

            <label htmlFor="Title">Title</label>
            <textarea
                id="Title"
                className="bg-gray-100 border p-1 w-full min-h-[50px]"
                placeholder="This is a title..."
                onChange={(e) => setTitle(e.target.value)}
                value={title}
            ></textarea>

            <label htmlFor="Description">Description</label>
            <textarea
                id="Description"
                className="bg-gray-100 border p-1 w-full min-h-[200px]"
                placeholder="This is a description..."
                onChange={(e) => setDescription(e.target.value)}
                value={description}
            ></textarea>
            <button
                onClick={() => sendQuestion()}
                className="bg-[#0896ff] hover:opacity-90 ml-auto text-white rounded-md py-1.5 p-2.5 text-[13px]"
            >
                Ask question
            </button>
        </div>
    );
}
