import React, { createContext, useContext, useState } from 'react';
import { UserProfile, UserPermissions, getRolePermissions } from '../types/users';
import { toast } from '@/components/ui/use-toast';

interface UserContextType {
  user: UserProfile | null;
  permissions: UserPermissions;
  login: (userData: UserProfile) => void;
  logout: () => void;
  updateProfile: (updates: Partial<UserProfile>) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserProfile | null>(null);

  const login = (userData: UserProfile) => {
    setUser(userData);
    toast({
      title: "Welcome back!",
      description: `Logged in as ${userData.firstName} ${userData.lastName}`,
    });
  };

  const logout = () => {
    setUser(null);
    toast({
      title: "Logged out",
      description: "Successfully logged out of your account",
    });
  };

  const updateProfile = (updates: Partial<UserProfile>) => {
    if (user) {
      setUser({ ...user, ...updates });
      toast({
        title: "Profile Updated",
        description: "Your profile has been successfully updated",
      });
    }
  };

  const permissions = user ? getRolePermissions(user.role) : getRolePermissions('cook');

  return (
    <UserContext.Provider value={{ user, permissions, login, logout, updateProfile }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};