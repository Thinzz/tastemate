import React, { useEffect, useState } from 'react';
import { motion, useAnimation, useMotionValue, useSpring, useTransform, useMotionValueEvent } from 'framer-motion';

interface PointsProgressProps {
  currentPoints: number;
  maxPoints: number;
  level: string;
}

const PointsProgress: React.FC<PointsProgressProps> = ({ currentPoints, maxPoints, level }) => {
  const controls = useAnimation();

  // 1) 用 motionValue + spring 做更“顺滑”的进度
  const rawPct = useMotionValue(0);
  const pctSpring = useSpring(rawPct, { stiffness: 90, damping: 18, mass: 0.6 });
  const widthPct = useTransform(pctSpring, (v) => `${v}%`);

  // 2) 数字平滑增长（当前点数）
  const pointsMV = useMotionValue(0);
  const pointsSpring = useSpring(pointsMV, { stiffness: 90, damping: 20 });
  const progress = Math.min(currentPoints / maxPoints, 1);
  const nextLevelPoints = Math.max(maxPoints - currentPoints, 0);

  const [displayPoints, setDisplayPoints] = useState(0); // ← 新增：用于显示的数字

  // 当 spring 变化时，同步到 React state，触发重渲染
  useMotionValueEvent(pointsSpring, 'change', (v) => {
    setDisplayPoints(Math.round(v));
  });

  useEffect(() => {
    // 延迟一点点入场
    const start = setTimeout(() => {
      rawPct.set(progress * 100);
      pointsMV.set(currentPoints);
      controls.start({ opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } });
    }, 350);
    return () => clearTimeout(start);
  }, [progress, currentPoints, rawPct, pointsMV, controls]);

  const getLevelEmoji = (level: string) => {
    if (level.includes('Newbie')) return '🌱';
    if (level.includes('Explorer')) return '🗺️';
    if (level.includes('Enthusiast')) return '⭐';
    if (level.includes('Master')) return '👑';
    if (level.includes('Legend')) return '🏆';
    return '🧋';
  };

  // 里程碑（25/50/75/100%）
  const milestones = [0.25, 0.5, 0.75, 1];

  return (
    <motion.section
      initial={{ opacity: 0.9, y: 8 }}
      animate={controls}
      style={{ width: '100%' }}
      aria-label="Progress to next level"
    >
      {/* 标题区 */}
      <div style={{ textAlign: 'center', marginBottom: 18 }}>
        <h3 className="section-title" style={{ margin: 0 }}>
          {getLevelEmoji(level)} Progress to Next Level {getLevelEmoji(level)}
        </h3>
        <p style={{ color: '#476ce6ff', fontSize: '1.05rem', marginTop: 6 }}>
          {Math.ceil(nextLevelPoints)} points until your next level up! 🚀
        </p>
      </div>

      {/* 进度条容器（玻璃质感轨道） */}
      <div className="pp-track" role="progressbar" aria-valuemin={0} aria-valuemax={maxPoints} aria-valuenow={currentPoints}>
        {/* 进度填充层 */}
        <motion.div
          className="pp-fill"
          style={{ width: widthPct }}
        >
          {/* 微光层（只放在前半截，避免太花） */}
          <div className="pp-sheen" />
        </motion.div>

        {/* 中央数值 */}
        <motion.div className="pp-label" style={{ color: progress > 0.55 ? 'white' : '#0b36c2ff' }}>
          {/* {Math.round(pointsSpring.get())} / {maxPoints} */}
          {displayPoints} / {maxPoints}
        </motion.div>

        {/* 里程碑刻度 */}
        {milestones.map((m) => (
          <div key={m} className="pp-tick" style={{ left: `${m * 100}%` }}>
            <div className="pp-tick-dot" />
            <div className="pp-tick-text">{Math.round(m * 100)}%</div>
          </div>
        ))}
      </div>

      {/* 底部统计 */}
      <div className="pp-meta">
        <span>🎯 Current: {level}</span>
        <span>{Math.round(progress * 100)}% Complete</span>
      </div>

      {/* 小统计卡片 */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        style={{
          display: 'flex', justifyContent: 'center', gap: 20, marginTop: 18, flexWrap: 'wrap'
        }}
      >
        {[
          { icon: '🧋', label: 'Drinks Ordered', val: Math.floor(currentPoints / 50) },
          { icon: '👥', label: 'Friends Made', val: Math.floor(currentPoints / 100) },
          { icon: '📝', label: 'Reviews Written', val: Math.floor(currentPoints / 75) },
          { icon: '🎉', label: 'Events Attended', val: Math.floor(currentPoints / 200) },
        ].map(({ icon, label, val }) => (
          <div key={label} style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '1.45rem' }}>{icon}</div>
            <div style={{ fontSize: '.82rem', color: '#476ce6ff' }}>{label}</div>
            <div style={{ fontWeight: 800, color: '#0b36c2ff' }}>{val}</div>
          </div>
        ))}
      </motion.div>
    </motion.section>
  );
};

export default PointsProgress;
