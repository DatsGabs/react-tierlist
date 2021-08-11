import React, { useState, useRef } from "react"
import { DragDropContext, Droppable } from "react-beautiful-dnd"
import Row from "./Row"
import styled from "styled-components"
import ItemsCarrrousel from "./ItemsCarrousel"
import AddItem from "./AddItem"
import data from "./data"
import AddRow from "./AddRow"
import DropFile from "./DropFile"
import Screenshot from "./Screenshot"

const TierlistContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 85%;
    margin: auto;
`

export const TierlistContext = React.createContext()

export default function Tierlist() {
    const [tierlist, setTierlist] = useState(data)
    const tierlistContainer = useRef(null)

    const onDragEnd = (result) => {
        const { destination, source, draggableId, type } = result
        // If the destination is the same don't do anything
        if (!destination) return

        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) {
            return
        }

        if (type == "row") {
            const newRowOrder = [...tierlist.rowOrder]
            newRowOrder.splice(source.index, 1)
            newRowOrder.splice(destination.index, 0, draggableId)
            const newTierlist = {
                ...tierlist,
                rowOrder: newRowOrder,
            }
            setTierlist(newTierlist)
            return
        }

        const start = tierlist.rows[source.droppableId]
        const finish = tierlist.rows[destination.droppableId]

        // If the column is the same
        if (start === finish) {
            const newItemsList = [...start.items] // Clone Items
            // Reorder in the new index
            newItemsList.splice(source.index, 1)
            newItemsList.splice(destination.index, 0, draggableId)
            // Substitute the previous row with the changed index row using spread operator
            const newRow = {
                ...start,
                items: newItemsList,
            }
            // Substitute the previous tieerlist with the changed row
            const newTierlist = {
                ...tierlist,
                rows: {
                    ...tierlist.rows,
                    [newRow.id]: newRow,
                },
            }
            setTierlist(newTierlist)
        } else {
            const startItems = [...start.items]
            startItems.splice(source.index, 1) // Delete from the source row
            // Create a new row with the changes made
            const newStart = {
                ...start,
                items: startItems,
            }
            const finishItems = [...finish.items]
            finishItems.splice(destination.index, 0, draggableId) // Add to the destination row

            // Create a new row with the changes made
            const newFinish = {
                ...finish,
                items: finishItems,
            }

            const newTierlist = {
                ...tierlist,
                rows: {
                    ...tierlist.rows,
                    [newStart.id]: newStart,
                    [newFinish.id]: newFinish,
                },
            }
            setTierlist(newTierlist)
        }
    }

    return (
        <TierlistContext.Provider value={{ tierlist, setTierlist }}>
            <TierlistContainer ref={tierlistContainer}>
                <DragDropContext onDragEnd={onDragEnd}>
                    <Droppable
                        droppableId="all-rows"
                        type="row"
                        direction="vertical"
                    >
                        {(provided) => (
                            <div
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                            >
                                {tierlist.rowOrder.map((rowId, index) => {
                                    if (rowId == "carrousel") return
                                    const row = tierlist.rows[rowId]
                                    const items = row.items.map(
                                        (item) => tierlist.items[item]
                                    )
                                    return (
                                        <Row
                                            row={row}
                                            key={row.id}
                                            items={items}
                                            index={index}
                                        ></Row>
                                    )
                                })}
                                {provided.placeholder}
                                <ItemsCarrrousel />
                            </div>
                        )}
                    </Droppable>
                </DragDropContext>
                <AddRow />
                {/* <AddItem /> */}
                <DropFile />
                <Screenshot target={tierlistContainer} />
            </TierlistContainer>
        </TierlistContext.Provider>
    )
}
