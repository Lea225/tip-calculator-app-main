document.addEventListener('DOMContentLoaded', () => {
    const billInput = document.getElementById('bill');
    const tips = document.querySelectorAll('.tips p');
    const customTipInput = document.querySelector('.tips .custom');
    const peopleInput = document.getElementById('nbrOfPeople');
    const tipAmount = document.getElementById('tipAmount');
    const totalAmount = document.getElementById('total');
    const resetBtn = document.querySelector('.cta');
    const errorMessage = document.querySelector('.error-message');

    let billValue = 0;
    let tipPercentage = 0;
    let numberOfPeople = 1;

    function calculateTip() {
        const bill = parseFloat(billInput.value);
        const tip = tipPercentage / 100;
        const people = parseFloat(peopleInput.value);

        if (isNaN(bill) || bill <= 0) {
            errorMessage.style.display = 'block';
            return;
        } else if (isNaN(people) || people <= 0) {
            errorMessage.style.display = 'block';
            peopleInput.classList.add('input-error');
            return;
        }

        errorMessage.style.display = 'none';
        peopleInput.classList.remove('input-error');

        const tipPerPerson = (bill * tip) / people;
        const totalPerPerson = (bill + (bill * tip)) / people;

        tipAmount.textContent = `$${tipPerPerson.toFixed(2)}`;
        totalAmount.textContent = `$${totalPerPerson.toFixed(2)}`;
    }

    billInput.addEventListener('input', calculateTip);

    tips.forEach((tip) => {
        tip.addEventListener('click', (e) => {
            tips.forEach((t) => t.classList.remove('active', 'tip-active'));
            e.target.classList.add('active', 'tip-active');

            if (e.target.textContent === '5%') {
                tipPercentage = 5;
            } else if (e.target.textContent === '10%') {
                tipPercentage = 10;
            } else if (e.target.textContent === '15%') {
                tipPercentage = 15;
            } else if (e.target.textContent === '25%') {
                tipPercentage = 25;
            } else if (e.target.textContent === '50%') {
                tipPercentage = 50;
            }

            calculateTip();
        });
    });

    customTipInput.addEventListener('input', (e) => {
        if (e.target.value) {
            tipPercentage = parseFloat(e.target.value);
            calculateTip();
        }
    });

    peopleInput.addEventListener('input', calculateTip);

    resetBtn.addEventListener('click', () => {
        billInput.value = '';
        tips.forEach((tip) => tip.classList.remove('active', 'tip-active'));
        customTipInput.value = '';
        peopleInput.value = '';
        tipAmount.textContent = '$0.00';
        totalAmount.textContent = '$0.00';
        errorMessage.style.display = 'none';
        peopleInput.classList.remove('input-error');
    });
});
