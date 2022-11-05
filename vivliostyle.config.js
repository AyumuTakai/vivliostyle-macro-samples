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
    "notation.md"
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
  // vfm: { // options of VFM processor
  //   replace: [ // specify replace handlers to modify HTML outputs
  //     {
  //       // This handler replaces {current_time} to a current local time tag.
  //       test: /{current_time}/,
  //       match: (_, h) => {
  //         const currentTime = new Date().toLocaleString();
  //         return h('time', { datetime: currentTime }, currentTime);
  //       },
  //     },
  //   ],
  //   hardLineBreaks: true, // converts line breaks of VFM to <br> tags. default to 'false'.
  //   disableFormatHtml: true, // disables HTML formatting. default to 'false'.
  // },
};

module.exports = vivliostyleConfig;
