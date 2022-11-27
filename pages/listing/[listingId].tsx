import axios from "axios"
import React from "react"
import NavBar from "../../components/navbar"

export default function Listing({ data }) {
    console.log(data)

    return (
        <>
            <NavBar />
            <main className="listingMain">
                <section className="author">
                    <img src="/companyImageTest.png" alt="Company Image" className="listingCompanyImage" />
                    <h4 className="listingAuthorName">{data.author.username}</h4>
                    <p className="listingAuthorDescription">{data.author.bio}</p>
                    <div className="authorSocials">
                        <div className="authorSocial">
                            <i className="fa-solid fa-globe"></i>
                        </div>
                        <div className="authorSocial">
                            <i className="fa-brands fa-instagram"></i>
                        </div>
                        <div className="authorSocial">
                            <i className="fa-brands fa-linkedin-in"></i>
                        </div>
                    </div>
                </section>
                <section className="listingDetails">
                    <h1>E-Commerce Website</h1>
                </section>
            </main>
        </>
    )
}

export async function getServerSideProps(context) {
    const res = await axios.get(`http://localhost:5000/api/listings/${context.params.listingId}`)
    const data = await res.data

    return {
        props: { data } 
    }
}