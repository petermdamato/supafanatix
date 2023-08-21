import { useRef } from 'react'
import { useDrag, useDrop } from 'react-dnd'
import { ItemTypes } from './ItemTypes.js'
import * as d3 from 'd3';
const style = {
  padding: '0.5rem 1rem',
  marginBottom: '.5rem',
  cursor: 'move',
  boxShadow: "5px 5px 5px #000",
  borderRadius:'4px'

}

const colorStops = ['#C54577', '#DC675B', '#B7AC70', '#63846E'];
const colorScale = d3.scaleLinear().domain([0, 100]).range([0, 1]);



export const Card = ({ id, value, descriptor, index, moveCard }) => {
  const ref = useRef(null)
  const [{ handlerId }, drop] = useDrop({
    accept: ItemTypes.CARD,
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      }
    },
    hover(item, monitor) {
      if (!ref.current) {
        return
      }
      const dragValue = item.value
      const dragIndex = item.index
      const hoverIndex = index
      const hoverValue = value
      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return
      }
      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect()
      // Get vertical middle
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
      // Determine mouse position
      const clientOffset = monitor.getClientOffset()
      // Get pixels to the top
      const hoverClientY = clientOffset.y - hoverBoundingRect.top
      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%
      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return
      }
      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return
      }
      // Time to actually perform the action
      moveCard(dragIndex, hoverIndex)
      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex
    },
  })
  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.CARD,
    item: () => {
      return { id, index }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  })
  const opacity = isDragging ? 0 : 1
  let backgroundColor = d3.interpolateRgbBasis(colorStops)(colorScale(value))

  

  drag(drop(ref))
  return (
    <div ref={ref} style={{ ...style, opacity, backgroundColor }} data-handler-id={handlerId}>
      <span className="card-title">{descriptor}</span>
    </div>
  )
}