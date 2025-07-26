const cards = document.querySelectorAll(".container > div");
const modal = document.getElementById("dashboard-modal");
const modalTitle = document.getElementById("modal-title");
const modalList = document.getElementById("modal-list");
const closeModalButton = document.getElementById("close-modal");

// Make the Dashboard Interactive
const modalContent = {
  goals: {
    title: '<i class="fas fa-bullseye"></i> Goals Completed',
    items: [
      "Drink 2L water",
      "Run 5 miles",
      "Sleep 8 hours",
      "Eat 5 servings of veggies",
    ],
  },
  respiration: {
    title: '<i class="fas fa-battery-three-quarters"></i> Respiration',
    items: [
      "Current: 16 breaths/min",
      "Normal range: 12-20 breaths/min",
      "Last check: Today",
    ],
  },
  miles: {
    title: '<i class="fas fa-running"></i> Recent Miles',
    items: ["Monday: 3 miles", "Wednesday: 2 miles", "Friday: 4 miles"],
  },
  temperature: {
    title: '<i class="fas fa-thermometer-half"></i> Temperature',
    items: ["Current: 37°C", "Normal range: 36-37°C", "Last check: Today"],
  },
  sleep: {
    title: '<i class="fas fa-bed"></i> Sleep Keep',
    items: ["Last night: 7h 45m", "Goal: 8h", "Sleep quality: Good"],
  },
  heartrate: {
    title: '<i class="fas fa-heartbeat"></i> Heart Rate',
    items: ["Current: 75 bpm", "Resting: 68 bpm", "Peak: 120 bpm"],
  },
  weight: {
    title: '<i class="fas fa-weight"></i> Weight',
    items: ["Current: 170 lbs", "Goal: 165 lbs", "Last check: Yesterday"],
  },
  fat: {
    title: '<i class="fas fa-percentage"></i> Fat Percentage',
    items: ["Current: 18%", "Target: 15%", "Last check: Yesterday"],
  },
  glucose: {
    title: '<i class="fas fa-vial"></i> Blood Glucose',
    items: ["Current: 90 mg/dl", "Range: 70-110 mg/dl", "Last check: Today"],
  },
  avg: {
    title: '<i class="fas fa-utensils"></i> AVG Consumption',
    items: ["Calories: 2080 kcal", "Protein: 120g", "Carbs: 250g", "Fat: 70g"],
  },
  workouts: {
    title: '<i class="fas fa-dumbbell"></i> Recent Workouts',
    items: ["Push-ups - 20 reps", "Running - 3 miles", "Yoga - 30 min"],
  },
  hydration: {
    title: '<i class="fas fa-tint"></i> Body Hydration',
    items: ["Current: 61%", "Target: 65%", "Tip: Drink more water!"],
  },
};

cards.forEach((card) => {
  card.addEventListener("click", () => {
    const metric = card.dataset.metric;
    if (!metric || !modalContent[metric]) return;

    modalTitle.innerHTML = modalContent[metric].title;
    modalList.innerHTML = modalContent[metric].items
      .map((item) => `<li>${item}</li>`)
      .join("");
    modal.showModal();
  });
});

closeModalButton.addEventListener("click", () => {
  modal.close();
});

modal.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.close();
  }
});
