import React, { useMemo, useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ProjectMeta } from '@/contexts/ProjectContext';

interface ProjectSwitcherProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  projects: ProjectMeta[];
  currentProject: ProjectMeta | null;
  onCreate: (meta: ProjectMeta) => void;
  onSetCurrent: (meta: ProjectMeta) => void;
  onRemove: (meta: ProjectMeta) => void;
  onUpdate?: (prev: ProjectMeta, next: ProjectMeta) => void;
}

const ProjectSwitcher: React.FC<ProjectSwitcherProps> = ({
  open,
  onOpenChange,
  projects,
  currentProject,
  onCreate,
  onSetCurrent,
  onRemove,
  onUpdate,
}) => {
  const [title, setTitle] = useState('');
  const [area, setArea] = useState('');
  const [objectives, setObjectives] = useState('');
  const [keywords, setKeywords] = useState('');

  const canCreate = useMemo(() => title.trim().length > 0, [title]);

  const handleCreate = () => {
    if (!canCreate) return;
    const meta: ProjectMeta = {
      title: title.trim(),
      area: area.trim() || undefined,
      objectives: objectives
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean),
      keywords: keywords
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean),
    };
    onCreate(meta);
    setTitle('');
    setArea('');
    setObjectives('');
    setKeywords('');
  };

  const handleEdit = (prev: ProjectMeta, nextTitle: string, nextArea: string, nextObjectives: string, nextKeywords: string) => {
    const next: ProjectMeta = {
      title: nextTitle.trim() || prev.title,
      area: nextArea.trim() || undefined,
      objectives: nextObjectives.split(',').map((s) => s.trim()).filter(Boolean),
      keywords: nextKeywords.split(',').map((s) => s.trim()).filter(Boolean),
    };
    onUpdate?.(prev, next);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Manage Projects</DialogTitle>
        </DialogHeader>
        <div className="space-y-6">
          {/* Create New */}
          <div className="space-y-2">
            <div className="text-sm font-medium">Create New Project</div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title *" />
              <Input value={area} onChange={(e) => setArea(e.target.value)} placeholder="Area (optional)" />
              <Input value={objectives} onChange={(e) => setObjectives(e.target.value)} placeholder="Objectives (comma-separated)" />
              <Input value={keywords} onChange={(e) => setKeywords(e.target.value)} placeholder="Keywords (comma-separated)" />
            </div>
            <Button onClick={handleCreate} disabled={!canCreate} className="mt-2">Create Project</Button>
          </div>

          {/* Existing Projects */}
          <div>
            <div className="text-sm font-medium mb-2">Your Projects</div>
            <div className="space-y-3 max-h-80 overflow-y-auto">
              {projects.length === 0 && <div className="text-sm text-gray-500">No projects yet.</div>}
              {projects.map((p) => (
                <ProjectRow
                  key={p.title}
                  meta={p}
                  isCurrent={currentProject?.title === p.title}
                  onSetCurrent={() => onSetCurrent(p)}
                  onRemove={() => onRemove(p)}
                  onUpdate={(nextTitle, nextArea, nextObjectives, nextKeywords) => handleEdit(p, nextTitle, nextArea, nextObjectives, nextKeywords)}
                />
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

const ProjectRow: React.FC<{ meta: ProjectMeta; isCurrent: boolean; onSetCurrent: () => void; onRemove: () => void; onUpdate: (title: string, area: string, objectives: string, keywords: string) => void; }> = ({ meta, isCurrent, onSetCurrent, onRemove, onUpdate }) => {
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(meta.title);
  const [area, setArea] = useState(meta.area || '');
  const [objectives, setObjectives] = useState((meta.objectives || []).join(', '));
  const [keywords, setKeywords] = useState((meta.keywords || []).join(', '));

  return (
    <div className={`p-3 border rounded-lg ${isCurrent ? 'border-indigo-400 bg-indigo-50 dark:bg-indigo-900/20' : 'border-gray-200 dark:border-gray-700'}`}>
      <div className="flex items-center justify-between">
        <div className="text-sm font-medium">{meta.title}</div>
        <div className="flex items-center gap-2">
          <Button size="sm" variant="outline" onClick={onSetCurrent}>{isCurrent ? 'Current' : 'Set Current'}</Button>
          <Button size="sm" variant="ghost" className="text-red-600" onClick={onRemove}>Remove</Button>
          <Button size="sm" variant="secondary" onClick={() => setEditing((s) => !s)}>{editing ? 'Cancel' : 'Edit'}</Button>
        </div>
      </div>
      {editing && (
        <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-2">
          <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" />
          <Input value={area} onChange={(e) => setArea(e.target.value)} placeholder="Area" />
          <Input value={objectives} onChange={(e) => setObjectives(e.target.value)} placeholder="Objectives (comma-separated)" />
          <Input value={keywords} onChange={(e) => setKeywords(e.target.value)} placeholder="Keywords (comma-separated)" />
          <div className="col-span-full flex items-center gap-2">
            <Button size="sm" onClick={() => onUpdate(title, area, objectives, keywords)}>Save Changes</Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectSwitcher;
