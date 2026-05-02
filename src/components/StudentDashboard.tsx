import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useProgress } from '../context/ProgressContext';
import { 
  LayoutDashboard, 
  BookOpen, 
  Briefcase, 
  MessageSquare, 
  Calendar, 
  Settings, 
  LogOut, 
  Search, 
  Bell, 
  ChevronRight,
  Clock,
  Star,
  CheckCircle2,
  AlertCircle,
  FileText,
  RefreshCw,
  User
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const StudentDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const navigate = useNavigate();
  const { lessonsProgress, getLessonProgress, resetProgress } = useProgress();

  const lessons = [
    { 
      id: 1, 
      lesson: "Lesson 1", 
      title: "Diagnostic Assessment", 
      progress: getLessonProgress(1), 
      status: lessonsProgress[1]?.status || "active", 
      type: "Evaluation", 
      desc: "Personalized evaluation to identify strengths and learning gaps before starting the journey." 
    },
    { 
      id: 2, 
      lesson: "Lesson 2", 
      title: "Digital Content Mastery", 
      progress: getLessonProgress(2), 
      status: lessonsProgress[2]?.status || "locked", 
      type: "Interactive", 
      desc: "Learning to transform traditional lessons into high-engagement interactive formats." 
    },
    { 
      id: 3, 
      lesson: "Lesson 3", 
      title: "Main Idea & Supporting Details", 
      progress: getLessonProgress(3), 
      status: lessonsProgress[3]?.status || "locked", 
      type: "Module", 
      desc: "Digital Interactive Module focusing on core reading comprehension skills." 
    },
    { 
      id: 4, 
      lesson: "Lesson 4", 
      title: "Showcase & Portfolio", 
      progress: getLessonProgress(4), 
      status: lessonsProgress[4]?.status || "locked", 
      type: "Capstone", 
      desc: "Consolidating all learnings into a professional digital portfolio for future use." 
    }
  ];

  const currentLesson = lessons.find(l => l.status === 'active') || lessons[0];


  return (
    <div className="flex h-screen bg-zinc-50 overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-um-black text-white hidden md:flex flex-col flex-shrink-0">
        <div className="p-6 border-b border-white/10 flex items-center gap-3">
          <div className="w-10 h-10 bg-um-red flex items-center justify-center rounded">
            <span className="text-white font-bold text-sm">DH</span>
          </div>
          <div>
            <h1 className="font-bold">DigiTeach Hub</h1>
            <p className="text-[10px] uppercase text-zinc-500 tracking-widest font-bold">University Hub</p>
          </div>
        </div>
        
        <nav className="flex-grow p-4 mt-4 space-y-2">
          {[
            { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
            { id: 'lessons', label: 'My Lessons', icon: BookOpen },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                activeTab === item.id 
                  ? 'bg-um-red text-white' 
                  : 'text-zinc-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <item.icon size={18} />
              {item.label}
            </button>
          ))}
        </nav>
        
        <div className="p-4 border-t border-white/10">
          <button 
            onClick={() => navigate('/')}
            className="w-full flex items-center gap-3 px-4 py-3 text-zinc-400 hover:text-white transition-all text-sm font-medium"
          >
            <LogOut size={18} />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow overflow-y-auto">
        {/* Header */}
        <header className="sticky top-0 z-20 bg-white/80 backdrop-blur-md border-b border-zinc-200 px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4 bg-zinc-100 px-4 py-2 rounded-full w-96">
            <Search size={18} className="text-zinc-400" />
            <input type="text" placeholder="Search lessons, activities or people..." className="bg-transparent border-none outline-none text-sm w-full" />
          </div>
          
          <div className="flex items-center gap-6">
            <button className="relative text-zinc-400 hover:text-zinc-900 transition-colors">
              <Bell size={20} />
              <div className="absolute top-0 right-0 w-2 h-2 bg-um-red rounded-full border-2 border-white" />
            </button>
            <div className="flex items-center gap-3 pl-6 border-l border-zinc-200">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-bold">Kayeen Campana</p>
                <p className="text-[10px] text-zinc-400 uppercase tracking-widest font-bold">ID: 2024-05467</p>
              </div>
              <div className="w-10 h-10 bg-zinc-200 rounded-full flex items-center justify-center text-zinc-500 overflow-hidden">
                <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=KayeenCampana" alt="Profile" />
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="p-8 max-w-7xl mx-auto">
          <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <p className="text-um-red font-bold uppercase tracking-widest text-xs mb-2">Academic Year 2026-2027</p>
              <h2 className="text-3xl font-bold">Welcome back, Kayeen! 👋</h2>
              <p className="text-zinc-500 mt-2">
                {currentLesson.progress === 0 
                  ? `Your first goal is to complete the ${currentLesson.title}.` 
                  : currentLesson.progress < 100 
                    ? `You're making great progress on ${currentLesson.lesson}! Keep it up.`
                    : "You've completed your current goals! Ready for the next lesson?"}
              </p>
            </div>
          </div>

          <AnimatePresence mode="wait">
            {activeTab === 'dashboard' ? (
              <motion.div
                key="dashboard"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="grid lg:grid-cols-3 gap-8"
              >
                {/* Left/Main Column */}
                <div className="lg:col-span-2 space-y-8">
                  {/* Active Course Card - Coursera Style */}
                  <div className="bg-white border border-zinc-200 rounded-2xl overflow-hidden shadow-sm">
                    <div className="md:flex">
                      <div className="md:w-1/3 bg-zinc-900 flex items-center justify-center p-8 text-um-gold">
                        <BookOpen size={64} strokeWidth={1.5} />
                      </div>
                      <div className="p-8 md:w-2/3">
                         <p className="text-[10px] uppercase tracking-widest font-bold text-um-red mb-2">Current Activity</p>
                         <h3 className="text-2xl font-bold mb-4">{currentLesson.lesson}: {currentLesson.title}</h3>
                         <p className="text-zinc-500 text-sm mb-6 leading-relaxed">
                           {currentLesson.desc}
                         </p>
                         
                         <div className="flex items-center gap-4 mb-8">
                            <div className="flex-grow h-2 bg-zinc-100 rounded-full overflow-hidden">
                              <motion.div 
                                className="h-full bg-um-red" 
                                initial={{ width: 0 }}
                                animate={{ width: `${currentLesson.progress}%` }}
                              />
                            </div>
                            <span className="text-xs font-bold text-zinc-400 italic">{currentLesson.progress}% Complete</span>
                         </div>

                         <button 
                           onClick={() => navigate(`/lesson/${currentLesson.id}`)}
                           className="px-8 py-3 bg-um-red text-white rounded-xl font-bold text-sm uppercase tracking-widest hover:bg-um-black transition-all shadow-lg shadow-um-red/10"
                         >
                           {currentLesson.progress > 0 ? 'Continue Learning' : 'Start Learning'}
                         </button>
                      </div>
                    </div>
                  </div>

                  {/* Stats Grid */}
                  <div className="grid sm:grid-cols-1 gap-4">
                    {[
                      { label: "Active Hours", value: "1.2h", sub: "Since joining", icon: Clock, color: "text-um-red" }
                    ].map((stat, i) => (
                      <div key={i} className="glass-card p-6 rounded-2xl">
                        <div className={`${stat.color} mb-4`}><stat.icon size={24} /></div>
                        <div className="flex items-end gap-2">
                          <span className="text-3xl font-bold">{stat.value}</span>
                          <span className="text-xs text-zinc-400 font-medium mb-1">{stat.sub}</span>
                        </div>
                        <p className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold mt-2">{stat.label}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right/Side Column */}
                <div className="space-y-8">
                  {/* Profile Card */}
                  <div className="bg-white border border-zinc-200 rounded-2xl p-6 shadow-sm text-center">
                     <div className="w-24 h-24 bg-zinc-100 rounded-full mx-auto mb-4 border-4 border-zinc-50 overflow-hidden shadow-inner">
                        <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=KayeenCampana" alt="Profile" className="w-full h-full object-cover" />
                     </div>
                     <h3 className="font-bold text-lg">Kayeen Campana</h3>
                     <p className="text-zinc-500 text-sm">8th Grade Student</p>
                     <div className="mt-6 pt-6 border-t border-zinc-100 space-y-2">
                        <button className="w-full py-3 border border-zinc-100 rounded-xl text-sm font-bold flex items-center justify-center gap-2 hover:bg-zinc-50 transition-all">
                           <User size={16} /> Edit Profile
                        </button>
                     </div>
                  </div>

                </div>
              </motion.div>
            ) : (
              <motion.div
                key="lessons"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {lessons.map((lesson, i) => (
                    <div 
                      key={lesson.id}
                      className={`p-8 border rounded-2xl flex flex-col h-full transition-all duration-300 relative group overflow-hidden ${
                        lesson.status === 'locked' 
                          ? 'border-zinc-200 bg-zinc-50/50 opacity-70 grayscale pointer-events-none' 
                          : 'border-zinc-800 bg-zinc-900 text-white shadow-xl hover:translate-y-[-4px]'
                      }`}
                    >
                      {lesson.status === 'locked' && (
                        <div className="absolute top-4 right-4 text-zinc-400">
                          <AlertCircle size={20} />
                        </div>
                      )}
                      
                      <div className="mb-8">
                        <p className={`text-xs uppercase tracking-[0.2em] font-bold ${lesson.status === 'locked' ? 'text-zinc-400' : 'text-um-gold'}`}>
                          {lesson.lesson}
                        </p>
                      </div>
                      
                      <h3 className="text-xl font-bold mb-4">{lesson.title}</h3>
                      <p className={`text-sm mb-12 flex-grow ${lesson.status === 'locked' ? 'text-zinc-500' : 'text-zinc-400'}`}>
                        {lesson.desc}
                      </p>

                      {lesson.status !== 'locked' && (
                        <div className="mb-6">
                           <div className="flex justify-between items-center mb-2">
                             <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">
                               {lesson.status === 'completed' ? 'Completed' : 'Progress'}
                             </span>
                             <span className="text-[10px] font-bold text-um-gold">{lesson.progress}%</span>
                           </div>
                           <div className="h-1 bg-zinc-800 rounded-full overflow-hidden">
                             <motion.div 
                               className="h-full bg-um-red transition-all" 
                               initial={{ width: 0 }}
                               animate={{ width: `${lesson.progress}%` }} 
                             />
                           </div>
                        </div>
                      )}
                      
                      <button 
                        disabled={lesson.status === 'locked'}
                        onClick={() => lesson.status !== 'locked' && navigate(`/lesson/${lesson.id}`)}
                        className={`flex items-center gap-2 text-xs font-bold uppercase tracking-widest mt-auto ${
                          lesson.status === 'locked' ? 'text-zinc-400' : 'text-um-gold'
                        }`}
                      >
                        {lesson.status === 'locked' ? 'Locked' : lesson.status === 'completed' ? 'Review' : 'Continue'} <ChevronRight size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
};

export default StudentDashboard;
