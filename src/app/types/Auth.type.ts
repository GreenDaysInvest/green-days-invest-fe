import { Questionnaire } from "./Questionnaire.type";

export interface User {
    id?: string; // For normal users from your backend
    uid?: string; // For Firebase users
    name?: string;
    surname?: string;
    email?: string;
    phoneNumber?: string;
    password?: string;
    street?: string;
    country?: string;
    zip?: string;
    isAdmin?: boolean;
    questionnaires?: Questionnaire[]
    verificationStatus?: string;
}

export interface AuthContextType {
    user: User | null;
    loading: boolean;
    setUser: (user: User | null) => void;
}
  
export interface LoginData {
    email: string;
    password: string;
}
  