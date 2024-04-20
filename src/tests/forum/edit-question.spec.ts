import { EditQuestionUseCase } from '@/domain/forum/application/use-cases/edit-question';

import { InMemoryQuestionRepos } from '@/config-tests/InMemory-Repository/forum/question-repos';
import { makeQuestion } from '@/config-tests/factories/forum/make-question';

import { UniqueEntityID } from '@/core/entities/unique-entity-id';

import { InMemoryQuestionAttachmentsRepos } from '@/config-tests/InMemory-Repository/forum/question-attachment-repos';

import { NotAllowedError } from '@/core/errors/not-allowed-error';
import { makeQuestionAttachment } from '@/config-tests/factories/forum/make-question-attachment';


let inMemoryQuestionsRepository: InMemoryQuestionRepos
let inMemoryQuestionAttachmentsRepository: InMemoryQuestionAttachmentsRepos
let sut: EditQuestionUseCase

describe('Edit Question', () => {

    beforeEach(() => {
        
        inMemoryQuestionsRepository = new InMemoryQuestionRepos(inMemoryQuestionAttachmentsRepository)
        inMemoryQuestionAttachmentsRepository = new InMemoryQuestionAttachmentsRepos()

        sut = new EditQuestionUseCase(
            inMemoryQuestionsRepository,
            inMemoryQuestionAttachmentsRepository,
        )
    });

    it('should be able to edit a question', async () => {

        const newQuestion = makeQuestion(
        {
            authorId: new UniqueEntityID('author-1'),
        },
            new UniqueEntityID('question-1'),
        )

        await inMemoryQuestionsRepository.create(newQuestion)

        inMemoryQuestionAttachmentsRepository.items.push(

            makeQuestionAttachment({
              questionId: newQuestion.ID,
              attachmentId: new UniqueEntityID('1'),
            }),

            makeQuestionAttachment({
              questionId: newQuestion.ID,
              attachmentId: new UniqueEntityID('2'),
            }),
        )

        await sut.execute({

            questionId: newQuestion.ID.toValue(),
            authorId: 'author-1',
            title: 'question test',
            content: 'content test',
            attachmentsIds: ['1', '3'],
        })

        
        expect( inMemoryQuestionsRepository.items[0].attachment.currentItems ).toHaveLength(2)

        expect( inMemoryQuestionsRepository.items[0] ).toMatchObject({
            
            title: 'question test',
            content: 'content test',
        })

        expect( inMemoryQuestionsRepository.items[0].attachment.currentItems ).toEqual([
            
            expect.objectContaining({ attachmentId: new UniqueEntityID('1') }),
            expect.objectContaining({ attachmentId: new UniqueEntityID('3') }),
        ])

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
            title: 'edited title',
            attachmentsIds: [],
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

        const result = await sut.execute({
            questionId: newQuestion.ID.toValue(),
            authorId: 'author-2',
            attachmentsIds: [],
             // other user
            //....
        })

        expect(result.isLeft()).toBe(true)
        expect(result.value).toBeInstanceOf(NotAllowedError)

    });

})