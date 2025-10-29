import { Upload } from 'lucide-react';
import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, AlertTriangle, CheckCircle, Copy, Sparkles } from 'lucide-react';
import { analyzeMessage, AnalysisResult } from '../lib/openai';
import { debounce } from 'lodash';

interface Props {
  mode: 'analyze' | 'upload';
}

const AnalyzeSection: React.FC<Props> = ({ mode }) => {
  const [message, setMessage] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState('');
  const [liveHint, setLiveHint] = useState('');

  // Live feedback as user types (debounced)
  const analyzeLive = useCallback(
    debounce(async (text: string) => {
      if (text.length < 20) {
        setLiveHint('');
        return;
      }

      // Quick pattern detection (no API call for live hints)
      if (text.toLowerCase().includes('per my last')) {
        setLiveHint('⚠️ "Per my last..." can sound defensive');
      } else if (text.toLowerCase().includes('just following up')) {
        setLiveHint('⚠️ This phrase might sound pushy');
      } else if (text.toLowerCase().includes('actually')) {
        setLiveHint('⚠️ "Actually" can dismiss others');
      } else if (text.split(' ').length > 100) {
        setLiveHint('💡 Message is quite long - consider simplifying');
      } else {
        setLiveHint('');
      }
    }, 500),
    []
  );

  useEffect(() => {
    analyzeLive(message);
  }, [message, analyzeLive]);

  const handleAnalyze = async () => {
    if (!message.trim()) {
      setError('Please enter a message to analyze');
      return;
    }

    if (message.trim().length < 10) {
      setError('Message is too short for meaningful analysis');
      return;
    }

    setIsAnalyzing(true);
    setError('');
    setResult(null);

    try {
      const analysis = await analyzeMessage(message);
      setResult(analysis);
    } catch (err: any) {
      setError(err.message || 'Failed to analyze. Please try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const getRiskColor = (score: number) => {
    if (score >= 70) return 'text-mirror-red';
    if (score >= 40) return 'text-yellow-500';
    return 'text-mirror-cyan';
  };

  const getRiskLevel = (score: number) => {
    if (score >= 70) return '🔴 HIGH RISK';
    if (score >= 40) return '🟡 MEDIUM RISK';
    return '🟢 LOW RISK';
  };

  if (mode === 'upload') {
    return (
      <div className="glass rounded-xl p-8 text-center">
        <Upload className="w-16 h-16 text-mirror-purple mx-auto mb-4" />
        <h3 className="text-xl font-display font-bold mb-2">File Upload</h3>
        <p className="text-mirror-text-dim mb-4">
          Coming in next update! For now, use Type or Paste.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Input Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass rounded-xl p-6"
      >
        <h2 className="text-2xl font-display font-bold mb-4">
          Analyze Your Message
        </h2>
        <p className="text-mirror-text-dim mb-6">
          Paste any message, email, or text. Mirror will analyze how it'll be perceived.
        </p>

        <div className="relative">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Hey, just following up on my last email. Per my previous message, I need this done ASAP. Let me know..."
            className="w-full h-48 bg-mirror-panel border border-mirror-border rounded-lg p-4 text-mirror-text focus:border-mirror-purple focus:outline-none focus:ring-2 focus:ring-mirror-purple focus:ring-opacity-20 transition-all resize-none"
          />
          
          {/* Live Hint */}
          <AnimatePresence>
            {liveHint && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute -top-3 left-4 px-3 py-1 bg-mirror-panel border border-yellow-500 rounded-lg text-sm text-yellow-500"
              >
                {liveHint}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="flex items-center justify-between mt-4">
          <p className="text-sm text-mirror-text-dim">
            {message.length} characters
          </p>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleAnalyze}
            disabled={isAnalyzing || message.length < 10}
            className="px-8 py-3 bg-gradient-to-r from-mirror-purple to-mirror-cyan rounded-lg font-semibold shadow-glow-purple disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {isAnalyzing ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Analyzing...
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5" />
                Analyze with Mirror
              </>
            )}
          </motion.button>
        </div>

        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-4 p-4 bg-mirror-red bg-opacity-10 border border-mirror-red rounded-lg flex items-center gap-3"
          >
            <AlertTriangle className="w-5 h-5 text-mirror-red flex-shrink-0" />
            <p className="text-sm text-mirror-red">{error}</p>
          </motion.div>
        )}
      </motion.div>

      {/* Results Section */}
      <AnimatePresence>
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            {/* "Before You Send" Risk Prediction */}
            <div className="glass rounded-xl p-6 border-2 border-mirror-red">
              <h3 className="text-xl font-display font-bold mb-4 flex items-center gap-2">
                <AlertTriangle className="w-6 h-6 text-mirror-red" />
                Before You Send This Message
              </h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3">Predicted Outcomes:</h4>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <span className="text-2xl">{result.predictedOutcome.responseChance}%</span>
                      <div className="flex-1">
                        <p className="text-sm text-mirror-text-dim">Chance they'll respond positively</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-2xl">⏱️</span>
                      <div className="flex-1">
                        <p className="text-sm">Response time: {result.predictedOutcome.responseTime}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-2xl">{result.predictedOutcome.relationshipImpact > 0 ? '📈' : '📉'}</span>
                      <div className="flex-1">
                        <p className="text-sm">Relationship impact: {result.predictedOutcome.relationshipImpact > 0 ? '+' : ''}{result.predictedOutcome.relationshipImpact} points</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-3">Emotional Impact:</h4>
                  <p className="text-mirror-text-dim">{result.predictedOutcome.emotionalImpact}</p>
                  
                  <div className="mt-4">
                    <h4 className="font-semibold mb-2">Risk Level:</h4>
                    <p className={`text-2xl font-bold ${getRiskColor(result.riskScore)}`}>
                      {getRiskLevel(result.riskScore)}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Analysis */}
            <div className="glass rounded-xl p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-xl font-display font-bold mb-2">{result.mainInsight}</h3>
                  <p className="text-mirror-text-dim">Confidence: {result.confidence}%</p>
                </div>
                <div className="px-4 py-2 rounded-lg bg-mirror-panel border border-mirror-purple">
                  <p className="text-sm font-mono">Tone: {result.tone}</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">How This Will Be Perceived:</h4>
                  <p className="text-mirror-text-dim">{result.perception}</p>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Evidence:</h4>
                  <ul className="space-y-2">
                    {result.evidence.map((item, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-start gap-3 p-3 bg-mirror-panel rounded-lg"
                      >
                        <span className="text-mirror-red">•</span>
                        <span className="flex-1 text-sm">{item}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Better Version */}
            <div className="glass rounded-xl p-6 border-2 border-mirror-cyan">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-display font-bold flex items-center gap-2">
                  <CheckCircle className="w-6 h-6 text-mirror-cyan" />
                  Better Alternative
                </h3>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => copyToClipboard(result.betterVersion)}
                  className="p-2 rounded-lg bg-mirror-panel border border-mirror-cyan hover:bg-mirror-cyan hover:text-mirror-bg transition-all"
                >
                  <Copy className="w-4 h-4" />
                </motion.button>
              </div>
              
              <p className="text-lg mb-4 p-4 bg-mirror-panel rounded-lg border border-mirror-cyan">
                {result.betterVersion}
              </p>

              <div className="flex gap-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setMessage(result.betterVersion)}
                  className="flex-1 py-3 px-6 bg-gradient-to-r from-mirror-cyan to-mirror-purple rounded-lg font-semibold"
                >
                  Use This Version
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    setResult(null);
                    setMessage('');
                  }}
                  className="py-3 px-6 glass border border-mirror-border rounded-lg font-semibold hover:border-mirror-purple"
                >
                  Try Again
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AnalyzeSection;