import React, { useContext } from "react"

import { TierlistContext } from "./Tierlist"

export default function DropFile() {
    const { tierlist, setTierlist } = useContext(TierlistContext)

    let fileReader

    const handleFileRead = (e) => {
        const content = fileReader.result
        const names = content.split("\n")

        let newTierlist = { ...tierlist }

        for (const name of names) {
            if (name == "") {
                continue
            }
            newTierlist.items[name] = { id: name, content: name }
            newTierlist.rows.carrousel.items.push(name)
        }

        setTierlist(newTierlist)
    }

    const handleFileChosen = (e) => {
        const file = e.target.files[0]
        fileReader = new FileReader()
        fileReader.onloadend = handleFileRead
        fileReader.readAsText(file)
    }

    return (
        <input
            type="file"
            id="file"
            className="input-file"
            accept=".txt"
            onChange={handleFileChosen}
        />
    )
}
