import { Invoice } from "./classes/Invoice.js";
import { Payment } from "./classes/Payment.js";
import { HasFormatter } from "./interfaces/hasFormatter.js";

const form = document.querySelector('.new-item-form') as HTMLFormElement;

const type = document.querySelector('#type') as HTMLSelectElement;
const toFrom = document.querySelector('#tofrom') as HTMLInputElement
const details = document.querySelector('#details') as HTMLInputElement
const amount = document.querySelector('#amount') as HTMLInputElement

let docOne: HasFormatter;
let docTwo: HasFormatter;

let docs: HasFormatter[] = [];

docOne = new Invoice('Isah' , 'doings things' , 400);
docTwo = new Payment('Maimuna' , 'doings things website' , 200);


docs.push(docOne)
docs.push(docTwo)

console.log('this the docs' , docs)

form.addEventListener('submit' , (e: Event) => {
    e.preventDefault();

    let doc: HasFormatter;

    if(type.value === 'invoice'){
         doc =new Invoice(toFrom.value, details.value, amount.valueAsNumber)
    } else {
         doc =new Payment(toFrom.value, details.value, amount.valueAsNumber)
    }
    console.log(
        doc
    )
})