import throttle from 'lodash.throttle';

const refs = {
    form: document.querySelector(".feedback-form"),
    email: document.querySelector(".feedback-form input"),
    textArea: document.querySelector(".feedback-form textarea"),
};

const SAVED_MESSAGE = 'feedback-form-state';
populateTextArea();

refs.form.addEventListener('submit', onFormSubmit);
refs.email.addEventListener('input', throttle(onEmailInput, 500));
refs.textArea.addEventListener('input', throttle(onTextAreaInput, 500));

function onFormSubmit(e) {
    e.preventDefault();
    e.currentTarget.reset();
    console.log(JSON.parse(localStorage.getItem(SAVED_MESSAGE)));
    localStorage.removeItem(SAVED_MESSAGE);
}

function onEmailInput(e) {
    const email = e.target.value;
    const savedFeedback = JSON.parse(localStorage.getItem(SAVED_MESSAGE));
    savedFeedback.email = email;
    localStorage.setItem(SAVED_MESSAGE, JSON.stringify(savedFeedback));
}

function onTextAreaInput(e) {
    const message = e.target.value;
    const savedFeedback = JSON.parse(localStorage.getItem(SAVED_MESSAGE));
    savedFeedback.message = message;
    localStorage.setItem(SAVED_MESSAGE, JSON.stringify(savedFeedback));
}


function populateTextArea() {
    const savedFeedback = JSON.parse(localStorage.getItem(SAVED_MESSAGE));

    if(savedFeedback) {
        refs.email.value = savedFeedback.email;
        refs.textArea.value = savedFeedback.message;
    }
    else {
        const savedFeedback = { email: "", message: "" };
        localStorage.setItem(SAVED_MESSAGE, JSON.stringify(savedFeedback));
    }
}