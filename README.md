# 🚀 Naukri Job Application Chatbot Autofiller

A Chrome extension that **automatically fills chatbot questions** when applying for jobs on [Naukri.com](https://www.naukri.com), using keyword-based matching from a customizable JSON configuration.

---

## What Problem Does It Solve?

When applying to jobs on Naukri, you're often required to fill repetitive chatbot questions like:

- _"First Name"_
- _"What is your current location?"_
- _"How many years of experience do you have in Java?"_
- _"What is your expected CTC?"_

Manually typing these over and over is time-consuming and error-prone. This extension automatically detects those questions and fills in your preconfigured answers — giving you **faster applications** and **fewer headaches**.

---

## How It Works

1. It watches for the appearance of the Naukri chatbot drawer on job listing pages.
2. When a question appears, it checks for **matching keywords** (like `location`, `experience`, etc.) in the question.
3. If a match is found in your config (`keywords.json`), it auto-fills the input and clicks the **Save** button.
4. Already-answered questions and manually typed inputs are ignored.

---

## keywords.json Format

Answers are configured in a simple JSON format using keyword matching:

```json
{
  "location": "Bengaluru",
  "java": "3 - 4",
  "expected ctc": "Rs.12,00,000 - Rs.16,00,000",
  "product based": "Yes",
  "notice period": "N.A"
}
```
##### Tip: Keys are matched case-insensitively and can be partial — like "location" will match "current location"

## How to Use

1. **Clone the repo** or **download it as a ZIP** and extract it.
2. **Update Keywords.json** ⚠️  
   **This step is required** — Update `keywords.json` with related data like `location`, `experience`, etc.

3. Open **Google Chrome** and go to: `chrome://extensions`
4. **Enable Developer Mode** if not enabled (toggle at the top-right corner).
5. Click **"Load Unpacked"** and select the project folder.
6. Navigate to a **Naukri job listing** that opens a chatbot (URL starts with `https://www.naukri.com/job-listings-`).
7. The extension will:
   -  Wait for the chatbot drawer to appear.
   - Detect the current question being asked.
   - Auto-fill an answer based on matching keywords from your `keywords.json`.
   - Click the save button to submit the response.
---