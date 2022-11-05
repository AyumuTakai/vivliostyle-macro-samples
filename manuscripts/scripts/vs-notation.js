
/**
 * 楕円描画
 * @param {*} paper 
 * @param {*} args 
 */
const ellipse = (paper, args) => {
    const defaults = {
        cx: 0,
        cy: 0,
        stroke: "red",
        strokeWidth: 5,
        fill: "none",
        rx: 5,
        ry: 5
    };
    const p = { ...defaults, ...args };
    console.log('ellipse', { p });
    paper.ellipse(p);
}

/**
 * 矩形描画
 * @param {*} paper 
 * @param {*} args 
 */
const box = (paper, args) => {
    const defaults = {
        x: 0,
        y: 0,
        stroke: "red",
        strokeWidth: 5,
        fill: "none",
        rx: 5,
        ry: 5,
        width: 100,
        height: 100
    };
    const p = { ...defaults, ...args };
    paper.rect(p);
}

/**
 * 記号付き矢印
 * @param {*} paper 
 * @param {*} args 
 */
const numberedArrow = (paper, marker, args) => {
    const defaults = {
        char: 0,
        x: 0,
        y: 0,
        angle: -45,
        stroke: "red",
        strokeWidth: 3,
        fill: "white",
        r: 15,
        length: 40
    };
    const p = { ...defaults, ...args };
    console.log({ args, p });
    const textOffset = 2; // 文字を下にずらす

    const x2 = p.x + Math.cos(-p.angle * Math.PI / 180) * p.length;
    const y2 = p.y + Math.sin(-p.angle * Math.PI / 180) * p.length;
    paper.line({ x1: x2, y1: y2, x2: p.x, y2: p.y, stroke: p.stroke, strokeWidth: p.strokeWidth * 1.3, markerEnd: marker.clone().attr({ fill: p.stroke }) });
    paper.circle({ cx: x2, cy: y2, r: p.r, fill: p.fill, stroke: p.stroke, strokeWidth: p.strokeWidth });
    paper.text({ x: x2, y: y2 + textOffset, text: p.char, fontSize: p.r + "px", fill: p.stroke, stroke: p.stroke, textAnchor: "middle", dominantBaseline: "middle", fontFamily: "system-ui" });
}

/**
 * 矢印
 * @param {*} paper 
 * @param {*} marker 
 * @param {*} args 
 */
const arrow = (paper,marker, args) => {
    const defaults = {
        x1: 0,
        y1: 0,
        x2:100,
        y2:100,
        stroke: "red",
        strokeWidth: 3,
    };
    const p = { ...defaults, ...args };
    paper.line({ x1:p.x1, y1:p.y1, x2:p.x2, y2:p.y2, stroke: p.stroke, strokeWidth: p.strokeWidth * 1.3, markerEnd: marker.clone().attr({ fill: p.stroke }) });
}

/**
 * 注記描画
 * @param {*} paper 
 * @param {*} str 
 */
function drawNotation(paper, notations) {
    // 矢印
    var markerShape = paper.path("M 0 0 L 10 5 L 0 10 z");
    var marker = markerShape.clone().marker(0, 0, 10, 10, 5, 5).attr({ markerWidth: 5, markerHeight: 5 });
    markerShape.attr({ display: 'none' });


    console.log(notations);
    for (const notation of notations) {
        const type = notation.substr(0, 2);
        const args = JSON.parse(notation.slice(2));
        switch (type) {
            case '<-':
                arrow(paper, marker, args);
                break;
            case '<@':
                numberedArrow(paper, marker, args);
                break;
            case '[]':
                box(paper, args);
                break;
            case '()':
                ellipse(paper, args);
                break;
            default:
                break;
        }
    }

}

function renderNotation() {

    // image-notationクラスを持つcode要素が直後にある段落を指定したセレクタ
    const codeSelector = "p:has(+ pre code.language-image-notation)";
    // レンダリング対象になる要素のリストを取得する
    const paragraphs = document.querySelectorAll(codeSelector);
    console.log(paragraphs);

    for (let paragraph of paragraphs) {
        const image = paragraph.children[0];
        const pre = paragraph.nextElementSibling;
        pre.style.display = "none";
        const code = pre.children[0];
        const notations = code.textContent.split("\n");

        const canvas = document.createElement('canvas');
        canvas.width = image.naturalWidth;
        canvas.height = image.naturalHeight;
        const ctx = canvas.getContext('2d');

        // snap.svgのオブジェクトを作成
        const paper = Snap(canvas.width, canvas.height).remove();

        // 元の画像
        ctx.drawImage(image, 0, 0, image.naturalWidth, image.naturalHeight);
        // 注記の作成
        drawNotation(paper, notations);

        // Canvasへ描画
        var svgData = new XMLSerializer().serializeToString(paper.node);
        var svg = new Image();
        var encodedData = encodeURIComponent(svgData);
        svg.src = 'data:image/svg+xml,' + encodedData;

        svg.onload = () => {
            ctx.drawImage(svg, 0, 0, canvas.width, canvas.height, 0, 0, canvas.width, canvas.height);
            image.replaceWith(canvas);
        }
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', renderNotation);
} else {
    renderNotation();
}