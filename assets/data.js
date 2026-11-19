// サイトの内容はすべてこのファイルで編集できます。
const SITE = {
  name: "Komaba Science Workshop",
  // 企画概要
  intro: "Komaba Science Workshop(KSW)は学生有志による学術系の展示企画で、第77回駒場祭に出展します。ポスター発表を予定しています。",
  // 企画情報
  dates: "11月21日(土)〜23日(月・祝)",
  venue: "12号館 1225教室",
  festival: { label: "第77回駒場祭 公式サイト", url: "https://komabasai.net/77/" },
  // フッター
  sns: { label: "", url: "" }, // 例: { label: "@your_account", url: "https://x.com/your_account" }
  mail: "contact[at]example.com",
};

// ポスター一覧。1件ずつ書き換えてください。
//   title:  ポスターのタイトル(一覧と詳細の両方に表示)
//   image:  一覧に出す正方形の画像(例: "assets/posters/1.png")。空ならアイコンを表示
//   icon:   image が空のときのアイコン(chart / planet / atom / cell / sigma / dots)
//   labels: ラベル 2〜4 個(例: ["情報整理", "統計"])
//   summary: 概要(100文字程度)
//   pdf:    ポスターPDF(例: "assets/posters/1.pdf")。入れるとタイトルを押したときに開きます
const POSTERS = [
  { title: "ポスターNo.1", image: "", icon: "chart", labels: [], summary: "", pdf: "" },
  { title: "ポスターNo.2", image: "", icon: "planet", labels: [], summary: "", pdf: "" },
  { title: "ポスターNo.3", image: "", icon: "atom", labels: [], summary: "", pdf: "" },
  { title: "ポスターNo.4", image: "", icon: "cell", labels: [], summary: "", pdf: "" },
  { title: "ポスターNo.5", image: "", icon: "sigma", labels: [], summary: "", pdf: "" },
  { title: "ポスターNo.6", image: "", icon: "dots", labels: [], summary: "", pdf: "" },
];
