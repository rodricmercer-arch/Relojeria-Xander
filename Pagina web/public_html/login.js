document.getElementById("form-login").addEventListener("submit", function(e) {
    e.preventDefault();

    const usuario = document.getElementById("usuario").value;
    const password = document.getElementById("password").value;

    // USUARIO FIJO PARA TU EXPO
    const userCorrecto = "admin";
    const passCorrecta = "1234";

    if (usuario === userCorrecto && password === passCorrecta) {
        localStorage.setItem("sesionIniciada", "true");
        window.location.href = "index.html";  // vuelve a tu página principal
    } else {
        document.getElementById("error").style.display = "block";
    }
});
