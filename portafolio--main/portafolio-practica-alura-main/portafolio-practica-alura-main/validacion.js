const boton = document.querySelector("#btn");

const inputName = document.querySelector("#nombre");
const inputEmail = document.querySelector("#email");
const inputAsunto = document.querySelector("#asunto");
const inputMensaje = document.querySelector("#mensaje");

const errorMessages = {
  nombre: {
    message: "agregue su nombre"
  },
  email: {
    message: "email no es valido"
  },
  asunto: {
    message:"agregue un asunto"
  },
  mensaje: {
    message:"agregue un mensaje"
  },
  error: {
    message:"longitud maxima"
  },
};

function createElement() {
  const element = document.createElement("p");
  element.classList.add("error");
  return element
}

function handleInput(input, message, condition) {
  // Si el input está vacío o si se cumple la condición
  if (!input.value) {
    let error = input.labels[0].nextSibling;
    if (error) error.remove();
    const errorElement = createElement();
    errorElement.textContent = errorMessages[input.name]?.message;
    input.labels[0].insertAdjacentElement("afterend", errorElement);
    addStyles(input, true);
    return true;
  } else if (condition) {
    let error = input.labels[0].nextSibling;
    if (error) error.remove();
    const errorElement = createElement();
    errorElement.textContent = message;
    input.labels[0].insertAdjacentElement("afterend", errorElement);
    addStyles(input, true);
  } else {
    let error = input.labels[0].nextSibling;
    if (error) error.remove();
    addStyles(input, false);
    return false;
  }
}

function addStyles(element, status) {
  if (status) {
    element.labels[0].style.color = "red";
    element.style.borderBottom = "2px solid red";
  } else {
    element.labels[0].style.color = "var(--cor-de-btn)";
    element.style.borderBottom = "2px solid var(--cor-de-btn)";

    element.addEventListener("focus", function () {
      // Cuando el input tiene focus, agrega los estilos deseados
      element.labels[0].style.color = "var(--cor-de-btn)";
      element.style.borderBottom = "2px solid var(--cor-de-btn)";
    });

    element.addEventListener("blur", function () {
      // Cuando el input pierde el focus, remueve los estilos
      element.labels[0].style.color = "#4b4a4ad9";
      element.style.borderBottom = "2px solid #4b4a4ad9";
    });
  }
}

inputName.addEventListener("input", () => {
  const condition = parseInt(inputName.attributes.maxlength.value) === inputName.value.length;
  handleInput(inputName, errorMessages.error.message, condition);
});

inputEmail.addEventListener('input', () => {
  const regex = /([\w-]\.)+[\w-]{2,4}$/g
  const condition = !(inputEmail.value.includes('@') && inputEmail.value.match(regex));
  handleInput(inputEmail, errorMessages.email.message, condition);
});

inputAsunto.addEventListener("input", () => {
  const condition = parseInt(inputAsunto.attributes.maxlength.value) === inputAsunto.value.length;
  handleInput(inputAsunto, errorMessages.error.message, condition);
});

inputMensaje.addEventListener("input", () => {
  const condition = parseInt(inputMensaje.attributes.maxlength.value) === inputMensaje.value.length;
  handleInput(inputMensaje, errorMessages.error.message, condition);
});

function checkInputs() {
  const inputs = [inputName, inputEmail, inputAsunto, inputMensaje]
  const areFull = inputs.every(input => input.value)
  const areValid = inputs.find(input => input.parentElement.children[2])
  if (areFull && !areValid) {
    boton.removeAttribute('disabled');
  } else {
    boton.setAttribute('disabled', true);
  }
}

inputName.addEventListener('input', checkInputs)
inputEmail.addEventListener('input', checkInputs)
inputAsunto.addEventListener('input', checkInputs)
inputMensaje.addEventListener('input', checkInputs)

boton.addEventListener("click", (e) => {
  e.preventDefault()
  checkInputs()

  if (boton.nextSibling.nodeName === "P") {
    let result = document.querySelector('.result')
    result.remove()
  }

  let result = document.createElement('p')
  result.classList.add('result')
  result.textContent = 'informacion enviada ✓'

  boton.insertAdjacentElement('afterend', result)
});