import locStorage from "./storage.js";
import throttle from 'lodash.throttle';

const SAVED_MESSAGE = 'feedback-form-state';

const refs = {
    form: document.querySelector(".feedback-form"),
    email: document.querySelector(".feedback-form input"),
    textArea: document.querySelector(".feedback-form textarea"),
};

refs.form.addEventListener('submit', onFormSubmit);
refs.form.addEventListener('input', throttle(onFormInput, 500));

onPageLoad();

function onPageLoad() {
    const savedStorage = locStorage.load(SAVED_MESSAGE);

    if (savedStorage) {
        refs.email.value = savedStorage.email;
        refs.textArea.value = savedStorage.message;
    } else {
        locStorage.save(SAVED_MESSAGE, {email: "", message: ""});
    }
    
}

function onFormInput(e) {
    locStorage.save(SAVED_MESSAGE, {email: refs.email.value, message: refs.textArea.value});
}

function onFormSubmit(e) {
    e.preventDefault();
    e.currentTarget.reset();
    console.log(locStorage.load(SAVED_MESSAGE));
    locStorage.save(SAVED_MESSAGE, {email: "", message: ""});
}