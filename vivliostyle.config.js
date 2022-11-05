
// 索引辞書
const words = {};
// 現在編集しているファイルのファイル名([begin:]で指定)
let filename = "";

// @ts-check
/** @type {import('@vivliostyle/cli').VivliostyleConfigSchema} */
const vivliostyleConfig = {
  title: 'マクロサンプル集',
  author: 'TAKAI Ayumu <atakai@hackwork.jp>',
  size: 'A4',
  theme: './style.css',
  image: 'ghcr.io/vivliostyle/cli:5.8.1',
  entry: [
    "mermaid.md",
    "notation.md",
    "index_01.md",
    "index.md"
  ], // 'entry' can be 'string' or 'object' if there's only single markdown file
  entryContext: './manuscripts',
  output: [ // path to generate draft file(s). default to '{title}.pdf'
    './マクロサンプル集.pdf', // the output format will be inferred from the name.
    {
      path: './book',
      format: 'webpub',
    },
  ],
  // workspaceDirを設定すると、scriptsディレクトリがコピーされないため正常に処理されない
  // workspaceDir: '.vivliostyle', 
  // toc: true, // whether generate and include ToC HTML or not, default to 'false'.
  // cover: './cover.png', // cover image. default to undefined.
  vfm: {
    /* 索引作成関連 */
    replace: [
      {
        // ファイル名の設定
        test: /^\[begin:(.*?)\]/,
        match: ([, fn], h) => {
          // 現在処理中のファイル名を保持
          filename = fn;
          return null;
        },
      },
      {
        // [begin:]とそろえるため予約
        test: /\[end\]/,
        match: ([,], h) => {
          return null;
        },
      },
      {
        // 索引の見出し語にしない [*!見出し語] | [*!見出し語,みだしご]
        // 同ページに複数の見出し語があった場合に自動で集約できないため手作業で修正する
        // タグを外してしまうと構成が変化した際に修正が大変なので!の付加で索引から除外できるようにしている
        test: /\[\*!([^,]*?)(?:,(.*?))?\]/g,
        match: ([, word, yomi], h) => {
          return h("span", { class: "nhw" }, word);
        },
      },
      {
        // 索引の見出し語 [*見出し語] | [*見出し語,みだしご]
        // Pythonの書籍で:が見出し語になっていたため,で区切る
        test: /\[\*([^,]*?)(?:,(.*?))?\]/g,
        match: ([, word, yomi], h) => {
          yomi = yomi || word;
          if (!words[word]) {
            words[word] = [];
          }
          const id =
            "word-" + Object.keys(words).length + "-" + words[word].length;
          const href = filename.replace(/.md$/, ".html") + "#" + id;
          words[word].push({ href, yomi });
          return h("span", { id, class: "hw" }, word);
        },
      },
      {
        // 索引出力 [index:あ,い,う,え,お]
        test: /\[index:(.*?)\]/,
        match: ([, headwords], h) => {
          headwords = headwords.split(",");
          const dict = [];
          for (const word of Object.keys(words)) {
            if (headwords.includes(words[word][0].yomi.substring(0, 1))) {
              dict[word] = words[word];
            }
          }
          const divs = [];
          for (const word of Object.keys(dict)) {
            const l = [h("dt", word)];
            for (const ref of dict[word]) {
              l.push(h("dd", h("a", { href: ref.href }, ".")));
            }
            divs.push(h("div", l));
          }
          return h("dl", divs);
        },
      }

    ],
    //   hardLineBreaks: true, // converts line breaks of VFM to <br> tags. default to 'false'.
    //   disableFormatHtml: true, // disables HTML formatting. default to 'false'.
    }
  };

  module.exports = vivliostyleConfig;

