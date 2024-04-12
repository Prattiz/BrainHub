import { PaginationParams } from "@/core/repository/pagination-params";
import { QuestionRepos } from "@/domain/forum/aplication/respository/question-repository";
import { Question } from "@/domain/forum/enterprise/entities/question";

export class InMemoryQuestionRepos implements QuestionRepos {

    public items: Question[] = [];

    async findById(id: string) {

        const question = this.items.find((item) => item.ID.toString() === id);
    
        if (!question) {
          return null
        }
    
        return question
    }


    async delete(question: Question){

        const itemIndex = this.items.findIndex((item) => item.ID === question.ID);

        this.items.splice(itemIndex, 1)
    }


    async findManyRecent({ page }: PaginationParams) {
        
        const questions = this.items
          .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
          .slice((page - 1) * 20, page * 20)
    
        return questions
    }


    async save(question: Question){

        const itemIndex = this.items.findIndex((item) => item.ID === question.ID);

        this.items[itemIndex] = question
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