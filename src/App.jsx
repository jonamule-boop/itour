import { useState, useEffect, useRef } from "react";

const COLORS = {
  gold: "#F4A261", green: "#2A9D8F", earth: "#264653", terra: "#E76F51",
  cream: "#F8F1E9", gray: "#6D6D6D", dark: "#1A2E35",
  goldLight: "#FEF3E8", greenLight: "#E8F6F4",
};

const styles = {
  app: { fontFamily: "'Poppins', sans-serif", background: COLORS.cream, minHeight: "100vh", maxWidth: 430, margin: "0 auto", position: "relative", overflow: "hidden", boxShadow: "0 0 60px rgba(0,0,0,0.15)" },
  screen: { minHeight: "calc(100vh - 70px)", overflowY: "auto", paddingBottom: 90 },
};

const accommodations = [
  { id: 1, name: "The Victoria Falls Hotel", type: "Hotel", price: 180, rating: 4.9, distance: "0.3km", badge: true, tag: "Historic Icon", img: "🏛️", desc: "Colonial elegance meets the thunder of the Falls. Stunning spray views at dawn.", amenities: ["WiFi","Pool","Spa","Restaurant"] },
  { id: 2, name: "Tongabezi Lodge", type: "Safari Lodge", price: 320, rating: 4.8, distance: "8km", badge: true, tag: "Joyful Green", img: "🌿", desc: "Luxury tree houses on the Zambezi. Hippos at breakfast, stars for dinner.", amenities: ["WiFi","Safari","Canoe","Chef"] },
  { id: 3, name: "Zambezi Waterfront", type: "Guest House", price: 65, rating: 4.6, distance: "1.2km", badge: true, tag: "Best Value", img: "🏡", desc: "Warm family welcome, local cuisine, and a garden that sings at sunset.", amenities: ["WiFi","Breakfast","Garden","Parking"] },
  { id: 4, name: "Avani Victoria Falls", type: "Hotel", price: 140, rating: 4.7, distance: "0.5km", badge: false, tag: "Modern", img: "🏨", desc: "Contemporary comfort steps from the rainforest. Rooftop pool with Falls view.", amenities: ["WiFi","Pool","Bar","Gym"] },
];

const traditions = [
  { id: 1, name: "Kuomboka Ceremony", tribe: "Lozi", date: "Apr 15", location: "Mongu, Western Province", level: "Immersive", color: "#E76F51", desc: "The Litunga's royal barge glides across the Zambezi floodplains — one of Zambia's most spectacular royal ceremonies.", img: "🛶" },
  { id: 2, name: "Nc'wala Ceremony", tribe: "Ngoni", date: "Feb 24", location: "Chipata, Eastern Province", level: "Observer", color: "#2A9D8F", desc: "First fruits ceremony marking the Ngoni harvest. Warrior dances, traditional food, and royal tribute.", img: "🌾" },
  { id: 3, name: "Mukuni Market Day", tribe: "Leya", date: "Every Sat", location: "Mukuni Village, Livingstone", level: "Participant", color: "#F4A261", desc: "Living craft market where Leya artisans sell directly. Weaving demonstrations, copper work, and local food.", img: "🏺" },
];

const restaurants = [
  { id: 1, name: "The Boma", cuisine: "Zambian", rating: 4.8, price: "$$", signature: "Mopane Worm Platter", img: "🍖", story: "A cultural dining theatre — bush meat, local drumming, and stories of the land.", tag: "Must Try" },
  { id: 2, name: "Olga's Italian Corner", cuisine: "Italian-African Fusion", rating: 4.6, price: "$$", signature: "Zambezi Catfish Pasta", img: "🍝", story: "Where Italian warmth meets Zambian ingredients. The catfish pasta is legendary.", tag: "Fusion" },
  { id: 3, name: "Café Zambezi", cuisine: "Café & Local", rating: 4.5, price: "$", signature: "Nshima Breakfast Bowl", img: "☕", story: "The nshima recipe has been in this family for three generations.", tag: "Local Gem" },
];

const safaris = [
  { id: 1, name: "Zambezi Sunset Safari", duration: "4 hrs", price: 95, rating: 4.9, badge: true, tag: "Bestseller", img: "🌅", animals: ["🦛","🐊","🦅","🐘"], desc: "Cruise the upper Zambezi at golden hour — hippos, crocs, and sundowners with local guides.", includes: ["Guide","Boat","Drinks","Binoculars"] },
  { id: 2, name: "Chobe Day Safari", duration: "Full day", price: 185, rating: 4.8, badge: true, tag: "UNESCO Park", img: "🐘", animals: ["🐘","🦁","🦒","🐆"], desc: "Cross into Botswana for Chobe's legendary elephant herds — Africa's finest wildlife corridor.", includes: ["Transport","Guide","Lunch","Park fees"] },
  { id: 3, name: "Livingstone Walking Safari", duration: "3 hrs", price: 55, rating: 4.7, badge: true, tag: "Immersive", img: "🦒", animals: ["🦒","🦓","🐃","🐦"], desc: "On foot with expert trackers through private conservancy. Rare, intimate, unforgettable.", includes: ["Guide","Tracker","Water","Insurance"] },
  { id: 4, name: "Microlight Over the Falls", duration: "15 min", price: 120, rating: 5.0, badge: true, tag: "Epic", img: "🛩️", animals: ["🌊","🌈","☁️","🦅"], desc: "Soar above the smoke that thunders — Victoria Falls from above is life-altering.", includes: ["Pilot","Safety brief","GoPro","Certificate"] },
];

const itineraries = [
  {
    id: 1, name: "Falls & Culture Weekend", duration: "2 Days", emoji: "🌊", tag: "Most Popular", color: [COLORS.earth, COLORS.green],
    days: [
      { label: "Day 1 — The Falls", items: [
        { time: "07:00", icon: "🌊", title: "Victoria Falls at sunrise", type: "Experience", price: 30 },
        { time: "10:00", icon: "🚶", title: "Knife Edge Bridge walk", type: "Experience", price: 0 },
        { time: "13:00", icon: "🍖", title: "Lunch at The Boma", type: "Dining", price: 25 },
        { time: "15:00", icon: "🛶", title: "Zambezi Sunset Safari", type: "Safari", price: 95 },
        { time: "19:00", icon: "🌿", title: "Check-in: Tongabezi Lodge", type: "Stay", price: 320 },
      ]},
      { label: "Day 2 — Culture", items: [
        { time: "08:00", icon: "☕", title: "Breakfast at Café Zambezi", type: "Dining", price: 12 },
        { time: "10:00", icon: "🏺", title: "Mukuni Craft Village", type: "Market", price: 0 },
        { time: "12:00", icon: "🎭", title: "Leya Cultural Demonstration", type: "Culture", price: 20 },
        { time: "15:00", icon: "🏊", title: "Devil's Pool swim", type: "Experience", price: 85 },
        { time: "19:00", icon: "🍝", title: "Dinner: Olga's", type: "Dining", price: 35 },
      ]},
    ],
    totalPrice: 622,
  },
  {
    id: 2, name: "Safari & Wilderness", duration: "3 Days", emoji: "🦁", tag: "Adventure", color: [COLORS.terra, COLORS.gold],
    days: [
      { label: "Day 1 — Chobe", items: [
        { time: "06:00", icon: "🐘", title: "Chobe Day Safari, Botswana", type: "Safari", price: 185 },
        { time: "18:00", icon: "🏛️", title: "Victoria Falls Hotel dinner", type: "Dining", price: 60 },
        { time: "20:00", icon: "🏛️", title: "Victoria Falls Hotel check-in", type: "Stay", price: 180 },
      ]},
      { label: "Day 2 — Air & Walk", items: [
        { time: "07:00", icon: "🦒", title: "Walking Safari", type: "Safari", price: 55 },
        { time: "11:00", icon: "🛩️", title: "Microlight Over the Falls", type: "Experience", price: 120 },
        { time: "14:00", icon: "🍖", title: "Lunch: The Boma", type: "Dining", price: 25 },
        { time: "17:00", icon: "🌅", title: "Zambezi Sunset Cruise", type: "Safari", price: 95 },
      ]},
    ],
    totalPrice: 720,
  },
];

const chatHistory = [
  { role: "ai", text: "Jambo! 🌅 I'm your iTour Guide. Ready to plan something unforgettable in Livingstone?" },
  { role: "user", text: "Yes! I want a 2-day cultural experience near Victoria Falls." },
  { role: "ai", text: "Perfect! I'm crafting a journey beyond the postcard — culture, safari, and pure Zambian joy 🎯" },
];

// ─── SHARED ───────────────────────────────────────────────────────────────────

const VerifiedBadge = ({ small }) => (
  <span style={{ background: "linear-gradient(135deg,#F4A261,#E76F51)", color: "white", fontSize: small ? 9 : 10, fontWeight: 700, padding: small ? "2px 6px" : "3px 8px", borderRadius: 20, display: "inline-flex", alignItems: "center" }}>✓ VERIFIED</span>
);
const StarRating = ({ rating }) => <span style={{ color: COLORS.gold, fontSize: 12, fontWeight: 700 }}>★ {rating}</span>;
const Tag = ({ label, color }) => (
  <span style={{ background: color ? color : COLORS.greenLight, color: color ? "white" : COLORS.green, fontSize: 10, fontWeight: 600, padding: "2px 8px", borderRadius: 20 }}>{label}</span>
);
const Card = ({ children, style }) => (
  <div style={{ background: "white", borderRadius: 20, padding: 16, boxShadow: "0 2px 16px rgba(38,70,83,0.07)", ...style }}>{children}</div>
);
const Btn = ({ children, onClick, style, secondary }) => (
  <button onClick={onClick} onMouseDown={e => e.currentTarget.style.transform="scale(0.96)"} onMouseUp={e => e.currentTarget.style.transform="scale(1)"}
    style={{ background: secondary ? "transparent" : `linear-gradient(135deg,${COLORS.gold},${COLORS.terra})`, color: secondary ? COLORS.gold : "white", border: secondary ? `2px solid ${COLORS.gold}` : "none", borderRadius: 30, padding: "12px 24px", fontFamily: "'Poppins',sans-serif", fontWeight: 700, fontSize: 14, cursor: "pointer", transition: "transform 0.12s", ...style }}>
    {children}
  </button>
);

// ─── ONBOARDING ───────────────────────────────────────────────────────────────

const splashSlides = [
  { emoji: "🌍", bg: [COLORS.earth, COLORS.dark], title: "Welcome to iTour", sub: "Africa's joyful verified tourism companion — built from Livingstone to the world.", btn: "Let's Go →" },
  { emoji: "🤖", bg: [COLORS.green, COLORS.earth], title: "Meet Your iTour Guide", sub: "Your AI companion plans, navigates, and surprises you with cultural joy — in real time.", btn: "Sounds Amazing →" },
  { emoji: "✓", bg: [COLORS.terra, COLORS.gold], title: "Verified. Trusted. Safe.", sub: "Every hotel, driver, artisan and operator is rigorously verified so you travel with complete confidence.", btn: "I'm In →" },
];

const quizSteps = [
  { question: "What kind of traveller are you?", sub: "We'll personalise your entire experience.", options: [{ emoji: "🌿", label: "Nature & Safari", val: "nature" }, { emoji: "🎭", label: "Culture & Heritage", val: "culture" }, { emoji: "🏄", label: "Adventure & Thrill", val: "adventure" }, { emoji: "🍽️", label: "Food & Lifestyle", val: "food" }] },
  { question: "What's your travel style?", sub: "Helps us recommend perfect stays.", options: [{ emoji: "🏕️", label: "Bush & Safari Camp", val: "bush" }, { emoji: "🏡", label: "Cosy Guest House", val: "guesthouse" }, { emoji: "🏨", label: "Modern Hotel", val: "hotel" }, { emoji: "🌿", label: "Eco Lodge", val: "eco" }] },
  { question: "Who are you travelling with?", sub: "We'll tailor experiences for your group.", options: [{ emoji: "🧍", label: "Solo Explorer", val: "solo" }, { emoji: "💑", label: "Couple", val: "couple" }, { emoji: "👨‍👩‍👧", label: "Family", val: "family" }, { emoji: "👥", label: "Group / Friends", val: "group" }] },
  { question: "What's your budget per day?", sub: "We'll show options that fit — no surprises.", options: [{ emoji: "💚", label: "Budget · Under $50", val: "budget" }, { emoji: "💛", label: "Mid-Range · $50–$150", val: "mid" }, { emoji: "🧡", label: "Premium · $150–$300", val: "premium" }, { emoji: "💎", label: "Luxury · $300+", val: "luxury" }] },
];

function OnboardingScreen({ onComplete }) {
  const [phase, setPhase] = useState("splash");
  const [slideIdx, setSlideIdx] = useState(0);
  const [quizIdx, setQuizIdx] = useState(0);
  const [selected, setSelected] = useState(null);

  const slide = splashSlides[slideIdx];

  const nextSlide = () => {
    if (slideIdx < splashSlides.length - 1) setSlideIdx(i => i + 1);
    else setPhase("quiz");
  };

  const pickAnswer = (val) => {
    setSelected(val);
    setTimeout(() => {
      setSelected(null);
      if (quizIdx < quizSteps.length - 1) setQuizIdx(i => i + 1);
      else setPhase("done");
    }, 380);
  };

  const q = quizSteps[quizIdx];

  if (phase === "splash") return (
    <div style={{ minHeight: "100vh", background: `linear-gradient(160deg,${slide.bg[0]},${slide.bg[1]})`, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-between", padding: "60px 32px 50px", transition: "background 0.6s" }}>
      <div style={{ alignSelf: "flex-end", color: "rgba(255,255,255,0.55)", fontSize: 13, cursor: "pointer" }} onClick={onComplete}>Skip</div>
      <div style={{ textAlign: "center", flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
        <div style={{ fontSize: 90, marginBottom: 28 }}>{slide.emoji}</div>
        <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 3, color: "rgba(255,255,255,0.5)", marginBottom: 14 }}>iTour · JOIE DE VIVRE ENTERPRISE</div>
        <div style={{ fontSize: 28, fontWeight: 800, color: "white", lineHeight: 1.25, marginBottom: 14 }}>{slide.title}</div>
        <div style={{ fontSize: 15, color: "rgba(255,255,255,0.78)", lineHeight: 1.65, maxWidth: 300, textAlign: "center" }}>{slide.sub}</div>
      </div>
      <div style={{ display: "flex", gap: 8, marginBottom: 28 }}>
        {splashSlides.map((_, i) => <div key={i} style={{ width: i === slideIdx ? 24 : 8, height: 8, borderRadius: 4, background: i === slideIdx ? COLORS.gold : "rgba(255,255,255,0.3)", transition: "all 0.3s" }} />)}
      </div>
      <Btn onClick={nextSlide} style={{ width: "100%", maxWidth: 340, padding: "16px", fontSize: 16, background: "white", color: slide.bg[0] }}>{slide.btn}</Btn>
    </div>
  );

  if (phase === "quiz") return (
    <div style={{ minHeight: "100vh", background: COLORS.cream, display: "flex", flexDirection: "column" }}>
      <div style={{ background: `linear-gradient(135deg,${COLORS.earth},${COLORS.green})`, padding: "50px 24px 28px" }}>
        <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 2, color: "rgba(255,255,255,0.55)", marginBottom: 10 }}>STEP {quizIdx + 1} OF {quizSteps.length}</div>
        <div style={{ background: "rgba(255,255,255,0.2)", borderRadius: 10, height: 6, marginBottom: 18 }}>
          <div style={{ width: `${(quizIdx / quizSteps.length) * 100 + 25}%`, height: "100%", background: COLORS.gold, borderRadius: 10, transition: "width 0.4s" }} />
        </div>
        <div style={{ fontSize: 22, fontWeight: 800, color: "white", lineHeight: 1.3 }}>{q.question}</div>
        <div style={{ fontSize: 13, color: "rgba(255,255,255,0.7)", marginTop: 6 }}>{q.sub}</div>
      </div>
      <div style={{ flex: 1, padding: "24px 20px", display: "flex", flexDirection: "column", gap: 12 }}>
        {q.options.map(opt => (
          <div key={opt.val} onClick={() => pickAnswer(opt.val)} style={{ background: selected === opt.val ? `linear-gradient(135deg,${COLORS.gold},${COLORS.terra})` : "white", borderRadius: 18, padding: "18px 20px", cursor: "pointer", display: "flex", alignItems: "center", gap: 16, boxShadow: selected === opt.val ? `0 6px 24px rgba(244,162,97,0.4)` : "0 2px 12px rgba(38,70,83,0.07)", transform: selected === opt.val ? "scale(1.02)" : "scale(1)", transition: "all 0.25s" }}>
            <div style={{ fontSize: 32 }}>{opt.emoji}</div>
            <div style={{ fontWeight: 700, fontSize: 16, color: selected === opt.val ? "white" : COLORS.earth }}>{opt.label}</div>
            {selected === opt.val && <div style={{ marginLeft: "auto", color: "white", fontSize: 20 }}>✓</div>}
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div style={{ minHeight: "100vh", background: `linear-gradient(160deg,${COLORS.green},${COLORS.earth})`, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "40px 28px" }}>
      <div style={{ fontSize: 72, marginBottom: 20 }}>🎉</div>
      <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 3, color: "rgba(255,255,255,0.55)", marginBottom: 12 }}>YOU'RE ALL SET</div>
      <div style={{ fontSize: 26, fontWeight: 800, color: "white", textAlign: "center", marginBottom: 8 }}>Your Joy Profile is Ready!</div>
      <div style={{ fontSize: 14, color: "rgba(255,255,255,0.75)", textAlign: "center", marginBottom: 40, lineHeight: 1.6 }}>Your iTour Guide has been personalised just for you. Let's discover Africa's joy together.</div>
      <Btn onClick={onComplete} style={{ width: "100%", maxWidth: 340, padding: "16px", fontSize: 16, background: COLORS.gold }}>🚀 Launch My iTour Experience</Btn>
    </div>
  );
}

// ─── HOME ─────────────────────────────────────────────────────────────────────

function HomeScreen({ setTab }) {
  const [slide, setSlide] = useState(0);
  const heroSlides = [
    { emoji: "🌊", title: "Victoria Falls", sub: "Livingstone, Zambia", color: [COLORS.earth, COLORS.green] },
    { emoji: "🦁", title: "Kafue Safari", sub: "Kafue National Park", color: [COLORS.terra, COLORS.gold] },
    { emoji: "🏺", title: "Mukuni Markets", sub: "Living Culture Daily", color: [COLORS.green, COLORS.earth] },
  ];
  useEffect(() => { const t = setInterval(() => setSlide(s => (s + 1) % heroSlides.length), 3200); return () => clearInterval(t); }, []);
  const s = heroSlides[slide];

  return (
    <div style={styles.screen}>
      <div style={{ background: `linear-gradient(160deg,${s.color[0]},${s.color[1]})`, padding: "50px 20px 30px", position: "relative", overflow: "hidden", transition: "background 0.8s" }}>
        <div style={{ position: "absolute", top: 0, right: 0, fontSize: 120, opacity: 0.08 }}>{s.emoji}</div>
        <div style={{ fontSize: 11, color: "rgba(255,255,255,0.7)", fontWeight: 500, marginBottom: 4 }}>Good day, Jonathan 👋</div>
        <div style={{ fontSize: 26, fontWeight: 800, color: "white", lineHeight: 1.2, marginBottom: 4 }}>{s.emoji} {s.title}</div>
        <div style={{ fontSize: 13, color: "rgba(255,255,255,0.8)" }}>{s.sub}</div>
        <div style={{ display: "flex", gap: 6, marginTop: 14 }}>
          {heroSlides.map((_, i) => <div key={i} onClick={() => setSlide(i)} style={{ width: i === slide ? 20 : 6, height: 6, borderRadius: 3, background: i === slide ? COLORS.gold : "rgba(255,255,255,0.4)", cursor: "pointer", transition: "all 0.3s" }} />)}
        </div>
        <button style={{ position: "absolute", top: 48, right: 20, width: 48, height: 48, borderRadius: 24, background: COLORS.gold, border: "none", fontSize: 20, cursor: "pointer", boxShadow: "0 4px 16px rgba(244,162,97,0.5)", display: "flex", alignItems: "center", justifyContent: "center" }}>🎙️</button>
      </div>

      <div style={{ padding: "20px 20px 0" }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: COLORS.gray, letterSpacing: 1, marginBottom: 12 }}>QUICK ACTIONS</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 10 }}>
          {[{ icon: "✈️", label: "Flights", tab: 2 }, { icon: "🚗", label: "Transport", tab: 2 }, { icon: "🏨", label: "Stays", tab: 2 }, { icon: "🦁", label: "Safaris", tab: 1 }].map(a => (
            <div key={a.label} onClick={() => setTab(a.tab)} style={{ background: "white", borderRadius: 16, padding: "14px 8px", textAlign: "center", cursor: "pointer", boxShadow: "0 2px 12px rgba(38,70,83,0.07)" }}
              onMouseDown={e => e.currentTarget.style.transform="scale(0.93)"} onMouseUp={e => e.currentTarget.style.transform="scale(1)"}>
              <div style={{ fontSize: 22, marginBottom: 4 }}>{a.icon}</div>
              <div style={{ fontSize: 11, fontWeight: 600, color: COLORS.earth }}>{a.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ padding: "16px 20px 0", display: "flex", flexDirection: "column", gap: 10 }}>
        <div onClick={() => setTab(3)} style={{ background: `linear-gradient(135deg,${COLORS.earth},${COLORS.green})`, borderRadius: 20, padding: "18px 20px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <div style={{ fontSize: 16, fontWeight: 800, color: "white" }}>✨ Joy Itineraries</div>
            <div style={{ fontSize: 12, color: "rgba(255,255,255,0.75)", marginTop: 2 }}>AI-crafted full trips, ready to book</div>
          </div>
          <div style={{ fontSize: 32 }}>🗺️</div>
        </div>
        <div onClick={() => setTab(1)} style={{ background: `linear-gradient(135deg,${COLORS.terra},${COLORS.gold})`, borderRadius: 20, padding: "18px 20px", cursor: "pointer", display: "flex", alignItems: "center", justifyCo
