import React, { useState, useContext, memo } from "react"
import ClickAwayListener from "react-click-away-listener"
import { TierlistContext } from "./Tierlist"

export default memo(function RowTitle({ row }) {
    const [toggle, setToggle] = useState(true)
    const [title, setTitle] = useState(row.title)

    const { tierlist, setTierlist } = useContext(TierlistContext)

    const nameChangeHandler = () => {
        if (toggle) return
        setToggle(true)
        const newTierlist = { ...tierlist }
        newTierlist.rows[row.id].title = title
        setTierlist(newTierlist)
    }

    return (
        <ClickAwayListener onClickAway={nameChangeHandler}>
            {toggle ? (
                <p
                    onDoubleClick={() => {
                        setToggle(false)
                    }}
                >
                    {title}
                </p>
            ) : (
                <textarea
                    type="text"
                    value={title}
                    onChange={(event) => {
                        setTitle(event.target.value)
                    }}
                    onKeyDown={(event) => {
                        if (event.key === "Enter" || event.key === "Escape") {
                            setToggle(true)
                            event.preventDefault()
                            event.stopPropagation()
                        }
                    }}
                />
            )}
        </ClickAwayListener>
    )
})
