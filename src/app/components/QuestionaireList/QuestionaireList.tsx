import { useEffect, useState } from "react";
import QuestionnaireService from "@/app/services/questionnaireService";
import { useAuth } from "@/app/context/AuthContext";

interface Questionnaire {
  id: string;
  questions: { question: string; answer: string }[];
}

const QuestionnaireList: React.FC = () => {
  const [questionnaires, setQuestionnaires] = useState<Questionnaire[]>([]);
  const [selectedQuestionnaire, setSelectedQuestionnaire] = useState<Questionnaire | null>(null);
  const { user: { id: userId } } = useAuth();

  useEffect(() => {
    const fetchQuestionnaires = async () => {
      try {
        const userQuestionnaires = await QuestionnaireService.getUserQuestionnaires(userId);
        setQuestionnaires(userQuestionnaires);
      } catch (error) {
        console.error("Error fetching questionnaires:", error);
      }
    };

    if (userId) {
      fetchQuestionnaires();
    }
  }, [userId]);

  const openQuestionnaire = (questionnaire: Questionnaire) => {
    setSelectedQuestionnaire(questionnaire);
  };

  const closeQuestionnaire = () => {
    setSelectedQuestionnaire(null);
  };

  return (
    <div className="container mx-auto py-10 px-4 max-w-2xl">
      <h2 className="text-3xl font-semibold text-secondary mb-6">Your Questionnaires</h2>
      <table className="w-full border border-gray-200 rounded-lg overflow-hidden">
        <thead className="bg-gray-100">
          <tr>
            <th className="py-2 px-4 text-left">Questionnaire ID</th>
            <th className="py-2 px-4 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {questionnaires.map((questionnaire) => (
            <tr
              key={questionnaire.id}
              onClick={() => openQuestionnaire(questionnaire)}
              className="cursor-pointer hover:bg-gray-50 transition"
            >
              <td className="py-2 px-4">{questionnaire.id}</td>
              <td className="py-2 px-4">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    openQuestionnaire(questionnaire);
                  }}
                  className="text-blue-500 underline"
                >
                  View Responses
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal for displaying responses */}
      {selectedQuestionnaire && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-lg w-full">
            <h3 className="text-2xl font-semibold text-secondary mb-4">Questionnaire Responses</h3>
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
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuestionnaireList;
