import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import type { Session, User } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';

const SUPABASE_CONFIG_ERROR = 'Supabase is not configured. Please add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to your environment.';

type AuthContextValue = {
  user: User | null;
  session: Session | null;
  authLoading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    const client = supabase;
    if (!client) {
      console.warn(SUPABASE_CONFIG_ERROR);
      setAuthLoading(false);
      return;
    }

    let isMounted = true;

    const initSession = async () => {
      setAuthLoading(true);
      const { data, error } = await client.auth.getSession();
      if (error) {
        console.error('Failed to get session', error);
      }
      if (!isMounted) return;
      setSession(data.session);
      setUser(data.session?.user ?? null);
      setAuthLoading(false);
    };

    initSession();

    const {
      data: { subscription },
    } = client.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession);
      setUser(newSession?.user ?? null);
      setAuthLoading(false);
    });

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const signIn = async (email: string, password: string) => {
    const client = supabase;
    if (!client) {
      throw new Error(SUPABASE_CONFIG_ERROR);
    }
    setAuthLoading(true);
    const { error } = await client.auth.signInWithPassword({ email, password });
    if (error) {
      setAuthLoading(false);
      throw error;
    }
  };

  const signUp = async (email: string, password: string) => {
    const client = supabase;
    if (!client) {
      throw new Error(SUPABASE_CONFIG_ERROR);
    }
    setAuthLoading(true);
    const { error } = await client.auth.signUp({ email, password });
    if (error) {
      setAuthLoading(false);
      throw error;
    }
  };

  const signOut = async () => {
    const client = supabase;
    if (!client) {
      throw new Error(SUPABASE_CONFIG_ERROR);
    }
    setAuthLoading(true);
    const { error } = await client.auth.signOut();
    if (error) {
      setAuthLoading(false);
      throw error;
    }
  };

  const value = useMemo(
    () => ({
      user,
      session,
      authLoading,
      signIn,
      signUp,
      signOut,
    }),
    [user, session, authLoading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

