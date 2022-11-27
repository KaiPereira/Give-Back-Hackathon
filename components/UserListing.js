import React from "react"
import Link from "next/link"

export default function UserListing(props) {

    let skills = props.skills.map((skill, index) => {
        return (
            <div className="listing-tag" key={index}>{skill}</div>
        )
    })

    return (
        <Link href={`mailto:`}>
            <div className="listing userListing">
                <img src="/AccountDummy.png" className="listing-image" />
                <p className="userListingHeader">{props.username}</p>
                <div className="listing-tags listing-tag-user">
                    {skills}
                </div>
                <p className="userListingDescription">{props.description}<br /><br /><span>Location: </span>{props.location}</p>
            </div>
        </Link>
    )
}