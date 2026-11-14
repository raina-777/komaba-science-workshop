// アドベントカレンダーの記事はこのファイルにTeXで書きます。
// 記事を追加するには、entries に { day, title, author, tex }(author は省略可) を1件足します。
// 登録のない日は、カレンダーに「準備中」と表示されます。
//
// 使えるTeX:
//   数式     $...$  \(...\)  $$...$$  \[...\]  equation / align / gather 環境
//   見出し   \section{...}  \subsection{...}
//   装飾     \textbf{...}  \emph{...}  \textit{...}
//   箇条書き itemize / enumerate 環境、\item
//   その他   空行で段落分け、\\ で改行、% でコメント、\% \$ \& \# \_ \{ \} で記号そのもの
//   \begin{document} ... \end{document} があれば、その中だけを表示します
//   \usepackage などの自作マクロや、図(\includegraphics)、表(tabular)には対応していません
//
// 注意: tex は String.raw`...` の中に書きます。バッククォート(`)は使えません。
//       また「${」と続けて書くとエラーになるので、「$ {」と空白を入れてください。
const ADVENT = {
  year: "2026",
  entries: [
    {
      day: 1,
      title: "雪の結晶はなぜ六角形なのか",
      tex: String.raw`
氷の中で、水分子は水素結合によって\textbf{六角形の網目}をつくります。
雪の結晶が六回対称になるのは、このミクロな並び方が大きな形に表れるからです。

\section{正六角形の角度}
正六角形の内角は、次のように計算できます。
\[
  \frac{(6-2)\times 180^\circ}{6} = 120^\circ
\]
`,
    },
    {
      day: 2,
      title: "冬の星座と恒星の色",
      tex: String.raw`
冬の夜空には、赤いベテルギウスや青白いリゲルが輝いています。
この色の違いは、主に星の\emph{表面温度}の違いによるものです。

\section{ウィーンの変位則}
最も強く光を出す波長 $\lambda_{\max}$ と温度 $T$ の間には、次の関係があります。
\begin{equation}
  \lambda_{\max} T = b, \qquad b \approx 2.90 \times 10^{-3}\ \mathrm{m\,K}
\end{equation}
太陽の表面温度を $T \approx 5800\ \mathrm{K}$ とすると、$\lambda_{\max} \approx 500\ \mathrm{nm}$ と求まります。
`,
    },
    {
      day: 3,
      title: "サンタの移動を物理で考える",
      tex: String.raw`
地球の自転に合わせて、赤道上を24時間で一周するとどのくらいの速さになるでしょうか。

\section{計算してみる}
使う値は次の2つです。
\begin{itemize}
  \item 地球の半径 $R \approx 6.4 \times 10^{6}\ \mathrm{m}$
  \item 一周にかける時間 $T = 24\ \mathrm{h} = 8.64 \times 10^{4}\ \mathrm{s}$
\end{itemize}
速さは次のようになります。
\begin{align*}
  v &= \frac{2\pi R}{T} \\
    &\approx 4.7 \times 10^{2}\ \mathrm{m/s}
\end{align*}
これは音速(約 $340\ \mathrm{m/s}$)より\textbf{速い}値です。
`,
    },
  ],
};
