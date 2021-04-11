export const create =(userId,token,postContent)=>{

    return (

       fetch(`${process.env.REACT_APP_API_URL}/post/new/${userId}`,{
          method:"POST",
       headers:{

        Accept:"application/json",
        Authorization: `Bearer ${token}`
     },
     body:postContent
    })
    .then(response=>{
       return response.json()
    })
    .catch(err=>console.log(err))
    )
 }

export const list = page=>{
   return(

    fetch(`${process.env.REACT_APP_API_URL}/posts/?page=${page}`,{
       method:"GET",
       Accept:"application/json",
       "Content-Type": "application/json"

    })
    .then(response=>response.json())
    .catch(err=>console.log(err))
   )
}

export const dedicatedPost = (postId)=>{
   return(

    fetch(`${process.env.REACT_APP_API_URL}/post/${postId}`,{
       method:"GET",
       Accept:"application/json",
       "Content-Type": "application/json"

    })
    .then(response=>response.json())
    .catch(err=>console.log(err))
   )
}

export const getPostByUser =(userId,token)=>{

   return (

      fetch(`${process.env.REACT_APP_API_URL}/post/by/${userId}`,{
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

export const deletePost = (postId,token)=>{
   return(

    fetch(`${process.env.REACT_APP_API_URL}/post/${postId}`,{
       method:"DELETE",
      headers: {
       Accept:"application/json",
       "Content-Type": "application/json",
       Authorization: `Bearer ${token}`
       }

    })
    .then(response=>response.json())
    .catch(err=>console.log(err))
   )
}

export const updatePostInfo =(postId,token,updatedPost)=>{

   return (

      fetch(`${process.env.REACT_APP_API_URL}/post/${postId}`,{
         method:"PUT",
      headers:{

       Accept:"application/json",
       Authorization: `Bearer ${token}`
    },
    body:updatedPost
   })
   .then(response=>{
      return response.json()
   })
   .catch(err=>console.log(err))
   )
}

export const like =(userId,token,postId)=>{

   return (

      fetch(`${process.env.REACT_APP_API_URL}/post/like`,{
         method:"PUT",
      headers:{

       Accept:"application/json",
       "Content-Type": "application/json",
       Authorization: `Bearer ${token}`
    },
    body:JSON.stringify({userId,postId})
   })
   .then(response=>{
      return response.json()
   })
   .catch(err=>console.log(err))
   )
}

export const unLike =(userId,token,postId)=>{

   return (

      fetch(`${process.env.REACT_APP_API_URL}/post/unlike`,{
         method:"PUT",
      headers:{

       Accept:"application/json",
       "Content-Type": "application/json",
       Authorization: `Bearer ${token}`
    },
    body:JSON.stringify({userId,postId})
   })
   .then(response=>{
      return response.json()
   })
   .catch(err=>console.log(err))
   )
}


export const postComment =(userId,token,postId,comment)=>{

   return (

      fetch(`${process.env.REACT_APP_API_URL}/post/comment`,{
         method:"PUT",
      headers:{

       Accept:"application/json",
       "Content-Type": "application/json",
       Authorization: `Bearer ${token}`
    },
    body:JSON.stringify({userId,postId,comment})
   })
   .then(response=>{
      return response.json()
   })
   .catch(err=>console.log(err))
   )
}

export const removeComment =(userId,token,postId,comment)=>{

   return (

      fetch(`${process.env.REACT_APP_API_URL}/post/uncomment`,{
         method:"PUT",
      headers:{

       Accept:"application/json",
       "Content-Type": "application/json",
       Authorization: `Bearer ${token}`
    },
    body:JSON.stringify({userId,postId,comment})
   })
   .then(response=>{
      return response.json()
   })
   .catch(err=>console.log(err))
   )
}