import React, { useState, useEffect } from "react"
import Filter from "./components/Filter"
import PersonForm from "./components/PersonForm"
import Persons from "./components/Persons"
import personService from "./services/persons"

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState("")
  const [newNumber, setNewNumber] = useState("")
  const [filter, setFilter] = useState("")

  useEffect(() => {
    personService
      .getAll()
      .then((allPersons) => {
        setPersons(allPersons)
      })
      .catch((error) => alert(error))
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
    /* Filter:  Use toUpperCase() or toLowerCase() in person and filterKey -
       if you would like to remove the Case Sensitivity */
      const matchingPerson = persons.find(
        (person) => person.name.toLowerCase() === newName.toLowerCase()
      )
    
    // tarkista duplikaatti
    if (matchingPerson && matchingPerson.number !== newNumber) {
      if (window.confirm(`${matchingPerson.name} is already added to phonebook, replace the old number with a new one?`)) {
        const updatesPerson = { ...matchingPerson, number: newNumber }
        const id = matchingPerson.id

        personService
          .update(id, updatesPerson)
          .then((returnedPerson) => {
            setPersons(
              persons.map((person) =>
                person.id !== id ? person : returnedPerson
              )
            )
          })
          .catch((error) => alert(error))
        setNewName("")
        setNewNumber("")
        return
      } else {
        setNewName("")
        setNewNumber("")
        return
      }
    }

    const newPerson = { name: newName, number: newNumber }
    personService
      .create(newPerson)
      .then((returnedPerson) => {
        setPersons(persons.concat(returnedPerson))
        setNewName("")
        setNewNumber("")
      })
      .catch((error) => alert(error))
  }

  const handleDelete = (id, name) => {
    if (window.confirm("Delete " + name + " ?")) {
      personService
        .remove(id)
        .then((returnedPerson) => {
          setPersons(persons.filter((person) => person.id !== id))
        })
        .catch((error) => alert(error))
    } else {
      return
    }
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
      <Persons persons={persons} filter={filter} handleDelete={handleDelete} />
    </div>
  )
}

export default App