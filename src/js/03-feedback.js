import throttle from 'lodash.throttle';
import storage from './storage';

const form = document.querySelector('.feedback-form');
let formData = {};
onPageLoad();
form.addEventListener('input', throttle(onFormInput, 500));
form.addEventListener('submit', onFormSubmit);

function onFormInput(event) {
  formData[event.target.name] = event.target.value;
  storage.saveToLS('feedback-form-state', formData);
}

function onPageLoad() {
  const savedKey = storage.loadToLS('feedback-form-state');
  formData = savedKey || {};
  Object.keys(formData).forEach(key => {
    form[key].value = formData[key];
  });
}

function onFormSubmit(event) {
  const { email, message } = event.target;
  event.preventDefault();
  if (!email.value || !message.value) {
    alert('Введіть данні!');
    return;
  }
  console.log(formData);
  formData = {};
  localStorage.removeItem('feedback-form-state');
  event.target.reset();
}
