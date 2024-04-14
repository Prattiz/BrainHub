import { EditAnswerUseCase } from '@/domain/forum/aplication/use-cases/edit-answer';

import { InMemoryAnswerRepos } from '@/config-tests/InMemory-Repository/answer-repos';
import { makeAnswer } from '@/config-tests/factories/make-answer';

import { UniqueEntityID } from '@/core/entities/unique-entity-id';


import { beforeEach, describe, expect, it } from 'vitest';


let inMemoryAnswersRepository: InMemoryAnswerRepos
let sut: EditAnswerUseCase

describe('Edit Answer', () => {

    beforeEach(() => {
        inMemoryAnswersRepository = new InMemoryAnswerRepos()
        sut = new EditAnswerUseCase(inMemoryAnswersRepository)
    });

    it('should be able to edit a answer', async () => {

        const newAnswer = makeAnswer(
        {
            authorId: new UniqueEntityID('author-1'),
        },
            new UniqueEntityID('answer-1'),
        )

        await inMemoryAnswersRepository.create(newAnswer)

        await sut.execute({

            answerId: newAnswer.ID.toValue(),
            authorId: 'author-1',
            content: 'content test',
        })

        expect(inMemoryAnswersRepository.items[0]).toMatchObject({ content: 'content test' })
    });


    it('should not be able to edit a answer from another user', async () => {

        const newAnswer = makeAnswer(
        {
            authorId: new UniqueEntityID('author-1'),
        },
            new UniqueEntityID('answer-1'),
        )

        await inMemoryAnswersRepository.create(newAnswer)

        expect(() => {
        return sut.execute({
            answerId: newAnswer.ID.toValue(),
            authorId: 'author-2', 
            content: 'trying to edit...'
        })
        }).rejects.toBeInstanceOf(Error)

    });

})