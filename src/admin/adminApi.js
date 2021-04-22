export const getAdminData = (token) =>{
    return (

        fetch(`${process.env.REACT_APP_API_URL}/admin`,{
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


export const pushUser =(name,email,password,token)=>{

   return (

      fetch(`${process.env.REACT_APP_API_URL}/admin/allowuser`,{
         method:"POST",
      headers:{

       Accept:"application/json",
       "Content-Type": "application/json",
       Authorization: `Bearer ${token}`
    },
    body:JSON.stringify({name,email,password})
   })
   .then(response=>{
      return response.json()
   })
   .catch(err=>console.log(err))
   )
}

export const removeUser =(id,token)=>{

   return (

      fetch(`${process.env.REACT_APP_API_URL}/admin/declineuser`,{
         method:"POST",
      headers:{

       Accept:"application/json",
       "Content-Type": "application/json",
       Authorization: `Bearer ${token}`
    },
    body:JSON.stringify({id})
   })
   .then(response=>{
      return response.json()
   })
   .catch(err=>console.log(err))
   )
}