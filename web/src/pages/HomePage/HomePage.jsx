import { useState } from 'react'

const HomePage = () => {
  const [player, setPlayer] = useState(1)
  const [winner, setWinner] = useState(null)

  const getInicialState = () => {
    const state = {}
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 3; col++) {
        state[`${row}-${col}`] = null
      }
    }
    return state
  }

  const [values, setValues] = useState(getInicialState)

  const getKeyFromIndex = (i) => {
    const row = Math.floor(i / 3)
    const col = i % 3

    return `${row}-${col}`
  }

  const getLable = (value) => {
    if (!value) return null

    return value > 0 ? 'O' : 'X'
  }

  const getWinner = (value) => {
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 3; col++) {
        const sumRow =
          value[`${row}-${col}`] +
          value[`${row}-${col + 1}`] +
          value[`${row}-${col + 2}`]
        if (sumRow === 3 || sumRow === -3) return sumRow

        const sumCol =
          value[`${row}-${col}`] +
          value[`${row + 1}-${col}`] +
          value[`${row + 2}-${col}`]
        if (sumCol === 3 || sumCol === -3) return sumCol

        const sumDiagonal =
          value[`${row}-${col}`] +
          value[`${row + 1}-${col + 1}`] +
          value[`${row + 2}-${col + 2}`]
        if (sumDiagonal === 3 || sumDiagonal === -3) return sumDiagonal

        const sumReverseDiagonal =
          value[`${row}-${col}`] +
          value[`${row + 1}-${col - 1}`] +
          value[`${row + 2}-${col - 2}`]
        if (sumReverseDiagonal === 3 || sumReverseDiagonal === -3)
          return sumReverseDiagonal
      }
    }
    return null
  }

  const handleClick = (key) => {
    if (values[key] || winner) return
    const newValues = {
      ...values,
      [key]: player,
    }
    setValues(newValues)
    setPlayer(player * -1)
    const newWinner = getWinner(newValues)

    if (newWinner) {
      setWinner(newWinner > 0 ? 1 : -1)
    }
  }

  const reset = () => {
    setWinner(null)
    setValues(getInicialState)
    setPlayer(1)
  }

  const itsATie = Object.values(values).filter(Boolean).length === 9 && !winner

  return (
    <div className="container">
      <h1>Jogo da Velha</h1>
      <div className="game ">
        {Array.from({ length: 9 }).map((_, i) => {
          const key = getKeyFromIndex(i)
          return (
            <button key={i} className="cell" onClick={() => handleClick(key)}>
              {getLable(values[key])}
            </button>
          )
        })}
      </div>
      {(winner || itsATie) && (
        <div className="finish">
          {winner ? (
            <p>{`"${winner > 0 ? 'O' : 'X'}"`} É o Vencedor!!!</p>
          ) : (
            <p>Empate!</p>
          )}

          <button className="btn-restart" onClick={reset}>
            <p>Restart</p>
          </button>
        </div>
      )}
    </div>
  )
}

export default HomePage
