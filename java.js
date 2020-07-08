const cardsContainer = document.querySelector(".cards-container");
const current = document.getElementById("current");
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");
const qustion = document.getElementById("question");
const answer = document.getElementById("answer");
const addNewBtn = document.querySelector(".addNewBtn");
const addContainer = document.querySelector(".add-container");
const smallBtn = document.querySelector(".small");
const addCard = document.getElementById("addCard");
// const cardsData = [
//   { question: "what is your name?", answer: "James" },
//   { question: "where are you from?", answer: "Korea" },
//   { question: "how old are you?", answer: "24" },
// ];
const cardsData = getFromLs();
// 이거 const 빼먹고 씀
let arrIndexNum = 0;
let cardsArr = [];
function showCardsData() {
  cardsData.forEach((data, index) => handleData(data, index));
}

function handleData(data, index) {
  const card = document.createElement("div");
  cardsArr.push(card);
  card.classList.add("card");
  cardsContainer.appendChild(card);
  card.innerHTML = `<div class="inner-card">
        <div class="card-front"><p>${data.question}</p></div>
        <div class="card-back"><p>${data.answer}</p></div>
      </div>`;

  card.addEventListener("click", () => card.classList.toggle("show-answer"));
  if (index === 0) {
    card.classList.add("active");
  }
  cardNumber();
}
function cardNumber() {
  current.innerText = `${arrIndexNum + 1} / ${cardsArr.length}`;
}
nextBtn.addEventListener("click", () => {
  cardsArr[arrIndexNum].className = "card left";
  arrIndexNum = arrIndexNum + 1;
  if (arrIndexNum > cardsArr.length - 1) {
    arrIndexNum = cardsArr.length - 1;
  }
  cardsArr[arrIndexNum].className = "card active";
  cardNumber();
});
prevBtn.addEventListener("click", () => {
  cardsArr[arrIndexNum].className = "card right";
  arrIndexNum = arrIndexNum - 1;
  if (arrIndexNum < 0) {
    arrIndexNum = 0;
  }
  cardsArr[arrIndexNum].className = "card active";
  cardNumber();
});
function getFromLs() {
  // 이렇게 쓰는 방법 익히기
  const cards = JSON.parse(localStorage.getItem("cards"));
  return cards === null ? [] : cards;
}
function saveToLs(cards) {
  localStorage.setItem("cards", JSON.stringify(cards));
  window.location.reload();
}
showCardsData();
function inputInfo() {
  addCard.addEventListener("click", () => {
    if (question.value.trim() && answer.value.trim()) {
      const questionV = question.value;
      const answerV = answer.value;
      const inputData = { questionV, answerV };
      handleData(inputData);
      question.value = "";
      answer.value = "";
      addContainer.classList.remove("show");
      // 밑에 두 라인 뺴먹음
      cardsData.push(inputData);
      setToLs(cardsData);
    } else {
      alert("Input Something...");
    }
  });
}
inputInfo();
addNewBtn.addEventListener("click", () => {
  addContainer.className = "add-container show";
});
smallBtn.addEventListener("click", () => {
  addContainer.classList.remove("show");
});
