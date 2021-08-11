import React, { useContext } from "react"
import { TierlistContext } from "./Tierlist"

export default function AddRow() {
    const { tierlist, setTierlist } = useContext(TierlistContext)

    const addRows = () => {
        const newTierlist = { ...tierlist }
        const rowName = `new${new Date().getTime()}`
        newTierlist.rows[rowName] = {
            id: rowName,
            title: "new",
            items: [],
            color: "red",
        }
        newTierlist.rowOrder = [...newTierlist.rowOrder, rowName]
        setTierlist(newTierlist)
    }
    return <button onClick={() => addRows()}>Add another row</button>
}
