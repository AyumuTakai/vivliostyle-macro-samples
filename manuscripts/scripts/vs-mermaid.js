mermaid.initialize({
    startOnLoad:false
  });
  function renderGraph(){
  
    // VFMが作るcode要素に付けられるクラスを指定したセレクタ
    const codeSelector = "code.language-mermaid-render";
    // レンダリング対象になる要素のリストを取得する
    const mermaidElements = document.querySelectorAll(codeSelector);
  
    let i = 1;
    for(let src of mermaidElements) {
      const dist = src.parentNode;
      const svg = mermaid.render('mermaid-graph-'+i, src.textContent, undefined);
      const div = document.createElement('div');
      div.innerHTML = svg;
      div.classList.add('language-mermaid-render');
      // code要素の親要素であるpre要素をdiv.language-mermaid-render > svg#mermaid-grahp-*に置き換える
      dist.replaceWith(div);
      i++;
    }
  }
  
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', renderGraph);
  } else {
    renderGraph();
  }
  