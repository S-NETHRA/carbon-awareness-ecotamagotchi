# EcoTamagotchi 🏝️

**EcoTamagotchi** is a gamified carbon-awareness and sustainability tracker built with Next.js, TypeScript, and Tailwind CSS. The app features a live visual "Ecosystem Island" that grows, degrades, and updates in real time based on your daily transit, diet, and energy decisions.

---

## 🚀 Getting Started

To run the application locally:

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start the development server**:
   ```bash
   npm run dev
   ```

3. Open your browser and navigate to `http://localhost:3000`.

---

## 🎮 Core Features

### 1. The Virtual Island (Visual Core)
- **State-Reactive Sky & Water**: If the `ecoScore` is high (70-100), the skies clear to vibrant turquoise/emerald tones. If the score plunges (under 40), the environment decays into amber-grays, displaying an animated "Smog Cloud" overlay representing environmental degradation.
- **Dynamic Assets**: Earn Eco-Shards to purchase structural improvements from the Store. Once unlocked, visual components dynamically construct onto the floating SVG island container:
  - **Lush Forest**: Grows animated tree clusters.
  - **Wind Turbine**: Mounts a wind turbine with a rotor speed that spins relative to the health of the island.
  - **Solar Panel Array**: Installs custom solar panels with ambient gleam indicators.
  - **Eco-Dome**: wraps the floating island in a protective pulsating energy shield.

### 2. Logging Drawer & State Hook
- Slide out the action logger from the top bar to record activities like:
  - **Transport**: Cycle Commute (`+10` Score, `+5` Shards), Electric Metro (`+5` Score, `+3` Shards), Solo Car (`-15` Score).
  - **Diet**: Vegan Meal (`+8` Score, `+4` Shards), Dairy (`-2` Score, `+1` Shards), Red Meat (`-12` Score).
  - **Energy**: Eco Mode AC (`+6` Score, `+3` Shards), Left Devices On (`-10` Score).
- All changes dynamically recalculate balances and append activities into a local ledger. State values persist across page reloads using browser local storage.

### 3. RPG Quests (Daily Dilemmas)
- A narrative quest card presents tough choices (e.g., opting for public transport vs. a private taxi ride in the rain). Choosing paths grants score rewards and Eco-Shards. Supports rotation decks for developer testing.

### 4. "Daily Roast" Voice of the Island
- An interactive chatbot representing **Oasis**, the spirit of the island, that evaluates your recent records and gives witty, sarcastic, or encouraging feedback based on your habits.

---

## 🛠️ Developer Tools
- A **Dev Tool Slider** is mounted at the top of the main screen so developers can easily slide the `ecoScore` from `0` to `100` to inspect smog cloud overlays, water tint updates, and visual threshold transitions instantaneously.
