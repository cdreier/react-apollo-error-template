import React from 'react'

const ListingComponent = ({loading, people, loadMore}) => {
    return (
        <div>
            <button onClick={loadMore}>fetchMore!</button>
            {loading ? (
            <p>Loading…</p>
            ) : (
            <ul>
                {people.map(person => (
                <li key={person.id}>
                    {person.name} {person.id}
                </li>
                ))}
            </ul>
            )}
        </div>
    )
}

export default ListingComponent