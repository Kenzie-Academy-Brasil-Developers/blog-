import API from "../util/API.js"
import LayoutController from "./LayoutController.js"
import Post from "../models/Post.js"

class PostController{
  static async postsPage(parent, page){
    parent.innerHTML = "";
    const aPage      = await API.postsAtPage(page)
    const posts      = aPage.data

    localStorage.setItem("page", aPage.page)
    localStorage.setItem("lastPage", aPage.lastPage)

    if(aPage.page !== aPage.lastPage){
      localStorage.setItem("nextPage", aPage.page + 1)
    }
    if(aPage.page !== 1){
      localStorage.setItem("previousPage", aPage.page - 1)
    }

    posts.forEach((p) => {
      const { id, post, createdAt, owner } = p
      const bool = localStorage.getItem("userId") === owner.id
      const date = createdAt.split("-").reverse().join("/")

      const aPost = new Post(id, owner.avatarUrl, owner.username, post, date)

      parent.appendChild(aPost.render(bool))
    })

    LayoutController.currentPage()
  }

  static createPagination(){
    const container = document.createElement("div")
    const lastPage  = localStorage.getItem("lastPage")

    for(let i = 1; i <= +lastPage; i++){
      const num = document.createElement("small")
      num.dataset.number = i
      num.innerText      = i
      num.addEventListener("click", LayoutController.changePage)

      container.appendChild(num)
    }

    container.classList.add("main__pagination")

    return container
  }

  static async newPost(){
    const postList = document.querySelector(".main__all-posts")
    const input    = document.getElementById("content")
    const body     = { content: input.value }
    const page     = localStorage.getItem("page")

    input.value = ""

    const request = await API.newPost(body)
    PostController.postsPage(postList, page)
  }

  static startEdit(e){
    const id      = e.target.dataset.id || e.target.closest("button").dataset.id
    const post    = document.getElementById(id)
    const current = post.querySelector(".post__content")
    const input   = post.querySelector(".post__edit")
    const btn     = post.querySelector(".btn__edit")

    input.value = current.innerText

    current.classList.toggle("clear")
    input.classList.toggle("clear")
    btn.classList.toggle("clear")
  }

  static async updatePost(e){
    const id       = e.target.dataset.id || e.target.closest("button").dataset.id
    const post     = document.getElementById(id)
    const input    = post.querySelector(".post__edit")
    const body     = { newContent: input.value }
    const postList = document.querySelector(".main__all-posts")
    const page     = localStorage.getItem("page")

    const request = await API.editPost(body, id)
    PostController.postsPage(postList, page)
  }

  static async deletePost(e){
    const postID   = e.target.dataset.id || e.target.closest("button").dataset.id
    const postList = document.querySelector(".main__all-posts")
    const page     = localStorage.getItem("page")

    const request = await API.deletPost(postID)
    PostController.postsPage(postList, +page)
  }
}

export default PostController
