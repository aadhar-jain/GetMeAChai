import React from 'react'

const Pointer = (props) => {
    return (
        <>
            <div className="pointer">
                <img width={30} src="/tick.png" alt="" srcset="" />
                <span>{props.content}</span>
            </div>
        </>
    )
}

export default Pointer
