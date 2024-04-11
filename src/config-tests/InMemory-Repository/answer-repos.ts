import { AnswerRepos } from "@/domain/forum/aplication/respository/answer-repository";
import { Answer } from "@/domain/forum/enterprise/entities/answer";

export class InMemoryAnswerRepos implements AnswerRepos{

    public items: Answer[] = []


    async create(answer: Answer) {
        
        this.items.push(answer)
    }
    
}