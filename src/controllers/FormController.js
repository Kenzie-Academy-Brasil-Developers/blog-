import UserController from "./UserController.js"

class FormController{
  static handleSubmit(form){
    const info       = [...form]
    const packedInfo = {}

    info.forEach((i) => {
      if (i.name !== "") {
        packedInfo[i.name] = i.value
        i.value = ""
      }
    })
    return packedInfo
  }

  static loginForm(){
    const form     = document.createElement("form")
    const title    = document.createElement("h1")
    const email    = document.createElement("input")
    const password = document.createElement("input")
    const loginBtn = document.createElement("input")
    const register = document.createElement("p")

    title.innerText = "Login"

    email.placeholder = "Email"
    email.name        = "email"
    email.type        = "email"

    password.placeholder = "Senha"
    password.name        = "password"
    password.type        = "password"

    loginBtn.value  = "Login"
    loginBtn.type   = "submit"
    loginBtn.id     = "login"
    loginBtn.classList.add("btn")
    form.addEventListener("submit", UserController.login)

    register.innerHTML = 'não tem uma conta?<br><a href="./register.html">cadastre-se aqui</a>';

    [(email, password)].forEach((x) => (x.required = true))

    form.append(title, email, password, loginBtn, register)
    return form
  }

  static registerForm(){
    const form      = document.createElement("form")
    const closeBtn  = document.createElement("button")
    const title     = document.createElement("h1")
    const userName  = document.createElement("input")
    const email     = document.createElement("input")
    const photo     = document.createElement("input")
    const password  = document.createElement("input")
    const regBtn    = document.createElement("input")

    closeBtn.innerHTML = '<i class="fa-solid fa-xmark"></i><span class="tooltip">Cancelar</span>';
    closeBtn.classList.add("close-btn")
    closeBtn.addEventListener("click", () => {
      history.back()
    })

    title.innerText = "Cadastro"

    userName.placeholder = "Nome de Usuário"
    userName.name        = "username"
    userName.type        = "text"
    userName.required    = true

    email.placeholder    = "Email"
    email.name           = "email"
    email.type           = "email"
    email.required       = true

    photo.placeholder    = "Foto do Perfil"
    photo.name           = "avatarUrl"
    photo.type           = "url"
    photo.required       = true

    password.placeholder = "Senha"
    password.name        = "password"
    password.type        = "password"
    password.required    = true

    regBtn.value = "Cadastrar"
    regBtn.type  = "submit"
    regBtn.id    = "register"
    regBtn.classList.add("btn")
    form.addEventListener("submit", UserController.sendNew)

    form.append(closeBtn, title, userName, email, photo, password, regBtn)

    return form
  }
}

export default FormController
