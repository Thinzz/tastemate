import React, { useState } from 'react';
import { motion } from 'framer-motion';
import FavoriteFlavors from './FavoriteFlavors';
import MoodTracker from './MoodTracker';
import OrderingHabits from './OrderingHabits';
import FlavorCombinations from './FlavorCombinations';
import PointsProgress from './PointsProgress';

interface User {
  id: number;
  name: string;
  email: string;
  points: number;
  level: string;
  favoritesFlavors: string[];
  streak: number;
  joinDate?: string;
}

interface DrinkProfileProps {
  user: User;
}

const sectionBackgrounds = [
  'linear-gradient(135deg, #eef6ff, #fff7fb)',
  'linear-gradient(135deg, #f8fbff, #ffffff)',
  'linear-gradient(135deg, #f8dfff, #cae8ff)',
  'linear-gradient(135deg, #d3ebff, #fce4ef)',
];

const DrinkProfile: React.FC<DrinkProfileProps> = ({ user }) => {
  const [profileData, setProfileData] = useState({
    favoriteFlavors: user.favoritesFlavors || [],
    currentMood: '',
    orderingHabits: {
      frequency: 'Daily',
      preferredTime: 'Afternoon',
      averageSpend: '$5-10',
      favoriteLocation: 'Downtown Store'
    },
    customCombinations: []
  });

  // 计算到下一个整千（至少 1000）
  const maxPoints = Math.max(1000, Math.ceil(user.points / 1000) * 1000);

  const handleDataUpdate = (section: string, data: any) => {
    setProfileData(prev => ({ ...prev, [section]: data }));
  };

  return (
    <div className="container">
      <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        {/* Page Title */}
        <header style={{ textAlign: 'center', marginBottom: 16 }}>
          <motion.h1
            className="page-title-modern"
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.35 }}
          >
            <span className="boba-emoji">🧋</span>
            {user.name}
            <span className="apostrophe">’s</span>
            <span> Drink Profile</span>
            <span className="boba-emoji">🧋</span>
          </motion.h1>

          {/* KPI strip */}
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="kpi-strip"
          >
            <div className="kpi-pill">
              <span className="kpi-emoji">🏆</span>
              <span className="kpi-text">{user.level}</span>
            </div>
            <div className="kpi-pill">
              <span className="kpi-emoji">🔥</span>
              <span className="kpi-text">{user.streak} Day Streak</span>
            </div>
            <div className="kpi-pill">
              <span className="kpi-emoji">⭐</span>
              <span className="kpi-text">{user.points} Points</span>
            </div>
          </motion.div>

          {/* Progress card — 用更高级的组件样式（你刚升级过的） */}
          <div className="section-shell" style={{ background: 'linear-gradient(135deg, #b0d6ff 0%, #d8c8ff 100%)' }}>
            <PointsProgress currentPoints={user.points} maxPoints={maxPoints} level={user.level} />
          </div>
        </header>

        {/* Section 1 */}
        <section className="section-shell" style={{ background: sectionBackgrounds[0] }}>
          <FavoriteFlavors
            flavors={profileData.favoriteFlavors}
            onUpdate={(flavors) => handleDataUpdate('favoriteFlavors', flavors)}
          />
        </section>

        {/* Section 2 */}
        <section className="section-shell" style={{ background: sectionBackgrounds[1] }}>
          <MoodTracker
            currentMood={profileData.currentMood}
            onUpdate={(mood) => handleDataUpdate('currentMood', mood)}
          />
        </section>

        {/* Section 3 */}
        <section className="section-shell" style={{ background: sectionBackgrounds[2] }}>
          <OrderingHabits
            habits={profileData.orderingHabits}
            onUpdate={(habits) => handleDataUpdate('orderingHabits', habits)}
          />
        </section>

        {/* Section 4 */}
        <section className="section-shell" style={{ background: sectionBackgrounds[3] }}>
          <FlavorCombinations
            combinations={profileData.customCombinations}
            onUpdate={(combinations) => handleDataUpdate('customCombinations', combinations)}
          />
        </section>

        {/* Share */}
        <motion.section
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="section-shell"
          style={{ background: 'linear-gradient(135deg, #f8fbff, #ffffff)', textAlign: 'center' }}
        >
          <h3 className="section-title">Share Your Profile! 📤</h3>
          <p className="muted">Let your friends see your amazing bubble tea journey!</p>

          <div className="actions">
            <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.96 }} className="cute-button">
              Share on Social 📱
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.96 }}
              className="cute-button"
              onClick={() => {
                const profileUrl = `${window.location.origin}/profile/${user.id}`;
                navigator.clipboard.writeText(profileUrl);
                alert('Profile link copied! 📋✨');
              }}
            >
              Copy Link 🔗
            </motion.button>
          </div>
        </motion.section>

        <motion.div
          animate={{ rotate: [0, 5, -5, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
          style={{ textAlign: 'center', margin: '30px 0', fontSize: '2.4rem' }}
        >
          {/* 🧋 💖 🧋 */}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default DrinkProfile;
