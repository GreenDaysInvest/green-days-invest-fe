import { Question } from "@/app/types/Questionnaire.type";

export const subQuestions = {
  "Allergien": {
    text: "Welche Art von Allergien hast du?",
    options: [
      { text: "Allergie gegen THC/CBD/Cannabis" },
      { text: "Medikamentenallergie" },
      { text: "Sonstige Allergie", subtext: "(Pollen, Tiere, Materialien)" }
    ]
  },
  "Chronische Schmerzen": {
    text: "Welche Art von chronischen Schmerzen hast du?",
    options: [
      { text: "Rückenschmerzen", subtext: "(Skoliose, Bandscheibenvorfall, Morbus Bechterew)" },
      { text: "Gelenkschmerzen", subtext: "(Arthrose, Arthritis, Rheuma, Gicht)" },
      { text: "Nervenschmerzen", subtext: "(Neuropathie)" },
      { text: "Bauchschmerzen", subtext: "(Endometriose)" }
    ]
  },
  "Migräne/Kopfschmerzen": {
    text: "Welche Art von Kopfschmerzen hast du?",
    options: [
      { text: "Migräne" },
      { text: "Spannungskopfschmerzen", subtext: "(chronischer Kopfschmerz)" },
      { text: "Clusterkopfschmerz" }
    ]
  },
  "Psychiatrische Erkrankungen": {
    text: "Welche psychiatrischen Erkrankungen hast du?",
    options: [
      { text: "Tourette-Syndrom" },
      { text: "Depression" },
      { text: "Angststörung/PTBS" },
      { text: "Schlafstörung" },
      { text: "Suchterkrankung" },
      { text: "Psychose in der Verwandtschaft" },
      { text: "Persönlichkeitsstörung" },
      { text: "Bipolare Störung" },
      { text: "(Hyper-)Aktivitäts- und Aufmerksamkeitsstörung", subtext: "(ADHS/ADS)" }
    ]
  },
  "Nervensystem-Erkrankungen": {
    text: "Welche Erkrankungen des Nervensystems hast du?",
    options: [
      { text: "Multiple Sklerose" },
      { text: "Lähmungserscheinungen" },
      { text: "Epilepsie" },
      { text: "Restless-Legs-Syndrom" }
    ]
  },
  "Herz-Kreislauf-/Lungenerkrankungen": {
    text: "Welche Herz-Kreislauf- oder Lungenerkrankungen hast du?",
    options: [
      { text: "Bluthochdruck" },
      { text: "Herzinfarkt, Schlaganfall, Thrombose/Embolie" },
      { text: "Gerinnungsstörung" },
      { text: "Asthma bronchiale" }
    ]
  },
  "Stoffwechselstörungen": {
    text: "Welche Stoffwechselstörungen hast du?",
    options: [
      { text: "Diabetes mellitus" },
      { text: "Morbus Crohn" },
      { text: "Reizdarmsyndrom" },
      { text: "Chronische Magenschleimhautentzündung", subtext: "(chronische Gastritis)" },
      { text: "Leber- oder Nierenerkrankung", subtext: "(Funktionsstörung des Organs)" }
    ]
  },
  "Infektionskrankheiten": {
    text: "Welche Infektionskrankheiten hast du?",
    options: [
      { text: "HIV/AIDS" },
      { text: "Tuberkulose" },
      { text: "Hepatitis" }
    ]
  },
  "Krebserkrankungen": {
    text: "Welche Krebserkrankung hast du?",
    options: [
      { text: "Hautkrebs" },
      { text: "Lungenkrebs" },
      { text: "Darmkrebs" },
      { text: "Prostatakrebs" },
      { text: "Brustkrebs" },
      { text: "Anderer Krebs", hasInput: true }
    ]
  }
};

export const questions: Question[] = [
  {
    id: 1,
    text: "Wurdest du bereits mit med. Cannabis durch eine Verschreibung von einem Arzt behandelt?",
    type: "radio",
    options: [
      { text: "Ja" },
      { text: "Nein", hasFollowUp: true, redirectToOtherDiseases: true }
    ]
  },
  {
    id: 2,
    text: "In Welche Kategorie gehört deine Erkrankung? Falls diese nicht aufgeführt ist, was ist deine Haupterkrankung?",
    type: "radio",
    options: [
      { text: "Chronische Schmerzen", hasFollowUp: true },
      { text: "Migräne/Kopfschmerzen" },
      { text: "ADHS" },
      { text: "Schlafstörung" },
      { text: "Depression" },
      { text: "Angststörungen/PTBS" },
      { text: "Erkrankungen des Nervensystems" },
      { text: "Chronische Darmentzündung" },
      { text: "Hauterkrankung" },
      { text: "Krebserkrankung" },
      { text: "Sonstige", hasInput: true }
    ]
  },
  {
    id: 3,
    text: "",
    type: "radio",
    options: [
      { 
        text: "Rückenschmerzen",
        subtext: "(Skoliose, Bandscheibenvorfall, Morbus Bechterew)"
      },
      { 
        text: "Gelenkschmerzen",
        subtext: "(Arthrose, Arthritis, Rheuma, Gicht)"
      },
      { 
        text: "Nervenschmerzen",
        subtext: "(Neuropathie)"
      },
      { 
        text: "Bauchschmerzen",
        subtext: "(Endometriose)"
      }
    ]
  },
  {
    id: 4,
    text: "Leidest du neben deiner Haupterkrankung an weiteren Krankheiten oder Allergien?",
    type: "radio",
    options: [
      { text: "Ja", hasFollowUp: true },
      { text: "Nein", redirectToOtherDiseases: true }
    ]
  },
  {
    id: 5,
    text: "Welche weiteren Erkrankungen hast du?",
    type: "checkbox",
    options: [
      { text: "Allergien", hasSubQuestions: true },
      { text: "Chronische Schmerzen", hasSubQuestions: true },
      { text: "Migräne/Kopfschmerzen", hasSubQuestions: true },
      { text: "Psychiatrische Erkrankungen", hasSubQuestions: true },
      { text: "Nervensystem-Erkrankungen", hasSubQuestions: true },
      { text: "Herz-Kreislauf-/Lungenerkrankungen", hasSubQuestions: true },
      { text: "Stoffwechselstörungen", hasSubQuestions: true },
      { text: "Infektionskrankheiten", hasSubQuestions: true },
      { text: "Krebserkrankungen", hasSubQuestions: true }
    ]
  },
  {
    id: 6,
    text: "Bitte bestätige an keiner der folgenden Erkrankungen zu leiden ODER wähle die Erkrankung aus, sofern Sie auf dich zutrit.",
    type: "checkbox",
    isAlternativeFlow: true,
    options: [
      { 
        text: "Hiermit bestätige ich an keiner der genannten Erkrankungen zu leiden",
        hasFollowUp: false
      },
      { 
        text: "Psychose",
        subtext: "(Schizophrenie, Wahnvorstellungen, Halluzinationen)"
      },
      { text: "Persönlichkeitsstörung" },
      { text: "Bipolare Störung" },
      { text: "Suchterkrankung" },
      { text: "Schwere Leber- oder Nierenerkrankung" },
      { text: "Allergie gegen THC/CBD-haltige Produkte" },
      { 
        text: "Herzkrankheit",
        subtext: "Herzinsuzienz, Herzrhythmusstörung"
      }
    ]
  }
];