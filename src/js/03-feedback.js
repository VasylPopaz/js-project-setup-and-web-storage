import throttle from 'lodash.throttle';
const refs = {
  form: document.querySelector('.feedback-form'),
  email: document.querySelector('input[name=email]'),
  message: document.querySelector('textarea[name=message]'),
};
let user = {
  email: '',
  message: '',
};

function onFormInput() {
  user.email = refs.email.value;
  user.message = refs.message.value;
  localStorage.setItem('feedback-form-state', JSON.stringify(user));
}

function onPageLoad() {
  if (!localStorage.length) return;
  user = JSON.parse(localStorage.getItem('feedback-form-state'));
  refs.email.value = user.email;
  refs.message.value = user.message;
}

function onFormSubmit() {
  localStorage.clear();
  refs.form.reset();
}

refs.form.addEventListener('input', throttle(onFormInput, 500));
document.addEventListener('DOMContentLoaded', onPageLoad);
document.addEventListener('submit', onFormSubmit);
