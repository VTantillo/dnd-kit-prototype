import {
  DndContext,
  DragEndEvent,
  useDraggable,
  useDroppable,
} from '@dnd-kit/core'
import clsx from 'clsx'
import React from 'react'

function BasicDroppable({ children }: React.PropsWithChildren) {
  const { isOver, setNodeRef } = useDroppable({
    id: 'basic-droppable',
  })
  const style = {
    color: isOver ? 'green' : undefined,
  }

  return (
    <div
      ref={setNodeRef}
      className={clsx(
        'BasicDroppableWrapper',
        'grid h-48 w-48 place-content-center rounded-lg border',
        isOver
          ? 'border-green-700 bg-green-400'
          : 'border-gray-700 bg-gray-400',
      )}
    >
      {children}
    </div>
  )
}

function BasicDraggable({ children }: React.PropsWithChildren) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: 'basic-draggable',
  })

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined

  return (
    <button
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={clsx(
        'BasicDraggableButton',
        'rounded-lg border border-gray-700 bg-gray-400 p-4',
      )}
    >
      {children}
    </button>
  )
}

export default function BasicExample() {
  const [isDropped, setIsDropped] = React.useState(false)

  const handleDragEnd = (event: DragEndEvent) => {
    if (event.over && event.over.id === 'droppable') {
      setIsDropped(true)
    }
  }

  const draggableMarkup = <BasicDraggable>Drag me</BasicDraggable>

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className={clsx('Wrapper', 'flex justify-around')}>
        <div
          className={clsx('DraggableContainer', 'grid place-content-center')}
        >
          {!isDropped ? draggableMarkup : null}
        </div>

        <BasicDroppable>
          {isDropped ? draggableMarkup : 'Drop here'}
        </BasicDroppable>
      </div>
    </DndContext>
  )
}
