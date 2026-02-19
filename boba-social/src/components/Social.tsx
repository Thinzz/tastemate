import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, MessageCircle, Heart, Share, UserPlus } from 'lucide-react';

interface User {
  id: number;
  name: string;
  email: string;
  points: number;
  level: string;
  favoritesFlavors: string[];
  streak: number;
}

interface Friend {
  id: number;
  name: string;
  level: string;
  points: number;
  favoritesFlavors: string[];
  streak: number;
  avatar: string;
  isOnline: boolean;
  sharedInterests: string[];
}

interface Post {
  id: string;
  user: Friend;
  content: string;
  image?: string;
  drinkOrder: string;
  rating: number;
  timestamp: string;
  likes: number;
  comments: number;
  isLiked: boolean;
}

interface SocialProps {
  user: User;
}

const Social: React.FC<SocialProps> = ({ user }) => {
  const [activeTab, setActiveTab] = useState<'feed' | 'friends' | 'discover'>('feed');
  const [showNewPost, setShowNewPost] = useState(false);

  const [friends] = useState<Friend[]>([
    {
      id: 2,
      name: 'Emma Tea Lover',
      level: 'Bubble Tea Enthusiast',
      points: 890,
      favoritesFlavors: ['Taro', 'Brown Sugar'],
      streak: 12,
      avatar: '👩‍🦱',
      isOnline: true,
      sharedInterests: ['Taro', 'Brown Sugar']
    },
    {
      id: 3,
      name: 'Alex Boba King',
      level: 'Bubble Tea Master',
      points: 1456,
      favoritesFlavors: ['Matcha', 'Thai Tea'],
      streak: 25,
      avatar: '👨‍🦰',
      isOnline: false,
      sharedInterests: ['Matcha']
    },
    {
      id: 4,
      name: 'Sophie Sweet',
      level: 'Bubble Tea Explorer',
      points: 654,
      favoritesFlavors: ['Strawberry', 'Mango'],
      streak: 8,
      avatar: '👩‍🦳',
      isOnline: true,
      sharedInterests: ['Strawberry']
    }
  ]);

  const [posts, setPosts] = useState<Post[]>([
    {
      id: '1',
      user: friends[0],
      content: "Just tried the new brown sugar taro combo and OMG! 🤤 This is officially my new favorite!",
      drinkOrder: "Brown Sugar Taro with Extra Pearls",
      rating: 5,
      timestamp: '2 hours ago',
      likes: 12,
      comments: 3,
      isLiked: false
    },
    {
      id: '2',
      user: friends[1],
      content: "Rainy day calls for a warm matcha latte ☔ Perfect comfort drink!",
      drinkOrder: "Hot Matcha Latte with Oat Milk",
      rating: 4,
      timestamp: '4 hours ago',
      likes: 8,
      comments: 2,
      isLiked: true
    },
    {
      id: '3',
      user: friends[2],
      content: "Sharing my strawberry mango creation! The perfect summer refresher 🌞",
      drinkOrder: "Strawberry Mango Smoothie with Popping Boba",
      rating: 5,
      timestamp: '1 day ago',
      likes: 15,
      comments: 5,
      isLiked: false
    }
  ]);

  const suggestedFriends = [
    {
      id: 5,
      name: 'Mike Milk Tea',
      level: 'Bubble Tea Newbie',
      points: 234,
      sharedInterests: ['Original Milk Tea'],
      mutualFriends: 2,
      avatar: '👨‍💼'
    },
    {
      id: 6,
      name: 'Lisa Lychee',
      level: 'Bubble Tea Enthusiast',
      points: 567,
      sharedInterests: ['Lychee', 'Passion Fruit'],
      mutualFriends: 1,
      avatar: '👩‍🎨'
    }
  ];

  const handleLikePost = (postId: string) => {
    setPosts(prev => prev.map(post =>
      post.id === postId
        ? {
            ...post,
            isLiked: !post.isLiked,
            likes: post.isLiked ? post.likes - 1 : post.likes + 1
          }
        : post
    ));
  };

  const renderStars = (rating: number) => (
    <div style={{ display: 'flex', gap: '2px' }}>
      {[1, 2, 3, 4, 5].map(star => (
        <span key={star} style={{ color: star <= rating ? '#FFD700' : '#DDD', fontSize: '1rem' }}>⭐</span>
      ))}
    </div>
  );

  const FeedTab = () => (
    <div>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="card" style={{ marginBottom: '20px' }}>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setShowNewPost(true)}
          style={{
            width: '100%',
            background: 'rgba(71,108,230,0.06)',
            border: '2px dashed rgba(71,108,230,.4)',
            borderRadius: '16px',
            padding: '20px',
            color: '#476ce6ff',
            fontFamily: 'inherit',
            fontSize: '1.1rem',
            fontWeight: 'bold',
            cursor: 'pointer'
          }}
        >
          🧋 Share your bubble tea moment! ✨
        </motion.button>
      </motion.div>

      <AnimatePresence>
        {posts.map((post, index) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="card"
            style={{ marginBottom: '20px' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '15px' }}>
              <div style={{ fontSize: '2.5rem' }}>{post.user.avatar}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 'bold', color: '#0b36c2ff', fontSize: '1.1rem' }}>{post.user.name}</div>
                <div style={{ color: '#476ce6ff', fontSize: '0.9rem' }}>{post.user.level} • {post.timestamp}</div>
              </div>
              {post.user.isOnline && (
                <div style={{ width: '12px', height: '12px', background: '#4CAF50', borderRadius: '50%', border: '2px solid white' }} />
              )}
            </div>

            <p style={{ color: '#333', marginBottom: '15px', lineHeight: '1.5' }}>{post.content}</p>

            <div style={{ background: 'rgba(255, 105, 180, 0.1)', borderRadius: '12px', padding: '15px', marginBottom: '15px', border: '2px solid #476ce6ff' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontWeight: 'bold', color: '#0b36c2ff', marginBottom: '5px' }}>🧋 {post.drinkOrder}</div>
                  {renderStars(post.rating)}
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', gap: '20px' }}>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleLikePost(post.id)}
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    color: post.isLiked ? '#0b36c2ff' : '#476ce6ff',
                    fontWeight: 'bold'
                  }}
                >
                  <Heart size={20} fill={post.isLiked ? '#0b36c2ff' : 'none'} />
                  {post.likes}
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    color: '#0b36c2ff',
                    fontWeight: 'bold'
                  }}
                >
                  <MessageCircle size={20} />
                  {post.comments}
                </motion.button>
              </div>

              <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#476ce6ff' }}>
                <Share size={20} />
              </motion.button>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );

  const FriendsTab = () => (
    <div>
      <div className="grid grid-2">
        {friends.map((friend, index) => (
          <motion.div key={friend.id} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: index * 0.1 }} className="card">
            <div style={{ textAlign: 'center', marginBottom: '15px' }}>
              <div style={{ fontSize: '3rem', marginBottom: '10px', position: 'relative' }}>
                {friend.avatar}
                {friend.isOnline && (
                  <div style={{ position: 'absolute', bottom: '5px', right: '5px', width: '12px', height: '12px', background: '#4CAF50', borderRadius: '50%', border: '2px solid white' }} />
                )}
              </div>
              <h4 style={{ color: '#0b36c2ff', margin: '0 0 5px 0' }}>{friend.name}</h4>
              <p style={{ color: '#476ce6ff', margin: '0 0 10px 0', fontSize: '0.9rem' }}>{friend.level}</p>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', fontSize: '0.8rem' }}>
                <span>🏆 {friend.points}pts</span>
                <span>🔥 {friend.streak} days</span>
              </div>
            </div>

            <div style={{ marginBottom: '15px' }}>
              <h5 style={{ color: '#0b36c2ff', marginBottom: '8px', fontSize: '0.9rem' }}>Shared Interests:</h5>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
                {friend.sharedInterests.map(interest => (
                  <span key={interest} style={{ background: 'linear-gradient(45deg, #476ce6ff, #FFB6C1)', color: 'white', padding: '3px 8px', borderRadius: '10px', fontSize: '0.8rem', fontWeight: 'bold' }}>
                    {interest}
                  </span>
                ))}
              </div>
            </div>

            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="cute-button" style={{ width: '100%' }}>
              <MessageCircle size={16} style={{ marginRight: '8px' }} />
              Message
            </motion.button>
          </motion.div>
        ))}
      </div>
    </div>
  );

  const DiscoverTab = () => (
    <div>
      <h3 className="section-title">🔍 Discover New Friends 🔍</h3>
      <div className="grid grid-2">
        {suggestedFriends.map((person, index) => (
          <motion.div key={person.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }} className="card">
            <div style={{ textAlign: 'center', marginBottom: '15px' }}>
              <div style={{ fontSize: '3rem', marginBottom: '10px' }}>{person.avatar}</div>
              <h4 style={{ color: '#0b36c2ff', margin: '0 0 5px 0' }}>{person.name}</h4>
              <p style={{ color: '#476ce6ff', margin: '0 0 10px 0', fontSize: '0.9rem' }}>{person.level}</p>
              <div style={{ fontSize: '0.8rem', color: '#476ce6ff' }}>
                🏆 {person.points} points • 👥 {person.mutualFriends} mutual friends
              </div>
            </div>

            <div style={{ marginBottom: '15px' }}>
              <h5 style={{ color: '#0b36c2ff', marginBottom: '8px', fontSize: '0.9rem' }}>Shared Interests:</h5>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
                {person.sharedInterests.map(interest => (
                  <span key={interest} style={{ background: 'linear-gradient(45deg, #476ce6ff, #6e8ae6ff)', color: 'white', padding: '3px 8px', borderRadius: '10px', fontSize: '0.8rem', fontWeight: 'bold' }}>
                    {interest}
                  </span>
                ))}
              </div>
            </div>

            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="cute-button" style={{ width: '100%' }}>
              <UserPlus size={16} style={{ marginRight: '8px' }} />
              Add Friend
            </motion.button>
          </motion.div>
        ))}
      </div>
    </div>
  );

  const tabs = [
    { id: 'feed', label: 'Feed', icon: '📱', component: FeedTab },
    { id: 'friends', label: 'Friends', icon: '👥', component: FriendsTab },
    { id: 'discover', label: 'Discover', icon: '🔍', component: DiscoverTab }
  ];

  return (
    <div className="container social-page">
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        <h1 className="page-title">
          <span className="boba-emoji">👥</span>
          Boba Social Network
          <span className="boba-emoji">👥</span>
        </h1>

        {/* Tabs — Animated pill */}
        <div className="tabs-center">
          <div className="tabs" role="tablist" aria-label="Social tabs">
            {tabs.map(tab => {
              const active = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  role="tab"
                  aria-selected={active}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`tab-chip ${active ? 'is-active' : ''}`}
                >
                  {active && (
                    <motion.span
                      layoutId="tabPill"
                      className="tab-pill"
                      transition={{ type: 'spring', stiffness: 500, damping: 32 }}
                    />
                  )}
                  <span className="tab-emoji">{tab.icon}</span>
                  <span className="tab-label">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>


        <AnimatePresence mode="wait">
          <motion.div key={activeTab} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
            {tabs.find(tab => tab.id === activeTab)?.component()}
          </motion.div>
        </AnimatePresence>

        <motion.div animate={{ rotate: [0, 5, -5, 0] }} transition={{ duration: 3, repeat: Infinity }} style={{ textAlign: 'center', margin: '30px 0', fontSize: '3rem' }}>
          {/* 🧋 👥 💕 */}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Social;

