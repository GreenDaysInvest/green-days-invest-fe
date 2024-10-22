interface FAQItemProps {
    question: string;
    answer: string;
    isOpen: boolean;
    onClick: () => void;
}
  
const FAQItem: React.FC<FAQItemProps> = ({ question, answer, isOpen, onClick }) => (
    <div className="border-b border-lightGreen py-8">
      <div
        className="flex justify-between items-center cursor-pointer"
        onClick={onClick}
      >
        <p className="text-secondary text-xl">{question}</p>
        <span className="flex items-center justify-center border border-1 rounded-full w-8 h-8 pb-1 text-lightGreen text-2xl">
          {isOpen ? '-' : '+'}
        </span>
      </div>
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-96' : 'max-h-0'
        }`}
      >
        <p className="mt-4 text-main">{answer}</p>
      </div>
    </div>
);

export default FAQItem