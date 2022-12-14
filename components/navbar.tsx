import axios from "axios"
import React from "react"
import Link from "next/link"

const NavBar = () => {
    const [user, changeUser] = React.useState(true)

    React.useEffect(() => {
        axios.get(`http://localhost:5000/api/users/${localStorage.getItem("uid")}`)
            .then(res => {
                changeUser(res.data)
            })
            .catch(err => changeUser(false))
    }, [])

    function logout() {
        axios.get("http://localhost:5000/api/users/logout", {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("key")}`
            }
        })
        .then(res => {
            localStorage.removeItem("key")
            localStorage.removeItem("uid")
            localStorage.removeItem("refresh")
            window.location.reload()
        })
    }

    return (
        <div className='top-navbar-align'>
            <div className='top-navbar'>
                <Link href="/discover">
                    <div className="navbarCompany">
                        <svg width="493" height="497" viewBox="0 0 493 497" fill="none" xmlns="http://www.w3.org/2000/svg" className="navLogo">
                            <path d="M109.691 243.597C104.677 238.015 96.0077 237.783 90.7028 243.088L66.5741 267.217C63.9541 282.483 67.0642 313.015 100.465 313.015L138.173 275.308L109.691 243.597Z" fill="#D2FFEF"/>
                            <path d="M138.173 275.308L100.465 313.015C96.4176 339.186 105.396 361.603 131.567 361.603L175.88 317.29L138.173 275.308Z" fill="#D2FFEF"/>
                            <path d="M175.88 317.29L131.567 361.603C125.463 376.933 135.674 404.802 168.387 404.802L216.429 360.304L175.88 317.29Z" fill="#D2FFEF"/>
                            <path d="M205.496 450.411L237.426 418.067C247.535 407.827 247.481 391.347 237.304 381.174L216.429 360.304L168.387 404.802C164.025 422.186 174.091 450.411 205.496 450.411Z" fill="#D2FFEF"/>
                            <path d="M454.113 44.7768C386.069 -23.2669 290.546 16.4253 251.29 44.7768C212.034 12.0631 120.442 -20.656 48.4677 44.7768C-28.408 114.665 22.262 206.157 37.5283 227.965L66.5741 267.217L90.7028 243.088C96.0077 237.783 104.677 238.015 109.691 243.597L138.173 275.308L175.88 317.29L216.429 360.304L237.304 381.174C247.481 391.347 247.535 407.827 237.426 418.067L205.496 450.411L232.04 485.032C237.065 491.586 246.829 491.903 252.269 485.691L281.856 451.902C293.605 454.578 315.11 437.314 315.11 411.039C328.196 410.509 346.436 394.878 346.436 368.708C359.984 365.336 379.227 346.519 379.227 324.395C393.463 317.461 414.719 303.281 414.719 276.433L448.105 231.317C463.371 205.146 522.157 112.821 454.113 44.7768Z" fill="#D2FFEF"/>
                            <path d="M251.29 44.7768C290.546 16.4253 386.069 -23.2669 454.113 44.7768C522.157 112.821 463.371 205.146 448.105 231.317L414.719 276.433M251.29 44.7768C212.034 12.0631 120.442 -20.656 48.4677 44.7768C-28.408 114.665 22.262 206.157 37.5283 227.965L66.5741 267.217M251.29 44.7768L202.291 93.1806C198.711 96.7167 196.101 101.195 195.563 106.197C193.543 124.952 198.638 149.106 230.736 139.644C234.268 138.603 237.417 136.516 240.037 133.928L290.552 84.0267M66.5741 267.217L90.7028 243.088C96.0077 237.783 104.677 238.015 109.691 243.597L138.173 275.308M66.5741 267.217C63.9541 282.483 67.0642 313.015 100.465 313.015M100.465 313.015L138.173 275.308M100.465 313.015C96.4176 339.186 105.396 361.603 131.567 361.603M138.173 275.308L175.88 317.29M131.567 361.603L175.88 317.29M131.567 361.603C125.463 376.933 135.674 404.802 168.387 404.802M175.88 317.29L216.429 360.304M168.387 404.802C164.025 422.186 174.091 450.411 205.496 450.411M168.387 404.802L216.429 360.304M216.429 360.304L237.304 381.174C247.481 391.347 247.535 407.827 237.426 418.067L205.496 450.411M205.496 450.411L232.04 485.032C237.065 491.586 246.829 491.903 252.269 485.691L281.856 451.902M414.719 276.433L318.743 180.456M414.719 276.433C414.719 303.281 393.463 317.461 379.227 324.395M379.227 324.395L279.602 224.769M379.227 324.395C379.227 346.519 359.984 365.336 346.436 368.708M346.436 368.708L241.753 264.025M346.436 368.708C346.436 394.878 328.196 410.509 315.11 411.039M315.11 411.039L207.352 303.281M315.11 411.039C315.11 437.314 293.605 454.578 281.856 451.902M281.856 451.902L241.753 413.684" stroke="#57F1BA" stroke-width="13.0853" stroke-linecap="round"/>
                        </svg>
                        <p>Handshake</p>
                    </div>
                </Link>
                <div className="navSearchContainer">
                    <div className="navBarIcon"><i className="fa-solid fa-magnifying-glass"></i></div>
                    <input placeholder="Search Listing" className="fontAwesome navSearch" />
                </div>
                { user ?
                    <div className="navAccount">
                        {user.username && <img src="/AccountDummy.png" alt="Account" className="navIcon" />}
                        <p>{user.username}</p>
                        { user.username &&
                        <div className="navAccountDropdown">
                            <div className="navAccountDropdownParent">
                                <Link href={`/users/${typeof window !== "undefined" ? localStorage.getItem("uid") : ""}`}>
                                    <div className="navAccountDropdownChild">
                                        <p>Account</p>
                                    </div>
                                </Link>
                                { user.isBusiness &&
                                <Link href="/create-listing">
                                    <div className="navAccountDropdownChild">
                                        <p>Create-listing</p>
                                    </div>
                                </Link>
                                }
                                <div className="navAccountDropdownChild" onClick={logout}>
                                    <p>Log Out</p>
                                </div>
                            </div>
                        </div>
                        }
                    </div>
                :
                <Link href="/">
                    <button className="navSignInButton">Sign In</button>
                </Link>
                }
            </div>
        </div>
    )
}

export default NavBar
