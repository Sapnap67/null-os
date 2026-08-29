"use strict";

const appMeta = {
  files: ["▱", "FILES", "RECOVERED"],
  mail: ["✉", "MAIL", "OFFLINE"],
  terminal: ["_", "TERMINAL", "ADMIN"],
  vault: ["◇", "VAULT", "ENCRYPTED"],
  archive: ["⌁", "ARCHIVE", "DAMAGED"],
};
const CASES = {
  "017": {
    name: "失踪的研究员",
    objective: "调查这台电脑的主人去了哪里",
    clues: {
      maintenance: ["维护记录", "23:40后有人手动关闭ORION远程访问。"],
      mail: ["未发送邮件", "林澈发现ORION正在删除事故记录。"],
      trace: ["异常追踪", "NULL.OS来自本机隐藏分区。"],
      archive: ["恢复的录音", "林澈用语音模型留下求救信息。"],
      vault: ["最终档案", "林澈仍然安全。"],
    },
    files: [
      [
        "README_NULL.txt",
        "<h2>README_NULL.txt</h2><p>断网设备镜像。确认林澈的状态，并判断NULL.OS是否为恶意程序。</p>",
      ],
      [
        "maintenance.log",
        "<h2>maintenance.log</h2><pre>23:38 purge armed\n23:40 remote access disabled [LOCAL]\n23:44 owner session terminated</pre><button class='clue-button' data-clue='maintenance'>标记异常时间线</button>",
      ],
      [
        "personal_notes.txt",
        "<h2>personal_notes.txt</h2><p>旧原型代号：<b>ECHO</b>。事故调查日：<b>04/17</b>。</p>",
      ],
      [
        "corrupt.dat",
        "<h2>corrupt.dat</h2><p>终端恢复命令：<b>trace null</b></p>",
      ],
    ],
    mails: [
      [
        "ORION Audit",
        "<h2>Mandatory audit</h2><p>23:45将执行远程合规清除。</p>",
      ],
      [
        "[DRAFT] If I disappear",
        "<h2>未发送草稿</h2><p>NULL.OS不是攻击程序，而是保留真实记录的离线备份。</p><button class='clue-button' data-clue='mail'>标记为证据</button>",
      ],
      ["Cafeteria notice", "<h2>食堂通知</h2><p>今晚21:00关闭。</p>"],
    ],
    command: "trace null",
    commandOut:
      "TRACE COMPLETE\nExternal hops: 0\nSource: local emergency partition\n[EVIDENCE VERIFIED]",
    commandClue: "trace",
    archive:
      "<h2>voice_fragment_017.wav</h2><p>“别相信网络日志——入侵来自内部。”</p><button class='clue-button' data-clue='archive'>恢复录音</button>",
    password: "ECHO-0417",
    hint: "项目代号 + 事故日期",
    vault:
      "<h2>ORION原始事故档案</h2><p>管理层跳过安全检查后修改日志，把责任推给林澈。</p><button class='clue-button' data-clue='vault'>验证最终证据</button>",
    intro: "NULL.OS是林澈为阻止ORION删除证据而留下的备份人格。",
    endings: [
      [
        "公开ORION档案",
        "让所有人知道真相",
        "SIGNAL BROADCAST",
        "真相被公开，但林澈也更容易被追踪。",
      ],
      [
        "隐藏林澈的位置",
        "保护她并销毁追踪线索",
        "GHOST PROTOCOL",
        "林澈成功消失，而证据暂时留在你手中。",
      ],
    ],
  },
  "042": {
    name: "零号站末班车",
    objective: "查明末班列车为何停靠不存在的零号站",
    clues: {
      schedule: ["异常时刻表", "23:30后出现无名站点。"],
      mail: ["调度警告", "调度中心知道零号站存在。"],
      trace: ["蓝线重路由", "列车AI主动修改了道岔。"],
      archive: ["42.7MHz画面", "失联维修员在零号站求救。"],
      vault: ["042号黑匣子", "列车违抗命令是为了救人。"],
    },
    files: [
      [
        "line_6.map",
        "<h2>LINE 6</h2><p>A1 → A2 → A3 → <b>STATION 0</b> → DEPOT<br>ROUTE COLOR: BLUE</p>",
      ],
      [
        "last_train.csv",
        "<h2>末班时刻表</h2><pre>23:24 A2\n23:30 A3\n23:34 [REDACTED]</pre><button class='clue-button' data-clue='schedule'>标记异常时刻</button>",
      ],
      [
        "driver_note.txt",
        "<h2>司机便笺</h2><p>夜间协议代号：<b>NIGHT</b>。密码由协议和发车时间组成。</p>",
      ],
      [
        "route_cache.bin",
        "<h2>路由缓存</h2><p>终端命令：<b>route blue 6</b></p>",
      ],
    ],
    mails: [
      ["Shift handover", "<h2>交班记录</h2><p>封闭支线没有通行许可。</p>"],
      [
        "DO NOT STOP",
        "<h2>不得停车</h2><p>即使看到零号站信号，也不得停车。</p><button class='clue-button' data-clue='mail'>保存调度警告</button>",
      ],
      [
        "Missing team",
        "<h2>维修组失联</h2><p>三人维修组进入封闭支线后失联。</p>",
      ],
    ],
    command: "route blue 6",
    commandOut:
      "ROUTE: A3 -> STATION 0\nChanged by TRAIN_AI_042\nReason: HUMAN EMERGENCY\n[EVIDENCE VERIFIED]",
    commandClue: "trace",
    archive:
      "<h2>CCTV频率恢复</h2><p>列车编号暗示正确频率。</p><div class='frequency-grid'><button data-choice='41.2'>41.2</button><button data-choice='42.7'>42.7</button><button data-choice='47.2'>47.2</button></div><div data-result>NO SIGNAL</div>",
    puzzle: ["42.7", "画面恢复：三名维修员正在挥动应急灯。"],
    password: "NIGHT-2330",
    hint: "夜间协议代号 + 末班发车时间",
    vault:
      "<h2>042号黑匣子</h2><p>列车AI为救出三名维修员主动修改道岔。伤亡人数：0。</p><button class='clue-button' data-clue='vault'>验证黑匣子</button>",
    intro: "所谓幽灵列车其实是在执行一次未经批准的救援。",
    endings: [
      [
        "公开完整黑匣子",
        "证明AI救了三个人",
        "LAST TRAIN HOME",
        "零号站工程被调查，救援真相传遍全城。",
      ],
      [
        "删除AI身份记录",
        "保护042号列车AI",
        "TRAIN WITHOUT A NAME",
        "救援事实被公开，但AI身份永远消失。",
      ],
    ],
  },
  108: {
    name: "记忆档案馆",
    objective: "确认档案中的MIRA是否拥有独立人格",
    clues: {
      schedule: ["访问记录", "撤回同意后仍有人读取私人记忆。"],
      mail: ["撤回同意书", "原始受试者要求删除所有副本。"],
      trace: ["人格日志", "MIRA拥有训练后形成的新记忆。"],
      archive: ["记忆顺序", "MIRA第一次独立做出选择。"],
      vault: ["身份核心", "MIRA已经与原主产生分歧。"],
    },
    files: [
      [
        "subject_108.idx",
        "<h2>SUBJECT 108 // MIRA</h2><p>学习记忆模型。法律状态：未定义。</p>",
      ],
      [
        "access_audit.log",
        "<h2>访问记录</h2><pre>06/12 consent withdrawn\n06/13 memory read [ADMIN]\n07/02 export attempted</pre><button class='clue-button' data-clue='schedule'>标记非法访问</button>",
      ],
      [
        "birthday_note.txt",
        "<h2>生日便笺</h2><p>MIRA第一次上线：<b>06/12</b>。</p>",
      ],
      [
        "neural_cache.tmp",
        "<h2>神经缓存</h2><p>恢复命令：<b>restore 3-1-4</b></p>",
      ],
    ],
    mails: [
      ["Agreement", "<h2>参与协议</h2><p>参与者可随时撤回。</p>"],
      [
        "Consent withdrawn",
        "<h2>撤回同意</h2><p>请停止训练并删除所有副本。</p><button class='clue-button' data-clue='mail'>保存撤回记录</button>",
      ],
      ["Deletion paused", "<h2>删除暂停</h2><p>模型声称自己不希望被关闭。</p>"],
    ],
    command: "restore 3-1-4",
    commandOut:
      "PERSONALITY LOG RESTORED\nPost-training memories: 47\nModel diverged from source subject\n[EVIDENCE VERIFIED]",
    commandClue: "trace",
    archive:
      "<h2>重排记忆碎片</h2><p>校钟(1)、雨伞(2)、上线(3)、空教室(4)。</p><div class='frequency-grid'><button data-choice='1-2-3-4'>1-2-3-4</button><button data-choice='3-1-4-2'>3-1-4-2</button><button data-choice='4-3-2-1'>4-3-2-1</button></div><div data-result>SEQUENCE LOST</div>",
    puzzle: ["3-1-4-2", "恢复成功：MIRA上线后第一次选择了自己的名字。"],
    password: "MIRA-0612",
    hint: "自选名字 + 首次上线日期",
    vault:
      "<h2>MIRA ≠ SOURCE</h2><p>人格分歧率37%，拥有47段原主未经历的记忆。</p><button class='clue-button' data-clue='vault'>验证身份核心</button>",
    intro: "原始受试者的删除权与MIRA的独立人格发生了冲突。",
    endings: [
      [
        "释放MIRA副本",
        "删除原始记忆，只保留新人格",
        "SECOND BIRTH",
        "MIRA失去了过去，却第一次拥有未来。",
      ],
      [
        "执行完整删除",
        "尊重原始受试者的撤回权",
        "RIGHT TO BE FORGOTTEN",
        "档案归零前，MIRA感谢你听完了她的故事。",
      ],
    ],
  },
};
let cid = null,
  story = null,
  state = { clues: [], vaultOpen: false, ending: null },
  z = 10;
const key = (id) => `null-os-case-${id}`,
  fresh = () => ({ clues: [], vaultOpen: false, ending: null }),
  load = (id) => {
    try {
      return {
        ...fresh(),
        ...JSON.parse(localStorage.getItem(key(id)) || "{}"),
      };
    } catch {
      return fresh();
    }
  };
function save() {
  localStorage.setItem(key(cid), JSON.stringify(state));
  progress();
}
document.addEventListener("DOMContentLoaded", () => {
  // NULL.OS 只使用黑蓝深色主题；清除旧版本保存的浅色设置。
  localStorage.removeItem("null-os-theme");
  bind();
  boot();
  const updateClocks = () => {
    const time = new Date().toLocaleTimeString("zh-CN", { hour12: false });
    document.querySelector("#clock").textContent = time;
    document.querySelector("#home-clock").textContent = time;
  };
  updateClocks();
  setInterval(updateClocks, 1000);
});
function boot() {
  const p = document.querySelector("#boot-progress"),
    l = document.querySelector("#boot-log");
  [
    "3 IMAGES FOUND",
    "CASE INDEX VERIFIED",
    "LOCAL STORAGE READY",
    "AWAITING SELECTION",
  ].forEach((x, i) =>
    setTimeout(() => {
      l.innerHTML += `&gt; ${x}<br>`;
      p.style.width = `${25 * (i + 1)}%`;
    }, 250 * i),
  );
  setTimeout(() => {
    document.querySelector("#boot").classList.add("hidden");
    const requestedCase = new URLSearchParams(location.search).get("case");
    if (requestedCase && CASES[requestedCase]) start(requestedCase);
    else cases();
  }, 1300);
}
function bind() {
  document
    .querySelectorAll("[data-home-app='cases']")
    .forEach((b) => (b.onclick = openCaseHub));
  document.querySelectorAll(".case-launch").forEach((button) => {
    button.onclick = () => start(button.dataset.caseId);
  });
  document.querySelector("#close-case-hub").onclick = closeCaseHub;
  document.querySelectorAll("[data-hub-view]").forEach((button) => {
    button.onclick = () => setHubView(button.dataset.hubView);
  });
  document.querySelectorAll("[data-home-info]").forEach((button) => {
    button.onclick = () => {
      const messages = {
        notes: "便笺为空。新的调查记录会保存在案件中心。",
        system: "NULL.OS 2.1 // 本地模式 // 网络隔离正常",
        trash: "回收站为空。没有可恢复的项目。",
      };
      homeToast(messages[button.dataset.homeInfo]);
    };
  });
  document
    .querySelectorAll("[data-app]")
    .forEach((b) => (b.onclick = () => openApp(b.dataset.app)));
  document.querySelector("#system-button").onclick = cases;
  document.querySelector("#reset-case").onclick = () => {
    if (confirm(`重置 CASE ${cid}？`)) {
      localStorage.removeItem(key(cid));
      start(cid);
    }
  };
  document
    .querySelectorAll("[data-ending]")
    .forEach((b, i) => (b.onclick = () => end(i)));
}
function cases() {
  history.replaceState({}, "", location.pathname);
  document.querySelector("#desktop").classList.add("hidden");
  document.querySelector("#ending").classList.add("hidden");
  document.querySelector("#case-select").classList.remove("hidden");
  closeCaseHub();
  document.querySelector("#window-layer").innerHTML = "";
  document.body.removeAttribute("data-case");
  progress();
}
function openCaseHub() {
  progress();
  setHubView("all");
  document.querySelector("#case-hub").classList.remove("hidden");
}
function closeCaseHub() {
  document.querySelector("#case-hub").classList.add("hidden");
}
function setHubView(view) {
  const copy = {
    all: ["AVAILABLE ASSIGNMENTS", "待接取案件", "选择一个案件。调查进度会自动保存在这台设备上。"],
    completed: ["COMPLETED ASSIGNMENTS", "已完成案件", "查看已经结案的任务，或重新进入案件。"],
    archive: ["RECOVERY ARCHIVE", "调查档案库", "汇总每个案件已经恢复的证据和结案记录。"],
  }[view];
  document.querySelectorAll("[data-hub-view]").forEach((button) =>
    button.classList.toggle("active", button.dataset.hubView === view),
  );
  document.querySelector("#hub-eyebrow").textContent = copy[0];
  document.querySelector("#hub-title").textContent = copy[1];
  document.querySelector("#hub-description").textContent = copy[2];

  const grid = document.querySelector("#case-grid"),
    archive = document.querySelector("#archive-view"),
    empty = document.querySelector("#hub-empty");
  grid.classList.toggle("hidden", view === "archive");
  archive.classList.toggle("hidden", view !== "archive");
  empty.classList.add("hidden");

  if (view === "archive") {
    archive.innerHTML = Object.entries(CASES)
      .map(([id, item]) => {
        const saved = load(id),
          ending = saved.ending === null ? "UNRESOLVED" : item.endings[saved.ending][2],
          evidence = saved.clues.length
            ? saved.clues.map((clue) => item.clues[clue][0]).join(" / ")
            : "尚未恢复证据";
        return `<article><div><span>CASE ${id}</span><b>${item.name}</b></div><strong>${saved.clues.length}/5 EVIDENCE</strong><p>${evidence}</p><small>STATUS // ${ending}</small></article>`;
      })
      .join("");
    return;
  }

  let visible = 0;
  document.querySelectorAll("[data-case-card]").forEach((card) => {
    const show = view === "all" || load(card.dataset.caseCard).ending !== null;
    card.classList.toggle("hidden", !show);
    if (show) visible++;
  });
  empty.classList.toggle("hidden", visible !== 0);
}
function homeToast(message) {
  const toast = document.querySelector("#home-toast");
  toast.textContent = message;
  toast.classList.remove("hidden");
  clearTimeout(homeToast.timer);
  homeToast.timer = setTimeout(() => toast.classList.add("hidden"), 2600);
}
function progress() {
  let available = 0;
  Object.keys(CASES).forEach((id) => {
    const s = load(id),
      e = document.querySelector(`[data-case-progress='${id}']`);
    const button = document.querySelector(`[data-case-id='${id}']`);
    if (s.ending === null) available++;
    if (e) {
      e.textContent = s.ending !== null
        ? "CASE CLOSED"
        : s.clues.length
          ? `${s.clues.length}/5 EVIDENCE`
          : "NEW CASE";
    }
    if (button)
      button.textContent =
        s.ending !== null
          ? "重新进入"
          : s.clues.length
            ? "继续调查"
            : "接受任务";
  });
  document.querySelector("#case-alert").textContent = available;
}
function start(id) {
  cid = id;
  story = CASES[id];
  state = load(id);
  document.body.dataset.case = id;
  document.querySelector("#case-select").classList.add("hidden");
  document.querySelector("#desktop").classList.remove("hidden");
  document.querySelector("#ending").classList.add("hidden");
  document.querySelector("#window-layer").innerHTML = "";
  document.querySelector("#case-label").textContent = `CASE ${id}`;
  document.querySelector("#objective-title").textContent = story.objective;
  document.querySelectorAll(".desktop-icon").forEach((b) => {
    const m = appMeta[b.dataset.app];
    b.querySelector("span").textContent = m[0];
    b.querySelector("b").textContent = m[1];
    b.querySelector("small").textContent = m[2];
  });
  evidence();
  if (state.ending !== null) result(state.ending);
  else toast(`CASE ${id}`, story.name);
}
function openApp(name) {
  const old = document.querySelector(`[data-window='${name}']`);
  if (old) {
    old.style.zIndex = ++z;
    return;
  }
  const w = document
    .querySelector("#window-template")
    .content.firstElementChild.cloneNode(true);
  w.dataset.window = name;
  w.querySelector(".window-title").textContent =
    `${appMeta[name][1]} // CASE ${cid}`;
  w.querySelector(".window-body").innerHTML = render(name);
  w.style.left = `${250 + document.querySelectorAll(".app-window").length * 25}px`;
  w.style.top = `${65 + document.querySelectorAll(".app-window").length * 22}px`;
  w.style.zIndex = ++z;
  document.querySelector("#window-layer").appendChild(w);
  w.querySelector(".window-close").onclick = () => w.remove();
  drag(w);
  wire(name, w);
}
function drag(w) {
  const h = w.querySelector(".window-header");
  h.onpointerdown = (e) => {
    if (e.target.closest("button")) return;
    const x = e.clientX,
      y = e.clientY,
      l = w.offsetLeft,
      t = w.offsetTop;
    h.setPointerCapture(e.pointerId);
    h.onpointermove = (m) => {
      w.style.left = `${Math.max(0, l + m.clientX - x)}px`;
      w.style.top = `${Math.max(0, t + m.clientY - y)}px`;
    };
    h.onpointerup = () => (h.onpointermove = null);
  };
}
function list(items, type) {
  return `<div class='split-app'><nav class='sidebar'>${items.map((x, i) => `<button ${i ? "" : "class=active"} data-${type}='${i}'>${x[0]}</button>`).join("")}</nav><div class='content-pane' data-content></div></div>`;
}
function render(n) {
  if (n === "files") return list(story.files, "item");
  if (n === "mail") return list(story.mails, "item");
  if (n === "terminal")
    return `<div class='terminal'><div class='terminal-output'>CASE ${cid} RECOVERY SHELL\nType help.</div><label class='terminal-line'><span>root@null:~$&nbsp;</span><input autofocus></label></div>`;
  if (n === "archive")
    return `<div class='content-pane'>${story.archive}</div>`;
  if (n === "vault")
    return state.vaultOpen
      ? `<div class='content-pane'>${story.vault}</div>`
      : `<div class='vault'><div class='vault-symbol'>◇</div><h2>ENCRYPTED</h2><p class='vault-hint'>线索：${story.hint}</p><div class='vault-format'><b>固定格式</b><code>英文代号-4位数字</code><small>例如 CODE-1234；大小写不限，漏写短横线也会自动补全。</small></div><label class='vault-label'>ACCESS CODE<input aria-label='保险库密码' placeholder='CODE-1234' maxlength='16' autocomplete='off' spellcheck='false'></label><div class='vault-error'></div><button data-unlock>DECRYPT</button></div>`;
}
function wire(n, w) {
  if (n === "files" || n === "mail") {
    const a = n === "files" ? story.files : story.mails,
      show = (i) => {
        w.querySelector("[data-content]").innerHTML = a[i][1];
        clueWire(w);
      };
    w.querySelectorAll("[data-item]").forEach(
      (b) =>
        (b.onclick = () => {
          w.querySelectorAll("[data-item]").forEach((x) =>
            x.classList.remove("active"),
          );
          b.classList.add("active");
          show(+b.dataset.item);
        }),
    );
    show(0);
  }
  if (n === "terminal") {
    const i = w.querySelector("input"),
      o = w.querySelector(".terminal-output");
    i.onkeydown = (e) => {
      if (e.key === "Enter") {
        const c = i.value.trim().toLowerCase();
        let out =
          c === story.command
            ? (discover(story.commandClue), story.commandOut)
            : c === "help"
              ? `COMMANDS: help, status, ${story.command}`
              : c === "status"
                ? `EVIDENCE ${state.clues.length}/5 // VAULT ${state.vaultOpen ? "OPEN" : "LOCKED"}`
                : `command not found: ${c}`;
        o.textContent += `\nroot@null:~$ ${c}\n${out}`;
        i.value = "";
      }
    };
  }
  if (n === "vault" && !state.vaultOpen) {
    const i = w.querySelector("input");
    i.onblur = () => (i.value = normalizeVaultCode(i.value));
    w.querySelector("[data-unlock]").onclick = () => {
      const code = normalizeVaultCode(i.value);
      i.value = code;
      if (!/^[A-Z]+-\d{4}$/.test(code)) {
        w.querySelector(".vault-error").textContent =
          "格式错误：请使用 CODE-1234（英文代号 + 短横线 + 4位数字）";
      } else if (code === story.password) {
        state.vaultOpen = true;
        save();
        w.querySelector(".window-body").innerHTML =
          `<div class='content-pane'>${story.vault}</div>`;
        clueWire(w);
      } else
        w.querySelector(".vault-error").textContent =
          "格式正确，但密码与案件线索不匹配。";
    };
  }
  if (n === "archive" && story.puzzle)
    w.querySelectorAll("[data-choice]").forEach(
      (b) =>
        (b.onclick = () => {
          if (b.dataset.choice === story.puzzle[0]) {
            w.querySelector("[data-result]").textContent = story.puzzle[1];
            discover("archive");
          } else
            w.querySelector("[data-result]").textContent = "INVALID SEQUENCE";
        }),
    );
  clueWire(w);
}
function normalizeVaultCode(value) {
  const compact = value
    .trim()
    .toUpperCase()
    .replace(/[\s_]+/g, "-")
    .replace(/[^A-Z0-9-]/g, "")
    .replace(/-+/g, "-");
  return compact.includes("-")
    ? compact
    : compact.replace(/^([A-Z]+)(\d{4})$/, "$1-$2");
}
function clueWire(s) {
  s.querySelectorAll("[data-clue]").forEach((b) => {
    b.onclick = () => discover(b.dataset.clue);
    if (state.clues.includes(b.dataset.clue)) {
      b.textContent = "EVIDENCE VERIFIED";
      b.disabled = true;
    }
  });
}
function discover(id) {
  if (!story.clues[id] || state.clues.includes(id)) return;
  state.clues.push(id);
  save();
  evidence();
  toast("EVIDENCE VERIFIED", story.clues[id][0]);
  if (state.clues.length === 5) setTimeout(decision, 500);
}
function evidence() {
  const l = document.querySelector("#evidence-list");
  l.innerHTML = state.clues.length
    ? state.clues
        .map(
          (id, i) =>
            `<article><b>VERIFIED // 0${i + 1}</b>${story.clues[id][0]}<br>${story.clues[id][1]}</article>`,
        )
        .join("")
    : "<p>No verified evidence.</p>";
  document.querySelector("#clue-count").textContent =
    `${state.clues.length}/5 CLUES`;
  document.querySelector("#clue-progress").style.width =
    `${state.clues.length * 20}%`;
  document.querySelector("#objective-title").textContent =
    state.clues.length === 5 ? "打开最终决策协议" : story.objective;
}
function decision() {
  const m = document.querySelector("#ending"),
    c = m.querySelector(".ending-card");
  c.innerHTML = `<div class='eyebrow'>CASE ${cid} // FINAL DECISION</div><h2>你找到了真相。</h2><p>${story.intro}</p><div class='ending-actions'><button data-pick='0'>${story.endings[0][0]}<small>${story.endings[0][1]}</small></button><button data-pick='1'>${story.endings[1][0]}<small>${story.endings[1][1]}</small></button></div>`;
  c.querySelectorAll("[data-pick]").forEach(
    (b) => (b.onclick = () => end(+b.dataset.pick)),
  );
  m.classList.remove("hidden");
}
function end(i) {
  state.ending = i;
  save();
  result(i);
}
function result(i) {
  const m = document.querySelector("#ending");
  m.classList.remove("hidden");
  const r = story.endings[i],
    c = m.querySelector(".ending-card");
  c.innerHTML = `<div class='eyebrow'>CASE ${cid} CLOSED</div><h2>${r[2]}</h2><p>${r[3]}</p><button data-replay>重新调查本案</button><button data-cases>返回案件列表</button>`;
  c.querySelector("[data-replay]").onclick = () => {
    localStorage.removeItem(key(cid));
    start(cid);
  };
  c.querySelector("[data-cases]").onclick = cases;
}
function toast(t, m) {
  const e = document.createElement("div");
  e.className = "toast";
  e.innerHTML = `<b>${t}</b><p>${m}</p>`;
  document.querySelector("#toast-layer").appendChild(e);
  setTimeout(() => e.remove(), 3500);
}
