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
  return (
    <div className="py-10 bg-teal-100">
      <h2 className="text-4xl font-bold text-center mb-8">
        Which <span className="text-main">Diseases</span> Can Medical Cannabis Help With?
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-4">
        {diseases.map((disease, index) => (
          <DiseaseCard
            key={index}
            title={disease.title}
            description={disease.description}
            imageUrl={disease.imageUrl}
          />
        ))}
      </div>
    </div>
  );
};

export default DiseaseList;
