import { createContext, useContext, useMemo, useState, ReactNode, useEffect } from 'react';

interface User {
  id: string;
  username: string;
  role: 'owner' | 'supervisor';
}

interface UserProfile {
  full_name?: string;
  institution?: string;
  department?: string;
  phone?: string;
}

interface StoredUser {
  id: string;
  username: string;
  role: 'owner' | 'supervisor';
  passwordHash: string;
  passwordSalt: string;
  createdAt: string;
  profile: UserProfile;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  userProfile: UserProfile | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  signup: (username: string, password: string, profile: UserProfile) => Promise<boolean>;
  updateProfile: (profile: UserProfile) => Promise<{ error: null | { message: string } }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const USERS_STORAGE_KEY = 'local-auth-users-v1';
const SESSION_STORAGE_KEY = 'local-auth-session-v1';

const ALLOWED_USERS: Array<{ username: string; role: 'owner' | 'supervisor' }> = [
  { username: 'fauziyahmdarisakaqasharis', role: 'owner' },
  { username: 'supervisorqash', role: 'supervisor' }
];

const OWNER_PASSWORD_ENV = import.meta.env.VITE_OWNER_PASSWORD;
const SUPERVISOR_PASSWORD_ENV = import.meta.env.VITE_SUPERVISOR_PASSWORD;

const toHex = (buffer: ArrayBuffer) =>
  Array.from(new Uint8Array(buffer))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');

const sha256 = async (text: string) => {
  const encoder = new TextEncoder();
  const data = encoder.encode(text);
  const digest = await crypto.subtle.digest('SHA-256', data);
  return toHex(digest);
};

const randomSalt = () => {
  const bytes = crypto.getRandomValues(new Uint8Array(16));
  return Array.from(bytes)
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
};

const hashPassword = async (password: string, salt: string) => {
  return sha256(`${salt}:${password}`);
};

const readUsers = (): Record<string, StoredUser> => {
  try {
    const raw = localStorage.getItem(USERS_STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === 'object' ? parsed : {};
  } catch {
    return {};
  }
};

const writeUsers = (users: Record<string, StoredUser>) => {
  localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
};

const ensureSeededUsers = async () => {
  const users = readUsers();
  let changed = false;

  const now = new Date().toISOString();

  const seedOne = async (
    username: string,
    role: 'owner' | 'supervisor',
    passwordFromEnv?: string
  ) => {
    if (users[username]) return;
    const salt = randomSalt();
    const password = passwordFromEnv || 'CHANGE_ME';
    const passwordHash = await hashPassword(password, salt);
    users[username] = {
      id: crypto.randomUUID(),
      username,
      role,
      passwordHash,
      passwordSalt: salt,
      createdAt: now,
      profile: {}
    };
    changed = true;
  };

  await seedOne('fauziyahmdarisakaqasharis', 'owner', OWNER_PASSWORD_ENV);
  await seedOne('supervisorqash', 'supervisor', SUPERVISOR_PASSWORD_ENV);

  if (changed) writeUsers(users);
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  const allowedUsernames = useMemo(() => new Set(ALLOWED_USERS.map((u) => u.username)), []);

  useEffect(() => {
    const boot = async () => {
      await ensureSeededUsers();

      const sessionRaw = localStorage.getItem(SESSION_STORAGE_KEY);
      if (!sessionRaw) return;

      try {
        const session = JSON.parse(sessionRaw) as { username: string };
        const users = readUsers();
        const stored = users[session.username];
        if (!stored) return;

        setUser({ id: stored.id, username: stored.username, role: stored.role });
        setUserProfile(stored.profile || null);
        setIsAuthenticated(true);
      } catch {
        localStorage.removeItem(SESSION_STORAGE_KEY);
      }
    };

    void boot();
  }, []);

  const login = async (username: string, password: string): Promise<boolean> => {
    try {
      await ensureSeededUsers();

      if (!allowedUsernames.has(username)) return false;

      const users = readUsers();
      const stored = users[username];
      if (!stored) return false;

      const attemptHash = await hashPassword(password, stored.passwordSalt);
      if (attemptHash !== stored.passwordHash) return false;

      const nextUser: User = { id: stored.id, username: stored.username, role: stored.role };
      setUser(nextUser);
      setUserProfile(stored.profile || null);
      setIsAuthenticated(true);
      localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify({ username: stored.username }));
      return true;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    setUserProfile(null);
    setIsAuthenticated(false);
    localStorage.removeItem(SESSION_STORAGE_KEY);
  };

  const signup = async (username: string, password: string, profile: UserProfile): Promise<boolean> => {
    try {
      await ensureSeededUsers();

      if (!allowedUsernames.has(username)) return false;
      if (!profile?.phone || !/^\+601/.test(profile.phone)) return false;

      const role = ALLOWED_USERS.find((u) => u.username === username)?.role;
      if (!role) return false;

      const users = readUsers();
      if (users[username]) {
        // Already exists; do not overwrite.
        return false;
      }

      const salt = randomSalt();
      const passwordHash = await hashPassword(password, salt);
      users[username] = {
        id: crypto.randomUUID(),
        username,
        role,
        passwordHash,
        passwordSalt: salt,
        createdAt: new Date().toISOString(),
        profile
      };
      writeUsers(users);

      const nextUser: User = { id: users[username].id, username, role };
      setUser(nextUser);
      setUserProfile(profile);
      setIsAuthenticated(true);
      localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify({ username }));
      return true;
    } catch (error) {
      console.error('Signup error:', error);
      return false;
    }
  };

  const updateProfile = async (profile: UserProfile) => {
    try {
      if (!user) return { error: { message: 'No user logged in' } };
      const users = readUsers();
      const stored = users[user.username];
      if (!stored) return { error: { message: 'User not found' } };
      stored.profile = { ...(stored.profile || {}), ...(profile || {}) };
      users[user.username] = stored;
      writeUsers(users);
      setUserProfile(stored.profile);
      return { error: null };
    } catch (e: any) {
      return { error: { message: e?.message || 'Failed to update profile' } };
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated,
      userProfile,
      login,
      logout,
      signup,
      updateProfile
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}