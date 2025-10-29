import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Eye, LogOut, MessageSquare, Upload, Zap, 
  TrendingUp, Award, Calendar, MessageCircle 
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { signOut, getCurrentUser } from '../lib/supabase';
import AnalyzeSection from '../components/AnalyzeSection';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<'analyze' | 'upload'>('analyze');
  const [showChat, setShowChat] = useState(false);

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      navigate('/login');
    } else {
      setUser(currentUser);
    }
  };

  const handleLogout = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-mirror-bg">
      {/* Header */}
      <header className="glass border-b border-mirror-border">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Eye className="w-6 h-6 text-mirror-purple" />
            <span className="text-xl font-display font-bold bg-gradient-to-r from-mirror-purple to-mirror-cyan bg-clip-text text-transparent">
              MIRROR
            </span>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm text-mirror-text-dim">Welcome back</p>
              <p className="font-medium text-mirror-text">{user?.email?.split('@')[0]}</p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleLogout}
              className="p-2 rounded-lg bg-mirror-panel border border-mirror-border hover:border-mirror-red transition-all"
            >
              <LogOut className="w-5 h-5 text-mirror-red" />
            </motion.button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8">
        {/* Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass rounded-xl p-6 mb-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Streak */}
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-mirror-purple to-mirror-cyan flex items-center justify-center">
                <Calendar className="w-6 h-6" />
              </div>
              <div>
                <p className="text-2xl font-display font-bold">🔥 0 Days</p>
                <p className="text-sm text-mirror-text-dim">Current Streak</p>
              </div>
            </div>

            {/* Level */}
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-mirror-cyan to-mirror-purple flex items-center justify-center">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <p className="text-2xl font-display font-bold">Level 1</p>
                <p className="text-sm text-mirror-text-dim">Beginner</p>
              </div>
            </div>

            {/* Analyses */}
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-mirror-purple to-mirror-red flex items-center justify-center">
                <Zap className="w-6 h-6" />
              </div>
              <div>
                <p className="text-2xl font-display font-bold">0</p>
                <p className="text-sm text-mirror-text-dim">Analyses Today</p>
              </div>
            </div>

            {/* Score */}
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-mirror-cyan to-mirror-red flex items-center justify-center">
                <TrendingUp className="w-6 h-6" />
              </div>
              <div>
                <p className="text-2xl font-display font-bold">--/100</p>
                <p className="text-sm text-mirror-text-dim">Communication Score</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Tab Selector */}
        <div className="flex gap-4 mb-6">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setActiveTab('analyze')}
            className={`flex-1 py-3 px-6 rounded-lg font-semibold transition-all ${
              activeTab === 'analyze'
                ? 'bg-gradient-to-r from-mirror-purple to-mirror-cyan shadow-glow-purple'
                : 'glass border border-mirror-border hover:border-mirror-purple'
            }`}
          >
            <MessageSquare className="w-5 h-5 inline mr-2" />
            Type or Paste
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setActiveTab('upload')}
            className={`flex-1 py-3 px-6 rounded-lg font-semibold transition-all ${
              activeTab === 'upload'
                ? 'bg-gradient-to-r from-mirror-purple to-mirror-cyan shadow-glow-purple'
                : 'glass border border-mirror-border hover:border-mirror-purple'
            }`}
          >
            <Upload className="w-5 h-5 inline mr-2" />
            Upload File
          </motion.button>
        </div>

        {/* Analysis Section */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
          >
            <AnalyzeSection mode={activeTab} />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Floating Chat Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setShowChat(!showChat)}
        className="fixed bottom-8 right-8 w-14 h-14 rounded-full bg-gradient-to-r from-mirror-purple to-mirror-cyan shadow-glow-purple flex items-center justify-center z-50"
      >
        <MessageCircle className="w-6 h-6" />
      </motion.button>

      {/* Chat Panel */}
      <AnimatePresence>
        {showChat && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 right-8 w-96 h-[500px] glass rounded-xl border border-mirror-purple shadow-glow-purple z-50 flex flex-col"
          >
            <div className="p-4 border-b border-mirror-border flex items-center justify-between">
              <h3 className="font-display font-bold">Chat with Mirror</h3>
              <button onClick={() => setShowChat(false)} className="text-mirror-text-dim hover:text-mirror-text">
                ✕
              </button>
            </div>
            <div className="flex-1 p-4 overflow-y-auto">
              <p className="text-mirror-text-dim text-center">Coming soon...</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Dashboard;