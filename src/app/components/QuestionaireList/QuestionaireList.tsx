import { useEffect, useState } from "react";
import QuestionnaireService from "@/app/services/questionnaireService";
import { useAuth } from "@/app/context/AuthContext";
import { useTranslations } from "next-intl";
import { CreateQuestionnaireRequest, Questionnaire } from "@/app/types/Questionnaire.type";
import Modal from "../Modal/Modal";
import Button from "../Button/Button";
import { showErrorToast, showInfoToast } from "@/app/utils/toast";
import { Loader } from "../Loader/Loader";

const QuestionnaireList: React.FC = () => {
  const t = useTranslations('Dashboard');
  const tNotifications = useTranslations('Notifications');
  const { user } = useAuth();
  const [questionnaires, setQuestionnaires] = useState<Questionnaire[]>([]);
  const [selectedQuestionnaire, setSelectedQuestionnaire] = useState<Questionnaire | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const pageSize = 10;
  
  useEffect(() => {
    if (user?.id) {
      fetchQuestionnaires();
    }
  }, [user?.id]);

  const fetchQuestionnaires = async () => {
    try {
      const data = await QuestionnaireService.getAllQuestionnaires();
      setQuestionnaires(data);
    } catch (error) {
      console.error("Error fetching questionnaires:", error);
      setError("Failed to fetch questionnaires. Please try again.");
    }
  };

  const filteredQuestionnaires = questionnaires.filter((q) =>
    `${q?.user?.name} ${q?.user?.surname}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const paginatedQuestionnaires = filteredQuestionnaires.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const totalPages = Math.ceil(filteredQuestionnaires.length / pageSize);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const openQuestionnaire = (questionnaire: Questionnaire) => {
    setSelectedQuestionnaire(questionnaire);
  };

  const closeQuestionnaire = () => {
    setSelectedQuestionnaire(null);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleAccept = async (id: string) => {
    try {
      setIsLoading(true);
      await QuestionnaireService.acceptQuestionnaire(id);
      showInfoToast(tNotifications('questionnaireAccepted'));
      setSelectedQuestionnaire(null);
      await fetchQuestionnaires();
    } catch (error) {
      console.error('Error accepting questionnaire:', error);
      showErrorToast(tNotifications('error'));
    } finally {
      setIsLoading(false);
    }
  };

  const handleDecline = async (id: string) => {
    try {
      setIsLoading(true);
      await QuestionnaireService.declineQuestionnaire(id);
      showErrorToast(tNotifications('questionnaireDeclined'));
      setSelectedQuestionnaire(null);
      await fetchQuestionnaires();
    } catch (error) {
      console.error('Error declining questionnaire:', error);
      showErrorToast(tNotifications('error'));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-10 px-4 max-w-2xl">
      <h2 className="text-3xl font-semibold text-center text-secondary mb-20">{t('Sidebar.questionnaireList')}</h2>

      {/* Search */}
      <div className="mb-8">
        <input
          type="text"
          placeholder={t('searchQuestionnaire')}
          value={searchTerm}
          onChange={handleSearchChange}
          className="w-full p-2 border border-secondary rounded-md"
        />
      </div>

      {/* Error Message */}
      {error && <p className="text-red-500">{error}</p>}

      {/* Table */}
      <table className="w-full border border-secondary rounded-lg">
        <thead className="bg-secondary">
          <tr>
            <th className="py-4 px-4 text-white text-left">{t('userName')}</th>
            <th className="py-4 px-4 text-white text-left">{t('responses')}</th>
            <th className="py-4 px-4 text-white text-left">{t('status')}</th>
          </tr>
        </thead>
        <tbody className="border border-secondary">
          {paginatedQuestionnaires.map((questionnaire) => (
            <tr
              key={questionnaire.id}
              onClick={() => openQuestionnaire(questionnaire)}
              className="cursor-pointer hover:bg-gray-50 border border-secondary transition"
            >
              <td className="py-4 px-4 text-secondary capitalize border border-secondary">
                {`${questionnaire?.user?.name} ${questionnaire?.user?.surname}`}
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
              <td className="py-4 px-4 text-secondary capitalize border border-secondary">
                {questionnaire?.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex justify-center mt-4 space-x-2">
        {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            className={`px-4 py-2 border rounded-md ${page === currentPage ? 'bg-secondary text-white' : 'bg-white text-secondary'}`}
          >
            {page}
          </button>
        ))}
      </div>

      {/* Modal */}
      <Modal isOpen={!!selectedQuestionnaire} onClose={closeQuestionnaire}>
        {selectedQuestionnaire && (
          <div className="relative">
            {isLoading && (
              <div className="absolute inset-0 bg-white/80 z-10 flex items-center justify-center">
                <Loader />
              </div>
            )}
            <div>
              <h3 className="text-2xl font-semibold text-secondary mb-4">{t('questionnaireResponses')}</h3>
              <div className={`${isLoading ? 'opacity-50' : ''} max-h-[70vh] overflow-y-auto`}>
                <ul className="space-y-4">
                  {selectedQuestionnaire.questions.map((questionItem, index) => (
                    <li key={index} className="border-b pb-4">
                      <p className="font-medium text-gray-700 mb-2">{questionItem.question}</p>
                      <p className="text-gray-600">
                        {Array.isArray(questionItem.answer) 
                          ? questionItem.answer.map((ans, i) => (
                              <span key={i} className="block ml-4">• {ans}</span>
                            ))
                          : questionItem.answer
                        }
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex justify-between mt-6">
                <Button 
                  variant="danger" 
                  label="Decline" 
                  onClick={() => handleDecline(selectedQuestionnaire.id)} 
                  disabled={isLoading}
                />
                <Button 
                  label="Accept" 
                  onClick={() => handleAccept(selectedQuestionnaire.id)} 
                  disabled={isLoading}
                />
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default QuestionnaireList;
