const cards = document.querySelectorAll(".info-card");
const infoCard = document.querySelector(".info-card");
const cardsBody = document.querySelectorAll(".card-body");
const timeBtns = document.querySelectorAll(".report-details button");

async function fetchData(params) {
  const res = await fetch("data.json");
  const data = await res.json();
  showData(data);
  showWeeklyData(data);
}

function showData(data) {

  timeBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      if (btn.textContent === "Daily") {
        showDailyData(data);
      } else if (btn.textContent === "Weekly") {
        showWeeklyData(data);
      } else {
        showMonthlyData(data);
      }
    });
  });

  // Highlight the choosen button in Report card
  timeBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      timeBtns.forEach((btn) => {
        btn.classList.remove("active");
        e.target.classList.add("active");
      });
    });
  });

  cardsBody.forEach((card) => {
    card.addEventListener("click", (e) => {
      cardsBody.forEach((card) => {
        card.classList.remove('hover')
        if(e.target.classList.contains('card-body'))  {
          e.target.classList.add('hover')
        }
      });
    });
  });
}

function showDailyData(data) {
  cardsBody.forEach((card, index) => {
    card.innerHTML = `
            <div class="card-title">
              <p>${data[index].title}</p>
              <img src="img/icon-ellipsis.svg" alt="" />
            </div>
            <div class="total-hours">
              <span>${data[index].timeframes.daily.current}hrs</span>
              <small>Last Day - ${data[index].timeframes.daily.previous}hrs</small>
            </div>
        `;
    cards[index].appendChild(card);
  });
}

function showWeeklyData(data) {
  cardsBody.forEach((card, index) => {
    card.innerHTML = `
            <div class="card-title">
              <p>${data[index].title}</p>
              <img src="img/icon-ellipsis.svg" alt="" />
            </div>
            <div class="total-hours">
              <span>${data[index].timeframes.weekly.current}hrs</span>
              <small>Last Week - ${data[index].timeframes.weekly.previous}hrs</small>
            </div>
        `;
    cards[index].appendChild(card);
  });
}
function showMonthlyData(data) {
  cardsBody.forEach((card, index) => {
    card.innerHTML = `
            <div class="card-title">
              <p>${data[index].title}</p>
              <img src="img/icon-ellipsis.svg" alt="" />
            </div>
            <div class="total-hours">
              <span>${data[index].timeframes.monthly.current}hrs</span>
              <small>Last Month - ${data[index].timeframes.monthly.previous}hrs</small>
            </div>
        `;
    cards[index].appendChild(card);
  });
}

fetchData();
