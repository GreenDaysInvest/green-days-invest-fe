import React from 'react';
import { Formik, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Modal from "../Modal/Modal";
import Input from "../Input/Input";
import Button from '../Button/Button';
import { auth, googleProvider, facebookProvider, appleProvider, getAuth, browserLocalPersistence, setPersistence, signInWithPopup } from '../../../../firebase';
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
            const loginResponse = await AuthService.login(values.email, values.password);
            const userProfile = await AuthService.getProfile();
            
            if (!userProfile) {
                throw new Error('Failed to fetch user profile');
            }

            setUser(userProfile);
            setIsLoginModalOpen(false);
            
            // Small delay to ensure state updates before navigation
            await new Promise(resolve => setTimeout(resolve, 100));
            router.push('/dashboard');
        } catch (error) {
            console.error('Login error:', error);
            const errorMessage = (error as Error)?.message || 'An unexpected error occurred.';
            showErrorToast(errorMessage);    
        }
    };

    const handleOAuthLogin = async (provider: any) => {
        try {
            const auth = getAuth();
            await setPersistence(auth, browserLocalPersistence);
            
            provider.setCustomParameters({
                prompt: 'select_account',
                redirect_uri: `${window.location.origin}/__/auth/handler`
            });
            
            const result = await signInWithPopup(auth, provider);
            const token = await result.user?.getIdToken();
            
            if (token) {
                await AuthService.loginWithFirebase(token);
                const userProfile = await AuthService.getProfile();
                
                if (!userProfile) {
                    throw new Error('Failed to fetch user profile');
                }

                setUser(userProfile);
                setIsLoginModalOpen(false);
                
                // Small delay to ensure state updates before navigation
                await new Promise(resolve => setTimeout(resolve, 100));
                router.push('/dashboard');
            }
        } catch (error) {
            console.error('OAuth login error:', error);
            const errorMessage = (error as Error)?.message || 'An unexpected error occurred.';
            showErrorToast(errorMessage);    
        }
    };

    return (
        <Modal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)}>
            <div className="bg-white p-0 sm:p-10 flex flex-col space-y-6">
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
