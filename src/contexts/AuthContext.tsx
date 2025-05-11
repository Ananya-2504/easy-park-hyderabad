
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { toast } from "sonner";

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  vehicleNumber: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (name: string, email: string, phone: string, vehicleNumber: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if user is already logged in from localStorage
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      // Mock login - in real app, this would be an API call
      if (email && password) {
        // Mock user data - in real app, this would come from backend
        const mockUser = {
          id: "user123",
          name: "User",
          email: email,
          phone: "9876543210",
          vehicleNumber: "AP 12 AB 1234",
        };
        
        setUser(mockUser);
        setIsAuthenticated(true);
        localStorage.setItem("user", JSON.stringify(mockUser));
        toast.success("Login successful");
        return true;
      }
      toast.error("Invalid email or password");
      return false;
    } catch (error) {
      toast.error("Login failed. Please try again.");
      return false;
    }
  };

  const signup = async (
    name: string,
    email: string,
    phone: string,
    vehicleNumber: string,
    password: string
  ): Promise<boolean> => {
    try {
      // Mock signup - in real app, this would be an API call
      if (name && email && phone && vehicleNumber && password) {
        // Mock user data - in real app, this would come from backend
        const mockUser = {
          id: "user123",
          name,
          email,
          phone,
          vehicleNumber,
        };
        
        setUser(mockUser);
        setIsAuthenticated(true);
        localStorage.setItem("user", JSON.stringify(mockUser));
        toast.success("Signup successful");
        return true;
      }
      toast.error("Please fill all fields");
      return false;
    } catch (error) {
      toast.error("Signup failed. Please try again.");
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem("user");
    toast.success("Logged out successfully");
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
