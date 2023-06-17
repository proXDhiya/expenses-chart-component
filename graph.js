const cols = document.querySelectorAll('.col');
const balance = document.querySelector('[data-balance]');
const total = document.querySelector('[data-total]');
const per = document.querySelector('[data-per]');

const data = [
    {
      "day": "mon",
      "amount": 17.45
    },
    {
      "day": "tue",
      "amount": 34.91
    },
    {
      "day": "wed",
      "amount": 52.36
    },
    {
      "day": "thu",
      "amount": 31.07
    },
    {
      "day": "fri",
      "amount": 23.39
    },
    {
      "day": "sat",
      "amount": 43.28
    },
    {
      "day": "sun",
      "amount": 29.48
    }
];

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
