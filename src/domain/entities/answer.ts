import { randomUUID } from "node:crypto";

export class Answer{

    public id: string;
    public content: string;
    public authorId: string;

    constructor( content: string, authorId: string, id?: string ){

        
        this.content = content;
        this.authorId = authorId;
        this.id = id ?? randomUUID();
    }
}