document.body.classList.add("page-exit");

setTimeout(function () {

    window.location.href = "message.html";

}, 500);
const textElement =
    document.getElementById("typedText");

if (!textElement) return;

textElement.innerHTML = "";

typingIndex = 0;

typeNextCharacter(textElement);
if (typingIndex < proposalText.length) {

    const character =
        proposalText.charAt(typingIndex);

    element.innerHTML +=
        character === "\n"
        ? "<br>"
        : character;

    typingIndex++;

    /*
      Approximately human reading speed.
      Sinhala characters get slightly different
      timing.
    */

    let delay = 55;

    if (character === " ") {
        delay = 35;
    }

    if (
        character === "." ||
        character === "!" ||
        character === "?"
    ) {
        delay = 250;
    }

    if (character === "🩷" ||
        character === "🥹" ||
        character === "💝") {
        delay = 150;
    }

    setTimeout(function () {

        typeNextCharacter(element);

    }, delay);

}

else {

    /* Text finished */

    setTimeout(function () {

        startHeartRain();

    }, 400);


    /*
      Next button appears 3 seconds
      after typing has finished.
    */

    setTimeout(function () {

        const button =
            document.getElementById(
                "nextButtonContainer"
            );

        if (button) {

            button.classList.add("show");

        }

    }, 3000);
}
const container =
    document.getElementById("heartsContainer");

if (!container) return;


const heartTypes = [
    "💞",
    "💖"
];


/*
  Keep creating hearts.
*/

setInterval(function () {

    createHeart(container);

}, 180);
const heart =
    document.createElement("span");


/*
  Randomly choose 💞 or 💖
*/

heart.innerText =
    Math.random() < 0.5
    ? "💞"
    : "💖";


heart.classList.add("falling-heart");


/*
  Random horizontal position
*/

heart.style.left =
    Math.random() * 100 + "%";


/*
  Small random size
*/

const size =
    Math.random() * 10 + 13;

heart.style.fontSize =
    size + "px";


/*
  Random falling duration
*/

const duration =
    Math.random() * 3 + 4;

heart.style.animationDuration =
    duration + "s";


/*
  Random rotation
*/

const rotation =
    Math.random() * 720 - 360;

heart.style.setProperty(
    "--rotation",
    rotation + "deg"
);


/*
  Random horizontal movement
*/

const movement =
    Math.random() * 120 - 60;

heart.style.setProperty(
    "--movement",
    movement + "px"
);


container.appendChild(heart);


/*
  Remove after animation
*/

setTimeout(function () {

    heart.remove();

}, (duration + 1) * 1000);
document.body.classList.add("page-exit");

setTimeout(function () {

    window.location.href =
        "question.html";

}, 500);
const options =
    document.querySelectorAll(".option");

if (!options.length) return;


options.forEach(function(option) {

    option.addEventListener(
        "click",
        function() {

            /*
              Remove selection from all
            */

            options.forEach(function(item) {

                item.classList.remove(
                    "selected"
                );

            });


            /*
              Select clicked option
            */

            option.classList.add(
                "selected"
            );


            selectedOption =
                option.dataset.option;


            document.getElementById(
                "selectedOption"
            ).value =
                selectedOption;

        }
    );

});


/*
  Character counter
*/

const textarea =
    document.getElementById(
        "customMessage"
    );

const counter =
    document.getElementById(
        "charCount"
    );


if (textarea && counter) {

    textarea.addEventListener(
        "input",
        function() {

            counter.innerText =
                textarea.value.length;

        }
    );

}


/*
  Form submission
*/

const form =
    document.getElementById(
        "proposalForm"
    );


if (form) {

    form.addEventListener(
        "submit",
        submitProposal
    );

}
event.preventDefault();


const form =
    event.target;


const option =
    document.getElementById(
        "selectedOption"
    ).value;


const customMessage =
    document.getElementById(
        "customMessage"
    ).value;


const status =
    document.getElementById(
        "formStatus"
    );


const submitButton =
    document.getElementById(
        "submitButton"
    );


/*
  Require option selection
*/

if (!option) {

    status.innerText =
        "මුලින් option එකක් තෝරන්න 🥹❤️";

    status.className =
        "form-status error";

    return;

}


/*
  Disable button while sending
*/

submitButton.disabled = true;

submitButton.innerText =
    "Sending... 💌";


/*
  Formspree endpoint
*/

const formspreeURL =
    "https://formspree.io/f/mgavybde";


const formData =
    new FormData(form);


try {

    const response =
        await fetch(
            formspreeURL,
            {
                method: "POST",
                body: formData,
                headers: {
                    "Accept":
                        "application/json"
                }
            }
        );


    if (response.ok) {

        /*
          Save response locally
          for result page.
        */

        localStorage.setItem(
            "proposalOption",
            option
        );


        localStorage.setItem(
            "proposalMessage",
            customMessage
        );


        /*
          Go to result page
        */

        window.location.href =
            "result.html";

    }

    else {

        throw new Error(
            "Form submission failed"
        );

    }

}

catch (error) {

    console.error(error);

    status.innerText =
        "Something went wrong. ආයෙත් try කරන්න ❤️";

    status.className =
        "form-status error";


    submitButton.disabled =
        false;

    submitButton.innerText =
        "Send My Answer ❤️";

}
const title =
    document.getElementById(
        "resultTitle"
    );

const message =
    document.getElementById(
        "resultMessage"
    );


if (!title || !message) return;


const option =
    localStorage.getItem(
        "proposalOption"
    );


if (option === "1") {

    title.innerText =
"Congratulations Suddiiii 🥹❤️";

    message.innerText =
        "මම ඔයාට ආදරෙයි ❤️";

}

else if (option === "2") {

    title.innerText =
        "ඒකට කමක් නැහැ ❤️";

    message.innerText =
        "මම ඔයාගෙ ඕනෙම දේකදි ඔයා එක්ක ඉන්නව ❤️";

}

else if (option === "3") {

    title.innerText =
        "මට ඔයා යාලුවෙක් විතරක් නෙමේ. 🥺💝";

    message.innerText =
        "";

}

else {

    title.innerText =
        "Thank You ❤️";

    message.innerText =
        "ඔයාගේ අදහස මට කියපු එකට ස්තූතියි 🥹";

}


createResultHearts();
const container =
    document.getElementById(
        "resultHearts"
    );


if (!container) return;


setInterval(function() {

    const heart =
        document.createElement(
            "span"
        );


    heart.innerText =
        Math.random() < 0.5
        ? "❤️"
        : "💖";


    heart.className =
        "result-heart";


    heart.style.left =
        Math.random() * 100 + "%";


    heart.style.animationDuration =
        Math.random() * 3 + 4 + "s";


    container.appendChild(
        heart
    );


    setTimeout(function() {

        heart.remove();

    }, 7000);

}, 350);
    /*
      Message page
    */

    if (
        document.getElementById(
            "typedText"
        )
    ) {

        setTimeout(
            startTypewriter,
            700
        );

    }


    /*
      Question page
    */

    if (
        document.getElementById(
            "proposalForm"
        )
    ) {

        setupQuestionPage();

    }


    /*
      Result page
    */

    if (
        document.getElementById(
            "resultTitle"
        )
    ) {

        showResult();

    }

}

