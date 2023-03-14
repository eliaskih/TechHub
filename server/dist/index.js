import express from "express";
import mongoose from "mongoose";
import cors from "cors";
const app = express();
app.use(cors({ origin: "*" }));
app.get("/", (req, res) => {
    res.send("hej");
});
const questionSchema = new mongoose.Schema({
    title: {
        type: "string",
        required: true,
    },
    description: {
        type: "string",
        required: true,
    },
}, { timestamps: true });
const Question = mongoose.model("questions", questionSchema);
app.get("/questions", async (req, res) => {
    const questions = await Question.find();
    res.send(questions);
});
app.get("/questions/:id", async (req, res) => {
    const question = await Question.findById(req.params.id);
    res.send(question);
});
app.listen(3000, () => {
    mongoose.connect("mongodb+srv://elias:elias@cluster0.mwobsou.mongodb.net/techhub?retryWrites=true&w=majority");
});
//# sourceMappingURL=index.js.map