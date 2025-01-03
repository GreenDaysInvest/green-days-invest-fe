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
        hasFollowUp: false,
        hasDifferentUi: true,
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
  },
  {
    id: 7,
    text: "Seit wann leidest du an deiner Haupterkrankung?",
    type: "radio",
    options: [
      { text: "Weniger als 3 Monate" },
      { text: "3 - 6 Monate" }
    ]
  },
  {
    id: 8,
    text: "Wie stark beeinträchtigen Ihre Symptome Ihren Alltag?",
    type: "radio",
    options: [
      { text: "Gar nicht." },
      { text: "Mittlere Beeinträchtigungl. Ich merke es aber." },
      { text: "Starke Beeinträchtigung. Mein Alltag wird dadurch schwer." }
    ]
  },
  {
    id: 9,
    text: "Wurden Dir bereits Medikamente/Tabletten verschreiben?",
    type: "radio",
    options: [
      { text: "Ja", hasFollowUp: true },
      { text: "Nein" }
    ]
  },
  {
    id: 10,
    text: "Welche Medikamente wurden dir verschrieben?",
    type: "checkbox",
    options: [
      { 
        text: "Migräne-Akuttherapie",
        subtext: "z. B. 'Triptane' wie Sumatriptan (Imigran®), Zolmitriptan (AscoTop®), Naratriptan (Formigran®), Almotriptan (Almogran®)"
      },
      {
        text: "Prophylaxe bei Migräne",
        subtext: "z. B. Metoprolol (Beloc®, Metohexal®), Flunarizin (Flunarium®), Topiramat (Topamax®), Valproat (Convulex®, Ergenyl®)"
      },
      {
        text: "Mittel gegen Übelkeit und Erbrechen",
        subtext: "z. B. Metoclopramid (MCP®), Dimenhydrinat (z. B. Vomex®)"
      },
      {
        text: "Freiverkäuiche Schmerzmittel",
        subtext: "z. B. Ibuprofen 400, Aspirin®, Paracetamol, Voltaren®"
      },
      {
        text: "Verschreibungspichtige Schmerzmittel",
        subtext: "z. B. Ibuprofen 600, Novalgin®, Arcoxia®, Paracetamol+Codein"
      },
      {
        text: "Opioide Schmerzmittel",
        subtext: "z. B. Tilidin (Valoron®), Tramadol (Tramal®), Morphin, Oxycodon (Oxygesic®), Fentanyl"
      },
      {
        text: "Schmerzbegleitende Medikation",
        subtext: "z. B. Amitriptylin (Amineurin®), Pregabalin (Lyrica®), Doxepin (Aponal®), Carbamazepin"
      },
      {
        text: "Muskelentspanner",
        subtext: "z. B. Baclofen, Ortoton®"
      },
      {
        text: "Entzündungshemmende Medikamente",
        subtext: "z. B. Kortison"
      }
    ]
  },
  {
    id: 11,
    text: "Wird bei dir regelmäßig eine Arbeitsunfähigkeit festgestellt?",
    type: "radio",
    options: [
      { text: "Ja, aber nicht länger als 6 Wochen." },
      { text: "Ja, für mehr als 6 Wochen." },
      { text: "Nein" }
    ]
  },
  {
    id: 12,
    text: "Wurde bereits eine Minderung der Erwerbstätigkeit oder ein Grad der Behinderung festgestellt?",
    type: "radio",
    options: [
      { text: "Ja", hasInput: true, inputType: "number", inputPlaceholder: "Prozent (%)" },
      { text: "Nein" }
    ]
  },
  {
    id: 13,
    text: "Hast du innerhalb der letzten 5 Jahre regelmäßig Drogen genommen? (Ecstasy, Kokain, LSD, Heroin)",
    type: "radio",
    options: [
      { text: "Ja" },
      { text: "Nein" }
    ]
  },
  {
    id: 14,
    text: "Gab es gegen Dich bereits ein Strafverfahren wegen unerlaubten Besitzes/Konsums von Cannabis?",
    type: "radio",
    options: [
      { text: "Ja" },
      { text: "Nein" }
    ]
  },
  {
    id: 15,
    text: "Bist du aktuell schwanger oder in Stillzeit?",
    type: "radio",
    options: [
      { text: "Ja" },
      { text: "Nein" }
    ]
  },
  {
    id: 16,
    text: "Hast Du weitere Relevante Informationen?",
    type: "textarea",
    isOptional: true,
    options: []
  }
];