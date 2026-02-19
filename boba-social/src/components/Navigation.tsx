import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { Users, Home } from 'lucide-react';

const Navigation: React.FC = () => {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navItems = [
    { path: '/profile', icon: Home, label: 'My Profile', emoji: '🏠' },
    { path: '/social', icon: Users, label: 'Social', emoji: '👥' }
  ];

  const isActive = (p: string) => location.pathname === p;

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
      style={{
        position: 'fixed',
        top: 0, left: 0, right: 0,
        height: scrolled ? 60 : 72,
        display: 'flex',
        alignItems: 'center',
        zIndex: 1000,
        padding: '0 0',
        background: scrolled
          ? 'linear-gradient(135deg, rgba(255,255,255,0.75), rgba(245,248,255,0.6))'
          : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(11,54,194,0.12)' : '1px solid transparent',
        boxShadow: scrolled ? '0 8px 20px rgba(17,24,39,0.06)' : 'none',
        transition: 'background 360ms ease, height 260ms ease, backdrop-filter 360ms ease, border-color 360ms ease, box-shadow 360ms ease'
      }}
    >
      <div
        className="container"
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 16,
          width: '100%'
        }}
      >
        {/* Brand */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          style={{ display: 'flex', alignItems: 'center', gap: 10 }}
        >
          <span style={{ fontSize: '1.5rem' }}>🧋</span>
          <h2
            style={{
              margin: 0,
              // 用你全局里设置的无衬线，更专业
              fontFamily: 'var(--font-head, Inter, system-ui, -apple-system, "Segoe UI", sans-serif)',
              fontWeight: 800,
              letterSpacing: '-0.3px',
              color: scrolled ? '#0b36c2' : '#274bdb',
              transition: 'color 240ms ease'
            }}
          >
            Boba Social
          </h2>
        </motion.div>

        {/* Nav items with animated active pill */}
        <div style={{ display: 'flex', gap: 10, alignItems: 'center', position: 'relative' }}>
          {navItems.map((item) => {
            const active = isActive(item.path);
            return (
              <Link key={item.path} to={item.path} style={{ textDecoration: 'none' }}>
                <motion.div
                  whileHover={{ y: -1 }}
                  whileTap={{ scale: 0.98 }}
                  style={{
                    position: 'relative',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    padding: '8px 14px',
                    borderRadius: 9999,
                    fontWeight: 700,
                    fontFamily: 'var(--font-body, Inter, system-ui, -apple-system, "Segoe UI", sans-serif)',
                    color: active ? '#fff' : '#476ce6',
                    overflow: 'hidden'
                  }}
                >
                  {/* 胶囊高亮：复用 layoutId 做平滑过渡 */}
                  {active && (
                    <motion.span
                      layoutId="nav-active-pill"
                      style={{
                        position: 'absolute',
                        inset: 0,
                        borderRadius: 9999,
                        background: 'linear-gradient(135deg, #5a7cff, #b68aff)',
                        boxShadow: '0 8px 18px rgba(93,111,255,0.35)'
                      }}
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span style={{ position: 'relative', zIndex: 1 }}>{item.emoji}</span>
                  <span style={{ position: 'relative', zIndex: 1 }}>{item.label}</span>
                </motion.div>
              </Link>
            );
          })}

          {/* Logout */}
          <motion.button
            whileHover={{ y: -1 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => window.location.reload()}
            style={{
              background: 'transparent',
              border: '1px solid rgba(71,108,230,0.45)',
              borderRadius: 9999,
              padding: '8px 14px',
              color: '#476ce6',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              fontWeight: 700,
              fontFamily: 'var(--font-body, Inter, system-ui, -apple-system, "Segoe UI", sans-serif)',
              transition: 'border-color 220ms ease, color 220ms ease, background 220ms ease'
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background = 'rgba(71,108,230,0.10)';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background = 'transparent';
            }}
          >
            <span>🚪</span>
            <span>Logout</span>
          </motion.button>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navigation;
