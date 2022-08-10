const billElement = document.getElementById("billAmount");
const totalBillElement = document.getElementById("totalBillAmount");
const tipElement = document.getElementById("tipAmount");
const noPpl = document.getElementById("noOfPeople");

billElement.addEventListener("keyup", calculateBill);
tipElement.addEventListener("keyup", calculateBill);
addButton.addEventListener("click", addCount);
subButton.addEventListener("click", subCount);

function calculateBill() {
  let tipAmount = Number(tipElement.value);
  let pplCount = Number(noPpl.textContent);
  let billAmount = Number(billElement.value);

  if (isNaN(billAmount) || billAmount === 0) {
    return;
  }
  if (isNaN(tipAmount) || tipAmount === 0) {
    tipAmount = 10;
  }

  totalBillElement.value = (billAmount + tipAmount) / pplCount;
}

function subCount() {
  let pplCount = Number(noPpl.textContent);
  if (pplCount > 1) {
    pplCount--;
  }
  noPpl.textContent = pplCount;
  calculateBill();
}

function addCount() {
  let pplCount = Number(noPpl.textContent);
  pplCount++;
  noPpl.textContent = pplCount;
  calculateBill();
}
