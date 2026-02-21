import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useProject } from '@/contexts/ProjectContext';
import { LogOut, User, Menu, X, LayoutDashboard, FolderPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ProjectSwitcher from '@/components/projects/ProjectSwitcher';

const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { currentProject, projects, setCurrentProject, createProject, removeProject, updateProject } = useProject();
  const [projectModalOpen, setProjectModalOpen] = useState(false);

  const handleSignOut = async () => {
    try {
      await Promise.resolve(logout());
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm dark:bg-gray-800 dark:border-gray-700">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Enhanced Logo - Bigger and More Prominent */}
          <Link to="/" className="flex items-center space-x-4 transition-all duration-300 transform hover:opacity-80 hover:scale-105">
            <img 
              src="/1-QASH ARIS_Profile Photo.png" 
              alt="Qash Aris - DrPhDAI Founder" 
              className="object-cover w-16 h-16 transition-all duration-300 shadow-xl rounded-2xl hover:shadow-2xl"
            />
            <div className="flex flex-col">
              <span className="text-2xl font-bold text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 bg-clip-text">
                DrPhDAI
              </span>
              <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Your Empathetic AI PhD Coach
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="items-center hidden space-x-8 md:flex">
            <Link to="/app/root" className="font-medium text-gray-700 transition-colors dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">
              R.O.O.T
            </Link>
            <Link to="/starter-kit" className="font-medium text-gray-700 transition-colors dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">
              PhD Starter
            </Link>
            <Link to="/app/ai-tools" className="font-medium text-gray-700 transition-colors dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">
              AI Tools
            </Link>
            <Link to="/app/store" className="font-medium text-gray-700 transition-colors dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">
              Store
            </Link>
            {/* Projects Quick Switcher */}
            <div className="flex items-center gap-2">
              <select
                value={currentProject?.title || ''}
                onChange={(e) => {
                  const meta = projects.find(p => p.title === e.target.value);
                  if (meta) setCurrentProject(meta);
                }}
                className="px-2 py-1 text-sm text-gray-700 bg-white border border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
              >
                <option value="">No Project</option>
                {projects.map(p => (
                  <option key={p.title} value={p.title}>{p.title}</option>
                ))}
              </select>
              <Button variant="outline" size="sm" onClick={() => setProjectModalOpen(true)} className="inline-flex items-center gap-1">
                <FolderPlus className="w-4 h-4" />
                Projects
              </Button>
            </div>
          </nav>

          {/* User Menu */}
          <div className="flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-3">
                <Link
                  to="/app"
                  className="flex items-center px-4 py-2 space-x-2 font-medium text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700"
                >
                  <LayoutDashboard size={16} />
                  <span>Dashboard</span>
                </Link>
                <div className="flex items-center space-x-2">
                  <User className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                  <span className="hidden text-sm text-gray-700 dark:text-gray-300 sm:block">
                    {user.username}
                  </span>
                </div>
                <button
                  onClick={handleSignOut}
                  className="text-gray-600 transition-colors dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400"
                  title="Sign Out"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link
                  to="/auth"
                  className="font-medium text-gray-700 transition-colors dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                >
                  Sign In
                </Link>
                <Link
                  to="/auth"
                  className="px-4 py-2 font-medium text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700"
                >
                  Get Started
                </Link>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMobileMenu}
              className="text-gray-600 transition-colors md:hidden dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="py-4 border-t border-gray-200 md:hidden dark:border-gray-700">
            <nav className="flex flex-col space-y-3">
              <Link
                to="/app/root"
                className="px-2 py-1 font-medium text-gray-700 transition-colors dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                R.O.O.T
              </Link>
              <Link
                to="/starter-kit"
                className="px-2 py-1 font-medium text-gray-700 transition-colors dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                PhD Starter
              </Link>
              <Link
                to="/app/ai-tools"
                className="px-2 py-1 font-medium text-gray-700 transition-colors dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                AI Tools
              </Link>
              <Link
                to="/app/store"
                className="px-2 py-1 font-medium text-gray-700 transition-colors dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Store
              </Link>
              <a
                href="https://forms.gle/Di28bZsBS6JERncg6"
                target="_blank"
                rel="noopener noreferrer"
                className="px-2 py-1 font-medium text-gray-700 transition-colors dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Register
              </a>
              {user && (
                <Link
                  to="/app"
                  className="flex items-center px-4 py-2 mx-2 space-x-2 font-medium text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <LayoutDashboard size={16} />
                  <span>Dashboard</span>
                </Link>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
    <ProjectSwitcher
      open={projectModalOpen}
      onOpenChange={setProjectModalOpen}
      projects={projects}
      currentProject={currentProject}
      onCreate={(meta) => { createProject({ title: meta.title, objectives: meta.objectives, area: meta.area, keywords: meta.keywords }); }}
      onSetCurrent={(meta) => setCurrentProject(meta)}
      onRemove={(meta) => removeProject(meta)}
      onUpdate={(prev, next) => updateProject(prev, next)}
    />
    </>
  );
};

export default Header;