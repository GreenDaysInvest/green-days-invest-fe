import { useEffect, useState } from "react";
import QuestionnaireService from "@/app/services/questionnaireService";
import { useAuth } from "@/app/context/AuthContext";
import { useTranslations } from "next-intl";
import { User } from "@/app/types/Auth.type";
import Modal from "../Modal/Modal";

interface Questionnaire {
  id: string;
  user: User;
  questions: { question: string; answer: string }[];
}

const QuestionnaireList: React.FC = () => {
  const t = useTranslations('Dashboard');
  const { user } = useAuth();
  const [questionnaires, setQuestionnaires] = useState<Questionnaire[]>([]);
  const [selectedQuestionnaire, setSelectedQuestionnaire] = useState<Questionnaire | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchQuestionnaires = async () => {
      try {
        let questionnaireList;
        if (searchTerm) {
          questionnaireList = await QuestionnaireService.searchQuestionnaires(searchTerm);
        } else {
          questionnaireList = await QuestionnaireService.getAllQuestionnaires();
        }
        setQuestionnaires(questionnaireList);
      } catch (error) {
        console.error("Error fetching questionnaires:", error);
        setError("Failed to fetch questionnaires. Please try again.");
      }
    };

    if (user?.id) {
      fetchQuestionnaires();
    }
  }, [user?.id, searchTerm]);

  const openQuestionnaire = (questionnaire: Questionnaire) => {
    setSelectedQuestionnaire(questionnaire);
  };

  const closeQuestionnaire = () => {
    setSelectedQuestionnaire(null);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="container mx-auto py-10 px-4 max-w-2xl">
      <h2 className="text-3xl font-semibold text-center text-secondary mb-20">{t('Sidebar.questionnaireList')}</h2>

      <div className="mb-8">
        <input
          type="text"
          placeholder={t('searchQuestionnaire')}
          value={searchTerm}
          onChange={handleSearchChange}
          className="w-full p-2 border border-secondary rounded-md"
        />
      </div>

      {error && <p className="text-red-500">{error}</p>}

      <table className="w-full border border-secondary rounded-lg">
        <thead className="bg-secondary">
          <tr>
            <th className="py-4 px-4 text-white text-left">{t('userName')}</th>
            <th className="py-4 px-4 text-white text-left">{t('responses')}</th>
          </tr>
        </thead>
        <tbody className="border border-secondary">
          {questionnaires.map((questionnaire) => (
            <tr
              key={questionnaire.id}
              onClick={() => openQuestionnaire(questionnaire)}
              className="cursor-pointer hover:bg-gray-50 border border-secondary transition"
            >
              <td className="py-4 px-4 text-secondary capitalize border border-secondary">
                {String(questionnaire?.user?.name) + ' ' + String(questionnaire?.user?.surname)}
              </td>
              <td className="py-4 px-4 text-secondary border border-secondary">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    openQuestionnaire(questionnaire);
                  }}
                  className="text-lightGreen underline"
                >
                  {t('viewResponses')}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal isOpen={!!selectedQuestionnaire} onClose={closeQuestionnaire}>
        {selectedQuestionnaire && (
          <>
            <h3 className="text-2xl font-semibold text-secondary mb-4">{t('questionnaireResponses')}</h3>
            <ul className="space-y-4">
              {selectedQuestionnaire.questions.map((q, index) => (
                <li key={index} className="border-b pb-2">
                  <p className="font-medium text-gray-700">{q.question}</p>
                  <p className="text-gray-600">{q.answer}</p>
                </li>
              ))}
            </ul>
            <button
              onClick={closeQuestionnaire}
              className="mt-6 px-4 py-2 bg-secondary text-white rounded-lg"
            >
              {t('close')}
            </button>
          </>
        )}
      </Modal>
    </div>
  );
};

export default QuestionnaireList;
