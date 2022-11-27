import React from "react"
import react from "react"
import axios from "axios"
import Link from "next/link"

export default function Listing(props) {
    const [skills, setSkills] = React.useState()

    React.useEffect(() => {
        setSkills(
            props.skills.map((skill) => {
                return (
                    <div className="listing-tag">{skill}</div>
                )
            })
        )
    }, [])

    return (
        <>
            <Link href={`/listing/${props.id}`}>
                <div className="listing">
                    <p className="listing-title">{props.title}</p>
                    <div className="listing-tags">{skills}</div>
                    <p className="listing-description"> {props.description}</p>
                    <p className="listing-location"><span>Location:</span> {props.location}</p>
                    <p className="listing-author"><span>Author:</span> {props.author}</p>
                </div>
            </Link>
        </>
    )
}