import { EditQuestionUseCase } from '@/domain/forum/aplication/use-cases/edit-question';

import { InMemoryQuestionRepos } from '@/config-tests/InMemory-Repository/question-repos';
import { makeQuestion } from '@/config-tests/factories/make-question';

import { UniqueEntityID } from '@/core/entities/unique-entitie-id';


import { beforeEach, describe, expect, it } from 'vitest';

let inMemoryQuestionsRepository: InMemoryQuestionRepos
let sut: EditQuestionUseCase

describe('Edit Question', () => {

    beforeEach(() => {
        inMemoryQuestionsRepository = new InMemoryQuestionRepos()
        sut = new EditQuestionUseCase(inMemoryQuestionsRepository)
    });

    it('should be able to edit a question', async () => {

        const newQuestion = makeQuestion(
        {
            authorId: new UniqueEntityID('author-1'),
        },
            new UniqueEntityID('question-1'),
        )

        await inMemoryQuestionsRepository.create(newQuestion)

        await sut.execute({

            questionId: newQuestion.ID.toValue(),
            authorId: 'author-1',
            title: 'question test',
            content: 'content test',
        })

        expect(inMemoryQuestionsRepository.items[0]).toMatchObject({
            
            title: 'question test',
            content: 'content test',
        })

    });

    it('should be able to edit only the title of the question', async () => {

        const newQuestion = makeQuestion(
        {
            authorId: new UniqueEntityID('author-1'),
            content: 'original content',
            title: 'original title'
        },
            new UniqueEntityID('question-1'),
        )

        await inMemoryQuestionsRepository.create(newQuestion)

        await sut.execute({

            questionId: newQuestion.ID.toValue(),
            authorId: 'author-1',
            title: 'edited title'
        })

        expect(inMemoryQuestionsRepository.items[0]).toMatchObject({
            
            title: 'edited title',
            content: 'original content',
        })

    });

    it('should not be able to edit a question from another user', async () => {

        const newQuestion = makeQuestion(
        {
            authorId: new UniqueEntityID('author-1'),
        },
            new UniqueEntityID('question-1'),
        )

        await inMemoryQuestionsRepository.create(newQuestion)

        expect(() => {
        return sut.execute({
            questionId: newQuestion.ID.toValue(),
            authorId: 'author-2', // other user
            //....
        })
        }).rejects.toBeInstanceOf(Error)

    });

})