import React from "react"

function Person({ person, handleDelete }) {
  return (
    <div key={person.name}>
      {person.name} {person.number}&nbsp;<button onClick={() => handleDelete(person.id, person.name)}>delete</button>
    </div>
  )
}

export default Person;