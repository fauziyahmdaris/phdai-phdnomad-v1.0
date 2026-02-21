import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, Download, BookOpen, Clock, Award, Volume2, VolumeX, SkipForward, SkipBack, CheckCircle, Circle, Headphones } from 'lucide-react';
import OwlIcon from '@/components/icons/OwlIcon';
import { microlearningModules } from '../data/microlearningContent';
import { Module, Topic, LearningBite, UserProgress, LearningMode } from '../types/microlearning';

const Microlearning: React.FC = () => {
  const [selectedModule, setSelectedModule] = useState<Module | null>(null);
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);
  const [selectedBite, setSelectedBite] = useState<LearningBite | null>(null);
  const [learningMode, setLearningMode] = useState<LearningMode>({
    type: 'text',
    isActive: true,
    preferences: {
      textSize: 'medium',
      autoPlay: false,
      playbackSpeed: 1.0,
      highlightMode: false
    }
  });
  const [userProgress, setUserProgress] = useState<UserProgress[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [userNotes, setUserNotes] = useState('');
  const [showAITools, setShowAITools] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [volume, setVolume] = useState(1);
  const [muted, setMuted] = useState(false);
  const [scrubPercent, setScrubPercent] = useState<number | null>(null);
  const [miniVisible, setMiniVisible] = useState(true);
  const miniTimerRef = useRef<number | null>(null);

  // Ensure modules are explicitly sorted by 'order'
  const sortedModules = React.useMemo(() => {
    return [...microlearningModules].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
  }, []);

  // Initialize with first module (sorted)
  useEffect(() => {
    if (sortedModules.length > 0 && !selectedModule) {
      const first = sortedModules[0];
      setSelectedModule(first);
      if (first.topics.length > 0) {
        setSelectedTopic(first.topics[0]);
        if (first.topics[0].learningBites.length > 0) {
          setSelectedBite(first.topics[0].learningBites[0]);
        }
      }
    }
  }, [sortedModules, selectedModule]);

  // Load persisted audio prefs
  useEffect(() => {
    try {
      const speed = localStorage.getItem('ml_playback_speed');
      const vol = localStorage.getItem('ml_volume');
      const mutedFlag = localStorage.getItem('ml_muted');
      if (speed) {
        const rate = parseFloat(speed);
        setLearningMode(prev => ({ ...prev, preferences: { ...prev.preferences, playbackSpeed: rate || 1.0 } }));
      }
      if (vol) {
        const v = Math.max(0, Math.min(1, parseFloat(vol)));
        setVolume(isNaN(v) ? 1 : v);
      }
      if (mutedFlag) setMuted(mutedFlag === '1');
    } catch { void 0; }
  }, []);

  const markBiteComplete = (biteId: string) => {
    setUserProgress(prev => {
      const existing = prev.find(p => p.learningBiteId === biteId);
      if (existing) {
        return prev.map(p => 
          p.learningBiteId === biteId 
            ? { ...p, status: 'completed', completedAt: new Date() }
            : p
        );
      } else {
        return [...prev, {
          userId: 'current-user',
          learningBiteId: biteId,
          status: 'completed',
          timeSpent: 0,
          notes: '',
          lastAccessed: new Date(),
          completedAt: new Date()
        }];
      }
    });
  };

  const seekBy = (deltaSeconds: number) => {
    const audio = audioRef.current;
    if (!audio || !duration) return;
    const target = Math.max(0, Math.min(duration, (audio.currentTime || 0) + deltaSeconds));
    audio.currentTime = target;
    setCurrentTime(target);
  };

  const toggleMute = () => setMuted(m => !m);

  const formatTime = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const getBiteProgress = (biteId: string): 'not_started' | 'started' | 'completed' => {
    const progress = userProgress.find(p => p.learningBiteId === biteId);
    return progress?.status || 'not_started';
  };

  const getModuleProgress = (moduleId: string): number => {
    const module = microlearningModules.find(m => m.id === moduleId);
    if (!module) return 0;
    
    const totalBites = module.topics.reduce((acc, topic) => acc + topic.learningBites.length, 0);
    const completedBites = module.topics.reduce((acc, topic) => {
      return acc + topic.learningBites.filter(bite => getBiteProgress(bite.id) === 'completed').length;
    }, 0);
    
    return totalBites > 0 ? Math.round((completedBites / totalBites) * 100) : 0;
  };

  const handleAIToolClick = (tool: string, activity: string) => {
    // Simulate AI tool interaction
    alert(`Opening ${tool}: ${activity}`);
  };

  const simulateAudioGeneration = async (text: string): Promise<string> => {
    // Simulate TTS API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    return `data:audio/mp3;base64,${btoa(text.substring(0, 100))}`;
  };

  const togglePlayPause = async () => {
    if (learningMode.type !== 'podcast' || !selectedBite) return;
    if (!selectedBite.audioUrl) {
      const audioUrl = await simulateAudioGeneration(selectedBite.content);
      selectedBite.audioUrl = audioUrl;
    }
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      await audio.play();
      setIsPlaying(true);
      setMiniVisible(true);
    } else {
      audio.pause();
      setIsPlaying(false);
      setMiniVisible(false);
    }
  };

  // Setup audio element when bite or mode changes
  useEffect(() => {
    if (learningMode.type !== 'podcast' || !selectedBite) return;
    let disposed = false;
    const init = async () => {
      if (!selectedBite.audioUrl) {
        const audioUrl = await simulateAudioGeneration(selectedBite.content);
        if (disposed) return;
        selectedBite.audioUrl = audioUrl;
      }
      const audio = audioRef.current;
      if (!audio) return;
      audio.src = selectedBite.audioUrl!;
      audio.load();
      audio.playbackRate = learningMode.preferences.playbackSpeed || 1.0;
      audio.onloadedmetadata = () => setDuration(audio.duration || 0);
      audio.ontimeupdate = () => setCurrentTime(audio.currentTime || 0);
      audio.onended = () => setIsPlaying(false);
      setIsPlaying(false);
      setCurrentTime(0);
    };
    init();
    return () => {
      disposed = true;
      const audio = audioRef.current;
      if (audio) {
        audio.pause();
      }
    };
  }, [learningMode.type, selectedBite]);

  // Keep audio playback rate in sync with preferences
  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.playbackRate = learningMode.preferences.playbackSpeed || 1.0;
    }
    try { localStorage.setItem('ml_playback_speed', String(learningMode.preferences.playbackSpeed || 1)); } catch { void 0; }
  }, [learningMode.preferences.playbackSpeed]);

  // Sync volume & mute state to audio element
  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.volume = volume;
      audio.muted = muted;
    }
    try {
      localStorage.setItem('ml_volume', String(volume));
      localStorage.setItem('ml_muted', muted ? '1' : '0');
    } catch { void 0; }
  }, [volume, muted]);

  // Mini-player auto-hide when playing after a few seconds of inactivity
  useEffect(() => {
    if (learningMode.type !== 'podcast') { setMiniVisible(false); return; }
    if (!isPlaying) { setMiniVisible(false); return; }
    setMiniVisible(true);
    if (miniTimerRef.current) window.clearTimeout(miniTimerRef.current);
    miniTimerRef.current = window.setTimeout(() => setMiniVisible(false), 4000);
    return () => { if (miniTimerRef.current) window.clearTimeout(miniTimerRef.current); };
  }, [learningMode.type, isPlaying, currentTime]);

  const pingMini = () => {
    setMiniVisible(true);
    if (miniTimerRef.current) window.clearTimeout(miniTimerRef.current);
    miniTimerRef.current = window.setTimeout(() => setMiniVisible(false), 4000);
  };

  const handleSeek = (percent: number) => {
    if (!duration) return;
    const target = (percent / 100) * duration;
    const audio = audioRef.current;
    if (audio) {
      audio.currentTime = target;
    }
    setCurrentTime(target);
  };

  const setSpeed = (rate: number) => {
    setLearningMode(prev => ({
      ...prev,
      preferences: { ...prev.preferences, playbackSpeed: rate }
    }));
    const audio = audioRef.current;
    if (audio) audio.playbackRate = rate;
  };

  // Keyboard shortcuts: space (play/pause), arrows (prev/next), +/- (speed)
  useEffect(() => {
    const speeds = [0.75, 1, 1.25, 1.5];
    const onKey = (e: KeyboardEvent) => {
      // avoid when typing in inputs/textarea
      const tag = (e.target as HTMLElement)?.tagName?.toLowerCase();
      if (tag === 'input' || tag === 'textarea') return;
      if (learningMode.type !== 'podcast') return;
      if (e.key === ' ') {
        e.preventDefault();
        togglePlayPause();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        nextBite();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        previousBite();
      } else if (e.key === '+' || e.key === '=') {
        e.preventDefault();
        const cur = learningMode.preferences.playbackSpeed || 1;
        const idx = speeds.findIndex(s => s === cur);
        const next = speeds[Math.min(speeds.length - 1, Math.max(0, idx + 1))];
        setSpeed(next);
      } else if (e.key === '-') {
        e.preventDefault();
        const cur = learningMode.preferences.playbackSpeed || 1;
        const idx = speeds.findIndex(s => s === cur);
        const prev = speeds[Math.max(0, idx - 1)];
        setSpeed(prev);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [learningMode.type, learningMode.preferences.playbackSpeed, selectedBite]);

  const nextBite = () => {
    if (!selectedTopic || !selectedBite) return;
    
    const currentIndex = selectedTopic.learningBites.findIndex(b => b.id === selectedBite.id);
    if (currentIndex < selectedTopic.learningBites.length - 1) {
      setSelectedBite(selectedTopic.learningBites[currentIndex + 1]);
    } else {
      // Move to next topic
      if (selectedModule) {
        const topicIndex = selectedModule.topics.findIndex(t => t.id === selectedTopic.id);
        if (topicIndex < selectedModule.topics.length - 1) {
          const nextTopic = selectedModule.topics[topicIndex + 1];
          setSelectedTopic(nextTopic);
          setSelectedBite(nextTopic.learningBites[0]);
        }
      }
    }
  };

  const previousBite = () => {
    if (!selectedTopic || !selectedBite) return;
    
    const currentIndex = selectedTopic.learningBites.findIndex(b => b.id === selectedBite.id);
    if (currentIndex > 0) {
      setSelectedBite(selectedTopic.learningBites[currentIndex - 1]);
    } else {
      // Move to previous topic
      if (selectedModule) {
        const topicIndex = selectedModule.topics.findIndex(t => t.id === selectedTopic.id);
        if (topicIndex > 0) {
          const prevTopic = selectedModule.topics[topicIndex - 1];
          setSelectedTopic(prevTopic);
          setSelectedBite(prevTopic.learningBites[prevTopic.learningBites.length - 1]);
        }
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 via-blue-600 to-green-600 p-6 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 bg-white/20 rounded-lg">
              <OwlIcon size={24} />
            </div>
            <div>
              <h1 className="text-2xl font-bold">🎓 AI-Powered Microlearning Platform</h1>
              <p className="text-purple-100">
                Thesis Writing Mastery: Literature Review & Chapter 1
              </p>
            </div>
          </div>
          
          <div className="bg-white/10 rounded-lg p-4">
            <h3 className="font-semibold mb-2">🚀 Adaptive Learning Experience</h3>
            <p className="text-sm text-purple-100">
              Experience personalized, bite-sized learning with AI-powered tools, multiple learning modes, 
              and progress tracking designed specifically for postgraduate students.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar - Module & Topic Navigation */}
          <div className="lg:col-span-1 space-y-4">
            {/* Learning Mode Selector */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-gray-700">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Learning Mode</h3>
              <div className="space-y-2">
                {[
                  { type: 'text', icon: BookOpen, label: 'Text Mode' },
                  { type: 'podcast', icon: Headphones, label: 'Podcast Mode' },
                  { type: 'offline', icon: Download, label: 'Offline Mode' }
                ].map((mode) => (
                  <button
                    key={mode.type}
                    onClick={() => setLearningMode(prev => ({ ...prev, type: mode.type as any }))}
                    className={`w-full flex items-center space-x-2 p-2 rounded-lg transition-colors ${
                      learningMode.type === mode.type
                        ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300'
                        : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
                    }`}
                  >
                    <mode.icon size={16} />
                    <span className="text-sm">{mode.label}</span>
                  </button>
                ))}
              </div>
              <div className="mt-3">
                <a
                  href="/downloads/module1-templates.zip"
                  download
                  className="w-full inline-flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-sm bg-purple-600 text-white hover:bg-purple-700"
                >
                  <Download size={14} /> Download All Module 1 Templates (ZIP)
                </a>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">If the ZIP is missing, run: <code>npm run bundle:module1</code></p>
              </div>
            </div>

            {/* Downloads */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-gray-700">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Downloads</h3>
              <div className="space-y-2">
                <a
                  href="/downloads/lr-matrix-template.csv"
                  download
                  className="w-full inline-flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-sm bg-indigo-600 text-white hover:bg-indigo-700"
                >
                  <Download size={14} /> LR Matrix Template (CSV)
                </a>
                <a
                  href="/downloads/module1-offline.md"
                  download
                  className="w-full inline-flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-sm border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  <Download size={14} /> Module 1 Offline Pack (MD)
                </a>
                <a
                  href="/downloads/module1-checklist.docx"
                  download
                  className="w-full inline-flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-sm border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  <Download size={14} /> Module 1 Checklist (DOCX)
                </a>
                <a
                  href="/downloads/module1-checklist.pdf"
                  download
                  className="w-full inline-flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-sm border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  <Download size={14} /> Module 1 Checklist (PDF)
                </a>
                <a
                  href="/downloads/annotation-rubric.docx"
                  download
                  className="w-full inline-flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-sm border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  <Download size={14} /> Annotation Rubric (DOCX)
                </a>
                <a
                  href="/downloads/annotation-rubric.pdf"
                  download
                  className="w-full inline-flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-sm border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  <Download size={14} /> Annotation Rubric (PDF)
                </a>
                <a
                  href="/downloads/critical-appraisal-checklist.docx"
                  download
                  className="w-full inline-flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-sm border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  <Download size={14} /> Critical Appraisal Checklist (DOCX)
                </a>
                <a
                  href="/downloads/critical-appraisal-checklist.pdf"
                  download
                  className="w-full inline-flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-sm border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  <Download size={14} /> Critical Appraisal Checklist (PDF)
                </a>
                <a
                  href="/downloads/lr-screening-sheet.csv"
                  download
                  className="w-full inline-flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-sm border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  <Download size={14} /> Literature Screening Sheet (CSV)
                </a>
                <a
                  href="/downloads/search-strategy-log.csv"
                  download
                  className="w-full inline-flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-sm border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  <Download size={14} /> Search Strategy Log (CSV)
                </a>
                <a
                  href="/downloads/prisma-flow.pdf"
                  download
                  className="w-full inline-flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-sm border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  <Download size={14} /> PRISMA Flow (PDF)
                </a>
                <a
                  href="/downloads/prisma-flow.svg"
                  download
                  className="w-full inline-flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-sm border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  <Download size={14} /> PRISMA Flow (SVG)
                </a>
                <a
                  href="/downloads/synthesis-matrix.csv"
                  download
                  className="w-full inline-flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-sm border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  <Download size={14} /> Synthesis Matrix (CSV)
                </a>
                <a
                  href="/downloads/bias-appraisal.pdf"
                  download
                  className="w-full inline-flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-sm border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  <Download size={14} /> Bias Appraisal (PDF)
                </a>
                <a
                  href="/downloads/bias-appraisal.docx"
                  download
                  className="w-full inline-flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-sm border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  <Download size={14} /> Bias Appraisal (DOCX)
                </a>
                <a
                  href="/downloads/data-extraction.csv"
                  download
                  className="w-full inline-flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-sm border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  <Download size={14} /> Data Extraction Sheet (CSV)
                </a>
              </div>
            </div>

            {/* Module Navigation */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-gray-700">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Modules</h3>
              <div className="space-y-2">
                {sortedModules.map((module) => (
                  <div key={module.id}>
                    <button
                      onClick={() => {
                        setSelectedModule(module);
                        setSelectedTopic(module.topics[0]);
                        setSelectedBite(module.topics[0].learningBites[0]);
                      }}
                      className={`w-full text-left p-3 rounded-lg transition-colors ${
                        selectedModule?.id === module.id
                          ? 'bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300'
                          : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-sm">{module.title}</span>
                        <span className="text-xs bg-gray-200 dark:bg-gray-600 px-2 py-1 rounded">
                          {getModuleProgress(module.id)}%
                        </span>
                      </div>

                {/* Sticky Mini Player for mobile/tablet */}
                {learningMode.type === 'podcast' && (
                  <div className="fixed md:hidden bottom-4 left-4 right-4 z-40 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-3">
                    <div className="flex items-center gap-2">
                      <button onClick={() => seekBy(-10)} className="p-2 rounded bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600">
                        <SkipBack size={16} />
                      </button>
                      <button onClick={togglePlayPause} className="p-2 rounded bg-blue-600 text-white hover:bg-blue-700">
                        {isPlaying ? <Pause size={18} /> : <Play size={18} />}
                      </button>
                      <button onClick={() => seekBy(10)} className="p-2 rounded bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600">
                        <SkipForward size={16} />
                      </button>
                      <div className="flex-1 flex items-center gap-2">
                        <input
                          type="range"
                          min={0}
                          max={100}
                          step={0.5}
                          value={duration > 0 ? (currentTime / duration) * 100 : 0}
                          onChange={(e) => handleSeek(parseFloat(e.target.value))}
                          className="flex-1 h-2 bg-gray-200 dark:bg-gray-600 rounded-lg appearance-none cursor-pointer"
                        />
                        <span className="text-xs text-gray-600 dark:text-gray-300 whitespace-nowrap">
                          {Math.floor(currentTime / 60)}:{(currentTime % 60).toString().padStart(2,'0')}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
                      <div className="flex items-center space-x-2 mt-1">
                        <Clock size={12} className="text-gray-400" />
                        <span className="text-xs text-gray-500">{module.totalDuration} mins</span>
                        <span className="text-lg">{module.completionBadge}</span>
                      </div>
                    </button>

                    {/* Topics */}
                    {selectedModule?.id === module.id && (
                      <div className="ml-4 mt-2 space-y-1">
                        {module.topics.map((topic) => (
                          <button
                            key={topic.id}
                            onClick={() => {
                              setSelectedTopic(topic);
                              setSelectedBite(topic.learningBites[0]);
                            }}
                            className={`w-full text-left p-2 rounded text-sm transition-colors ${
                              selectedTopic?.id === topic.id
                                ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300'
                                : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400'
                            }`}
                          >
                            {topic.title}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Progress Overview */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-gray-700">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Your Progress</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Overall</span>
                  <span className="text-sm font-medium">
                    {Math.round(microlearningModules.reduce((acc, m) => acc + getModuleProgress(m.id), 0) / microlearningModules.length)}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full transition-all duration-300"
                    style={{ 
                      width: `${Math.round(microlearningModules.reduce((acc, m) => acc + getModuleProgress(m.id), 0) / microlearningModules.length)}%` 
                    }}
                  ></div>
                </div>
                <div className="flex items-center space-x-2">
                  <Award className="text-yellow-500" size={16} />
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {userProgress.filter(p => p.status === 'completed').length} bites completed
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-3">
            {selectedBite ? (
              <div className="space-y-6">
                {/* Learning Bite Header */}
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                        {selectedBite.title}
                      </h2>
                      <p className="text-gray-600 dark:text-gray-400">
                        {selectedTopic?.title} • {selectedBite.duration} min read
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => markBiteComplete(selectedBite.id)}
                        className={`p-2 rounded-lg transition-colors ${
                          getBiteProgress(selectedBite.id) === 'completed'
                            ? 'bg-green-100 text-green-600'
                            : 'bg-gray-100 text-gray-400 hover:bg-green-100 hover:text-green-600'
                        }`}
                      >
                        {getBiteProgress(selectedBite.id) === 'completed' ? (
                          <CheckCircle size={20} />
                        ) : (
                          <Circle size={20} />
                        )}
                      </button>
                      {selectedBite.isDownloadable && (
                        <button className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors">
                          <Download size={20} />
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Audio Controls for Podcast Mode */}
                  {learningMode.type === 'podcast' && (
                    <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mb-4 hidden md:block">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <button
                            onClick={previousBite}
                            className="p-2 bg-white dark:bg-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-500 transition-colors"
                          >
                            <SkipBack size={16} />
                          </button>
                          <button
                            onClick={() => seekBy(-10)}
                            className="px-3 py-2 bg-white dark:bg-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-500 text-xs"
                          >-10s</button>
                          <button
                            onClick={togglePlayPause}
                            className="p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                          >
                            {isPlaying ? <Pause size={20} /> : <Play size={20} />}
                          </button>
                          <button
                            onClick={() => seekBy(10)}
                            className="px-3 py-2 bg-white dark:bg-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-500 text-xs"
                          >+10s</button>
                          <button
                            onClick={nextBite}
                            className="p-2 bg-white dark:bg-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-500 transition-colors"
                          >
                            <SkipForward size={16} />
                          </button>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Volume2 size={16} className="text-gray-400" />
                          <span className="text-sm text-gray-600 dark:text-gray-400">
                            {Math.floor(currentTime / 60)}:{(currentTime % 60).toString().padStart(2, '0')} / 
                            {Math.floor(duration / 60)}:{(duration % 60).toString().padStart(2, '0')} 
                            <span className="ml-2 text-xs text-gray-500 dark:text-gray-300">(-{Math.max(0, Math.floor((duration-currentTime)/60))}:{Math.max(0, Math.floor((duration-currentTime)%60)).toString().padStart(2,'0')})</span>
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <input
                          type="range"
                          min={0}
                          max={100}
                          step={0.1}
                          value={scrubPercent ?? (duration > 0 ? (currentTime / duration) * 100 : 0)}
                          onChange={(e) => setScrubPercent(parseFloat(e.target.value))}
                          onMouseUp={() => { if (scrubPercent !== null) { handleSeek(scrubPercent); setScrubPercent(null);} }}
                          onTouchEnd={() => { if (scrubPercent !== null) { handleSeek(scrubPercent); setScrubPercent(null);} }}
                          className="flex-1 h-2 bg-gray-200 dark:bg-gray-600 rounded-lg appearance-none cursor-pointer"
                        />
                        {scrubPercent !== null && (
                          <span className="text-xs text-gray-600 dark:text-gray-300 whitespace-nowrap">
                            Seeking to {formatTime((scrubPercent/100) * (duration || 0))}
                          </span>
                        )}
                        <div className="flex items-center gap-1 text-xs text-gray-600 dark:text-gray-300">
                          <button
                            onClick={() => setSpeed(0.75)}
                            className={`px-2 py-1 rounded ${learningMode.preferences.playbackSpeed === 0.75 ? 'bg-blue-600 text-white' : 'bg-white dark:bg-gray-600'}`}
                          >0.75x</button>
                          <button
                            onClick={() => setSpeed(1)}
                            className={`px-2 py-1 rounded ${learningMode.preferences.playbackSpeed === 1 ? 'bg-blue-600 text-white' : 'bg-white dark:bg-gray-600'}`}
                          >1x</button>
                          <button
                            onClick={() => setSpeed(1.25)}
                            className={`px-2 py-1 rounded ${learningMode.preferences.playbackSpeed === 1.25 ? 'bg-blue-600 text-white' : 'bg-white dark:bg-gray-600'}`}
                          >1.25x</button>
                          <button
                            onClick={() => setSpeed(1.5)}
                            className={`px-2 py-1 rounded ${learningMode.preferences.playbackSpeed === 1.5 ? 'bg-blue-600 text-white' : 'bg-white dark:bg-gray-600'}`}
                          >1.5x</button>
                        </div>
                      </div>
                      <div className="mt-3 flex items-center gap-2">
                        <button onClick={toggleMute} className="p-2 rounded bg-white dark:bg-gray-600 hover:bg-gray-100 dark:hover:bg-gray-500">
                          {muted || volume === 0 ? <VolumeX size={16} /> : <Volume2 size={16} />}
                        </button>
                        <input
                          type="range"
                          min={0}
                          max={100}
                          step={1}
                          value={Math.round((muted ? 0 : volume) * 100)}
                          onChange={(e) => { const v = Math.max(0, Math.min(100, parseInt(e.target.value))); setVolume(v/100); if (v>0) setMuted(false); }}
                          className="w-40 h-2 bg-gray-200 dark:bg-gray-600 rounded-lg appearance-none cursor-pointer"
                        />
                        <span className="text-xs text-gray-600 dark:text-gray-300 w-8 text-right">{Math.round((muted ? 0 : volume)*100)}%</span>
                      </div>
                      <audio ref={audioRef} hidden />
                    </div>
                  )}
                </div>

                {/* Learning Content */}
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                  {learningMode.type === 'offline' && (
                    <div className="mb-4 p-3 rounded-lg bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-800 flex items-center justify-between">
                      <div className="text-sm text-indigo-900 dark:text-indigo-100">
                        Offline mode selected. Download the template and offline pack to continue your learning without internet.
                      </div>
                      <div className="flex items-center gap-2">
                        <a href="/downloads/lr-matrix-template.csv" download className="px-3 py-1.5 rounded bg-indigo-600 text-white text-xs hover:bg-indigo-700 inline-flex items-center gap-1">
                          <Download size={12} /> Template
                        </a>
                        <a href="/downloads/module1-offline.md" download className="px-3 py-1.5 rounded border border-indigo-300 text-indigo-800 dark:text-indigo-200 text-xs hover:bg-indigo-50 dark:hover:bg-indigo-900/30 inline-flex items-center gap-1">
                          <Download size={12} /> Offline Pack
                        </a>
                        <a href="/downloads/module1-checklist.docx" download className="px-3 py-1.5 rounded border border-indigo-300 text-indigo-800 dark:text-indigo-200 text-xs hover:bg-indigo-50 dark:hover:bg-indigo-900/30 inline-flex items-center gap-1">
                          <Download size={12} /> DOCX
                        </a>
                        <a href="/downloads/module1-checklist.pdf" download className="px-3 py-1.5 rounded border border-indigo-300 text-indigo-800 dark:text-indigo-200 text-xs hover:bg-indigo-50 dark:hover:bg-indigo-900/30 inline-flex items-center gap-1">
                          <Download size={12} /> PDF
                        </a>
                      </div>
                    </div>
                  )}
                  <div className={`prose prose-gray dark:prose-invert max-w-none ${
                    learningMode.preferences.textSize === 'small' ? 'text-sm' :
                    learningMode.preferences.textSize === 'large' ? 'text-lg' : 'text-base'
                  }`}>
                    <div className="whitespace-pre-wrap leading-relaxed">
                      {selectedBite.content}
                    </div>
                  </div>

                  {/* Keywords */}
                  <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <h4 className="font-medium text-gray-900 dark:text-white mb-2">Key Concepts:</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedBite.keywords.map((keyword, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-xs"
                        >
                          {keyword}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* AI Integration Tools */}
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      🤖 AI Learning Tools
                    </h3>
                    <button
                      onClick={() => setShowAITools(!showAITools)}
                      className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                    >
                      {showAITools ? 'Hide Tools' : 'Show Tools'}
                    </button>
                  </div>

                  {showAITools && (
                    <div className="space-y-4">
                      {/* AI Prompts */}
                      {selectedBite.aiIntegration.prompts.length > 0 && (
                        <div>
                          <h4 className="font-medium text-gray-900 dark:text-white mb-2">AI Prompts:</h4>
                          <div className="space-y-2">
                            {selectedBite.aiIntegration.prompts.map((prompt, index) => (
                              <div key={index} className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                                <p className="text-sm text-blue-800 dark:text-blue-200 italic">"{prompt}"</p>
                                <button
                                  onClick={() => handleAIToolClick('AI Chat', prompt)}
                                  className="mt-2 text-xs bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition-colors"
                                >
                                  Ask AI
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* AI Tools */}
                      {selectedBite.aiIntegration.tools.length > 0 && (
                        <div>
                          <h4 className="font-medium text-gray-900 dark:text-white mb-2">AI Tools:</h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {selectedBite.aiIntegration.tools.map((tool, index) => (
                              <button
                                key={index}
                                onClick={() => handleAIToolClick(tool, 'Interactive Tool')}
                                className="p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:border-purple-300 dark:hover:border-purple-600 hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-colors text-left"
                              >
                                <div className="flex items-center space-x-2">
                                  <OwlIcon size={16} />
                                  <span className="text-sm font-medium text-gray-900 dark:text-white">{tool}</span>
                                </div>
                              </button>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* AI Activities */}
                      {selectedBite.aiIntegration.activities.length > 0 && (
                        <div>
                          <h4 className="font-medium text-gray-900 dark:text-white mb-2">Learning Activities:</h4>
                          <div className="space-y-2">
                            {selectedBite.aiIntegration.activities.map((activity, index) => (
                              <div key={index} className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                                <p className="text-sm text-green-800 dark:text-green-200">{activity}</p>
                                <button
                                  onClick={() => handleAIToolClick('Activity', activity)}
                                  className="mt-2 text-xs bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 transition-colors"
                                >
                                  Start Activity
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Notes Section */}
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    📝 Your Notes
                  </h3>
                  <textarea
                    value={userNotes}
                    onChange={(e) => setUserNotes(e.target.value)}
                    placeholder="Add your personal notes and reflections here..."
                    className="w-full h-32 p-4 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white resize-none"
                  />
                  <div className="flex justify-end mt-3">
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">
                      Save Notes
                    </button>
                  </div>
                </div>

                {/* Navigation */}
                <div className="flex justify-between">
                  <button
                    onClick={previousBite}
                    className="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    ← Previous
                  </button>
                  <button
                    onClick={nextBite}
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Next →
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-white dark:bg-gray-800 rounded-xl p-12 shadow-sm border border-gray-200 dark:border-gray-700 text-center">
                <div className="mx-auto mb-4 flex items-center justify-center"><OwlIcon size={48} /></div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  Select a Learning Module
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Choose a module from the sidebar to begin your microlearning journey
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Microlearning;