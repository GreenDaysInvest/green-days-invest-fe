"use client";
import React, { useEffect } from 'react';
import { Formik, Form, Field } from 'formik';
import axios from 'axios';
import * as Yup from 'yup';
import Input from '../Input/Input';
import Button from '../Button/Button';

interface ProfileData {
  name: string;
  surname: string;
  email: string;
  phoneNumber: string;
  password: string;
  street: string;
  country: string;
  zipCode: string;
}

const ProfileSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  surname: Yup.string().required("Surname is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  phoneNumber: Yup.string().required("Phone number is required"),
  password: Yup.string().min(8, "Password must be at least 8 characters"),
  street: Yup.string().required("Street is required"),
  country: Yup.string().required("Country is required"),
  zipCode: Yup.string().required("Zip code is required"),
});

const Profile: React.FC = () => {
  const [initialValues, setInitialValues] = React.useState<ProfileData>({
    name: "",
    surname: "",
    email: "",
    phoneNumber: "",
    password: "",
    street: "",
    country: "",
    zipCode: "",
  });

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await axios.get('/api/profile'); // Replace with your actual backend endpoint
        setInitialValues(response.data);
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };
    fetchProfileData();
  }, []);

  const handleSubmit = async (values: ProfileData) => {
    try {
      await axios.put('/api/profile', values); // Replace with your actual update endpoint
      alert("Profile updated successfully!");
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
              <Field name="name" placeholder="Name" component={Input} />
            </div>
            <div className="mb-4">
              <Field name="surname" placeholder="Surname" component={Input} />
            </div>
            <div className="mb-4">
              <Field name="email" type="email" placeholder="Email" component={Input} />
            </div>
            <div className="mb-4">
              <Field name="phoneNumber" placeholder="Phone Number" component={Input} />
            </div>
            <div className="mb-4">
              <Field name="password" type="password" placeholder="Password" component={Input} />
            </div>
            <div className="mb-4">
              <Field name="street" placeholder="Street" component={Input} />
            </div>
            <div className="mb-4">
              <Field name="country" placeholder="Country" component={Input} />
            </div>
            <div className="mb-4">
              <Field name="zipCode" placeholder="Zip Code" component={Input} />
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
