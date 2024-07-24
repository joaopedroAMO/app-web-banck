document.addEventListener('DOMContentLoaded',(event) => {
    checkLogin();
});

//registro
function registrar() {
    // Obter valores dos campos de entrada
    const newUserNameInput = document.getElementById('newUser').value;
    const newUserPasswordInput = document.getElementById('newPassword').value;
    const newUserEmailInput = document.getElementById('newEmail').value.toLowerCase();
    const msg = document.getElementsByClassName('msg')[0];
    // Regex para caracteres não permitidos no nome de usuário
    const invalidUsernameRegex = /[^a-zA-ZÀ-ÿ\s]/;
    // Regex para verificar critérios da senha
    const hasUpperCase = /[A-Z]/.test(newUserPasswordInput);
    const hasLowerCase = /[a-z]/.test(newUserPasswordInput); // Verifica letras minúsculas
    const hasNumber = /[0-9]/.test(newUserPasswordInput);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(newUserPasswordInput);

    // Verificar se todos os campos estão preenchidos
    if (newUserEmailInput === "" || newUserNameInput === "" || newUserPasswordInput === "") {
        msg.innerHTML = "Preencha todos os campos";
        return;
    }
    // Verificar comprimento da senha
    if (newUserPasswordInput.length < 8) {
        msg.innerHTML = "Sua senha deve conter no mínimo oito caracteres";
        return;
    }
    // Verificar se a senha contém pelo menos uma letra maiúscula
    if (!hasUpperCase) {
        msg.innerHTML = "Sua senha deve conter no mínimo uma letra MAIÚSCULA";
        return;
    }
    // Verificar se a senha contém pelo menos uma letra minúscula
    if (!hasLowerCase) {
        msg.innerHTML = "Sua senha deve conter no mínimo uma letra minúscula";
        return;
    }
    // Verificar se a senha contém pelo menos um número
    if (!hasNumber) {
        msg.innerHTML = "Sua senha deve conter no mínimo um número";
        return;
    }
    // Verificar se a senha contém pelo menos um caractere especial
    if (!hasSpecialChar) {
        msg.innerHTML = "Sua senha deve conter no mínimo um caractere especial";
        return;
    }
    // Verificar se o nome de usuário contém caracteres não permitidos
    if (invalidUsernameRegex.test(newUserNameInput)) {
        msg.innerHTML = "Seu nome de usuário não pode conter caracteres especiais não permitidos";
        return;
    }

    // Salvar as credenciais no LocalStorage
    localStorage.setItem('registeredUsername', newUserNameInput);
    localStorage.setItem('registeredPassword', newUserPasswordInput);
    localStorage.setItem('registeredEmail', newUserEmailInput);

    const registeredUsername = localStorage.getItem('registeredUsername');
    const registeredEmail = localStorage.getItem('registeredEmail');

    alert('Usuário registrado com sucesso!');

    // Mostrar tela de login
    document.getElementsByClassName('registro-container')[0].style.display = 'none';
    document.getElementsByClassName('login-container')[0].style.display = 'block';

    const userNameDisplay = document.getElementById('userNameDisplay');
    const userEmailDisplay = document.getElementById('userEmailDisplay');

    userNameDisplay.innerHTML = registeredUsername;
    userEmailDisplay.innerHTML = registeredEmail;

    // Ocultar container de registro
    document.getElementsByClassName('registro-container')[0].style.display = "none";
    document.getElementsByClassName('login-container')[0].style.display = "block";

}
//fim registro

//coletando a imagem apresentada pelo usuario
document.getElementById('fileImg').addEventListener('change', function(event){
    const file = event.target.files[0];
    
    if(file){
        const reader = new FileReader();
        reader.onload = function(e){
            const imgSrc = e.target.result;
            document.getElementById('imgUm').src = imgSrc;
            document.getElementById('imgDois').src = imgSrc;
            document.getElementById('imgTres').src = imgSrc;
            localStorage.setItem('ImagemRegistrada', imgSrc);
        }
        reader.readAsDataURL(file);
    }
})
//fim coletando a imagem apresentada pelo usuario

//visibilidade de senha
function passwordVisibility(passwordFieldId, openEyeId, closeEyeId) {
    const passwordInput = document.getElementById(passwordFieldId);
    const openEye = document.getElementById(openEyeId);
    const closeEye = document.getElementById(closeEyeId);
    
    if (passwordInput.type === 'password') {
        openEye.style.display = 'block';
        closeEye.style.display = 'none';
        passwordInput.type = 'text';
    } else {
        openEye.style.display = 'none';
        closeEye.style.display = 'block';
        passwordInput.type = 'password';
    }
}
//fim visibilidade de senha

function login(){
    const userName = document.getElementById('User').value;
    const userPassword = document.getElementById('Password').value;
    const msg = document.getElementsByClassName('msg')[1];

    const registeredUsername = localStorage.getItem('registeredUsername');
    const registeredPassword = localStorage.getItem('registeredPassword');

    // Verifique as credenciais
    if (userName === registeredUsername && userPassword === registeredPassword) {
        localStorage.setItem('username', userName);

        // Esconder login e mostrar tela principal
        document.getElementsByClassName('login-container')[0].style.display = 'none';
        document.getElementsByClassName('conteudo-container')[0].style.display = 'block';
        // document.getElementById('user').textContent = username;
    } else {
        msg.innerHTML = "Credenciais invalidas";
        return
    }

}

function checkLogin(){
    const username = localStorage.getItem('username');
    const email = localStorage.getItem('registeredEmail');
    const registeredUsername = localStorage.getItem('registeredUsername');
    

    if(username){
        document.getElementsByClassName('login-container')[0].style.display = 'block';
        document.getElementsByClassName('registro-container')[0].style.display = 'none';

        const savedImg = localStorage.getItem('ImagemRegistrada');
        if(savedImg){
        document.getElementById('imgUm').src = savedImg;
        document.getElementById('imgDois').src = savedImg;
        document.getElementById('imgTres').src = savedImg;
    }
    }else{
        // Mostrar tela de registro se não houver usuários registrados
        if(!registeredUsername){
            document.getElementsByClassName('registro-container')[0].style.display = 'block';
            document.getElementsByClassName('msg')[0].innerHTML = "";
        }
        document.getElementsByClassName('conteudo-container')[0].style.display = 'none';
    }

    document.getElementById('userNameDisplay').innerHTML = username;
    document.getElementById('userEmailDisplay').innerHTML = email;
    document.getElementsByClassName('msg')[1].innerHTML = "";
    document.getElementById('User').value = username;
}

function openPixArea(){
    const pixContainer = document.getElementsByClassName('pix-container')[0];
    if(pixContainer.style.display == "none"){
        pixContainer.style.display = "block";
    }else{
        pixContainer.style.display = "none";
    }
}

function openCardArea(){
    const cardContainer = document.getElementsByClassName('card-container')[0];

    if(cardContainer.style.display == "none"){
        cardContainer.style.display = "block";
    }else{
        cardContainer.style.display = "none";
    }
}