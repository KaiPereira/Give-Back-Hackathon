import NavBar from "../components/navbar"
import Listing from "../components/Listing"
import React from "react"
import axios from "axios"

export default function Discover() {
    const [listings, changeListings] = React.useState()
    
    React.useEffect(() => {
        axios.get("http://localhost:5000/api/listings/discover", {
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Authorization": `Bearer ${localStorage.getItem("key")}`,
            }
        })
        .then(res => {
            changeListings(res.data.map((listing, index) => {
                console.log(listing)
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
    }, [])

  return (
    <>
        <NavBar />
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
    </>
  )
}
