import React, { memo } from "react"
import styles from "../../styles/item.module.css"
import { Draggable } from "react-beautiful-dnd"

export default memo(function Item({ item, index }) {
    return (
        <Draggable draggableId={item.id} index={index}>
            {(provided) => (
                <div
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                    className={styles.item}
                >
                    {item.content}
                </div>
            )}
        </Draggable>
    )
})
