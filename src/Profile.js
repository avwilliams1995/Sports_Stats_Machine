import { useSelector } from "react-redux";
import React, { useState, useEffect } from "react";
import { editBio } from "./Redux/userInfoReducer";
import { store } from "./Redux/store";
const Profile = () => {
  
  const [changeBio, setEdit] = useState(false)
  const username = useSelector((state)=> state.userInfo.username)
  const [text, setText] = useState('')
  
  const changeText = (e) => {
    e.preventDefault()
    setText(e.target.value)
  }
  // useEffect(()=>{

  // }, [])

  const handleBioEdit = async(e) => {
    e.preventDefault();
    let bio = text;
    let body = JSON.stringify({username, bio})
    try {
      console.log('-----editing bio------', body)
      const response = await fetch("http://localhost:3000/editBio", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body,
      });
      if (!response.ok) {
        throw new Error(`Failed to fetch: ${response.statusText}`);
      }
      response.json().then(data=>{
        console.log(data)
        store.dispatch(editBio(data));
        console.log("User update ", data);
        setEdit(false)

      })
      
    } catch (error) {
      console.error("Error during fetch:", error);
    }
  }
  
  const userInfo = useSelector(state=> state.userInfo)
  console.log(userInfo, '--------- updated user info')
  
  return (
    <div className="profile"> 
    <div>
      <p>{userInfo.username}</p>
      <p>{userInfo.bio}</p>
      {changeBio ? <div><input
        className="search-bar select-box"
        type="text"
        placeholder="Edit bio"
        onChange={(e) => changeText(e)}
      />
      <button
        className="search-button"
        type="submit"
        onClick={async (e) => await handleBioEdit(e)}
      >
        Submit
      </button></div> : null}
    </div>
      <button onClick={() => setEdit(true)}>Edit bio</button>
    
          
    </div>
  )
}

export default Profile