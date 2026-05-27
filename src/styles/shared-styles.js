const $_doc = document.createElement('template');
$_doc.innerHTML = `
  <dom-module id="shared-styles">
    <template>
      <style>
        :host { display: block; }
        h1 { font-size: 24px; color: #1a237e; margin-bottom: 4px; }
        .sub { font-size: 13px; color: #607d8b; margin-bottom: 20px; }
        .puntos { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 20px; }
        .punto { border-left: 4px solid var(--pc, #3f51b5); padding: 10px 14px; background: white; }
        .punto b { font-size: 10px; text-transform: uppercase; color: var(--pc, #3f51b5); display: block; margin-bottom: 3px; }
        .punto p { font-size: 12px; color: #546e7a; margin: 0; }
        .punto code { font-family: Consolas, monospace; font-size: 11px; }
        .cmp { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 20px; }
        .bh { padding: 8px 12px; font-size: 11px; font-weight: 700; text-transform: uppercase; background: #f5f5f5; color: #546e7a; }
        .bloque.p .bh { background: #e8eaf6; color: #3f51b5; }
        pre { margin: 0; padding: 14px; background: #1e1e2e; color: #cdd6f4; font-size: 12px; line-height: 1.7; font-family: Consolas, monospace; }
        .kw { color: #cba6f7; } .fn { color: #89b4fa; } .str { color: #a6e3a1; }
        .cm { color: #6c7086; font-style: italic; } .tag { color: #f38ba8; } .at, .pn { color: #fab387; }
        .demo { background: white; padding: 20px; }
        .dt { font-size: 11px; font-weight: 700; text-transform: uppercase; color: #1a237e; margin-bottom: 14px; border-bottom: 1px solid #e0e0e0; padding-bottom: 8px; }
        .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
        .out { padding: 8px 12px; background: #f5f6fa; border-left: 3px solid #3f51b5; font-size: 13px; color: #37474f; margin-top: 8px; }
        .btns { display: flex; gap: 6px; }
        label { display: block; font-size: 12px; color: #607d8b; margin-bottom: 3px; }
        input { padding: 7px 10px; border: 1px solid #ccc; border-radius: 4px; font-size: 13px; width: 100%; box-sizing: border-box; }
        input:focus { outline: none; border-color: #3f51b5; }
        button { padding: 6px 12px; border: none; border-radius: 4px; cursor: pointer; font-size: 12px; font-weight: 600; }
      </style>
    </template>
  </dom-module>
`;
document.head.appendChild($_doc.content);
