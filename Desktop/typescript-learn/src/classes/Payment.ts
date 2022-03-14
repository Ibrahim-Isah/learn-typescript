import { HasFormatter } from "../interfaces/hasFormatter.js";

export class Payment implements HasFormatter{

    constructor(
        readonly receipient: string,
        private details: string,
        public amount: number
    ){}

    format(){
        return `${this.receipient} is owed N${this.amount} for ${this.details}`
    }
}