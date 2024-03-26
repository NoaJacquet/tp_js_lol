export default class Note{

    #id;
    #notation;
    #idChampion;

    constructor(id, notation, idChampion){
        this.#id = id;
        this.#notation = notation;
        this.#idChampion = idChampion;
    }

    get id(){
        return this.#id;
    }

    get notation(){
        return this.#notation;
    }

    get idChampion(){
        return this.#idChampion;
    }

    set id(id){
        this.#id = id;
    }

    set notation(notation){
        this.#notation = notation;
    }

    set idChampion(idChampion){
        this.#idChampion = idChampion;
    }

    toString(){
        return `id : ${this.#id}, notation : ${this.#notation}, idChampion : ${this.#idChampion}`;
    }
}