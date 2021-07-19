const billAmountBtn = document.getElementById('billAmount');
const tipBtns = document.getElementsByName('tip');
const customBtn = document.getElementById('custom');
const displayError1 = document.getElementById('error1');
const displayError2 = document.getElementById('error2');
const peopleCountBtn = document.getElementById('peopleCount');
const displayTipAmout = document.getElementById('tipAmount');
const displayTotal = document.getElementById('total');
const resetBtn = document.getElementById('resetButton');

let displayBill = {
    bill : false,
    tip : false,
    people: false,
    billAmount: 0,
    selectTip: 0,
    numberOfPeople: 0
};

// Bill processed and value displayed for the Tip Amount / person & Total / person
function processBill(){
    let count = 0;
    let tipAmount = 0;
    let tipAmountPerson = 0;
    let totalPerPerson = 0;
    for(const key in displayBill){
        if(displayBill[key] === true){
            count++;
            if(count == 3){
                tipAmount = displayBill.billAmount * displayBill.selectTip;
                tipAmountPerson = tipAmount / displayBill.numberOfPeople;
                displayTipAmout.innerText = parseFloat(tipAmountPerson).toFixed(2);
                totalPerPerson = (tipAmount + parseFloat(displayBill.billAmount)) / parseFloat(displayBill.numberOfPeople) ;
                displayTotal.innerText = parseFloat(totalPerPerson).toFixed(2);

                resetBtn.disabled = false;
            }
        }
    }
}

// Bill input validation
billAmountBtn.addEventListener('focusout',()=>{
    if(billAmountBtn.value == '') {
        billAmountBtn.parentElement.classList.remove('border-correct');
        billAmountBtn.parentElement.classList.add('border-danger');
        displayError1.classList.remove('hidden');

        displayBill.bill = false;
    }else {
        billAmountBtn.parentElement.classList.add('border-correct');
        billAmountBtn.parentElement.classList.remove('border-danger');
        displayError1.classList.add('hidden');
        
        displayBill.bill = true;
        displayBill.billAmount = billAmountBtn.value;
        processBill();
    }
})


// Select Tip Label and input validation with custom input
tipBtns.forEach((item, index) => {
    if(index != tipBtns.length-1){
        item.addEventListener('focusin', () => {
            tipBtns[tipBtns.length-1].nextElementSibling.classList.remove('hidden');
            customBtn.classList.add('hidden');
            customBtn.classList.remove('border-correct');
            customBtn.value = '';

            displayBill.tip = true;
            displayBill.selectTip = item.value;
            processBill();
        })
    }else {
        // Add/Remove the label of the Custom radio input
        item.addEventListener('focusin', () =>{
            item.nextElementSibling.classList.add('hidden');
            customBtn.classList.remove('hidden');
            customBtn.classList.add('border-correct');
            customBtn.focus();
        })  
    }
})

customBtn.addEventListener('focusout', () => {
    if(customBtn.value == ''){
        customBtn.classList.add('border-danger');
        customBtn.classList.remove('border-correct');

        displayBill.tip = false;
    }else {
        customBtn.classList.remove('border-danger');
        customBtn.classList.add('border-correct');

        displayBill.tip = true;
        displayBill.selectTip = customBtn.value / 100;
        processBill();
    }
})

// People Input validation
peopleCountBtn.addEventListener('focusout',()=>{
    if(peopleCountBtn.value == '') {
        peopleCountBtn.parentElement.classList.add('border-danger');
        peopleCountBtn.parentElement.classList.remove('border-correct');
        displayError2.classList.remove('hidden');

        displayBill.people = false;        
    }else{
        peopleCountBtn.parentElement.classList.remove('border-danger');
        peopleCountBtn.parentElement.classList.add('border-correct');
        displayError2.classList.add('hidden');
        
        displayBill.people = true;
        displayBill.numberOfPeople = peopleCountBtn.value;
        processBill();
    }
})

// reset everthing(input fields, displayed data)
resetButton.addEventListener('click', () => {
    billAmountBtn.value = customBtn.value = peopleCountBtn.value = '';
    displayTipAmout.innerText = 0.00;
    displayTotal.innerText = 0.00;
    resetBtn.disabled = true;
    tipBtns.forEach((item) => {
        item.checked = false;
    });
    customBtn.classList.add('hidden');
    tipBtns[tipBtns.length-1].nextElementSibling.classList.remove('hidden');

    displayBill = {
        bill : false,
        tip : false,
        people: false,
        billAmount: 0,
        selectTip: 0,
        numberOfPeople: 0
    };
});