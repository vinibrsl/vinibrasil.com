// Reading list data + Markdown serializer. Single source of truth shared by
// the HTML page (src/pages/reading.astro) and its Markdown twin
// (src/pages/reading.md.ts). Add a book by appending to `books`; order within
// a year follows list order.
//
//   { author: "Larson", title: "Staff Engineer", yearRead: 2026,
//     url: "https://…",        // optional — links the title
//     note: "A sentence." }    // optional — prints beneath the title
export type Book = {
  title: string;
  author?: string;
  yearRead: number;
  url?: string;
  note?: string;
};

export const READING_TITLE = "Reading";
export const READING_DESCRIPTION = "Books I've read, logged by year.";

export const books: Book[] = [
  { author: "Heber Campos Jr", title: "Tomando decisões segundo a vontade de Deus", yearRead: 2026, url: "https://www.goodreads.com/book/show/77251129-tomando-decis-es-segundo-a-vontade-de-deus" },
  { author: "Roy Rudnick & Michelle Weiss", title: "Mundo por Terra (World by Land)", yearRead: 2026, url: "https://www.amazon.com.br/Mundo-por-terra-fascinante-mundo/dp/B07DNJYNZQ", note: "This book always scratches my travel itch." },
  { author: "Sônia Bridi", title: "Diário do clima", yearRead: 2026, url: "https://www.amazon.com.br/Di%C3%A1rio-do-clima-S%C3%B4nia-Bridi/dp/852505139X" },
  { author: "John Piper", title: "Desiring God", yearRead: 2026, url: "https://www.goodreads.com/book/show/213367.Desiring_God", note: "Profound and life changing read." },
  { author: "Will Larson", title: "Staff Engineer", yearRead: 2026, url: "https://www.goodreads.com/book/show/56481725-staff-engineer", note: "Great read! I read it right after stepping into a staff engineer role at CrewAI." },
  { author: "John Murray", title: "Redemption Accomplished and Applied", yearRead: 2025, url: "https://www.goodreads.com/book/show/53341611-redemption-accomplished-and-applied" },
  { author: "Leo Tolstoy", title: "The Death of Ivan Ilyich", yearRead: 2025, url: "https://www.goodreads.com/book/show/18386.The_Death_of_Ivan_Ilych", note: "Trying to get into the classics. This was a great read!" },
  { author: "E. M. Bounds", title: "The Complete Works of E. M. Bounds on Prayer", yearRead: 2025, url: "https://www.goodreads.com/book/show/504128.The_Complete_Works_of_E_M_Bounds_on_Prayer" },
  { author: "Fyodor Dostoevsky", title: "Notes from Underground", yearRead: 2025, url: "https://www.goodreads.com/book/show/49455.Notes_from_Underground" },
  { author: "George Orwell", title: "1984", yearRead: 2025, url: "https://www.goodreads.com/book/show/5470.1984" },
  { author: "C.S. Lewis", title: "The Abolition of Man", yearRead: 2025, url: "https://www.goodreads.com/book/show/79428.The_Abolition_of_Man" },
  { author: "Tony Reinke", title: "Competing Spectacles", yearRead: 2025, url: "https://www.goodreads.com/book/show/42248509-competing-spectacles" },
  { author: "Amyr Klink", title: "One Hundred Days Between Sea and Sky", yearRead: 2025, url: "https://www.goodreads.com/book/show/1575434", note: "A guy decides to go in a 100-day rowing journey from Namibia to Brazil solo. ROWING!" },
  { author: "John Frame", title: "Worship in Spirit and Truth", yearRead: 2024, url: "https://www.goodreads.com/book/show/259110.Worship_in_Spirit_and_Truth" },
  { author: "Zacarias de Aguiar Severa", title: "Manual de Teologia Sistemática", yearRead: 2024, url: "https://www.amazon.com.br/Manual-Teologia-Sistem%C3%A1tica-Zacarias-Aguiar/dp/857459055X" },
  { author: "James F. White", title: "Introduction to Christian Worship", yearRead: 2024, url: "https://www.goodreads.com/book/show/65302.Introduction_to_Christian_Worship" },
  { author: "Paul F. Bradshaw", title: "Early Christian Worship", yearRead: 2024, url: "https://www.goodreads.com/book/show/12666135-early-christian-worship" },
  { author: "Russell Shedd", title: "Adoração Bíblica", yearRead: 2024, url: "https://www.vidanova.com.br/livros/adoracao-biblica-os-fundamentos-da-verdadeira-adoracao" },
  { author: "Henri Daniel-Rops", title: "Daily Life in the Times of Jesus", yearRead: 2024, url: "https://www.goodreads.com/book/show/2101978.Daily_Life_in_the_Time_of_Jesus" },
  { author: "Steve Stockman", title: "How to Shoot Video That Doesn't Suck", yearRead: 2024, url: "https://www.goodreads.com/book/show/11315591-how-to-shoot-video-that-doesn-t-suck", note: "Wife and I decided to document our trips and I didn't want to suck at shooting video." },
  { author: "Sônia Bridi", title: "Laowai", yearRead: 2024, url: "https://www.goodreads.com/book/show/5561341-laowai---hist-rias-de-uma-rep-rter-brasileira-na-china", note: "Stories from a Brazilian TV correspondent in 2005 China" },
  { author: "J.K. Rowling", title: "Harry Potter and the Goblet of Fire", yearRead: 2023, url: "https://www.goodreads.com/book/show/6.Harry_Potter_and_the_Goblet_of_Fire" },
  { author: "Timothy Keller", title: "The Freedom of Self-Forgetfulness", yearRead: 2023, url: "https://www.goodreads.com/book/show/13579364-the-freedom-of-self-forgetfulness", note: "I read this short book almost every year." },
  { author: "Ralph P. Martin", title: "Worship in the Early Church", yearRead: 2023, url: "https://www.goodreads.com/book/show/2080492.Worship_in_the_Early_Church" },
  { author: "Justo L. González", title: "The Story of Christianity (Volume 1)", yearRead: 2023, url: "https://www.goodreads.com/book/show/63141.The_Story_of_Christianity" },
  { author: "Hinson & Siepierski", title: "Vozes do cristianismo primitivo", yearRead: 2023, url: "https://www.amazon.com.br/Vozes-Cristianismo-Primitivo-Siepierski-Hinson/dp/8598172839" },
  { author: "Larry Hurtado", title: "At the Origins of Christian Worship", yearRead: 2023, url: "https://www.goodreads.com/book/show/1779427.At_the_Origins_of_Christian_Worship" },
  { author: "James Dunn", title: "Unity and Diversity in the New Testament", yearRead: 2023, url: "https://www.goodreads.com/book/show/293070.Unity_and_Diversity_in_the_New_Testament" },
  { author: "Bryan Peterson", title: "Understanding Exposure", yearRead: 2023, url: "https://www.goodreads.com/book/show/142239.Understanding_Exposure", note: "This book taught me everything I know about photography." },
  { author: "Timothy Keller", title: "Hidden Christmas", yearRead: 2023, url: "https://www.goodreads.com/book/show/29430050-hidden-christmas" },
  { author: "Michel Piragine", title: "Comportamentos Tóxicos", yearRead: 2022, url: "https://www.editoraaguasprofundas.com.br/prect" },
  { author: "J.K. Rowling", title: "Harry Potter and the Prisoner of Azkaban", yearRead: 2022, url: "https://www.goodreads.com/book/show/5.Harry_Potter_and_the_Prisoner_of_Azkaban" },
  { author: "Tony Reinke", title: "Lit! A Christian Guide to Reading Books", yearRead: 2021, url: "https://www.goodreads.com/book/show/10081849-lit" },
  { author: "Timothy Keller", title: "Counterfeit Gods", yearRead: 2021, url: "https://www.goodreads.com/book/show/6403690-counterfeit-gods" },
  { author: "John Bunyan", title: "The Pilgrim's Progress", yearRead: 2021, url: "https://www.goodreads.com/book/show/29797.The_Pilgrim_s_Progress" },
  { author: "Tish Warren", title: "Liturgy of the Ordinary", yearRead: 2021, url: "https://www.goodreads.com/book/show/30010106-liturgy-of-the-ordinary" },
  { author: "David Heinemeier Hansson & Jason Fried", title: "Remote: Office Not Required", yearRead: 2021, url: "https://www.goodreads.com/book/show/17316682-remote", note: "Remote work wasn't a thing when I read this" },
  { author: "C.S. Lewis", title: "The Chronicles of Narnia: The Magician's Nephew", yearRead: 2021, url: "https://www.goodreads.com/book/show/65605.The_Magician_s_Nephew" },
  { author: "N.T. Wright", title: "God and the Pandemic", yearRead: 2021, url: "https://www.goodreads.com/book/show/53542879-god-and-the-pandemic" },
  { author: "Antônio Renato Gusso", title: "Panorama Histórico de Israel", yearRead: 2021, url: "https://adsantos.com.br/panorama-historica-de-israel" },
  { author: "Jonas Madureira", title: "O custo do discipulado", yearRead: 2021, url: "https://www.goodreads.com/book/show/48495396-o-custo-do-discipulado" },
  { author: "Francis Schaeffer", title: "Genesis in Space and Time", yearRead: 2021, url: "https://www.goodreads.com/book/show/455449" },
  { author: "Paul Washer", title: "Verdadeiro Evangelho", yearRead: 2021, url: "https://www.goodreads.com/book/show/24473410-o-verdadeiro-evangelho" },
  { author: "Machado de Assis", title: "Dom Casmurro", yearRead: 2021, url: "https://www.goodreads.com/book/show/82888.Dom_Casmurro" },
  { author: "Helmut Thielicke", title: "A Little Exercise for Young Theologians", yearRead: 2021, url: "https://www.goodreads.com/book/show/916025.A_Little_Exercise_for_Young_Theologians" },
  { author: "George Orwell", title: "Animal Farm", yearRead: 2021, url: "https://www.goodreads.com/book/show/170448.Animal_Farm" },
  { author: "Timothy Keller", title: "The Freedom of Self-Forgetfulness", yearRead: 2020, url: "https://www.goodreads.com/book/show/13579364-the-freedom-of-self-forgetfulness" },
  { author: "Francis Chan", title: "Crazy Love", yearRead: 2020, url: "https://www.goodreads.com/book/show/3206011-crazy-love" },
  { author: "Russell Shedd", title: "Lei, Graça e Santificação", yearRead: 2020, url: "https://www.skoob.com.br/livro/30432-lei_graca_e_santificacao" },
  { author: "Luciano Subirá", title: "Maturidade", yearRead: 2020, url: "https://www.goodreads.com/book/show/42762067-maturidade" },
  { author: "Augustus Nicodemus Lopes", title: "Cristianismo Descomplicado", yearRead: 2020, url: "https://www.goodreads.com/book/show/36528017-cristianismo-descomplicado" },
  { author: "Jonas Madureira", title: "Inteligência Humilhada", yearRead: 2020, url: "https://www.goodreads.com/book/show/35527408-intelig-ncia-humilhada" },
  { author: "Cortella, Karnal & Pondé", title: "Felicidade: Modos de usar", yearRead: 2020, url: "https://www.goodreads.com/book/show/52220967-felicidade" },
];

// Years present in the list, newest first.
export const readingYearsDesc = [...new Set(books.map((b) => b.yearRead))].sort(
  (a, b) => b - a,
);

const INTRO = [
  "I've read for as long as I can remember. But people have read and written " +
    "for thousands of years, and there's a reason. It's how knowledge sticks.",
  "I'm a software engineer; I'm also a Christian, and a theologian (long " +
    "story). So the list runs all over: theology, novels, travel books, " +
    "photography, software engineering.",
  "I keep my notes in a [Zettelkasten](https://en.wikipedia.org/wiki/Zettelkasten), " +
    "so whatever's worth remembering outlives the book. Here's a list of what " +
    "I've been reading, with some personal notes.",
];

// The reading list as a self-contained Markdown document, grouped by year.
export function readingToMarkdown(): string {
  const lines = [
    `# ${READING_TITLE}`,
    "",
    `> ${READING_DESCRIPTION}`,
    "",
    ...INTRO.flatMap((p) => [p, ""]),
  ];
  for (const year of readingYearsDesc) {
    lines.push(`## ${year}`, "");
    for (const book of books.filter((b) => b.yearRead === year)) {
      const title = book.url ? `[${book.title}](${book.url})` : book.title;
      const byline = book.author ? ` — ${book.author}` : "";
      const note = book.note ? ` (${book.note})` : "";
      lines.push(`- ${title}${byline}${note}`);
    }
    lines.push("");
  }
  return lines.join("\n").trim() + "\n";
}
