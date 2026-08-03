import React, { createContext, useContext, useState, useEffect } from 'react';
import AuthService, { User } from '../Services/AuthService';

type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  signIn: (username: string, password: string) => Promise<{ success: boolean; message?: string }>;
  signUp: (payload: Parameters<typeof AuthService.signUp>[0]) => Promise<{ success: boolean; message?: string }>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }): React.JSX.Element {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check if a session already exists when the app launches
  useEffect(() => {
    AuthService.currentUser()
      .then((res) => {
        if (res.status === 'success' && res.data) {
          setUser(res.data);
        }
      })
      .finally(() => setIsLoading(false));
  }, []);

  const signIn = async (username: string, password: string) => {
    const res = await AuthService.signIn({ username, password });
    if (res.status === 'success' && res.data) {
      setUser(res.data);
      return { success: true };
    }
    return { success: false, message: res.message };
  };

  const signUp = async (payload: Parameters<typeof AuthService.signUp>[0]) => {
    const res = await AuthService.signUp(payload);
    if (res.status === 'success' && res.data) {
      setUser(res.data);
      return { success: true };
    }
    return { success: false, message: res.message };
  };

  const signOut = async () => {
    await AuthService.signOut();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
}