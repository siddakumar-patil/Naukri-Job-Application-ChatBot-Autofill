// 1. Get the DOM element to observe
// 2. Create a MutationObserver to watch for changes
// 3. When the element appears, fill the input field and click the button
// 4. Disconnect the observer after the first fill
// 5. Optionally, you can set an interval to keep checking if the element appears again
// 6. You can also add a check to see if the input field is already filled to avoid overwriting

// TODO: Add a settings page to manage the questions and answers - Take input from user in the form of JSON key-value pairs
// TODO: Add a func to handle radio buttons in form based on question

// TODO: Remove hard coded values and use a settings page to manage the questions and answers
const keywordsMap = {
  "title": "Software Engineer",
  "First Name": "Siddakumar",
  "Last Name": "Patil",
  "Email": "test@test.com",
  "Phone": "1234567890",
  "current location": "Bengaluru, KA, India",
  "current company": "Fidelity Information Services(FIS) (Fintech)",
  "current organization": "Fidelity Information Services(FIS) (Fintech)",
  "current designation": "Software Engineer",
  "current CTC": "Rs.8,00,000 - Rs.12,00,000",
  "current annual CTC": "Rs.8,00,000 - Rs.12,00,000",
  "expected CTC": "Rs.12,00,000 - Rs.16,00,000",
  "expected annual CTC": "Rs.8,00,000 - Rs.12,00,000",
  "serving notice": "Yes",
  "qualification": "B.E/B.Tech(Computer Science & Engineering)",
  "specialization": "Computer Science & Engineering",
  "degree": "B.E/B.Tech",
  "branch": "Computer Science & Engineering",
  "college":  "VTU, Belagavi, KA, India",
  "university": "VTU, Belagavi, KA, India",
  "year of passing": "2021",
  "year of graduation": "2021",
  "percentage": "80%",
  "current job type": "Permanent",
  "experience": "3 - 4 Years",
  "ready to": "Yes",
  "willing to": "Yes",
  "experience of working on a Product": "Yes",
  "relocate to": "Yes",
  "Immediate": "Yes",
  "IIT": "No",
};

const answeredQuestions = new Set(); // to keep track of answered questions

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

// Check if we're on the right page
if (window.location.href.startsWith("https://www.naukri.com/job-listings-")) {
  log("Page detected!");

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
        const inputField = document.querySelector( "div.textArea[contenteditable='true']");
        const saveBtn = document.querySelector(".sendMsg");
        const questions = Array.from(document.querySelectorAll(".botMsg.msg") );
        const questionElem = questions[questions.length - 1];

        log(questionElem.innerText); // TODO: remove this later

        if (questionElem && inputField) {
          const question = questionElem.innerText;

          if (answeredQuestions.has(question)) return;  // Skip if we've already answered this one
          if (inputField.innerText.trim().length > 0) return;// Skip if the user already typed something manually

          const responseText = generateAnswerFromKeyword(question);

          inputField.innerText = responseText;

          // Simulate user input
          inputField.dispatchEvent(new Event("input", { bubbles: true }));
          inputField.dispatchEvent(new Event("blur", { bubbles: true }));

          // saveBtn.click();
          log("Filled and submitted:", responseText); //TODO: remove this later

          setTimeout(() => {
            saveBtn ? saveBtn.click(): console.log("Save button not found");
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

  // Start watching the DOM for changes (e.g., when chatbot appears)
  observer.observe(document.body, { childList: true, subtree: true });
}



// Note: Class name to getElements might change, so check the actual class names