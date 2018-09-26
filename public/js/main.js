(function() {
'use strict'
const editButton = document.querySelector('.page-title__edit-button');
const saveButton = document.querySelector('.page-title__save-button');
const discardButton = document.querySelector('.page-title__discard-button');
const titleTextWrap = document.querySelector('.page-title__text-wrap');
const titleText = document.querySelector('.page-title__text');
const titleInputWrap = document.querySelector('.page-title__input-wrap');
const titleInput = document.querySelector('.page-title__input');
const slugContainer = document.querySelector('.page-title__slug');

const saveTitleToDb = function(title = '') {
    if (title != '') {
        return 'sdfsd-sdfdsf-dsfsdf';
    }
};

const editHandler = (event) => {
    titleTextWrap.classList.add('hidden');
    titleInputWrap.classList.add('page-title__input-wrap--active');
    titleInput.focus();
    titleInput.value = titleText.textContent;
    saveButton.classList.remove('page-title__save-button--disabled');
    generateSlug(titleText.textContent)
    .then((slug) => {
        slugContainer.textContent = slug;
    });
    event.preventDefault();
}
editButton.addEventListener('click', editHandler);

const saveHandler = (event) => {
    if (titleInput.value.replace(/\s/g, '') != '') {
        titleTextWrap.classList.remove('hidden');
        titleInputWrap.classList.remove('page-title__input-wrap--active');
        let slug = saveTitleToDb(titleInput.value);
    }
    event.preventDefault();
}
saveButton.addEventListener('click', saveHandler);

const discardHandler = (event) => {
    titleTextWrap.classList.remove('hidden');
    titleInputWrap.classList.remove('page-title__input-wrap--active');
    titleInput.value = '';
    event.preventDefault();
}
discardButton.addEventListener('click', discardHandler);

async function isSlugExist(slug) {
    let response = await fetch('/check-slug/' + slug);
    let responseText = await response.text();
    return responseText;
};

const generateRandomString = () => {
    var text = "";
    var possible = "abcdefghijklmnopqrstuvwxyz";
  
    for (var i = 0; i < 5; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
  
    return text;
  }
  

const generateSlug = async (title) => {
    let slug = title.toString().toLowerCase()
        .replace(/\s+/g, '-')           // Replace spaces with -
        .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
        .replace(/\-\-+/g, '-')         // Replace multiple - with single -
        .replace(/^-+/, '')             // Trim - from start of text
        .replace(/-+$/, '');            // Trim - from end of text
    let response = await isSlugExist(slug);
    if (response === 'true'){
        return slug += generateRandomString();
    } else {
        return slug;
    }
}

const inputHandler = (event) => {
    let inputValue = event.srcElement.value;
    inputValue = inputValue.trim();
    if (inputValue != '') {
        saveButton.classList.remove('page-title__save-button--disabled');
        generateSlug(inputValue)
        .then((slug) => {
            slugContainer.textContent = slug;
        })
    } else {
        saveButton.classList.add('page-title__save-button--disabled');
        slugContainer.textContent = '';
    }
}
titleInput.addEventListener('change', inputHandler);
titleInput.addEventListener('paste', inputHandler);
titleInput.addEventListener('input', inputHandler);


/*fetch('http://example.com/movies.json')
  .then(function(response) {
    return response.json();
  })
  .then(function(myJson) {
    console.log(JSON.stringify(myJson));
  });
*/
})()