import NavBar from "../components/navbar"
import Listing from "../components/Listing"
import React from "react"
import axios from "axios"
import UserListing from "../components/UserListing"

export default function Discover() {
    const [listings, changeListings] = React.useState()
    const [userData, changeUserData] = React.useState()
    const [userListings, changeUserListings] = React.useState()
    
    React.useEffect(() => {

        axios.get(`http://localhost:5000/api/users/${localStorage.getItem("uid")}`)
            .then(res => {
                changeUserData(res.data)

                if (res.data.isStudent) {
                    axios.get("http://localhost:5000/api/listings/discover", {
                        headers: {
                            "Access-Control-Allow-Origin": "*",
                            "Authorization": `Bearer ${localStorage.getItem("key")}`,
                        }
                    })
                    .then(res => {
                        changeListings(res.data.map((listing, index) => {
                            return (
                                <Listing 
                                    key={index}
                                    title={listing.title}
                                    description={listing.desc}
                                    author={listing.author.username}
                                    location={`${listing.author.location.city}, ${listing.author.location.province}, ${listing.author.location.country}`}
                                    skills={listing.skills}
                                    id={listing.id}
                                />
                            )
                        }))
                    })
                } else if (res.data.isBusiness) {
                    axios.get("http://localhost:5000/api/users/all")
                        .then(res => {
                            axios.get("http://localhost:5000/api/users/4a409927-4ea0-4225-9ef6-11d6f102dd08")
                                .then(res2 => {
                                    changeUserListings(
                                        res.data.map((user, index) => {
                                            if (res2.data.username !== user.username)
                                            return (
                                                <UserListing 
                                                    key={index} 
                                                    username={user.username}
                                                    skills={user.skills}
                                                    description={user.bio}
                                                    location={`${user.location.city}, ${user.location.province}, ${user.location.country}`}
                                                />
                                            )
                                        })
                                    )
                                })
                        })
                        .catch(err => console.log(err))
                }
            })
            .catch(err => console.log(err))

    }, [])

  return (
    <>
        <NavBar />
        { (userData ? userData.isStudent : true) ?
            <div className="discover-page">
                <div className="discover-sections-p">
                    <div className='discover-sections'>
                        <div className='discover-section'>
                            Discover
                        </div>
                        <div className='discover-section'>
                            Tech
                        </div>
                        <div className='discover-section'>
                            Physical
                        </div>
                        <div className='discover-section'>
                            Teaching
                        </div>
                        <div className='discover-section'>
                            Design
                        </div>
                        <div className='discover-section'>
                            Development
                        </div>
                        <div className='discover-section'>
                            Online
                        </div>
                    </div>
                </div>
                <div className="listings">
                    {listings}
                </div>
            </div>
        :
        <div className="discover-page">
            <div className="discover-sections-p">
                <div className='discover-sections'>
                    <div className='discover-section'>
                        Discover
                    </div>
                    <div className='discover-section'>
                        Tech
                    </div>
                    <div className='discover-section'>
                        Physical
                    </div>
                    <div className='discover-section'>
                        Teaching
                    </div>
                    <div className='discover-section'>
                        Design
                    </div>
                    <div className='discover-section'>
                        Development
                    </div>
                    <div className='discover-section'>
                        Online
                    </div>
                </div>
            </div>
            <div className="listings">
                {userListings}
            </div>
        </div>
        }
    </>
  )
}
