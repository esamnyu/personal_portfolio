"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Thermometer,
  TrendingUp,
  Activity,
  Zap,
  Shield,
  BarChart3,
  Clock,
  CheckCircle2,
  XCircle,
  ChevronDown,
  ChevronUp,
  Target,
  Brain,
  CircleDollarSign,
} from "lucide-react";
import Link from "next/link";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import {
  trades,
  systemMetrics,
  alphaStrategies,
  pipelineSteps,
  type Trade,
} from "@/lib/weather-edge-data";

const ease = [0.16, 1, 0.3, 1];

function StatusBadge({ status }: { status: Trade["status"] }) {
  const styles: Record<string, string> = {
    settled: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    closed: "bg-[var(--accent-gold-soft)] text-[var(--accent-gold)] border-[var(--border-accent)]",
    open: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    resting: "bg-[var(--text-muted)]/10 text-[var(--text-muted)] border-[var(--border-subtle)]",
  };
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 text-xs font-medium uppercase tracking-wider rounded-full border ${styles[status]}`}>
      {status === "settled" || status === "closed" ? (
        <CheckCircle2 className="w-3 h-3" />
      ) : (
        <Clock className="w-3 h-3" />
      )}
      {status}
    </span>
  );
}

function PnlDisplay({ pnl }: { pnl: number | null }) {
  if (pnl === null) return <span className="text-[var(--text-muted)]">&mdash;</span>;
  const positive = pnl >= 0;
  return (
    <span className={positive ? "text-emerald-400 font-semibold" : "text-red-400 font-semibold"}>
      {positive ? "+" : ""}${pnl.toFixed(2)}
    </span>
  );
}

function TradeRow({ trade, index }: { trade: Trade; index: number }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5, ease }}
    >
      <SpotlightCard className="rounded-2xl border border-[var(--border-subtle)]">
        <button
          onClick={() => setExpanded(!expanded)}
          className="w-full text-left p-5 md:p-6"
        >
          {/* Header row */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[var(--accent-gold-soft)] flex items-center justify-center shrink-0">
                <Thermometer className="w-5 h-5 text-[var(--accent-gold)]" />
              </div>
              <div>
                <p className="font-display font-semibold text-[var(--text-primary)]">
                  {trade.city} &middot; {trade.bracket}
                </p>
                <p className="text-sm text-[var(--text-muted)]">
                  {trade.entryDate}{trade.exitDate ? ` \u2192 ${trade.exitDate}` : ""}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <StatusBadge status={trade.status} />
              <PnlDisplay pnl={trade.pnl} />
              {expanded ? (
                <ChevronUp className="w-4 h-4 text-[var(--text-muted)]" />
              ) : (
                <ChevronDown className="w-4 h-4 text-[var(--text-muted)]" />
              )}
            </div>
          </div>

          {/* Quick stats */}
          <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
            <div>
              <span className="text-[var(--text-muted)]">Side</span>
              <p className="text-[var(--text-primary)] font-medium uppercase">{trade.side}</p>
            </div>
            <div>
              <span className="text-[var(--text-muted)]">Entry</span>
              <p className="text-[var(--text-primary)] font-medium">{trade.entryPrice}&cent;</p>
            </div>
            <div>
              <span className="text-[var(--text-muted)]">Exit</span>
              <p className="text-[var(--text-primary)] font-medium">
                {trade.exitPrice ? `${trade.exitPrice}\u00a2` : "\u2014"}
              </p>
            </div>
            <div>
              <span className="text-[var(--text-muted)]">Contracts</span>
              <p className="text-[var(--text-primary)] font-medium">{trade.contracts}</p>
            </div>
          </div>
        </button>

        {/* Expanded detail */}
        {expanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease }}
            className="px-5 md:px-6 pb-5 md:pb-6 border-t border-[var(--border-subtle)] pt-4"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-xs uppercase tracking-wider text-[var(--text-muted)] mb-1">Strategies</p>
                <div className="flex flex-wrap gap-2">
                  {trade.strategies.map((s) => (
                    <span key={s} className="tech-tag">{s}</span>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wider text-[var(--text-muted)] mb-1">Confidence</p>
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-2 rounded-full bg-[var(--bg-elevated)] overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-[var(--accent-gold)] to-emerald-400"
                      style={{ width: `${trade.confidence}%` }}
                    />
                  </div>
                  <span className="text-sm font-semibold text-[var(--accent-gold)]">{trade.confidence}/100</span>
                </div>
              </div>
            </div>
            <div className="mt-4">
              <p className="text-xs uppercase tracking-wider text-[var(--text-muted)] mb-1">Trade Notes</p>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{trade.notes}</p>
            </div>
            <div className="mt-3">
              <p className="text-xs uppercase tracking-wider text-[var(--text-muted)] mb-1">Ticker</p>
              <code className="text-xs text-[var(--text-muted)] font-mono bg-[var(--bg-elevated)] px-2 py-1 rounded">
                {trade.ticker}
              </code>
            </div>
          </motion.div>
        )}
      </SpotlightCard>
    </motion.div>
  );
}

export default function WeatherEdgePage() {
  return (
    <div className="relative min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-[var(--bg-primary)]/80 backdrop-blur-xl border-b border-[var(--border-subtle)]">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <div className="flex items-center h-20">
            <Link
              href="/"
              className="flex items-center gap-2 text-[var(--text-secondary)] hover:text-[var(--accent-gold)] transition-colors duration-300"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm font-body">Back</span>
            </Link>
          </div>
        </div>
      </header>

      <main className="py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          {/* ── Hero ── */}
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-2xl bg-[var(--accent-gold-soft)] flex items-center justify-center">
                <Activity className="w-6 h-6 text-[var(--accent-gold)]" />
              </div>
              <span className="tech-tag">Live System</span>
            </div>
            <h1 className="hero-title mb-6" style={{ fontSize: "clamp(2rem, 4vw + 1rem, 4rem)" }}>
              Weather Edge
            </h1>
            <p className="text-[var(--text-secondary)] text-lg md:text-xl max-w-3xl leading-relaxed">
              A quantitative trading system that finds mispriced daily high temperature
              brackets on{" "}
              <a
                href="https://kalshi.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--accent-gold)] hover:underline"
              >
                Kalshi
              </a>{" "}
              prediction markets by fusing 194 AI and physics-based weather model
              forecasts against real-time market prices.
            </p>
          </motion.div>

          {/* ── Metrics Grid ── */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.6, ease }}
          >
            {systemMetrics.map((metric, idx) => (
              <SpotlightCard
                key={metric.label}
                className="rounded-2xl border border-[var(--border-subtle)] p-5"
              >
                <p className="text-xs uppercase tracking-wider text-[var(--text-muted)] mb-1">
                  {metric.label}
                </p>
                <p className="text-2xl md:text-3xl font-display font-bold text-[var(--accent-gold)]">
                  {metric.value}
                </p>
                <p className="text-xs text-[var(--text-muted)] mt-1">{metric.detail}</p>
              </SpotlightCard>
            ))}
          </motion.div>

          {/* ── How It Works ── */}
          <motion.section
            className="mb-20"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease }}
          >
            <h2 className="section-title">
              <Brain className="section-icon" />
              How It Works
            </h2>
            <p className="text-[var(--text-secondary)] mb-10 max-w-3xl leading-relaxed">
              Every day, Kalshi lists binary contracts on daily high temperatures for 5 US
              cities. The market is inefficient because most participants rely on a single
              NWS point forecast. Weather Edge exploits this by building a full probability
              distribution from 194 ensemble forecast members, applying physics-based
              corrections, and finding brackets where the true probability significantly
              exceeds the market price.
            </p>

            {/* Pipeline */}
            <div className="relative">
              <div className="absolute left-5 top-0 bottom-0 w-px bg-gradient-to-b from-[var(--accent-gold)] via-[var(--border-medium)] to-transparent hidden md:block" />
              <div className="space-y-6">
                {pipelineSteps.map((step, idx) => (
                  <motion.div
                    key={step.step}
                    className="flex gap-5"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.08, duration: 0.5, ease }}
                  >
                    <div className="w-10 h-10 rounded-full bg-[var(--bg-elevated)] border border-[var(--border-subtle)] flex items-center justify-center shrink-0 text-sm font-display font-bold text-[var(--accent-gold)] z-10">
                      {step.step}
                    </div>
                    <div className="pt-1.5">
                      <h3 className="font-display font-semibold text-[var(--text-primary)] mb-1">
                        {step.title}
                      </h3>
                      <p className="text-sm text-[var(--text-secondary)]">{step.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.section>

          {/* ── Alpha Strategies ── */}
          <motion.section
            className="mb-20"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease }}
          >
            <h2 className="section-title">
              <Target className="section-icon" />
              Alpha Strategies
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {alphaStrategies.map((strategy, idx) => (
                <motion.div
                  key={strategy.tag}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.08, duration: 0.5, ease }}
                >
                  <SpotlightCard className="rounded-2xl border border-[var(--border-subtle)] p-5 h-full">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="w-8 h-8 rounded-lg bg-[var(--accent-gold-soft)] flex items-center justify-center text-sm font-display font-bold text-[var(--accent-gold)]">
                        {strategy.tag}
                      </span>
                      <h3 className="font-display font-semibold text-[var(--text-primary)]">
                        {strategy.name}
                      </h3>
                    </div>
                    <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                      {strategy.description}
                    </p>
                  </SpotlightCard>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* ── Risk Management ── */}
          <motion.section
            className="mb-20"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease }}
          >
            <h2 className="section-title">
              <Shield className="section-icon" />
              Risk Management
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                {
                  icon: CircleDollarSign,
                  title: "Half-Kelly Sizing",
                  detail: "Max 10% of balance per trade. Half-Kelly criterion balances growth with drawdown protection.",
                },
                {
                  icon: Zap,
                  title: "Automated Exits",
                  detail: "Freeroll at 2x, efficiency exit at 90\u00a2, trailing stop. Position monitor runs every 5 minutes.",
                },
                {
                  icon: Shield,
                  title: "7 Pre-Trade Guards",
                  detail: "Kill switch, daily trade count, circuit breaker, intraday drawdown, correlated exposure, bot window, duplicate order guard.",
                },
              ].map((item, idx) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1, duration: 0.5, ease }}
                >
                  <SpotlightCard className="rounded-2xl border border-[var(--border-subtle)] p-5 h-full">
                    <item.icon className="w-6 h-6 text-[var(--accent-gold)] mb-3" />
                    <h3 className="font-display font-semibold text-[var(--text-primary)] mb-2">
                      {item.title}
                    </h3>
                    <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                      {item.detail}
                    </p>
                  </SpotlightCard>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* ── Tech Stack ── */}
          <motion.section
            className="mb-20"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease }}
          >
            <h2 className="section-title">
              <BarChart3 className="section-icon" />
              Tech Stack
            </h2>
            <div className="flex flex-wrap gap-2">
              {[
                "Python 3",
                "asyncio",
                "Kalshi API (RSA-PSS)",
                "Open-Meteo Ensemble API",
                "NWS API",
                "KDE (scipy)",
                "Claude AI",
                "Discord Webhooks",
                "cron",
                "ECMWF AIFS",
                "ECMWF IFS",
                "GFS",
                "ICON",
                "GEM",
              ].map((tech) => (
                <span key={tech} className="tech-tag">
                  {tech}
                </span>
              ))}
            </div>
          </motion.section>

          {/* ── Trade Log ── */}
          <motion.section
            className="mb-20"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease }}
          >
            <h2 className="section-title">
              <TrendingUp className="section-icon" />
              Trade Log
            </h2>
            <p className="text-[var(--text-secondary)] mb-8 max-w-2xl">
              Real trades executed by the system. Every position is logged with full
              transparency — entry price, exit strategy, confidence score, and P&amp;L.
            </p>

            <div className="space-y-4">
              {trades.map((trade, idx) => (
                <TradeRow key={trade.id} trade={trade} index={idx} />
              ))}
            </div>

            {trades.length === 0 && (
              <div className="text-center py-16">
                <p className="text-[var(--text-muted)]">No trades yet. System is scanning.</p>
              </div>
            )}
          </motion.section>

          {/* ── Disclaimer ── */}
          <motion.div
            className="glass-card p-6 rounded-2xl text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease }}
          >
            <p className="text-xs text-[var(--text-muted)] leading-relaxed max-w-2xl mx-auto">
              This is a personal research project. Not financial advice. Prediction markets
              carry risk of total loss. Past performance does not guarantee future results.
              The system trades with a small account to validate the quantitative approach.
            </p>
          </motion.div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-12 border-t border-[var(--border-subtle)]">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <p className="text-[var(--text-muted)] text-sm text-center">
            &copy; {new Date().getFullYear()} Ethan Sam. Crafted with precision.
          </p>
        </div>
      </footer>
    </div>
  );
}
