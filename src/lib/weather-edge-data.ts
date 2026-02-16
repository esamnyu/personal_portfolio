export interface Trade {
  id: string;
  ticker: string;
  city: string;
  bracket: string;
  side: "yes" | "no";
  entryPrice: number;
  exitPrice: number | null;
  contracts: number;
  status: "settled" | "closed" | "open" | "resting";
  pnl: number | null;
  entryDate: string;
  exitDate: string | null;
  strategies: string[];
  confidence: number;
  notes: string;
}

export interface SystemMetric {
  label: string;
  value: string;
  detail: string;
}

export const trades: Trade[] = [
  {
    id: "trade-001",
    ticker: "KXHIGHLAX-26FEB12-T64",
    city: "LAX",
    bracket: "62-64\u00b0F",
    side: "yes",
    entryPrice: 5,
    exitPrice: 11,
    contracts: 25,
    status: "settled",
    pnl: 0.72,
    entryDate: "2026-02-11",
    exitDate: "2026-02-12",
    strategies: ["Ensemble Divergence", "Rounding Arbitrage"],
    confidence: 93,
    notes: "Freerolled at 11\u00a2 — sold 12 contracts to recover cost basis, rode remaining 13 to settlement.",
  },
  {
    id: "trade-002",
    ticker: "KXHIGHLAX-26FEB15-B62.5",
    city: "LAX",
    bracket: "62-64\u00b0F",
    side: "yes",
    entryPrice: 26,
    exitPrice: 30,
    contracts: 10,
    status: "closed",
    pnl: 1.45,
    entryDate: "2026-02-14",
    exitDate: "2026-02-15",
    strategies: ["NWS vs Ensemble Divergence"],
    confidence: 91,
    notes: "Freeroll sell attempted at 47\u00a2 but didn\u2019t fill. Trailing stop triggered at 30\u00a2 — locked in profit.",
  },
];

export const systemMetrics: SystemMetric[] = [
  { label: "Win Rate", value: "100%", detail: "2 of 2 trades profitable" },
  { label: "Total PnL", value: "+$2.17", detail: "Realized across all closed positions" },
  { label: "Avg Confidence", value: "92", detail: "Only trades scoring 90+ are executed" },
  { label: "Cities Covered", value: "5", detail: "NYC, CHI, DEN, MIA, LAX" },
  { label: "Ensemble Models", value: "194", detail: "Members across 5 model families" },
  { label: "Uptime", value: "24/7", detail: "Cron-scheduled scans 5x daily" },
];

export const alphaStrategies = [
  {
    name: "Midnight High",
    tag: "A",
    description:
      "Post-frontal cold advection sets the daily high at midnight before cold air arrives. The system detects when overnight temps exceed afternoon forecasts.",
  },
  {
    name: "Wind Mixing Penalty",
    tag: "B",
    description:
      "Strong winds prevent super-adiabatic surface heating. Gusts above 15 mph mechanically cap temperatures 1-2\u00b0F below clear-sky forecasts.",
  },
  {
    name: "Rounding Arbitrage",
    tag: "C",
    description:
      "NWS rounds to the nearest whole degree. A physics model suggesting 34.4\u00b0F means the reported high lands in a different bracket than 34.5\u00b0F.",
  },
  {
    name: "Wet Bulb Depression",
    tag: "D",
    description:
      "Daytime precipitation probability above 40% caps the high below the dry-bulb forecast through evaporative cooling.",
  },
  {
    name: "NWS vs Ensemble Divergence",
    tag: "E",
    description:
      "When the NWS point forecast diverges more than 2\u00b0F from the 194-member ensemble mean, the ensemble captures newer data the forecaster may have missed.",
  },
];

export const pipelineSteps = [
  {
    step: 1,
    title: "Ensemble Ingestion",
    description: "Pull 194 forecast members from 5 model families via Open-Meteo API",
  },
  {
    step: 2,
    title: "KDE Probability Engine",
    description: "Gaussian kernel density estimation smooths discrete members into a continuous PDF",
  },
  {
    step: 3,
    title: "Physics Corrections",
    description: "Apply wind mixing, wet bulb depression, and rounding adjustments",
  },
  {
    step: 4,
    title: "Market Comparison",
    description: "Compare model probability against Kalshi bid/ask to find mispriced brackets",
  },
  {
    step: 5,
    title: "Confidence Scoring",
    description: "All 5 checks must pass (ensemble spread, model agreement, NWS alignment, observations)",
  },
  {
    step: 6,
    title: "Automated Execution",
    description: "Limit orders placed at bid+1\u00a2 for maker fee (0%). Position monitor handles exits.",
  },
];
