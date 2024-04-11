import { QuestionRepos } from "@/domain/forum/aplication/respository/question-repository";
import { Question } from "@/domain/forum/enterprise/entities/question";

export class InMemoryQuestionRepos implements QuestionRepos {
    
    public items: Question[] = [];
    

    async findBySlug(slug: string){

        const question = this.items.find(items => items.slug.value === slug);

        if(!question){ return null }

        return question
    }



    async create(question: Question) {
        
        this.items.push(question)
    }
}