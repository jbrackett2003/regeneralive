import type { Product, Goal, Certification } from "./types";

/**
 * Vivtrue seed list — Section 3: Wellness Wearables, Recovery Gadgets,
 * and Health-Tech Devices. Adds ~22 NEW brands populating the new
 * `wearables-tech` category. Eight Sleep is already on the site.
 *
 * Idempotent INSERT OR IGNORE — safe to re-run.
 */

type Row = {
  slug: string;
  name: string;
  brand: string;
  tagline: string;
  description: string;
  price: number;
  category: "wearables-tech" | "longevity-performance" | "mindful-living";
  goals: Goal[];
  affiliateUrl: string;
  imageUrl: string;
  certs: Certification[];
  pros: string[];
  cons?: string[];
};

const COMMON_CONS = [
  "Premium pricing for premium hardware",
  "Subscription required for some features",
];

const rows: Row[] = [
  // ─────────── Oura Ring ───────────
  {
    slug: "oura-ring-gen-4",
    name: "Oura Ring (Gen 4)",
    brand: "Oura",
    tagline: "The most-researched sleep, HRV, and recovery ring on the market",
    description: `Oura is the gold standard for at-home sleep and recovery tracking. Gen 4 is smaller, lighter, and uses an updated heart-rate sensor with better accuracy during workouts. Sleep staging is independently validated against polysomnography. Cycle tracking, daytime stress, and HRV detection are best-in-class. Battery lasts a full week.`,
    price: 349,
    category: "wearables-tech",
    goals: ["sleep", "longevity"],
    affiliateUrl: "https://ouraring.com",
    imageUrl: "https://images.unsplash.com/photo-1611873002069-cf2bb4f4d2ee?auto=format&fit=crop&w=1400&q=80",
    certs: ["Third-Party Tested"],
    pros: [
      "Best-validated sleep staging vs. PSG",
      "7-day battery life",
      "Daily readiness & HRV scoring",
      "No screen → no notification creep",
    ],
    cons: ["$5.99/mo subscription required for full data"],
  },

  // ─────────── WHOOP ───────────
  {
    slug: "whoop-strap-5-0",
    name: "WHOOP 5.0",
    brand: "WHOOP",
    tagline: "Continuous strain, recovery, sleep, and HRV monitoring band",
    description: `WHOOP is the wearable of choice in pro sports — used by NBA, MLB, and NFL training staffs. The 5.0 hardware adds blood-pressure indicators, ECG, and a 14-day battery life. Subscription model includes the hardware. The Strain score is the most-actionable training-load metric in the consumer wearable space.`,
    price: 30,
    category: "wearables-tech",
    goals: ["performance", "sleep"],
    affiliateUrl: "https://www.whoop.com",
    imageUrl: "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?auto=format&fit=crop&w=1400&q=80",
    certs: ["Third-Party Tested"],
    pros: [
      "Used by pro sports teams",
      "Strain score (training load)",
      "14-day battery (5.0)",
      "Hardware included with subscription",
    ],
    cons: ["Subscription required (no one-time purchase)"],
  },

  // ─────────── Garmin ───────────
  {
    slug: "garmin-fenix-8",
    name: "Garmin Fenix 8",
    brand: "Garmin",
    tagline: "Multi-sport GPS watch with full health, sleep, and recovery suite",
    description: `Garmin's Fenix line is the standard for serious endurance athletes — multi-band GPS, sapphire glass, week-long battery, full health metrics (HRV, sleep, body battery, training readiness), and now AMOLED + dive computer + voice. No subscription required for any of the data.`,
    price: 999,
    category: "wearables-tech",
    goals: ["performance", "sleep"],
    affiliateUrl: "https://www.garmin.com",
    imageUrl: "https://images.unsplash.com/photo-1617043786394-f977fa12eddf?auto=format&fit=crop&w=1400&q=80",
    certs: ["Third-Party Tested"],
    pros: [
      "Multi-band GPS accuracy",
      "Week-long battery life",
      "No subscription required",
      "Full sport + dive + workout library",
    ],
  },

  // ─────────── Apple Watch ───────────
  {
    slug: "apple-watch-ultra-2",
    name: "Apple Watch Ultra 2",
    brand: "Apple",
    tagline: "Apple's flagship outdoor & health watch — ECG, sleep, blood oxygen",
    description: `Apple Watch Ultra 2 is the most-feature-complete consumer health wearable: ECG, blood oxygen, ovulation estimates, sleep tracking, fall detection, ambient noise, water-temperature sensor, and 36-hour battery. Tightly integrated with the Health app + third-party fitness platforms.`,
    price: 799,
    category: "wearables-tech",
    goals: ["performance", "sleep"],
    affiliateUrl: "https://www.apple.com/shop/buy-watch",
    imageUrl: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=1400&q=80",
    certs: ["Third-Party Tested"],
    pros: [
      "ECG + blood oxygen + sleep",
      "36-hour battery",
      "Best-in-class app ecosystem",
      "Fall detection (peace of mind)",
    ],
    cons: ["iPhone required (no Android support)"],
  },

  // ─────────── Fitbit ───────────
  {
    slug: "fitbit-charge-6",
    name: "Fitbit Charge 6",
    brand: "Fitbit",
    tagline: "Beginner-friendly fitness band with full sleep and HRV tracking",
    description: `For the entry-level wearable buyer who wants real metrics without the Apple/Garmin price tag, Charge 6 is the standard pick. Includes ECG, EDA stress sensor, sleep score, daily readiness, and Google integrations (now that Google owns Fitbit).`,
    price: 159,
    category: "wearables-tech",
    goals: ["performance", "sleep"],
    affiliateUrl: "https://www.fitbit.com",
    imageUrl: "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?auto=format&fit=crop&w=1400&q=80",
    certs: ["Third-Party Tested"],
    pros: [
      "Best entry-level fitness band",
      "ECG + EDA + sleep score",
      "Google Maps & Wallet integration",
      "7-day battery",
    ],
    cons: ["Premium features require Fitbit Premium subscription"],
  },

  // ─────────── Polar ───────────
  {
    slug: "polar-h10-chest-strap",
    name: "Polar H10 Heart Rate Sensor",
    brand: "Polar",
    tagline: "The reference-grade chest strap for heart rate accuracy",
    description: `When labs need accurate heart rate data without a 12-lead ECG, they reach for the Polar H10. Bluetooth + ANT+ + 5kHz, dual-channel, validated against medical-grade ECG. Pairs with any modern app (Strava, Zwift, Peloton, MyFitnessPal). The strap that actually-serious cyclists & runners use to verify their watch's optical HR data.`,
    price: 99,
    category: "wearables-tech",
    goals: ["performance"],
    affiliateUrl: "https://www.polar.com",
    imageUrl: "https://images.unsplash.com/photo-1517963879433-6ad2b056d712?auto=format&fit=crop&w=1400&q=80",
    certs: ["Third-Party Tested"],
    pros: [
      "Reference-grade HR accuracy",
      "Pairs with any app",
      "ECG-validated",
      "400-hour battery",
    ],
  },

  // ─────────── Suunto ───────────
  {
    slug: "suunto-9-peak-pro",
    name: "Suunto 9 Peak Pro",
    brand: "Suunto",
    tagline: "Finnish-engineered outdoor sport watch for ultra athletes",
    description: `Suunto is the watch of choice for ultra-runners, trekkers, and adventure athletes. The 9 Peak Pro has dual-band GPS, 21-day standard battery, and a barometric altimeter accurate enough for ridge-line navigation. Not as feature-flush as Garmin, but lighter, cleaner, and more focused on outdoor sport.`,
    price: 499,
    category: "wearables-tech",
    goals: ["performance"],
    affiliateUrl: "https://www.suunto.com",
    imageUrl: "https://images.unsplash.com/photo-1617043786394-f977fa12eddf?auto=format&fit=crop&w=1400&q=80",
    certs: ["Third-Party Tested"],
    pros: [
      "21-day standard battery",
      "Dual-band GPS",
      "Barometric altimeter",
      "Outdoor-athlete focused",
    ],
  },

  // ─────────── Withings ───────────
  {
    slug: "withings-body-scan",
    name: "Withings Body Scan",
    brand: "Withings",
    tagline: "Smart scale with body composition, segmental fat, and 6-lead ECG",
    description: `The most advanced consumer smart scale available — Body Scan does segmental body composition (fat & muscle by limb), nerve activity, vascular age, and a 6-lead ECG, all in 30 seconds of standing on it. FDA-cleared for AFib detection. Shipping is finally available in the US after a long FDA wait.`,
    price: 399,
    category: "wearables-tech",
    goals: ["longevity", "performance"],
    affiliateUrl: "https://www.withings.com",
    imageUrl: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=1400&q=80",
    certs: ["Third-Party Tested"],
    pros: [
      "Segmental body comp",
      "FDA-cleared 6-lead ECG",
      "Nerve activity score",
      "Multi-user automatic recognition",
    ],
  },

  // ─────────── Muse ───────────
  {
    slug: "muse-s-headband",
    name: "Muse S (Gen 2) Headband",
    brand: "Muse",
    tagline: "EEG meditation headband — real-time feedback on a wandering mind",
    description: `Muse uses a 4-channel EEG to detect when your mind is calm vs. wandering during meditation, then plays subtle audio cues (waves, birds) that quiet down when you're focused. The most-evidence-backed meditation hardware on the market — used in 1500+ research studies.`,
    price: 399,
    category: "wearables-tech",
    goals: ["focus", "sleep"],
    affiliateUrl: "https://choosemuse.com",
    imageUrl: "https://images.unsplash.com/photo-1545389336-cf090694435e?auto=format&fit=crop&w=1400&q=80",
    certs: ["Third-Party Tested"],
    pros: [
      "4-channel research-grade EEG",
      "Used in 1500+ studies",
      "Sleep tracking + sleep meditation",
      "Real-time meditation feedback",
    ],
  },

  // ─────────── Apollo Neuro ───────────
  {
    slug: "apollo-neuro-wearable",
    name: "Apollo Neuro Wearable",
    brand: "Apollo Neuro",
    tagline: "Wrist or ankle band that uses gentle vibration to shift nervous system state",
    description: `Developed by neuroscientists from the University of Pittsburgh, Apollo uses Soothing Touch frequencies — sub-audible vibration patterns — to guide your nervous system toward calm or alertness. Published peer-reviewed evidence for HRV improvement and sleep quality. Wear during meditation, focus blocks, or wind-down.`,
    price: 349,
    category: "wearables-tech",
    goals: ["sleep", "focus"],
    affiliateUrl: "https://apolloneuro.com",
    imageUrl: "https://images.unsplash.com/photo-1605296867304-46d5465a13f1?auto=format&fit=crop&w=1400&q=80",
    certs: ["Third-Party Tested"],
    pros: [
      "Peer-reviewed HRV evidence",
      "No medication, no side effects",
      "Wear at wrist or ankle",
      "Modes for sleep, focus, recovery",
    ],
  },

  // ─────────── Sensate ───────────
  {
    slug: "sensate-vagus-nerve-pebble",
    name: "Sensate Vagus Nerve Stimulation Pebble",
    brand: "Sensate",
    tagline: "Chest-resting stone that tones the vagus nerve via infrasonic resonance",
    description: `Sensate places a smooth pebble on your sternum that emits low-frequency vibration patterns timed with paired audio. Stimulates the vagus nerve through chest-cavity resonance — a different mechanism than ear-clip vagus stimulators. Clinically tested for stress and HRV improvement in 10-minute sessions.`,
    price: 249,
    category: "wearables-tech",
    goals: ["sleep", "focus"],
    affiliateUrl: "https://www.getsensate.com",
    imageUrl: "https://images.unsplash.com/photo-1545389336-cf090694435e?auto=format&fit=crop&w=1400&q=80",
    certs: ["Third-Party Tested"],
    pros: [
      "Infrasonic vagus stimulation",
      "10-minute sessions",
      "No skin contact electrodes",
      "Clinically tested HRV impact",
    ],
  },

  // ─────────── Pulsetto ───────────
  {
    slug: "pulsetto-vagus-nerve-device",
    name: "Pulsetto Vagus Nerve Stimulator",
    brand: "Pulsetto",
    tagline: "Necklace-style transcutaneous vagus nerve stimulation",
    description: `Pulsetto stimulates the vagus nerve transcutaneously through the neck — the same mechanism used in clinical-grade VNS devices but at a consumer price point. Five mode options (stress, sleep, anxiety, burnout, pain). 4-minute sessions, twice daily.`,
    price: 269,
    category: "wearables-tech",
    goals: ["sleep", "focus"],
    affiliateUrl: "https://pulsetto.tech",
    imageUrl: "https://images.unsplash.com/photo-1605296867304-46d5465a13f1?auto=format&fit=crop&w=1400&q=80",
    certs: ["Third-Party Tested"],
    pros: [
      "Transcutaneous VNS",
      "5 modes (stress/sleep/anxiety/burnout/pain)",
      "4-minute sessions",
      "Bluetooth-controlled via app",
    ],
  },

  // ─────────── Mendi ───────────
  {
    slug: "mendi-neurofeedback-headband",
    name: "Mendi Brain Training Headband",
    brand: "Mendi",
    tagline: "fNIRS neurofeedback headband for prefrontal cortex training",
    description: `Mendi uses functional near-infrared spectroscopy (fNIRS) to measure prefrontal cortex blood flow in real time. You play a focus game on the app — the better your prefrontal activation, the higher you score. Like a gym for the focus muscle.`,
    price: 279,
    category: "wearables-tech",
    goals: ["focus"],
    affiliateUrl: "https://www.mendi.io",
    imageUrl: "https://images.unsplash.com/photo-1545389336-cf090694435e?auto=format&fit=crop&w=1400&q=80",
    certs: ["Third-Party Tested"],
    pros: [
      "fNIRS prefrontal cortex training",
      "Gamified focus practice",
      "10-min sessions",
      "Supported by neuroscience research",
    ],
  },

  // ─────────── Hapbee ───────────
  {
    slug: "hapbee-wellness-wearable",
    name: "Hapbee Wellness Wearable",
    brand: "Hapbee",
    tagline: "Magnetic-field signal device for sleep, focus, and relaxation modes",
    description: `Hapbee uses ulRFE® (ultra low radio frequency energy) — the magnetic signatures of caffeine, melatonin, and other compounds — to nudge your body into different states without ingesting anything. The science is novel and the personal anecdotes are strong. Try it as a no-risk experiment.`,
    price: 379,
    category: "wearables-tech",
    goals: ["sleep", "focus"],
    affiliateUrl: "https://hapbee.com",
    imageUrl: "https://images.unsplash.com/photo-1605296867304-46d5465a13f1?auto=format&fit=crop&w=1400&q=80",
    certs: ["Third-Party Tested"],
    pros: [
      "Drug-free signal-based modes",
      "Sleep / focus / calm options",
      "30-day trial available",
      "No ingestion, no chemicals",
    ],
  },

  // ─────────── Kineon ───────────
  {
    slug: "kineon-move-plus-red-light",
    name: "Kineon Move+ Pro Red Light Therapy",
    brand: "Kineon",
    tagline: "Targeted red-light + laser device for joints, knees, and shoulders",
    description: `Most red-light panels don't penetrate deep enough to treat joints. Kineon's Move+ uses a hybrid LED + laser array (635nm + 808nm wavelengths) at clinical-grade fluence to actually reach joint tissue. Designed for chronic knee pain, shoulder issues, and post-workout recovery.`,
    price: 599,
    category: "wearables-tech",
    goals: ["performance", "longevity"],
    affiliateUrl: "https://kineon.io",
    imageUrl: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1400&q=80",
    certs: ["Third-Party Tested"],
    pros: [
      "Hybrid LED + laser (deeper penetration)",
      "Clinical-grade fluence",
      "Targeted at joints (not full body)",
      "Cordless, wearable design",
    ],
  },

  // ─────────── BON CHARGE ───────────
  {
    slug: "boncharge-red-light-face-mask",
    name: "Red Light Face Mask",
    brand: "BON CHARGE",
    tagline: "FDA-cleared LED light therapy mask for skin rejuvenation",
    description: `BON CHARGE (founded by Andy Mant of biohacker community fame) makes the most accessible red-light face mask on the market — FDA-cleared, 660nm + 850nm wavelengths, hands-free design. Used 10 minutes a day, the published research shows real collagen stimulation and acne reduction.`,
    price: 269,
    category: "wearables-tech",
    goals: ["skin"],
    affiliateUrl: "https://boncharge.com",
    imageUrl: "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=1400&q=80",
    certs: ["Third-Party Tested"],
    pros: [
      "FDA-cleared",
      "660nm + 850nm dual wavelength",
      "Hands-free",
      "10-minute daily session",
    ],
  },
  {
    slug: "boncharge-blue-light-glasses",
    name: "Blue-Light-Blocking Glasses",
    brand: "BON CHARGE",
    tagline: "Amber lenses that block 100% of evening blue light",
    description: `Most blue-light glasses block ~30%. BON CHARGE's amber lenses block 100% of 380-500nm wavelengths — the band that actually suppresses melatonin. Wear from 2-3 hours before bed for the cleanest sleep onset.`,
    price: 79,
    category: "wearables-tech",
    goals: ["sleep"],
    affiliateUrl: "https://boncharge.com",
    imageUrl: "https://images.unsplash.com/photo-1614632536970-346cb6e8b9ac?auto=format&fit=crop&w=1400&q=80",
    certs: ["Third-Party Tested"],
    pros: [
      "100% blue-light block (380-500nm)",
      "Independently tested",
      "Stylish frames",
      "Dramatic sleep-onset effect",
    ],
  },

  // ─────────── HigherDOSE ───────────
  {
    slug: "higherdose-infrared-sauna-blanket",
    name: "Infrared Sauna Blanket V4",
    brand: "HigherDOSE",
    tagline: "Far-infrared sauna in a roll-up blanket — 30 minutes, deep sweat",
    description: `For renters or anyone without space for a sauna cabin, HigherDOSE's V4 blanket is the cult favorite. Far-infrared (heats your body, not the air) at temperatures up to 158°F. Amethyst, tourmaline, and charcoal layers add far-infrared boost. 30 minutes = a real, deep sweat.`,
    price: 599,
    category: "wearables-tech",
    goals: ["longevity", "performance"],
    affiliateUrl: "https://higherdose.com",
    imageUrl: "https://images.unsplash.com/photo-1583416750470-965b2707b355?auto=format&fit=crop&w=1400&q=80",
    certs: ["Third-Party Tested"],
    pros: [
      "Far-infrared in roll-up form",
      "Up to 158°F",
      "Amethyst + tourmaline boost",
      "30-minute sessions",
    ],
  },

  // ─────────── Therabody ───────────
  {
    slug: "theragun-pro-plus",
    name: "Theragun Pro Plus",
    brand: "Therabody",
    tagline: "Top-tier percussion therapy gun with built-in red light and vibration",
    description: `The Pro Plus is Therabody's flagship — 60 lbs of force, 16mm amplitude (deep tissue), Bluetooth-controlled with built-in red light therapy and vibration heat at the head. Used by NBA, NFL, and elite training staffs. Two-year warranty.`,
    price: 599,
    category: "wearables-tech",
    goals: ["performance"],
    affiliateUrl: "https://www.therabody.com",
    imageUrl: "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?auto=format&fit=crop&w=1400&q=80",
    certs: ["Third-Party Tested"],
    pros: [
      "60 lbs force, 16mm depth",
      "Built-in red light + heat",
      "Bluetooth app guidance",
      "2-year warranty",
    ],
  },

  // ─────────── Hyperice ───────────
  {
    slug: "hyperice-normatec-3",
    name: "Normatec 3 Compression Recovery System",
    brand: "Hyperice",
    tagline: "Pulse-pattern compression boots — 30 minutes equals a 2-hour walk",
    description: `Normatec 3 uses dynamic air-compression patterns to flush metabolic waste and increase circulation in tired legs. The same system used by Olympic teams, NBA franchises, and Tour de France squads. 30 minutes after a hard workout dramatically reduces next-day soreness.`,
    price: 799,
    category: "wearables-tech",
    goals: ["performance"],
    affiliateUrl: "https://hyperice.com",
    imageUrl: "https://images.unsplash.com/photo-1605296867304-46d5465a13f1?auto=format&fit=crop&w=1400&q=80",
    certs: ["Third-Party Tested"],
    pros: [
      "Used by Olympic & pro teams",
      "Dynamic pulse compression patterns",
      "Wireless, app-controlled",
      "Significant DOMS reduction",
    ],
  },

  // ─────────── Omron ───────────
  {
    slug: "omron-evolv-blood-pressure",
    name: "Evolv Wireless Blood Pressure Monitor",
    brand: "Omron",
    tagline: "Tubeless, app-connected blood pressure cuff — clinical-grade accuracy",
    description: `Omron is the #1 doctor-recommended brand for home blood pressure. The Evolv is the cleanest model — tubeless, fits the upper arm, syncs to the app via Bluetooth. Validated to AAMI/ESH/ISO 81060-2 standards (the gold standard for BP cuffs).`,
    price: 99,
    category: "wearables-tech",
    goals: ["longevity"],
    affiliateUrl: "https://omronhealthcare.com",
    imageUrl: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=1400&q=80",
    certs: ["Third-Party Tested"],
    pros: [
      "#1 doctor-recommended BP brand",
      "Validated to AAMI/ESH standards",
      "Tubeless design",
      "Bluetooth app sync",
    ],
  },

  // ─────────── Levels ───────────
  {
    slug: "levels-cgm-program",
    name: "Levels Continuous Glucose Monitor Program",
    brand: "Levels",
    tagline: "CGM + metabolic-health app — see how every food affects your glucose",
    description: `Levels turns a continuous glucose monitor (Dexcom or Stelo) into a metabolic-health insight engine. The app scores your meals, ranks your spikes, and surfaces patterns you'd never catch from a finger-stick. 30+ days of CGM data is paradigm-shifting for most people, even if their fasting glucose is "normal."`,
    price: 199,
    category: "wearables-tech",
    goals: ["longevity", "energy"],
    affiliateUrl: "https://www.levels.com",
    imageUrl: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1400&q=80",
    certs: ["Third-Party Tested"],
    pros: [
      "CGM + metabolic insights",
      "Meal scoring + pattern recognition",
      "Available without prescription",
      "Pairs with Dexcom or Stelo",
    ],
    cons: ["Subscription model after first month"],
  },

  // ─────────── Nutrisense ───────────
  {
    slug: "nutrisense-cgm-nutritionist",
    name: "Nutrisense CGM + Nutritionist Program",
    brand: "Nutrisense",
    tagline: "CGM with a credentialed nutritionist — 1:1 metabolic coaching",
    description: `Like Levels but with a registered dietitian assigned to you for the duration of the program. Read your data, ask questions, get personalized adjustments. Better fit for people who want guided support rather than self-driven analytics.`,
    price: 299,
    category: "wearables-tech",
    goals: ["longevity", "energy"],
    affiliateUrl: "https://www.nutrisense.io",
    imageUrl: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1400&q=80",
    certs: ["Third-Party Tested"],
    pros: [
      "1:1 with registered dietitian",
      "Personalized food adjustments",
      "Guided onboarding",
      "Pairs with Dexcom",
    ],
  },

  // ─────────── Lumen ───────────
  {
    slug: "lumen-metabolism-tracker",
    name: "Lumen Metabolism Breath Tracker",
    brand: "Lumen",
    tagline: "Handheld CO2 sensor that reads whether you're burning fat or carbs",
    description: `Lumen measures the CO2 concentration in your breath — a clinically validated proxy for whether your body is currently burning carbs or fat. Use it morning, pre-workout, post-meal to see your metabolic flexibility in real time. The most-discussed metabolic-health gadget after CGMs.`,
    price: 249,
    category: "wearables-tech",
    goals: ["longevity", "performance"],
    affiliateUrl: "https://www.lumen.me",
    imageUrl: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=1400&q=80",
    certs: ["Third-Party Tested"],
    pros: [
      "Real-time fuel-source readout",
      "No CGM required",
      "Validated against indirect calorimetry",
      "App-guided personalized plan",
    ],
  },
];

export const vivtrueWearables: Product[] = rows.map((r, idx) => ({
  id: `p-${r.slug}`,
  slug: r.slug,
  name: r.name,
  brand: r.brand,
  tagline: r.tagline,
  description: r.description,
  price: r.price,
  currency: "USD",
  imageUrl: r.imageUrl,
  categorySlug: r.category,
  affiliateUrl: r.affiliateUrl,
  merchant: r.brand,
  certifications: r.certs,
  goals: r.goals,
  rating: 4.6,
  isEditorPick: idx < 4,
  isFeatured: idx < 2,
  pros: r.pros,
  cons: r.cons ?? COMMON_CONS,
  ingredients: r.tagline,
  servingSize: "Hardware device — see manufacturer specifications",
}));