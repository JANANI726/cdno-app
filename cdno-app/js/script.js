/* =========================
   CUSTOM CURSOR
   ========================= */
const cursor = document.querySelector(".cursor");


if (cursor) {
  document.addEventListener("mousemove", (e) => {
    cursor.style.left = `${e.clientX}px`;
    cursor.style.top = `${e.clientY}px`;
  });
}


/* =========================
   MOBILE MENU
   ========================= */
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");


if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");
  });
}


/* =========================
   REVEAL ON SCROLL
   ========================= */
const revealElements = document.querySelectorAll(".reveal");


const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    }
  });
}, { threshold: 0.15 });


revealElements.forEach(el => observer.observe(el));


/* =========================
   MAGNETIC BUTTONS
   ========================= */
document.querySelectorAll(".magnetic").forEach(button => {
  button.addEventListener("mousemove", (e) => {
    const rect = button.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    button.style.transform = `translate(${x * 0.12}px, ${y * 0.12}px)`;
  });


  button.addEventListener("mouseleave", () => {
    button.style.transform = "translate(0, 0)";
  });
});


/* =========================
   CTA TRACKING
   ========================= */
const launchBtn = document.getElementById("launchBtn");
if (launchBtn) {
  launchBtn.addEventListener("click", () => {
    saveAction("LAUNCH_APP", "User clicked Launch App");
  });
}


/* =========================
   CONTACT FORM
   ========================= */
const contactForm = document.getElementById("contactForm");


if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();


    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();


    if (!name || !email || !message) return;


    saveContact(name, email, message);
    saveAction("FORM_SUBMIT", `${name} submitted contact form`);


    window.location.href = "notifications.html";
  });
}