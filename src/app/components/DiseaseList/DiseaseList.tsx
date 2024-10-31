import { useTranslations } from 'next-intl';
import DiseaseCard from '../DiseaseCard/DiseaseCard';

const diseases = [
  {
    title: 'Insomania (Sleep Disorder)',
    description: 'Sleep Disorder',
    imageUrl: '/path-to-your-image/insomania.png', // Replace with actual image paths
  },
  {
    title: 'Migraine',
    description: 'Severe headaches',
    imageUrl: '/path-to-your-image/migraine.png',
  },
  {
    title: 'Chronic Pain',
    description: 'Ongoing pain',
    imageUrl: '/path-to-your-image/chronic-pain.png',
  },
  {
    title: 'ADHS',
    description: 'Attention deficit disorder',
    imageUrl: '/path-to-your-image/adhs.png',
  },
];

const DiseaseList = () => {

  const t = useTranslations('HomePage');

  return (
    <div className="bg-secondary">
      <div className="container mx-auto py-20 px-4 sm:px-0 md:px-8 lg:px-0">
        <h2 className="text-5xl font-medium text-tertiary text-center mb-8 w-2/4 mx-auto mb-20">
          {t('Disease.title')}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
          {[
            t('Disease.list.sleepDisorder'),
            t('Disease.list.migraine'),
            t('Disease.list.chronicPain'),
            t('Disease.list.adhd'),
            t('Disease.list.depresion'),
            t('Disease.list.furtherComplaints'),
          ].map((disease, index) => (
            <DiseaseCard
              key={index}
              title={disease}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default DiseaseList;
