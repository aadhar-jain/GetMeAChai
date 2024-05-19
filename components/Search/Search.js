"use client"
import React from 'react'
import "./page.scss";
import Link from 'next/link';
import { fetchSearchResults } from '@/actions/useractions';
import { useEffect, useState, useRef } from 'react';

const Search = ({ isVisible, setIsVisible }) => {
    const [Users, setUsers] = useState([])
    const [searchString, setsearchString] = useState("")
    const divRef = useRef(null);
    const inputRef = useRef(null);

    useEffect(() => {
        divRef.current.focus();
        getUsers(searchString);
    }, [])

    useEffect(() => {
        if (isVisible) {
            document.documentElement.style.overflowY = 'hidden';
        } else {
            document.documentElement.style.overflowY = 'auto';
        }

        // Cleanup function to reset overflowY style when component unmounts
        return () => {
            document.documentElement.style.overflowY = 'auto';
        };

    }, [isVisible]);


    const handleChange = (e) => {
        setsearchString(e.target.value);
        setTimeout(() => {
            getUsers(searchString);
        }, 500);
    }


    const getUsers = async () => {
        let data = await fetchSearchResults(searchString);
        setUsers(data);
        return;
    }

    const handleBlur = () => {
        setTimeout(() => {
            if (document.activeElement !== inputRef.current && document.activeElement !== divRef.current) {
                setIsVisible(false);
            }
        }, 100);
    }
    const handleFocus = () => {
        setIsVisible(true);
    }

    return (
        <div className="searchContainer">

            <div ref={divRef} className='searchItems' tabIndex={0} onFocus={handleFocus} onBlur={handleBlur}>

                <input spellCheck="false" ref={inputRef} onChange={handleChange} value={searchString} placeholder='Search creators' type="text" />

                <img id='searchIcon' src="/searchIcon.webp" alt="" />
                <img onClick={() => { setTimeout(() => { setIsVisible(false); }, 100) }} id='closeIcon' src="/closeIcon.webp" alt="" />

                <div className="searchResults">
                    {Users.length != 0 && Users.map((u, i) => {
                        return <div className="searchItem" key={i}>
                            <img src={`${u.profilepic}`} alt="" />
                            <span className='itemName'>{u.username}</span>
                            <Link href={`/${u.username}`}><span className="itemUsername">Visit page</span></Link>
                        </div>
                    })}
                </div>

            </div>

        </div>
    )
}

export default Search
