import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface User {
  id: string;
  email: string;
  name: string;
  organizationId?: string;
  role: 'admin' | 'user' | 'super_admin';
}

export interface Organization {
  id: string;
  name: string;
  subdomain: string;
  logo?: string;
  primaryColor?: string;
  secondaryColor?: string;
  customDomain?: string;
  plan: 'free' | 'pro' | 'enterprise';
  status: 'active' | 'suspended' | 'trial';
}

interface AuthContextType {
  user: User | null;
  organization: Organization | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string, organizationName?: string) => Promise<void>;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
  updateOrganization: (orgData: Partial<Organization>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [organization, setOrganization] = useState<Organization | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Mock organizations for development
  const mockOrganizations: Organization[] = [
    {
      id: 'villa-eventos',
      name: 'Villa Eventos',
      subdomain: 'villa',
      primaryColor: '263 70% 50%',
      secondaryColor: '280 70% 60%',
      plan: 'pro',
      status: 'active'
    },
    {
      id: 'buffet-alegria',
      name: 'Buffet Alegria',
      subdomain: 'alegria',
      primaryColor: '120 70% 50%',
      secondaryColor: '140 70% 60%',
      plan: 'free',
      status: 'active'
    },
    {
      id: 'centro-convencoes',
      name: 'Centro de Convenções Premium',
      subdomain: 'premium',
      primaryColor: '210 70% 50%',
      secondaryColor: '230 70% 60%',
      plan: 'enterprise',
      status: 'active'
    }
  ];

  useEffect(() => {
    // Check for saved session
    const savedUser = localStorage.getItem('user');
    const savedOrg = localStorage.getItem('organization');
    
    if (savedUser && savedOrg) {
      setUser(JSON.parse(savedUser));
      setOrganization(JSON.parse(savedOrg));
    }
    
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // Mock login - replace with real authentication
      const mockUser: User = {
        id: '1',
        email,
        name: email.split('@')[0],
        organizationId: 'villa-eventos',
        role: 'admin'
      };
      
      const userOrg = mockOrganizations.find(org => org.id === mockUser.organizationId);
      
      setUser(mockUser);
      setOrganization(userOrg || null);
      
      localStorage.setItem('user', JSON.stringify(mockUser));
      localStorage.setItem('organization', JSON.stringify(userOrg));
    } catch (error) {
      throw new Error('Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (email: string, password: string, name: string, organizationName?: string) => {
    setIsLoading(true);
    try {
      // Mock registration - replace with real authentication
      const newOrg: Organization = organizationName ? {
        id: organizationName.toLowerCase().replace(/\s+/g, '-'),
        name: organizationName,
        subdomain: organizationName.toLowerCase().replace(/\s+/g, ''),
        primaryColor: '263 70% 50%',
        secondaryColor: '280 70% 60%',
        plan: 'free',
        status: 'trial'
      } : mockOrganizations[0];

      const newUser: User = {
        id: Date.now().toString(),
        email,
        name,
        organizationId: newOrg.id,
        role: organizationName ? 'admin' : 'user'
      };
      
      setUser(newUser);
      setOrganization(newOrg);
      
      localStorage.setItem('user', JSON.stringify(newUser));
      localStorage.setItem('organization', JSON.stringify(newOrg));
    } catch (error) {
      throw new Error('Registration failed');
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setOrganization(null);
    localStorage.removeItem('user');
    localStorage.removeItem('organization');
  };

  const updateUser = (userData: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...userData };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
    }
  };

  const updateOrganization = (orgData: Partial<Organization>) => {
    if (organization) {
      const updatedOrg = { ...organization, ...orgData };
      setOrganization(updatedOrg);
      localStorage.setItem('organization', JSON.stringify(updatedOrg));
      
      // Apply theme changes
      const root = document.documentElement;
      if (updatedOrg.primaryColor) {
        root.style.setProperty('--primary', updatedOrg.primaryColor);
      }
      if (updatedOrg.secondaryColor) {
        root.style.setProperty('--primary-glow', updatedOrg.secondaryColor);
      }
    }
  };

  const value: AuthContextType = {
    user,
    organization,
    isLoading,
    login,
    register,
    logout,
    updateUser,
    updateOrganization
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};