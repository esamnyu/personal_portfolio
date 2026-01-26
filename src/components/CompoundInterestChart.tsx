"use client";

import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";

interface Scenario {
  name: string;
  monthlyContribution: number;
  startAge: number;
  color: string;
  description: string;
}

const scenarios: Scenario[] = [
  {
    name: "Start at 25",
    monthlyContribution: 500,
    startAge: 25,
    color: "#c9a962", // gold
    description: "Starting early with $500/month",
  },
  {
    name: "Start at 35",
    monthlyContribution: 500,
    startAge: 35,
    color: "#6b8cce", // blue
    description: "Same amount, 10 years later",
  },
  {
    name: "Catch-up at 35",
    monthlyContribution: 1000,
    startAge: 35,
    color: "#7c9473", // green
    description: "Double the contribution to catch up",
  },
];

const ANNUAL_RETURN = 0.07;
const END_AGE = 65;

function calculateCompoundGrowth(
  monthlyContribution: number,
  startAge: number,
  endAge: number,
  annualReturn: number
): { age: number; value: number; contributions: number }[] {
  const monthlyReturn = annualReturn / 12;
  const results: { age: number; value: number; contributions: number }[] = [];
  let balance = 0;
  let totalContributions = 0;

  for (let age = startAge; age <= endAge; age++) {
    if (age > startAge) {
      for (let month = 0; month < 12; month++) {
        balance = balance * (1 + monthlyReturn) + monthlyContribution;
        totalContributions += monthlyContribution;
      }
    }
    results.push({
      age,
      value: Math.round(balance),
      contributions: Math.round(totalContributions),
    });
  }

  return results;
}

function formatCurrency(value: number): string {
  if (value >= 1000000) {
    return `$${(value / 1000000).toFixed(2)}M`;
  } else if (value >= 1000) {
    return `$${(value / 1000).toFixed(0)}K`;
  }
  return `$${value}`;
}

export const CompoundInterestChart: React.FC = () => {
  const [hoveredScenario, setHoveredScenario] = useState<string | null>(null);

  const scenarioData = useMemo(() => {
    return scenarios.map((scenario) => ({
      ...scenario,
      data: calculateCompoundGrowth(
        scenario.monthlyContribution,
        scenario.startAge,
        END_AGE,
        ANNUAL_RETURN
      ),
    }));
  }, []);

  const maxValue = useMemo(() => {
    return Math.max(...scenarioData.flatMap((s) => s.data.map((d) => d.value)));
  }, [scenarioData]);

  const chartHeight = 300;

  const getY = (value: number): number => {
    return chartHeight - (value / maxValue) * chartHeight;
  };

  const generatePath = (
    data: { age: number; value: number }[]
  ): string => {
    const points = data.map((d, i) => {
      const x = ((d.age - 25) / (END_AGE - 25)) * 100;
      const y = getY(d.value);
      return `${i === 0 ? "M" : "L"} ${x} ${y}`;
    });
    return points.join(" ");
  };

  const finalValues = scenarioData.map((s) => ({
    name: s.name,
    color: s.color,
    finalValue: s.data[s.data.length - 1].value,
    contributions: s.data[s.data.length - 1].contributions,
    gains: s.data[s.data.length - 1].value - s.data[s.data.length - 1].contributions,
  }));

  return (
    <div className="w-full">
      {/* Chart Container */}
      <div className="relative bg-[var(--bg-elevated)] rounded-xl p-6 border border-[var(--border-subtle)]">
        {/* Y-Axis Labels */}
        <div className="absolute left-0 top-6 bottom-12 w-16 flex flex-col justify-between text-xs text-[var(--text-muted)]">
          <span>{formatCurrency(maxValue)}</span>
          <span>{formatCurrency(maxValue * 0.75)}</span>
          <span>{formatCurrency(maxValue * 0.5)}</span>
          <span>{formatCurrency(maxValue * 0.25)}</span>
          <span>$0</span>
        </div>

        {/* Chart Area */}
        <div className="ml-16 mr-4">
          <svg
            viewBox={`0 0 100 ${chartHeight}`}
            className="w-full h-[300px]"
            preserveAspectRatio="none"
          >
            {/* Grid Lines */}
            {[0, 0.25, 0.5, 0.75, 1].map((fraction) => (
              <line
                key={fraction}
                x1="0"
                y1={chartHeight - fraction * chartHeight}
                x2="100"
                y2={chartHeight - fraction * chartHeight}
                stroke="var(--border-subtle)"
                strokeWidth="0.2"
              />
            ))}

            {/* Area fills */}
            {scenarioData.map((scenario) => {
              const path = generatePath(scenario.data);
              const firstPoint = scenario.data[0];
              const areaPath = `${path} L 100 ${chartHeight} L ${((firstPoint.age - 25) / (END_AGE - 25)) * 100} ${chartHeight} Z`;

              return (
                <motion.path
                  key={`area-${scenario.name}`}
                  d={areaPath}
                  fill={scenario.color}
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity:
                      hoveredScenario === null || hoveredScenario === scenario.name
                        ? 0.1
                        : 0.03,
                  }}
                  transition={{ duration: 0.3 }}
                />
              );
            })}

            {/* Lines */}
            {scenarioData.map((scenario, index) => (
              <motion.path
                key={scenario.name}
                d={generatePath(scenario.data)}
                fill="none"
                stroke={scenario.color}
                strokeWidth="0.8"
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{
                  pathLength: 1,
                  opacity:
                    hoveredScenario === null || hoveredScenario === scenario.name
                      ? 1
                      : 0.3,
                }}
                transition={{
                  pathLength: { duration: 1.5, delay: index * 0.2, ease: [0.16, 1, 0.3, 1] },
                  opacity: { duration: 0.3 },
                }}
              />
            ))}

            {/* End point dots */}
            {scenarioData.map((scenario, index) => {
              const lastPoint = scenario.data[scenario.data.length - 1];
              const x = ((lastPoint.age - 25) / (END_AGE - 25)) * 100;
              const y = getY(lastPoint.value);

              return (
                <motion.circle
                  key={`dot-${scenario.name}`}
                  cx={x}
                  cy={y}
                  r="1.5"
                  fill={scenario.color}
                  initial={{ scale: 0 }}
                  animate={{
                    scale: hoveredScenario === scenario.name ? 1.5 : 1,
                    opacity:
                      hoveredScenario === null || hoveredScenario === scenario.name
                        ? 1
                        : 0.3,
                  }}
                  transition={{ delay: 1.5 + index * 0.2, duration: 0.3 }}
                />
              );
            })}
          </svg>

          {/* X-Axis Labels */}
          <div className="flex justify-between text-xs text-[var(--text-muted)] mt-2">
            <span>25</span>
            <span>35</span>
            <span>45</span>
            <span>55</span>
            <span>65</span>
          </div>
          <div className="text-center text-xs text-[var(--text-muted)] mt-1">Age</div>
        </div>
      </div>

      {/* Legend & Results */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        {finalValues.map((scenario, index) => (
          <motion.div
            key={scenario.name}
            className="relative bg-[var(--bg-secondary)] rounded-xl p-5 border border-[var(--border-subtle)] cursor-pointer overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 + index * 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            onMouseEnter={() => setHoveredScenario(scenario.name)}
            onMouseLeave={() => setHoveredScenario(null)}
            whileHover={{ borderColor: scenario.color }}
          >
            {/* Color indicator */}
            <div
              className="absolute left-0 top-0 bottom-0 w-1"
              style={{ backgroundColor: scenario.color }}
            />

            <div className="flex items-center gap-2 mb-3">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: scenario.color }}
              />
              <span className="text-sm font-medium text-[var(--text-primary)]">
                {scenario.name}
              </span>
            </div>

            <div className="space-y-2">
              <div>
                <div className="text-2xl font-display font-bold" style={{ color: scenario.color }}>
                  {formatCurrency(scenario.finalValue)}
                </div>
                <div className="text-xs text-[var(--text-muted)]">at age 65</div>
              </div>

              <div className="pt-2 border-t border-[var(--border-subtle)] space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-[var(--text-muted)]">Total contributed</span>
                  <span className="text-[var(--text-secondary)]">
                    {formatCurrency(scenario.contributions)}
                  </span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-[var(--text-muted)]">Investment gains</span>
                  <span style={{ color: scenario.color }}>
                    +{formatCurrency(scenario.gains)}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Key Insight */}
      <motion.div
        className="mt-6 p-5 bg-[var(--accent-gold-soft)] rounded-xl border border-[var(--accent-gold)]/20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        <div className="flex gap-3">
          <span className="text-[var(--accent-gold)] text-lg">◆</span>
          <div>
            <p className="text-[var(--text-primary)] font-medium mb-1">The 10-Year Gap</p>
            <p className="text-sm text-[var(--text-secondary)]">
              Starting at 25 vs 35 costs you <span className="text-[var(--accent-gold)] font-semibold">$633K</span> in
              potential gains—even with identical monthly contributions. The person who starts at 35 would need to
              invest <span className="text-[var(--accent-gold)] font-semibold">$1,000/month</span> (double) just to
              come close. Time is the only asset you can&apos;t buy back.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Assumptions */}
      <p className="mt-4 text-xs text-[var(--text-muted)] text-center">
        Assumes 7% average annual return (S&P 500 historical average, inflation-adjusted).
        This is illustrative, not financial advice.
      </p>
    </div>
  );
};

export default CompoundInterestChart;
