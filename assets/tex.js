// アドベントカレンダーの記事(TeX)をHTMLに変換します。数式の描画はKaTeXが行います。
function renderTex(source) {
  const math = [];
  const stash = (tex, displayMode) => {
    math.push(katex.renderToString(tex, { displayMode, throwOnError: false }));
    return `\u0000${math.length - 1}\u0000`;
  };

  let s = source;
  const body = s.match(/\\begin\{document\}([\s\S]*)\\end\{document\}/);
  if (body) s = body[1];
  s = s.replace(/(^|[^\\])%.*$/gm, "$1"); // コメント

  // 数式を先に取り出す(本文用の変換の影響を受けないように)
  s = s
    .replace(/\\begin\{(equation\*?|align\*?|gather\*?)\}[\s\S]*?\\end\{\1\}/g, (m) => stash(m, true))
    .replace(/\$\$([\s\S]+?)\$\$/g, (_, t) => stash(t, true))
    .replace(/\\\[([\s\S]+?)\\\]/g, (_, t) => stash(t, true))
    .replace(/\\\(([\s\S]+?)\\\)/g, (_, t) => stash(t, false))
    .replace(/(^|[^\\])\$((?:\\.|[^$\\\n])+?)\$/gm, (_, pre, t) => pre + stash(t, false));

  s = esc(s);

  // 文字装飾(入れ子は内側から順に変換)
  const inline = /\\(textbf|emph|textit)\{([^{}]*)\}/g;
  const tags = { textbf: "strong", emph: "em", textit: "em" };
  while (inline.test(s)) {
    s = s.replace(inline, (_, cmd, t) => `<${tags[cmd]}>${t}</${tags[cmd]}>`);
  }

  // 箇条書き(入れ子は内側から順に変換)
  const list = /\\begin\{(itemize|enumerate)\}((?:(?!\\begin\{)[\s\S])*?)\\end\{\1\}/;
  while (list.test(s)) {
    s = s.replace(list, (_, env, items) => {
      const tag = env === "itemize" ? "ul" : "ol";
      const lis = items.split(/\\item\b/).slice(1).map((i) => `<li>${i.trim().replace(/\s*\n\s*/g, " ")}</li>`);
      return `\n\n<${tag}>${lis.join("")}</${tag}>\n\n`;
    });
  }

  s = s
    .replace(/\\section\*?\{([^{}]*)\}/g, "\n\n<h2>$1</h2>\n\n")
    .replace(/\\subsection\*?\{([^{}]*)\}/g, "\n\n<h3>$1</h3>\n\n")
    .replace(/\\\\/g, "<br>")
    .replace(/\\(&amp;|[%$#_{}])/g, "$1");

  return s
    .split(/\n\s*\n/)
    .map((block) => block.trim())
    .filter(Boolean)
    .map((block) => (/^<(h2|h3|ul|ol)>/.test(block) ? block : `<p>${block}</p>`))
    .join("\n")
    .replace(/\u0000(\d+)\u0000/g, (_, i) => math[Number(i)]);
}
