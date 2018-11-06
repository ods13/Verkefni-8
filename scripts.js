const ENTER_KEYCODE = 13;

document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('.form');
  const items = document.querySelector('.items');

  text.init(form, items);
});

const text = (() => {
  let items;

  

  function init(_form, _items) {
    items = _items;
    form = _form;

    itemText = form.querySelector('.form__input');

    form.addEventListener('submit', formHandler);

    _items.addEventListener('click', deleteItem);

    _items.addEventListener('click', edit);

    _items.addEventListener('keyup', commit);

    _items.addEventListener('click', finish);

    // TODO láta hluti í _items virka
  }

  function formHandler(e) {
    e.preventDefault();
    let texti = document.querySelector('.form__input').value;

    if (texti.trim() != "") {
      add(texti);
    }

    document.querySelector('.form__input').value = "";
  }

  // event handler fyrir það að klára færslu
  function finish(e) {
    if (e.target.classList.contains('item__checkbox')) {
      e.target.parentNode.classList.toggle('item--done');
    }

  }

  // event handler fyrir það að breyta færslu
  function edit(e) {
    if (e.target.classList.contains('item__text')) {
      const textVal = e.target.innerHTML;
      const input = document.createElement('input');
      input.setAttribute('type', 'text');
      input.className = (e.target.classList, 'item__edit');
      input.value = textVal;
      const span = e.target;
      const li = e.target.parentElement;
      li.replaceChild(input, span);
      input.focus();
    }

  }

  // event handler fyrir það að klára að breyta færslu
  function commit(e) {
    if (e.keyCode === ENTER_KEYCODE) {
      if (e.target.classList.contains('item__edit')) {
        const textVal = e.target.value;
        const span = document.createElement('span');
        span.className = 'item__text';
        span.innerHTML = textVal;
        const input = e.target;
        const li = e.target.parentElement;
        li.replaceChild(span, input);
      }
    }
  }

  // fall sem sér um að bæta við nýju item
  function add(value) {
    const liElement = el('li', 'item');

    const inputElement = el('input', 'item__checkbox');
    inputElement.setAttribute('type', 'checkbox');

    const spanElement = el('span', 'item__text', value);

    const buttonElement = el('button', 'item__button', 'Eyða');

    liElement.appendChild(inputElement);
    liElement.appendChild(spanElement);
    liElement.appendChild(buttonElement);

    document.getElementById("items").appendChild(liElement);

  }

  // event handler til að eyða færslu
  function deleteItem(e) {
    if (e.target.textContent == "Eyða") {
      items.removeChild(e.target.parentNode);
    }
  }

  // hjálparfall til að útbúa element
  function el(type, className, textNode) {
    const teg = document.createElement(type);
    if (className) {
      teg.classList.add(className);
    }
    if (textNode) {
      teg.appendChild(document.createTextNode(textNode));
    }
    return teg;
  }

  return {
    init: init
  }
})();