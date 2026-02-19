import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type Plan = 'checkin' | 'quiz';

interface DailyRewardProps {
  onClose: () => void;
  onEarnPoints: (pts: number) => void;
  streak: number;
  weekCheckins: boolean[];
  autoCheckedIn: boolean;
}

const DAY_LABELS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

const DailyReward: React.FC<DailyRewardProps> = ({
  onClose,
  onEarnPoints,
  streak,
  weekCheckins,
  autoCheckedIn,
}) => {
  const [selectedPlan, setSelectedPlan] = useState<Plan>('checkin');
  const [changingPlan, setChangingPlan] = useState(false);

  // Quiz state
  const [quizAnswer, setQuizAnswer] = useState<number | null>(null);
  const [quizCorrect, setQuizCorrect] = useState<boolean | null>(null);

  const quizDone = quizAnswer !== null;
  const todayDayOfWeek = new Date().getDay();

  // Mock quiz data
  const quiz = {
    question: 'Which topping is the most popular in bubble tea?',
    options: ['Pudding', 'Tapioca Pearls', 'Jelly', 'Red Bean'],
    correctIndex: 1,
  };

  const handleQuizAnswer = (index: number) => {
    if (quizDone) return;
    const correct = index === quiz.correctIndex;
    setQuizAnswer(index);
    setQuizCorrect(correct);
    if (correct) {
      onEarnPoints(5);
    }
  };

  const handleSwitchPlan = (plan: Plan) => {
    if (quizDone) return;
    setSelectedPlan(plan);
    setChangingPlan(false);
  };

  return (
    <AnimatePresence>
      <motion.div
        className="reward-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="reward-modal"
          initial={{ scale: 0.85, opacity: 0, y: 40 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.85, opacity: 0, y: 40 }}
          transition={{ type: 'spring', stiffness: 350, damping: 28 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button */}
          <button className="reward-close" onClick={onClose}>
            &times;
          </button>

          {/* Header */}
          <div className="reward-header">
            <motion.div
              className="reward-badge"
              initial={{ rotate: -10, scale: 0 }}
              animate={{ rotate: 0, scale: 1 }}
              transition={{ delay: 0.15, type: 'spring', stiffness: 300 }}
            >
              🎁
            </motion.div>
            <h2 className="reward-title">Daily Rewards</h2>
            <p className="reward-sub">Earn points & redeem for free boba!</p>
          </div>

          {/* Grow Your Streak section */}
          <motion.div
            className="streak-section"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="streak-section-header">
              <div>
                <h3 className="streak-title">Grow Your Streak</h3>
                <p className="streak-subtitle">Open app daily to earn +2 pts automatically.</p>
              </div>
              <div className="streak-counter">
                <span className="streak-fire-num">🔥 {streak}</span>
                <span className="streak-fire-label">day streak</span>
              </div>
            </div>

            <div className="streak-days">
              {DAY_LABELS.map((day, i) => {
                const isActive = weekCheckins[i];
                const isToday = i === todayDayOfWeek;
                return (
                  <div key={i} className="streak-day-wrap">
                    <span className="streak-day-label">{day}</span>
                    <motion.div
                      className={[
                        'streak-day-circle',
                        isActive ? 'streak-day-circle--active' : '',
                        isToday && !isActive ? 'streak-day-circle--today' : '',
                      ].join(' ')}
                      initial={{ scale: 0.7, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.15 + i * 0.05, type: 'spring', stiffness: 300, damping: 20 }}
                    >
                      ⚡
                    </motion.div>
                  </div>
                );
              })}
            </div>

            {autoCheckedIn && (
              <motion.div
                className="streak-auto-badge"
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.55 }}
              >
                ✓ Auto check-in complete — +2 pts earned today!
              </motion.div>
            )}
          </motion.div>

          {/* Tastemate info banner */}
          <motion.div
            className="reward-banner"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <span className="reward-banner-icon">🧋</span>
            <div>
              <strong>Order on Tastemate</strong>
              <span className="reward-banner-pts">+10 pts per order</span>
            </div>
          </motion.div>

          {/* Current plan display */}
          <div className="reward-plan-header">
            <span className="reward-plan-label">Your Plan</span>
            {!quizDone && (
              <motion.button
                className="reward-change-btn"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setChangingPlan(!changingPlan)}
              >
                {changingPlan ? 'Cancel' : 'Change Plan'}
              </motion.button>
            )}
          </div>

          {/* Plan selection */}
          <AnimatePresence mode="wait">
            {changingPlan ? (
              <motion.div
                key="plan-select"
                className="reward-options"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <motion.div
                  className={`reward-option reward-option--selectable ${selectedPlan === 'checkin' ? 'reward-option--active' : ''}`}
                  whileHover={{ scale: 1.02 }}
                  onClick={() => handleSwitchPlan('checkin')}
                >
                  <div className="reward-option-left">
                    <span className="reward-option-icon">📅</span>
                    <div>
                      <h3 className="reward-option-title">Daily Check-in</h3>
                      <p className="reward-option-desc">Auto +2 pts when you open the app</p>
                    </div>
                  </div>
                  <div className="reward-option-right">
                    <span className="reward-pts-badge">+2 pts/day</span>
                    {selectedPlan === 'checkin' && <span className="reward-current-tag">Current</span>}
                  </div>
                </motion.div>

                <motion.div
                  className={`reward-option reward-option--selectable ${selectedPlan === 'quiz' ? 'reward-option--active' : ''}`}
                  whileHover={{ scale: 1.02 }}
                  onClick={() => handleSwitchPlan('quiz')}
                >
                  <div className="reward-option-left">
                    <span className="reward-option-icon">🧠</span>
                    <div>
                      <h3 className="reward-option-title">Daily Quiz</h3>
                      <p className="reward-option-desc">Answer one quiz per day for more points</p>
                    </div>
                  </div>
                  <div className="reward-option-right">
                    <span className="reward-pts-badge">+5 pts/day</span>
                    {selectedPlan === 'quiz' && <span className="reward-current-tag">Current</span>}
                  </div>
                </motion.div>
              </motion.div>
            ) : (
              <motion.div
                key="plan-action"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                {/* Check-in plan — always done (auto check-in handles it) */}
                {selectedPlan === 'checkin' && (
                  <div className="reward-options">
                    <motion.div className="reward-option reward-option--done">
                      <div className="reward-option-left">
                        <span className="reward-option-icon">✅</span>
                        <div>
                          <h3 className="reward-option-title">Daily Check-in</h3>
                          <p className="reward-option-desc">
                            {autoCheckedIn
                              ? 'Auto check-in done! +2 pts earned today'
                              : 'Already checked in today'}
                          </p>
                        </div>
                      </div>
                      <div className="reward-option-right">
                        <span className="reward-pts-badge">+2 pts</span>
                      </div>
                    </motion.div>
                  </div>
                )}

                {/* Quiz plan */}
                {selectedPlan === 'quiz' && (
                  <div className="reward-options">
                    <motion.div
                      className={`reward-option ${quizDone ? 'reward-option--done' : ''}`}
                    >
                      <div className="reward-option-left">
                        <span className="reward-option-icon">{quizDone ? '✅' : '🧠'}</span>
                        <div>
                          <h3 className="reward-option-title">Daily Quiz</h3>
                          <p className="reward-option-desc">
                            {quizCorrect !== null
                              ? quizCorrect
                                ? 'Correct! You earned 5 points!'
                                : 'Wrong answer, try again tomorrow!'
                              : "Answer today's question to earn points"}
                          </p>
                        </div>
                      </div>
                      <div className="reward-option-right">
                        <span className="reward-pts-badge">+5 pts</span>
                      </div>
                    </motion.div>

                    {/* Quiz question */}
                    <AnimatePresence>
                      {quizAnswer === null && (
                        <motion.div
                          className="reward-quiz"
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <p className="reward-quiz-q">{quiz.question}</p>
                          <div className="reward-quiz-options">
                            {quiz.options.map((opt, i) => (
                              <motion.button
                                key={i}
                                className="reward-quiz-btn"
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.97 }}
                                onClick={() => handleQuizAnswer(i)}
                              >
                                {opt}
                              </motion.button>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Quiz result */}
                    <AnimatePresence>
                      {quizAnswer !== null && (
                        <motion.div
                          className={`reward-quiz-result ${quizCorrect ? 'reward-quiz-result--correct' : 'reward-quiz-result--wrong'}`}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                        >
                          {quizCorrect
                            ? '🎉 Correct! +5 points earned!'
                            : `😅 The answer was: ${quiz.options[quiz.correctIndex]}`}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Footer info */}
          <div className="reward-footer">
            <div className="reward-steps">
              <span className="reward-step">1. Open app daily</span>
              <span className="reward-step-arrow">→</span>
              <span className="reward-step">2. Earn points</span>
              <span className="reward-step-arrow">→</span>
              <span className="reward-step">3. Redeem for free boba!</span>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default DailyReward;
