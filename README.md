# EcoTamagotchi - Gamified Carbon Footprint Awareness Platform

## 🌍 Chosen Vertical & Challenge
**Challenge 3: Carbon Footprint Awareness Platform**
EcoTamagotchi is a gamified sustainability web application designed to help individuals understand, track, and reduce their carbon footprint through gamification, interactive visual feedback, and daily behavioral challenges.

---

## 💡 System Design & Approach
Traditional carbon footprint software suffers from high user drop-off due to tedious manual form entries (e.g., inputting exact electric utility bills or precise travel mileage). EcoTamagotchi eliminates this friction by leveraging standard carbon-coefficient models mapped to quick-action logs and RPG mechanics.

### Core Logic & Architecture
1. **State-Driven Ecosystem Island:** The application's visual layout serves as an environmental mirror. A global state tracker monitors the user's `ecoScore` (Scale: 0-100). 
   - **High Scores (70-100):** Maintain a thriving virtual ecosystem with vibrant green hues, clear sky backgrounds, and active asset renders.
   - **Low Scores (<40):** Dynamically transition the user interface using muted gray and amber tones, applying an environmental "Smog Cloud" overlay to indicate a degrading ecosystem.
2. **Behavioral Gamification Engine:** Incorporates daily RPG dilemma cards to present hard ecological choices. Choosing lower-emission paths rewards players with in-game currency ("Eco-Shards").
3. **The Eco-Upgrade System:** Players spend accumulated Eco-Shards in a virtual marketplace to buy and visually mount structural assets (e.g., wind turbines, solar panels) onto their virtual environment, directly incentivizing long-term engagement.

---

## 🚀 How the Solution Works
- **State Persistence:** All core metrics (`ecoScore`, `ecoShards`, and unlocked upgrades) are safely tracked across components and saved locally using React lifecycle effects and browser storage.
- **Dynamic Scoring Weights:**
  - Selecting public transit or sustainable diets triggers positive mutations in the global environmental state.
  - Selecting single-occupancy transport or carbon-intensive meals applies temporary state "debuffs" that visibly affect the core island layout.
- **Witty Feedback Layer:** An integrated "Voice of the Island" module serves as a reactive notifier, outputting witty contextual text blocks that praise green choices or humorously highlight negative emission trends.

---

## 📋 Core Assumptions Made
- **Emission Averages:** Standard conversion factors (e.g., private car commutes contributing higher carbon weight units than shared electric transit) are configured using static baseline definitions to keep calculations performant and rapid within a frontend environment.
- **Single-User Scope:** The system assumes a personal context layout tailored to localized daily life decisions.
- **Browser-Based Storage:** Local state caching is utilized to eliminate heavy remote database dependencies, fitting within a lightweight hackathon submission envelope (< 10 MB).
