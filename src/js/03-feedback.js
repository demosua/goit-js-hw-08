import throttle from 'lodash.throttle';

const form = document.querySelector(".feedback-form")
const SAVED_MESSAGE = 'feedback-form-state';

populateTextArea();

form.addEventListener('submit', onFormSubmit);
form.addEventListener('input', throttle(e => {
    saveInLocalStorage(e);
}, 500));

function onFormSubmit(e) {
    e.preventDefault();
    e.currentTarget.reset();
    console.log(JSON.parse(localStorage.getItem(SAVED_MESSAGE)));
    localStorage.removeItem(SAVED_MESSAGE);
}

function saveInLocalStorage(e) {
    let savedFeedback = JSON.parse(localStorage.getItem(SAVED_MESSAGE));
    savedFeedback[e.target.name] = e.target.value;
    localStorage.setItem(SAVED_MESSAGE, JSON.stringify(savedFeedback));
}

function populateTextArea() {

    const savedFeedback = JSON.parse(localStorage.getItem(SAVED_MESSAGE));

    if(savedFeedback) {
        form.querySelector("[name='email']").value = savedFeedback.email;
        form.querySelector("[name='message']").value = savedFeedback.message;
        return;
    }
    
    localStorage.setItem(SAVED_MESSAGE, JSON.stringify({ email: "", message: "" }));
}