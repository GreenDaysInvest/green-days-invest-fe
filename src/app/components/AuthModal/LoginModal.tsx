"use client";
import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Modal from "../Modal/Modal";
import Input from "../Input/Input";
import Button from '../Button/Button';
import { auth, googleProvider, facebookProvider, appleProvider } from '../../../../firebase.ts';
import { signInWithPopup } from 'firebase/auth';
import { useApp } from '@/app/context/AppContext.tsx';
import { useRouter } from '@/i18n/routing.ts';
import { FaGoogle, FaFacebook, FaApple } from 'react-icons/fa';

interface Props {
}

const LoginModal: React.FC<Props> = () => {

    const router = useRouter();
    const { isLoginModalOpen, setIsLoginModalOpen, setIsRegisterModalOpen } = useApp()

    const loginValidationSchema = Yup.object({
        email: Yup.string().email('Invalid email').required('Required'),
        password: Yup.string().min(6, 'Password must be at least 6 characters').required('Required'),
    });

    const handleOAuthLogin = async (provider: any) => {
        try {
            const result = await signInWithPopup(auth, provider);
            router.push('/dashboard');
            setIsLoginModalOpen(false);
        } catch (error) {
            console.error('Error logging in with provider:', error);
        }
    };

    return (
        <Modal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)}>
            <div className="bg-white p-10 flex flex-col space-y-6">
                <h2 className="text-4xl text-main text-center font-semibold mb-4">Login</h2>

                <Formik
                    initialValues={{ email: '', password: '' }}
                    validationSchema={loginValidationSchema}
                    onSubmit={(values) => {
                        console.log('Login values:', values);
                    }}
                >
                    {() => (
                        <Form className='flex flex-col'>
                            <div className='mb-4'>
                                <Field
                                    name="email"
                                    type="email"
                                    placeholder="Email"
                                    as={Input}
                                />
                                <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
                            </div>

                            <div className='mb-4'>
                                <Field
                                    name="password"
                                    type="password"
                                    placeholder="Password"
                                    as={Input}
                                />
                                <ErrorMessage name="password" component="div" className="text-red-500 text-sm" />
                            </div>

                            <Button type="submit" label="Login" variant="secondary" />

                            <Button  
                                onClick={() => {
                                    setIsLoginModalOpen(false)
                                    setIsRegisterModalOpen(true)
                                }} 
                                variant='link' 
                                label='Need to register?'
                                className='text-left ps-0'
                            />

                            <div className="mt-6 flex flex-col justify-center gap-2">
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
