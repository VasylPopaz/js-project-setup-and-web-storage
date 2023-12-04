import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
let formData = {};

document.addEventListener('DOMContentLoaded', onPageLoad);
form.addEventListener('input', throttle(onFormInput, 500));
form.addEventListener('submit', onFormSubmit);

// Save to local storage
function saveToLS(key, value) {
  try {
    const serializedState = JSON.stringify(value);
    localStorage.setItem(key, serializedState);
  } catch (error) {
    console.error('Set state error: ', error.message);
  }
}
// Load from local storage
function loadToLS(key) {
  try {
    const serializedState = localStorage.getItem(key);
    return serializedState === null ? undefined : JSON.parse(serializedState);
  } catch (error) {
    console.error('Get state error: ', error.message);
  }
}

function onFormInput(event) {
  formData[event.target.name] = event.target.value;
  // localStorage.setItem('feedback-form-state', JSON.stringify(formData));
  saveToLS('feedback-form-state', formData);
}

function onPageLoad() {
  // const savedKey = localStorage.getItem('feedback-form-state');
  // if (!savedKey) return;
  // try {
  //   formData = JSON.parse(savedKey);
  // } catch (error) {
  //   console.log(error.name);
  //   console.log(error.message);
  // }

  const savedKey = loadToLS('feedback-form-state');
  if (!savedKey) return;
  formData = savedKey;
  Object.keys(formData).forEach(key => {
    form[key].value = formData[key];
  });
}

function onFormSubmit(event) {
  event.preventDefault();
  if (!form['email'].value || !form['message'].value) {
    alert('Введіть данні!');
    return;
  }
  console.log(formData);
  formData = {};
  localStorage.removeItem('feedback-form-state');
  form.reset();
}
