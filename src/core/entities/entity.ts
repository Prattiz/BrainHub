import { UniqueEntityID } from "./unique-entitie-id";

export class Entity<Props> {

    private _id: UniqueEntityID;
    protected props: Props;
    
    get ID(){ return this._id }

    protected constructor(props: Props, id?: UniqueEntityID){

        this.props = props
        this._id = id ?? new UniqueEntityID(id)
    }
}