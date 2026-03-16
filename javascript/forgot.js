import * as accnt from "./account.js";

const BTN = {
  goReset: document.getElementById("btnResetPass"),
  cancel: document.getElementById("btnReturn")
};

BTN.goReset.addEventListener("click", () => {
  resetPassword();
});


BTN.cancel.addEventListener("click", () => {
  window.location.href = "../index.html";
});

function resetPassword() {
  const email = document.getElementById('email').value;
  const newPassword = document.getElementById('newPassword').value;
  const confirmNewPassword = document.getElementById('confirmNewPassword').value;
  
  accnt.forgotPass(email, newPassword, confirmNewPassword);
} 