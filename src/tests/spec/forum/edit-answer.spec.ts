import { EditAnswerUseCase } from '@/domain/forum/application/use-cases/edit-answer';

import { InMemoryAnswerRepos } from '@/tests/config-tests/InMemory-Repository/forum/answer-repos';
import { makeAnswer } from '@/tests/config-tests/factories/forum/make-answer';

import { UniqueEntityID } from '@/core/entities/unique-entity-id';



import { NotAllowedError } from '@/core/errors/not-allowed-error';
import { InMemoryAnswerAttachmentsRepos } from '@/tests/config-tests/InMemory-Repository/forum/answer-attachment-repos';
import { makeAnswerAttachment } from '@/tests/config-tests/factories/forum/make-answer-attachment';


let inMemoryAnswersRepository: InMemoryAnswerRepos
let inMemoryAnswerAttachmentsRepository: InMemoryAnswerAttachmentsRepos
let sut: EditAnswerUseCase

describe('Edit Answer', () => {

    beforeEach(() => {

        inMemoryAnswerAttachmentsRepository = new InMemoryAnswerAttachmentsRepos()
        inMemoryAnswersRepository = new InMemoryAnswerRepos( inMemoryAnswerAttachmentsRepository)

        sut = new EditAnswerUseCase(
            inMemoryAnswersRepository,
            inMemoryAnswerAttachmentsRepository,
        )

    });

    it('should be able to edit a answer', async () => {

        const newAnswer = makeAnswer(
        {
            authorId: new UniqueEntityID('author-1'),
        },
            new UniqueEntityID('answer-1'),
        )

        await inMemoryAnswersRepository.create(newAnswer)

        inMemoryAnswerAttachmentsRepository.items.push(
            makeAnswerAttachment({
              answerId: newAnswer.ID,
              attachmentId: new UniqueEntityID('1'),
            }),
            makeAnswerAttachment({
              answerId: newAnswer.ID,
              attachmentId: new UniqueEntityID('2'),
            }),
          )

        await sut.execute({

            answerId: newAnswer.ID.toValue(),
            authorId: 'author-1',
            content: 'content test',
            attachmentsIds: []
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

        const result = await sut.execute({
            answerId: newAnswer.ID.toValue(),
            authorId: 'author-2', 
            content: 'trying to edit...',
            attachmentsIds: []
        });

        expect(result.isLeft()).toBe(true)
        expect(result.value).toBeInstanceOf(NotAllowedError)

    });

})