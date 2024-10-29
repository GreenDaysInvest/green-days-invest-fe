"use client";
import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Modal from "../Modal/Modal";
import Input from "../Input/Input";
import Button from '../Button/Button';
import { auth, googleProvider, facebookProvider, appleProvider } from '../../../../firebase';
import { createUserWithEmailAndPassword, signInWithPopup, AuthProvider } from 'firebase/auth';
import { useRouter } from '@/i18n/routing';
import { useApp } from '@/app/context/AppContext';
import { useTranslations } from 'next-intl';
import { FaGoogle, FaFacebook, FaApple } from 'react-icons/fa';

interface Props {
}

const RegisterModal: React.FC<Props> = ({  }) => {
    const router = useRouter();
    const t = useTranslations('Validations')
    const { isRegisterModalOpen, setIsRegisterModalOpen, setIsLoginModalOpen } = useApp()

    const registerValidationSchema = Yup.object({
        name: Yup.string().required(t('required')),
        surname: Yup.string().required(t('required')),
        email: Yup.string().email('Invalid email').required(t('required')),
        phoneNumber: Yup.string().required(t('required')),
        password: Yup.string().min(6, t('passowrdSixChars')).required(t('required')),
        repeatPassword: Yup.string()
            .oneOf([Yup.ref('password'), undefined], t('passwordMustMatch'))
            .required(t('required')),
    });

    const handleOAuthRegister = async (provider: AuthProvider) => {
        try {
            const result = await signInWithPopup(auth, provider);
    
            const displayName = result.user.displayName || '';
            const [name, ...surnameParts] = displayName.split(' ');
            const surname = surnameParts.join(' ');
    
            const response = await fetch('http://localhost:3000/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    uid: result.user.uid,
                    name,
                    surname,
                    email: result.user.email,
                    phoneNumber: '',
                }),
            });
    
            if (response.status === 409) {
                alert('This account already exists. Please log in.');
                setIsLoginModalOpen(true);
                setIsRegisterModalOpen(false);
                return;
            }
    
            if (!response.ok) {
                throw new Error('Registration failed');
            }
    
            setIsRegisterModalOpen(false);
            router.push('/dashboard');
        } catch (error) {
            console.error('Error registering with provider:', error);
        }
    };
    

    const handleFormSubmit = async (values: {
        name: string;
        surname: string;
        email: string;
        phoneNumber: string;
        password: string;
        repeatPassword: string;
    }) => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, values.email, values.password);
    
            await fetch('http://localhost:3000/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    uid: userCredential.user.uid,
                    name: values.name,
                    surname: values.surname,
                    email: values.email,
                    phoneNumber: values.phoneNumber,
                    password: values.password,
                }),
            });
    
            setIsRegisterModalOpen(false);
            router.push('/dashboard');
        } catch (error) {
            console.error('Registration error:', error);
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
                    onSubmit={handleFormSubmit}
                >
                    {() => (
                        <Form className='flex flex-col'>
                            <div className="grid grid-cols-2 gap-4">
                                <div className='mb-4'>
                                    <Field name="name" type="text" placeholder="Name" component={Input} />
                                    <ErrorMessage name="name" component="div" className="text-red-500 text-sm" />
                                </div>

                                <div className='mb-4'>
                                    <Field name="surname" type="text" placeholder="Surname" component={Input} />
                                    <ErrorMessage name="surname" component="div" className="text-red-500 text-sm" />
                                </div>
                            </div>

                            <div className='mb-4'>
                                <Field name="email" type="email" placeholder="Email" component={Input} />
                                <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
                            </div>

                            <div className='mb-4'>
                                <Field name="phoneNumber" type="tel" placeholder="Phone number" component={Input} />
                                <ErrorMessage name="phoneNumber" component="div" className="text-red-500 text-sm" />
                            </div>

                            <div className='mb-4'>
                                <Field name="password" type="password" placeholder="Password" component={Input} />
                                <ErrorMessage name="password" component="div" className="text-red-500 text-sm" />
                            </div>

                            <div className='mb-4'>
                                <Field
                                    name="repeatPassword"
                                    type="password"
                                    placeholder="Repeat your password"
                                    component={Input}
                                />
                                <ErrorMessage name="repeatPassword" component="div" className="text-red-500 text-sm" />
                            </div>

                            <Button type="submit" label="Register" variant="secondary" />
                            <Button  
                                onClick={() => {
                                    setIsLoginModalOpen(true)
                                    setIsRegisterModalOpen(false)
                                }} 
                                variant='link' 
                                label='Go to Log in'
                                className='text-left ps-0'
                            />

                            <div className="mt-6 flex flex-col justify-center gap-2">
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
