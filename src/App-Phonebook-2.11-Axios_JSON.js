// ------------ GET Request ------------
import React, { useEffect, useState} from 'react'
import axios from 'axios'

const App = () => {
  const [loading, setLoading] = useState(true)
  const [persons, setPersons] = useState([])
  const [errMsg, setErrMsg] = useState([])

  useEffect(() => {
    const getData = async () => {
      // lataus käyntiin ja sitten odotetaan... (tai epäonnistutaan)
      setLoading(true);
      try {
        const {data: response} = await axios.get('http://localhost:3001/persons');
        setPersons(response);
        // koska toimii, niin tyhjennetään edellinen virheilmoitus jos sellainen on ollut
        setErrMsg([])
      } catch (error) {
        // jotain meni pieleen ja näytetään käyttäjälle yleisesti ymmärrettävä virheilmoitus
        if (error.response) {
          setErrMsg("Server respond contains an error")
        } else if (error.request) {
          setErrMsg("Server did not respond in time")
        } else {
          // kaikki muut (kuin response ja request) virheet käyttävät samaa virheilmoitusta
          setErrMsg("Data request triggered an error")
        }
        // tarkemmat tiedot tarkistettavissa konsolilta
        console.log(error)
        // käyttämälä toJSON() saa objektin jossa on myös lisätietoa virheestä:
        // message, name, description, number, fileName,
        // lineNumber, columnNumber, stack, config, code, status
        console.log(error.toJSON())
      }
      setLoading(false)
    }

    getData();
  }, []);

  return (
    <div>
      {/* Tässä kohtaa tarkistetaan onko lataus käynnissä */}
      {loading && <div>Loading...</div>}
      {!loading && (
        // ... ja nyt lataus on valmis
        <div>
          <h1>Phonebook</h1>
          {persons.map(person => (
            <div key={person.name}>
              <h3>{person.name}</h3>
              <p>{person.number}</p>
            </div>
          ))}
          {/* mahdollisen virheviestin paikka */}
          <p style={{ color: "red" }}>{errMsg}</p>

        </div>
      )}
    </div>
  )
}

export default App
