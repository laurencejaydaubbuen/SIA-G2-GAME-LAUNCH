let accntNum = 0;
let userList, passList, emailList, coinList, totalCorrectList, levelsMasteredList, totalWrongList, totalGamesList;
let easyList, mediumList, hardList, scoreList;
let bgList, eBgList, achList;

let savedUsernames;
let savedPasswords;
let savedEmails;

let savedCoins;
let savedTotalCorrect;
let savedLevelsMastered;
let savedTotalWrong;
let savedTotalGames;

let savedEasy;
let savedMedium;
let savedHard;

let savedScore;

let savedBg;
let equippedBg;
let gameAch;

getAccountList();

let gameBg = {
  bg: new Array(15).fill(false)
}

let achieve = {
  list: new Array(6).fill(false)
}

if (savedUsernames.length == 0 && savedPasswords.length == 0) {
  savedUsernames.push("admin");
  savedPasswords.push("root");
  savedEmails.push("admin@gmail.com");
  
  savedCoins.push("10000");
  savedTotalCorrect.push("0");
  savedLevelsMastered.push("0");
  savedTotalWrong.push("0");
  savedTotalGames.push("0");
  
  savedEasy.push("1");
  savedMedium.push("1");
  savedHard.push("1");
  
  savedScore.push("0");
  
  savedBg.push(gameBg);
  equippedBg.push(0);
  gameAch.push(achieve);
}

getData();

/* ========== modify database ========== */
function getAccountList() {
  userList = JSON.parse(localStorage.getItem("username")) || [];
  passList = JSON.parse(localStorage.getItem("password")) || [];
  emailList = JSON.parse(localStorage.getItem("email")) || [];
  
  coinList = JSON.parse(localStorage.getItem("coins")) || [];
  totalCorrectList = JSON.parse(localStorage.getItem("totalCorrect")) || [];
  levelsMasteredList = JSON.parse(localStorage.getItem("levelsMastered")) || [];
  totalWrongList = JSON.parse(localStorage.getItem("totalWrong")) || [];
  totalGamesList = JSON.parse(localStorage.getItem("totalGames")) || [];
  
  easyList = JSON.parse(localStorage.getItem("easy")) || [];
  mediumList = JSON.parse(localStorage.getItem("medium")) || [];
  hardList = JSON.parse(localStorage.getItem("hard")) || [];
  
  scoreList = JSON.parse(localStorage.getItem("score")) || [];
  
  bgList = JSON.parse(localStorage.getItem("gameBg")) || [];
  eBgList = JSON.parse(localStorage.getItem("eBg")) || [];
  achList = JSON.parse(localStorage.getItem("achievements")) || [];
  
  savedUsernames = userList;
  savedPasswords = passList;
  savedEmails = emailList;
  
  savedCoins = coinList;
  savedTotalCorrect = totalCorrectList;
  savedLevelsMastered = levelsMasteredList;
  savedTotalWrong = totalWrongList;
  savedTotalGames = totalGamesList;
  
  savedEasy = easyList;
  savedMedium = mediumList;
  savedHard = hardList;
  
  savedScore = scoreList;
  
  savedBg = bgList;
  equippedBg = eBgList;
  gameAch = achList;
}

function getData() {
  localStorage.setItem("username", JSON.stringify(savedUsernames));
  localStorage.setItem("password", JSON.stringify(savedPasswords));
  localStorage.setItem("email", JSON.stringify(savedEmails));
  
  storeData();
}

function storeData() {
  localStorage.setItem("coins", JSON.stringify(savedCoins));
  localStorage.setItem("totalCorrect", JSON.stringify(savedTotalCorrect));
  localStorage.setItem("levelsMastered", JSON.stringify(savedLevelsMastered));
  localStorage.setItem("totalWrong", JSON.stringify(savedTotalWrong));
  localStorage.setItem("totalGames", JSON.stringify(savedTotalGames));
  
  localStorage.setItem("easy", JSON.stringify(savedEasy));
  localStorage.setItem("medium", JSON.stringify(savedMedium));
  localStorage.setItem("hard", JSON.stringify(savedHard));
  
  localStorage.setItem("score", JSON.stringify(savedScore));
  
  localStorage.setItem("gameBg", JSON.stringify(savedBg));
  localStorage.setItem("eBg", JSON.stringify(equippedBg));
  localStorage.setItem("achievements", JSON.stringify(gameAch));
}

function saveKey() {
  localStorage.setItem("key", accntNum);
}

export function getKey() {
  accntNum = localStorage.getItem("key");
}

function resetAccntNum() {
  accntNum = 0;
  saveKey();
}

/* ========== constants ========== */
const lUser = document.getElementById("l-user");
const lPass = document.getElementById("l-pass");
const lInput = document.querySelectorAll(".l-input");

const rUser = document.getElementById("r-user");
const rPass = document.getElementById("r-pass");
const rEmail = document.getElementById("r-email");
const rCpass = document.getElementById("r-cpass");
const rInput = document.querySelectorAll(".r-input");

const fEmail = document.getElementById("f-email");
const fPass = document.getElementById("f-pass");
const fCpass = document.getElementById("f-cpass");
const fInput = document.querySelectorAll(".f-input");

/* ========== sign in ========== */
export function verifyAccount(usernameInput, passwordInput) {
  resetAccntNum();
  for (let list of savedUsernames) {
    if (usernameInput.replaceAll(" ", "") == list) {
      verifyPassword(passwordInput);
      lUser.style.display = "none";
      return;
    }
    
    accntNum++;
  }
  
  lInput[0].classList.add("shakeme");
  lUser.style.display = "inline";
  lUser.innerText = "*username does not exist*";
  lInput[0].addEventListener("animationend", () => {
    lInput[0].classList.remove("shakeme");
  });
}

function verifyPassword(passwordInput) {
  if (savedPasswords[accntNum] == passwordInput) {
    alert("Login successfully!");
    saveKey();
    lPass.style.display = "none";
    window.location.href = "html/sample.html";
    return;
  }
  
  lInput[1].classList.add("shakeme");
  lPass.style.display = "inline";
  lPass.innerText = "*incorrect password*";
  lInput[1].addEventListener("animationend", () => {
    lInput[1].classList.remove("shakeme");
  });
  
  return;
}

/* ========== sign up ========== */
export function signupAccount(usernameInput, emailInput, passwordInput, confirmPassInput) {
  if (checkUsernameRule(usernameInput)) {
    if (checkEmail(emailInput)) {
      checkPassword(usernameInput, emailInput, passwordInput, confirmPassInput);
    };
  }
}

function checkUsernameRule(usernameInput) {
  for (let list of savedUsernames) {
    if (usernameInput == list) {
      rInput[0].classList.add("shakeme");
      rUser.style.display = "inline";
      rUser.innerText = "*username already taken*";
      rInput[0].addEventListener("animationend", () => {
        rInput[0].classList.remove("shakeme");
      });
      return false;
    }
  }
  
  if (usernameInput.includes(" ")) {
    rInput[0].classList.add("shakeme");
    rUser.style.display = "inline";
    rUser.innerText = "*username does not allow spaces*";
    rInput[0].addEventListener("animationend", () => {
      rInput[0].classList.remove("shakeme");
    });
    return false;
  }
  
  if (usernameInput.length < 6) {
    rInput[0].classList.add("shakeme");
    rUser.style.display = "inline";
    rUser.innerText = "*username requires 6 characters*";
    rInput[0].addEventListener("animationend", () => {
      rInput[0].classList.remove("shakeme");
    });
    return false;
  }
  
  if (usernameInput.length > 12) {
    rInput[0].classList.add("shakeme");
    rUser.style.display = "inline";
    rUser.innerText = "*username maximum character: 12*";
    rInput[0].addEventListener("animationend", () => {
      rInput[0].classList.remove("shakeme");
    });
    return false;
  }
  
  for (let char of specialChar) {
    if (usernameInput.includes(char)) {
      rInput[0].classList.add("shakeme");
      rUser.style.display = "inline";
      rUser.innerText = "*username cannot have special characters*";
      rInput[0].addEventListener("animationend", () => {
        rInput[0].classList.remove("shakeme");
      });
      return false;
    }
  }
  
  rUser.style.display = "none";
  return true;
}

function checkEmail(emailInput) {
  if (emailInput.includes(" ")) {
    rInput[1].classList.add("shakeme");
    rEmail.style.display = "inline";
    rEmail.innerText = "*not a valid email address*";
    rInput[1].addEventListener("animationend", () => {
      rInput[1].classList.remove("shakeme");
    });
    return false;
  }
  
  if (emailInput.includes("@gmail.com")) {
    rEmail.style.display = "none";
    return true;
  }
  
  rInput[1].classList.add("shakeme");
  rEmail.style.display = "inline";
  rEmail.innerText = "*not a valid email address*";
  rInput[1].addEventListener("animationend", () => {
    rInput[1].classList.remove("shakeme");
  });
  return false;
}

function checkPassword(usernameInput, emailInput, passwordInput, confirmPassInput) {
  if (passwordInput.includes(" ")) {
    rInput[2].classList.add("shakeme");
    rPass.style.display = "inline";
    rPass.innerText = "*password does not allow spaces*";
    rInput[2].addEventListener("animationend", () => {
      rInput[2].classList.remove("shakeme");
    });
    return;
  }
  
  if (passwordInput.length < 6) {
    rInput[2].classList.add("shakeme");
    rPass.style.display = "inline";
    rPass.innerText = "*password requires 6 characters*";
    rInput[2].addEventListener("animationend", () => {
      rInput[2].classList.remove("shakeme");
    });
    return;
  }
  
  if (passwordInput.length > 16) {
    rInput[2].classList.add("shakeme");
    rPass.style.display = "inline";
    rPass.innerText = "*password maximum characters: 16*";
    rInput[2].addEventListener("animationend", () => {
      rInput[2].classList.remove("shakeme");
    });
    return;
  }
  
  let hasCapital = false;
  for (let list of capitalLetters) {
    if (passwordInput.includes(list)) {
      hasCapital = true;
      break;
    }
  }
  
  if (!hasCapital) {
    rInput[2].classList.add("shakeme");
    rPass.style.display = "inline";
    rPass.innerText = "*password must include a capital letter*";
    rInput[2].addEventListener("animationend", () => {
      rInput[2].classList.remove("shakeme");
    });
    return;
  }
  
  let hasSmall = false;
  for (let list of smallLetters) {
    if (passwordInput.includes(list)) {
      hasSmall = true;
      break;
    }
  }
  
  if (!hasSmall) {
    rInput[2].classList.add("shakeme");
    rPass.style.display = "inline";
    rPass.innerText = "*password must include a small letter*";
    rInput[2].addEventListener("animationend", () => {
      rInput[2].classList.remove("shakeme");
    });
    return;
  }
  
  let hasNum = false;
  for (let list of numbers) {
    if (passwordInput.includes(list)) {
      hasNum = true;
      break;
    }
  }
  
  if (!hasNum) {
    rInput[2].classList.add("shakeme");
    rPass.style.display = "inline";
    rPass.innerText = "*password must include a number*";
    rInput[2].addEventListener("animationend", () => {
      rInput[2].classList.remove("shakeme");
    });
    return;
  }
  
  for (let list of specialChar) {
    if (passwordInput.includes(list)) {
      rInput[2].classList.add("shakeme");
      rPass.style.display = "inline";
      rPass.innerText = "*password cannot have special characters*";
      rInput[2].addEventListener("animationend", () => {
        rInput[2].classList.remove("shakeme");
      });
      return;
    }
  }
  
  if (passwordInput != confirmPassInput) {
    rPass.style.display = "none";
    rInput[3].classList.add("shakeme");
    rCpass.style.display = "inline";
    rCpass.innerText = "*password & confirm password do not match*";
    rInput[3].addEventListener("animationend", () => {
      rInput[3].classList.remove("shakeme");
    });
    return;
  }
  
  rPass.style.display = "none";
  rCpass.style.display = "none";
  let signup = confirm("Sign up Account?");
  if (signup) {
    registerAccount(usernameInput, emailInput, passwordInput);
    
    alert("Successfully registered account!");
    window.location.href = "../index.html";
    return;
  }
}

function registerAccount(user, email, pass) {
  savedUsernames.push(user);
  savedEmails.push(email);
  savedPasswords.push(pass);
  
  let temp = 0;
  for (let acc of savedUsernames) {
    if (user == acc) {
      break;
    }
    temp++;
  }
  
  savedCoins[temp] = "0";
  savedTotalCorrect[temp] = "0";
  savedLevelsMastered[temp] = "0";
  savedTotalWrong[temp] = "0";
  savedTotalGames[temp] = "0";
  
  savedEasy[temp] = "1"
  savedMedium[temp] = 1;
  savedHard[temp] = 1;
  
  savedScore[temp] = "0";
  
  savedBg[temp] = gameBg;
  equippedBg[temp] = "0";
  gameAch[temp] = achieve;
  
  getData();
  getAccountList();
}


/* ========== special chars and others ========== */
const capitalLetters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];

const smallLetters = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];

const numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

const specialChar = [
  "!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "-", "_", "=",
  "+", "[", "]", "{", "}", "|", ":", ";", "\"", "'", "<", ">",
  ",", ".", "?", "/", "`", "~", "£", "€", "¥", "¢", "°", "√", "π",
  "•", "§", "∆"
];

/* ========== connect to game ========== */
window.fetchData = function() {
  getKey();
}

window.getSavedCoins = function() {
  if (savedCoins[accntNum] == undefined) {
    savedCoins[accntNum] = "0";
  }
  
  return savedCoins[accntNum];
}

window.getUsernameValue = function() {
  return savedUsernames[accntNum];
}

window.getTotalCorrectValue = function() {
  if (savedTotalCorrect[accntNum] == undefined) {
    savedTotalCorrect[accntNum] = "0";
  }
  
  return savedTotalCorrect[accntNum];
}

window.getLevelsMastered = function() {
  if (savedLevelsMastered[accntNum] == undefined) {
    savedLevelsMastered[accntNum] = "0";
  }
  
  return savedLevelsMastered[accntNum];
}

window.getTotalWrongValue = function() {
  if (savedTotalWrong[accntNum] == undefined) {
    savedTotalWrong[accntNum] = "0";
  }
  
  return savedTotalWrong[accntNum];
}

window.getTotalGamesValue = function() {
  if (savedTotalGames[accntNum] == undefined) {
    savedTotalGames[accntNum] = "0";
  }
  
  return savedTotalGames[accntNum];
}

window.getEasyDiff = function() {
  if (savedEasy[accntNum] == undefined) {
    savedEasy[accntNum] = "1";
  }
  
  return savedEasy[accntNum];
}

window.getMediumDiff = function() {
  if (savedMedium[accntNum] == undefined) {
    savedMedium[accntNum] = "1";
  }
  
  return savedMedium[accntNum];
}

window.getHardDiff = function() {
  if (savedHard[accntNum] == undefined) {
    savedHard[accntNum] = "1";
  }
  
  return savedHard[accntNum];
}

window.getScoreValue = function() {
  if (savedScore[accntNum] == undefined) {
    savedScore[accntNum] = "0";
  }
  
  return savedScore[accntNum];
}

window.getBackgrounds = function() {
  if (savedBg[accntNum] == undefined) {
    savedBg[accntNum] = gameBg;
  }
  
  return savedBg[accntNum];
}

window.getAch = function() {
  if (gameAch[accntNum] == undefined) {
    gameAch[accntNum] = achieve;
  }
  
  return gameAch[accntNum];
}

window.submitData = function(getCoins, getTotalCorrect, getLevelsMastered, getEasy, getMedium, getHard, getScore, getBg, getTotalWrong, getTotalGames, getAchievements) {
  savedCoins[accntNum] = String(getCoins);
  savedTotalCorrect[accntNum] = String(getTotalCorrect);
  savedLevelsMastered[accntNum] = String(getLevelsMastered);
  savedTotalWrong[accntNum] = String(getTotalWrong);
  savedTotalGames[accntNum] = String(getTotalGames);
  
  savedEasy[accntNum] = String(getEasy);
  savedMedium[accntNum] = String(getMedium);
  savedHard[accntNum] = String(getHard);
  
  savedScore[accntNum] = String(getScore);
  
  savedBg[accntNum] = getBg;
  gameAch[accntNum] = getAchievements;
  
  storeData();
  getData();
}

/* ========== get the equipped bg ========== */


window.takeEquippedBg = function(index) {
  equippedBg[accntNum] = index;
  
  storeData();
}

window.getEquippedBg = function() {
  return equippedBg[accntNum];
}

/* ========== get leaderboards ========== */

let first, second, third, fourth, fifth;

function sortScores() {
  getData();
  first = 0;
  second = 0;
  third = 0;
  fourth = 0;
  fifth = 0;
  
  let sorted = savedScore.slice().sort((a, b) => b - a);
  first = sorted[0];
  second = sorted[1];
  third = sorted[2];
  fourth = sorted[3];
  fifth = sorted[4];
}

window.getScores = function() {
  sortScores();
}

let firstIndex = 0;
window.getFirst = function() {
  firstIndex = 0;
  for (let i of savedScore) {
    if (i == first) {
      break;
    }
    firstIndex++;
  }
  
  return savedUsernames[firstIndex];
}

let secondIndex = 0;
window.getSecond = function() {
  secondIndex = 0;
  for (let i of savedScore) {
    if (i == second && secondIndex != firstIndex) {
      break;
    }
    secondIndex++;
  }
  
  return savedUsernames[secondIndex];
}

let thirdIndex = 0;
window.getThird = function() {
  thirdIndex = 0;
  let index = 0;
  for (let i of savedScore) {
    if (i == third && (thirdIndex != firstIndex && thirdIndex != secondIndex)) {
      break;
    }
    thirdIndex++;
  }
  
  return savedUsernames[thirdIndex];
}

let fourthIndex = 0;
window.getFourth = function() {
  fourthIndex = 0;
  let index = 0;
  for (let i of savedScore) {
    if (i == fourth && ((fourthIndex != firstIndex && fourthIndex != secondIndex) && fourthIndex != thirdIndex)) {
      break;
    }
    fourthIndex++;
  }
  
  return savedUsernames[fourthIndex];
}

let fifthIndex = 0;
window.getFifth = function() {
  fifthIndex = 0;
  let index = 0;
  for (let i of savedScore) {
    if (i == fifth && (fifthIndex != firstIndex && fifthIndex != secondIndex) && (fifthIndex != thirdIndex && fifthIndex != fourthIndex)) {
      break;
    }
    fifthIndex++;
  }
  
  return savedUsernames[fifthIndex];
}

window.firstScore = function() {
  return first;
}

window.secondScore = function() {
  return second;
}

window.thirdScore = function() {
  return third;
}

window.fourthScore = function() {
  return fourth;
}

window.fifthScore = function() {
  return fifth;
}

/* ========== forgot pass ========== */
export function forgotPass(email, pass, cPass) {
  resetAccntNum();
  for (let e of savedEmails) {
    if (email == e) {
      fEmail.style.display = "none";
      changePass(pass, cPass);
      return;
    }
    
    accntNum++;
  }
  fInput[0].classList.add("shakeme");
  fEmail.style.display = "inline";
  fEmail.innerText = "*email does not exist*";
  fInput[0].addEventListener("animationend", () => {
    fInput[0].classList.remove("shakeme");
  });
}

function changePass(pass, cPass) {
  if (pass.includes(" ")) {
    fInput[1].classList.add("shakeme");
    fPass.style.display = "inline";
    fPass.innerText = "*password does not allow spaces*";
    fInput[1].addEventListener("animationend", () => {
      fInput[1].classList.remove("shakeme");
    });
    return;
  }
  
  if (pass.length < 6) {
    fInput[1].classList.add("shakeme");
    fPass.style.display = "inline";
    fPass.innerText = "*password requires 6 characters*";
    fInput[1].addEventListener("animationend", () => {
      fInput[1].classList.remove("shakeme");
    });
    return;
  }
  
  if (pass.length > 16) {
    fInput[1].classList.add("shakeme");
    fPass.style.display = "inline";
    fPass.innerText = "*password maximum characters: 16*";
    fInput[1].addEventListener("animationend", () => {
      fInput[1].classList.remove("shakeme");
    });
    return;
  }
  
  let hasCapital = false;
  for (let list of capitalLetters) {
    if (pass.includes(list)) {
      hasCapital = true;
      break;
    }
  }
  
  if (!hasCapital) {
    fInput[1].classList.add("shakeme");
    fPass.style.display = "inline";
    fPass.innerText = "*password must include a capital letter*";
    fInput[1].addEventListener("animationend", () => {
      fInput[1].classList.remove("shakeme");
    });
    return;
  }
  
  let hasSmall = false;
  for (let list of smallLetters) {
    if (pass.includes(list)) {
      hasSmall = true;
      break;
    }
  }
  
  if (!hasSmall) {
    fInput[1].classList.add("shakeme");
    fPass.style.display = "inline";
    fPass.innerText = "*password must include a small letter*";
    fInput[1].addEventListener("animationend", () => {
      fInput[1].classList.remove("shakeme");
    });
    return;
  }
  
  let hasNum = false;
  for (let list of numbers) {
    if (pass.includes(list)) {
      hasNum = true;
      break;
    }
  }
  
  if (!hasNum) {
    fInput[1].classList.add("shakeme");
    fPass.style.display = "inline";
    fPass.innerText = "*password must include a number*";
    fInput[1].addEventListener("animationend", () => {
      fInput[1].classList.remove("shakeme");
    });
    return;
  }
  
  for (let list of specialChar) {
    if (pass.includes(list)) {
      fInput[1].classList.add("shakeme");
      fPass.style.display = "inline";
      fPass.innerText = "*password cannot have special characters*";
      fInput[1].addEventListener("animationend", () => {
        fInput[1].classList.remove("shakeme");
      });
      return;
    }
  }
  
  if (pass != cPass) {
    fPass.style.display = "none";
    fInput[2].classList.add("shakeme");
    fCpass.style.display = "inline";
    fCpass.innerText = "*password & confirm password do not match*";
    fInput[2].addEventListener("animationend", () => {
      fInput[2].classList.remove("shakeme");
    });
    return;
  }
  
  fPass.style.display = "none";
  fCpass.style.display = "none";
  let reset = confirm("Change Password?");
  if (reset) {
    savedPasswords[accntNum] = pass;
    
    getData();
    getAccountList();
    
    alert("Successfully change password!");
    window.location.href = "../index.html";
  }
}

/* ========== delete account ========== */
window.deleteAccount = function() {
  if (accntNum > 0) {
    savedUsernames.splice(accntNum, 1);
    savedEmails.splice(accntNum, 1);
    savedPasswords.splice(accntNum, 1);
    
    savedCoins.splice(accntNum, 1);
    savedTotalCorrect.splice(accntNum, 1);
    savedLevelsMastered.splice(accntNum, 1);
    savedTotalWrong.splice(accntNum, 1);
    savedTotalGames.splice(accntNum, 1);
    
    savedEasy.splice(accntNum, 1);
    savedMedium.splice(accntNum, 1);
    savedHard.splice(accntNum, 1);
    
    savedScore.splice(accntNum, 1);
    
    savedBg.splice(accntNum, 1);
    equippedBg.splice(accntNum, 1);
    
    getData();
    getAccountList();
    
    return true;
  }
  
  return false;
}