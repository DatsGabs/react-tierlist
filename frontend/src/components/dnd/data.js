const data = {
    items: {
        "item-1": { id: "item-1", content: "item 1" },
        "item-2": { id: "item-2", content: "item 2" },
        "item-3": { id: "item-3", content: "item 3" },
    },
    rows: {
        s: {
            id: "s",
            title: "S",
            items: [],
            color: "#F27778",
        },
        a: {
            id: "a",
            title: "A",
            items: [],
            color: "#FFBF7E",
        },
        b: {
            id: "b",
            title: "B",
            items: [],
            color: "#FFFF7F",
        },
        c: {
            id: "c",
            title: "C",
            items: [],
            color: "#7FFF7F",
        },
        d: {
            id: "d",
            title: "D",
            items: [],
            color: "#7FBFFF",
        },
        carrousel: {
            id: "carrousel",
            title: "Carrousel",
            items: ["item-1", "item-2", "item-3"],
        },
    },
    rowOrder: ["s", "a", "b", "c", "d", "carrousel"],
}

export default data
