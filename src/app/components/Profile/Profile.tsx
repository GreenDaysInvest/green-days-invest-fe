"use client";
import React, { useEffect } from 'react';
import { Formik, Form, Field } from 'formik';
import axios from 'axios';
import * as Yup from 'yup';
import Input from '../Input/Input';
import Button from '../Button/Button';
import { useAuth } from '@/app/context/AuthContext';
import { User } from '@/app/types/Auth.type';
import AuthService from '@/app/services/authServices';
import { showInfoToast } from '@/app/utils/toast';

const ProfileSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  surname: Yup.string().required("Surname is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  phoneNumber: Yup.string(),
  password: Yup.string(),
  street: Yup.string(),
  country: Yup.string(),
  zip: Yup.string(),
});

const Profile: React.FC = () => {
  const { user } = useAuth(); 

  const initialValues: User = {
    name: user?.name || "",
    surname: user?.surname || "",
    email: user?.email || "",
    phoneNumber: user?.phoneNumber || "",
    password: "",
    street: user?.street || "",
    country: user?.country || "",
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
        street: values.street,
        country: values.country,
        zip: values.zip,
      }
    } else {
      payload = values;
    }
    try {
      await AuthService.updateProfile(payload);
      showInfoToast("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile.");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <h2 className="text-3xl font-semibold text-center text-secondary mb-10">Profile</h2>
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
              <Input name="password" type="password" placeholder="Password" />
            </div>
            <div className="mb-4">
              <Input name="street" placeholder="Street" />
            </div>
            <div className="mb-4">
              <Input name="country" placeholder="Country" />
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
