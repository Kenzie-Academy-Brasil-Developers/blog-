class API {
  static baseURL = "https://blog-m2.herokuapp.com/"
  static forUser = "users/"
  static forPost = "posts/"
  static token   = ""

  static async newUser(obj){
    const userURL = API.baseURL + API.forUser
    const req     = await fetch(userURL + "register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(obj),
    })
      .then((res)  => res.json())
      .then((res)  => res)
      .catch((err) => {  
        console.log(err)
        return err
      })
    return req
  }

  static async userLogin(obj){
    const userURL = API.baseURL + API.forUser
    const req     = await fetch(userURL + "login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(obj),
    })
      .then((res)  => res.json())
      .then((res)  => res)
      .catch((err) => err)

    if(req.token){
      API.token = req.token
    }
    return req
  }

  static async anUser(id){
    const userURL = API.baseURL + API.forUser
    const req     = await fetch(userURL + `${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res)  => res.json())
      .then((res)  => res)
      .catch((err) => {
        console.log(err)
        return err
      });
    return req
  }

  static async newPost(obj){
    const req = await fetch(API.baseURL + "posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(obj),
    })
      .then((res)  => res.json())
      .then((res)  => res)
      .catch((err) => err)

    return req
  }

  static async aPost(id){
    const postURL = API.baseURL + API.forPost
    const req     = await fetch(postURL + `${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res)  => res.json())
      .then((res)  => res)
      .catch((err) => {
        console.log(err)
        return err
      })
    return req
  }

  static async postsAtPage(page){
    const req = await fetch(API.baseURL + `posts?page=${page}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res)  => res.json())
      .then((res)  => res)
      .catch((err) => {
        console.log(err)
        return err
      })
    return req
  }

  static async editPost(obj, id){
    console.log(obj)
    console.log(id)
    const postURL = API.baseURL + API.forPost
    const req     = await fetch(postURL + `${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(obj), 
    })
      .then((res)  => res.json())
      .then((res)  => res)
      .catch((err) => err)

    return req
  }

  static deletPost(id) {
    const postURL = API.baseURL + API.forPost
    const req     = fetch(postURL + `${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res)  => res.json())
      .then((res)  => res)
      .catch((err) => err)

    return req
  }
}

export default API
