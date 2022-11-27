import React from "react"
import Navbar from "../../components/navbar"
import Link from "next/link"
import axios from "axios"

export default function User({ data }) {
    const [userDetails, changeUserDetails] = React.useState({
        username: data.username,
        skills: data.skills ? data.skills.toString() : [],
        city: data.location.city,
        province: data.location.province,
        country: data.location.country,
        bio: data.bio,
        email: data.socials.email ? data.socials.email : "",
        instagram: data.socials.insta ? data.socials.insta : "",
        linkedin: data.socials.linkedin ? data.socials.linkedin : "",
        website: data.socials.website ? data.socials.website : ""
    })

    function changeUserDetailsFunction(e) {
        changeUserDetails(details => {
            return {
                ...details,
                [e.target.name]: e.target.value
            }
        })
    }

    function changeUserDetailsPermanently() {
        var data = JSON.stringify({
            username: userDetails.username,
            skills: userDetails.skills.split(","),
            location: {
                city: userDetails.city,
                province: userDetails.province,
                country: userDetails.country,
            },
            bio: userDetails.bio,
            socials:{ 
                email: userDetails.email,
                insta: userDetails.instagram,
                linkedin: userDetails.linkedin,
                website: userDetails.website,
            },
          });
          
          var config = {
            method: 'put',
            url: 'http://localhost:5000/api/users',
            headers: { 
              'Authorization': `Bearer ${localStorage.getItem("key")}`, 
              'Content-Type': 'application/json'
            },
            data : data
          };
          
          axios(config)
            .then(function (response) {
                window.location.href="/discover"
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    

    return (
        <>
            <Navbar />
            <main className="userContainer">
                <div className="userContainerOverlay">
                    <p className="userContainerOverlayText">Change</p>
                    <img src="/AccountDummy.png" alt="User Profile" className="userProfile" />
                </div>
                <div className="signinInputContainer">
                    <p className="signinInputContainerText">Username<span>(No Spaces)</span></p>
                    <input type="text" value={userDetails.username} placeholder="kaipereira" className="signinInput" name="username" onChange={changeUserDetailsFunction} required/>
                </div>
                <div className="signinInputContainer2">
                    <p className="signinInputContainerText">Skills<span>(Seperate by Comma)</span></p>
                    <input type="text" value={userDetails.skills} placeholder="kaipereira" className="signinInput" name="skills" onChange={changeUserDetailsFunction} required/>
                </div>
                <div className="signinInputContainer2">
                    <p className="signinInputContainerText">Bio</p>
                    <textarea type="text" value={userDetails.bio} placeholder="Unknown and mysterious individual" className="signinInput signinInputTextarea" name="bio" onChange={changeUserDetailsFunction} required/>
                </div>
                <div className="signinInputContainer2">
                    <p className="signinInputContainerText">City</p>
                    <input type="text" value={userDetails.city} placeholder="Tokyo" className="signinInput" name="city" onChange={changeUserDetailsFunction} required/>
                </div>
                <div className="signinInputContainer2">
                    <p className="signinInputContainerText">Province/State</p>
                    <input type="text" value={userDetails.province} placeholder="None" className="signinInput" name="province" onChange={changeUserDetailsFunction} required/>
                </div>
                <div className="signinInputContainer2">
                    <p className="signinInputContainerText">Country</p>
                    <input type="text" value={userDetails.country} placeholder="Japan" className="signinInput" name="country" onChange={changeUserDetailsFunction} required/>
                </div>
                <div className="signinInputContainer2">
                    <p className="signinInputContainerText">Email</p>
                    <input type="text" value={userDetails.email} placeholder="johndoe@gmail.com" className="signinInput" name="email" onChange={changeUserDetailsFunction} required/>
                </div>
                <div className="signinInputContainer2">
                    <p className="signinInputContainerText">Instagram</p>
                    <input type="text" value={userDetails.instagram} placeholder="https://instagram.com/johndoe" className="signinInput" name="instagram" onChange={changeUserDetailsFunction} required/>
                </div>
                <div className="signinInputContainer2">
                    <p className="signinInputContainerText">LinkedIn</p>
                    <input type="text" value={userDetails.linkedin} placeholder="https://www.linkedin.com/in/johndoe" className="signinInput" name="linkedin" onChange={changeUserDetailsFunction} required/>
                </div>
                <div className="signinInputContainer2">
                    <p className="signinInputContainerText">Website</p>
                    <input type="text" value={userDetails.website} placeholder="https://www.johndoe.com/" className="signinInput" name="website" onChange={changeUserDetailsFunction} required/>
                </div>
                <Link href="/discover">
                    <button className="signupButton" onClick={changeUserDetailsPermanently}>Submit</button>
                </Link>
            </main>
        </>
    )
}

export async function getServerSideProps(context) {
    const res = await axios.get(`http://localhost:5000/api/users/${context.params.userId}`)
    const data = await res.data

    return {
        props: { data } 
    }
}