import QuestionCard from "../components/Questioncard";
import { useQuery } from "@tanstack/react-query";
import { Question } from "../Questions";

export default function HomePage() {
    const {
        data: questions,
        isLoading,
        isError,
    } = useQuery<Question[]>({
        queryKey: ["questions"],
        queryFn: () =>
            fetch("http://localhost:3000/questions").then((data) =>
                data.json()
            ),
    });

    console.log(questions);

    if (isLoading)
        return (
            <div className="flex justify-center py-10">
                <div className="w-7 h-7 rounded-full border-4 border-t-orange-500 animate-spin border-gray-700"></div>
            </div>
        );

    if (isError) return <div>oops, something went wrong...</div>;

    return (
        <div className="">
            {questions.map((questions) => (
                <QuestionCard question={questions} />
            ))}
        </div>
    );
}
