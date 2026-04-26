import { useState } from "react";
import { applyAction } from "./logic";

function App() {
const initialState = {
 spread: 50,
 resistance: 30,
 stability: 80,
 log: ["Simulation started"],
 status: "Stable",
 gameOver: false,
 result: null,
 turn: 1,
 bossActive: false
};

const [state, setState] = useState(initialState);
const [info, setInfo] = useState("Click an action below to see what it does.");

const handleAction = (action) => {
 if (state.gameOver) return;
 setState(applyAction(state, action));
};

const resetGame = () => {
 setState(initialState);
 setInfo("Click an action below to see what it does.");
};

const descriptions = {
 vaccine: "slows the spread, but the pathogen learns and becomes more resistant as time goes on. be careful :)",
 treatment: "this damages pathogen, but builds good resistance :D",
 isolation: "good in limiting the spread, although it hurts stability D:",
 lockdown: "amazing for containment, but you do compromise on stability ):",
 suppress: "reduces the overall resistance but increases spread. uh oh",
 scan: "this gives a small stability boost and helps with insight >:)",
 aggressive: "very high impact; very high risk ):< "
};

const barStyle = (value, color) => ({
 width: `${value}%`,
 height: 16,
 background: color,
 transition: "0.3s"
});

const alertStyle = {
 animation: "pulse 1.2s infinite"
};

const panel = {
 background: "#020617",
 border: "1px solid #334155",
 borderRadius: 6,
 padding: 12
};

return (
<div style={{
 minHeight: "100vh",
 background: "#020617",
 color: "#e2e8f0",
 fontFamily: "Arial",
 padding: 20,
 boxSizing: "border-box"
}}>

<div style={{
 display: "grid",
 gridTemplateColumns: "2fr 1fr",
 gap: 20,
 maxWidth: 1000,
 margin: "0 auto"
}}>

<div>
<h1 style={{
 color: state.bossActive ? "#f97316" : "#22c55e",
 fontFamily: "Orbitron, sans-serif",
 letterSpacing: "1px"
}}>
 Overfit: Adaptive Collapse
</h1>

<div style={{ ...panel, marginBottom: 15, fontSize: 14, color: "#94a3b8", lineHeight: 1.5 }}>
<p>Hello, Mr. (or Ms.) Bacteriologist,</p>
<p>Welcome to the Overfit Simulation! I take great pride in having you partner with our research team to contain this rapidly evolving outbreak.</p>
<p>Your goal is to contain it by doing three things: make sure its spread is slow, its resistance is controlled, and its stability does not collapse.</p>
<p>Everything you do has an effect on the system. If you overreact, the system breaks. If you underreact, it will spread.</p>
<p>Time to get to work. Bring this pathogen to its knees, and save us all! I believe in you!</p>
</div>

<div style={{ ...panel, marginBottom: 15 }}>
<h3>Turn: {state.turn}</h3>
<h2>Status: {state.status}</h2>

{state.bossActive && (
<div style={{
 background: "rgba(249,115,22,0.1)",
 border: "1px solid #f97316",
 padding: 8,
 borderRadius: 4,
 marginBottom: 10
}}>
 Mutation phase active
</div>
)}

<div style={{
 marginBottom: 10,
 padding: 8,
 border: "1px solid #334155",
 borderRadius: 4
}}>
{state.spread > 80 && (
<p style={{ color: "#ef4444", ...alertStyle }}>
 Outbreak escalating
</p>
)}
{state.resistance > 80 && (
<p style={{ color: "#a855f7", ...alertStyle }}>
 Resistant strain detected
</p>
)}
{state.stability < 30 && (
<p style={{ color: "#22c55e", ...alertStyle }}>
 System critical
</p>
)}
</div>

<p>Spread (transmission rate)</p>
<div style={{ background: "#111" }}>
<div style={barStyle(state.spread, "#ef4444")} />
</div>

<p>Resistance (adaptation level)</p>
<div style={{ background: "#111" }}>
<div style={barStyle(state.resistance, "#8b5cf6")} />
</div>

<p>Stability (system integrity)</p>
<div style={{ background: "#111" }}>
<div style={barStyle(state.stability, "#22c55e")} />
</div>
</div>

{state.gameOver && (
<h2>
{state.result === "WIN"
 ? "Good stuff, you've contained the outbreak :)"
 : "It's over, your system's collapsed :("}
</h2>
)}

<h3 style={{ marginTop: 20 }}>Actions</h3>
<div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
{Object.keys(descriptions).map((action) => (
<button
key={action}
onClick={() => handleAction(action)}
style={{
 padding: "8px 12px",
 background: "#0f172a",
 color: "white",
 border: "1px solid #334155",
 borderRadius: 5,
 cursor: "pointer",
 transition: "0.15s"
}}
onMouseEnter={e => e.target.style.background = "#1e293b"}
onMouseLeave={e => e.target.style.background = "#0f172a"}
>
{action}
</button>
))}
</div>

{state.gameOver && (
<button
onClick={resetGame}
style={{
 marginTop: 15,
 padding: "8px 12px",
 background: "#dc2626",
 color: "white",
 border: "none",
 borderRadius: 5
}}
>
 Restart
</button>
)}

</div>

<div>

<img
src="https://cdn-icons-png.flaticon.com/512/8668/8668554.png"
alt="bacteria"
style={{
 width: 80,
 opacity: state.bossActive ? 0.15 : 0.35,
 display: "block",
 margin: "0 auto 10px auto",
 filter: state.bossActive ? "none" : "grayscale(100%)"
}}
/>

<h3 style={{ color: "#22c55e", letterSpacing: 1 }}>
 SYSTEM INFO
</h3>

<div style={{ ...panel, minHeight: 80 }}>
{info}
</div>

<div style={{ marginTop: 10, display: "flex", flexWrap: "wrap", gap: 6 }}>
{Object.entries(descriptions).map(([key, value]) => (
<button
key={key}
onClick={() => setInfo(`${key}: ${value}`)}
style={{
 fontSize: 12,
 padding: "5px 8px",
 background: "#111",
 color: "#94a3b8",
 border: "1px solid #334155",
 borderRadius: 4
}}
>
{key}
</button>
))}
</div>

<h3 style={{ marginTop: 20 }}>Log</h3>
<ul style={{
 ...panel,
 fontSize: 13,
 fontFamily: "monospace",
 letterSpacing: "0.3px"
}}>
{state.log.map((entry, i) => (
<li
key={i}
style={{
 marginBottom: 4,
 color:
 entry.includes("☠️") ? "#ef4444" :
 entry.includes("⚠️") ? "#f97316" :
 entry.includes("🧬") ? "#a855f7" :
 entry.includes("!") ? "#22c55e" :
 "#94a3b8",
 fontWeight:
 entry.includes("☠️") || entry.includes("⚠️") ? "bold" : "normal"
}}
>
{entry}
</li>
))}
</ul>

</div>

</div>

<style>
{`
 @keyframes pulse {
 0% { opacity: 1; }
 50% { opacity: 0.5; }
 100% { opacity: 1; }
 }
`}
</style>

</div>
);
}

export default App;