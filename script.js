'use strict';

let give = 0;
let take = 0;
let payees = [];
let sortBy = 'time';

give = loadvarFromStorage('giveAmount');
take = loadvarFromStorage('takeAmount');
payees = loadFromStorage();

const takeVal = document.querySelector('#Taken');
const giveVal = document.querySelector('#Given');

const table = document.querySelector('#userData');
const showbtn = document.querySelector('#showData');
const addPayee = document.querySelector('#addNew');
const searchBar = document.querySelector('#search');

giveVal.textContent = `₹ ${give}`;
takeVal.textContent = `₹ ${take}`;



showbtn.addEventListener('click', function (e) {
    if (table.classList.contains('hidden')) {
        table.classList.remove('hidden');
        e.target.textContent = 'Hide';

        renderData(payees);
    }

    else {
        table.classList.add('hidden');
        e.target.textContent = 'Show';
    }
})

addNew.addEventListener('submit', function (e) {

    e.preventDefault();
    let name = e.target.elements.name.value;
    let reason = e.target.elements.reason.value;
    let amt = e.target.elements.amount.value;
    let giv = 0;
    let tak = 0;

    console.log(amt);

    if (amt > 0) tak = amt;
    else giv = amt;

    let total = (Number(giv) + Number(tak));

    console.log(total);

    console.log(name, total);

    const now = moment().format("MMM Do YYYY");
    const timeStamp = moment().valueOf();

    if (name.length > 0 && total !== 0) {
        payees.push(
            {
                createdAt: timeStamp,
                id: uuidv4(),
                Name: name,
                Give: giv,
                Take: tak,
                Total: total,
                Description: `Transactions\n\nDate        Amount(₹)       Reason\n\nDate: ${now}        ₹ ${amt}        ${reason}\n`
            }
        )

        saveToStorage(payees);

        if (total > 0) {
            take = Number(take) + Number(total);
            takeVal.textContent = `₹ ${take}`;

            saveVarToStorage('takeAmount', take);
        }
        else {
            give = Number(give) + -1 * Number(total);
            giveVal.textContent = `₹ ${give}`;
            saveVarToStorage('giveAmount', give);
        }
    }

    if (showbtn.textContent === 'Hide') renderData(payees);

    e.target.elements.name.value = '';
    e.target.elements.reason.value = '';
    e.target.elements.amount.value = '';
})


searchBar.addEventListener('input', function (e) {
    let inp = e.target.value;

    searchResult(payees, inp);
})

document.querySelector('#dropDown').addEventListener('change', function (e) {
    sortBy = e.target.value;

    renderData(payees, sortBy);
})


