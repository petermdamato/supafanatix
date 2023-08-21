import update from 'immutability-helper'
import { useCallback, useState } from 'react'
import { Card } from './Card.js'
const style = {
  width: 200,
  display:'flex'
}

export const Container = ({cardData}) => {
  {
    const [cards, setCards] = useState(cardData)
    const moveCard = useCallback((dragIndex, hoverIndex) => {
      setCards((prevCards) =>
        update(prevCards, {
          $splice: [
            [dragIndex, 1],
            [hoverIndex, 0, prevCards[dragIndex]],
          ],
        }),
      )
    }, [])
    const renderCard = useCallback((card, index) => {
      return (
        <Card
          key={card.id}
          index={index}
          id={card.id}
          descriptor={card.descriptor}
          value={card.value}
          moveCard={moveCard}
        />
      )
    }, [])
    return (
      <>
        <div style={style}>{cards.map((card, i) => renderCard(card, i))}</div>
      </>
    )
  }
}