import { Question } from "@/app/types/Questionnaire.type";

export const CONFIRMATION_NO_DISEASES = "Hiermit bestätige ich an keiner der genannten Erkrankungen zu leiden";

export const DISEASE_CONFIRMATION_QUESTIONS = {
  title: "Bitte bestätige an keiner der folgenden Erkrankungen zu leiden ODER wähle die Erkrankung aus, sofern Sie auf dich zutrifft.",
  type: 'checkbox',
  options: [
    { text: CONFIRMATION_NO_DISEASES },
    { text: "Psychose", subtext: "(Schizophrenie, Wahnvorstellungen, Halluzinationen)" },
    { text: "Persönlichkeitsstörung", subtext: "(z. B. Borderline)" },
    { text: "Bipolare Störung" },
    { text: "Suchterkrankung" },
    { text: "Koronare Herzkrankheit, Herzinsuffizienz, Herzrhythmusstörung" },
    { text: "Herzinfarkt, Schlaganfall, Thrombose/Embolie" },
    { text: "Schwere Leber- oder Nierenerkrankung" },
    { text: "Allergie gegen THC/CBD-haltige Produkte" }
  ]
};

export const questions: Question[] = [
  {
    id: 1,
    text: "Wurdest du bereits mit med. Cannabis durch eine Verschreibung von einem Arzt behandelt?",
    subtext: "Bitte aktuelles Rezept oder sonstigen Nachweis bereit halten.",
    options: [{ text: "Ja" }, { text: "Nein" }],
    type: 'radio'
  },
  {
    id: 2,
    text: "In welche Kategorie gehört deine Haupterkrankung oder falls deine Erkrankung nicht aufgeführt ist dein Hauptsymptom?",
    subtext: "Wenn du nicht sicher bist oder falsch gewählt hast, kannst du im Folgenden jederzeit zurückkehren und die Kategorie korrigieren.",
    options: [
      {
        text: "Chronische Schmerzen",
        followUpQuestions: {
          title: "Chronische Schmerzen",
          options: [
            { text: "Rückenschmerzen", subtext: "(z. B. Bandscheibenvorfall, Skoliose, Bechterewsche Krankheit)" },
            { text: "Gelenkschmerzen", subtext: "(z. B. Arthrose, Arthritis, Rheuma, Gicht)" },
            { text: "Nervenschmerzen", subtext: "(z. B. Neuropathie)" },
            { text: "Bauchschmerzen", subtext: "(z. B. Endometriose)" }
          ]
        }
      },
      {
        text: "Migräne/Kopfschmerzsyndrom",
        followUpQuestions: {
          title: "Migräne/Kopfschmerzsyndrom",
          options: [
            { text: "Migräne" },
            { text: "Chronischer Kopfschmerz", subtext: "(z. B. Spannungskopfschmerz)" },
            { text: "Clusterkopfschmerz" }
          ]
        }
      },
      {
        text: "AD(H)S",
        followUpQuestions: {
          title: "AD(H)S",
          options: [
            { text: "Aktivitäts- und Aufmerksamkeitsstörung (ADHS)" },
            { text: "Aufmerksamkeitsstörung ohne Hyperaktivität (ADS)" },
            { text: "Hyperkinetische Störung des Sozialverhaltens" }
          ]
        }
      },
      {
        text: "Schlafstörung",
        followUpQuestions: {
          title: "Schlafstörung",
          options: [
            { text: "Ein- und/oder Durchschlafstörungen" },
            { text: "Störung des Tag-Nacht-Rhythmus" },
            { text: "Nachtangst/Nachtträume" }
          ]
        }
      },
      {
        text: "Depression",
        followUpQuestions: {
          title: "Depression",
          options: [
            { text: "Depressive Episode" },
            { text: "Anhaltende Depression" },
            { text: "Wiederkehrende Depression" }
          ]
        }
      },
      {
        text: "Angststörung/PTBS",
        followUpQuestions: {
          title: "Angststörung/PTBS",
          options: [
            { text: "Angststörung" },
            { text: "Posttraumatische Belastungsstörung (PTBS)" },
            { text: "Anpassungsstörung" }
          ]
        }
      },
      {
        text: "Nervensystem-Erkrankung",
        followUpQuestions: {
          title: "Nervensystem-Erkrankung",
          options: [
            { text: "Multiple Sklerose/Spastik" },
            { text: "Paraplegie/Lähmungserscheinungen" },
            { text: "Epilepsie/Morbus Parkinson" },
            { text: "Restless-Legs-Syndrom" }
          ]
        }
      },
      {
        text: "Chronisch-entzündliche Darmerkrankungen",
        followUpQuestions: {
          title: "Chronisch-entzündliche Darmerkrankungen",
          options: [
            { text: "Morbus Crohn/Colitis ulcerosa" },
            { text: "Reizdarmsyndrom" },
            { text: "Chronische Magenschleimhautentzündung", subtext: "(chronische Gastritis)" }
          ]
        }
      },
      {
        text: "Hauterkrankungen",
        followUpQuestions: {
          title: "Hauterkrankungen",
          options: [
            { text: "Neurodermititis" },
            { text: "Psoriasis", subtext: "(Schuppenflechte)" },
            { text: "Akne Inversa" }
          ]
        }
      },
      {
        text: "Krebserkrankung",
        followUpQuestions: {
          title: "Krebserkrankung",
          options: [
            { text: "Brustkrebs" },
            { text: "Prostatakrebs" },
            { text: "Darmkrebs" },
            { text: "Lungenkrebs" },
            { text: "Hautkrebs" },
            { text: "Anderer Krebs" }
          ]
        }
      },
      { 
        text: "Andere nicht aufgeführte Haupterkrankung", 
        hasInput: true 
      }
    ],
    type: 'radio'
  },
  {
    id: 3,
    text: "Leidest du neben deiner Haupterkrankung an weiteren Krankheiten oder Allergien?",
    options: [{ text: "Ja" }, { text: "Nein" }],
    type: 'radio',
    followUpQuestions: {
      yes: {
        title: "Wähle die Art deiner Erkrankung(en)",
        type: 'checkbox',
        options: [
          { 
            text: "Allergien",
            hasFollowUp: true,
            followUpQuestions: {
              title: "Allergien",
              type: 'checkbox',
              options: [
                { 
                  text: "Allergie gegen THC/CBD/Cannabis",
                  hasFollowUp: true,
                  followUpQuestions: DISEASE_CONFIRMATION_QUESTIONS
                },
                { 
                  text: "Medikamentenallergie",
                  hasFollowUp: true,
                  followUpQuestions: DISEASE_CONFIRMATION_QUESTIONS
                },
                { 
                  text: "Sonstige Allergie (Pollen, Tiere, Materialien)",
                  hasFollowUp: true,
                  followUpQuestions: DISEASE_CONFIRMATION_QUESTIONS
                }
              ]
            }
          },
          { 
            text: "Chronische Schmerzen",
            hasFollowUp: true,
            followUpQuestions: {
              title: "Chronische Schmerzen",
              type: 'checkbox',
              options: [
                { 
                  text: "Rückenschmerzen", 
                  subtext: "(z. B. Bandscheibenvorfall, Skoliose, Morbus Bechterew)",
                  hasFollowUp: true,
                  followUpQuestions: DISEASE_CONFIRMATION_QUESTIONS 
                },
                { 
                  text: "Gelenkschmerzen", 
                  subtext: "(z. B. Arthrose, Arthritis, Rheuma, Gicht)",
                  hasFollowUp: true,
                  followUpQuestions: DISEASE_CONFIRMATION_QUESTIONS 
                },
                { 
                  text: "Nervenschmerzen", 
                  subtext: "(z. B. Neuropathie)",
                  hasFollowUp: true,
                  followUpQuestions: DISEASE_CONFIRMATION_QUESTIONS 
                },
                { 
                  text: "Bauchschmerzen", 
                  subtext: "(z. B. Endometriose)",
                  hasFollowUp: true,
                  followUpQuestions: DISEASE_CONFIRMATION_QUESTIONS 
                },
                { text: "Fibromyalgie",
                  hasFollowUp: true,
                  followUpQuestions: DISEASE_CONFIRMATION_QUESTIONS 
                }
              ]
            }
          },
          { 
            text: "Herz-Kreislauf-/Lungenerkrankungen",
            hasFollowUp: true,
            followUpQuestions: {
              title: "Herz-Kreislauf-/Lungenerkrankungen",
              type: 'checkbox',
              options: [
                { text: "Bluthochdruck",
                  hasFollowUp: true,
                  followUpQuestions: DISEASE_CONFIRMATION_QUESTIONS  
                },
                { text: "Koronare Herzkrankheit, Herzinsuffizienz, Herzrhythmusstörungen",
                  hasFollowUp: true,
                  followUpQuestions: DISEASE_CONFIRMATION_QUESTIONS  
                },
                { text: "Herzinfarkt, Schlaganfall, Thrombose/Embolie",
                  hasFollowUp: true,
                  followUpQuestions: DISEASE_CONFIRMATION_QUESTIONS  
                },
                { text: "Gerinnungsstörung",
                  hasFollowUp: true,
                  followUpQuestions: DISEASE_CONFIRMATION_QUESTIONS  
                },
                { text: "Asthma bronchiale/COPD", subtext: "(chronisch-obstruktive Lungenerkrankung)",
                  hasFollowUp: true,
                  followUpQuestions: DISEASE_CONFIRMATION_QUESTIONS  
                }
              ]
            }
          },
          { 
            text: "Verdauungstrakterkrankungen/Stoffwechselstörungen",
            hasFollowUp: true,
            followUpQuestions: {
              title: "Verdauungstrakterkrankungen/Stoffwechselstörungen",
              type: 'checkbox',
              options: [
                { text: "Diabetes mellitus",
                  hasFollowUp: true,
                  followUpQuestions: DISEASE_CONFIRMATION_QUESTIONS  
                },
                { text: "Morbus Crohn/Colitis ulcerosa",
                  hasFollowUp: true,
                  followUpQuestions: DISEASE_CONFIRMATION_QUESTIONS  
                },
                { text: "Reizdarmsyndrom",
                  hasFollowUp: true,
                  followUpQuestions: DISEASE_CONFIRMATION_QUESTIONS  
                },
                { text: "Chronische Magenschleimhautentzündung", subtext: "(chronische Gastritis)",
                  hasFollowUp: true,
                  followUpQuestions: DISEASE_CONFIRMATION_QUESTIONS  
                },
                { text: "Leber- oder Nierenerkrankung", subtext: "(Organfunktionsstörung)",
                  hasFollowUp: true,
                  followUpQuestions: DISEASE_CONFIRMATION_QUESTIONS  
                }
              ]
            }
          },
          { 
            text: "Infektionskrankheiten",
            hasFollowUp: true,
            followUpQuestions: {
              title: "Infektionskrankheiten",
              type: 'checkbox',
              options: [
                { text: "HIV/AIDS",
                  hasFollowUp: true,
                  followUpQuestions: DISEASE_CONFIRMATION_QUESTIONS  
                },
                { text: "Tuberkulose",
                  hasFollowUp: true,
                  followUpQuestions: DISEASE_CONFIRMATION_QUESTIONS  
                },
                { text: "Hepatitis",
                  hasFollowUp: true,
                  followUpQuestions: DISEASE_CONFIRMATION_QUESTIONS 
                 }
              ]
            }
          },
          { 
            text: "Migräne/Kopfschmerzsyndrome",
            hasFollowUp: true,
            followUpQuestions: {
              title: "Migräne/Kopfschmerzsyndrome",
              type: 'checkbox',
              options: [
                { text: "Migräne",
                  hasFollowUp: true,
                  followUpQuestions: DISEASE_CONFIRMATION_QUESTIONS 
                 },
                { text: "Chronischer Kopfschmerz", subtext: "(z. B. Spannungskopfschmerz)",
                  hasFollowUp: true,
                  followUpQuestions: DISEASE_CONFIRMATION_QUESTIONS  
                },
                { text: "Clusterkopfschmerz",
                  hasFollowUp: true,
                  followUpQuestions: DISEASE_CONFIRMATION_QUESTIONS 
                 }
              ]
            }
          },
          { 
            text: "Nervensystem-Erkrankungen",
            hasFollowUp: true,
            followUpQuestions: {
              title: "Nervensystem-Erkrankungen",
              type: 'checkbox',
              options: [
                { text: "Multiple Sklerose/Spastik",
                  hasFollowUp: true,
                  followUpQuestions: DISEASE_CONFIRMATION_QUESTIONS  
                },
                { text: "Paraplegie/Lähmungserscheinungen",
                  hasFollowUp: true,
                  followUpQuestions: DISEASE_CONFIRMATION_QUESTIONS 
                },
                { text: "Epilepsie/Morbus Parkinson",
                  hasFollowUp: true,
                  followUpQuestions: DISEASE_CONFIRMATION_QUESTIONS 
                },
                { text: "Restless-Legs-Syndrom",
                  hasFollowUp: true,
                  followUpQuestions: DISEASE_CONFIRMATION_QUESTIONS 
                }
              ]
            }
          },
          { 
            text: "Psychiatrische Erkrankungen",
            hasFollowUp: true,
            followUpQuestions: {
              title: "Psychiatrische Erkrankungen",
              type: 'checkbox',
              options: [
                { text: "Bipolare Störung",
                  hasFollowUp: true,
                  followUpQuestions: DISEASE_CONFIRMATION_QUESTIONS 
                },
                { text: "Persönlichkeitsstörung", subtext: "(z. B. Borderline)",
                  hasFollowUp: true,
                  followUpQuestions: DISEASE_CONFIRMATION_QUESTIONS 
                },
                { text: "Psychose", subtext: "(z. B. Schizophrenie, Wahnvorstellungen)",
                  hasFollowUp: true,
                  followUpQuestions: DISEASE_CONFIRMATION_QUESTIONS 
                },
                { text: "Psychose innerhalb der Verwandtschaft",
                  hasFollowUp: true,
                  followUpQuestions: DISEASE_CONFIRMATION_QUESTIONS 
                },
                { text: "Suchterkrankung",
                  hasFollowUp: true,
                  followUpQuestions: DISEASE_CONFIRMATION_QUESTIONS 
                },
                { text: "(Hyper-)Aktivitäts- und Aufmerksamkeitsstörung (ADHS/ADS)",
                  hasFollowUp: true,
                  followUpQuestions: DISEASE_CONFIRMATION_QUESTIONS 
                },
                { text: "Schlafstörung",
                  hasFollowUp: true,
                  followUpQuestions: DISEASE_CONFIRMATION_QUESTIONS 
                },
                { text: "Anpassungsstörung",
                  hasFollowUp: true,
                  followUpQuestions: DISEASE_CONFIRMATION_QUESTIONS 
                },
                { text: "Depression",
                  hasFollowUp: true,
                  followUpQuestions: DISEASE_CONFIRMATION_QUESTIONS 
                },
                { text: "Angststörung/Posttraumatische Belastungsstörung (PTBS)",
                  hasFollowUp: true,
                  followUpQuestions: DISEASE_CONFIRMATION_QUESTIONS 
                },
                { text: "Tic-/Tourette-Syndrom",
                  hasFollowUp: true,
                  followUpQuestions: DISEASE_CONFIRMATION_QUESTIONS
                }
              ]
            }
          },
          { 
            text: "Krebserkrankung",
            hasFollowUp: true,
            followUpQuestions: {
              title: "Krebserkrankung",
              type: 'checkbox',
              options: [
                { text: "Brustkrebs",
                  hasFollowUp: true,
                  followUpQuestions: DISEASE_CONFIRMATION_QUESTIONS
                },
                { text: "Prostatakrebs",
                  hasFollowUp: true,
                  followUpQuestions: DISEASE_CONFIRMATION_QUESTIONS
                },
                { text: "Darmkrebs",
                  hasFollowUp: true,
                  followUpQuestions: DISEASE_CONFIRMATION_QUESTIONS
                },
                { text: "Lungenkrebs",
                  hasFollowUp: true,
                  followUpQuestions: DISEASE_CONFIRMATION_QUESTIONS
                },
                { text: "Hautkrebs",
                  hasFollowUp: true,
                  followUpQuestions: DISEASE_CONFIRMATION_QUESTIONS 
                },
                { text: "Anderer Krebs",
                  hasFollowUp: true,
                  followUpQuestions: DISEASE_CONFIRMATION_QUESTIONS 
                }
              ]
            }
          }
        ]
      },
      no: DISEASE_CONFIRMATION_QUESTIONS
    }
  },
  {
    id: 4,
    text: "Möchtest du uns noch etwas mitteilen?",
    type: 'textarea',
    placeholder: "Bitte beschreibe uns deine bisherigen Erfahrungen",
    maxLength: 1000,
    subtext: "Bitte verwende weniger als 1000 Zeichen",
    confirmation: {
      title: "Bestätigung der Richtigkeit der Angaben",
      text: "Hiermit bestätige ich, dass ich den Fragebogen wahrheitsgetreu und nach bestem Wissen und Gewissen bezüglich meines gesundheitlichen Zustandes und meiner Beschwerden ausgefüllt habe.",
      buttonText: "Bestätigen und abschließen"
    }
  }
];
