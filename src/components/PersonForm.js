import React from "react"

function PersonForm({
  onFormSubmit,
  onNameChange,
  nameValue,
  onNumberChange,
  numberValue,
}) {
  return (
    <form onSubmit={onFormSubmit}>
      <h2>add a new</h2>
      <div>
        name: <input onChange={onNameChange} value={nameValue} />
      </div>
      <div>
        number: <input onChange={onNumberChange} value={numberValue} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

export default PersonForm
