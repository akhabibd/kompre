'use client';

import { UserProfile } from '@/types/loan-application';

interface SidebarProps {
  user: UserProfile;
}

export default function Sidebar({ user }: SidebarProps) {
  return (
    <div className="bg-card border border-border rounded-lg shadow-lg p-6 sticky top-6">
      {/* User Profile */}
      <div className="flex items-center gap-4 mb-6">
        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
          {user.avatar ? (
            <img
              src={user.avatar}
              alt={user.name}
              className="w-full h-full rounded-full object-cover"
            />
          ) : (
            <span className="text-2xl font-bold text-primary">
              {user.name.charAt(0).toUpperCase()}
            </span>
          )}
        </div>
        <div>
          <h3 className="text-lg font-semibold text-foreground">{user.name}</h3>
          <p className="text-sm text-muted-foreground">{user.phone}</p>
        </div>
      </div>

      {/* Profile Details */}
      <div className="space-y-4 border-t border-border pt-4">
        <div>
          <p className="text-xs text-muted-foreground mb-1">Email</p>
          <p className="text-sm text-foreground font-medium">{user.email}</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground mb-1">Nomor HP</p>
          <p className="text-sm text-foreground font-medium">{user.phone}</p>
        </div>
      </div>

      {/* Info Box */}
      <div className="mt-6 bg-primary/10 rounded-lg p-4 border border-primary/20">
        <div className="flex items-start gap-2">
          <svg
            className="w-5 h-5 text-primary flex-shrink-0 mt-0.5"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
              clipRule="evenodd"
            />
          </svg>
          <div>
            <p className="text-xs font-medium text-foreground mb-1">
              Status Pengajuan
            </p>
            <p className="text-xs text-muted-foreground">
              Anda dapat memantau status pengajuan pada halaman tracker
            </p>
          </div>
        </div>
      </div>

      {/* Help */}
      <div className="mt-6 pt-4 border-t border-border">
        <p className="text-xs text-muted-foreground mb-2">Butuh bantuan?</p>
        <a
          href="tel:14017"
          className="text-sm text-primary hover:text-primary-600 font-medium flex items-center gap-1"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
          </svg>
          Hubungi 14017 (BRI Call)
        </a>
      </div>
    </div>
  );
}
