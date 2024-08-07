function setTheme(mode = "auto") {
  const userMode = localStorage.getItem("bs-theme");
  const sysMode = window.matchMedia("(prefers-color-scheme: light)").matches;
  const useSystem = mode === "system" || (!userMode && mode === "auto");
  const modeChosen = useSystem
    ? "system"
    : mode === "dark" || mode === "light"
    ? mode
    : userMode;

  if (useSystem) {
    localStorage.removeItem("bs-theme");
  } else {
    localStorage.setItem("bs-theme", modeChosen);
  }

  document.documentElement.setAttribute(
    "data-bs-theme",
    useSystem ? (sysMode ? "light" : "dark") : modeChosen
  );

  document
    .querySelectorAll(".mode-switch .btn-check")
    .forEach((e) => (e.checked = false));
  console.log("Mode: ", modeChosen);
  document.getElementById(modeChosen).checked = true;
}

document.addEventListener("DOMContentLoaded", function (event) {
  console.log("Dom is Ready! Let's do some stuff");

  setTheme();

  new ClipboardJS("#signature-copy");

  const copyButton = document.getElementById("signature-copy");

  function handleButtonClick() {
    copyButton.disabled = true;
    copyButton.innerHTML = "<i class='fas fa-check'></i> Copied!";
    setTimeout(() => {
      copyButton.disabled = false;
      copyButton.innerHTML = "<i class='fas fa-copy'></i> Copy to clipboard";
    }, 1000);

    var toastElement = document.getElementById("signature-copy-toast");
    var toast = new bootstrap.Toast(toastElement);
    toast.show((delay = 1000));
  }

  const signatureInputs = document.querySelectorAll(
    'input[id^="form_signature"]'
  );

  const signatureFillSpan = document.querySelectorAll(
    'span[id^="fill_signature"]'
  );

  function handleInputChange(event) {
    const inputId = event.target.id;
    const inputName = inputId.split("-")[1];
    const inputValue = event.target.value;
    console.log(
      `Change detected for: ${inputId} [${inputName}]: ${inputValue}`
    );

    signatureFillSpan.forEach((span) => {
      if (span.id.includes(inputName)) {
        if (inputValue === "") {
          span.innerHTML = `{{${inputName}}`;
        } else {
          span.innerHTML = inputValue;
        }
      }
    });
  }

  signatureInputs.forEach((input) => {
    input.addEventListener("input", handleInputChange);
  });
  copyButton.addEventListener("click", handleButtonClick);

  document.querySelectorAll(".mode-switch .btn-check").forEach((radio) => {
    radio.addEventListener("change", () => {
      if (radio.checked) {
        setTheme(radio.id);
      }
    });
  });

  window
    .matchMedia("(prefers-color-scheme: light)")
    .addEventListener("change", () => setTheme());
});
