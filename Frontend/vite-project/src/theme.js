export const C = {
  bg: "#0B1120",
  surface: "#152030",
  surfaceHigh: "#1C2E42",
  border: "rgba(255,255,255,0.07)",
  borderHover: "rgba(255,255,255,0.14)",
  cyan: "#06B6D4",
  cyanDim: "rgba(6,182,212,0.12)",
  violet: "#8B5CF6",
  violetDim: "rgba(139,92,246,0.12)",
  green: "#10B981",
  amber: "#F59E0B",
  text: "#EFF6FF",
  muted: "#94A3B8",
  dim: "#475569",
};

export const GLOBAL_STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,300&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  .pf { font-family: 'DM Sans', sans-serif; background: ${C.bg}; color: ${C.text}; min-height: 100vh; }
  .display { font-family: 'Syne', sans-serif; }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(18px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes pulseRing {
    0%   { transform: scale(0.95); opacity: 0.8; }
    70%  { transform: scale(1.4);  opacity: 0; }
    100% { transform: scale(0.95); opacity: 0; }
  }
  @keyframes spinArc {
    to { transform: rotate(360deg); }
  }
  @keyframes glowPulse {
    0%, 100% { box-shadow: 0 0 18px rgba(6,182,212,0.25); }
    50%       { box-shadow: 0 0 36px rgba(6,182,212,0.45), 0 0 60px rgba(6,182,212,0.12); }
  }
  @keyframes blink {
    0%, 100% { opacity: 1; } 50% { opacity: 0; }
  }

  .fu  { animation: fadeUp 0.55s ease-out both; }
  .fu1 { animation: fadeUp 0.55s ease-out 0.10s both; }
  .fu2 { animation: fadeUp 0.55s ease-out 0.20s both; }
  .fu3 { animation: fadeUp 0.55s ease-out 0.30s both; }
  .fu4 { animation: fadeUp 0.55s ease-out 0.40s both; }

  .card {
    background: ${C.surface};
    border: 1px solid ${C.border};
    border-radius: 20px;
    padding: 24px;
  }
  .card-lift { transition: transform 0.2s, border-color 0.2s, background 0.2s; }
  .card-lift:hover { transform: translateY(-2px); border-color: ${C.borderHover}; background: ${C.surfaceHigh}; }

  .btn-cta {
    font-family: 'DM Sans', sans-serif;
    background: ${C.cyan};
    color: #0B1120;
    border: none;
    padding: 14px 32px;
    border-radius: 12px;
    font-size: 15px;
    font-weight: 500;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    gap: 8px;
    animation: glowPulse 2.4s infinite;
    transition: background 0.2s, transform 0.15s;
  }
  .btn-cta:hover  { background: #0891B2; transform: translateY(-1px); }
  .btn-cta:active { transform: translateY(0); }
  .btn-cta:disabled { opacity: 0.45; cursor: not-allowed; animation: none; transform: none; }

  .btn-outline {
    font-family: 'DM Sans', sans-serif;
    background: transparent;
    color: ${C.text};
    border: 1px solid ${C.border};
    padding: 11px 22px;
    border-radius: 10px;
    font-size: 14px;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    gap: 6px;
    transition: background 0.2s, border-color 0.2s;
  }
  .btn-outline:hover { background: rgba(255,255,255,0.04); border-color: ${C.borderHover}; }

  .pill {
    display: inline-flex;
    align-items: center;
    padding: 3px 10px;
    border-radius: 99px;
    font-size: 12px;
    font-weight: 500;
  }

  .progress-track {
    background: rgba(255,255,255,0.08);
    border-radius: 99px;
    height: 4px;
    overflow: hidden;
  }
  .progress-fill {
    height: 100%;
    background: linear-gradient(90deg, ${C.cyan}, ${C.violet});
    border-radius: 99px;
    transition: width 0.5s ease;
  }

  .drag-row {
    background: ${C.surface};
    border: 1px solid ${C.border};
    border-radius: 12px;
    padding: 13px 18px;
    cursor: grab;
    user-select: none;
    display: flex;
    align-items: center;
    gap: 12px;
    transition: background 0.15s, border-color 0.15s, transform 0.1s;
  }
  .drag-row:active  { cursor: grabbing; }
  .drag-row.is-over { border-color: ${C.violet}; background: ${C.violetDim}; transform: scale(1.015); }
  .drag-row.dragging{ opacity: 0.45; }

  .option-card {
    background: ${C.surface};
    border: 2px solid ${C.border};
    border-radius: 16px;
    padding: 22px 16px;
    cursor: pointer;
    text-align: center;
    transition: background 0.15s, border-color 0.15s, transform 0.15s;
  }
  .option-card:hover   { border-color: rgba(6,182,212,0.4); background: ${C.cyanDim}; }
  .option-card.chosen  { border-color: ${C.cyan};   background: ${C.cyanDim}; }

  .modal-veil {
    position: fixed;
    inset: 0;
    background: rgba(0,0,0,0.65);
    backdrop-filter: blur(6px);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 200;
  }
  .modal-box {
    background: ${C.surface};
    border: 1px solid ${C.borderHover};
    border-radius: 24px;
    padding: 32px;
    width: 90%;
    max-width: 500px;
    max-height: 80vh;
    overflow-y: auto;
    animation: fadeUp 0.3s ease-out both;
  }
`;