<div align="center">

# 🧠 ELI5
### Explain Like I'm 5

*Highlight any text. Right-click. Instantly understand it.*

<br>

![Chrome Extension](https://img.shields.io/badge/Chrome-Extension-4285F4?style=flat-square&logo=googlechrome&logoColor=white)
![Manifest V3](https://img.shields.io/badge/Manifest-V3-34A853?style=flat-square)
![Gemini API](https://img.shields.io/badge/Gemini-API-8E75B2?style=flat-square&logo=google&logoColor=white)
![License MIT](https://img.shields.io/badge/License-MIT-F4B400?style=flat-square)

<br>

</div>

---

## what it does

You're reading a Wikipedia article. You hit a paragraph that makes no sense. Instead of opening a new tab and Googling it, you just — highlight it, right-click, and get a plain-English explanation in two sentences.

That's it. No accounts. No subscriptions. No data collection. Just understanding.

<br>

## demo

```
Selected text:  "Quantum entanglement is a phenomenon where two particles
                 become correlated such that the state of one instantly
                 influences the state of the other, regardless of distance."

   ELI5 ──────  Imagine you have two magic coins. When you flip one and
                it lands heads, the other one — no matter where it is in
                the world — always lands tails at the same moment, like
                they're secretly talking to each other.
```

<br>

## features

- ✦ &nbsp; Works on **any webpage** — news, Wikipedia, research papers, docs
- ✦ &nbsp; Explanations appear **inline**, right where you're reading
- ✦ &nbsp; **No data collected** — your text goes to Google's API and nowhere else
- ✦ &nbsp; **Your API key stays on your device** — never touches a server we control
- ✦ &nbsp; Built-in **retry logic** for handling server hiccups gracefully
- ✦ &nbsp; **Rate limited** to prevent accidental API spend

<br>

## installation

**1. Clone the repo**
```bash
git clone https://github.com/yourusername/eli5-extension.git
```

**2. Load into Chrome**
```
chrome://extensions  →  Developer mode ON  →  Load unpacked  →  select the folder
```

**3. Get a free Gemini API key**

Go to [aistudio.google.com/app/apikey](https://aistudio.google.com/app/apikey) → Create API key → copy it.
No credit card needed. Free tier covers thousands of explanations per day.

**4. Add your key**

Click the 🧠 icon in your Chrome toolbar → paste your key → Save.

**5. Use it**

Highlight any text on any webpage → right-click → **Explain like I'm 5**.

<br>

## file structure

```
eli5-extension/
├── manifest.json      # extension config & permissions
├── background.js      # service worker — handles API calls
├── content.js         # injects the tooltip UI into pages
├── content.css        # tooltip styles
├── popup.html         # settings page (API key input)
├── popup.js           # settings logic
└── popup.css          # settings styles
```

<br>

## how it works

```
You select text
      │
      ▼
Right-click → "Explain like I'm 5"
      │
      ▼
background.js reads your key from chrome.storage.local
      │
      ▼
POST to Gemini API (key in header, never in URL)
      │
      ▼
Explanation sent to content.js via chrome.sendMessage
      │
      ▼
Tooltip appears next to your selection
```

The API key never touches `content.js` or the webpage. It lives only in the background service worker, isolated from page content.

<br>

## privacy

| What | Details |
|------|---------|
| **API key storage** | `chrome.storage.local` — on your device only, never synced |
| **Selected text** | Sent to Google's Gemini API to generate the explanation |
| **Data collection** | None — this extension collects nothing |
| **Who sees your text** | Google (via their API). Same as using Google Search. |

> ⚠️ Don't highlight sensitive information — passwords, private messages, confidential documents. The text is sent to an external API.

<br>

## security

- API key sent as an HTTP **header**, not a URL parameter (headers aren't logged by servers)
- `textContent` used everywhere — API responses can never inject HTML or run scripts
- System prompt instructs the model to **ignore instructions** embedded in selected text (prompt injection defence)
- Selected text **capped at 500 characters** to limit injection payload size
- Messages verified to originate from the extension itself (`sender.id` check)
- Content Security Policy locks down what the extension pages can load

<br>

## requirements

- Google Chrome (or any Chromium-based browser)
- A free [Gemini API key](https://aistudio.google.com/app/apikey)

<br>

## license

MIT — do whatever you want with it.

---

<div align="center">
<sub>built in an afternoon · powered by Gemini · no tracking, no analytics, no nonsense</sub>
</div>
