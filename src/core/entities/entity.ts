import { UniqueEntityID } from "./unique-entity-id";


export abstract class Entity<Props> {

    private _id: UniqueEntityID;
    protected props: Props;
    
    get ID(){ return this._id }

    protected constructor(props: Props, id?: UniqueEntityID){

        this.props = props
        this._id = id ?? new UniqueEntityID(id)
    }

    public equals(entity: Entity<any>){
        
        if(entity === this){
            return true
        }

        if(entity.ID === this._id){
            return true
        }

        return false
    }
}