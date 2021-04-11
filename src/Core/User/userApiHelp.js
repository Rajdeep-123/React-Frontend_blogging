export const read = (userId,token) =>{
    return fetch(`${process.env.REACT_APP_API_URL}/users/${userId}`,{
      method:"GET",
         headers:{


          Accept:"application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
       }
      })
      .then(response=>{
         return response.json()
      })
      .catch(err=>console.log(err))
 }

export const list = ()=>{
   return(

    fetch(`${process.env.REACT_APP_API_URL}/users`,{
       method:"GET",
       Accept:"application/json",
       "Content-Type": "application/json"

    })
    .then(response=>response.json())
    .catch(err=>console.log(err))
   )
}

export const removeUser=(userId,token)=>{

   return (
      fetch(`${process.env.REACT_APP_API_URL}/users/${userId}`,{
         method:"DELETE",
      headers:{

       Accept:"application/json",
       "Content-Type": "application/json",
       Authorization: `Bearer ${token}`
    }
   })
   .then(response=>{
      return response.json()
   })
   .catch(err=>console.log(err))
   )
}

export const updateUserInfo =(userId,UpdatedInfo,token)=>{
   return (

      fetch(`${process.env.REACT_APP_API_URL}/users/${userId}`,{
         method:"PUT",
      headers:{

       Accept:"application/json",
       Authorization: `Bearer ${token}`
    },
    body:UpdatedInfo
   })
   .then(response=>{
      return response.json()
   })
   .catch(err=>console.log(err))
   )
}

export const follow =(userId,token,followId)=>{

   return (

      fetch(`${process.env.REACT_APP_API_URL}/user/follow`,{
         method:"PUT",
      headers:{

       Accept:"application/json",
       "Content-Type": "application/json",
       Authorization: `Bearer ${token}`
    },
    body:JSON.stringify({userId,followId})
   })
   .then(response=>{
      return response.json()
   })
   .catch(err=>console.log(err))
   )
}

export const unfollow =(userId,token,unfollowId)=>{

   return (

      fetch(`${process.env.REACT_APP_API_URL}/user/unfollow`,{
         method:"PUT",
      headers:{

       Accept:"application/json",
       "Content-Type": "application/json",
       Authorization: `Bearer ${token}`
    },
    body:JSON.stringify({userId,unfollowId})
   })
   .then(response=>{
      return response.json()
   })
   .catch(err=>console.log(err))
   )
}

export const findPeople =(userId,token)=>{

   return (

      fetch(`${process.env.REACT_APP_API_URL}/user/findpeople/${userId}`,{
         method:"GET",
      headers:{

       Accept:"application/json",
       "Content-Type": "application/json",
       Authorization: `Bearer ${token}`
    }
   })
   .then(response=>{
      return response.json()
   })
   .catch(err=>console.log(err))
   )
}