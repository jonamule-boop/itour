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
        <div onClick={() => setTab(1)} style={{ background: `linear-gradient(135deg,${COLORS.terra},${COLORS.gold})`, borderRadius: 20, padding: "18px 20px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <div style={{ fontSize: 16, fontWeight: 800, color: "white" }}>🦁 Safari Experiences</div>
            <div style={{ fontSize: 12, color: "rgba(255,255,255,0.75)", marginTop: 2 }}>Verified guides · Sunset cruises · Chobe</div>
          </div>
          <div style={{ fontSize: 32 }}>🌅</div>
        </div>
      </div>

      <div style={{ padding: "20px 20px 0" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
          <div style={{ fontSize: 16, fontWeight: 800, color: COLORS.earth }}>📍 Near You</div>
          <div style={{ fontSize: 12, color: COLORS.green, fontWeight: 600 }}>See all</div>
        </div>
        {[{ name: "Mukuni Craft Village", dist: "2.1km", type: "Market", emoji: "🏺" }, { name: "Knife Edge Bridge", dist: "0.8km", type: "Experience", emoji: "🌊" }, { name: "The Boma Restaurant", dist: "1.3km", type: "Dining", emoji: "🍖" }].map(n => (
          <Card key={n.name} style={{ padding: "12px 16px", display: "flex", alignItems: "center", gap: 14, marginBottom: 10 }}>
            <div style={{ fontSize: 28 }}>{n.emoji}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 700, fontSize: 14, color: COLORS.earth }}>{n.name}</div>
              <div style={{ fontSize: 11, color: COLORS.gray }}>{n.type} · {n.dist}</div>
            </div>
            <div style={{ background: COLORS.goldLight, color: COLORS.terra, fontSize: 11, fontWeight: 700, padding: "4px 10px", borderRadius: 20 }}>Go →</div>
          </Card>
        ))}
      </div>
    </div>
  );
}

// ─── EXPLORE ──────────────────────────────────────────────────────────────────

function ExploreScreen() {
  const [activeTab, setActiveTab] = useState("safaris");
  const tabList = [{ key: "safaris", label: "🦁 Safaris" }, { key: "traditions", label: "🎭 Traditions" }, { key: "markets", label: "🏺 Markets" }, { key: "restaurants", label: "🍽️ Dining" }];

  return (
    <div style={styles.screen}>
      <div style={{ background: `linear-gradient(135deg,${COLORS.terra},${COLORS.gold})`, padding: "50px 20px 20px" }}>
        <div style={{ fontSize: 24, fontWeight: 800, color: "white" }}>🌍 Explore Africa</div>
        <div style={{ fontSize: 13, color: "rgba(255,255,255,0.8)", marginTop: 4 }}>Safaris · Traditions · Markets · Dining</div>
      </div>
      <div style={{ display: "flex", gap: 8, padding: "14px 20px", overflowX: "auto" }}>
        {tabList.map(t => <button key={t.key} onClick={() => setActiveTab(t.key)} style={{ padding: "8px 16px", borderRadius: 30, border: "none", cursor: "pointer", fontFamily: "'Poppins',sans-serif", fontWeight: 600, fontSize: 12, whiteSpace: "nowrap", background: activeTab === t.key ? COLORS.gold : "white", color: activeTab === t.key ? "white" : COLORS.gray, boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>{t.label}</button>)}
      </div>
      <div style={{ padding: "0 20px", display: "flex", flexDirection: "column", gap: 14 }}>
        {activeTab === "safaris" && safaris.map(s => (
          <Card key={s.id} style={{ padding: 0, overflow: "hidden" }}>
            <div style={{ height: 100, background: `linear-gradient(135deg,${COLORS.earth}cc,${COLORS.terra}88)`, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 20px", position: "relative" }}>
              <div style={{ fontSize: 52 }}>{s.img}</div>
              <div style={{ position: "absolute", top: 10, left: 10, display: "flex", gap: 4 }}>{s.badge && <VerifiedBadge />}<Tag label={s.tag} color={COLORS.terra} /></div>
              <div style={{ textAlign: "right" }}><div style={{ fontSize: 22, fontWeight: 800, color: COLORS.gold }}>${s.price}</div><div style={{ fontSize: 11, color: "rgba(255,255,255,0.8)" }}>per person</div></div>
            </div>
            <div style={{ padding: 14 }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}><div style={{ fontWeight: 800, fontSize: 16, color: COLORS.earth }}>{s.name}</div><StarRating rating={s.rating} /></div>
              <div style={{ fontSize: 12, color: COLORS.green, fontWeight: 600, margin: "4px 0" }}>⏱ {s.duration}</div>
              <div style={{ fontSize: 12, color: COLORS.gray, lineHeight: 1.55, marginBottom: 10 }}>{s.desc}</div>
              <div style={{ display: "flex", gap: 6, marginBottom: 10 }}>{s.animals.map((a, i) => <span key={i} style={{ fontSize: 20 }}>{a}</span>)}</div>
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 12 }}>{s.includes.map(inc => <span key={inc} style={{ fontSize: 10, color: COLORS.green, background: COLORS.greenLight, padding: "2px 8px", borderRadius: 20 }}>✓ {inc}</span>)}</div>
              <div style={{ display: "flex", gap: 8 }}><Btn style={{ flex: 1, fontSize: 13, padding: "10px 16px" }}>Book Safari</Btn><Btn secondary style={{ fontSize: 13, padding: "10px 16px" }}>Details</Btn></div>
            </div>
          </Card>
        ))}
        {activeTab === "traditions" && traditions.map(t => (
          <Card key={t.id}>
            <div style={{ display: "flex", gap: 12 }}>
              <div style={{ width: 56, height: 56, borderRadius: 16, background: `${t.color}22`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26, flexShrink: 0 }}>{t.img}</div>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}><div style={{ fontWeight: 800, fontSize: 15, color: COLORS.earth }}>{t.name}</div><Tag label={t.level} color={t.color} /></div>
                <div style={{ fontSize: 11, color: COLORS.green, fontWeight: 600, margin: "3px 0" }}>{t.tribe} · 📅 {t.date}</div>
                <div style={{ fontSize: 12, color: COLORS.gray, lineHeight: 1.5, marginBottom: 10 }}>{t.desc}</div>
                <div style={{ fontSize: 11, color: COLORS.gray, marginBottom: 10 }}>📍 {t.location}</div>
                <div style={{ display: "flex", gap: 8 }}><Btn style={{ fontSize: 12, padding: "8px 16px" }}>Book Experience</Btn><Btn secondary style={{ fontSize: 12, padding: "8px 16px" }}>Directions</Btn></div>
              </div>
            </div>
          </Card>
        ))}
        {activeTab === "markets" && (
          <>
            <div style={{ background: `linear-gradient(135deg,${COLORS.terra},${COLORS.gold})`, borderRadius: 20, padding: 20, color: "white" }}>
              <div style={{ fontSize: 18, fontWeight: 800 }}>🏺 Mukuni Craft Village</div>
              <div style={{ fontSize: 12, opacity: 0.85, margin: "6px 0" }}>Leya Artisans · Open Daily · 2.1km</div>
              <div style={{ fontSize: 13, lineHeight: 1.6, marginBottom: 14 }}>Copper work, baskets, carved masks, traditional textiles — all made on-site. Watch artisans work and buy directly.</div>
              <Btn style={{ background: "white", color: COLORS.terra, fontSize: 13 }}>🔴 Live Stream Now</Btn>
            </div>
            {[{ name: "Livingstone Central Market", desc: "Fresh produce, dried fish, fabrics. The pulse of local life.", emoji: "🛒", km: "0.5km" }, { name: "Maramba Cultural Market", desc: "Weekend market with crafts, music, and street food.", emoji: "🎵", km: "3.2km" }].map(m => (
              <Card key={m.name}>
                <div style={{ display: "flex", gap: 12 }}>
                  <div style={{ fontSize: 32 }}>{m.emoji}</div>
                  <div><div style={{ fontWeight: 800, fontSize: 14, color: COLORS.earth }}>{m.name}</div><div style={{ fontSize: 11, color: COLORS.green, fontWeight: 600, marginBottom: 4 }}>{m.km}</div><div style={{ fontSize: 12, color: COLORS.gray, marginBottom: 10 }}>{m.desc}</div><Btn style={{ fontSize: 12, padding: "7px 16px" }}>Get Directions</Btn></div>
                </div>
              </Card>
            ))}
          </>
        )}
        {activeTab === "restaurants" && restaurants.map(r => (
          <Card key={r.id}>
            <div style={{ display: "flex", justifyContent: "space-between" }}><div style={{ fontSize: 32 }}>{r.img}</div><Tag label={r.tag} color={r.tag === "Must Try" ? COLORS.terra : r.tag === "Fusion" ? COLORS.green : undefined} /></div>
            <div style={{ fontWeight: 800, fontSize: 15, color: COLORS.earth, marginTop: 8 }}>{r.name}</div>
            <div style={{ display: "flex", gap: 10, margin: "4px 0" }}><StarRating rating={r.rating} /><span style={{ fontSize: 12, color: COLORS.gray }}>{r.cuisine}</span><span style={{ fontSize: 12, color: COLORS.green, fontWeight: 600 }}>{r.price}</span></div>
            <div style={{ fontSize: 11, color: COLORS.gold, fontWeight: 700 }}>✨ {r.signature}</div>
            <div style={{ fontSize: 12, color: COLORS.gray, marginTop: 6, fontStyle: "italic", lineHeight: 1.5 }}>"{r.story}"</div>
            <div style={{ display: "flex", gap: 8, marginTop: 12 }}><Btn style={{ fontSize: 12, padding: "8px 16px", flex: 1 }}>Reserve Table</Btn><Btn secondary style={{ fontSize: 12, padding: "8px 16px" }}>Menu</Btn></div>
          </Card>
        ))}
      </div>
    </div>
  );
}

// ─── BOOK ─────────────────────────────────────────────────────────────────────

function BookScreen() {
  const [mode, setMode] = useState("stays");
  const [filter, setFilter] = useState("All");
  const types = ["All","Hotel","Safari Lodge","Guest House"];
  const filtered = filter === "All" ? accommodations : accommodations.filter(a => a.type === filter);

  return (
    <div style={styles.screen}>
      <div style={{ background: `linear-gradient(135deg,${COLORS.gold},${COLORS.terra})`, padding: "50px 20px 24px" }}>
        <div style={{ fontSize: 24, fontWeight: 800, color: "white" }}>🗓️ Book</div>
        <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
          {[{ key: "flights", label: "✈️ Flights" }, { key: "transport", label: "🚗 Transport" }, { key: "stays", label: "🏨 Stays" }].map(m => (
            <button key={m.key} onClick={() => setMode(m.key)} style={{ padding: "7px 14px", borderRadius: 20, border: "none", cursor: "pointer", fontFamily: "'Poppins',sans-serif", fontWeight: 600, fontSize: 12, background: mode === m.key ? "white" : "rgba(255,255,255,0.25)", color: mode === m.key ? COLORS.terra : "white" }}>{m.label}</button>
          ))}
        </div>
      </div>
      <div style={{ padding: "16px 20px" }}>
        {mode === "stays" && (
          <>
            <div style={{ background: "white", borderRadius: 16, padding: "12px 16px", display: "flex", gap: 10, alignItems: "center", boxShadow: "0 2px 12px rgba(38,70,83,0.07)", marginBottom: 14 }}>
              <span>🔍</span><input placeholder="Search Livingstone..." style={{ border: "none", outline: "none", flex: 1, fontFamily: "'Poppins',sans-serif", fontSize: 14, color: COLORS.earth, background: "transparent" }} />
            </div>
            <div style={{ display: "flex", gap: 8, overflowX: "auto", marginBottom: 14 }}>
              {types.map(t => <button key={t} onClick={() => setFilter(t)} style={{ padding: "6px 14px", borderRadius: 20, border: "none", cursor: "pointer", fontFamily: "'Poppins',sans-serif", fontWeight: 600, fontSize: 11, whiteSpace: "nowrap", background: filter === t ? COLORS.earth : "white", color: filter === t ? "white" : COLORS.gray, boxShadow: "0 1px 6px rgba(0,0,0,0.06)" }}>{t}</button>)}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {filtered.map(a => (
                <Card key={a.id} style={{ padding: 0, overflow: "hidden" }}>
                  <div style={{ height: 100, background: `linear-gradient(135deg,${COLORS.earth}cc,${COLORS.green}88)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 52, position: "relative" }}>
                    {a.img}
                    {a.badge && <div style={{ position: "absolute", top: 10, left: 10 }}><VerifiedBadge /></div>}
                    <div style={{ position: "absolute", top: 10, right: 10, background: COLORS.gold, color: "white", fontSize: 12, fontWeight: 800, padding: "4px 10px", borderRadius: 20 }}>${a.price}/night</div>
                  </div>
                  <div style={{ padding: 14 }}>
                    <div style={{ display: "flex", justifyContent: "space-between" }}><div style={{ fontWeight: 800, fontSize: 15, color: COLORS.earth }}>{a.name}</div><StarRating rating={a.rating} /></div>
                    <div style={{ display: "flex", gap: 8, margin: "5px 0", flexWrap: "wrap" }}><Tag label={a.type} /><Tag label={`📍 ${a.distance}`} /></div>
                    <div style={{ fontSize: 12, color: COLORS.gray, lineHeight: 1.5, marginBottom: 10 }}>{a.desc}</div>
                    <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 12 }}>{a.amenities.map(am => <span key={am} style={{ fontSize: 10, color: COLORS.gray, background: COLORS.cream, padding: "2px 8px", borderRadius: 20 }}>{am}</span>)}</div>
                    <Btn style={{ width: "100%", textAlign: "center" }}>Book Now</Btn>
                  </div>
                </Card>
              ))}
            </div>
          </>
        )}
        {mode === "flights" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <Card style={{ background: `linear-gradient(135deg,${COLORS.earth},#1A2E35)` }}>
              <div style={{ color: "white" }}>
                <div style={{ fontSize: 12, opacity: 0.7, marginBottom: 12 }}>SEARCH FLIGHTS</div>
                <div style={{ display: "flex", gap: 10, marginBottom: 12 }}>
                  <div style={{ flex: 1, background: "rgba(255,255,255,0.1)", borderRadius: 12, padding: "10px 14px" }}><div style={{ fontSize: 10, opacity: 0.6 }}>FROM</div><div style={{ fontWeight: 700 }}>LVI – Livingstone</div></div>
                  <div style={{ display: "flex", alignItems: "center", color: COLORS.gold, fontSize: 20 }}>⇄</div>
                  <div style={{ flex: 1, background: "rgba(255,255,255,0.1)", borderRadius: 12, padding: "10px 14px" }}><div style={{ fontSize: 10, opacity: 0.6 }}>TO</div><div style={{ fontWeight: 700, color: COLORS.gold }}>LUN – Lusaka</div></div>
                </div>
                <Btn style={{ width: "100%", textAlign: "center", background: COLORS.gold }}>🔍 Search Flights</Btn>
              </div>
            </Card>
            {[{ airline: "Proflight Zambia", dep: "07:30", arr: "08:30", price: 89, route: "LVI → LUN", stops: "Direct" }, { airline: "Ethiopian Airlines", dep: "10:15", arr: "13:45", price: 210, route: "LVI → NBO", stops: "Direct" }, { airline: "Kenya Airways", dep: "14:20", arr: "18:00", price: 185, route: "LVI → JNB", stops: "1 Stop" }].map(f => (
              <Card key={f.airline}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div><div style={{ fontWeight: 700, fontSize: 13, color: COLORS.earth }}>✈️ {f.airline}</div><div style={{ display: "flex", alignItems: "center", gap: 8, margin: "6px 0" }}><span style={{ fontWeight: 800, fontSize: 16 }}>{f.dep}</span><span style={{ fontSize: 11, color: COLORS.gray }}>——</span><span style={{ fontWeight: 800, fontSize: 16 }}>{f.arr}</span></div><div style={{ fontSize: 11, color: COLORS.gray }}>{f.route}</div></div>
                  <div style={{ textAlign: "right" }}><div style={{ fontSize: 20, fontWeight: 800, color: COLORS.terra }}>${f.price}</div><Tag label={f.stops} color={f.stops === "Direct" ? COLORS.green : undefined} /><div style={{ marginTop: 8 }}><Btn style={{ fontSize: 11, padding: "6px 14px" }}>Select</Btn></div></div>
                </div>
              </Card>
            ))}
          </div>
        )}
        {mode === "transport" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {[{ name: "Moses K.", type: "Private Transfer", vehicle: "Toyota Land Cruiser", rating: 4.9, eta: "3 min", price: 15, emoji: "🚙", badge: true }, { name: "Zambezi Shuttles", type: "Shared Bus", vehicle: "Mini-Coach", rating: 4.6, eta: "8 min", price: 4, emoji: "🚌", badge: true }, { name: "Royal Cycle Hire", type: "Bicycle Rental", vehicle: "Mountain Bike", rating: 4.7, eta: "Now", price: 8, emoji: "🚲", badge: false }, { name: "Zambezi Water Taxi", type: "Boat Transfer", vehicle: "Speed Boat · 6 pax", rating: 4.8, eta: "15 min", price: 25, emoji: "🚤", badge: true }].map(t => (
              <Card key={t.name}>
                <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                  <div style={{ width: 52, height: 52, borderRadius: 16, background: COLORS.goldLight, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, flexShrink: 0 }}>{t.emoji}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", justifyContent: "space-between" }}><div style={{ fontWeight: 700, fontSize: 14, color: COLORS.earth }}>{t.name}</div>{t.badge && <VerifiedBadge small />}</div>
                    <div style={{ fontSize: 11, color: COLORS.gray }}>{t.type} · {t.vehicle}</div>
                    <div style={{ display: "flex", gap: 10, marginTop: 4 }}><StarRating rating={t.rating} /><span style={{ fontSize: 11, color: COLORS.green }}>⏱ {t.eta}</span></div>
                  </div>
                  <div style={{ textAlign: "right" }}><div style={{ fontWeight: 800, color: COLORS.terra, fontSize: 16 }}>${t.price}</div><Btn style={{ marginTop: 6, fontSize: 11, padding: "6px 12px" }}>Book</Btn></div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── JOY ITINERARIES ──────────────────────────────────────────────────────────

function ItinerariesScreen({ setTab }) {
  const [selected, setSelected] = useState(null);
  const [dayIdx, setDayIdx] = useState(0);

  if (selected) {
    const itin = selected;
    const day = itin.days[dayIdx];
    const typeColors = { Experience: COLORS.green, Safari: COLORS.terra, Dining: COLORS.gold, Stay: COLORS.earth, Market: "#8B5E3C", Culture: "#7C3AED" };

    return (
      <div style={styles.screen}>
        <div style={{ background: `linear-gradient(160deg,${itin.color[0]},${itin.color[1]})`, padding: "50px 20px 24px" }}>
          <button onClick={() => { setSelected(null); setDayIdx(0); }} style={{ background: "rgba(255,255,255,0.2)", border: "none", color: "white", borderRadius: 20, padding: "6px 14px", cursor: "pointer", fontFamily: "'Poppins',sans-serif", fontWeight: 600, fontSize: 12, marginBottom: 16 }}>← Back</button>
          <div style={{ fontSize: 34 }}>{itin.emoji}</div>
          <div style={{ fontSize: 22, fontWeight: 800, color: "white", marginTop: 6 }}>{itin.name}</div>
          <div style={{ display: "flex", gap: 10, marginTop: 8 }}><Tag label={itin.duration} /><Tag label={itin.tag} color={itin.color[0]} /></div>
          <div style={{ marginTop: 14, fontSize: 22, fontWeight: 800, color: COLORS.gold }}>${itin.totalPrice.toLocaleString()} <span style={{ fontSize: 13, fontWeight: 500, color: "rgba(255,255,255,0.75)" }}>estimated total</span></div>
        </div>

        <div style={{ display: "flex", gap: 8, padding: "14px 20px", overflowX: "auto" }}>
          {itin.days.map((d, i) => <button key={i} onClick={() => setDayIdx(i)} style={{ padding: "8px 16px", borderRadius: 20, border: "none", cursor: "pointer", fontFamily: "'Poppins',sans-serif", fontWeight: 600, fontSize: 12, whiteSpace: "nowrap", background: dayIdx === i ? COLORS.earth : "white", color: dayIdx === i ? "white" : COLORS.gray, boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>{d.label}</button>)}
        </div>

        <div style={{ padding: "0 20px" }}>
          {day.items.map((item, i) => (
            <div key={i} style={{ display: "flex", gap: 14, position: "relative" }}>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: 40, flexShrink: 0 }}>
                <div style={{ width: 36, height: 36, borderRadius: 18, background: typeColors[item.type] || COLORS.gray, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, flexShrink: 0 }}>{item.icon}</div>
                {i < day.items.length - 1 && <div style={{ width: 2, flex: 1, background: `${COLORS.gray}25`, minHeight: 20, marginTop: 4 }} />}
              </div>
              <div style={{ flex: 1, paddingBottom: 14 }}>
                <div style={{ fontSize: 10, color: COLORS.gray, fontWeight: 600, marginTop: 8 }}>{item.time}</div>
                <Card style={{ padding: "12px 14px", marginTop: 4 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div style={{ fontWeight: 700, fontSize: 14, color: COLORS.earth }}>{item.title}</div>
                    {item.price > 0 ? <div style={{ fontWeight: 800, color: COLORS.terra, fontSize: 13 }}>${item.price}</div> : <Tag label="FREE" color={COLORS.green} />}
                  </div>
                  <div style={{ marginTop: 6 }}><Tag label={item.type} color={typeColors[item.type]} /></div>
                </Card>
              </div>
            </div>
          ))}
        </div>

        <div style={{ padding: "8px 20px 20px" }}>
          <Btn style={{ width: "100%", textAlign: "center", padding: "16px", fontSize: 15 }}>🎉 Book This Itinerary — ${itin.totalPrice.toLocaleString()}</Btn>
          <div style={{ textAlign: "center", fontSize: 11, color: COLORS.gray, marginTop: 10 }}>Joy Guarantee · Free cancellation up to 48hrs</div>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.screen}>
      <div style={{ background: `linear-gradient(135deg,${COLORS.green},${COLORS.earth})`, padding: "50px 20px 24px" }}>
        <div style={{ fontSize: 24, fontWeight: 800, color: "white" }}>✨ Joy Itineraries</div>
        <div style={{ fontSize: 13, color: "rgba(255,255,255,0.8)", marginTop: 4 }}>AI-crafted, fully bookable Zambian adventures</div>
      </div>

      <div style={{ padding: "16px 20px 0" }}>
        <div onClick={() => setTab(4)} style={{ background: `linear-gradient(135deg,${COLORS.earth},${COLORS.dark})`, borderRadius: 20, padding: "18px 20px", display: "flex", alignItems: "center", gap: 14, cursor: "pointer" }}>
          <div style={{ fontSize: 36 }}>🤖</div>
          <div style={{ flex: 1 }}><div style={{ fontSize: 15, fontWeight: 800, color: "white" }}>Create My Custom Trip</div><div style={{ fontSize: 12, color: "rgba(255,255,255,0.7)", marginTop: 2 }}>Tell your Guide what you love — get a personalised itinerary in seconds</div></div>
          <Btn style={{ fontSize: 12, padding: "8px 14px", whiteSpace: "nowrap" }}>Ask Guide</Btn>
        </div>
      </div>

      <div style={{ padding: "16px 20px 0", display: "flex", flexDirection: "column", gap: 16 }}>
        <div style={{ fontSize: 14, fontWeight: 700, color: COLORS.earth }}>🌟 Featured Trips</div>
        {itineraries.map(itin => (
          <Card key={itin.id} style={{ padding: 0, overflow: "hidden" }}>
            <div style={{ background: `linear-gradient(135deg,${itin.color[0]},${itin.color[1]})`, padding: "20px 20px 16px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}><div style={{ fontSize: 40 }}>{itin.emoji}</div><Tag label={itin.tag} /></div>
              <div style={{ fontSize: 18, fontWeight: 800, color: "white", marginTop: 8 }}>{itin.name}</div>
              <div style={{ display: "flex", gap: 10, marginTop: 6 }}><div style={{ fontSize: 12, color: "rgba(255,255,255,0.8)" }}>🗓 {itin.duration}</div><div style={{ fontSize: 12, color: "rgba(255,255,255,0.8)" }}>📍 Livingstone</div></div>
            </div>
            <div style={{ padding: "12px 16px" }}>
              {itin.days[0].items.slice(0, 3).map((item, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "6px 0", borderBottom: i < 2 ? `1px solid ${COLORS.cream}` : "none" }}>
                  <span style={{ fontSize: 16 }}>{item.icon}</span>
                  <div style={{ flex: 1, fontSize: 12, color: COLORS.earth, fontWeight: 500 }}>{item.title}</div>
                  <div style={{ fontSize: 11, color: COLORS.gray }}>{item.time}</div>
                </div>
              ))}
              <div style={{ fontSize: 11, color: COLORS.green, fontWeight: 600, marginTop: 8 }}>+ {itin.days.reduce((n, d) => n + d.items.length, 0) - 3} more activities across {itin.days.length} days</div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 14 }}>
                <div><div style={{ fontSize: 20, fontWeight: 800, color: COLORS.terra }}>${itin.totalPrice.toLocaleString()}</div><div style={{ fontSize: 10, color: COLORS.gray }}>estimated total</div></div>
                <Btn onClick={() => setSelected(itin)} style={{ fontSize: 13, padding: "10px 20px" }}>View Trip →</Btn>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

// ─── GUIDE ────────────────────────────────────────────────────────────────────

function GuideScreen() {
  const [messages, setMessages] = useState(chatHistory);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);
  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages, loading]);

  const send = async (text) => {
    const msg = text || input.trim();
    if (!msg) return;
    setInput("");
    setMessages(prev => [...prev, { role: "user", text: msg }]);
    setLoading(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ model: "claude-sonnet-4-20250514", max_tokens: 1000, system: `You are iTour Guide — Africa's most joyful travel AI. You specialize in Zambia, Livingstone, Victoria Falls, safaris, ceremonies, local restaurants, markets and transport. Speak warmly with pride for African culture. Use African greetings and emojis tastefully. Keep responses concise and practical with specific places, prices, and tips. iTour is by Joie De Vivre Enterprise, founded by Jonathan Mulenga in Livingstone, Zambia.`, messages: [...messages, { role: "user", content: msg }].map(m => ({ role: m.role === "ai" ? "assistant" : "user", content: m.text })) }),
      });
      const data = await res.json();
      setMessages(prev => [...prev, { role: "ai", text: data.content?.[0]?.text || "Connection issue — try again! 🌍" }]);
    } catch { setMessages(prev => [...prev, { role: "ai", text: "Connection issue — I'm here! 🌍" }]); }
    setLoading(false);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "calc(100vh - 70px)" }}>
      <div style={{ background: `linear-gradient(135deg,${COLORS.green},${COLORS.earth})`, padding: "50px 20px 20px", flexShrink: 0 }}>
        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <div style={{ width: 48, height: 48, borderRadius: 24, background: COLORS.gold, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22 }}>🤖</div>
          <div><div style={{ fontSize: 18, fontWeight: 800, color: "white" }}>iTour Guide</div><div style={{ fontSize: 12, color: "rgba(255,255,255,0.7)" }}>🟢 Always here for you</div></div>
        </div>
      </div>
      <div style={{ flex: 1, overflowY: "auto", padding: "16px 16px 8px", display: "flex", flexDirection: "column", gap: 10, background: COLORS.cream }}>
        {messages.map((m, i) => (
          <div key={i} style={{ display: "flex", justifyContent: m.role === "user" ? "flex-end" : "flex-start" }}>
            {m.role === "ai" && <div style={{ width: 28, height: 28, borderRadius: 14, background: COLORS.gold, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, marginRight: 8, flexShrink: 0 }}>🤖</div>}
            <div style={{ maxWidth: "78%", background: m.role === "user" ? `linear-gradient(135deg,${COLORS.gold},${COLORS.terra})` : "white", color: m.role === "user" ? "white" : COLORS.earth, borderRadius: m.role === "user" ? "18px 18px 4px 18px" : "18px 18px 18px 4px", padding: "10px 14px", fontSize: 13, lineHeight: 1.55, boxShadow: "0 2px 8px rgba(0,0,0,0.06)", whiteSpace: "pre-wrap" }}>{m.text}</div>
          </div>
        ))}
        {loading && (
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ width: 28, height: 28, borderRadius: 14, background: COLORS.gold, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14 }}>🤖</div>
            <div style={{ background: "white", borderRadius: "18px 18px 18px 4px", padding: "10px 16px", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
              <div style={{ display: "flex", gap: 4 }}>{[0,1,2].map(i => <div key={i} style={{ width: 7, height: 7, borderRadius: "50%", background: COLORS.gold, animation: `bounce 1.2s ${i*0.2}s infinite` }} />)}</div>
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>
      <div style={{ padding: "8px 16px", background: COLORS.cream, display: "flex", gap: 8, overflowX: "auto", flexShrink: 0 }}>
        {["Add a restaurant","Safari options","Cultural markets","GPS route","Budget options"].map(q => <button key={q} onClick={() => send(q)} style={{ padding: "6px 14px", borderRadius: 20, border: `1.5px solid ${COLORS.gold}`, background: "white", color: COLORS.terra, fontFamily: "'Poppins',sans-serif", fontWeight: 600, fontSize: 11, cursor: "pointer", whiteSpace: "nowrap" }}>{q}</button>)}
      </div>
      <div style={{ padding: "10px 16px 16px", background: "white", flexShrink: 0, borderTop: `1px solid #f0ebe3`, display: "flex", gap: 10, alignItems: "center" }}>
        <div style={{ flex: 1, background: COLORS.cream, borderRadius: 24, padding: "10px 16px", display: "flex", alignItems: "center" }}>
          <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === "Enter" && send()} placeholder="Ask your guide anything..." style={{ border: "none", outline: "none", background: "transparent", fontFamily: "'Poppins',sans-serif", fontSize: 13, width: "100%", color: COLORS.earth }} />
        </div>
        <button onClick={() => send()} style={{ width: 44, height: 44, borderRadius: 22, background: `linear-gradient(135deg,${COLORS.gold},${COLORS.terra})`, border: "none", cursor: "pointer", fontSize: 18, display: "flex", alignItems: "center", justifyContent: "center" }}>➤</button>
      </div>
      <style>{`@keyframes bounce{0%,80%,100%{transform:scale(0.8);opacity:0.5}40%{transform:scale(1.2);opacity:1}}`}</style>
    </div>
  );
}

// ─── PROFILE ──────────────────────────────────────────────────────────────────

function ProfileScreen() {
  const stats = [{ label: "Trips Taken", val: 7, emoji: "🗺️" }, { label: "Artisans Supported", val: 24, emoji: "🏺" }, { label: "Ceremonies", val: 3, emoji: "🎭" }, { label: "km Explored", val: 340, emoji: "📍" }];
  const trips = [{ name: "Victoria Falls Weekend", date: "Mar 2025", emoji: "🌊", nights: 2 }, { name: "Kafue Safari Escape", date: "Jan 2025", emoji: "🦁", nights: 3 }, { name: "South Luangwa Valley", date: "Nov 2024", emoji: "🐘", nights: 4 }];

  return (
    <div style={styles.screen}>
      <div style={{ background: `linear-gradient(160deg,${COLORS.earth},${COLORS.dark})`, padding: "50px 20px 30px" }}>
        <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
          <div style={{ width: 64, height: 64, borderRadius: 32, background: `linear-gradient(135deg,${COLORS.gold},${COLORS.terra})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28 }}>👨🏾‍💼</div>
          <div>
            <div style={{ fontWeight: 800, fontSize: 20, color: "white" }}>Jonathan Mulenga</div>
            <div style={{ fontSize: 12, color: "rgba(255,255,255,0.65)" }}>Livingstone, Zambia 🇿🇲</div>
            <div style={{ marginTop: 4 }}><VerifiedBadge small /></div>
          </div>
        </div>
      </div>
      <div style={{ padding: 20 }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: COLORS.gray, letterSpacing: 1, marginBottom: 10 }}>MY IMPACT</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 10, marginBottom: 20 }}>
          {stats.map(s => <Card key={s.label} style={{ textAlign: "center", padding: "16px 12px" }}><div style={{ fontSize: 24 }}>{s.emoji}</div><div style={{ fontSize: 26, fontWeight: 800, color: COLORS.terra }}>{s.val}</div><div style={{ fontSize: 11, color: COLORS.gray }}>{s.label}</div></Card>)}
        </div>
        <div style={{ fontSize: 11, fontWeight: 700, color: COLORS.gray, letterSpacing: 1, marginBottom: 10 }}>MY TRIPS</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 20 }}>
          {trips.map(t => <Card key={t.name} style={{ display: "flex", alignItems: "center", gap: 14 }}><div style={{ width: 48, height: 48, borderRadius: 14, background: `${COLORS.earth}22`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22 }}>{t.emoji}</div><div style={{ flex: 1 }}><div style={{ fontWeight: 700, fontSize: 14, color: COLORS.earth }}>{t.name}</div><div style={{ fontSize: 11, color: COLORS.gray }}>{t.date} · {t.nights} nights</div></div><div style={{ fontSize: 20, color: COLORS.gold }}>📖</div></Card>)}
        </div>
        <div style={{ fontSize: 11, fontWeight: 700, color: COLORS.gray, letterSpacing: 1, marginBottom: 10 }}>SETTINGS</div>
        <Card style={{ padding: 0 }}>
          {[{ icon: "💳", label: "Payment Methods" }, { icon: "🌍", label: "Language: English" }, { icon: "📴", label: "Offline Mode" }, { icon: "🔔", label: "Notifications" }, { icon: "🎨", label: "Dark Mode" }].map((item, i, arr) => (
            <div key={item.label} style={{ display: "flex", alignItems: "center", gap: 14, padding: "14px 16px", borderBottom: i < arr.length - 1 ? `1px solid ${COLORS.cream}` : "none", cursor: "pointer" }}>
              <span style={{ fontSize: 20 }}>{item.icon}</span>
              <span style={{ flex: 1, fontSize: 14, fontWeight: 500, color: COLORS.earth }}>{item.label}</span>
              <span style={{ color: COLORS.gray, fontSize: 16 }}>›</span>
            </div>
          ))}
        </Card>
      </div>
    </div>
  );
}

// ─── MAIN ─────────────────────────────────────────────────────────────────────

const tabs = [
  { icon: "🏠", label: "Home" }, { icon: "🌍", label: "Explore" },
  { icon: "🗓️", label: "Book" }, { icon: "✨", label: "Trips" },
  { icon: "🤖", label: "Guide" }, { icon: "👤", label: "Me" },
];

export default function iTourApp() {
  const [onboarded, setOnboarded] = useState(false);
  const [tab, setTab] = useState(0);

  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap";
    document.head.appendChild(link);
  }, []);

  const screens = [
    <HomeScreen setTab={setTab} />,
    <ExploreScreen />,
    <BookScreen />,
    <ItinerariesScreen setTab={setTab} />,
    <GuideScreen />,
    <ProfileScreen />,
  ];

  if (!onboarded) return (
    <div style={styles.app}>
      <OnboardingScreen onComplete={() => setOnboarded(true)} />
    </div>
  );

  return (
    <div style={styles.app}>
      {screens[tab]}
      <div style={{ position: "fixed", bottom: 0, left: "50%", transform: "translateX(-50%)", width: "100%", maxWidth: 430, background: "white", borderTop: "1px solid #f0ebe3", display: "flex", zIndex: 50, boxShadow: "0 -4px 24px rgba(38,70,83,0.08)" }}>
        {tabs.map((t, i) => (
          <button key={t.label} onClick={() => setTab(i)} style={{ flex: 1, border: "none", background: "transparent", padding: "10px 0 8px", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: 2, fontFamily: "'Poppins',sans-serif" }}
            onMouseDown={e => e.currentTarget.style.transform="scale(0.88)"} onMouseUp={e => e.currentTarget.style.transform="scale(1)"}>
            <div style={{ fontSize: i === tab ? 21 : 18, transition: "all 0.2s" }}>{t.icon}</div>
            <div style={{ fontSize: 8, fontWeight: i === tab ? 700 : 500, color: i === tab ? COLORS.terra : COLORS.gray }}>{t.label}</div>
            {i === tab && <div style={{ width: 4, height: 4, borderRadius: 2, background: COLORS.gold }} />}
          </button>
        ))}
      </div>
    </div>
  );
}
