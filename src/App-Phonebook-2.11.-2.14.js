import React, { useState } from "react"

function SubmitForm({ persons, addPerson, filterKey }) {
  const [name, setName] = useState("")
  const [number, setNumber] = useState("")
  const [id, setId] = useState(null)
  const handleSubmit = (event) => {
    event.preventDefault();
    // kasvatetaan viimeisen id-kentän arvoa ensimmäiseksi vapaaksi
    setId(Math.max(...persons.map(person => person.id)) + 1)
    if (!addPerson({ name, number, id })) {
      // duplikaatti avain löydetty jo tallennettuna
      if ({name})
      alert(`${name} is already added to phonebook`)
    }
  }
  return (
    <div>
    <h3>Add a new</h3>

    <form onSubmit={handleSubmit}>
      <div>
          <label>name:
            <input
              type="text"
              name="inputName"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
          </label>
        </div>
        <div>
          <label>number:
            <input
              type="text"
              name="inputNumber"
              id="number"
              value={number}
              onChange={(event) => setNumber(event.target.value)}
            />
          </label>
        </div>
        <div>
            <button
              type="submit"
              onClick={handleSubmit}
              >add
            </button>
          </div>
      </form>
    </div>
  );
}

function ShowPersons({ persons, filterKey }) {
  /* Filter:  Use toUpperCase() or toLowerCase() in person and filterKey -
  if you would like to remove the Case Sensitivity */
  return (
    <>
      <h3>Numbers</h3>
      <div>
        {persons.filter(person => person.name.includes(filterKey)).map(filteredPerson => (
          <div key={`${filteredPerson.name}`}>
            {filteredPerson.name} {filteredPerson.number}
          </div>
        ))}
      </div>
    </>
  )
}

function App() {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])

  const [filterKey, setFilterKey] = useState("")

  const handleFilterChange = (event) => {
    setFilterKey(event.target.value)
  }
  
  const addPerson = (person) => {
    /* Tarkistetaan ettei nimi ole jo lisättynä.
    Kaikki henkilöt käydään läpi ja nimet tarkistetaan. */
    for (let i = 0; i < persons.length; ++i) {
      // console.log(persons[i].name)
      if (persons[i].name === person.name) {
        // keskeytetään lisäys ja palautetaan lisäys false:na
        return false
      }
    }
    // kaikkien henkilöiden nimet tarkistettu ja ei duplikaattia
    setPersons([...persons, person])
    // palautetaan true tehdyn lisäyksen jälkeen
    return true
  }
 
  return (
    <div>
      <h2>Phone book</h2>
      filter shown with:{" "}
      <input
        type="text"
        name="inputFilter"
        value={filterKey}
        onChange={handleFilterChange}
      />
      <SubmitForm persons={persons} addPerson={addPerson} filterKey={filterKey} />
      <ShowPersons persons={persons} filterKey={filterKey} />
    </div>
  )
}

export default App