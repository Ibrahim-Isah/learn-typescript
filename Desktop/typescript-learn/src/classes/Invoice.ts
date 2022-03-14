import { HasFormatter } from "../interfaces/hasFormatter.js";

export class Invoice implements HasFormatter{
    // client: string;
    // details: string;
    // amount: number;

    // constructor(c: string, d: string, a: number){
    //     this.client = c;
    //     this.details = d;
    //     this.amount = a;
    // }

    constructor(
        readonly client: string,
        private details: string,
        public amount: number
    ){}

    format(){
        return `${this.client} owes N${this.amount} for ${this.details}`
    }
}