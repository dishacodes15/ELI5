const keyInput = document.getElementById("key");
const status   = document.getElementById("status");

function showStatus(message, isError = false) {
  status.textContent = message;
  status.className = "visible " + (isError ? "error" : "success");
  setTimeout(() => status.className = "", 2500);
}

chrome.storage.local.get("apiKey", ({ apiKey }) => {
  if (apiKey) {
    keyInput.placeholder = "••••••••" + apiKey.slice(-4);
  }
});

document.getElementById("save").addEventListener("click", () => {
  const key = keyInput.value.trim();
  if (!key) return;

  chrome.storage.local.set({ apiKey: key }, () => {
    keyInput.value = "";
    keyInput.placeholder = "••••••••" + key.slice(-4);
    showStatus("Saved ✓");
  });
});