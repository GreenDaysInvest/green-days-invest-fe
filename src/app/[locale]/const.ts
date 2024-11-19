import { Testimonial } from "../types/Testimonial.type";
import avatar from "../../../public/avatar.png"

export const testimonals: Testimonial[] = [
    {
        rating: 4,
        description: "“Ich bin begeistert von der einfachen und schnellen Abwicklung. Innerhalb von 48 Stunden hatte ich mein Rezept und konnte es direkt in meiner Wunsch-Apotheke einlösen. Besonders gefallen hat mir, dass ich die Cannabisblüte selbst auswählen konnte – das macht den Prozess sehr individuell. Jedoch hätte ich mir eine detailliertere Anleitung zur Einnahme gewünscht, da ich neu in der Therapie bin.”",
        client: {
            avatar: avatar,
            name: "Lukas Müller",
            position: "Founder"
        }
    },
    {
        rating: 5,
        description: "“Der Service ist wirklich klasse! Alles läuft online ab, was mir viel Zeit und Stress erspart hat. Besonders die Option, das Rezept direkt an die Apotheke senden zu lassen, fand ich super praktisch. Die Wartezeit auf die Bestätigung der Ärzte könnte noch etwas kürzer sein – bei mir hat es fast drei Tage gedauert.”",
        client: {
            avatar: avatar,
            name: "Sarah Fischer",
            position: "Founder"
        }
    },
    {
        rating: 5,
        description: "“Ich war skeptisch, ob der Online-Prozess wirklich so einfach ist, aber ich wurde positiv überrascht. Es wäre toll, wenn die Plattform eine direkte Beratung zur Blütenauswahl bieten könnte. Ansonsten verlief alles reibungslos, und die Anamnese war angenehm unkompliziert. Das e-Rezept hat in der Apotheke ohne Probleme funktioniert.”",
        client: {
            avatar: avatar,
            name: "Tobias Schmitz",
            position: "Founder"
        }
    },
    {
        rating: 5,
        description: "“Ein toller Service, besonders für Menschen wie mich, die viel unterwegs sind und keine Zeit haben, für jedes Rezept zum Arzt zu gehen. Die Plattform ist benutzerfreundlich und übersichtlich. Allerdings hätte ich mir mehr Informationen zu den Blütensorten direkt auf der Website gewünscht.”",
        client: {
            avatar: avatar,
            name: "Jana Weber",
            position: "Founder"
        }
    },
    {
        rating: 5,
        description: "“Die beste Lösung, um schnell und unkompliziert an ein Cannabis-Rezept zu kommen! Besonders der schnelle Versand und die Möglichkeit, alles online zu regeln, haben mich überzeugt. Die Auswahl der Apotheken war ebenfalls sehr hilfreich. Der Preis für das Erstgespräch ist etwas hoch, aber der Service ist das Geld wert.”",
        client: {
            avatar: avatar,
            name: "Martin Huber",
            position: "Founder"
        }
    }
  ]