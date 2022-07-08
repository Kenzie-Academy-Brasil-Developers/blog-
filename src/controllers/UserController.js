import API from "../util/API.js"
import FormController from "./FormController.js"
import LayoutController from "./LayoutController.js"

class UserController{
  static async sendNew(e){
    e.preventDefault()

    const body  = FormController.handleSubmit(e.target)
    const page  = "./login.html";
    let message = ''
    console.log(body)

    let user = await API.newUser(body)

    if(user.id){
      message = `Foi criada a conta de ${user.username}!\nClique Ok para ir para pagina de Login.`
      LayoutController.newModal(message, page)

      const pageModal = document.querySelector(".modal__container--notice")
      pageModal.classList.add("slideFromBottom")
    } 
    else if(user.message.includes("duplicate")){
      message = "Esse email já está cadastrado.\nTente novamente."
      LayoutController.newModal(message)

      const pageModal = document.querySelector(".modal__container--notice")
      pageModal.classList.add("slideFromBottom")
    } 
    else{
      console.log(user)
      message = "Houve algum erro na hora de criar a conta.\nTente novamente."
      LayoutController.newModal(message)

      const pageModal = document.querySelector(".modal__container--notice")
      pageModal.classList.add("slideFromBottom")
    }
  }

  static async login(e){
    e.preventDefault()

    const body = FormController.handleSubmit(e.target)

    const auth = await API.userLogin(body)
    console.log(auth)

    if(auth.token){
      localStorage.setItem("token", auth.token)
      localStorage.setItem("userId", auth.userId)
      const user = await API.anUser(auth.userId)

      if(user.id){
        localStorage.setItem("username", user.username)
        localStorage.setItem("avatar", user.avatarUrl)

        const checkUsr = await API.anUser(user.id)

        if(checkUsr.email === body.email) self.location = "./main.html";
      }
    } 
    else if(auth.message.includes("failed")){
      let message = "Email ou senha incorretos.\nTente novamente."
      LayoutController.newModal(message)

      const pageModal = document.querySelector(".modal__container--notice")
      pageModal.classList.add("slideFromBottom")
    }
  }

  static logout(){
    localStorage.clear()
    self.location = "./login.html";
  }
}

export default UserController
