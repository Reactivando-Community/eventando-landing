"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./zero-hero.css";

// ─── Emojis and Colors mapped by team id ───────────────────
const EMOJIS = ["🌱", "📚", "🏙️", "💊", "💰", "🐾", "🚀", "♻️", "⚡", "💡", "🎯", "🔧", "🔥", "🌍", "⭐", "🏆"];
const COLORS = ["#22c55e", "#3b82f6", "#a855f7", "#ef4444", "#eab308", "#f97316", "#06b6d4", "#10b981", "#6366f1", "#d946ef", "#ec4899", "#8b5cf6", "#f43f5e", "#14b8a6", "#84cc16", "#f59e0b"];

// ─── Stage Definitions (positions are % of viewport) ──────
const STAGES = [
  { id: "ZERO", label: "ZERO", number: "...", x: 19.5, y: 13, color: "#ffffff", borderColor: "#000000" },
  { id: "IDEIA", label: "IDÉIA", number: "1", x: 17, y: 33, color: "#facc15", borderColor: "#facc15" },
  { id: "PROBLEMA", label: "PROBLEMA", number: "2", x: 13, y: 50, color: "#1a1a1a", borderColor: "#000000", textColor: "#ffffff" },
  { id: "VALIDACAO_DO_PROBLEMA", label: "VALIDAÇÃO DO PROBLEMA", number: "3", x: 26, y: 70, color: "#1a1a1a", borderColor: "#000000", textColor: "#ffffff" },
  { id: "SOLUCAO", label: "SOLUÇÃO", number: "4", x: 54, y: 68, color: "#22c55e", borderColor: "#22c55e" },
  { id: "SOLUCAO_VALIDADA", label: "SOLUÇÃO VALIDADA", number: "5", x: 70, y: 72, color: "#facc15", borderColor: "#facc15" },
  { id: "MVP", label: "MVP", number: "6", x: 86, y: 52, color: "#ec4899", borderColor: "#ec4899" },
  { id: "PITCH", label: "PITCH", number: "7", x: 86, y: 34, color: "#22c55e", borderColor: "#22c55e" },
  { id: "HERO", label: "HERO", number: "!", x: 86, y: 16, color: "#ffffff", borderColor: "#000000" },
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

const MaximizeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
  </svg>
);

const MinimizeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 9V4.5M9 9H4.5M9 9L3.75 3.75M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 9h4.5M15 9V4.5M15 9l5.25-5.25M15 15h4.5M15 15v4.5m0-4.5l5.25 5.25" />
  </svg>
);

// ─── Main Page ────────────────────────────────────────────
export default function ZeroHeroPage() {
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const handleFullscreenChange = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(err => console.log(err));
    } else {
      if (document.exitFullscreen) document.exitFullscreen();
    }
  }, []);

  // State: which teams are in which stage
  const [stageTeams, setStageTeams] = useState(() => {
    const initial = {};
    STAGES.forEach((stage) => {
      initial[stage.id] = [];
    });
    return initial;
  });

  const [draggingId, setDraggingId] = useState(null);

  useEffect(() => {
    fetch("https://manager.hubcommunity.io/api/teams?populate=*")
      .then((res) => res.json())
      .then((json) => {
        if (!json.data) return;
        
        const initial = {};
        STAGES.forEach((stage) => {
          initial[stage.id] = [];
        });

        json.data.forEach((t) => {
          const teamId = t.documentId;
          const stageId = t.stage || "ZERO";
          const team = {
            id: teamId,
            name: t.name || "Time",
            emoji: EMOJIS[(t.id || 0) % EMOJIS.length],
            color: COLORS[(t.id || 0) % COLORS.length]
          };
          if (initial[stageId]) {
            initial[stageId].push(team);
          } else {
            initial["ZERO"].push(team);
          }
        });
        
        setStageTeams(initial);
      })
      .catch((err) => console.error("Error fetching teams:", err));
  }, []);

  const handleDragStart = useCallback((teamId) => {
    setDraggingId(teamId);
  }, []);

  const handleDrop = useCallback((teamId, targetStageId) => {
    setDraggingId(null);
    setStageTeams((prev) => {
      const next = {};
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

    // Make PUT request to backend to update the stage
    fetch(`https://manager.hubcommunity.io/api/teams/${teamId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        data: { stage: targetStageId }
      })
    }).catch(err => console.error("Error updating team stage:", err));
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

      {/* Fullscreen Button */}
      <button 
        onClick={toggleFullscreen}
        className="zero-hero-page__fullscreen-btn"
        title={isFullscreen ? "Sair da Tela Cheia" : "Tela Cheia"}
      >
        {isFullscreen ? <MinimizeIcon /> : <MaximizeIcon />}
      </button>
    </div>
  );
}
