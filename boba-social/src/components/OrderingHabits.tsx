import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface OrderingHabitsData {
  frequency: string;
  preferredTime: string;
  averageSpend: string;
  favoriteLocation: string;
}

interface OrderingHabitsProps {
  habits: OrderingHabitsData;
  onUpdate: (habits: OrderingHabitsData) => void;
  /** 全宽出血 */
  fullWidth?: boolean;
  /** 无边框、无阴影、无圆角 */
  seamless?: boolean;
  /** 背景颜色或渐变 */
  background?: string;
  /** 内容最大宽度（可为 'none'） */
  maxContentWidth?: number | 'none';
}

const OrderingHabits: React.FC<OrderingHabitsProps> = ({
  habits,
  onUpdate,
  fullWidth = true,
  seamless = true,
  background,
  maxContentWidth = 1200,
}) => {
  const [editMode, setEditMode] = useState(false);
  const [tempHabits, setTempHabits] = useState(habits);

  const frequencies = ['Daily', 'Every few days', 'Weekly', 'Bi-weekly', 'Monthly', 'Occasionally'];
  const times = ['Morning', 'Late Morning', 'Afternoon', 'Evening', 'Night', 'Anytime'];
  const spendRanges = ['Under $5', '$5-10', '$10-15', '$15-20', '$20+', 'I treat myself! 💸'];
  const locations = [
    'Downtown Store', 'Mall Location', 'University Campus', 'Neighborhood Shop',
    'Online Delivery', 'Food Court', 'Airport', 'Train Station'
  ];

  const handleSave = () => {
    onUpdate(tempHabits);
    setEditMode(false);
  };

  const handleCancel = () => {
    setTempHabits(habits);
    setEditMode(false);
  };

  const getFrequencyEmoji = (freq: string) => {
    if (freq === 'Daily') return '🔥';
    if (freq === 'Every few days') return '⭐';
    if (freq === 'Weekly') return '📅';
    return '🧋';
  };

  const getTimeEmoji = (time: string) => {
    if (time === 'Morning') return '🌅';
    if (time === 'Late Morning') return '☀️';
    if (time === 'Afternoon') return '🌤️';
    if (time === 'Evening') return '🌆';
    if (time === 'Night') return '🌙';
    return '⏰';
  };

  const getSpendEmoji = (spend: string) => {
    if (spend.includes('Under')) return '💰';
    if (spend.includes('$5-10')) return '💵';
    if (spend.includes('$10-15')) return '💶';
    if (spend.includes('$15-20')) return '💷';
    if (spend.includes('$20+')) return '💸';
    return '🤑';
  };

  return (
    <section
      className={[
        fullWidth ? 'bleed-fullwidth' : '',
        seamless ? 'seamless' : 'card-like'
      ].join(' ')}
      style={{
        background: 'linear-gradient(135deg, #f8dfff, #cae8ff)'  // ← 这里改
      }}
    >
      <div
        className="section-inner"
        style={{
          maxWidth: maxContentWidth === 'none' ? 'none' : `${maxContentWidth}px`
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h3 className="section-title" style={{ margin: 0 }}>
            📊 My Ordering Habits 📊
          </h3>
          {!editMode && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setEditMode(true)}
              style={{
                background: 'transparent',
                border: '2px solid #476ce6ff',
                borderRadius: '15px',
                padding: '8px 16px',
                color: '#476ce6ff',
                cursor: 'pointer',
                fontFamily: 'inherit',
                fontWeight: 'bold'
              }}
            >
              ✏️ Edit
            </motion.button>
          )}
        </div>

        {!editMode ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid"
            style={{ gap: '15px' }}
          >
            {[
              {
                title: 'Frequency',
                value: habits.frequency,
                icon: getFrequencyEmoji(habits.frequency),
              },
              {
                title: 'Preferred Time',
                value: habits.preferredTime,
                icon: getTimeEmoji(habits.preferredTime),
              },
              {
                title: 'Average Spend',
                value: habits.averageSpend,
                icon: getSpendEmoji(habits.averageSpend),
              },
              {
                title: 'Favorite Location',
                value: habits.favoriteLocation,
                icon: '📍',
              },
            ].map((item) => (
              <motion.div
                key={item.title}
                whileHover={{ scale: 1.02 }}
                style={{
                  background: 'rgba(40, 155, 231, 0.1)',
                  borderRadius: '15px',
                  padding: '15px',
                  border: '2px solid #476ce6ff',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '15px'
                }}
              >
                <div style={{ fontSize: '2rem' }}>{item.icon}</div>
                <div>
                  <div style={{ color: '#0b36c2ff', fontWeight: 'bold', fontSize: '1.1rem' }}>
                    {item.title}
                  </div>
                  <div style={{ color: '#476ce6ff' }}>{item.value}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}
          >
            <div>
              <label className="field-label">📅 How often do you order bubble tea?</label>
              <select
                value={tempHabits.frequency}
                onChange={(e) => setTempHabits((p) => ({ ...p, frequency: e.target.value }))}
                className="cute-input"
              >
                {frequencies.map((f) => (
                  <option key={f} value={f}>{f}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="field-label">⏰ When do you usually order?</label>
              <select
                value={tempHabits.preferredTime}
                onChange={(e) => setTempHabits((p) => ({ ...p, preferredTime: e.target.value }))}
                className="cute-input"
              >
                {times.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="field-label">💰 How much do you usually spend?</label>
              <select
                value={tempHabits.averageSpend}
                onChange={(e) => setTempHabits((p) => ({ ...p, averageSpend: e.target.value }))}
                className="cute-input"
              >
                {spendRanges.map((r) => (
                  <option key={r} value={r}>{r}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="field-label">📍 Favorite location?</label>
              <select
                value={tempHabits.favoriteLocation}
                onChange={(e) => setTempHabits((p) => ({ ...p, favoriteLocation: e.target.value }))}
                className="cute-input"
              >
                {locations.map((l) => (
                  <option key={l} value={l}>{l}</option>
                ))}
              </select>
            </div>

            <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleSave}
                className="cute-button"
              >
                Save Changes 💾
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleCancel}
                style={{
                  background: 'transparent',
                  border: '2px solid #476ce6ff',
                  borderRadius: '20px',
                  padding: '12px 25px',
                  color: '#476ce6ff',
                  cursor: 'pointer',
                  fontFamily: 'inherit',
                  fontWeight: 'bold'
                }}
              >
                Cancel
              </motion.button>
            </div>
          </motion.div>
        )}

        <motion.div
          animate={{ rotate: [0, 5, -5, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
          style={{ textAlign: 'center', marginTop: '20px', fontSize: '2rem' }}
        >
          {/* 🧋📈 */}
        </motion.div>
      </div>

      <div className="hairline-separator" />
    </section>
  );
};

export default OrderingHabits;
