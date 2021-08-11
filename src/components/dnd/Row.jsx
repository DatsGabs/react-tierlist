import React from "react"
import styles from "../../styles/row.module.css"
import Item from "./Item"
import { Droppable, Draggable } from "react-beautiful-dnd"
import RowTitle from "./RowTitle"

export default function Row({ row, items, index }) {
    return (
        <Draggable draggableId={row.id} index={index}>
            {(provided) => (
                <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    className={styles.wrapper}
                >
                    <div className={styles.container}>
                        <div
                            className={styles.title}
                            style={{ backgroundColor: row.color }}
                            {...provided.dragHandleProps}
                        >
                            <RowTitle row={row} />
                        </div>
                        <Droppable droppableId={row.id} direction="horizontal">
                            {(provided) => (
                                <div
                                    className={styles.row}
                                    ref={provided.innerRef}
                                    {...provided.droppableProps}
                                >
                                    {items.map((item, index) => (
                                        <Item
                                            item={item}
                                            key={item.id}
                                            index={index}
                                        />
                                    ))}
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    </div>
                </div>
            )}
        </Draggable>
    )
}
