import React, { useContext } from "react"

import { TierlistContext } from "./Tierlist"

export default function AddItem() {
    const { tierlist, setTierlist } = useContext(TierlistContext)

    const addItem = () => {
        const itemName = `new${new Date().getTime()}`
        const newTierlist = { ...tierlist }
        newTierlist.items[itemName] = { id: itemName, content: "new" }
        newTierlist.rows.carrousel.items.push(itemName)

        setTierlist(newTierlist)
    }
    return <button onClick={addItem}>Add item</button>
}
