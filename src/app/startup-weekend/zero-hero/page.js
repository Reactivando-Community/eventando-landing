"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./zero-hero.css";

// ─── Mock Teams ────────────────────────────────────────────
const INITIAL_TEAMS = [
  { id: "team-1", name: "AgroTech", emoji: "🌱", color: "#22c55e" },
  { id: "team-2", name: "EduFlow", emoji: "📚", color: "#3b82f6" },
  { id: "team-3", name: "SafeCity", emoji: "🏙️", color: "#a855f7" },
  { id: "team-4", name: "HealthPulse", emoji: "💊", color: "#ef4444" },
  { id: "team-5", name: "FinWise", emoji: "💰", color: "#eab308" },
  { id: "team-6", name: "PetCare+", emoji: "🐾", color: "#f97316" },
  { id: "team-7", name: "DeliverGo", emoji: "🚀", color: "#06b6d4" },
  { id: "team-8", name: "GreenMob", emoji: "♻️", color: "#10b981" },
];

// ─── Stage Definitions (positions are % of viewport) ──────
const STAGES = [
  {
    id: "zero",
    label: "ZERO",
    number: "...",
    x: 19.5,
    y: 13,
    color: "#ffffff",
    borderColor: "#000000",
  },
  {
    id: "ideia",
    label: "IDÉIA",
    number: "1",
    x: 17,
    y: 33,
    color: "#facc15",
    borderColor: "#facc15",
  },
  {
    id: "problema",
    label: "PROBLEMA",
    number: "2",
    x: 13,
    y: 50,
    color: "#1a1a1a",
    borderColor: "#000000",
    textColor: "#ffffff",
  },
  {
    id: "validacao",
    label: "VALIDAÇÃO DO PROBLEMA",
    number: "3",
    x: 26,
    y: 70,
    color: "#1a1a1a",
    borderColor: "#000000",
    textColor: "#ffffff",
  },
  {
    id: "solucao",
    label: "SOLUÇÃO",
    number: "4",
    x: 54,
    y: 68,
    color: "#22c55e",
    borderColor: "#22c55e",
  },
  {
    id: "solucao-validada",
    label: "SOLUÇÃO VALIDADA",
    number: "5",
    x: 70,
    y: 72,
    color: "#facc15",
    borderColor: "#facc15",
  },
  {
    id: "mvp",
    label: "MVP",
    number: "6",
    x: 86,
    y: 52,
    color: "#ec4899",
    borderColor: "#ec4899",
  },
  {
    id: "pitch",
    label: "PITCH",
    number: "7",
    x: 86,
    y: 34,
    color: "#22c55e",
    borderColor: "#22c55e",
  },
  {
    id: "hero",
    label: "HERO",
    number: "!",
    x: 86,
    y: 16,
    color: "#ffffff",
    borderColor: "#000000",
  },
];

// ─── Team Card Component ──────────────────────────────────
function TeamChip({ team, isDragging, onDragStart }) {
  return (
    <div
      draggable="true"
      onDragStart={(e) => {
        e.dataTransfer.setData("text/plain", team.id);
        e.dataTransfer.effectAllowed = "move";
        onDragStart(team.id);
      }}
      style={{ cursor: "grab" }}
    >
      <motion.div
        layout
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: isDragging ? 1.1 : 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
        className="team-chip"
        style={{
          "--chip-color": team.color,
        }}
        whileHover={{ scale: 1.08, y: -2 }}
        whileTap={{ scale: 0.95 }}
      >
        <span className="team-chip__emoji">{team.emoji}</span>
        <span className="team-chip__name">{team.name}</span>
      </motion.div>
    </div>
  );
}

// ─── Drop Zone (Stage) Component ──────────────────────────
function StageDropZone({ stage, teams, draggingId, onDragStart, onDrop }) {
  const [isOver, setIsOver] = useState(false);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    setIsOver(true);
  }, []);

  const handleDragLeave = useCallback(() => {
    setIsOver(false);
  }, []);

  const handleDrop = useCallback(
    (e) => {
      e.preventDefault();
      setIsOver(false);
      const teamId = e.dataTransfer.getData("text/plain");
      if (teamId) {
        onDrop(teamId, stage.id);
      }
    },
    [onDrop, stage.id],
  );

  return (
    <div
      className="stage-zone"
      style={{
        left: `${stage.x}%`,
        top: `${stage.y}%`,
      }}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {/* Drop indicator */}
      <motion.div
        className={`stage-zone__indicator ${isOver ? "stage-zone__indicator--active" : ""}`}
        animate={{
          scale: isOver ? 1.05 : 1,
          boxShadow: isOver
            ? `0 0 30px ${stage.color}66, 0 0 60px ${stage.color}33`
            : "0 0 0 transparent",
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        {/* Stage label */}
        <div className="stage-zone__header">
          <span
            className="stage-zone__number"
            style={{
              background: stage.color,
              color: stage.textColor || "#000",
            }}
          >
            {stage.number}
          </span>
          <span className="stage-zone__label">{stage.label}</span>
        </div>

        {/* Team chips container */}
        <div className="stage-zone__teams">
          <AnimatePresence mode="popLayout">
            {teams.map((team) => (
              <TeamChip
                key={team.id}
                team={team}
                isDragging={draggingId === team.id}
                onDragStart={onDragStart}
              />
            ))}
          </AnimatePresence>
          {teams.length === 0 && (
            <div className="stage-zone__empty">
              <span>Arraste um time aqui</span>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────
export default function ZeroHeroPage() {
  // State: which teams are in which stage
  const [stageTeams, setStageTeams] = useState(() => {
    const initial = {};
    STAGES.forEach((stage) => {
      initial[stage.id] = [];
    });
    // Place all teams at "zero" initially
    initial["zero"] = [...INITIAL_TEAMS];
    return initial;
  });

  const [draggingId, setDraggingId] = useState(null);

  const handleDragStart = useCallback((teamId) => {
    setDraggingId(teamId);
  }, []);

  const handleDrop = useCallback((teamId, targetStageId) => {
    setDraggingId(null);
    setStageTeams((prev) => {
      const next = {};
      // Remove team from all stages, add to target
      let movedTeam = null;
      for (const stageId of Object.keys(prev)) {
        const filtered = prev[stageId].filter((t) => {
          if (t.id === teamId) {
            movedTeam = t;
            return false;
          }
          return true;
        });
        next[stageId] = filtered;
      }
      if (movedTeam) {
        next[targetStageId] = [...(next[targetStageId] || []), movedTeam];
      }
      return next;
    });
  }, []);

  // Handle drag end (reset dragging state)
  useEffect(() => {
    const handleDragEnd = () => setDraggingId(null);
    document.addEventListener("dragend", handleDragEnd);
    return () => document.removeEventListener("dragend", handleDragEnd);
  }, []);

  return (
    <div className="zero-hero-page">
      {/* Background image */}
      <div className="zero-hero-page__bg" />

      {/* Overlay for readability */}
      <div className="zero-hero-page__overlay" />

      {/* Stage drop zones */}
      <div className="zero-hero-page__stages">
        {STAGES.map((stage) => (
          <StageDropZone
            key={stage.id}
            stage={stage}
            teams={stageTeams[stage.id] || []}
            draggingId={draggingId}
            onDragStart={handleDragStart}
            onDrop={handleDrop}
          />
        ))}
      </div>

      {/* Title overlay */}
      <div className="zero-hero-page__title">
        <h1>Zero ao Hero</h1>
        <p>Arraste os times para acompanhar a evolução</p>
      </div>
    </div>
  );
}
