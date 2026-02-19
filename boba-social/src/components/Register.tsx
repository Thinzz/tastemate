import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

interface RegisterProps {
  setIsAuthenticated: (value: boolean) => void;
  setCurrentUser: (user: any) => void;
}

const Register: React.FC<RegisterProps> = ({ setIsAuthenticated, setCurrentUser }) => {
  const [formData, setFormData] = useState({
    name: '', email: '', password: '', confirmPassword: '', favoriteFlavor: ''
  });
  const [showPw, setShowPw] = useState(false);
  const [showPw2, setShowPw2] = useState(false);
  const [strength, setStrength] = useState(0);

  const flavorOptions = [
    'Original Milk Tea','Taro','Brown Sugar','Matcha','Thai Tea','Honeydew',
    'Strawberry','Mango','Passion Fruit','Lychee','Coconut','Chocolate',
    'Vanilla','Caramel','Wintermelon'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match! 😢');
      return;
    }
    const newUser = {
      id: Date.now(),
      name: formData.name,
      email: formData.email,
      points: 100,
      level: 'Bubble Tea Newbie',
      favoritesFlavors: [formData.favoriteFlavor],
      streak: 1,
      joinDate: new Date().toISOString()
    };
    setCurrentUser(newUser);
    setIsAuthenticated(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    if (name === 'password') {
      // 简单强度：长度 + 种类
      let s = 0;
      if (value.length > 5) s++;
      if (value.length > 8) s++;
      if (/[A-Z]/.test(value)) s++;
      if (/\d/.test(value)) s++;
      if (/[^A-Za-z0-9]/.test(value)) s++;
      setStrength(Math.min(4, s));
    }
  };

  return (
    <div className="container auth">
      <motion.div
        initial={{ y: 36, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="auth-card"
      >
        <div className="auth-head">
          <motion.div initial={{ opacity: 0, scale: .96 }} animate={{ opacity: 1, scale: 1 }} className="auth-badge">
            🎉
          </motion.div>
          <h1 className="auth-title">Join Boba Social</h1>
          <p className="auth-sub">Start your bubble tea journey!</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="auth-field">
            <input
              type="text" name="name" placeholder=" "
              value={formData.name} onChange={handleChange}
              className="auth-input" required
            />
            <label className="auth-label">🌟 Your Name</label>
          </div>

          <div className="auth-field">
            <input
              type="email" name="email" placeholder=" "
              value={formData.email} onChange={handleChange}
              className="auth-input" required
            />
            <label className="auth-label">📧 Email</label>
          </div>

          <div className="auth-field">
            <select
              name="favoriteFlavor" value={formData.favoriteFlavor}
              onChange={handleChange} className="auth-input auth-select" required
            >
              <option value="">🧋 Choose your favorite flavor</option>
              {flavorOptions.map(f => <option key={f} value={f}>{f}</option>)}
            </select>
            <label className="auth-label">🧋 Favorite Flavor</label>
          </div>

          <div className="auth-field">
            <input
              type={showPw ? 'text' : 'password'} name="password" placeholder=" "
              value={formData.password} onChange={handleChange}
              className="auth-input" required
            />
            <label className="auth-label">🔒 Password</label>
            <button type="button" className="auth-eye" onClick={() => setShowPw(v => !v)}>
              {showPw ? '🙈' : '👁️'}
            </button>
            {/* 强度条 */}
            <div className="auth-strength">
              <span data-on={strength > 0} />
              <span data-on={strength > 1} />
              <span data-on={strength > 2} />
              <span data-on={strength > 3} />
            </div>
          </div>

          <div className="auth-field">
            <input
              type={showPw2 ? 'text' : 'password'} name="confirmPassword" placeholder=" "
              value={formData.confirmPassword} onChange={handleChange}
              className="auth-input" required
            />
            <label className="auth-label">🔒 Confirm Password</label>
            <button type="button" className="auth-eye" onClick={() => setShowPw2(v => !v)}>
              {showPw2 ? '🙈' : '👁️'}
            </button>
          </div>

          <motion.button
            whileHover={{ y: -1 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="auth-button"
          >
            Join the Boba Community! 🎊
          </motion.button>
        </form>

        <div className="auth-foot">
          <span>Already a member? </span>
          <Link to="/login" className="auth-link">Sign in here! 🧋</Link>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;
