const form = document.getElementById("userfields");
const editBtn = document.getElementById("edit");
const cancelBtn = document.getElementById("cancelEdit");
const phoneInput = document.getElementById("phone");

const FORM_STATE = {};

let EDITING = false;

function editHandler(event) {
  const saveBtn = event.originalTarget;
  const inputs = document.querySelectorAll(".input");
  const isDisabled = editBtn.classList.contains("disabled");

  if (isDisabled) {
    return;
  }

  if (EDITING) {
    inputs.forEach(el => {
      el.setAttribute("disabled", "");
      saveFormField(el);
    });
    restoreBtnsStates();
    EDITING = false;
    return;
  }

  EDITING = true;

  cancelBtn.classList.add("visible");

  inputs.forEach(el => {
    el.removeAttribute("disabled");
    saveFormField(el);
  });

  inputs[0].focus();

  editBtn.classList.add("save");
  editBtn.innerText = "Сохранить";
}

function cancelEditingHandler(event) {
  const inputs = document.querySelectorAll(".input");
  restoreFormData();
  inputs.forEach(el => {
    el.setAttribute("disabled", "");
    saveFormField(el);
  });
  restoreBtnsStates();
  EDITING = false;
}

function restoreBtnsStates() {
  cancelBtn.classList.remove("visible");
  editBtn.classList.remove("save");
  editBtn.classList.remove("disabled");
  editBtn.innerText = "Редактировать";
}

function saveFormField(input) {
  FORM_STATE[input.id] = input.value;
}

function restoreFormData() {
  for (item in FORM_STATE) {
    const el = document.getElementById(item);
    el.value = FORM_STATE[item];
  }
}

function validatePhone(phone) {
  const match = phone.match(/\d/g);
  if (!match || match == null) return false;
  return match.length === 10;
}

function phoneChangeHandler(event) {
  const phone = event.target.value;
  const valid = validatePhone(phone);

  if (valid) {
    event.target.classList.remove("error");
    editBtn.classList.remove("disabled");
  } else {
    event.target.classList.add("error");
    editBtn.classList.add("disabled");
  }
}

editBtn.addEventListener("click", editHandler);
cancelBtn.addEventListener("click", cancelEditingHandler);
phoneInput.addEventListener("input", phoneChangeHandler);
