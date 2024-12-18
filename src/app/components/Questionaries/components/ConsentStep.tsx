import React from 'react';
import { useTranslations } from 'next-intl';
import { showInfoToast } from '@/app/utils/toast';

interface ConsentStepProps {
  isAccepted: boolean;
  onAcceptChange: (accepted: boolean) => void;
  onNext: () => void;
}

const ConsentStep: React.FC<ConsentStepProps> = ({ isAccepted, onAcceptChange, onNext }) => {
  const t = useTranslations('Questionnaire');

  return (
    <div className="flex flex-col items-center py-10 px-4 mx-auto">
      <h2 className="text-3xl font-semibold text-secondary mb-8">Datenschutz</h2>
      <div className="bg-secondary p-6 rounded-lg mb-8">
        <h3 className="text-xl font-semibold mb-4">Einwilligung zur Verarbeitung besonderer personenbezogener Daten</h3>
        <p className="mb-4">
          Mir ist bekannt, dass die Bloomwell GmbH eine Plattform für mich als Nutzer zur Verfügung stellt, über die ich eine Behandlungsanfrage an Kooperationsärzte stellen, bei diesen Termine buchen und über Videotelefonie eine Sprechstunde wahrnehmen kann.
        </p>
        <p className="mb-4">
          Darüber hinaus ist es mir möglich, von den Kooperationsärzten ausgestellte Rezepte in meinem Nutzerkonto zu verwahren. Aus diesem Grund willige ich ein, dass Bloomwell GmbH alle von mir im Rahmen des medizinischen Fragebogens sowie auf anderem Weg mitgeteilten Kategorien besonderer personenbezogener Daten zur Verfügungstellung ihrer Leistungen verarbeitet.
        </p>
        <p className="mb-4">
          Ich kann diese Einwilligung jederzeit für die Zukunft widerrufen. In diesem Fall ist die Bloomwell GmbH über nicht mehr in der Lage ihre Leistungen zu erbringen. Die bis zum Widerruf erfolgte Verarbeitung bleibt rechtmäßig.
        </p>
        <p>
          Weitere Informationen finden sich in der Datenschutzerklärung (<a href="https://www.cannabisrezepte24.de/de/data-privacy" className="text-white hover:underline" target="_blank" rel="noopener noreferrer">https://www.cannabisrezepte24.de/de/data-privacy</a>).
        </p>
      </div>
      <div className="w-full text-secondary border border-1 border-secondary p-4 rounded-lg flex items-center justify-between mb-8">
        <span>Hiermit willige ich der Verarbeitung meiner besonderen personenbezogenen Daten ein</span>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={isAccepted}
            onChange={() => onAcceptChange(!isAccepted)}
            className="sr-only peer"
          />
          <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-secondary"></div>
        </label>
      </div>
      <button
        onClick={() => {
          if (isAccepted) {
            onNext();
          } else {
            showInfoToast(t('pleaseAcceptConsent'));
          }
        }}
        className="px-4 py-2 bg-secondary text-white rounded-lg w-full"
      >
        Weiter
      </button>
    </div>
  );
};

export default ConsentStep;
