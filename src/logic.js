export function applyAction(state, action) {
 let { spread, resistance, stability, turn } = state;
 let bossActive = state.bossActive || false;

 // Common variables such as the ones used in the log system and etc.
 let logEntries = [];

 // Actions involving the various paths

 if (action === "vaccine") {
  spread -= 18;
  resistance += 18;
  stability -= 8;
  logEntries.push("Vaccine has been deployed!");
 }

 if (action === "treatment") {
  stability -= 10;
  resistance += 8;
  logEntries.push("Treatment has been applied!");
 }

 if (action === "isolation") {
  spread -= 25;
  stability -= 8 + (state.containmentCount || 0) * 5;
  logEntries.push("Isolation has been enforced!");
 }

 if (action === "lockdown") {
  spread -= 30;
  stability -= 15 + (state.containmentCount || 0) * 6;
  logEntries.push("Lockdown has been enforced!");
 }

 if (action === "suppress") {
  resistance -= 20;
  spread += 10;
  stability -= 8;
  logEntries.push("Mutation has been suppressed!");
 }

 if (action === "scan") {
  stability += 5;
  resistance += 5;
  logEntries.push(
   bossActive
    ? "Scan has revealed unstable mutation patterns!"
    : "Genetic scan is now complete!"
  );
 }

 if (action === "aggressive") {
  spread -= 10;
  resistance += 25;
  stability -= 20;
  logEntries.push("Aggressive treatment has been deployed!");
 }

 // -- Begin of the passive system dynamics and feedback loops
 if (!bossActive && turn >= 8) {
  bossActive = true;
  logEntries.push("🧬 MUTATION EVENT: Strain has evolved!");
 }

 // Passive system dynamic

 // Time based pressure heavily inspired by other dynamic system models which have various feedback loops and etc.
 if (!bossActive) {
  spread += 5 + Math.floor(turn / 3);
  resistance += 2;
  stability -= 3;
 } else {
  spread += 7 + Math.floor(turn / 2);
  resistance += 4;
  stability -= 4;

  // This is the periodic surge helping to make the boss stage more difficult
  if (turn % 3 === 0) {
   spread += 12;
   logEntries.push("🧬 A Mutation surge!");
  }
 }

 // The feedback loop! containment = resistance = spread
 if (state.lastAction === "lockdown") {
  resistance += 3;
  logEntries.push("The pathogen is adapting to containment!");
 }

 // Consequences of each factor

 // High spread scenarios much like real-world outbreaks
 if (spread > 75) {
  stability -= 8;
  logEntries.push("⚠️ The system is overwhelmed!");
 }

 // Mutation amplifies spread under high resistance which creates an over-specialized strain.
 if (bossActive && resistance > 70) {
  spread += 5;
  logEntries.push("⚠️ The mutated strain is amplifying spread!");
 }

 // Excess resistance starting a collapse
 if (resistance > 85) {
  stability -= 12;
  spread += 6;
  logEntries.push("Yikes, Overfit collapse!");
 }

 // System for citizen unrest for low stability
 if (
  stability < 40 &&
  (action === "isolation" || action === "lockdown")
 ) {
  spread += 10;
  logEntries.push(
   "Watch out! Public has begun to refuse containment measures!"
  );
 }

 // Clamped values keeping everything in ordeer

 spread = Math.max(0, Math.min(100, spread));
 resistance = Math.max(0, Math.min(100, resistance));
 stability = Math.max(0, Math.min(100, stability));

 // Status breakdown in the message system

 let status = "Stable";
 if (spread > 70) status = "Outbreak";
 if (resistance > 70) status = "Resistant";
 if (stability < 30) status = "Critical";

 // Here are the end conditions

 let gameOver = false;
 let result = null;

 if (stability <= 0) {
  gameOver = true;
  result = "LOSE";
 }

 // Win condition: this is the area for controlled spread
 if (spread <= 5 && resistance < 60) {
  gameOver = true;
  result = "WIN";
 }

 // This log system utilizes rolling windows which helps keep everything visible
 return {
  spread,
  resistance,
  stability,
  log: [...logEntries, ...state.log].slice(0, 6),
  status,
  gameOver,
  result,
  turn: turn + 1,
  bossActive,
  lastAction: action
 };
}