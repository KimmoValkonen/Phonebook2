import React from "react"
const PhoneBook = ({ persons, showFilter }) => {
  let filterUpperCase = showFilter.toUpperCase()
  let newPersonArray = persons.filter(person => {
    let personInUpperCase = person.name.toUpperCase()
    return personInUpperCase.includes(filterUpperCase)
  })

  return newPersonArray.map(person => (
    <li key={person.name}>
      {person.name} {person.number}
    </li>
  ))
}
export default PhoneBook