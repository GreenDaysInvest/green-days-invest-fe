"use client";
import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import Input from '../Input/Input';
import Button from '../Button/Button';
import { useAuth } from '@/app/context/AuthContext';
import { User } from '@/app/types/Auth.type';
import AuthService from '@/app/services/authServices';
import { showInfoToast } from '@/app/utils/toast';
import { useTranslations } from 'next-intl';
import { GoUnverified, GoVerified } from 'react-icons/go';

const ProfileSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  surname: Yup.string().required("Surname is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  phoneNumber: Yup.string(),
  birthdate: Yup.string(),
  password: Yup.string(),
  street: Yup.string(),
  city: Yup.string(),
  zip: Yup.string(),
});

const Profile: React.FC = () => {
  const t = useTranslations('Notifications');
  const tDashboard = useTranslations('Dashboard');
  const { user, setUser } = useAuth(); 

  const initialValues: User = {
    name: user?.name || "",
    surname: user?.surname || "",
    email: user?.email || "",
    phoneNumber: user?.phoneNumber || "",
    birthdate: user?.birthdate || "",
    password: "",
    street: user?.street || "",
    city: user?.city || "",
    zip: user?.zip || "",
  };

  const handleSubmit = async (values: User) => {
    let payload;
    if(values.password === "" ) {
      payload = {
        name: values.name,
        surname: values.surname,
        email: values.email,
        phoneNumber: values.phoneNumber,
        birthdate: values.birthdate,
        street: values.street,
        city: values.city,
        zip: values.zip,
      }
    } else {
      payload = values;
    }
    try {
      await AuthService.updateProfile(payload);
      // Get updated user data
      const updatedUser = await AuthService.getProfile();
      setUser(updatedUser);
      showInfoToast(t('profileUpdate'));
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile.");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <h2 className="text-3xl font-semibold text-center text-secondary mb-10">{tDashboard('Sidebar.profile')}</h2>
      <div className="flex items-center mb-4">
        <p className='text-secondary text-xl mr-4'>{tDashboard('verificationStatus')}</p>
        {!user?.isVerified ? <GoUnverified className='text-secondary text-3xl' /> : <GoVerified className='text-secondary text-3xl' />}
      </div>
      <Formik
        initialValues={initialValues}
        enableReinitialize
        validationSchema={ProfileSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className="mb-4">
              <Input name="name" placeholder="Name" />
            </div>
            <div className="mb-4">
              <Input name="surname" placeholder="Surname" />
            </div>
            <div className="mb-4">
              <Input name="email" type="email" placeholder="Email" />
            </div>
            <div className="mb-4">
              <Input name="phoneNumber" placeholder="Phone Number" />
            </div>
            <div className="mb-4">
              <Input name="birthdate" type='date' placeholder="Birthdate" />
            </div>
            <div className="mb-4">
              <Input name="password" type="password" placeholder="Password" />
            </div>
            <div className="mb-4">
              <Input name="street" placeholder="Street" />
            </div>
            <div className="mb-4">
              <Input name="city" placeholder="City" />
            </div>
            <div className="mb-4">
              <Input name="zip" placeholder="Zip Code" />
            </div>
            <Button 
                type="submit" 
                label={isSubmitting ? "Updating..." : "Update Profile"} 
                variant="secondary" 
                className='w-full'
            />

          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Profile;
