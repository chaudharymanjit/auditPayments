
let data = [];
data = loadFromStorage();

const idd = location.hash.substring(1);

const idx = data.findIndex(function (filt) {
    return filt.id == idd;
})

if (idx == -1) location.assign('/index.html');


const showTran = document.querySelector('#showTrans');
const detail = document.querySelector('#detail');
const addTran = document.querySelector('#addNew');


const renderTransactions = function (idx) {
    detail.textContent = '';

    detail.value = data[idx].Description;
    console.log(data[idx].Description);
}

addTran.addEventListener('submit', function (e) {

    e.preventDefault();

    give = loadvarFromStorage('giveAmount');
    take = loadvarFromStorage('takeAmount');

    console.log('First', give, take);

    let currTotal = data[idx].Total;
    let currReason = data[idx].Description;

    console.log(currTotal, currReason);

    console.log('TOTAL', currTotal);

    if (Number(currTotal) > 0) {
        console.log('pos');
        take = Number(take) - Number(currTotal);
        saveVarToStorage('takeAmount', take);
    }
    else {
        console.log('neg');
        give = Number(give) + Number(currTotal);
        saveVarToStorage('giveAmount', give);
    }

    console.log(give, take);


    let newamt = Number(e.target.elements.amount.value);
    let reason = e.target.elements.reason.value;


    if (Number(newamt) > 0) {
        data[idx].Take = Number(data[idx].Take) + Number(newamt);
    }
    else {
        data[idx].Give = Number(data[idx].Give) + Number(newamt);
    }

    let newTotal = Number(data[idx].Take) + Number(data[idx].Give);

    if (newTotal > 0) {
        take = Number(take) + Number(newTotal);
        saveVarToStorage('takeAmount', take);

    }

    else {
        give = Number(give) + (-1 * Number(newTotal));
        saveVarToStorage('giveAmount', give);
    }

    data[idx].Total = newTotal;

    const now = moment().format("MMM Do YYYY");
    console.log(reason);

    data[idx].Description = `${currReason}Date: ${now}      ₹ ${newamt}        ${reason}\n`;

    saveToStorage(data);

    e.target.elements.amount.value = '';
    e.target.elements.reason.value = '';

    if (showTran.textContent === 'Hide Transactions') renderTransactions(idx);
})

showTran.addEventListener('click', function (e) {

    if (showTran.textContent === 'Show Transactions') {

        detail.classList.remove('hidden');
        showTran.textContent = 'Hide Transactions'

        renderTransactions(idx);
    }

    else {
        detail.classList.add('hidden');
        showTran.textContent = 'Show Transactions'
    }
})

console.log(idd);
// console.log(currObj);
