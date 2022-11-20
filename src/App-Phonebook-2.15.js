import React, { useState, useEffect } from "react"
import Filter from "./components/Filter"
import PersonForm from "./components/PersonForm"
import Persons from "./components/Persons"
import axios from "axios"
const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState("")
  const [newNumber, setNewNumber] = useState("")
  const [filter, setFilter] = useState("")
  useEffect(() => {
    axios.get("http://localhost:3001/persons").then((res) => {
      setPersons(res.data)
    })
  }, [])
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }
  const handleSubmit = (event) => {
    event.preventDefault()
    if (
      persons.some(
        /* Filter:  Use toUpperCase() or toLowerCase() in person and filterKey -
           if you would like to remove the Case Sensitivity */
        (person) => person.name.toLowerCase() === newName.toLowerCase()
      )
    ) {
      // duplikaatti löydetty
      alert(`${newName} is already added to phonebook`)
      setNewName("")
      setNewNumber("")
      return
    }

    const newPerson = { name: newName, number: newNumber }
    axios.post("http://localhost:3001/persons", newPerson).then((res) => {
      setPersons(persons.concat(res.data))
      setNewName("")
      setNewNumber("")
    })
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} onFilterChange={handleFilterChange} />
      <PersonForm
        onFormSubmit={handleSubmit}
        onNameChange={handleNameChange}
        onNumberChange={handleNumberChange}
        nameValue={newName}
        numberValue={newNumber}
      />
      <h2>Numbers</h2>
      <Persons persons={persons} filter={filter} />
    </div>
  )
}
export default App