let recycledItems = 0;
let rewardPoints = 0;
let target = 0;

function addItem() {
  recycledItems++;
  rewardPoints += 5; // 5 points per item
  document.getElementById("recycledCount").textContent = recycledItems;
  document.getElementById("rewardPoints").textContent = rewardPoints;

  updateLevelBar();
  checkTarget();
}

function setTarget() {
  const input = document.getElementById("targetInput").value;
  target = parseInt(input);
  if (isNaN(target) || target <= 0) {
    alert("Please enter a valid target.");
    return;
  }
  document.getElementById("targetStatus").textContent = `Target set to ${target} items.`;
  checkTarget();
}

function updateLevelBar() {
  let percent = Math.min((recycledItems / 20) * 100, 100); // Level cap logic
  document.getElementById("levelBar").value = percent;

  const level = Math.floor(recycledItems / 10) + 1;
  document.getElementById("levelText").textContent = `Level ${level}`;
}

function checkTarget() {
  if (target > 0) {
    const status = recycledItems >= target
      ? "🎉 Target achieved!"
      : `${target - recycledItems} items left to target.`;
    document.getElementById("targetStatus").textContent = status;
  }
}
function loadLeaderboard() {
  const data = [
    { name: "Komal Kumari", points: 75 },
    { name: "Ravi Sharma",  points: 65 },
    { name: "Pooja Verma",  points: 50 },
    { name: "Aman Yadav",  points: 45 }
  ];

  data.sort((a, b) => b.points - a.points);

  const tbody = document.getElementById("leaderboardBody");
  tbody.innerHTML = "";
  data.forEach((student, index) => {
    const row = `<tr>
      <td>${index + 1}</td>
      <td>${student.name}</td>
    
      <td>${student.points}</td>
    </tr>`;
    tbody.innerHTML += row;
  });
}
// Quotes
const quotes = [
  "Recycling is a gift to our planet. Let’s wrap it with action.",
  "Be the change. Recycle today for a cleaner tomorrow.",
  "Small steps towards recycling lead to giant leaps for Earth.",
  "Waste is only waste if we waste it.",
  "Green is not just a color—it's a lifestyle.",
  "The Earth is what we all have in common. Protect it."
];

// Refresh quote
document.getElementById("refreshQuote").addEventListener("click", () => {
  const newQuote = quotes[Math.floor(Math.random() * quotes.length)];
  document.getElementById("quote").textContent = newQuote;
  document.getElementById("footerQuote").textContent = newQuote;
});

// Search functionality
function searchStudent() {
  const input = document.getElementById("searchInput").value.toLowerCase();
  const students = document.querySelectorAll("#leaderboard-list li");
  let found = false;

  students.forEach(student => {
    const enroll = student.getAttribute("data-enroll").toLowerCase();
    const match = enroll.includes(input);
    student.style.display = match ? "" : "none";
    if (match) found = true;
  });

  document.getElementById("noData").style.display = found ? "none" : "block";
}



// Call on page load
loadLeaderboard();