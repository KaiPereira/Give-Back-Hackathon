import axios from "axios";
import React from "react";
import NavBar from "../components/navbar";
import Link from "next/link";

export default function CreateListing() {
    const [userDetails, changeUserDetails] = React.useState({
        title: "",
        description: ""
    })

    function changeUserDetailsFunction(e) {
        changeUserDetails(details => {
            return {
                ...details,
                [e.target.name]: e.target.value
            }
        })
    
    }

    function createListing() {
        var data = JSON.stringify({
            "title": userDetails.title,
            "desc": userDetails.description
          });
          
          var config = {
            method: 'post',
            url: 'http://localhost:5000/api/listings',
            headers: { 
              'Authorization': `Bearer ${localStorage.getItem("key")}`, 
              'Content-Type': 'application/json'
            },
            data : data
          };
          
          axios(config)
          .then(function (response) {
            console.log(response.data);
          })
          .catch(function (error) {
            console.log(error);
          });
    }


    return (
        <>
            <NavBar />
            <main className="createListingMain">
                <h1>Create a Listing</h1>
                <div className="signinInputContainer">
                    <p className="signinInputContainerText">Title<span>(Seperate by Comma)</span></p>
                    <input type="text" placeholder="E-Commerce Web Design" className="signinInput" name="title" onChange={changeUserDetailsFunction} required/>
                </div>
                <div className="signinInputContainer2">
                    <p className="signinInputContainerText">Description</p>
                    <textarea type="text" placeholder="This job requires you to..." className="signinInput signinInputTextarea" name="description" onChange={changeUserDetailsFunction} required/>
                </div>
                {/* <Link href="/discover"> */}
                    <button className="signupButton" onClick={createListing}>Submit</button>
                {/* </Link> */}
            </main>
        </>
    )
}