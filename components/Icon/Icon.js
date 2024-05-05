import React from 'react'

const Icon = (props) => {
    return (
        <>
            <div className="icon">
                <div className="image"><img width={70} src={props.src} alt="" /></div>
                <p>{props.content}</p>
            </div>
        </>
    )
}

export default Icon
