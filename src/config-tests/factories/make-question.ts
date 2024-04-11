import { UniqueEntityID } from "@/core/entities/unique-entitie-id";
import { Question, QuestionProps } from '@/domain/forum/enterprise/entities/question';
import { faker } from '@faker-js/faker';

export function makeQuestion(override: Partial<QuestionProps> = {}, id?: UniqueEntityID) {

  const question = Question.create({

    authorId: new UniqueEntityID(),
    title: faker.lorem.text(),
    content: faker.lorem.sentence(),
    ...override,

  }, id);

  return question
}