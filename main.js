/* ============================================================
   main.js — WCE Homepage Scripts
   Walchand College of Engineering, Sangli
   ============================================================ */

/* ══════════════════════════════════════════
   CHATBOT — Toggle, Message Handling & Responses
   ══════════════════════════════════════════ */

/**
 * Toggle the chatbot popup window open/closed.
 * Hides the notification badge when opened.
 */
function toggleChat() {
  const w = document.getElementById('chatWindow');
  const b = document.querySelector('.chat-badge');
  w.classList.toggle('open');
  if (w.classList.contains('open') && b) b.style.display = 'none';
}

/**
 * Append a message bubble to the chat window.
 * @param {string} t    - HTML content of the message
 * @param {string} type - 'bot' | 'user' — controls bubble styling
 */
function addMsg(t, type) {
  const m = document.getElementById('chatMsgs');
  const d = document.createElement('div');
  d.className = 'msg ' + type;
  d.innerHTML = t;
  m.appendChild(d);
  m.scrollTop = m.scrollHeight;
}

/**
 * Inject a typing indicator (three animated dots).
 * Returns the element so callers can remove it when reply is ready.
 * @returns {HTMLElement}
 */
function showTyping() {
  const m = document.getElementById('chatMsgs');
  const d = document.createElement('div');
  d.className = 'msg bot';
  d.id = 'typing';
  d.innerHTML = '<div class="typing"><span></span><span></span><span></span></div>';
  m.appendChild(d);
  m.scrollTop = m.scrollHeight;
  return d;
}

/* ── Hardcoded chatbot keyword → response map ── */
const chatbotResponses = {
  'admission': [
    '📋 <strong>Admissions Information</strong><br/>' +
    '• Applications open: June 2026<br/>' +
    '• Entrance exam: JEE Main/MHTCET<br/>' +
    '• Counseling process follows MAHACET<br/>' +
    '• Fee structure: ₹6,00,000 (4 years)<br/>' +
    '• Scholarships: Merit &amp; Need-based available<br/>' +
    '<a href="admissions.html" style="color:#0A3B7E; text-decoration:underline;">View Details →</a>'
  ],
  'department': [
    '🏢 <strong>Departments Available</strong><br/>' +
    '• Computer Engineering<br/>' +
    '• Mechanical Engineering<br/>' +
    '• Electrical Engineering<br/>' +
    '• Electronics &amp; Telecommunication<br/>' +
    '• Civil Engineering<br/>' +
    '• Chemical Engineering<br/>' +
    '• And 9 more specialized departments<br/>' +
    '<a href="departments.html" style="color:#0A3B7E; text-decoration:underline;">Explore All →</a>'
  ],
  'contact': [
    '📞 <strong>Contact Information</strong><br/>' +
    '<strong>Address:</strong><br/>Walchand College of Engineering<br/>Vishrambag, Sangli 416415<br/>' +
    '<strong>Phone:</strong> +91-233-2340637<br/>' +
    '<strong>Email:</strong> info@wce.edu.in<br/>' +
    '<strong>Hours:</strong> Mon-Fri 9AM-5PM<br/>' +
    '<a href="contact.html" style="color:#0A3B7E; text-decoration:underline;">Contact Form →</a>'
  ],
  'placement': [
    '🎯 <strong>Placement Statistics</strong><br/>' +
    '• Average Package: ₹8.5 LPA<br/>' +
    '• Highest Package: ₹1.5 CPA<br/>' +
    '• Placement Rate: 94%<br/>' +
    '• Companies: Google, Microsoft, Accenture, TCS, Infosys, etc.<br/>' +
    '• Internship Opportunities: 100+<br/>' +
    '<a href="placements.html" style="color:#0A3B7E; text-decoration:underline;">View Details →</a>'
  ]
};

/**
 * Match user input to a keyword and return a bot response.
 * Falls back to a generic help message if no keyword matches.
 * @param {string} input - raw user text
 * @returns {string} HTML response string
 */
function getChatbotResponse(input) {
  const lower = input.toLowerCase();
  for (const [key, responses] of Object.entries(chatbotResponses)) {
    if (lower.includes(key) || lower.includes(key.slice(0, 3))) {
      return responses[Math.floor(Math.random() * responses.length)];
    }
  }
  return (
    '👋 Hello! I can help you with:<br/>' +
    '• <strong>Admission</strong> - Application &amp; eligibility<br/>' +
    '• <strong>Department</strong> - Available programs<br/>' +
    '• <strong>Contact</strong> - Reach out to us<br/>' +
    '• <strong>Placement</strong> - Career stats<br/><br/>' +
    'Type any of these keywords to learn more!'
  );
}

/**
 * Read the chat input field, display user message,
 * show typing indicator, then display bot reply after 800 ms.
 */
function sendMsg() {
  const i = document.getElementById('chatInput');
  const t = i.value.trim();
  if (!t) return;
  i.value = '';
  addMsg(t, 'user');
  const ty = showTyping();
  setTimeout(() => {
    ty.remove();
    const reply = getChatbotResponse(t);
    addMsg(reply, 'bot');
  }, 800);
}

/**
 * Handle a quick-reply button tap (pre-filled topic).
 * @param {string} topic - e.g. 'Admissions', 'Placements'
 */
function sendQuick(topic) {
  addMsg(topic, 'user');
  const ty = showTyping();
  setTimeout(() => {
    ty.remove();
    const reply = getChatbotResponse(topic);
    addMsg(reply, 'bot');
  }, 800);
}

/* ══════════════════════════════════════════
   HERO IMAGE CAROUSEL
   Tracks current slide, updates transform and indicators,
   supports manual nav + auto-rotation every 6 s.
   ══════════════════════════════════════════ */

let currentSlide = 0;
const totalSlides = 6;
let autoRotateInterval;
const SLIDE_DURATION = 6000; // ms between auto-advances

/**
 * Slide the carousel to currentSlide by adjusting translateX.
 * Also refreshes indicator dots.
 */
function updateCarousel() {
  const inner = document.getElementById('carouselInner');
  const offset = -currentSlide * (100 / 6); // each slide = 1/6 of the 600% track
  inner.style.transform = `translateX(${offset}%)`;
  updateIndicators();
}

/**
 * Sync active state on all dot indicators to currentSlide.
 */
function updateIndicators() {
  document.querySelectorAll('.indicator').forEach((ind, i) => {
    ind.classList.toggle('active', i === currentSlide);
  });
}

/**
 * Advance to the next slide (wraps around).
 * Resets and restarts the auto-rotate timer.
 */
function carouselNext() {
  clearInterval(autoRotateInterval);
  currentSlide = (currentSlide + 1) % totalSlides;
  updateCarousel();
  startAutoRotate();
}

/**
 * Go to the previous slide (wraps around).
 */
function carouselPrev() {
  clearInterval(autoRotateInterval);
  currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
  updateCarousel();
  startAutoRotate();
}

/**
 * Jump directly to a specific slide index.
 * @param {number} index - 0-based slide index
 */
function carouselGo(index) {
  clearInterval(autoRotateInterval);
  currentSlide = index;
  updateCarousel();
  startAutoRotate();
}

/**
 * Start the automatic slide rotation interval.
 */
function startAutoRotate() {
  autoRotateInterval = setInterval(() => {
    currentSlide = (currentSlide + 1) % totalSlides;
    updateCarousel();
  }, SLIDE_DURATION);
}

/* ══════════════════════════════════════════
   EXTERNAL LINK HELPERS
   Open third-party portals in a new tab
   ══════════════════════════════════════════ */

/** Open the WCE ERP portal */
function erpgo() {
  window.open('https://wic.walchandsangli.ac.in', '_blank');
}

/** Open the StudyMate AI platform */
function studymatego() {
  window.open('https://www.studymateai.tech/', '_blank');
}

/** Open the WCE YouTube channel */
function ytgo() {
  window.open('youtube.com/wce_media');
}

/* ══════════════════════════════════════════
   INITIALISATION
   Run after DOM is fully parsed
   ══════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  updateCarousel();   // set initial carousel position
  startAutoRotate();  // begin auto-play
});
