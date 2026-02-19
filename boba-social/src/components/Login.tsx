import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

interface LoginProps {
  setIsAuthenticated: (value: boolean) => void;
  setCurrentUser: (user: any) => void;
}

const Login: React.FC<LoginProps> = ({ setIsAuthenticated, setCurrentUser }) => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const mockUser = {
      id: 1,
      name: 'Boba Lover',
      email: formData.email,
      points: 1250,
      level: 'Bubble Tea Master',
      favoritesFlavors: ['Taro', 'Brown Sugar', 'Matcha'],
      streak: 7
    };
    setCurrentUser(mockUser);
    setIsAuthenticated(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="container auth">
      <motion.div
        initial={{ y: 36, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="auth-card"
      >
        {/* 顶部品牌 */}
        <div className="auth-head">
          <motion.div
            initial={{ opacity: 0, scale: .96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: .05 }}
            className="auth-badge"
          >
            🧋
          </motion.div>
          <h1 className="auth-title">Boba Social</h1>
          <p className="auth-sub">Welcome back, bubble tea lover!</p>
        </div>

        {/* 表单 */}
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="auth-field">
            <input
              type="email"
              name="email"
              placeholder=" "
              value={formData.email}
              onChange={handleChange}
              className="auth-input"
              required
            />
            <label className="auth-label">📧 Email</label>
          </div>

          <div className="auth-field">
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              placeholder=" "
              value={formData.password}
              onChange={handleChange}
              className="auth-input"
              required
            />
            <label className="auth-label">🔒 Password</label>
            <button
              type="button"
              className="auth-eye"
              onClick={() => setShowPassword(v => !v)}
              aria-label="Toggle password visibility"
            >
              {showPassword ? '🙈' : '👁️'}
            </button>
          </div>

          <motion.button
            whileHover={{ y: -1 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="auth-button"
          >
            Sign In 🧋
          </motion.button>
        </form>

        {/* 底部链接 */}
        <div className="auth-foot">
          <span>New to Boba Social? </span>
          <Link to="/register" className="auth-link">Join the bubble tea community! 🎉</Link>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
