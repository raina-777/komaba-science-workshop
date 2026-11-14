// サイトの内容はすべてこのファイルで編集できます。
// 以下はサンプルです。実際のイベント情報に書き換えてください。
const SITE = {
  name: "Komaba Science Workshop",
  tagline: "学生による学術展示企画",
  dates: "11月21日(土)〜23日(月・祝)",
  venue: "第77回駒場祭(東京大学 駒場キャンパス)1225教室",
  room: "1225教室",
  intro: "Komaba Science Workshop(KSW)は学生有志による学術系の展示企画で、第77回駒場祭に出展します。ポスター発表を予定しています。",
  hashtag: "KomabaScienceWorkshop",
  surveyUrl: "", // アンケートのURL。空の間はボタンが「準備中」になります。
  sns: { label: "", url: "" }, // 例: { label: "@your_account", url: "https://x.com/your_account" }
  mail: "contact[at]example.com",
  thanks: "Komaba Science Workshopの活動をご支援いただきました皆様に厚く御礼申し上げます。",
  footerNote: "撮影・録音の可否は各会場の案内に従ってください。",
};

const GROUPS = [
  {
    id: "econophysics", name: "ポスターNo.1", icon: "chart", place: SITE.room,
    topics: [],
  },
  {
    id: "astrophysics", name: "ポスターNo.2", icon: "planet", place: SITE.room,
    topics: [],
  },
  {
    id: "quantum-physics", name: "ポスターNo.3", icon: "atom", place: SITE.room,
    topics: [],
  },
  {
    id: "biophysics", name: "ポスターNo.4", icon: "cell", place: SITE.room,
    topics: [],
  },
  {
    id: "mathematical-physics", name: "ポスターNo.5", icon: "sigma", place: SITE.room,
    topics: [],
  },
  {
    id: "statistical-physics", name: "ポスターNo.6", icon: "dots", place: SITE.room,
    topics: [],
  },
];

// time は "HH:MM"。タイムテーブルにも自動で反映されます。
const LECTURES = [
  { id: "phase", day: 0, start: "10:00", end: "10:45", title: "身のまわりの相転移", speaker: "発表者A(3年)", abstract: "水の沸騰や磁石の性質に共通する「相転移」を、数式をほとんど使わずに紹介します。" },
  { id: "time", day: 0, start: "13:00", end: "13:45", title: "時間とは何か?", speaker: "発表者B(4年)", abstract: "物理学は時間をどう扱ってきたのか。なぜ過去と未来は違って見えるのかを考えます。" },
  { id: "scatter", day: 0, start: "15:00", end: "15:45", title: "ぶつけて調べるミクロの世界", speaker: "発表者C(3年)", abstract: "目に見えないものの構造を、粒子をぶつける「散乱」によって調べる方法を解説します。" },
  { id: "quantum", day: 1, start: "10:00", end: "10:45", title: "はじめての量子論", speaker: "発表者D(4年)", abstract: "重ね合わせや測定といった基本的な考え方を、身近なたとえと実験結果から説明します。" },
  { id: "career", day: 1, start: "11:30", end: "12:15", title: "物理学科での学び", speaker: "発表者E(3年)", abstract: "物理学科ではどんなことを学ぶのか。授業や実験の様子を在学生の視点で紹介します。" },
];

const DAYS = ["21日(土)", "22日(日)", "23日(月・祝)"];

const NEWS = [
  ["2026年11月4日", "特設サイトを公開しました。"],
];
