import React, { useState, useEffect } from "react"
import Filter from "./components/Filter"
import PersonForm from "./components/PersonForm"
import Persons from "./components/Persons"
import personService from "./services/persons"
import Notification from "./components/Notification"

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState("")
  const [newNumber, setNewNumber] = useState("")
  const [filter, setFilter] = useState("")
  const [successMessage, setSuccessMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

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
    if (matchingPerson && matchingPerson.number === newNumber) {
      // alert(`${newName} is already added to phonebook`)
      setErrorMessage(`${newName} is already added to phonebook`)
      setTimeout(() => {
        setErrorMessage(null)
      }, 3000)
      setNewName("")
      setNewNumber("")
      return
    }

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
            setSuccessMessage(`Updated ${updatesPerson.name}`)
            setTimeout(() => {
              setSuccessMessage(null)
            }, 3000)
          })
          .catch((error) => {
            setErrorMessage(`Update ${updatesPerson.name} failed`)
            setTimeout(() => {
              setErrorMessage(null)
            }, 3000)
            setPersons(persons.filter((person) => person.id !== id))
            setNewName("")
            setNewNumber("")
          })
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
        setSuccessMessage(`Added ${returnedPerson.name}`)
        setTimeout(() => {
          setSuccessMessage(null)
        }, 3000)
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
          setSuccessMessage(`Deleted ${name}`)
          setTimeout(() => {
            setSuccessMessage(null)
          }, 3000)
        })
        // .catch((error) => alert(error))
        .catch((err) => {
          setErrorMessage(
            `Information of ${name} has already been removed from server`
          );
          setTimeout(() => {
            setErrorMessage(null);
          }, 5000);
          setPersons(persons.filter((p) => p.id !== id));
          setNewName("");
          setNewNumber("");
        })
    } else {
      return
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification
        successMessage={successMessage}
        errorMessage={errorMessage}
      />
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