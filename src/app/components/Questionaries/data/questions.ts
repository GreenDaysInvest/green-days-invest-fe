import { Question } from "@/app/types/Questionnaire.type";

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
          { text: "Allergien" },
          { text: "Chronische Schmerzen" },
          { text: "Migräne/Kopfschmerzsyndrome" },
          { text: "Psychiatrische Erkrankungen" },
          { text: "Nervensystem-Erkrankungen" },
          { text: "Herz-Kreislauf-/Lungenerkrankungen" },
          { text: "Verdauungstrakterkrankungen/Stoffwechselstörungen" },
          { text: "Infektionskrankheiten" },
          { text: "Krebserkrankung" }
        ]
      },
      no: {
        title: "Bitte bestätige an keiner der folgenden Erkrankungen zu leiden ODER wähle die Erkrankung aus, sofern Sie auf dich zutrifft.",
        type: 'checkbox',
        options: [
          { text: "Hiermit bestätige ich an keiner der genannten Erkrankungen zu leiden" },
          { 
            text: "Psychose",
            subtext: "(Schizophrenie, Wahnvorstellungen, Halluzinationen)"
          },
          {
            text: "Persönlichkeitsstörung",
            subtext: "(z. B. Borderline)"
          },
          { text: "Bipolare Störung" },
          { text: "Suchterkrankung" },
          { text: "Koronare Herzkrankheit, Herzinsuffizienz, Herzrhythmusstörung" },
          { text: "Herzinfarkt, Schlaganfall, Thrombose/Embolie" },
          { text: "Schwere Leber- oder Nierenerkrankung" },
          { text: "Allergie gegen THC/CBD-haltige Produkte" }
        ]
      }
    }
  }
];
