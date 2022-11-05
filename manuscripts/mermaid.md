---
script:
  - type: 'text/javascript'
    src: './scripts/mermaid.min.js'
  - type: 'text/javascript'
    src: './scripts/vs-mermaid.js'
    defer: true
---

# mermaid.js サンプル

````markdown
```mermaid-render
stateDiagram
状態1: ノート付き状態
note right of 状態1
日本語も扱えます
end note
状態1 --> 状態2
note left of 状態2 : こちらにもノート
```
````

```mermaid-render
stateDiagram
状態1: ノート付き状態
note right of 状態1
日本語も扱えます
end note
状態1 --> 状態2
note left of 状態2 : こちらにもノート
```
````markdown
```mermaid-render:キャプション付き
graph TD;
    A-->B;
    A-->C;
    B-->D;
    C-->D;
```
````

```mermaid-render:キャプション付き
graph TD;
    A-->B;
    A-->C;
    B-->D;
    C-->D;
```