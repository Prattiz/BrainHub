import { randomUUID } from "node:crypto";

import { Slug } from "./value-objects/slug";

interface QuestionProps{

    id: string;  
    slug: Slug;     
    title: string;
    authorId: string;
    content: string;
}

export class Question{

    public id: string;
    public title: string;
    public authorId: string;
    public slug: Slug;
    public content: string;
    

    constructor( props: QuestionProps, id?: string ){

        this.title = props.title;
        this.content = props.content;
        this.authorId = props.authorId;
        this.slug = props.slug;
        this.id = id ?? randomUUID();
    }
}