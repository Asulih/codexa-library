import { Status } from "./status";
import { Tag } from "./tag";
import { User } from "./user";

export interface Book {
  id: string;
  title: string;
  isbn?: string;
  ean?: number;
  publishedDate?: string;
  pageCount?: number;
  authors?: string[];
  publisher?: string;
  summary?: string;
  cover?: any;
  tagIds: string[];
  statusId: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export const books: Book[] = [
  {
    id: 'book#1',
    title: 'Dune Tome 1',
    ean: 9782221127483,
    publishedDate: '2020-09-24',
    pageCount: 614,
    authors: ['Frank Herbert'],
    publisher: 'Robert Laffont',
    summary: "Il n'y a pas, dans tout l'Empire, de planète plus inhospitalière que Dune. Partout des sables à perte de vue. Une seule richesse : l'épice de longue vie, née du désert, et que tout l'univers convoite." + 
      "Quand Leto Atréides reçoit Dune en fief, il flaire le piège. Il aura besoin des guerriers Fremen qui, réfugiés au fond du désert, se sont adaptés à une vie très dure en préservant leur liberté, leurs coutumes et leur foi. Ils rêvent du prophète qui proclamera la guerre sainte et changera le cours de l'histoire." + 
      "Cependant, les Révérendes Mères du Bene Gesserit poursuivent leur programme millénaire de sélection génétique : elles veulent créer un homme qui réunira tous les dons latents de l'espèce. Le Messie des Fremen est-il déjà né dans l'Empire ?",
    cover: require('@/assets/images/dummy/books/dune_.jpg'),
    tagIds: ['tag#1', 'tag#2'],
    statusId: 'status#2',
    userId: 'user#1',
    createdAt: '2026-02-10',
    updatedAt: '2026-02-10',
  },
  {
    id: 'book#2',
    title: 'Sapiens - tome 2',
    isbn: '2226457623',
    ean: 9782226457622,
    publishedDate: '2021-10-13',
    pageCount: 256,
    authors: ['Yuval Noah Harari', 'David Vandermeulen', 'Daniel Casanave'],
    publisher: 'Albin Michel',
    summary: "Avec la révolution agricole, les Sapiens cohabitent non plus par dizaines d'individus, mais par millions..." +
      "Pour se nourrir, partager des informations et simplement vivre ensemble, les humains érigents alors les piliers de la civilisation, mais tombent aussi dans un piège dont nous ne sommes pas encore sortis !" +
      "Et si notre présent s'était joué il y a 12 000 ans ?",
    cover: require('@/assets/images/dummy/books/Sapiens-tome-2-BD.jpg'),
    tagIds: ['tag#3'],
    statusId: 'status#3',
    userId: 'user#1',
    createdAt: '2026-02-10',
    updatedAt: '2026-02-10',
  },
  {
    id: 'book#3',
    title: '1984',
    isbn: '207036822X',
    ean: 9782072878497,
    publishedDate: '2020-05-28',
    pageCount: 40,
    authors: ['George Orwell'],
    publisher: 'Gallimard',
    summary: "Année 1984 en Océanie. 1984 ? C'est en tout cas ce qu'il semble à Winston, qui ne saurait toutefois en jurer. Le passé a été réinventé, et les événements les plus récents sont susceptibles d'être modifiés. Winston est lui-même chargé de récrire les archives qui contredisent le présent et les promesses de Big Brother. Grâce à une technologie de pointe, ce dernier sait tout, voit tout. Liberté est Servitude. Ignorance est Puissance. Telles sont les devises du régime. Pourtant Winston refuse de perdre espoir. Avec l'insoumise...",
    cover: require('@/assets/images/dummy/books/1984.jpg'),
    tagIds: ['tag#4'],
    statusId: 'status#4',
    userId: 'user#1',
    createdAt: '2026-02-10',
    updatedAt: '2026-02-10',
  },
  {
    id: 'book#4',
    title: 'Le Hobbit',
    isbn: '2266339664',
    ean: 9782266339667,
    publishedDate: '2024-08-29',
    pageCount: 400,
    authors: ['J.R.R Tolkien'],
    publisher: 'Pocket Jeunesse',
    summary: "Le classique de la littérature jeunesse enfin en poche chez PKJ !" + 
      "Bilbo, comme tous les hobbits, est un petit être paisible et sans histoires. Son quotidien est bouleversé un beau jour, lorsque Gandalf le" +
      "magicien et treize nains barbus l'entraînent dans un voyage périlleux. C'est le début d'une grande aventure, d'une fantastique quête au trésor semée d'embûches et d'épreuves, qui mènera Bilbo jusqu'à la Montagne Solitaire gardée par le dragon Smaug...",
    cover: require('@/assets/images/dummy/books/Le-Hobbit.jpg'),
    tagIds: ['tag#5'],
    statusId: 'status#2',
    userId: 'user#1',
    createdAt: '2026-02-10',
    updatedAt: '2026-02-10',
  },
  {
    id: 'book#5',
    title: "Les Carnets De L'Apothicaire - Tome 1",
    isbn: '103270778X',
    ean: 9791032707784,
    publishedDate: '2021-01-21',
    pageCount: 167,
    authors: ['Natsu Hyuuga', 'Itsuki Nanao'],
    publisher: 'Ki-oon',
    summary: "Intrigues et poisons au cœur du palais impérial ! À 17 ans, Mao Mao a une vie compliquée. Formée dès son jeune âge par un apothicaire du quartier des plaisirs, elle se retrouve enlevée et vendue comme servante dans le quartier des femmes du palais impérial ! Entouré de hauts murs, il est coupé du monde extérieur. Afin de survivre dans cette prison de luxe grouillant de complots et de basses manœuvres, la jeune fille tente de cacher ses connaissances pour se fondre dans la masse." +
      "Mais, quand les morts suspectes de princes...",
    cover: require('@/assets/images/dummy/books/Les-Carnets-de-l-apothicaire-T01.jpg'),
    tagIds: ['tag#6', 'tag#7', 'tag#8', 'tag#9'],
    statusId: 'status#3',
    userId: 'user#1',
    createdAt: '2026-02-10',
    updatedAt: '2026-02-10',
  },
  {
    id: 'book#6',
    title: "Le cycle de Fondation Tome 1 : Fondation",
    isbn: '2070360539',
    ean: 9782070360536,
    publishedDate: '2009-03-01',
    pageCount: 416,
    authors: ['Isaac Asimov'],
    publisher: 'Gallimard',
    summary: "En ce début de treizième millénaire, l'Empire n'a jamais été aussi puissant, aussi étendu à travers toute la galaxie. C'est dans sa capitale, Trantor, que l'éminent savant Hari Seldon invente la psychohistoire, une science nouvelle permettant de prédire l'avenir. Grâce à elle, Seldon prévoit l'effondrement de l'Empire d'ici cinq siècles, suivi d'une ère de ténèbres de trente mille ans. Réduire cette période à mille ans est peut-être possible, à condition de mener à terme son projet : la Fondation, chargée de rassembler...",
    cover: require('@/assets/images/dummy/books/Fondation.jpg'),
    tagIds: ['tag#1', 'tag#2'],
    statusId: 'status#5',
    userId: 'user#1',
    createdAt: '2026-02-10',
    updatedAt: '2026-02-10',
  },
];

