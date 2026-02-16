📚 CODEXA – Context Pack
🧠 Stack

React Native + Expo (SDK récent)

Expo Router

Zustand (global state)

Zustand Persist

AsyncStorage

MMKV (zustandStorage util dispo)

i18next (plural v4 _one / _other)

Custom ThemeProvider (light / dark / system)

Design : warm / library premium

🎨 Theming
constants/theme.ts
Palette
export const palette = {
  gold: "#ecb939",
  gold2: "#f0c75e",
  leather: "#726255",
  ink: "#372e29",
  black: "#000000",

  paper0: "#fbf5e6",
  paper1: "#f6ecd6",
  paper2: "#fffaf0",

  night0: "#14110f",
  night1: "#1b1613",
  night2: "#231c17",

  error: "#d9534f",
  error2: "#c85e54",
  errorLight: "#f8d7da",
  errorDark: "#5c2e2e",
};

Theme Shape
export type Theme = {
  mode: "light" | "dark";

  bg0: string;
  bg1: string;

  surfaceA: string;
  surfaceB: string;

  text: string;
  muted: string;

  primary: string;
  primary2: string;

  borderSoft: string;
  shadowColor: string;

  chipText: string;
  chipMuted: string;

  error: string;
  errorBg: string;
  errorBorder: string;
};

ThemeProvider

File: providers/ThemeProvider.tsx

AsyncStorage key: "codexa.theme.preference"

preference: "system" | "light" | "dark"

mode effectif = preference === "system" ? systemMode : preference

useTheme() retourne :

{
  theme,
  mode,
  preference,
  setPreference,
  toggle
}

🌍 i18n

File: lib/i18n.ts

initReactI18next

resources depuis @/locales

defaultNS: "common"

fallbackLng: "en"

langue actuelle forcée à "fr" (TODO → device language)

pluralisation v4 (_one / _other)

📦 Models
📖 Book

File: models/book.ts

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
  cover?: ImageSourcePropType; // require(...) ou { uri }
  tagIds: string[];
  statusId: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

🏷️ Status

File: models/status.ts

IDs format : "status#N"

STATUS_ALL_ID = "status#all" (utilisé uniquement pour filtres)

Chaque status contient :

id

name

icon (MaterialCommunityIcons)

color

order

⚠️ Pour le formulaire d’ajout :

On exclut STATUS_ALL_ID

Status par défaut = STATUS_IDS.READ (status#4)

🏷️ Tag

File: models/tag.ts

export interface Tag {
  id: string;
  name: string;
  slug: string;
}


tags: Tag[] disponible statiquement.

🗄️ Stores
📚 useBooksStore

File: store/useBookStore.ts

type BooksState = {
  books: Book[];

  setBooks: (books: Book[]) => void;
  addBook: (book: Omit<Book, "id" | "createdAt" | "updatedAt">) => void;
  updateBook: (id: string, updates: Partial<Book>) => void;
  deleteBook: (id: string) => void;
};


addBook génère :

id via Date.now()

createdAt

updatedAt

Les nouveaux livres sont ajoutés en tête de liste

🔎 useFiltersStore

File: store/useFiltersStore.ts

State
query: string
selectedStatusId: string
selectedTagIds: string[]
selectedSortId: string
selectedDisplayId: "cover" | "list"

Persist

storage: AsyncStorage

clé: "codexa.filters"

partialize:

selectedDisplayId

selectedSortId

🧩 Hooks Utiles
useTagsWithCount

File: hooks/useTagsWithCount.ts

Calcule dynamiquement le nombre de livres par tag

Retourne TagWithCount[]

Tri décroissant par count

🛠️ Utils
withAlpha

File: utils/color.ts

withAlpha(hex: string, alpha: number) => rgba(...)

formatDate

File: utils/formatDate.ts

Presets: short | medium | long

Utilise Intl.DateTimeFormat

Fallback sécurisé

zustandStorage (MMKV)

File: utils/zustandStorage.ts

Wrapper MMKV compatible StateStorage.

⚠️ Actuellement non utilisé dans useFiltersStore (AsyncStorage utilisé).

🎯 Règles Produit

Design warm / premium / library

Beaucoup d’espace

Radius généreux

Ombres douces

Pas d’erreurs agressives

Validation subtile

Status colorés (couleur propre à chaque status)

STATUS_ALL_ID réservé aux filtres

Default status création livre = READ

🚀 Convention Architecture (recommandée)
features/books/
  components/
  hooks/


Form pattern recommandé :

useBookForm

BookForm

StatusSelector

TagsSelector

CoverPicker

Route fine (add-book.tsx)

📌 Notes importantes

cover accepte require() et { uri: string }

userId actuellement mocké (user#1)

i18n prêt mais pas encore totalement exploité pour les labels status

Possibilité future :

AsyncStorage persistance books

Migration vers MMKV

API ISBN

Scan code-barres

Backend