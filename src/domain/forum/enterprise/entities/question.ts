import { Slug } from "./value-objects/slug";
import { QuestionAttachment } from "./question-attachment";

import { AggregateRoot } from "@/core/entities/agregate-root";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { Optional } from "@/core/entities/optional";

import dayjs from "dayjs";

export interface QuestionProps{

    slug: Slug;     
    title: string;
    authorId: UniqueEntityID;
    content: string;
    bestAnswerId?: UniqueEntityID,
    attachment: QuestionAttachment[]
    createdAt: Date,
    updatedAt?: Date,
}

export class Question extends AggregateRoot<QuestionProps>{

    get authorId() { return this.props.authorId }
    
    get bestAnswerId() { return this.props.bestAnswerId }
  
    get title() { return this.props.title }
  
    get content() { return this.props.content }
  
    get slug() { return this.props.slug }
  
    get attachment() { return this.props.attachment }

    get createdAt() { return this.props.createdAt }
  
    get updatedAt() { return this.props.updatedAt }
  
    get isNew(): boolean { return dayjs().diff(this.createdAt, 'days') <= 3 }

    get except() {
      return this.content
        .substring(0, 120)
        .trimEnd()
        .concat('...')
    }

  
    private touch() {
      this.props.updatedAt = new Date()
    }

  
    set title(title: string) {
      this.props.title = title
      this.props.slug = Slug.createFromText(title)
  
      this.touch()
    }
  
    set content(content: string) {
      this.props.content = content
      this.touch()
    }
  
    set bestAnswerId(bestAnswerId: UniqueEntityID | undefined) {
      this.props.bestAnswerId = bestAnswerId
      this.touch()
    }

    set attachments(attachments: QuestionAttachment[]) {
      this.props.attachment = attachments
    }


    static create( props: Optional<QuestionProps, 'createdAt' | 'slug' | 'attachment'>, id?: UniqueEntityID) {

        const question = new Question({

            ...props,
            slug: props.slug ?? Slug.createFromText(props.title),
            attachment: props.attachment ?? [],
            createdAt: props.createdAt ?? new Date
        }, id)

        return question
    }
}