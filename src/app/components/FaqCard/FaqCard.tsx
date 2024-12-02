import { Link } from "@/i18n/routing";
import { FC } from "react";

interface Props {
  id: string;
  title: string;
  list: string[];
  maxHeight?: number;
}

const FaqCard: FC<Props> = ({ id, title, list, maxHeight }) => {
  return (
    <Link href={`/faq/${id}`}>
      <div className="faq-card border border-lightGreen rounded-2xl p-6 cursor-pointer"
        style={{ minHeight: maxHeight ? `${maxHeight}px` : "auto" }}>
        <p className="text-secondary font-medium text-2xl mb-4">{title}</p>
        <ul className="text-main list-disc list-inside space-y-2">
          {list.map((desc, index) => (
            <li key={index}>{desc}</li>
          ))}
        </ul>
      </div>
    </Link>
  );
};

export default FaqCard;
