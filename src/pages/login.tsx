import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Eye, Mail, Lock, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { signIn } from '../lib/supabase';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const { data, error: authError } = await signIn(email, password);

    if (authError) {
      setError(authError.message);
      setLoading(false);
    } else {
      navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-mirror-bg flex items-center justify-center px-6 relative overflow-hidden">
      {/* Background effects */}
      <motion.div
        className="absolute top-0 right-0 w-96 h-96 bg-mirror-purple rounded-full opacity-10 blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass rounded-2xl p-8 w-full max-w-md relative z-10"
      >
        {/* Logo */}
        <div className="flex items-center justify-center gap-2 mb-8">
          <Eye className="w-8 h-8 text-mirror-purple" />
          <span className="text-3xl font-display font-bold bg-gradient-to-r from-mirror-purple to-mirror-cyan bg-clip-text text-transparent">
            MIRROR
          </span>
        </div>

        <h2 className="text-2xl font-display font-bold text-center mb-2">
          Welcome Back
        </h2>
        <p className="text-mirror-text-dim text-center mb-8">
          Continue your journey to better communication
        </p>

        {error && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-mirror-red bg-opacity-10 border border-mirror-red rounded-lg p-4 mb-6 flex items-center gap-3"
          >
            <AlertCircle className="w-5 h-5 text-mirror-red flex-shrink-0" />
            <p className="text-sm text-mirror-red">{error}</p>
          </motion.div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium mb-2">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-mirror-text-dim" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-mirror-panel border border-mirror-border rounded-lg pl-10 pr-4 py-3 text-mirror-text focus:border-mirror-purple focus:outline-none focus:ring-2 focus:ring-mirror-purple focus:ring-opacity-20 transition-all"
                placeholder="your@email.com"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium mb-2">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-mirror-text-dim" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full bg-mirror-panel border border-mirror-border rounded-lg pl-10 pr-4 py-3 text-mirror-text focus:border-mirror-purple focus:outline-none focus:ring-2 focus:ring-mirror-purple focus:ring-opacity-20 transition-all"
                placeholder="••••••••"
              />
            </div>
          </div>

          {/* Submit Button */}
          <motion.button
            type="submit"
            disabled={loading}
            whileHover={{ scale: loading ? 1 : 1.02 }}
            whileTap={{ scale: loading ? 1 : 0.98 }}
            className="w-full bg-gradient-to-r from-mirror-purple to-mirror-cyan rounded-lg py-3 font-semibold shadow-glow-purple disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </motion.button>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-4 my-6">
          <div className="flex-1 h-px bg-mirror-border" />
          <span className="text-sm text-mirror-text-dim">or</span>
          <div className="flex-1 h-px bg-mirror-border" />
        </div>

        {/* Sign Up Link */}
        <p className="text-center text-mirror-text-dim">
          Don't have an account?{' '}
          <button
            onClick={() => navigate('/signup')}
            className="text-mirror-purple hover:text-mirror-cyan transition-colors font-semibold"
          >
            Sign Up
          </button>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;