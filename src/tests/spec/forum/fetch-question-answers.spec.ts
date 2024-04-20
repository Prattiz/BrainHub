import { InMemoryAnswerRepos } from '@/tests/config-tests/InMemory-Repository/forum/answer-repos';
import { FetchQuestionAnswersUseCase } from '@/domain/forum/application/use-cases/fetch-question-answers';
import { makeAnswer } from '@/tests/config-tests/factories/forum/make-answer';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { InMemoryAnswerAttachmentsRepos } from '@/tests/config-tests/InMemory-Repository/forum/answer-attachment-repos';



let inMemoryAnswersRepository: InMemoryAnswerRepos
let inMemoryAnswerAttachmentsRepository: InMemoryAnswerAttachmentsRepos
let sut: FetchQuestionAnswersUseCase

describe('Fetch Question Answers', () => {

    beforeEach(() => {
        inMemoryAnswerAttachmentsRepository = new InMemoryAnswerAttachmentsRepos()
        inMemoryAnswersRepository = new InMemoryAnswerRepos(inMemoryAnswerAttachmentsRepository)
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

        const result = await sut.execute({
            questionId: 'question-1',
            page: 1,
        });

        expect(result.value?.answers).toHaveLength(3)

    });


    it('should be able to fetch paginated question answers', async () => {
        for (let i = 1; i <= 22; i++) {
            await inMemoryAnswersRepository.create(

                makeAnswer({
                    questionId: new UniqueEntityID('question-1'),
                }),
            )
        }

        const result = await sut.execute({
            questionId: 'question-1',
            page: 2,
        });

        expect(result.value?.answers).toHaveLength(2)
    });
})