import React, { useContext } from "react"
import { Droppable } from "react-beautiful-dnd"
import styles from "../../styles/row.module.css"
import Item from "./Item"
import { TierlistContext } from "./Tierlist"

export default function ItemsCarrrousel() {
    const { tierlist } = useContext(TierlistContext)
    const items = tierlist.rows.carrousel.items.map(
        (item) => tierlist.items[item]
    )
    return (
        <Droppable droppableId="carrousel" direction="horizontal">
            {(provided) => (
                <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className={`${styles.row} ${styles.carrousel}`}
                >
                    {items.map((item, index) => (
                        <Item item={item} key={item.id} index={index} />
                    ))}
                    {provided.placeholder}
                </div>
            )}
        </Droppable>
    )
}
