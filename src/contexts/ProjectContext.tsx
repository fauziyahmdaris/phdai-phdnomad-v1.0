import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { phdResearchContext } from '../data/researchContext';

// Types for literature matrix items
export interface LiteratureEntry {
  id: string;
  title: string;
  authors: string[];
  year: number;
  journal: string;
  abstract: string;
  keywords?: string[];
  researchGap?: string;
  keyFindings?: string;
  methodology?: string;
  framework?: string;
  population?: string;
}

export interface ProjectMeta {
  title: string;
  objectives?: string[];
  area?: string;
  keywords?: string[];
}

interface ProjectContextType {
  // Project meta
  currentProject: ProjectMeta | null;
  setCurrentProject: (project: ProjectMeta | null) => void;
  projects: ProjectMeta[];
  addProject: (project: ProjectMeta | string) => void;
  removeProject: (project: ProjectMeta | string) => void;
  createProject: (payload: { title: string; objectives?: string[]; area?: string; keywords?: string[] }) => void;
  updateProject: (prev: ProjectMeta, next: ProjectMeta) => void;

  // Literature Matrix
  literatureEntries: LiteratureEntry[];
  addLiteratureEntry: (entry: Omit<LiteratureEntry, 'id'>) => void;
  updateLiteratureEntry: (id: string, patch: Partial<LiteratureEntry>) => void;
  deleteLiteratureEntry: (id: string) => void;
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

export function ProjectProvider({ children }: { children: ReactNode }) {
  const [currentProject, setCurrentProject] = useState<ProjectMeta | null>(null);
  const [projects, setProjects] = useState<ProjectMeta[]>([]);
  const [literatureEntries, setLiteratureEntries] = useState<LiteratureEntry[]>(() => {
    try {
      const raw = localStorage.getItem('phdai.literatureEntries');
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) return parsed as LiteratureEntry[];
      }
    } catch (_e) {
      // ignore
    }

    const seeded: LiteratureEntry[] = phdResearchContext.recommendedLiteratureByCluster.map((item, idx) => {
      const authors = (item.authors || '')
        .split(/,|&/g)
        .map(s => s.trim())
        .filter(Boolean);

      const year = Number.parseInt(item.year || '', 10);

      return {
        id: `seed-${idx}`,
        title: item.title,
        authors: authors.length ? authors : ['Unknown'],
        year: Number.isFinite(year) ? year : new Date().getFullYear(),
        journal: item.venue || item.cluster,
        abstract: `${item.note}\n\n${item.url}`,
      };
    });

    return seeded;
  });

  useEffect(() => {
    try {
      localStorage.setItem('phdai.literatureEntries', JSON.stringify(literatureEntries));
    } catch (_e) {
      // ignore
    }
  }, [literatureEntries]);

  const addProject: ProjectContextType['addProject'] = (project) => {
    const meta: ProjectMeta = typeof project === 'string' ? { title: project } : project;
    setProjects(prev => {
      if (prev.find(p => p.title === meta.title)) return prev;
      return [...prev, meta];
    });
  };

  const updateProject: ProjectContextType['updateProject'] = (prev, next) => {
    setProjects((ps) => ps.map((p) => (p.title === prev.title ? next : p)));
    if (currentProject?.title === prev.title) {
      setCurrentProject(next);
    }
  };

  const removeProject: ProjectContextType['removeProject'] = (project) => {
    const title = typeof project === 'string' ? project : project.title;
    setProjects(prev => prev.filter(p => p.title !== title));
    if (currentProject?.title === title) {
      setCurrentProject(null);
    }
  };

  const createProject: ProjectContextType['createProject'] = ({ title, objectives, area, keywords }) => {
    // Minimal implementation for MVP: track by title list and set rich currentProject
    if (title) {
      const meta = { title, objectives, area, keywords } as ProjectMeta;
      setProjects(prev => (prev.find(p => p.title === title) ? prev : [...prev, meta]));
      setCurrentProject(meta);
    } else {
      setCurrentProject(null);
    }
  };

  const addLiteratureEntry: ProjectContextType['addLiteratureEntry'] = (entry) => {
    const id = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
    setLiteratureEntries(prev => [{ id, ...entry }, ...prev]);
  };

  const updateLiteratureEntry: ProjectContextType['updateLiteratureEntry'] = (id, patch) => {
    setLiteratureEntries(prev => prev.map(e => (e.id === id ? { ...e, ...patch } : e)));
  };

  const deleteLiteratureEntry: ProjectContextType['deleteLiteratureEntry'] = (id) => {
    setLiteratureEntries(prev => prev.filter(e => e.id !== id));
  };

  return (
    <ProjectContext.Provider value={{
      currentProject,
      setCurrentProject,
      projects,
      addProject,
      removeProject,
      createProject,
      updateProject,
      literatureEntries,
      addLiteratureEntry,
      updateLiteratureEntry,
      deleteLiteratureEntry
    }}>
      {children}
    </ProjectContext.Provider>
  );
}

export function useProject() {
  const context = useContext(ProjectContext);
  if (context === undefined) {
    throw new Error('useProject must be used within a ProjectProvider');
  }
  return context;
}