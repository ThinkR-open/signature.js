document.addEventListener("DOMContentLoaded", function (event) {
  console.log("Dom is Ready! Let's do some stuff");
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
});
