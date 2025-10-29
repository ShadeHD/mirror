import React from 'react';
import { motion } from 'framer-motion';
import { Eye, Zap, Shield, Brain } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Landing: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-mirror-bg relative overflow-hidden">
      {/* Animated background orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 left-20 w-96 h-96 bg-mirror-purple rounded-full opacity-20 blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-20 right-20 w-96 h-96 bg-mirror-cyan rounded-full opacity-20 blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            x: [0, -50, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Header */}
        <header className="container mx-auto px-6 py-8">
          <nav className="flex justify-between items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-2"
            >
              <Eye className="w-8 h-8 text-mirror-purple" />
              <span className="text-2xl font-display font-bold bg-gradient-to-r from-mirror-purple to-mirror-cyan bg-clip-text text-transparent">
                MIRROR
              </span>
            </motion.div>
            <motion.button
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/login')}
              className="px-6 py-2 bg-mirror-panel border border-mirror-purple rounded-lg text-mirror-purple hover:bg-mirror-purple hover:text-white transition-all"
            >
              Sign In
            </motion.button>
          </nav>
        </header>

        {/* Hero Section */}
        <section className="container mx-auto px-6 py-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h1 className="text-6xl md:text-7xl font-display font-bold mb-6 leading-tight">
              See Yourself Through
              <br />
              <span className="bg-gradient-to-r from-mirror-purple via-mirror-cyan to-mirror-purple bg-clip-text text-transparent animate-glow">
                Other's Eyes
              </span>
            </h1>
            <p className="text-xl text-mirror-text-dim max-w-2xl mx-auto mb-12">
              Unlock the hidden patterns in your communication. 
              Mirror reveals how you're truly perceived, with AI-powered insights 
              that transform how you connect.
            </p>
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(108, 99, 255, 0.5)' }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/signup')}
              className="px-12 py-4 bg-gradient-to-r from-mirror-purple to-mirror-cyan rounded-lg text-lg font-semibold hover:shadow-glow-purple transition-all"
            >
              Begin Your Journey
            </motion.button>
          </motion.div>

          {/* Feature Cards */}
          <div className="grid md:grid-cols-3 gap-8 mt-24">
            {[
              {
                icon: Brain,
                title: 'Perception Engine',
                description: 'AI analyzes how your messages land before you hit send',
                color: 'purple'
              },
              {
                icon: Zap,
                title: 'Real-Time Insights',
                description: 'Get instant feedback with confidence scores and evidence',
                color: 'cyan'
              },
              {
                icon: Shield,
                title: 'Privacy First',
                description: 'Your data stays encrypted. We analyze, never store raw messages',
                color: 'red'
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                whileHover={{ y: -10, transition: { duration: 0.2 } }}
                className="glass rounded-xl p-8 hover:border-mirror-purple transition-all"
              >
                <feature.icon className={`w-12 h-12 text-mirror-${feature.color} mb-4 mx-auto`} />
                <h3 className="text-xl font-display font-semibold mb-3">{feature.title}</h3>
                <p className="text-mirror-text-dim">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* How it works */}
        <section className="container mx-auto px-6 py-20">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-display font-bold mb-4">
              How Mirror Works
            </h2>
            <p className="text-mirror-text-dim text-lg">
              Three steps to transform your communication
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-12">
            {[
              {
                step: '01',
                title: 'Connect',
                description: 'Paste any message, email, or conversation you want analyzed'
              },
              {
                step: '02',
                title: 'Analyze',
                description: 'Our AI examines tone, patterns, and perception in seconds'
              },
              {
                step: '03',
                title: 'Improve',
                description: 'Get specific insights and chat with Mirror about what to change'
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="relative"
              >
                <div className="text-6xl font-display font-bold text-mirror-purple opacity-20 mb-4">
                  {item.step}
                </div>
                <h3 className="text-2xl font-display font-semibold mb-3">{item.title}</h3>
                <p className="text-mirror-text-dim">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="container mx-auto px-6 py-20 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="glass rounded-2xl p-12"
          >
            <h2 className="text-4xl font-display font-bold mb-6">
              Ready to see the truth?
            </h2>
            <p className="text-xl text-mirror-text-dim mb-8 max-w-2xl mx-auto">
              Join thousands discovering how they're really perceived. 
              Start your journey to better communication today.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/signup')}
              className="px-12 py-4 bg-gradient-to-r from-mirror-purple to-mirror-cyan rounded-lg text-lg font-semibold shadow-glow-purple"
            >
              Get Started Free
            </motion.button>
          </motion.div>
        </section>

        {/* Footer */}
        <footer className="container mx-auto px-6 py-8 text-center text-mirror-text-dim border-t border-mirror-border">
          <p>© 2025 Mirror. See yourself clearly.</p>
        </footer>
      </div>
    </div>
  );
};

export default Landing;