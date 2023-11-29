import throttle from 'lodash.throttle';
const refs = {
  form: document.querySelector('.feedback-form'),
  email: document.querySelector('input[name=email]'),
  message: document.querySelector('textarea[name=message]'),
};
let formData = {};

function onFormInput(event) {
  formData[event.target.name] = event.target.value;
  localStorage.setItem('feedback-form-state', JSON.stringify(user));
}

function onPageLoad() {
  if (!localStorage.length) return;
  formData = JSON.parse(localStorage.getItem('feedback-form-state'));
  refs.email.value = formData?.email;
  refs.message.value = formData?.message;
}

function onFormSubmit() {
  localStorage.clear();
  refs.form.reset();
}

document.addEventListener('DOMContentLoaded', onPageLoad);
refs.form.addEventListener('input', throttle(onFormInput, 500));
document.addEventListener('submit', onFormSubmit);
