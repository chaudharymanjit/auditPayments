const loadFromStorage = function () {
    let defa = [];
    let recStr = localStorage.getItem('payees');

    if (recStr !== null) defa = JSON.parse(recStr);

    return defa;
}

const saveToStorage = function (payees) {
    localStorage.setItem('payees', JSON.stringify(payees));
}

const saveVarToStorage = function (str, vari) {
    localStorage.setItem(str, JSON.stringify(vari));
}

const loadvarFromStorage = function (str) {
    let defa = 0;
    let recStr = localStorage.getItem(str);

    if (recStr !== null) defa = JSON.parse(recStr);

    return defa;
}

const deleteEntry = function (idd, data, tot) {
    const idx = data.findIndex(function (filt) {
        return filt.id === idd;
    })

    if (idx > -1) {
        data.splice(idx, 1);
        renderData(data);
    }

    if (tot > 0) {
        take = Number(take) - Number(tot);
        takeVal.textContent = `₹ ${take}`;

        saveVarToStorage('takeAmount', take);
    }

    if (tot < 0) {
        give = Number(give) + Number(tot);
        giveVal.textContent = `₹ ${give}`;

        saveVarToStorage('giveAmount', give);
    }

    saveToStorage(data);
}

const searchResult = function (payees, inp) {

    document.querySelector('#tableData').innerHTML = '';

    const filter = payees.filter(function (filt) {
        return filt.Name.toLowerCase().includes(inp.toLowerCase()) || filt.Total.toString().includes(inp);
    })

    renderData(filter);
}

const sortData = function (data, sortBy) {
    if (sortBy === 'name') {
        return data.sort(function (a, b) {
            if (a.Name.toLowerCase() < b.Name.toLowerCase()) {
                return -1;
            }
            else if (a.Name.toLowerCase() > b.Name.toLowerCase()) {
                return 1;
            }
            else {
                return 0;
            }

        })
    }

    else if (sortBy === 'time') {
        return data.sort(function (a, b) {
            if (a.createdAt > b.createdAt) {
                return 1;
            }
            else if (a.createdAt > b.createdAt) {
                return -1;
            }
            else {
                return 0;
            }
        })
    }

    else {
        return data;
    }
}

const renderData = function (data, sortBy) {

    document.querySelector('#tableData').innerHTML = '';

    data = sortData(data, sortBy);

    for (i = 0; i < data.length; i++) {
        const name = document.createElement('a');
        name.href = `\details.html#${data[i].id}`
        name.textContent = data[i].Name;

        const btn = document.createElement('button');
        btn.classList.add('btn');
        btn.classList.add('chng');
        btn.textContent = 'x';

        let idd = data[i].id;
        let tot = data[i].Total;

        btn.addEventListener('click', function (e) {
            deleteEntry(idd, data, tot);
        })

        let give = data[i].Give;
        let take = data[i].Take;
        let total = data[i].Total;

        let tr = document.createElement("tr");
        tr.classList.add('extras')

        let namecell = document.createElement("td");
        let givecell = document.createElement("td");
        let takecell = document.createElement("td");
        let totalcell = document.createElement("td");
        let dltcell = document.createElement("td");

        namecell.appendChild(name);
        givecell.appendChild(document.createTextNode(give));
        takecell.appendChild(document.createTextNode(take));
        totalcell.appendChild(document.createTextNode(total));
        dltcell.appendChild(btn);

        tr.appendChild(namecell);
        tr.appendChild(givecell);
        tr.appendChild(takecell);
        tr.appendChild(totalcell);
        tr.appendChild(dltcell);

        document.getElementById('tableData').appendChild(tr);
    }
}