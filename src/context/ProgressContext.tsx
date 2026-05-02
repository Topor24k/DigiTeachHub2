import React, { createContext, useContext, useState, useEffect } from 'react';

interface LessonProgress {
  id: number;
  progress: number;
  status: 'active' | 'locked' | 'completed';
  completedSections: string[];
}

interface ProgressContextType {
  lessonsProgress: Record<number, LessonProgress>;
  updateSectionProgress: (lessonId: number, sectionId: string) => void;
  getLessonProgress: (lessonId: number) => number;
  resetProgress: () => void;
}

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

export const ProgressProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lessonsProgress, setLessonsProgress] = useState<Record<number, LessonProgress>>(() => {
    const saved = localStorage.getItem('um_progress_v2');
    return saved ? JSON.parse(saved) : {
      1: { id: 1, progress: 0, status: 'active', completedSections: [] },
      2: { id: 2, progress: 0, status: 'locked', completedSections: [] },
      3: { id: 3, progress: 0, status: 'locked', completedSections: [] },
      4: { id: 4, progress: 0, status: 'locked', completedSections: [] },
    };
  });

  useEffect(() => {
    localStorage.setItem('um_progress_v2', JSON.stringify(lessonsProgress));

    // Auto-reset logic: If Lesson 1 is completed, wait 50 seconds then reset
    if (lessonsProgress[1]?.status === 'completed') {
      const timer = setTimeout(() => {
        resetProgress();
        // Notify user or just reload to show initial state
        window.location.reload();
      }, 50000); // 50 seconds
      return () => clearTimeout(timer);
    }
  }, [lessonsProgress]);

  const updateSectionProgress = (lessonId: number, sectionId: string) => {
    setLessonsProgress(prev => {
      const lesson = prev[lessonId];
      if (!lesson) return prev;
      
      if (lesson.completedSections.includes(sectionId)) return prev;

      const newCompletedSections = [...lesson.completedSections, sectionId];
      const totalSections = 6; // overview, diagnostic, learn, practice, reflect, references
      const newProgress = Math.min(100, Math.round((newCompletedSections.length / totalSections) * 100));
      
      const newStatus = newProgress === 100 ? 'completed' : 'active';
      
      const nextState = {
        ...prev,
        [lessonId]: {
          ...lesson,
          completedSections: newCompletedSections,
          progress: newProgress,
          status: newStatus as any
        }
      };

      // Unlock next lesson if current is completed
      if (newStatus === 'completed' && lessonId < 4) {
        nextState[lessonId + 1] = {
          ...nextState[lessonId + 1],
          status: 'active'
        };
      }

      return nextState;
    });
  };

  const resetProgress = () => {
    const initial = {
      1: { id: 1, progress: 0, status: 'active' as const, completedSections: [] },
      2: { id: 2, progress: 0, status: 'locked' as const, completedSections: [] },
      3: { id: 3, progress: 0, status: 'locked' as const, completedSections: [] },
      4: { id: 4, progress: 0, status: 'locked' as const, completedSections: [] },
    };
    setLessonsProgress(initial);
    localStorage.removeItem('um_progress_v2');
  };

  const getLessonProgress = (lessonId: number) => {
    return lessonsProgress[lessonId]?.progress || 0;
  };

  return (
    <ProgressContext.Provider value={{ lessonsProgress, updateSectionProgress, getLessonProgress, resetProgress }}>
      {children}
    </ProgressContext.Provider>
  );
};

export const useProgress = () => {
  const context = useContext(ProgressContext);
  if (!context) throw new Error('useProgress must be used within a ProgressProvider');
  return context;
};
