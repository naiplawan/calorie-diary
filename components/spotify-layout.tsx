import React from 'react';
import { SpotifyNav } from '@/components/spotify-nav';

interface SpotifyLayoutProps {
  children: React.ReactNode;
  currentPath?: string;
}

export const SpotifyLayout: React.FC<SpotifyLayoutProps> = ({ children, currentPath }) => {
  return (
    <div className="min-h-screen bg-background spotify-scrollbar">
      <div className="flex gap-6 p-6">
        {/* Sidebar Navigation */}
        <aside className="w-80 flex-shrink-0">
          <SpotifyNav currentPath={currentPath} />
        </aside>

        {/* Main Content */}
        <main className="flex-1 min-w-0">
          <div className="spotify-backdrop rounded-2xl p-8 min-h-[calc(100vh-3rem)]">{children}</div>
        </main>
      </div>
    </div>
  );
};
