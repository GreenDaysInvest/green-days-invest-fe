import Header from "@/app/components/Header/Header";
import Partners from "../components/Partners/Partners";
import { partnersData } from "../consts";
import MedicalCannabisSection from "../components/MedicalCannabisSection/MedicalCannabisSection";
import DiseaseList from "../components/DiseaseList/DiseaseList";

export default function Home() {

  return (
    <div className="">
      <Header />
      <Partners partners={partnersData} />
      <MedicalCannabisSection />
      <DiseaseList />
    </div>
  );
}
