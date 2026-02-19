import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface MoodTrackerProps {
  currentMood: string;
  onUpdate: (mood: string) => void;
  /** 让区块左右“出血”至屏幕边缘 */
  fullWidth?: boolean;
  /** 去掉卡片外观，与相邻区块无缝衔接 */
  seamless?: boolean;
  /** 区块背景（纯色/渐变/图片），不传则透明或默认 */
  background?: string;
  /** 内容最大宽度（不想限制传 'none'） */
  maxContentWidth?: number | 'none';
}

const MoodTracker: React.FC<MoodTrackerProps> = ({
  currentMood,
  onUpdate,
  fullWidth = true,
  seamless = true,
  background,
  maxContentWidth = 1200,
}) => {
  const [selectedMood, setSelectedMood] = useState(currentMood);
  const [moodHistory, setMoodHistory] = useState([
    { date: '2024-01-15', mood: '😊', note: 'Great taro bubble tea!' },
    { date: '2024-01-14', mood: '🤗', note: 'Tried new brown sugar flavor' },
    { date: '2024-01-13', mood: '😍', note: 'Perfect matcha latte' },
    { date: '2024-01-12', mood: '🥰', note: 'Shared drinks with friends' },
    { date: '2024-01-11', mood: '😋', note: 'Discovered passion fruit tea' }
  ]);

  const moods = [
    { emoji: '😊', name: 'Happy', color: '#FFD700' },
    { emoji: '😍', name: 'Love', color: '#FF69B4' },
    { emoji: '🤗', name: 'Excited', color: '#FF6347' },
    { emoji: '😋', name: 'Yummy', color: '#32CD32' },
    { emoji: '🥰', name: 'Blissful', color: '#FF1493' },
    { emoji: '😌', name: 'Relaxed', color: '#9370DB' },
    { emoji: '🤩', name: 'Amazed', color: '#00CED1' },
    { emoji: '😴', name: 'Sleepy', color: '#4169E1' },
    { emoji: '🤔', name: 'Curious', color: '#DAA520' },
    { emoji: '😐', name: 'Neutral', color: '#708090' }
  ];

  const handleMoodSelect = (mood: any) => {
    setSelectedMood(mood.emoji);
    onUpdate(mood.emoji);

    const today = new Date().toISOString().split('T')[0];
    const newEntry = {
      date: today,
      mood: mood.emoji,
      note: `Feeling ${mood.name.toLowerCase()} today!`
    };

    setMoodHistory(prev => [newEntry, ...prev.filter(e => e.date !== today)].slice(0, 7));
  };

  return (
    <section
      className={[
        fullWidth ? 'bleed-fullwidth' : '',
        seamless ? 'seamless' : 'card-like'
      ].join(' ')}
      style={{
        background: 'linear-gradient(135deg, #cfe4ff, #f2d8ff)'  // ← 这里改
      }}
    >
      <div
        className="section-inner"
        style={{
          maxWidth: maxContentWidth === 'none' ? 'none' : `${maxContentWidth}px`
        }}
      >
        <h3 className="section-title"> Daily Mood Tracker </h3>

        <div style={{ marginBottom: 25 }}>
          <p style={{ color: '#476ce6ff', textAlign: 'center', marginBottom: 20 }}>
            How are you feeling about bubble tea today?
          </p>

          {/* 自适应全宽栅格：大屏5列，中屏4列，小屏2-3列 */}
          <div
            className="mood-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(5, 1fr)',
              gap: 15,
              margin: '20px 0'
            }}
          >
            {moods.map((mood) => (
              <motion.div
                key={mood.emoji}
                whileHover={{ scale: 1.2, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => handleMoodSelect(mood)}
                className={`mood-emoji ${selectedMood === mood.emoji ? 'selected' : ''}`}
                style={{
                  textAlign: 'center',
                  cursor: 'pointer',
                  padding: 10,
                  borderRadius: 15,
                  background: selectedMood === mood.emoji
                    ? `linear-gradient(45deg, ${mood.color}40, ${mood.color}20)`
                    : 'transparent',
                  border: selectedMood === mood.emoji ? `2px solid ${mood.color}` : '2px solid transparent',
                  transition: 'all 0.3s ease'
                }}
              >
                <div style={{ fontSize: '2.5rem', marginBottom: 5 }}>{mood.emoji}</div>
                <div
                  style={{
                    fontSize: '0.8rem',
                    color: selectedMood === mood.emoji ? mood.color : '#476ce6ff',
                    fontWeight: 'bold'
                  }}
                >
                  {mood.name}
                </div>
              </motion.div>
            ))}
          </div>

          <AnimatePresence>
            {selectedMood && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                style={{
                  textAlign: 'center',
                  background: 'rgba(60, 137, 209, 0.1)',
                  borderRadius: 15,
                  padding: 15,
                  margin: '20px 0',
                  border: '2px solid #476ce6ff'
                }}
              >
                <div style={{ fontSize: '3rem', marginBottom: 10 }}>{selectedMood}</div>
                <p style={{ color: '#0b36c2ff', fontWeight: 'bold' }}>
                  Current mood selected! 🎉
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div>
          <h4 style={{ color: '#0b36c2ff', marginBottom: 15, textAlign: 'center' }}>
            📅 Recent Mood History
          </h4>

          <div style={{ maxHeight: 200, overflowY: 'auto' }}>
            {moodHistory.map((entry, index) => (
              <motion.div
                key={entry.date}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 15,
                  background: 'rgba(255, 255, 255, 0.6)',
                  borderRadius: 12,
                  padding: 12,
                  margin: '8px 0',
                  border: '1px solid rgba(71,108,230,0.6)' /* 更柔和以适配“无痕” */
                }}
              >
                <div style={{ fontSize: '1.8rem' }}>{entry.mood}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '0.9rem', color: '#0b36c2ff', fontWeight: 'bold' }}>
                    {new Date(entry.date).toLocaleDateString()}
                  </div>
                  <div style={{ fontSize: '0.8rem', color: '#476ce6ff' }}>
                    {entry.note}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          style={{ textAlign: 'center', marginTop: 0, fontSize: '1.5rem' }}
        >
          {/* Keep tracking your bubble tea moods! 🧋💕 */}
        </motion.div>
      </div>

      {/* 基本无痕分隔；若不要分隔可删除这一行 */}
      <div className="hairline-separator" />
    </section>
  );
};

export default MoodTracker;
