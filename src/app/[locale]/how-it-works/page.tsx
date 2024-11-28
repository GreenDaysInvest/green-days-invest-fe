"use client";

import { useTranslations } from "next-intl";
import { motion, useInView } from "framer-motion";
import React, { useRef } from "react";

const HowItWorksPage = () => {
  const t = useTranslations("HowItWorksPage");

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const steps = [
    {
      title: "Fragebogen ausfüllen",
      description:
        "Ein medizinischer Fragebogen erfasst deine Symptome, bisherigen Therapien und Vorerkrankungen. Dieser Schritt ist entscheidend, um eine individuelle Therapieempfehlung zu erstellen.",
    },
    {
      title: "Auswahl der Cannabisblüte",
      description:
        "Wähle aus einer Liste von Sorten, die regelmäßig aktualisiert wird. Unsere Plattform zeigt dir nur verfügbare Sorten an, um Verzögerungen zu vermeiden.",
    },
    {
      title: "Wunschapotheke auswählen",
      description:
        "Wähle eine Apotheke aus unserer Liste oder entscheide dich für eine freie Apotheke. Partnerapotheken garantieren eine schnelle Lieferung und hohe Verfügbarkeit.",
    },
    {
      title: "Ärztliche Prüfung",
      description:
        "Dein Fragebogen wird von einem spezialisierten Arzt geprüft. Falls notwendig, kann der Arzt weitere Fragen stellen oder eine Videokonsultation anfordern.",
    },
    {
      title: "Rezeptausstellung",
      description:
        "Bei positiver Prüfung wird ein Privatrezept ausgestellt. Dieses wird dir als e-Rezept oder in Papierform zugestellt.",
    },
    {
      title: "Rezeptversand",
      description:
        "Auf Wunsch übermitteln wir dein Rezept direkt an eine Apotheke, sodass du dich nicht um den Versand kümmern musst.",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.2, ease: "easeInOut" },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeInOut" } },
  };

  return (
    <motion.div
      ref={ref}
      className="pt-10 pb-20"
      initial="hidden"
      animate={isInView ? "show" : "hidden"}
      variants={containerVariants}
    >
      <div className="container mx-auto px-4 sm:px-0 md:px-8 lg:px-4">
        <motion.div
          className="flex flex-col justify-between items-center mb-10"
          variants={containerVariants}
        >
          <motion.p
            className="text-lightGreen text-3xl md:text-4xl lg:text-5xl text-center font-medium mt-10"
            variants={itemVariants}
          >
            {t("title")}
          </motion.p>
          <motion.p
            className="text-secondary text-lg md:w-3/4 lg:w-2/4 mx-auto text-center mt-10 mb-20"
            variants={itemVariants}
          >
            <strong>{t("strongSubTitle")}</strong> {t("subtitle")}
          </motion.p>
        </motion.div>

        <div className="relative max-w-4xl mx-auto mt-12">
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-px bg-main h-full z-0"></div>
          {steps.map((step, index) => (
            <motion.div
              key={index}
              className={`flex items-start mb-16 w-1/2 overflow-hidden ${
                index % 2 === 0
                  ? "flex-row ms-8"
                  : "flex-row-reverse justify-self-end me-8"
              }`}
              variants={itemVariants}
            >
              <div className="ml-2 w-full">
                <h3 className="text-xl font-semibold text-main mb-4">
                  {step.title}
                </h3>
                <p className="text-sm text-secondary">{step.description}</p>
              </div>
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-main flex items-center align-self-start justify-center mx-4 z-10">
                <span className="text-white text-xl">{index + 1}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default HowItWorksPage;
