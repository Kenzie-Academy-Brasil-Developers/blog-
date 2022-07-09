import LayoutController from "./controllers/LayoutController.js";

if(document.title === "Blog | M2 - Kenzie"){
  window.location = "./src/pages/login.html"
} 
else if(document.title === "Blog - Login | M2 - Kenzier"){
  LayoutController.loginPage()

  const form = document.querySelector("form")
  form.classList.add("slideFromBottom")
} 
else if(document.title === "Blog - Sign Up | M2 - Kenzier"){
  LayoutController.registerPage()

  const form = document.querySelector("form")
  form.classList.add("slideFromBottom")
} 
else if(document.title === "Blog - Main | M2 - Kenzier"){
  LayoutController.mainPage()

  const pagination = document.querySelector(".main__pagination")  
    if(document.readyState === "complete" && pagination.innerHTML === ""){
      location.reload()
    }
  
}
