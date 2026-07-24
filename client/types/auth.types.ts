export interface User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
}

export interface AuthStore {
    user: User | null;
    isAuthenticated: boolean;
    setUser: (user: User) => void;
    clearUser: () => void;
}
