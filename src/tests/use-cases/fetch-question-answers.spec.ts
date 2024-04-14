import { InMemoryAnswerRepos } from '@/config-tests/InMemory-Repository/answer-repos';
import { FetchQuestionAnswersUseCase } from '@/domain/forum/aplication/use-cases/fetch-question-answers';
import { makeAnswer } from '@/config-tests/factories/make-answer';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';

import { beforeEach, describe, expect, it } from 'vitest';

let inMemoryAnswersRepository: InMemoryAnswerRepos
let sut: FetchQuestionAnswersUseCase

describe('Fetch Question Answers', () => {

    beforeEach(() => {
        inMemoryAnswersRepository = new InMemoryAnswerRepos()
        sut = new FetchQuestionAnswersUseCase(inMemoryAnswersRepository)
    });

    it('should be able to fetch question answers', async () => {

        await inMemoryAnswersRepository.create(
            makeAnswer({
            questionId: new UniqueEntityID('question-1'),
            }),
        )

        await inMemoryAnswersRepository.create(
            makeAnswer({
            questionId: new UniqueEntityID('question-1'),
            }),
        )

        await inMemoryAnswersRepository.create(
            makeAnswer({
            questionId: new UniqueEntityID('question-1'),
            }),
        )

        const { answers } = await sut.execute({
            questionId: 'question-1',
            page: 1,
        });

        expect(answers).toHaveLength(3)

    });


    it('should be able to fetch paginated question answers', async () => {
        for (let i = 1; i <= 22; i++) {
            await inMemoryAnswersRepository.create(

                makeAnswer({
                    questionId: new UniqueEntityID('question-1'),
                }),
            )
        }

        const { answers } = await sut.execute({
            questionId: 'question-1',
            page: 2,
        });

        expect(answers).toHaveLength(2)
    });
})