import { UniqueIdentifier, useDraggable } from '@dnd-kit/core'
import { DragEndEvent } from '@dnd-kit/core'
import { DndContext, useDroppable } from '@dnd-kit/core'
import clsx from 'clsx'
import React from 'react'

function Droppable({
  droppableId,
  children,
}: React.PropsWithChildren & { droppableId: UniqueIdentifier }) {
  const { isOver, setNodeRef } = useDroppable({
    id: droppableId,
  })

  return (
    <div
      ref={setNodeRef}
      className={clsx(
        'Droppable',
        'flex h-48 w-96 items-center justify-center rounded-lg border',
        isOver
          ? 'border-green-800 bg-green-500'
          : 'border-gray-800 bg-gray-300 px-16',
      )}
    >
      {children}
    </div>
  )
}

function Draggable({
  draggableId,
  children,
}: React.PropsWithChildren & { draggableId: UniqueIdentifier }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: draggableId,
  })

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined

  return (
    <button ref={setNodeRef} style={style} {...listeners} {...attributes}>
      {children}
    </button>
  )
}
export default function ComplexExample() {
  const containers = ['A', 'B', 'C']
  const [parent, setParent] = React.useState<UniqueIdentifier | null>(null)

  const handleDragEnd = (e: DragEndEvent) => {
    const { over } = e

    setParent(over ? over.id : null)
  }

  const draggableMarkup = (
    <Draggable draggableId="draggable">
      <div
        className={clsx(
          'DraggableThing',
          'rounded-lg border border-gray-800 bg-gray-400 p-8',
        )}
      >
        Drag Me
      </div>
    </Draggable>
  )

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className={clsx('Wrapper', 'flex justify-between p-32')}>
        <div className={clsx('DraggableWrapper', 'grid place-content-center')}>
          {parent === null ? draggableMarkup : null}
        </div>

        <div className={clsx('DroppableWrapper', 'flex flex-col gap-8')}>
          {containers.map((id) => (
            <Droppable key={id} droppableId={id}>
              {parent === id ? draggableMarkup : 'Drop here'}
            </Droppable>
          ))}
        </div>
      </div>
    </DndContext>
  )
}
