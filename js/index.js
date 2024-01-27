const body = document.querySelector("body");
const toggleBtn = document.querySelector(".toggle-btn");
const mainTitle = document.querySelector(".main-title");
const userInput = document.querySelector(".user-input");
const messageNotFoundTitle = document.querySelector(".message-not-found-title");
const messageNotFoundText = document.querySelector(".message-not-found-text");
const image = document.querySelector("img");
const result = document.querySelector(".encrypted-text");
const encryptBtn = document.querySelector(".encrypt-btn");
const decryptBtn = document.querySelector(".decrypt-btn");
const copyBtn = document.querySelector(".copy-btn");

//Evento de click para cambiar al dark mode
toggleBtn.addEventListener("click", toggleDarkMode);

//Funcion para cambiar a los estilos del dark mode y viceversa
function toggleDarkMode() {
    toggleIcon(toggleBtn, "fa-moon");
    toggleClass(body, "body-dark-mode");
    toggleClass(mainTitle, "main-title-dark-mode");
    toggleClass(userInput, "user-input-dark-mode");
    toggleClass(messageNotFoundTitle, "message-not-found-dark-mode");
    toggleClass(messageNotFoundText, "message-not-found-dark-mode");
    toggleClass(result, "encrypted-text-dark-mode");
}

//Funcion para alternar las clases de los iconos del dark mode
function toggleIcon(element, iconClass) {
    element.classList.toggle(iconClass);
}

//Funcion para alternar clases
function toggleClass(element, className) {
    element.classList.toggle(className);
}

//Funcion para ocultar elementos
function hide() {
    image.classList.add("hide");
    messageNotFoundTitle.classList.add("hide");
    messageNotFoundText.classList.add("hide");
}

//Funcion para encriptar
function encrypt(message) {
    let finalText = "";
    
    let vowels = {
        "a": "ai",
        "e": "enter",
        "i": "imes",
        "o": "ober",
        "u": "ufat"
    }
    
    for (let i = 0; i < message.length; i++) {
        let currentCharacter = message[i].toLowerCase();

        if(/^[a-z]$/.test(currentCharacter)){
            finalText += vowels[currentCharacter] || currentCharacter;
        }else{
            alert(`Carácter no permitido: ${currentCharacter}`);
        }
    }

    return finalText;
}

//Funcion para desencriptar
function decrypt(message) {
    let finalText = "";

    let vowels = {
        "a": 1,
        "e": 4,
        "i": 3,
        "o": 3,
        "u": 3
    }

    for (let i = 0; i < message.length; i++) {
        let skipCount = vowels[message[i]];
        let currentCharacter = message[i].toLowerCase();
        
        if (/^[a-z]$/.test(currentCharacter)) {    
            if (skipCount !== undefined) {
                finalText += currentCharacter;
                i += skipCount;
            } else {
                finalText += currentCharacter;
            }
        } else {
            alert(`Carácter no permitido: ${currentCharacter}`);
        }
    }

    return finalText;

}

//Funcion para copiar al portapapeles
function copyToClipboard(text) {
    navigator.clipboard.writeText(text)
        .then(() => {
            alert(`¡Copiado al portapapeles!`);
        })
        .catch(error => {
            console.error('Error copying to clipboard:', error);
        });   
}

//Evento de click para encriptar
encryptBtn.addEventListener("click", () => {
    hide();
    result.textContent = encrypt(userInput.value);
})

//Evento de click para desencriptar
decryptBtn.addEventListener("click", () => {
    hide();
    result.textContent = decrypt(userInput.value);
})

//Evento de click para copiar al portapapeles
copyBtn.addEventListener('click', () => {
	let text = result.textContent;
    copyToClipboard(text);
});
