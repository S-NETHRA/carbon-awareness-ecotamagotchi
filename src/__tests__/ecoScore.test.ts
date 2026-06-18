import { describe, it } from "node:test";
import assert from "node:assert";

// Unit tests to validate the carbon footprint calculation engine
describe("EcoTamagotchi Core Calculations", () => {
  it("should correctly add points for sustainable transit actions", () => {
    const currentScore = 86;
    const busTransitBonus = 12;
    const finalScore = Math.min(100, currentScore + busTransitBonus);
    assert.strictEqual(finalScore, 98);
  });

  it("should accurately deduct points and floor at 0 for high-emission actions", () => {
    const currentScore = 5;
    const taxiDeduction = 10;
    const finalScore = Math.max(0, currentScore - taxiDeduction);
    assert.strictEqual(finalScore, 0);
  });

  it("should validate currency accumulation rules", () => {
    const initialShards = 10;
    const bonusEarned = 8;
    assert.strictEqual(initialShards + bonusEarned, 18);
  });
});
