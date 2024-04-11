import { QuestionRepos } from "@/domain/forum/aplication/respository/question-repository";
import { Question } from "@/domain/forum/enterprise/entities/question";

export class InMemoryQuestionRepos implements QuestionRepos {

    public items: Question[] = [];

    async findById(id: string) {
        const question = this.items.find((item) => item.ID.toString() === id)
    
        if (!question) {
          return null
        }
    
        return question
    }


    async delete(question: Question){
        const itemIndex = this.items.findIndex((item) => item.ID === question.ID)

        this.items.splice(itemIndex, 1)
    }
    

    async findBySlug(slug: string){

        const question = this.items.find(items => items.slug.value === slug);

        if(!question){ return null }

        return question
    }


    async create(question: Question) {
        
        this.items.push(question)
    }
}