import { QuestionRepos } from "@/domain/forum/aplication/respository/question-repository";
import { Question } from "@/domain/forum/enterprise/entities/question";

export class InMemoryQuestionRepos implements QuestionRepos {

    public items: Question[] = [];


    async create(question: Question) {
        
        this.items.push(question)
    }
}