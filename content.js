let tooltip = null;

function removeTooltip() {
  if (tooltip) { tooltip.remove(); tooltip = null; }
}

// Every piece of text goes through textContent — never innerHTML
// This neutralises XSS even if the API response is manipulated
function buildTooltip(type, message) {
  const wrap = document.createElement("div");
  wrap.className = "eli5-tooltip";

  if (type === "loading") {
    const spinner = document.createElement("div");
    spinner.className = "eli5-spinner";
    const label = document.createElement("span");
    label.textContent = "Simplifying…";
    wrap.classList.add("eli5-loading");
    wrap.append(spinner, label);

  } else if (type === "result") {
    const header = document.createElement("div");
    header.className = "eli5-header";
    header.textContent = "🧠 ELI5";

    const body = document.createElement("div");
    body.className = "eli5-body";
    body.textContent = message;      // textContent = XSS safe, always

    const close = document.createElement("button");
    close.className = "eli5-close";
    close.setAttribute("aria-label", "Dismiss");
    close.textContent = "✕";
    close.onclick = removeTooltip;

    wrap.append(header, body, close);

  } else if (type === "error") {
    const err = document.createElement("div");
    err.className = "eli5-error";
    err.textContent = "⚠️ " + message;
    wrap.append(err);
  }

  return wrap;
}

function showTooltip(type, message) {
  removeTooltip();

  const sel = window.getSelection();
  if (!sel || !sel.rangeCount) return;
  const rect = sel.getRangeAt(0).getBoundingClientRect();

  tooltip = buildTooltip(type, message);
  document.body.appendChild(tooltip);

  // Position below selection, clamped to viewport width
  tooltip.style.top  = (window.scrollY + rect.bottom + 10) + "px";
  tooltip.style.left = Math.max(10, Math.min(
    window.scrollX + rect.left,
    window.innerWidth - 320
  )) + "px";

  // Dismiss on any outside click
  setTimeout(() => {
    document.addEventListener("click", (e) => {
      if (!tooltip?.contains(e.target)) removeTooltip();
    }, { once: true });
  }, 100);
}

chrome.runtime.onMessage.addListener((msg, sender) => {
  // Verify the message is from our own extension, not a spoofed page script
  if (sender.id !== chrome.runtime.id) return;

  if      (msg.type === "ELI5_LOADING") showTooltip("loading");
  else if (msg.type === "ELI5_RESULT")  showTooltip("result", msg.text);
  else if (msg.type === "ELI5_ERROR")   showTooltip("error",  msg.text);
});