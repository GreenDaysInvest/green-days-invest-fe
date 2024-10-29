"use client";
import Header from "@/app/components/Header/Header";
import Partners from "../components/Partners/Partners";
import { partnersData } from "../consts";
import DiseaseList from "../components/DiseaseList/DiseaseList";
import DiscoverSection from "../components/DiscoverSection/DiscoverSection";
import CanabisTypes from "../components/CanabisTypes/CanabisTypes";
import Testimonials from "../components/Testimonials/Testimonials";
import Faq from "../components/Faq/Faq";

export default function Home() {

  return (
    <div className="">
      <Header />
      <Partners partners={partnersData} />
      <DiscoverSection />
      <DiseaseList />
      <CanabisTypes />
      <Testimonials />
      <Faq />
    </div>
  );
}
