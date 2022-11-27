import axios from "axios"
import React from "react"
import NavBar from "../components/navbar"
import Link from "next/link"

export default function Login() {
    const [signInDetails, changeSignInDetails] = React.useState({
      username: "",
      password: ""
    })

    function signIn() {
      axios.post("http://localhost:5000/api/users/login", {
        username: signInDetails.username,
        password: signInDetails.password,
        headers: {
          "Access-Control-Allow-Origin": "*",
        }
      })
      .then(res => {
        localStorage.setItem("key", res.data.accessToken)
        localStorage.setItem("uid", res.data.userId)
        window.location.href = "/discover"
      })
      .catch(err => console.log(err))
    }


    function signInDetailsTrack(e) {
      changeSignInDetails(details => {
        return {
          ...details,
          [e.target.name]: e.target.value
        }
      })
    }

    return (
        <>
            <NavBar />
            <main className="loginMain">
                <section className="signup">
                  <h1>Signup Now</h1>
                  <p className="signUpText">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam odio est, porttitor sit amet urna sit amet, malesuada dictum felis. Sed arcu leo, tristique sit amet interdum sit amet, auctor vel mi.</p>
                  <Link href="/signup">
                    <button className="signupButton">Sign Up</button>
                  </Link>
                </section>
                <section className="signin">
                  <h1>Sign In</h1>
                  <div className="signinInputContainer">
                    <p className="signinInputContainerText">Username<span>(No Spaces)</span></p>
                    <input type="text" placeholder="kaipereira" className="signinInput" onChange={signInDetailsTrack} name="username" required/>
                  </div>
                  <div className="signinInputContainer2">
                    <p className="signinInputContainerText">Password</p>
                    <input type="password" placeholder="********" className="signinInput" onChange={signInDetailsTrack} name="password" required/>
                  </div>
                  <button className="signinButton" onClick={signIn}>Sign In</button>
                </section>
            </main>
        </>
    )
}