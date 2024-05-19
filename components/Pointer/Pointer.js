import React from 'react'

const Pointer = (props) => {
    return (
        <>
            <div className="pointer">
                <img width={30} src="/tick.webp" alt="" />
                <span>{props.content}</span>
            </div>
        </>
    )
}

export default Pointer
