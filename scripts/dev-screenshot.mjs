// 通过 CDP 连接已启动的 Electron（--remote-debugging-port=9222）截取主窗口截图。
// 用法: node scripts/dev-screenshot.mjs <输出.png> [dark|light|monokai|github-dark|dracula|...] [附加JS]
// 仅用于本地视觉验证，不参与构建。
const port = process.env.CDP_PORT || 9222;


async function main() {
    const [out, theme, extraJs] = process.argv.slice(2);
    const list = await getJSON('/json/list');
    const page = list.find(t => t.type === 'page' && t.url.includes('index.html'))
        || list.find(t => t.type === 'page');
    if (!page) throw new Error('未找到页面调试目标: ' + JSON.stringify(list.map(t => t.url)));

    const ws = new WebSocket(page.webSocketDebuggerUrl);
    await new Promise((res, rej) => { ws.onopen = res; ws.onerror = rej; });

    let nextId = 0;
    const pending = new Map();
    ws.onmessage = e => {
        const msg = JSON.parse(e.data);
        if (msg.id && pending.has(msg.id)) { pending.get(msg.id)(msg); pending.delete(msg.id); }
    };
    const send = (method, params = {}) => new Promise(res => {
        const id = ++nextId;
        pending.set(id, res);
        ws.send(JSON.stringify({ id, method, params }));
    });
    const evaluate = async expression => {
        const r = await send('Runtime.evaluate', { expression, returnByValue: true });
        if (r.result && r.result.exceptionDetails) {
            throw new Error('eval failed: ' + JSON.stringify(r.result.exceptionDetails));
        }
        return r.result && r.result.result && r.result.result.value;
    };

    if (extraJs) await evaluate(extraJs);

    if (theme) {
        const applied = await evaluate(`(() => {
            const b = document.body;
            const t = ${JSON.stringify(theme)};
            const tone = t.includes('light') ? 'light' : 'dark';
            for (const el of [document.body, document.documentElement]) {
                el.classList.remove('theme-light', 'theme-dark', 'light-theme', 'dark-theme');
                el.setAttribute('data-theme', t);
                el.setAttribute('data-editor-theme', tone);
                el.classList.add(tone === 'light' ? 'theme-light' : 'theme-dark');
                el.classList.add(tone === 'light' ? 'light-theme' : 'dark-theme');
            }
            return (b.getAttribute('data-theme') || '') + ' / ' + (b.getAttribute('data-editor-theme') || '');
        })()`);
        console.log('theme ->', applied);
    }

    await send('Page.enable');
    await new Promise(r => setTimeout(r, 700));
    const shot = await send('Page.captureScreenshot', { format: 'png' });
    if (!shot.result) throw new Error('capture failed: ' + JSON.stringify(shot));
    const { writeFileSync } = await import('node:fs');
    writeFileSync(out, Buffer.from(shot.result.data, 'base64'));
    console.log('saved', out);
    process.exit(0);
}

main().catch(e => { console.error(e.message || e); process.exit(1); });
