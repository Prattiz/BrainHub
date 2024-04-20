import { PaginationParams } from "@/core/repository/pagination-params";
import { AnswerAttachmentsRepos } from "@/domain/forum/application/respository/answer-attachment-repository";
import { AnswerRepos } from "@/domain/forum/application/respository/answer-repository";
import { Answer } from "@/domain/forum/enterprise/entities/answer";

export class InMemoryAnswerRepos implements AnswerRepos{

    public items: Answer[] = [];

    constructor(
        private answerAttachmentsRepository: AnswerAttachmentsRepos,
      ) {}

    async findById(id: string) {
        const answer = this.items.find((item) => item.ID.toString() === id)
    
        if (!answer) {
          return null
        }
    
        return answer
    }


    async findManyByQuestionId(questionId: string, { page }: PaginationParams) {
        const answers = this.items
          .filter((item) => item.questionId.toString() === questionId)
          .slice((page - 1) * 20, page * 20)
    
        return answers
    }

    
    async delete(answer: Answer){
        const itemIndex = this.items.findIndex((item) => item.ID === answer.ID)

        this.items.splice(itemIndex, 1)
    }

    async save(answer: Answer){

        const itemIndex = this.items.findIndex((item) => item.ID === answer.ID);

        this.items[itemIndex] = answer

        this.answerAttachmentsRepository.deleteManyByAnswerId(answer.ID.toString())
    }


    async create(answer: Answer) {
        
        this.items.push(answer)
    }
    
}