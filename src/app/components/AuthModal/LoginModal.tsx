import React from 'react';
import { Formik, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Modal from "../Modal/Modal";
import Input from "../Input/Input";
import Button from '../Button/Button';
import { auth, googleProvider, facebookProvider, appleProvider } from '../../../../firebase';
import { signInWithPopup } from 'firebase/auth';
import { useApp } from '@/app/context/AppContext';
import { useRouter } from '@/i18n/routing';
import { FaGoogle, FaFacebook, FaApple } from 'react-icons/fa';
import AuthService from '@/app/services/authServices';
import { showErrorToast } from '@/app/utils/toast';
import { useAuth } from '@/app/context/AuthContext';

interface Props {}

const LoginModal: React.FC<Props> = () => {
    const router = useRouter();
    const { setUser } = useAuth();
    const { isLoginModalOpen, setIsLoginModalOpen, setIsRegisterModalOpen } = useApp();

    const loginValidationSchema = Yup.object({
        email: Yup.string().email('Invalid email').required('Required'),
        password: Yup.string().min(6, 'Password must be at least 6 characters').required('Required'),
    });

    const handleNormalLogin = async (values: { email: string; password: string }) => {
        try {
            const token = await AuthService.login(values.email, values.password);
            console.log('Logged in successfully with token:', token);
            const userProfile = await AuthService.getProfile();
            console.log('User profile:', userProfile);

            setUser(userProfile);

            router.push('/dashboard');
            setIsLoginModalOpen(false);
        } catch (error) {
            const errorMessage = (error as Error).message || 'An unexpected error occurred.';
            showErrorToast(errorMessage);    
        }
    };

    const handleOAuthLogin = async (provider: any) => {
        try {
            const result = await signInWithPopup(auth, provider);
                setIsLoginModalOpen(false);
            // const token = await result.user?.getIdToken(); // Get the Firebase ID token
            // if (token) {
            //     const response = await AuthService.loginWithFirebase(token);
            //     console.log('Logged in successfully with OAuth, token:', response);
            //     router.push('/dashboard'); // Redirect to the dashboard
            //     setIsLoginModalOpen(false);
            // }
        } catch (error) {
            const errorMessage = (error as Error).message || 'An unexpected error occurred.';
            showErrorToast(errorMessage);    
        }
    };

    return (
        <Modal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)}>
            <div className="bg-white p-10 flex flex-col space-y-6">
                <h2 className="text-4xl text-main text-center font-semibold mb-4">Login</h2>

                <Formik
                    initialValues={{ email: '', password: '' }}
                    validationSchema={loginValidationSchema}
                    onSubmit={handleNormalLogin}
                >
                    {() => (
                        <Form className='flex flex-col'>
                            <Input
                                name="email"
                                type="email"
                                placeholder="Email"
                            />
                            <Input
                                name="password"
                                type="password"
                                placeholder="Password"
                            />

                            <Button type="submit" label="Login" variant="secondary" />

                            <Button  
                                onClick={() => {
                                    setIsLoginModalOpen(false);
                                    setIsRegisterModalOpen(true);
                                }} 
                                variant='link' 
                                label='Need to register?'
                                className='text-left ps-0'
                            />

                            <div className="mt-6 flex flex-col justify-center gap-4">
                                <Button
                                    type="button"
                                    label="Login with Google"
                                    onClick={() => handleOAuthLogin(googleProvider)}
                                    variant="icon"
                                    icon={<FaGoogle />}
                                />
                                <Button
                                    type="button"
                                    label="Login with Facebook"
                                    onClick={() => handleOAuthLogin(facebookProvider)}
                                    variant="icon"
                                    icon={<FaFacebook />}
                                />
                                <Button
                                    type="button"
                                    label="Login with iCloud"
                                    onClick={() => handleOAuthLogin(appleProvider)}
                                    variant="icon"
                                    icon={<FaApple />}
                                />
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </Modal>
    );
};

export default LoginModal;
