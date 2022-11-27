import React from "react"
import NavBar from "../components/navbar"
import Link from "next/link"
import axios from "axios"

export default function Signup() {
    const [radioValue, changeRadioValue] = React.useState(false)
    const [userDetails, changeUserDetails] = React.useState({
        username: "",
        password: "",
        city: "",
        province: "",
        country: ""
    })

    function changeRadioButton() {
        changeRadioValue(!radioValue)
    }

    function changeUserDetailsFunction(e) {
        changeUserDetails(details => {
            return {
                ...details,
                [e.target.name]: e.target.value
            }
        })
    }

    function signUp() {
        var data = JSON.stringify({
            username: userDetails.username,
            password: userDetails.password,
            location: {
                city: userDetails.city,
                province: userDetails.province,
                country: userDetails.country
            },
            bio: "No bio available",
            skills: [],
            socials: {

            },
            isBusiness: radioValue ? true : false,
            isStudent: radioValue ? false : true,
          });
          
          var config = {
            method: 'post',
            url: 'http://localhost:5000/api/users',
            headers: { 
              'Content-Type': 'application/json'
            },
            data : data
          };
          
          axios(config)
            .then(function (response) {
                localStorage.setItem("key", response.data.accessToken)
                localStorage.setItem("uid", response.data.userId)
                localStorage.setItem("resfresh", response.data.refreshToken)
                window.location.href = "/discover"
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    
    return (
        <>
            <NavBar />
            <main className="signupMain">
                <section className="signin">
                    <h1>Sign Up</h1>
                    <div className="signinInputContainer">
                        <p className="signinInputContainerText">Username<span>(No Spaces)</span></p>
                        <input type="text" placeholder="kaipereira" className="signinInput" name="username" onChange={changeUserDetailsFunction} required/>
                    </div>
                    <div className="signinInputContainer2">
                        <p className="signinInputContainerText">City</p>
                        <input type="text" placeholder="8758 Tokyo Avenue" className="signinInput" name="city" onChange={changeUserDetailsFunction} required/>
                    </div>
                    <div className="signinInputContainer2">
                        <p className="signinInputContainerText">Province/State</p>
                        <input type="text" placeholder="8758 Tokyo Avenue" className="signinInput" name="province" onChange={changeUserDetailsFunction} required/>
                    </div>
                    <div className="signinInputContainer2">
                        <p className="signinInputContainerText">Country</p>
                        <input type="text" placeholder="8758 Tokyo Avenue" className="signinInput" name="country" onChange={changeUserDetailsFunction} required/>
                    </div>
                    <div className="signinInputContainer2">
                        <p className="signinInputContainerText">Password</p>
                        <input type="password" placeholder="********" className="signinInput" name="password" onChange={changeUserDetailsFunction} required/>
                    </div>
                    <div className="signInInputRadios">
                        <p className="signinInputContainerText">Are You a Business or Student</p>
                        <div className="signInInputRadiosContainer">
                            <div className="sisngInRadioButton">
                                <input checked={radioValue ? true : false} type="radio" name="choose" id="choose" onChange={changeRadioButton} />
                                <label for="choose">Business</label><br />
                            </div>
                            <div className="sisngInRadioButton">
                                <input checked={radioValue ? false : true} type="radio" name="choose" id="choose" onChange={changeRadioButton} />
                                <label for="choose">Student</label>
                            </div>
                        </div>
                    </div>
                    <button className="signinButton" onClick={signUp}>Sign Up</button>
                </section>
                <section className="signup">
                    <h1>Signup In</h1>
                    <p className="signUpText">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam odio est, porttitor sit amet urna sit amet, malesuada dictum felis. Sed arcu leo, tristique sit amet interdum sit amet, auctor vel mi.</p>
                    <Link href="/">
                        <button className="signupButton">Sign In</button>
                    </Link>
                </section>
            </main>
        </>
    )
}