const cols = document.querySelectorAll('.col');
const balance = document.querySelector('[data-balance]');
const total = document.querySelector('[data-total]');
const per = document.querySelector('[data-per]');

// read data from ./data.json
let xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        // parse JSON data
        const data = JSON.parse(this.responseText);

        // check if data is complete
        if(data.length !== 7) {
            alert("Data is not complete");
            console.log("Data is not complete");
            return;
        }

        // get Max index and value
        let max = {
            index: 0,
            value: data[0].amount
        };
        for(let i = 1; i < data.length; i++) {
            if(data[i].amount > max.value) {
                max.index = i;
                max.value = data[i].amount;
            }
        }

        // set height of each column
        for(let i = 0; i < data.length; i++) {
            setInterval(()=> {
                cols[i].children[0].style.height = (data[i].amount / max.value * 100) + "%";
                cols[i].children[1].innerHTML = data[i].day;
                cols[i].children[0].children[0].innerHTML = "$" + data[i].amount;
                if(i === max.index)
                    cols[i].children[0].id = "max";
                else
                    cols[i].children[0].id = "";
            }, 150 * i);
        }
    }
}
xhttp.open("GET", "data.json", true);
xhttp.send();

// increment balance
let balanceValue = 0.00;
const maxBalance = balance.dataset.balance;
setInterval(()=> {
    if(balanceValue < maxBalance) {
        balanceValue += 3.01;
        balance.innerHTML = "$" + balanceValue.toFixed(2);
    } else {
        balance.innerHTML = "$" + maxBalance;
    }
}, 2);

// increment total
let totalValue = 0.00;
const maxTotal = total.dataset.total;
setInterval(()=> {
    if(totalValue < maxTotal) {
        totalValue += 1.51;
        total.innerHTML = "$" + totalValue.toFixed(2);
    } else {
        total.innerHTML = "$" + maxTotal;
    }
}, 2);

// increment percentage
let perValue = 0;
const maxPer = per.dataset.per;
setInterval(()=> {
    if(perValue < maxPer) {
        perValue += 0.1;
        perValue = Math.round(perValue * 10) / 10;
        per.innerHTML = "+" + perValue + "%";
    } else {
        per.innerHTML = "+" + maxPer + "%";
    }
}, 30);
