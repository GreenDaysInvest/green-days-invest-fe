import { Questionnaire } from "./Questionnaire.type";

export interface User {
    id?: string; // For normal users from your backend
    uid?: string; // For Firebase users
    name?: string;
    surname?: string;
    email?: string;
    phoneNumber?: string;
    birthdate?: string;
    password?: string;
    street?: string;
    city?: string;
    zip?: string;
    isAdmin?: boolean;
    questionnaires?: Questionnaire[]
    verificationStatus?: string;
    verificationDocumentUrl?: string;
    verificationDate?: string;
    stripeCustomerId?: string;
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
  