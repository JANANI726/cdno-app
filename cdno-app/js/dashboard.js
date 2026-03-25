let currentContext = getContextPreference();


/* =========================================================
   30+ INDIAN-BASED NOTIFICATIONS
   ========================================================= */
const notifications = [
  { title: "Anna University Internal Marks Updated", category: "academic", source: "Academic Portal", type: "exam", time: "2 min ago" },
  { title: "Placement Drive Reminder - TCS NQT", category: "career", source: "Placement Cell", type: "career", time: "12 min ago" },
  { title: "WhatsApp: Department Group - 56 Messages", category: "social", source: "WhatsApp", type: "social", time: "5 min ago" },
  { title: "UPI Debit Alert ₹2,499", category: "finance", source: "Google Pay", type: "finance", time: "8 min ago" },
  { title: "Train PNR Status Updated", category: "travel", source: "IRCTC", type: "travel", time: "15 min ago" },
  { title: "Instagram: 14 New Likes", category: "social", source: "Instagram", type: "social", time: "22 min ago" },
  { title: "Hostel Fee Payment Deadline Tomorrow", category: "academic", source: "College Admin", type: "deadline", time: "28 min ago" },
  { title: "Swiggy: Your order is arriving", category: "utility", source: "Swiggy", type: "utility", time: "31 min ago" },
  { title: "Gmail: Internship Shortlist Mail", category: "career", source: "Gmail", type: "career", time: "40 min ago" },
  { title: "Telegram: Coding Group Shared Resource", category: "social", source: "Telegram", type: "social", time: "44 min ago" },
  { title: "Exam Hall Ticket Released", category: "academic", source: "Academic Portal", type: "exam", time: "51 min ago" },
  { title: "LinkedIn: Recruiter Viewed Your Profile", category: "career", source: "LinkedIn", type: "career", time: "1 hr ago" },
  { title: "Airtel: Daily Data Limit 90% Used", category: "utility", source: "Airtel", type: "utility", time: "1 hr ago" },
  { title: "WhatsApp: Family Group - 103 Messages", category: "social", source: "WhatsApp", type: "social", time: "1 hr ago" },
  { title: "Project Review Meeting at 4 PM", category: "career", source: "Calendar", type: "meeting", time: "1 hr ago" },
  { title: "Library Fine Reminder", category: "academic", source: "Library Portal", type: "deadline", time: "1 hr ago" },
  { title: "PhonePe Cashback Received", category: "finance", source: "PhonePe", type: "finance", time: "1 hr ago" },
  { title: "Moodle Assignment Deadline Tonight", category: "academic", source: "Moodle", type: "deadline", time: "2 hr ago" },
  { title: "IRCTC Waitlist Confirmed", category: "travel", source: "IRCTC", type: "travel", time: "2 hr ago" },
  { title: "YouTube: New Video from Subscribed Channel", category: "social", source: "YouTube", type: "social", time: "2 hr ago" },
  { title: "Scholarship Verification Pending", category: "academic", source: "College Admin", type: "deadline", time: "2 hr ago" },
  { title: "Gmail: Interview Round Scheduled", category: "career", source: "Gmail", type: "career", time: "2 hr ago" },
  { title: "Paytm Wallet Low Balance", category: "finance", source: "Paytm", type: "finance", time: "3 hr ago" },
  { title: "WhatsApp: Friends Trip Planning", category: "social", source: "WhatsApp", type: "social", time: "3 hr ago" },
  { title: "NPTEL Assignment Deadline Reminder", category: "academic", source: "NPTEL", type: "deadline", time: "3 hr ago" },
  { title: "Google Calendar: Hackathon Submission", category: "career", source: "Calendar", type: "deadline", time: "3 hr ago" },
  { title: "Amazon Delivery Out for Delivery", category: "utility", source: "Amazon", type: "utility", time: "4 hr ago" },
  { title: "LinkedIn: 5 New Job Matches", category: "career", source: "LinkedIn", type: "career", time: "4 hr ago" },
  { title: "WhatsApp: College Culturals Group Active", category: "social", source: "WhatsApp", type: "social", time: "4 hr ago" },
  { title: "Bank OTP Requested", category: "finance", source: "SBI", type: "finance", time: "4 hr ago" },
  { title: "Attendance Shortage Warning", category: "academic", source: "ERP", type: "deadline", time: "5 hr ago" },
  { title: "Mess Menu Updated", category: "utility", source: "Hostel App", type: "utility", time: "5 hr ago" }
];


/* =========================================================
   PRIORITY ENGINE
   ========================================================= */
function calculatePriority(notification, context) {
  let score = 0;


  // Base category score
  if (notification.category === "academic") score += 7;
  if (notification.category === "career") score += 6;
  if (notification.category === "finance") score += 7;
  if (notification.category === "utility") score += 3;
  if (notification.category === "travel") score += 4;
  if (notification.category === "social") score += 1;


  // Type boosts
  if (notification.type === "deadline") score += 3;
  if (notification.type === "exam") score += 4;
  if (notification.type === "meeting") score += 3;
  if (notification.type === "finance") score += 4;


  // Context modifiers
  if (context === "work") {
    if (notification.category === "academic") score += 2;
    if (notification.category === "career") score += 3;
    if (notification.category === "social") score -= 3;
  }


  if (context === "sleep") {
    if (notification.category === "social") score -= 4;
    if (notification.category === "utility") score -= 1;
    if (notification.category === "finance") score += 2;
    if (notification.type === "deadline") score += 1;
  }


  if (context === "weekend") {
    if (notification.category === "social") score += 2;
    if (notification.category === "career") score -= 1;
  }


  if (score >= 11) return "HIGH";
  if (score >= 6) return "MEDIUM";
  return "LOW";
}


function rankNotifications(data, context) {
  return data.map(item => {
    const priority = calculatePriority(item, context);
    let priorityWeight = priority === "HIGH" ? 3 : priority === "MEDIUM" ? 2 : 1;


    return {
      ...item,
      priority,
      priorityWeight
    };
  }).sort((a, b) => b.priorityWeight - a.priorityWeight);
}


/* =========================================================
   ELEMENTS
   ========================================================= */
const notificationList = document.getElementById("notificationList");
const historyList = document.getElementById("historyList");
const categoryFilter = document.getElementById("categoryFilter");
const priorityFilter = document.getElementById("priorityFilter");


const totalCount = document.getElementById("totalCount");
const highCount = document.getElementById("highCount");
const mediumCount = document.getElementById("mediumCount");
const lowCount = document.getElementById("lowCount");


/* =========================================================
   RENDER NOTIFICATIONS
   ========================================================= */
function renderNotifications() {
  let ranked = rankNotifications(notifications, currentContext);


  const selectedCategory = categoryFilter.value;
  const selectedPriority = priorityFilter.value;


  if (selectedCategory !== "all") {
    ranked = ranked.filter(n => n.category === selectedCategory);
  }


  if (selectedPriority !== "all") {
    ranked = ranked.filter(n => n.priority === selectedPriority);
  }


  notificationList.innerHTML = "";


  ranked.forEach((notification, index) => {
    const card = document.createElement("div");
    card.className = "notification-card";


    const badgeClass =
      notification.priority === "HIGH"
        ? "priority-high"
        : notification.priority === "MEDIUM"
        ? "priority-medium"
        : "priority-low";


    card.innerHTML = `
      <div class="notification-top">
        <h3>#${index + 1} ${notification.title}</h3>
        <span class="priority-badge ${badgeClass}">${notification.priority}</span>
      </div>
      <div class="notification-meta">
        <span>${notification.source}</span>
        <span>${notification.category}</span>
        <span>${notification.time}</span>
        <span>Context: ${currentContext}</span>
      </div>
    `;


    notificationList.appendChild(card);
  });


  updateSummary(rankNotifications(notifications, currentContext));
}


/* =========================================================
   SUMMARY
   ========================================================= */
function updateSummary(ranked) {
  totalCount.textContent = ranked.length;
  highCount.textContent = ranked.filter(n => n.priority === "HIGH").length;
  mediumCount.textContent = ranked.filter(n => n.priority === "MEDIUM").length;
  lowCount.textContent = ranked.filter(n => n.priority === "LOW").length;
}


/* =========================================================
   HISTORY
   ========================================================= */
function renderHistory() {
  const history = getHistory();
  historyList.innerHTML = "";


  if (!history.length) {
    historyList.innerHTML = `
      <div class="history-card">
        <p>No history yet. Run the engine first. Empty dashboards are not a feature.</p>
      </div>
    `;
    return;
  }


  history.slice(0, 5).forEach(item => {
    const card = document.createElement("div");
    card.className = "history-card";
    card.innerHTML = `
      <h3>${item.context.toUpperCase()} Mode Run</h3>
      <p>${item.createdAt}</p>
      <p>${item.notifications.length} notifications processed</p>
    `;
    historyList.appendChild(card);
  });
}


/* =========================================================
   MODE SWITCH
   ========================================================= */
document.querySelectorAll(".mode-btn").forEach(btn => {
  if (btn.dataset.mode === currentContext) {
    btn.classList.add("active");
  }


  btn.addEventListener("click", () => {
    document.querySelectorAll(".mode-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");


    currentContext = btn.dataset.mode;
    setContextPreference(currentContext);
    saveAction("MODE_CHANGE", `Switched to ${currentContext}`);
    renderNotifications();
  });
});


/* =========================================================
   FILTERS
   ========================================================= */
categoryFilter.addEventListener("change", renderNotifications);
priorityFilter.addEventListener("change", renderNotifications);


/* =========================================================
   RUN ENGINE
   ========================================================= */
document.getElementById("runEngineBtn").addEventListener("click", () => {
  const ranked = rankNotifications(notifications, currentContext);
  saveHistory(currentContext, ranked);
  saveAction("ENGINE_RUN", `Ranking engine executed in ${currentContext} mode`);
  renderNotifications();
  renderHistory();
});


/* =========================================================
   INIT
   ========================================================= */
renderNotifications();
renderHistory();