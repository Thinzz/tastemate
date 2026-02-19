import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import './App.css';
import Login from './components/Login';
import Register from './components/Register';
import DrinkProfile from './components/DrinkProfile';
import Social from './components/Social';
import Navigation from './components/Navigation';
import DailyReward from './components/DailyReward';

const CHECKIN_KEY = 'bobasocial_checkin';

interface CheckinData {
  lastDate: string;
  streak: number;
  checkinDates: string[];
}

function getToday(): string {
  return new Date().toISOString().split('T')[0];
}

function getWeekCheckins(checkinDates: string[]): boolean[] {
  const today = new Date();
  const dayOfWeek = today.getDay();
  const weekStart = new Date(today);
  weekStart.setDate(today.getDate() - dayOfWeek);
  weekStart.setHours(0, 0, 0, 0);
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(weekStart);
    d.setDate(weekStart.getDate() + i);
    return checkinDates.includes(d.toISOString().split('T')[0]);
  });
}

function App() {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState<any>(null);
  const [showDailyReward, setShowDailyReward] = React.useState(false);
  const [checkinData, setCheckinData] = React.useState<CheckinData>({ lastDate: '', streak: 0, checkinDates: [] });
  const [autoCheckedIn, setAutoCheckedIn] = React.useState(false);

  const handleEarnPoints = (pts: number) => {
    setCurrentUser((prev: any) => prev ? { ...prev, points: prev.points + pts } : prev);
  };

  const handleLogin = (value: boolean) => {
    setIsAuthenticated(value);
    if (value) {
      const today = getToday();
      const stored = localStorage.getItem(CHECKIN_KEY);
      let data: CheckinData = stored
        ? JSON.parse(stored)
        : { lastDate: '', streak: 0, checkinDates: [] };

      let didAutoCheckin = false;
      if (data.lastDate !== today) {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayStr = yesterday.toISOString().split('T')[0];
        const newStreak = data.lastDate === yesterdayStr ? data.streak + 1 : 1;
        data = {
          lastDate: today,
          streak: newStreak,
          checkinDates: [...data.checkinDates, today],
        };
        localStorage.setItem(CHECKIN_KEY, JSON.stringify(data));
        didAutoCheckin = true;
        handleEarnPoints(2);
      }

      setCheckinData(data);
      setAutoCheckedIn(didAutoCheckin);
      setShowDailyReward(true);
    }
  };

  const weekCheckins = getWeekCheckins(checkinData.checkinDates);

  return (
    <Router>
      <div className="App">
        {isAuthenticated && <Navigation />}
        <AnimatePresence>
          {showDailyReward && (
            <DailyReward
              onClose={() => setShowDailyReward(false)}
              onEarnPoints={handleEarnPoints}
              streak={checkinData.streak}
              weekCheckins={weekCheckins}
              autoCheckedIn={autoCheckedIn}
            />
          )}
        </AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="app-content"
        >
          <Routes>
            <Route
              path="/login"
              element={
                !isAuthenticated ?
                <Login setIsAuthenticated={handleLogin} setCurrentUser={setCurrentUser} /> :
                <Navigate to="/profile" />
              }
            />
            <Route
              path="/register"
              element={
                !isAuthenticated ?
                <Register setIsAuthenticated={handleLogin} setCurrentUser={setCurrentUser} /> :
                <Navigate to="/profile" />
              }
            />
            <Route
              path="/profile"
              element={
                isAuthenticated ?
                <DrinkProfile user={currentUser} /> :
                <Navigate to="/login" />
              }
            />
            <Route
              path="/social"
              element={
                isAuthenticated ?
                <Social user={currentUser} /> :
                <Navigate to="/login" />
              }
            />
            <Route path="/" element={<Navigate to={isAuthenticated ? "/profile" : "/login"} />} />
          </Routes>
        </motion.div>
      </div>
    </Router>
  );
}

export default App;
