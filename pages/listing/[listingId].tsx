import axios from "axios"
import React from "react"
import NavBar from "../../components/navbar"
import Link from "next/link"

export default function Listing({ data }) {
    const [skills, changeSkills] = React.useState()
    
    React.useEffect(() => {
        changeSkills(data.skills.map((skill, index) => {
            return (
                <div className="specific-listing-skill" key={index}>{skill}</div>
            )
        }))
    }, [])

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
                        { data.author.socials.website &&
                            <>
                                <a href={data.author.socials.website} target="_blank" rel="noreferrer">
                                    <div className="authorSocial">
                                        <i className="fa-solid fa-globe"></i>
                                    </div>
                                </a>
                            </>
                        }
                        { data.author.socials.insta &&
                            <>
                                <a href={data.author.socials.insta} target="_blank" rel="noreferrer">
                                    <div className="authorSocial">
                                        <i className="fa-brands fa-instagram"></i>
                                    </div>
                                </a>
                            </>
                        }
                        { data.author.socials.linkedin &&
                            <>
                                <a href={data.author.socials.linkedin} target="_blank" rel="noreferrer">
                                    <div className="authorSocial">
                                        <i className="fa-brands fa-linkedin-in"></i>
                                    </div>
                                </a>
                            </>
                        }
                    </div>
                </section>
                <section className="listingDetails">
                    <h1>{data.title}</h1>
                    <div className="listingSkills">
                        {skills}
                    </div>
                    <p className="listingDetailDescription">{data.desc}<br /><br /><span>Location: </span>{data.location.town}, {data.location.province}, {data.location.country}</p>
                    <a href={`mailto:${data.author.socials.email}`} target="_blank" rel="noreferrer">
                        <button className="listingContactButton">Contact Now <svg className="arrow" width="26" height="14" viewBox="0 0 26 14" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M19.4167 2L24 7M24 7L19.4167 12M24 7H2" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/> </svg></button>
                    </a>
                    
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