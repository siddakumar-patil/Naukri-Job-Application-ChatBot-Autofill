// 1. Get the DOM element to observe
// 2. Create a MutationObserver to watch for changes
// 3. When the element appears, fill the input field and click the button
// 4. Disconnect the observer after the first fill
// 5. Optionally, you can set an interval to keep checking if the element appears again
// 6. You can also add a check to see if the input field is already filled to avoid overwriting

// TODO : Avoid spamming job applications
// TODO : Add a delay between each submission
// TODO : Add a settings page to manage the questions and answers - Take input from user in the form of JSON key-value pairs
// TODO : Add a func to handle radio buttons in form based on question

const questionsMap = {
  // TODO: Remove hard coded values and use a settings page to manage the questions and answers
  "What is your current location?": "Hyderabad",
  "What is your current company name?": "TCS",
  "What is your current designation?": "Software Engineer",
  "What is your current CTC in INR ?": "Rs.8,00,000 - Rs.12,00,000",
  "What is your highest qualification?": "B.E/B.Tech",
  "What is your highest qualification stream?": "Computer Science",
  "What is your highest qualification university?": "NIT",
  "What is your highest qualification year of passing?": "2020",
  "What is your highest qualification percentage?": "70%",
  "What is your current notice period?": "Immediate",
  "What is your current role?": "Software Engineer",
  "What is your current job type?": "Permanent",
  "How many years of experience do you have in Java ?": "3 - 4",
  "Do you have experience of working on a Product / in a Product based organization?":
    "Yes",
  "Are you currently living in or ready to relocate to Hyderabad?": "Yes",
  "What is your expected annual CTC in INR ?": "Rs.12,00,000 - Rs.16,00,000",
  "If serving notice, what is the last working day in the office?": "N.A",
  "title": "Software Engineer",
  "First Name": "John",
  "Last Name": "Doe",
  "Email": "test@test.com"
};

const answeredQuestions = new Set(); // to keep track of answered questions

function log(...args) {
  console.log("[ Naukri Autofill ]: ", ...args);
}

// Helper: generate answers based on the question
function generateAns(question) {
  const cleaned = question.trim();
  return questionsMap[cleaned] || "N/A";
}

// Check if we're on the right page
if (window.location.href.startsWith("https://www.naukri.com/job-listings-")) {
  log("Page detected!");

  const observer = new MutationObserver((mutations, obs) => {
    const chatbotDrawer = Array.from(
      document.querySelectorAll(
        ".chatbot_InputBoxWrapper .chatbot_MessageContainer .chatbot_inputWrapper .chatbot_inputText, .chatbot-question-text"
      ) // These might change, so check the actual class names
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

          // Skip if we've already answered this one
          if (answeredQuestions.has(question)) return;

          // Skip if the user already typed something manually
          if (inputField.innerText.trim().length > 0) return;
          const responseText = generateAns(question);

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