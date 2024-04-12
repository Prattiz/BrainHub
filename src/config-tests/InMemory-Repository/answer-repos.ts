import { AnswerRepos } from "@/domain/forum/aplication/respository/answer-repository";
import { Answer } from "@/domain/forum/enterprise/entities/answer";

export class InMemoryAnswerRepos implements AnswerRepos{

    public items: Answer[] = [];

    async findById(id: string) {
        const answer = this.items.find((item) => item.ID.toString() === id)
    
        if (!answer) {
          return null
        }
    
        return answer
    }

    
    async delete(answer: Answer){
        const itemIndex = this.items.findIndex((item) => item.ID === answer.ID)

        this.items.splice(itemIndex, 1)
    }

    async save(answer: Answer){

        const itemIndex = this.items.findIndex((item) => item.ID === answer.ID);

        this.items[itemIndex] = answer
    }


    async create(answer: Answer) {
        
        this.items.push(answer)
    }
    
}