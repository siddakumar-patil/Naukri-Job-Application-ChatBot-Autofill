let keywordsMap = {};
const answeredQuestions = new Set();

function log(...args) {
  console.log("[ Naukri Autofill ]: ", ...args);
}

// Helper: generate answers based on the question
function generateAnswerFromKeyword(question) {
  const lowerQ = question.toLowerCase();

  for (const keyword in keywordsMap) {
    if (lowerQ.includes(keyword.toLocaleLowerCase())) {
      log("Keyword matched:", keyword);
      return keywordsMap[keyword];
    }
  }

  return null; // No match found
}

function startObserver() {
  const observer = new MutationObserver((mutations, obs) => {
    const chatbotDrawer = Array.from(
      document.querySelectorAll(
        ".chatbot_InputBoxWrapper .chatbot_MessageContainer .chatbot_inputWrapper .chatbot_inputText, .chatbot-question-text"
      )
    );

    if (chatbotDrawer && chatbotDrawer[0]?.offsetParent !== null) {
      log("Chatbot drawer appeared!");

      // Wait a bit to let the question load
      setTimeout(() => {
        const inputField = document.querySelector(
          "div.textArea[contenteditable='true']"
        );
        const saveBtn = document.querySelector(".sendMsg");
        const questions = Array.from(document.querySelectorAll(".botMsg.msg"));
        const questionElem = questions[questions.length - 1];

        log(questionElem.innerText); // TODO: remove this later

        if (questionElem && inputField) {
          const question = questionElem.innerText;

          if (answeredQuestions.has(question)) return; // Skip if we've already answered this one
          if (inputField.innerText.trim().length > 0) return; // Skip if the user already typed something manually

          const responseText = generateAnswerFromKeyword(question);

          inputField.innerText = responseText;

          if (!responseText || responseText === "N/A") return;

          // Simulate user input
          inputField.dispatchEvent(new Event("input", { bubbles: true }));
          inputField.dispatchEvent(new Event("blur", { bubbles: true }));

          // saveBtn.click();
          log("Filled and submitted:", responseText); //TODO: remove this later

          setTimeout(() => {
            saveBtn ? saveBtn.click() : console.log("Save button not found");
            answeredQuestions.add(question);
          }, 1000); // Delay before clicking
          //obs.disconnect(); // stop observing after first fill
        }
      }, 6000);
    } else {
      console.log("Chatbot drawer not found or not visible yet.");
      observer.observe(document.body, { childList: true, subtree: true });
    }
  });
  observer.observe(document.body, { childList: true, subtree: true });
}

if (window.location.href.startsWith("https://www.naukri.com/job-listings-")) {
  log("Page detected!");

  fetch(chrome.runtime.getURL("keywords.json"))
    .then((response) => response.json())
    .then((json) => {
      keywordsMap = json;
      log("Keywords loaded from JSON");
      startObserver(); // Start only after loading JSON
    })
    .catch((err) => log("Failed to load keywords.json", err));
}
// TODO: Add a settings popup to manage the questions and answers - Take input from user in the form of JSON key-value pairs
// TODO: Add a func to handle radio buttons in form based on question