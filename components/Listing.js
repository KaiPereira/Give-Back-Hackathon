import React from "react"
import react from "react"
import axios from "axios"

export default function Listing(props) {
    const [skills, changeSkills] = react.useState()

    React.useEffect(() => {
        // Change Skills
        changeSkills(props.skills.map((skill, index) => {
            return (
                <div className="listing-tag" key={index}>{skill}</div>
            )
        }))

        axios.get("http://localhost:5000/api/users/21e1be72-44d4-4331-bdfa-d8be12c40eda")
            // .then(res => console.log(res.data))
            // .catch(err => console.log(err))

    }, [])


    return (
        <div className="listing">
            <p className="listing-title">{props.title}</p>
            <div className="listing-tags">
                {skills}
            </div>
            <p className="listing-description"> {props.description}</p>
            <p className="listing-location"><span>Location:</span> {props.location}</p>
            <p className="listing-author"><span>Author:</span> {props.author}</p>
        </div>
    )
}