export const  signin = userInfo =>{
    return(

       fetch( `${process.env.REACT_APP_API_URL}/signin`,{
           method:"POST",
           headers:{
               Accept: "application/json",
               "Content-Type":"application/json"
           },
           body:JSON.stringify(userInfo)
       })
       .then(resonse=>{
           return resonse.json()
       })
       .catch(err=>console.log(err))
    )
}

export const authanticate=(jwt,next)=>{
    if(typeof window!=undefined){
        localStorage.setItem("jwt",JSON.stringify(jwt));
        next();
    }
}

export const signUp = userInfo =>{
    return(
       fetch( `${process.env.REACT_APP_API_URL}/signup`,{
           method:"POST",
           headers:{
               Accept: "application/json",
               "Content-Type":"application/json"
           },
           body:JSON.stringify(userInfo)
       })
       .then(resonse=>{
           return resonse.json()
       })
       .catch(err=>console.log(err))
    )
}


export const signOut = (next) =>{
    if(typeof window !== undefined){
      localStorage.removeItem("jwt");
      next();
      return fetch( `${process.env.REACT_APP_API_URL}/Signout`,{
        method:"GET"
      })
      .then(response =>{
        console.log(response);
        response.json()
      })
      .catch(err=>console.log(err))
    }
  }

 export const isAuthenticated = ()=>{
  if(typeof window === false){
    return false
  }else{
    if(localStorage.getItem("jwt")){
      return JSON.parse(localStorage.getItem("jwt"))
    }else{
      return false
    }
  }
  }

  export const updateUserLocal =(user,next)=>{
    if(typeof window!=="undefined"){
      if(localStorage.getItem("jwt")){
        let auth = JSON.parse(localStorage.getItem("jwt"));
        auth.user=user;
        localStorage.setItem("jwt",JSON.stringify(auth));
        next();
      }
    }

  }

  export const forgotPassword = email => {
    console.log("email: ", email);
    return fetch(`${process.env.REACT_APP_API_URL}/forgot-password`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ email })
    })
        .then(response => {
            console.log("forgot password response: ", response);
            return response.json();
        })
        .catch(err => console.log(err));
};

export const resetPassword = resetInfo => {
    return fetch(`${process.env.REACT_APP_API_URL}/reset-password`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(resetInfo)
    })
        .then(response => {
            console.log("forgot password response: ", response);
            return response.json();
        })
        .catch(err => console.log(err));
};