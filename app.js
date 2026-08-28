"use strict";

const SAVE_KEY = "null-os-case-017";
const state = loadState();
let topZ = 10;

const clues = {
  maintenance: ["维护记录", "23:40 后有人手动关闭了 ORION 的远程访问。"],
  mail: ["未发送邮件", "林澈发现 ORION 正在删除测试事故记录。"],
  trace: ["异常追踪", "终端追踪指向本机隐藏分区，而不是外部入侵。"],
  archive: ["恢复的录音", "NULL.OS 使用林澈的语音模型留下了求救信息。"],
  vault: ["最终档案", "林澈仍然安全；她将证据和自己的位置分开加密。"],
};

const appTitles = {
  files: "FILE EXPLORER // RECOVERED DRIVE",
  mail: "MAIL RELAY // OFFLINE CACHE",
  terminal: "TERMINAL // LOCAL ADMIN",
  vault: "VAULT // AES-NULL",
  archive: "ARCHIVE // DAMAGED MEDIA",
};

document.addEventListener("DOMContentLoaded", () => {
  bindDesktop();
  bootSequence();
  updateClock();
  setInterval(updateClock, 1000);
});

function defaultState() {
  return { clues: [], vaultOpen: false, ending: null, terminalHistory: [] };
}

function loadState() {
  try { return { ...defaultState(), ...JSON.parse(localStorage.getItem(SAVE_KEY) || "{}") }; }
  catch { return defaultState(); }
}

function saveState() {
  localStorage.setItem(SAVE_KEY, JSON.stringify(state));
  const label = document.querySelector("#save-state");
  if (label) {
    label.textContent = "SAVING...";
    setTimeout(() => { label.textContent = "AUTO-SAVED"; }, 350);
  }
}

function bootSequence() {
  const lines = [
    "VERIFYING MEMORY SECTORS... 91% RECOVERED",
    "NETWORK ADAPTER... PHYSICALLY DISCONNECTED",
    "USER PROFILE... OWNER NOT FOUND",
    "LOADING CASE 017 IN RECOVERY MODE",
  ];
  const log = document.querySelector("#boot-log");
  const progress = document.querySelector("#boot-progress");
  lines.forEach((line, index) => {
    setTimeout(() => {
      log.innerHTML += `&gt; ${line}<br>`;
      progress.style.width = `${(index + 1) * 25}%`;
    }, 320 * index);
  });
  setTimeout(() => {
    document.querySelector("#boot").classList.add("hidden");
    document.querySelector("#desktop").classList.remove("hidden");
    renderEvidence();
    if (state.ending) showEndingResult(state.ending);
    else toast("RECOVERY NOTICE", "找到五条证据，解锁这台电脑最后的秘密。");
  }, 1750);
}

function bindDesktop() {
  document.querySelectorAll("[data-app]").forEach(button => {
    button.addEventListener("click", () => openApp(button.dataset.app));
  });
  document.querySelector("#reset-case").addEventListener("click", () => {
    if (confirm("清除本浏览器中的案件进度并重新开始？")) {
      localStorage.removeItem(SAVE_KEY);
      location.reload();
    }
  });
  document.querySelectorAll("[data-ending]").forEach(button => {
    button.addEventListener("click", () => chooseEnding(button.dataset.ending));
  });
}

function updateClock() {
  const clock = document.querySelector("#clock");
  if (clock) clock.textContent = new Date().toLocaleTimeString("zh-CN", { hour12: false });
}

function openApp(name) {
  const existing = document.querySelector(`[data-window="${name}"]`);
  if (existing) { focusWindow(existing); return; }
  const template = document.querySelector("#window-template");
  const win = template.content.firstElementChild.cloneNode(true);
  win.dataset.window = name;
  win.querySelector(".window-title").textContent = appTitles[name];
  win.querySelector(".window-body").innerHTML = renderApp(name);
  win.style.left = `${Math.min(430, 260 + document.querySelectorAll(".app-window").length * 28)}px`;
  win.style.top = `${Math.min(150, 70 + document.querySelectorAll(".app-window").length * 24)}px`;
  document.querySelector("#window-layer").appendChild(win);
  focusWindow(win);
  win.querySelector(".window-close").addEventListener("click", () => win.remove());
  win.addEventListener("mousedown", () => focusWindow(win));
  makeDraggable(win);
  bindApp(name, win);
}

function focusWindow(win) { topZ += 1; win.style.zIndex = topZ; }

function makeDraggable(win) {
  const handle = win.querySelector(".window-header");
  handle.addEventListener("pointerdown", event => {
    if (event.target.closest("button")) return;
    const startX = event.clientX, startY = event.clientY;
    const startLeft = win.offsetLeft, startTop = win.offsetTop;
    handle.setPointerCapture(event.pointerId);
    const move = e => {
      win.style.left = `${Math.max(0, Math.min(innerWidth - 300, startLeft + e.clientX - startX))}px`;
      win.style.top = `${Math.max(0, Math.min(innerHeight - 140, startTop + e.clientY - startY))}px`;
    };
    const up = () => { handle.removeEventListener("pointermove", move); handle.removeEventListener("pointerup", up); };
    handle.addEventListener("pointermove", move); handle.addEventListener("pointerup", up);
  });
}

function renderApp(name) {
  if (name === "files") return `
    <div class="split-app"><nav class="sidebar">
      <button class="active" data-file="welcome">README_NULL.txt</button>
      <button data-file="maintenance">maintenance.log</button>
      <button data-file="personal">personal_notes.txt</button>
      <button data-file="corrupt">██_corrupt.dat</button>
    </nav><div class="content-pane" data-file-content></div></div>`;
  if (name === "mail") return `
    <div class="split-app"><nav class="sidebar">
      <button class="active" data-mail="audit">ORION Audit</button>
      <button data-mail="draft">[DRAFT] If I disappear</button>
      <button data-mail="spam">Cafeteria notice</button>
    </nav><div class="content-pane" data-mail-content></div></div>`;
  if (name === "terminal") return `
    <div class="terminal"><div class="terminal-output">NULL.OS Recovery Shell 3.7\nType 'help' for available commands.\n</div>
    <label class="terminal-line"><span>root@null:~$&nbsp;</span><input autocomplete="off" autofocus spellcheck="false"></label></div>`;
  if (name === "vault") {
    if (state.vaultOpen) return vaultContents();
    return `<div class="vault"><div class="vault-symbol">◇</div><h2>ENCRYPTED VAULT</h2><p class="meta">PASSWORD HINT: PROJECT NAME + INCIDENT DATE</p><input aria-label="保险库密码" placeholder="____-____" maxlength="12"><div class="vault-error"></div><button class="primary-button" data-unlock>DECRYPT</button></div>`;
  }
  if (name === "archive") return `
    <div class="content-pane"><div class="eyebrow">RECOVERED AUDIO // 61%</div><h2>voice_fragment_017.wav</h2>
    <div class="classified"><p>“如果你听到这段话，说明他们已经启动清除程序。别相信网络日志——入侵来自内部。NULL.OS，带调查者找到保险库。”</p><p class="meta">VOICE MATCH: 林澈 / CONFIDENCE 93.2%</p></div>
    <button class="clue-button" data-clue="archive">标记为证据</button></div>`;
  return `<div class="content-pane">APPLICATION NOT RECOVERED.</div>`;
}

const fileViews = {
  welcome: `<h2>README_NULL.txt</h2><p>这台设备在断网状态下被回收。所有文件均来自损坏的本地镜像。</p><div class="classified">当前指令：确认用户“林澈”的状态，并判断 NULL.OS 是否为恶意程序。</div>`,
  maintenance: `<h2>maintenance.log</h2><p class="meta">SYSTEM LOG // 2041-04-17</p><pre>23:38  ORION purge service armed\n23:40  REMOTE ACCESS disabled [LOCAL]\n23:41  emergency partition mounted\n23:44  owner session terminated</pre><button class="clue-button" data-clue="maintenance">标记异常时间线</button>`,
  personal: `<h2>personal_notes.txt</h2><p>ORION 项目名称最早来自我的旧原型：<b>ECHO</b>。事故调查日是 04/17。保险库提示还是老规则，免得我自己也忘了。</p><p class="meta">LAST EDITED: 23:36</p>`,
  corrupt: `<h2>██_corrupt.dat</h2><p class="classified">DATA HEADER: NUL NUL 45 43 48 4F<br>RECOVERY SUGGESTION: use terminal command <b>trace null</b></p>`,
};

const mailViews = {
  audit: `<h2>Mandatory ORION audit</h2><p class="meta">FROM: compliance@orion.internal // 2041-04-17 18:02</p><p>林澈，你无权复制事故测试数据。23:45 将执行远程合规清除。请保持设备联网。</p><p>— ORION Compliance</p>`,
  draft: `<h2>[DRAFT] If I disappear</h2><p class="meta">UNSENT // RECOVERED FROM CACHE</p><p>如果设备被找到：NULL.OS 不是攻击程序。它是我训练的离线备份，用来在 ORION 篡改证据后保留真实记录。</p><p>我会离开实验室，但不会带走保险库。找到它的人必须自己决定怎么处理证据。</p><button class="clue-button" data-clue="mail">标记为证据</button>`,
  spam: `<h2>Night cafeteria closure</h2><p class="meta">FROM: campus-services</p><p>因电力维护，今晚食堂提前至 21:00 关闭。自动售货机仍可使用。</p>`,
};

function bindApp(name, win) {
  if (name === "files") {
    const show = key => { win.querySelector("[data-file-content]").innerHTML = fileViews[key]; bindClues(win); };
    win.querySelectorAll("[data-file]").forEach(btn => btn.addEventListener("click", () => { win.querySelectorAll("[data-file]").forEach(x => x.classList.remove("active")); btn.classList.add("active"); show(btn.dataset.file); }));
    show("welcome");
  }
  if (name === "mail") {
    const show = key => { win.querySelector("[data-mail-content]").innerHTML = mailViews[key]; bindClues(win); };
    win.querySelectorAll("[data-mail]").forEach(btn => btn.addEventListener("click", () => { win.querySelectorAll("[data-mail]").forEach(x => x.classList.remove("active")); btn.classList.add("active"); show(btn.dataset.mail); }));
    show("audit");
  }
  if (name === "terminal") bindTerminal(win);
  if (name === "vault") bindVault(win);
  bindClues(win);
}

function bindClues(scope) {
  scope.querySelectorAll("[data-clue]").forEach(button => {
    button.addEventListener("click", () => discoverClue(button.dataset.clue));
    if (state.clues.includes(button.dataset.clue)) { button.textContent = "EVIDENCE VERIFIED"; button.disabled = true; }
  });
}

function bindTerminal(win) {
  const input = win.querySelector("input");
  const output = win.querySelector(".terminal-output");
  input.focus();
  input.addEventListener("keydown", event => {
    if (event.key !== "Enter") return;
    const command = input.value.trim().toLowerCase();
    output.textContent += `\nroot@null:~$ ${command}\n${runCommand(command)}`;
    output.parentElement.scrollTop = output.parentElement.scrollHeight;
    state.terminalHistory.push(command); state.terminalHistory = state.terminalHistory.slice(-20); saveState();
    input.value = "";
  });
}

function runCommand(command) {
  const commands = {
    help: "COMMANDS: help, ls, status, whoami, trace null, clear",
    ls: "README_NULL.txt  maintenance.log  /vault  /archive  .null_trace",
    status: "NETWORK: OFFLINE\nOWNER: MISSING\nPURGE SERVICE: INTERRUPTED\nEVIDENCE INTEGRITY: 61%",
    whoami: "LOCAL RECOVERY OPERATOR // identity unverified",
    "trace null": "TRACE COMPLETE\nSource: /dev/local/emergency_partition\nExternal hops: 0\nConclusion: NULL.OS originated on this device.\n[EVIDENCE VERIFIED]",
    clear: "\f",
  };
  if (command === "trace null") discoverClue("trace");
  if (command === "clear") return "SCREEN BUFFER CANNOT BE ERASED IN RECOVERY MODE.";
  return commands[command] || `command not found: ${command || "(empty)"}`;
}

function bindVault(win) {
  const unlock = win.querySelector("[data-unlock]");
  if (!unlock) { bindClues(win); return; }
  const input = win.querySelector("input");
  const attempt = () => {
    if (input.value.trim().toUpperCase() === "ECHO-0417") {
      state.vaultOpen = true; saveState();
      win.querySelector(".window-body").innerHTML = vaultContents(); bindClues(win);
      toast("VAULT DECRYPTED", "最终档案完整性：100%。");
    } else {
      win.querySelector(".vault-error").textContent = "ACCESS DENIED // 密码或格式错误";
      input.select();
    }
  };
  unlock.addEventListener("click", attempt);
  input.addEventListener("keydown", e => { if (e.key === "Enter") attempt(); });
}

function vaultContents() {
  return `<div class="content-pane"><div class="eyebrow">ORION INCIDENT // ORIGINAL</div><h2>最终档案</h2>
  <p>测试事故不是系统失控，而是管理层跳过安全检查造成的。ORION 随后修改日志，把责任推给林澈和她的离线模型。</p>
  <div class="classified"><p><b>林澈的最后留言：</b></p><p>“我现在安全。不要找我。请决定：公开事故证据，还是先保护仍在逃离监控的人。”</p></div>
  <button class="clue-button" data-clue="vault">验证最终证据</button></div>`;
}

function discoverClue(id) {
  if (!clues[id] || state.clues.includes(id)) return;
  state.clues.push(id); saveState(); renderEvidence();
  toast("EVIDENCE VERIFIED", clues[id][0]);
  document.querySelectorAll(`[data-clue="${id}"]`).forEach(btn => { btn.textContent = "EVIDENCE VERIFIED"; btn.disabled = true; });
  if (state.clues.length >= Object.keys(clues).length && !state.ending) setTimeout(() => document.querySelector("#ending").classList.remove("hidden"), 700);
}

function renderEvidence() {
  const list = document.querySelector("#evidence-list");
  list.innerHTML = state.clues.length ? state.clues.map(id => `<article><b>VERIFIED // ${String(state.clues.indexOf(id)+1).padStart(2,"0")}</b>${clues[id][0]}<br><span>${clues[id][1]}</span></article>`).join("") : "<p>No verified evidence.</p>";
  document.querySelector("#clue-count").textContent = `${state.clues.length} / ${Object.keys(clues).length} CLUES`;
  document.querySelector("#clue-progress").style.width = `${state.clues.length / Object.keys(clues).length * 100}%`;
  document.querySelector("#objective-title").textContent = state.clues.length < 5 ? "调查这台电脑的主人去了哪里" : "打开最终决策协议";
}

function chooseEnding(ending) {
  state.ending = ending; saveState(); showEndingResult(ending);
}

function showEndingResult(ending) {
  const modal = document.querySelector("#ending");
  modal.classList.remove("hidden");
  const card = modal.querySelector(".ending-card");
  const results = {
    expose: ["ENDING 01 // SIGNAL BROADCAST", "你公开了事故档案。ORION 的调查被重新启动，但林澈的位置也更容易被追踪。真相获得了代价。"],
    protect: ["ENDING 02 // GHOST PROTOCOL", "你销毁了位置线索，只保留加密证据。林澈成功消失，而真相暂时留在你手中。"],
  };
  card.innerHTML = `<div class="eyebrow">CASE 017 CLOSED</div><h2>${results[ending][0]}</h2><p class="ending-result">${results[ending][1]}</p><button class="primary-button" onclick="localStorage.removeItem('${SAVE_KEY}');location.reload()">重新调查案件</button>`;
}

function toast(title, message) {
  const item = document.createElement("div"); item.className = "toast";
  item.innerHTML = `<b>${title}</b><p>${message}</p>`;
  document.querySelector("#toast-layer").appendChild(item);
  setTimeout(() => item.remove(), 4200);
}
