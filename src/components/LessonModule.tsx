import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useProgress } from '../context/ProgressContext';
import { 
  CheckCircle2, 
  ChevronRight, 
  PlayCircle, 
  FileText, 
  Trophy, 
  Gamepad2, 
  BookOpen, 
  ArrowLeft,
  Menu,
  X,
  ExternalLink,
  MessageSquare,
  Layout,
  AlertCircle,
  Search,
  Library,
  Target,
  GraduationCap
} from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';

interface LessonSection {
  id: string;
  title: string;
  type: 'overview' | 'diagnostic' | 'learn' | 'practice' | 'reflect' | 'references';
  completed: boolean;
}

const LessonModule: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { updateSectionProgress, lessonsProgress } = useProgress();
  const lessonId = parseInt(id || '1');
  
  const [activeSection, setActiveSection] = useState('overview');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  
  // Progress State
  const [sections, setSections] = useState<LessonSection[]>([
    { id: 'overview', title: 'Course Overview', type: 'overview', completed: true },
    { id: 'diagnostic', title: 'What I Know (Diagnostic)', type: 'diagnostic', completed: false },
    { id: 'learn', title: 'Core Strategy: Topic & Main Idea', type: 'learn', completed: false },
    { id: 'practice', title: 'Guided Practice', type: 'practice', completed: false },
    { id: 'reflect', title: 'Reflection & Closure', type: 'reflect', completed: false },
    { id: 'references', title: 'References', type: 'references', completed: false },
  ]);

  const [diagnosticScore, setDiagnosticScore] = useState(0);
  const [diagnosticAnswers, setDiagnosticAnswers] = useState<Record<number, string>>({});
  const [reflectionAnswers, setReflectionAnswers] = useState<Record<number, string>>({});
  const [showTrophy, setShowTrophy] = useState(false);

  const diagnosticItems = [
    { text: 'cat, dog, cow', options: ['animals', 'fruits', 'gadgets'], correct: 'animals' },
    { text: 'paper, pen, crayons', options: ['school supplies', 'PPE', 'gadgets'], correct: 'school supplies' },
    { text: 'Face mask, alcohol, face shield', options: ['PPE', 'animals', 'fruits'], correct: 'PPE' },
    { text: 'laptop, mobile phone, and computer', options: ['gadgets', 'fruits', 'school supplies'], correct: 'gadgets' },
    { text: 'mango, banana, apple', options: ['fruits', 'animals', 'PPE'], correct: 'fruits' }
  ];

  const reflectionItems = [
    'most important thought',
    'is mostly about',
    'person',
    'thing',
    'idea',
    'facts/reasons',
    'examples',
    'interactive activities'
  ];

  const attemptedCount = Object.keys(diagnosticAnswers).length;
  const isDiagnosticPassed = attemptedCount === diagnosticItems.length;
  const reflectionAttemptedCount = reflectionItems.filter((_, i) => (reflectionAnswers[i] || '').trim().length > 0).length;
  const isReflectionComplete = reflectionAttemptedCount === reflectionItems.length;

  // Auto-collapse sidebar on mobile
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) setIsSidebarOpen(false);
      else setIsSidebarOpen(true);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Remove the auto-sync useEffect that was here
  
  // Sync local sections state when global progress changes
  useEffect(() => {
    const currentLesson = lessonsProgress[lessonId];
    if (currentLesson) {
      setSections(prev => prev.map(s => ({
        ...s,
        completed: currentLesson.completedSections.includes(s.id)
      })));
    }
  }, [lessonsProgress, lessonId]);

  useEffect(() => {
    const score = diagnosticItems.reduce((total, item, index) => {
      return total + (diagnosticAnswers[index] === item.correct ? 1 : 0);
    }, 0);
    setDiagnosticScore(score);

    if (Object.keys(diagnosticAnswers).length === diagnosticItems.length) {
      updateSectionProgress(lessonId, 'diagnostic');
    }
  }, [diagnosticAnswers, lessonId, updateSectionProgress]);

  const isSectionUnlocked = (sectionId: string) => {
    const index = sections.findIndex(s => s.id === sectionId);
    if (index === 0) return true; // First section always unlocked
    // Unlocked if previous section is completed
    return sections[index - 1].completed;
  };

  const handleNextSection = (currentId: string, nextId: string) => {
    updateSectionProgress(lessonId, currentId);
    setActiveSection(nextId);
  };

  const renderReflectionInput = (index: number, placeholder: string) => (
    <input
      value={reflectionAnswers[index] || ''}
      onChange={(e) => setReflectionAnswers(prev => ({ ...prev, [index]: e.target.value }))}
      placeholder={placeholder}
      className="px-3 py-1 border-b-2 border-zinc-300 focus:border-um-red outline-none bg-transparent text-zinc-900 min-w-[170px]"
    />
  );

  const gradedSections = sections.filter(s => s.id !== 'references');
  const progressSteps = gradedSections.filter(s => s.completed).length;
  const progressPercent = Math.round((progressSteps / gradedSections.length) * 100);

  if (lessonId > 1) {
    return (
      <div className="flex h-screen bg-zinc-900 items-center justify-center p-6 text-center">
        <div className="max-w-md space-y-6">
           <div className="w-20 h-20 bg-um-gold/10 text-um-gold rounded-full flex items-center justify-center mx-auto mb-8">
              <AlertCircle size={40} />
           </div>
           <h2 className="text-3xl font-bold text-white">Module in Development</h2>
           <p className="text-zinc-400">
             This is a prototype focused on <span className="text-um-gold font-bold">Lesson 1</span>. 
             Interactivity for Lesson {lessonId} is currently under construction as we expand the DigiTeach Hub.
           </p>
           <button 
             onClick={() => navigate('/dashboard')}
             className="px-8 py-3 bg-um-red text-white rounded-xl font-bold text-sm uppercase tracking-widest hover:bg-white hover:text-zinc-900 transition-all"
           >
             Return to Dashboard
           </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-zinc-50 overflow-hidden text-zinc-900">
      {/* Mobile Toggle */}
      <button 
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="lg:hidden fixed bottom-6 right-6 z-50 w-12 h-12 bg-um-red text-white rounded-full shadow-xl flex items-center justify-center"
      >
        {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar Navigation */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.aside 
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            className="w-80 bg-white border-r border-zinc-200 flex flex-col fixed inset-y-0 lg:relative z-40"
          >
            <div className="p-6 border-b border-zinc-100">
               <button 
                 onClick={() => navigate('/dashboard')}
                 className="flex items-center gap-2 text-zinc-400 hover:text-um-red transition-colors text-xs font-bold uppercase tracking-widest mb-6"
               >
                 <ArrowLeft size={14} /> Back to Hub
               </button>
               <h1 className="font-bold text-lg leading-tight">Lesson 1: Diagnostic Assessment & Content Mastery</h1>
            </div>

            <div className="flex-grow overflow-y-auto p-4 space-y-2">
              <div className="px-4 py-2 mb-4">
                 <div className="flex justify-between items-center mb-2">
                   <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">Total Progress</span>
                   <span className="text-xs font-bold text-um-red">{progressPercent}%</span>
                 </div>
                 <div className="h-1.5 bg-zinc-100 rounded-full overflow-hidden">
                    <motion.div 
                      className="h-full bg-um-red" 
                      animate={{ width: `${progressPercent}%` }}
                    />
                 </div>
              </div>

              {sections.map((section) => {
                const unlocked = isSectionUnlocked(section.id);
                return (
                  <button
                    key={section.id}
                    disabled={!unlocked}
                    onClick={() => setActiveSection(section.id)}
                    className={`w-full flex items-start gap-3 p-4 rounded-xl text-left transition-all ${
                      activeSection === section.id 
                        ? 'bg-zinc-900 text-white shadow-lg shadow-zinc-900/10' 
                        : unlocked ? 'hover:bg-zinc-50' : 'opacity-40 cursor-not-allowed'
                    }`}
                  >
                  <div className={`mt-0.5 ${section.completed ? 'text-green-500' : activeSection === section.id ? 'text-um-gold' : 'text-zinc-200'}`}>
                    <CheckCircle2 size={18} fill={section.completed ? 'currentColor' : 'none'} className={section.completed ? 'text-green-500 fill-green-500/20' : ''} />
                  </div>
                  <div>
                    <p className={`text-[10px] uppercase tracking-widest font-bold mb-1 ${activeSection === section.id ? 'text-um-gold' : 'text-zinc-400'}`}>
                      {section.type}
                    </p>
                    <p className={`text-sm font-bold leading-tight ${activeSection === section.id ? 'text-white' : 'text-zinc-600'}`}>
                      {section.title}
                    </p>
                  </div>
                </button>
              );
            })}
            </div>

            <div className="p-6 border-t border-zinc-100 bg-zinc-50/50">
               <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-4">Module Statistics</p>
               <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white p-3 rounded-lg border border-zinc-200">
                    <p className="text-xl font-bold">12m</p>
                    <p className="text-[9px] text-zinc-400 uppercase font-bold">Time Spent</p>
                  </div>
                  <div className="bg-white p-3 rounded-lg border border-zinc-200">
                    <p className="text-xl font-bold">{diagnosticScore}/5</p>
                    <p className="text-[9px] text-zinc-400 uppercase font-bold">Activity Score</p>
                  </div>
               </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Main Content Area */}
      <main className="flex-grow overflow-y-auto bg-white">
        <div className="max-w-4xl mx-auto px-6 py-12 lg:px-12 lg:py-20">
          <AnimatePresence mode="wait">
            {activeSection === 'overview' && (
              <motion.div
                key="overview"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-12"
              >
                <div className="border-b border-zinc-100 pb-8">
                  <h2 className="text-4xl lg:text-5xl font-bold mb-6">Introduction</h2>
                  <p className="text-xl text-zinc-600 leading-relaxed max-w-3xl">
                    This module, <span className="text-um-red font-bold">Identifying Main Idea and Supporting Details</span>, focuses on developing learners’ listening skills through authentic, meaningful tasks.
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                   <div className="bg-zinc-50 p-8 rounded-2xl border border-zinc-100">
                      <BookOpen size={32} className="text-um-red mb-6" />
                      <h3 className="text-xl font-bold mb-4">Learning Objectives</h3>
                      <ul className="space-y-4">
                        {[
                          "Identify the main ideas and supporting details in an audio.",
                          "Organize information using a graphic organizer.",
                          "Demonstrate effective listening strategies while engaging with authentic spoken input."
                        ].map((obj, i) => (
                          <li key={i} className="flex gap-3 text-sm text-zinc-600">
                            <CheckCircle2 size={18} className="text-um-red flex-shrink-0 mt-0.5" />
                            {obj}
                          </li>
                        ))}
                      </ul>
                   </div>
                   <div className="bg-zinc-900 p-8 rounded-2xl text-white">
                      <GraduationCap size={32} className="text-um-gold mb-6" />
                      <h3 className="text-xl font-bold mb-4">Target Learner Profile</h3>
                      <p className="text-zinc-400 text-sm leading-relaxed mb-6">
                        Designed for Junior High School students at the early–intermediate proficiency level. This 60-minute lesson provides scaffolded tasks to help you transition toward upper–intermediate proficiency.
                      </p>
                      <div className="p-4 bg-white/5 rounded-xl border border-white/10 text-[10px] uppercase tracking-widest text-um-gold font-bold">
                         Context: Academic Classroom / Blended
                      </div>
                   </div>
                </div>

                <div className="space-y-6">
                  <h3 className="text-2xl font-bold">Theoretical and Pedagogical Rationale</h3>
                  <div className="prose prose-zinc text-zinc-600 text-sm leading-relaxed max-w-none space-y-4">
                    <p>
                      This module is grounded in <span className="font-bold text-zinc-900">Bottom-Up and Top-Down Processing</span> theories. 
                      Listening is not just hearing; it is an active process of decoding sounds and constructing meaning.
                    </p>
                    <div className="grid sm:grid-cols-2 gap-6 mt-4">
                      <div className="border-l-2 border-um-red pl-4">
                        <h4 className="font-bold text-zinc-900 text-xs uppercase mb-1">Bottom-Up</h4>
                        <p>Focuses on recognizing individual words and sounds (Building blocks).</p>
                      </div>
                      <div className="border-l-2 border-um-gold pl-4">
                        <h4 className="font-bold text-zinc-900 text-xs uppercase mb-1">Top-Down</h4>
                        <p>Uses background knowledge and context to infer the larger message.</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-um-red/5 p-8 rounded-2xl border border-um-red/10">
                   <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                     <AlertCircle size={20} className="text-um-red" />
                     For the Learners: Getting Started
                   </h3>
                   <div className="text-sm text-zinc-600 space-y-4">
                      <p>Welcome! In this lesson, you will learn how to find the most important thought in a text or video (the main idea) and the supporting details that explain it.</p>
                      <div className="grid sm:grid-cols-2 gap-4 mt-6">
                         {[
                           "Use the module responsibly.",
                           "Start with 'What I Know'.",
                           "Follow instructions closely.",
                           "Submit outputs through UM DigiTech."
                         ].map((item, i) => (
                           <div key={i} className="flex items-center gap-2">
                              <span className="w-5 h-5 bg-um-red text-white text-[10px] flex items-center justify-center rounded-full font-bold">{i+1}</span>
                              <span className="font-medium text-xs">{item}</span>
                           </div>
                         ))}
                      </div>
                   </div>
                </div>

                <div className="pt-8 border-t border-zinc-100 flex justify-end">
                   <button 
                     onClick={() => handleNextSection('overview', 'diagnostic')}
                     className="px-10 py-5 bg-um-red text-white rounded-2xl font-bold text-sm uppercase tracking-widest hover:bg-um-black transition-all shadow-xl shadow-um-red/20"
                   >
                     Continue to What I Know
                   </button>
                </div>
              </motion.div>
            )}

            {activeSection === 'diagnostic' && (
              <motion.div
                key="diagnostic"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-12 text-center max-w-3xl mx-auto"
              >
                <div className="flex flex-col items-center">
                  <Gamepad2 size={48} className="text-um-red mb-6" />
                  <h2 className="text-3xl font-bold mb-4">What I Know (Diagnostic)</h2>
                  <p className="text-zinc-500">Activity 1: Match the category in <span className="font-bold">Column B</span> with the group of words in <span className="font-bold">Column A</span>.</p>
                  <p className="text-xs font-bold uppercase tracking-widest text-zinc-400 mt-3">Attempted: {attemptedCount}/{diagnosticItems.length}</p>
                </div>

                {!isDiagnosticPassed ? (
                  <div className="space-y-8 bg-zinc-50 p-8 rounded-3xl border border-dashed border-zinc-200">
                    <div className="flex justify-between text-[10px] font-bold text-zinc-400 uppercase tracking-widest px-4">
                       <span>Column A (Items)</span>
                       <span>Column B (Categories)</span>
                    </div>
                    
                    <div className="grid gap-3">
                      {diagnosticItems.map((item, i) => (
                        <div key={i} className="bg-white p-4 rounded-xl border border-zinc-100 flex flex-col sm:flex-row items-center justify-between shadow-sm gap-4">
                           <div className="flex items-center gap-3">
                             <span className="text-xs font-bold text-zinc-300">{i + 1}.</span>
                             <span className="font-medium text-sm text-left">{item.text}</span>
                           </div>
                           <div className="flex gap-2">
                              {item.options.map(opt => {
                                const selected = diagnosticAnswers[i];
                                const isAnswered = selected !== undefined;
                                const isSelected = selected === opt;
                                return (
                                <button 
                                  key={opt}
                                  disabled={isAnswered}
                                  onClick={() => setDiagnosticAnswers(prev => ({ ...prev, [i]: opt }))}
                                  className={`px-3 py-1 rounded text-[10px] font-bold uppercase transition-all ${
                                    isSelected
                                      ? opt === item.correct
                                        ? 'bg-green-500 text-white'
                                        : 'bg-red-500 text-white'
                                      : isAnswered
                                        ? 'bg-zinc-100 text-zinc-400 cursor-not-allowed'
                                        : 'bg-zinc-50 hover:bg-um-red hover:text-white'
                                  }`}
                                >
                                  {opt}
                                </button>
                              )})}
                           </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <motion.div 
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="bg-green-50 p-12 rounded-3xl border border-green-100 flex flex-col items-center"
                  >
                     <div className="w-16 h-16 bg-green-500 text-white rounded-full flex items-center justify-center mb-6 shadow-lg shadow-green-500/20">
                        <CheckCircle2 size={32} />
                     </div>
                     <h3 className="text-2xl font-bold text-green-900 mb-2">Diagnostic Complete!</h3>
                     <p className="text-green-700 mb-8">You answered all items. You're ready to proceed to Lesson 1: Identify the Main Idea and Supporting Details.</p>
                     <button 
                       onClick={() => handleNextSection('diagnostic', 'learn')}
                       className="px-8 py-4 bg-zinc-900 text-white rounded-xl font-bold text-sm uppercase tracking-widest hover:scale-105 transition-transform"
                     >
                       Proceed to Lesson
                     </button>
                  </motion.div>
                )}
              </motion.div>
            )}

            {activeSection === 'learn' && (
              <motion.div
                key="learn"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-12"
              >
                <div>
                  <h2 className="text-3xl font-bold mb-4">Lesson 1: Identify the Main Idea and Supporting Details</h2>
                  <div className="bg-um-red/10 px-4 py-2 rounded-lg text-um-red font-bold text-xs uppercase tracking-widest inline-block mb-8">What is It?</div>
                </div>

                <div className="aspect-video bg-zinc-100 rounded-3xl overflow-hidden shadow-2xl">
                  <iframe 
                    width="100%" 
                    height="100%" 
                    src="https://www.youtube.com/embed/LWFnpeimPfE" 
                    title="Main Idea and Supporting Details" 
                    frameBorder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowFullScreen
                  />
                </div>

                <div className="prose prose-zinc max-w-none">
                   <h3 className="text-2xl font-bold mb-6">Reading</h3>
                   <p className="text-zinc-600 leading-relaxed mb-8">
                      A <span className="font-bold text-zinc-900">main idea</span> is the most important thought about a text. The main idea is what the whole text is mostly about. It usually tells about the person, thing or idea.
                      The <span className="font-bold text-zinc-900">supporting details</span> explain, strengthen, or give examples of the main idea. They provide facts, reasons, or descriptions that help us understand the central thought more clearly.
                   </p>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                   {[
                     { step: "Step 1", title: "Identify the topic", desc: "Ask yourself, 'What is this about?'. Keep it to 2-3 words.", icon: <Search size={20} /> },
                     { step: "Step 2", title: "Author's Message", desc: "What does the author want me to know about the topic?", icon: <MessageSquare size={20} /> },
                     { step: "Step 3", title: "Support Facts", desc: "Does this fact, example, or explanation help support the main idea?", icon: <CheckCircle2 size={20} /> }
                   ].map((step, i) => (
                     <div key={i} className="p-8 border border-zinc-100 rounded-2xl bg-zinc-50/50 hover:bg-white hover:shadow-xl transition-all group">
                        <div className="w-10 h-10 rounded-xl bg-um-red text-white flex items-center justify-center font-bold mb-6 group-hover:scale-110 transition-transform">
                          {i+1}
                        </div>
                        <h4 className="font-bold text-lg mb-2">{step.title}</h4>
                        <p className="text-xs text-zinc-500 leading-relaxed">{step.desc}</p>
                     </div>
                   ))}
                </div>

                <div className="bg-zinc-900 p-10 rounded-3xl text-white relative overflow-hidden">
                   <div className="relative z-10 flex flex-col md:flex-row gap-10">
                      <div className="md:w-1/3">
                         <p className="text-xs font-bold text-um-gold uppercase tracking-[0.2em] mb-4">Example Case Study</p>
                         <h3 className="text-2xl font-bold mb-6 italic">Remember: Drop, Cover, Hold</h3>
                         <div className="aspect-video bg-white/10 rounded-xl overflow-hidden">
                            <iframe 
                              width="100%" 
                              height="100%" 
                              src="https://www.youtube.com/embed/t36YzCnmjEU" 
                              title="Earthquake Safety" 
                              frameBorder="0" 
                              allowFullScreen
                            />
                         </div>
                      </div>
                      <div className="md:w-2/3 space-y-6">
                         <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                            <p className="text-[10px] uppercase text-um-gold font-bold mb-1">Step 1: Topic</p>
                            <p className="text-sm font-bold">Earthquake safety</p>
                         </div>
                         <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                            <p className="text-[10px] uppercase text-um-gold font-bold mb-1">Step 2: Main Idea</p>
                            <p className="text-sm font-bold">Follow the Drop, Cover, Hold protocol during an earthquake.</p>
                         </div>
                         <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                            <p className="text-[10px] uppercase text-um-gold font-bold mb-1">Step 3: Supporting Details</p>
                            <ul className="text-xs space-y-2 mt-2 list-disc list-inside text-zinc-400">
                               <li>Drop: Get down on the ground immediately</li>
                               <li>Cover: Protect your head and neck</li>
                               <li>Hold: Stay under a sturdy desk or table</li>
                            </ul>
                         </div>
                      </div>
                   </div>
                   <div className="absolute top-0 right-0 w-1/3 h-full bg-um-red/10 -skew-x-12 translate-x-12" />
                </div>

                <div className="bg-zinc-50 p-8 rounded-2xl">
                   <h4 className="font-bold mb-6 text-sm uppercase tracking-widest text-zinc-400">Key Strategies to Apply</h4>
                   <div className="grid sm:grid-cols-2 gap-6">
                      {[
                        "Spot the topic - Keep it short.",
                        "Separate points from examples.",
                        "Notice emphasis (tone/repeated words).",
                        "Take active notes in your own words.",
                        "Check connections for every detail."
                      ].map((strat, i) => (
                        <div key={i} className="flex gap-3 text-sm font-medium">
                           <CheckCircle2 size={18} className="text-um-red" />
                           {strat}
                        </div>
                      ))}
                   </div>
                </div>

                <div className="flex justify-between items-center pt-8 border-t border-zinc-100">
                  <button onClick={() => setActiveSection('diagnostic')} className="text-zinc-400 hover:text-zinc-900 font-bold text-xs uppercase tracking-widest flex items-center gap-2">
                    <ArrowLeft size={16} /> Previous
                  </button>
                  <button 
                    onClick={() => handleNextSection('learn', 'practice')} 
                    className="px-8 py-4 bg-um-red text-white rounded-xl font-bold text-xs uppercase tracking-widest flex items-center gap-2 hover:bg-um-black transition-all shadow-lg shadow-um-red/20"
                  >
                    Continue to Assessment <ChevronRight size={16} />
                  </button>
                </div>
              </motion.div>
            )}

            {activeSection === 'practice' && (
              <motion.div
                key="practice"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-12"
              >
                <div className="text-center max-w-2xl mx-auto">
                  <div className="bg-um-red/10 px-4 py-2 rounded-lg text-um-red font-bold text-xs uppercase tracking-widest inline-block mb-6">Activity 2: Assessment</div>
                  <h2 className="text-3xl font-bold mb-4">Watch & Organize</h2>
                  <p className="text-zinc-500 leading-relaxed">
                    Watch the video <span className="font-bold text-zinc-900">Tip 4: Avoid Scams</span>. As you listen, take silent notes and pay close attention to the main idea.
                  </p>
                </div>

                <div className="aspect-video bg-zinc-100 rounded-3xl overflow-hidden shadow-2xl">
                  <iframe 
                    width="100%" 
                    height="100%" 
                    src="https://www.youtube.com/embed/BX3y_an89PQ" 
                    title="Avoid Scams" 
                    frameBorder="0" 
                    allowFullScreen
                  />
                </div>

                <div className="p-10 border-2 border-zinc-900 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-8 bg-zinc-900 text-white">
                   <div className="space-y-4">
                      <div className="flex items-center gap-2">
                         <div className="w-8 h-8 bg-um-gold flex items-center justify-center rounded text-zinc-900 font-bold">P</div>
                         <h3 className="text-xl font-bold">Digital Graphic Organizer</h3>
                      </div>
                      <p className="text-sm text-zinc-400 max-w-sm">After watching, click the link to complete the organizer on Padlet.</p>
                   </div>
                   <a 
                     href="https://padlet.com/richardlayar26/my-stunning-sandbox-nhybm5dwuz7x35ms" 
                     target="_blank" 
                     rel="no-referrer"
                     className="px-10 py-5 bg-um-red text-white rounded-2xl font-bold text-sm uppercase tracking-widest flex items-center gap-2 hover:bg-um-gold hover:text-zinc-900 transition-all shadow-xl shadow-um-red/20"
                   >
                     Open Padlet <ExternalLink size={18} />
                   </a>
                </div>

                <div className="flex justify-between items-center pt-8 border-t border-zinc-100">
                  <button onClick={() => setActiveSection('learn')} className="text-zinc-400 hover:text-zinc-900 font-bold text-xs uppercase tracking-widest flex items-center gap-2">
                    <ArrowLeft size={16} /> Previous
                  </button>
                  <button 
                    onClick={() => handleNextSection('practice', 'reflect')} 
                    className="px-8 py-3 bg-um-red text-white rounded-xl font-bold text-xs uppercase tracking-widest flex items-center gap-2 hover:bg-um-black transition-all"
                  >
                    Final Reflection <ChevronRight size={16} />
                  </button>
                </div>
              </motion.div>
            )}

            {activeSection === 'reflect' && (
              <motion.div
                key="reflect"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-12"
              >
                <div className="bg-zinc-50 p-12 rounded-3xl border border-zinc-100">
                  <div className="flex items-center gap-3 mb-8">
                    <div className="bg-um-red/10 px-4 py-2 rounded-lg text-um-red font-bold text-xs uppercase tracking-widest inline-block">Activity 3</div>
                  </div>
                  
                  <h2 className="text-3xl font-bold mb-6">What I have Learned</h2>
                  <p className="text-zinc-600 mb-10 leading-relaxed">
                    Complete the following paragraph with words that you have learned about main idea and key sentence.
                  </p>

                  <p className="text-xs font-bold uppercase tracking-widest text-zinc-400 mb-8">Answered: {reflectionAttemptedCount}/{reflectionItems.length}</p>

                  <div className="space-y-6 text-lg font-medium leading-loose text-zinc-900">
                    <p>
                      In this module, I learned that the main idea is the (1) {renderReflectionInput(0, 'most important thought')} about a text/speech. 
                      The main idea is what the whole text/speech (2) {renderReflectionInput(1, 'is mostly about')}. 
                      It usually tells about the (3) {renderReflectionInput(2, 'person')}, (4) {renderReflectionInput(3, 'thing')}, or (5) {renderReflectionInput(4, 'idea')}.
                    </p>
                    <p>
                      Supporting details are the (6) {renderReflectionInput(5, 'facts/reasons')} that explain or strengthen the main idea. 
                      They provide (7) {renderReflectionInput(6, 'examples')} that make the message clearer and easier to understand.
                    </p>
                    <p>
                      The best part of the lesson I love most is the (8) {renderReflectionInput(7, 'interactive activities')}.
                    </p>
                  </div>

                  <div className="mt-16 pt-8 border-t border-zinc-100 flex gap-4">
                     <button 
                       disabled={!isReflectionComplete}
                       onClick={() => {
                         setShowTrophy(true);
                         updateSectionProgress(lessonId, 'reflect');
                       }}
                       className={`px-10 py-5 rounded-2xl font-bold text-sm uppercase tracking-widest transition-all shadow-xl ${
                         isReflectionComplete
                           ? 'bg-zinc-900 text-white hover:bg-um-red shadow-zinc-900/10'
                           : 'bg-zinc-200 text-zinc-500 cursor-not-allowed shadow-zinc-200/20'
                       }`}
                     >
                       {isReflectionComplete ? 'Complete Module & Get Trophy' : 'Answer All Items to Complete'}
                     </button>
                     <button 
                       onClick={() => {
                         setActiveSection('references');
                       }}
                       className="px-10 py-5 bg-zinc-100 text-zinc-900 rounded-2xl font-bold text-sm uppercase tracking-widest hover:bg-zinc-200 transition-all"
                     >
                       View References
                     </button>
                  </div>
                </div>

                {showTrophy && (
                  <motion.div 
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="fixed inset-0 z-[60] bg-zinc-900/90 backdrop-blur-xl flex items-center justify-center p-6 text-center"
                  >
                    <div className="bg-white p-12 rounded-3xl max-w-sm space-y-8">
                       <motion.div 
                         animate={{ rotate: [0, 10, -10, 0] }}
                         transition={{ repeat: Infinity, duration: 1 }}
                         className="w-24 h-24 bg-um-gold text-white rounded-full flex items-center justify-center mx-auto shadow-2xl shadow-um-gold/50"
                       >
                          <Trophy size={48} />
                       </motion.div>
                       <div>
                          <h3 className="text-3xl font-bold text-um-red mb-2">Well Done, Kayeen!</h3>
                          <p className="text-zinc-500">You have successfully completed Lesson 1 and earned your <span className="font-bold text-zinc-900">Module Mastery Trophy</span>.</p>
                       </div>
                       <button 
                         onClick={() => navigate('/dashboard')}
                         className="w-full py-4 bg-zinc-900 text-white rounded-xl font-bold text-xs uppercase tracking-widest"
                       >
                         Back to Dashboard
                       </button>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            )}
            {activeSection === 'references' && (
              <motion.div
                key="references"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-12"
              >
                <div className="border-b border-zinc-100 pb-8">
                   <h2 className="text-4xl font-bold mb-4">References</h2>
                   <p className="text-zinc-500">List of all sources and materials cited in this module.</p>
                </div>

                <div className="space-y-8">
                   <div className="bg-zinc-50 p-8 rounded-2xl border border-zinc-100">
                      <h3 className="font-bold text-lg mb-6 flex items-center gap-2">
                         <Library size={20} className="text-um-red" />
                         Multimedia Sources
                      </h3>
                      <div className="space-y-4">
                         {[
                           { title: "Main Idea and Supporting Details", url: "https://youtu.be/LWFnpeimPfE", type: "Core Instruction" },
                           { title: "Drop, Cover, and Hold on!", url: "https://youtu.be/t36YzCnmjEU", type: "Strategy Visualization" },
                           { title: "Tip 4: Avoid Scams!", url: "https://youtu.be/BX3y_an89PQ", type: "Assessment Content" }
                         ].map((item, i) => (
                           <div key={i} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-white rounded-xl border border-zinc-100 gap-4">
                              <div>
                                 <p className="text-xs font-bold text-um-red uppercase tracking-widest mb-1">{item.type}</p>
                                 <p className="font-bold text-sm tracking-tight">{item.title}</p>
                              </div>
                              <a 
                                href={item.url} 
                                target="_blank" 
                                rel="no-referrer"
                                className="flex items-center gap-2 text-xs font-bold text-zinc-400 hover:text-um-black transition-colors"
                              >
                                {item.url} <ExternalLink size={14} />
                              </a>
                           </div>
                         ))}
                      </div>
                   </div>

                   <div className="bg-um-black p-8 rounded-2xl text-white">
                      <h3 className="font-bold text-lg mb-6 flex items-center gap-2">
                         <FileText size={20} className="text-um-gold" />
                         Pedagogical Frameworks
                      </h3>
                      <ul className="space-y-4 text-sm text-zinc-400">
                         <li className="flex gap-3">
                            <span className="w-1.5 h-1.5 bg-um-gold rounded-full mt-2 flex-shrink-0" />
                            <span>Anderson, A., & Lynch, T. (1988). *Listening*. Oxford University Press.</span>
                         </li>
                         <li className="flex gap-3">
                            <span className="w-1.5 h-1.5 bg-um-gold rounded-full mt-2 flex-shrink-0" />
                            <span>Rost, M. (2011). *Teaching and Researching: Listening*. Routledge.</span>
                         </li>
                         <li className="flex gap-3">
                            <span className="w-1.5 h-1.5 bg-um-gold rounded-full mt-2 flex-shrink-0" />
                            <span>Vandergrift, L., & Goh, C. (2012). *Teaching and Learning Second Language Listening: Metacognition in Action*. Routledge.</span>
                         </li>
                      </ul>
                   </div>
                </div>

                <div className="flex justify-between items-center pt-8 border-t border-zinc-100">
                   <button 
                     onClick={() => setActiveSection('reflect')}
                     className="text-zinc-400 hover:text-zinc-900 font-bold text-xs uppercase tracking-widest flex items-center gap-2"
                   >
                     <ArrowLeft size={16} /> Back to Reflection
                   </button>
                   <button 
                     onClick={() => navigate('/dashboard')}
                     className="px-8 py-3 bg-um-black text-white rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-um-red transition-all shadow-lg"
                   >
                     Return to Dashboard
                   </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
};

export default LessonModule;
