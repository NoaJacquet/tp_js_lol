export default class Note{

    static lastId = 0;

    id;
    notation;
    idChampion;

    constructor(notation, idChampion){
        this.id = Note.lastId +1;
        Note.lastId += 1;
        this.notation = notation;
        this.idChampion = idChampion;
    }

    get id(){
        return this.id;
    }

    get notation(){
        return this.notation;
    }

    get idChampion(){
        return this.idChampion;
    }

    set id(id){
        this.id = id;
    }

    set notation(notation){
        this.notation = notation;
    }

    set idChampion(idChampion){
        this.idChampion = idChampion;
    }

    toString(){
        return `id : ${this.id}, notation : ${this.notation}, idChampion : ${this.idChampion}`;
    }
}