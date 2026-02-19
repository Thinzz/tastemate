import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, X } from 'lucide-react';

interface FavoriteFlavorsProps {
  flavors: string[];
  onUpdate: (flavors: string[]) => void;
  /** 让版块左右“出血”到屏幕边缘（忽略父容器内边距），实现真正全宽 */
  fullWidth?: boolean;
  /** 去掉卡片外观（无阴影/无边框/无背景/零圆角），用于和相邻区块无缝连接 */
  seamless?: boolean;
  /** 可选：最宽内容宽度（不想限制就传 'none' 或不传） */
  maxContentWidth?: number | 'none';
}

const FavoriteFlavors: React.FC<FavoriteFlavorsProps> = ({
  flavors,
  onUpdate,
  fullWidth = true,
  seamless = true,
  maxContentWidth = 1200
}) => {
  const [newFlavor, setNewFlavor] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);

  const popularFlavors = [
    { name: 'Original Milk Tea', emoji: '🥛' },
    { name: 'Taro', emoji: '🟣' },
    { name: 'Brown Sugar', emoji: '🍯' },
    { name: 'Matcha', emoji: '🍵' },
    { name: 'Thai Tea', emoji: '🧡' },
    { name: 'Honeydew', emoji: '🍈' },
    { name: 'Strawberry', emoji: '🍓' },
    { name: 'Mango', emoji: '🥭' },
    { name: 'Passion Fruit', emoji: '🟡' },
    { name: 'Lychee', emoji: '⚪' },
    { name: 'Coconut', emoji: '🥥' },
    { name: 'Chocolate', emoji: '🍫' },
    { name: 'Vanilla', emoji: '🤍' },
    { name: 'Caramel', emoji: '🟤' },
    { name: 'Wintermelon', emoji: '🍈' }
  ];

  const handleAddFlavor = (flavorName: string) => {
    if (!flavors.includes(flavorName)) {
      onUpdate([...flavors, flavorName]);
    }
  };

  const handleRemoveFlavor = (flavorToRemove: string) => {
    onUpdate(flavors.filter(f => f !== flavorToRemove));
  };

  const handleCustomFlavorSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newFlavor.trim() && !flavors.includes(newFlavor.trim())) {
      onUpdate([...flavors, newFlavor.trim()]);
      setNewFlavor('');
      setShowAddForm(false);
    }
  };

  return (
    // 外层 section：支持全宽“出血”与无痕外观
    <section
      className={[
        fullWidth ? 'bleed-fullwidth' : '',
        seamless ? 'seamless' : 'card-like'
      ].join(' ')}
      style={{
        background: 'linear-gradient(135deg, #d9f1ff, #fbe0eb)'  // ← 这里改
      }}
    >
      {/* 内层容器：可选限制最大宽度，保持内容行长舒服 */}
      <div
        className="section-inner"
        style={{
          maxWidth: maxContentWidth === 'none' ? 'none' : `${maxContentWidth}px`
        }}
      >
        <h3 className="section-title">🧋 My Favorite Flavors 🧋</h3>

        <div style={{ marginBottom: 20 }}>
          <AnimatePresence>
            {flavors.map((flavor) => (
              <motion.div
                key={flavor}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                layout
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  background: 'linear-gradient(45deg, #476ce6ff, #FFB6C1)',
                  color: 'white',
                  padding: '8px 15px',
                  borderRadius: 20,
                  margin: 5,
                  fontWeight: 'bold'
                }}
              >
                <span>{flavor}</span>
                <motion.button
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.8 }}
                  onClick={() => handleRemoveFlavor(flavor)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'white',
                    cursor: 'pointer',
                    padding: 2,
                    display: 'flex',
                    alignItems: 'center'
                  }}
                >
                  <X size={16} />
                </motion.button>
              </motion.div>
            ))}
          </AnimatePresence>

          {flavors.length === 0 && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              style={{ color: '#476ce6ff', textAlign: 'center', fontStyle: 'italic' }}
            >
              No favorite flavors yet! Add some below 👇
            </motion.p>
          )}
        </div>

        <div style={{ marginBottom: 20 }}>
          <h4 style={{ color: '#0b36c2ff', marginBottom: 15, textAlign: 'center' }}>
            ⭐ Popular Flavors ⭐
          </h4>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 10,
              justifyContent: 'center'
            }}
          >
            {popularFlavors.map((flavor) => (
              <motion.button
                key={flavor.name}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleAddFlavor(flavor.name)}
                disabled={flavors.includes(flavor.name)}
                style={{
                  background: flavors.includes(flavor.name)
                    ? 'rgba(45, 153, 224, 0.3)'
                    : 'rgba(255, 255, 255, 0.8)',
                  border: '2px solid #476ce6ff',
                  borderRadius: 15,
                  padding: '8px 12px',
                  cursor: flavors.includes(flavor.name) ? 'not-allowed' : 'pointer',
                  fontFamily: 'inherit',
                  fontSize: '0.9rem',
                  color: '#0b36c2ff',
                  fontWeight: 'bold',
                  opacity: flavors.includes(flavor.name) ? 0.6 : 1
                }}
              >
                {flavor.emoji} {flavor.name}
              </motion.button>
            ))}
          </div>
        </div>

        <div style={{ textAlign: 'center' }}>
          <AnimatePresence>
            {!showAddForm ? (
              <motion.button
                key="add-button"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowAddForm(true)}
                className="cute-button"
                style={{ display: 'flex', alignItems: 'center', gap: 8, margin: '0 auto' }}
              >
                <Plus size={20} />
                Add Custom Flavor
              </motion.button>
            ) : (
              <motion.form
                key="add-form"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                onSubmit={handleCustomFlavorSubmit}
                style={{
                  display: 'flex',
                  gap: 10,
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexWrap: 'wrap'
                }}
              >
                <input
                  type="text"
                  value={newFlavor}
                  onChange={(e) => setNewFlavor(e.target.value)}
                  placeholder="Enter custom flavor"
                  className="cute-input"
                  style={{ margin: 0, minWidth: 200 }}
                  autoFocus
                />
                <div style={{ display: 'flex', gap: 8 }}>
                  <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} type="submit" className="cute-button">
                    Add
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="button"
                    onClick={() => {
                      setShowAddForm(false);
                      setNewFlavor('');
                    }}
                    style={{
                      background: 'transparent',
                      border: '2px solid #476ce6ff',
                      borderRadius: 20,
                      padding: '8px 16px',
                      color: '#476ce6ff',
                      cursor: 'pointer',
                      fontFamily: 'inherit',
                      fontWeight: 'bold'
                    }}
                  >
                    Cancel
                  </motion.button>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* 可选分隔：极浅发丝线，基本“无痕”，用于和下一个 stack/card 过渡 */}
      <div className="hairline-separator" />
    </section>
  );
};

export default FavoriteFlavors;
