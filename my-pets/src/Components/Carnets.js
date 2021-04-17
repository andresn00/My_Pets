import React from 'react'

const Carnets = (props) => {
    const userId = props.match.params.id
    console.log('carnet', userId)
    return (
        <div>
            <h2>{userId}</h2>
        </div>
    )
}

export default Carnets
