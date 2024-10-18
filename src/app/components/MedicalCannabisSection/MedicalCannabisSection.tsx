import React from 'react';
import InfoBox from './InfoBox';
import { IoCheckmarkDoneCircle } from 'react-icons/io5';

const MedicalCannabisSection: React.FC = () => {
  return (
    <section className="bg-tertiary py-10 px-6">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-[55px] mx-auto font-bold text-gray-800 mb-6">
          Are You Looking for <br/><span className="text-teal-600">Medical Cannabis?</span>
        </h2>
        <p className="text-darkGreen font-normal w-1/2 mx-auto mb-6">
          At Bloomwell, you can become a <span className='font-semibold'>Cannabis Patient, Redeem Prescription,</span> and check our <span className='font-semibold'>Live-Inventory</span> - featuring a comprehensive selection of strains from German pharmacies with detailed information on each strain.
        </p>
        <div className="grid grid-cols-2 w-1/2 mx-auto my-[70px] gap-2 justify-center space-x-6">
          <div className="flex items-center justify-end space-x-2">
            <IoCheckmarkDoneCircle className="text-main mr-2" size={30} />
            <p className='text-darkGreen font-semibold'>Direct Price Comparison</p>
          </div>
          <div className="flex items-center space-x-2">
            <IoCheckmarkDoneCircle className="text-main mr-2" size={30} />
            <p className='text-darkGreen font-semibold'>Availability at a Glance</p>
          </div>
          <div className="flex items-center justify-end space-x-2">
            <IoCheckmarkDoneCircle className="text-main mr-2" size={30} />
            <p className='text-darkGreen font-semibold'>Fast Delivery</p>
          </div>
          <div className="flex items-center space-x-2">
            <IoCheckmarkDoneCircle className="text-main mr-2" size={30} />
            <p className='text-darkGreen font-semibold'>Flexible Online Payment</p>
          </div>
        </div>
        <div className="w-[800px] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mx-auto mb-8">
          <InfoBox
            imageSrc="/service1.webp"
            buttonText="Become a Patient"
            link="/become-patient"  // Link to another page
          />
          <InfoBox
            imageSrc="/service2.webp"
            buttonText="Redeem Now"
            link="/redeem-prescription"  // Link to another page
          />
          <InfoBox
            imageSrc="/service3.webp"
            buttonText="Check Inventory"
            link="/live-inventory"  // Link to another page
          />
        </div>
      </div>
    </section>
  );
};

export default MedicalCannabisSection;
