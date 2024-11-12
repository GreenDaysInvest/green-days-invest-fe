"use client";
import React from 'react';
import { Formik, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Modal from "../Modal/Modal";
import Input from "../Input/Input";
import Button from '../Button/Button';
import { auth, googleProvider, facebookProvider, appleProvider } from '../../../../firebase';
import { signInWithPopup, AuthProvider } from 'firebase/auth';
import { useRouter } from '@/i18n/routing';
import { useApp } from '@/app/context/AppContext';
import { useTranslations } from 'next-intl';
import { FaGoogle, FaFacebook, FaApple } from 'react-icons/fa';
import AuthService from '@/app/services/authServices';
import { User } from '@/app/types/Auth.type';
import { v4 as uuidv4 } from 'uuid';

interface Props {}

const RegisterModal: React.FC<Props> = () => {
    const router = useRouter();
    const t = useTranslations('Validations');
    const { isRegisterModalOpen, setIsRegisterModalOpen, setIsLoginModalOpen } = useApp();

    const registerValidationSchema = Yup.object({
        name: Yup.string().required(t('required')),
        surname: Yup.string().required(t('required')),
        email: Yup.string().email('Invalid email').required(t('required')),
        phoneNumber: Yup.string().required(t('required')),
        password: Yup.string().min(6, t('passwordSixChars')).required(t('required')),
        repeatPassword: Yup.string()
            .oneOf([Yup.ref('password'), undefined], t('passwordMustMatch'))
            .required(t('required')),
    });

    const handleRegistration = async (values: {
        name: string;
        surname: string;
        email: string;
        phoneNumber: string;
        password: string;
    }) => {
        try {

            const uid = uuidv4();
            // Send registration data to your backend
            await AuthService.register({
                uid: uid,
                name: values.name,
                surname: values.surname,
                email: values.email,
                phoneNumber: values.phoneNumber,
                password: values.password,
                isAdmin: false
            });

            setIsRegisterModalOpen(false);
            setIsLoginModalOpen(true)
        } catch (error) {
            console.error('Registration error:', error);
            // Handle error (e.g., show a notification)
        }
    };

    const handleOAuthRegister = async (provider: AuthProvider) => {
        try {
            const result = await signInWithPopup(auth, provider);
            const userData: User = {
                uid: result.user.uid,
                name: result.user.displayName?.split(' ')[0] || '',
                surname: result.user.displayName?.split(' ').slice(1).join(' ') || '',
                email: String(result?.user?.email),
                phoneNumber: '', // Optionally gather phone number if necessary
                isAdmin: false
            };

            // Send registration data to your backend
            const response = await AuthService.register(userData as User);

            setIsRegisterModalOpen(false);
            setIsLoginModalOpen(true)
        } catch (error) {
            console.error('Error registering with provider:', error);
            // Handle error (e.g., show a notification)
        }
    };

    return (
        <Modal isOpen={isRegisterModalOpen} onClose={() => setIsRegisterModalOpen(false)}>
            <div className="bg-white p-10 flex flex-col space-y-4">
                <h2 className="text-4xl text-main text-center font-semibold mb-4">Register</h2>

                <Formik
                    initialValues={{
                        name: '',
                        surname: '',
                        email: '',
                        phoneNumber: '',
                        password: '',
                        repeatPassword: ''
                    }}
                    validationSchema={registerValidationSchema}
                    onSubmit={handleRegistration}
                >
                    {() => (
                        <Form className='flex flex-col'>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <Input name="name" type="text" placeholder="Name" />
                                    <ErrorMessage name="name" component="div" className="text-red-500 text-sm" />
                                </div>

                                <div>
                                    <Input name="surname" type="text" placeholder="Surname" />
                                    <ErrorMessage name="surname" component="div" className="text-red-500 text-sm" />
                                </div>
                            </div>

                            <div>
                                <Input name="email" type="email" placeholder="Email" />
                                <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
                            </div>

                            <div>
                                <Input name="phoneNumber" type="tel" placeholder="Phone number" />
                                <ErrorMessage name="phoneNumber" component="div" className="text-red-500 text-sm" />
                            </div>

                            <div>
                                <Input name="password" type="password" placeholder="Password" />
                                <ErrorMessage name="password" component="div" className="text-red-500 text-sm" />
                            </div>

                            <div>
                                <Input
                                    name="repeatPassword"
                                    type="password"
                                    placeholder="Repeat your password"
                                />
                                <ErrorMessage name="repeatPassword" component="div" className="text-red-500 text-sm" />
                            </div>

                            <Button type="submit" label="Register" variant="secondary" />
                            <Button  
                                onClick={() => {
                                    setIsLoginModalOpen(true);
                                    setIsRegisterModalOpen(false);
                                }} 
                                variant='link' 
                                label='Go to Log in'
                                className='text-left ps-0'
                            />

                            <div className="mt-6 flex flex-col justify-center gap-4">
                                <Button
                                    type="button"
                                    label="Sign up with Google"
                                    onClick={() => handleOAuthRegister(googleProvider)}
                                    variant="icon"
                                    icon={<FaGoogle />}
                                />
                                <Button
                                    type="button"
                                    label="Sign up with Facebook"
                                    onClick={() => handleOAuthRegister(facebookProvider)}
                                    variant="icon"
                                    icon={<FaFacebook />}
                                />
                                <Button
                                    type="button"
                                    label="Sign up with iCloud"
                                    onClick={() => handleOAuthRegister(appleProvider)}
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

export default RegisterModal;
