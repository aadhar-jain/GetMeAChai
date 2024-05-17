"use client"
import React from 'react'
import "./page.scss";
import Link from 'next/link';
import { fetchSearchResults } from '@/actions/useractions';
import { useEffect, useState, useRef } from 'react';

const Search = ({ setIsVisible }) => {
    const [Users, setUsers] = useState([])
    const [searchString, setsearchString] = useState("")
    const toggleDivRef = useRef(null);

    useEffect(() => {
        toggleDivRef.current.focus();
    }, [])

    const handleChange = (e) => {
        setsearchString(e.target.value);
    }

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            getUsers(searchString);
        }
    };


    const getUsers = async () => {
        if (searchString != "") {
            let data = await fetchSearchResults(searchString);
            setUsers(data);
        }
        return;
    }

    return (
        <div className="searchContainer">

            <div className='searchItems'>

                <input ref={toggleDivRef}  onBlur={() => { setTimeout(() => { setIsVisible(false); }, 100) }} onKeyDown={handleKeyDown} onChange={handleChange} value={searchString} placeholder='Search creators' type="text" />

                <img id='searchIcon' src="/searchIcon.png" alt="" />
                <img onClick={() => { setTimeout(() => { setIsVisible(false); }, 100) }} id='closeIcon' src="/closeIcon.png" alt="" />

                <div className="searchResults">

                    {Users.map((u, i) => {
                        return <div className="searchItem" key={i}>
                            <img src={`${u.profilepic}`} alt="" />
                            <span className='itemName'>{u.name}</span>
                            <Link href={`/${u.username}`}><span className="itemUsername">Visit page</span></Link>
                        </div>
                    })}
                </div>

            </div>

        </div>
    )
}

export default Search
