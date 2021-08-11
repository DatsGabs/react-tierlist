import React, { useEffect } from "react"
import html2canvas from "html2canvas"

export default function Screenshot({ target }) {
    useEffect(() => {
        console.log(target)
    }, [target])

    function debugBase64(base64URL) {
        var win = window.open()
        win.document.write(
            '<iframe src="' +
                base64URL +
                '" frameborder="0" style="border:0; top:0px; left:0px; bottom:0px; right:0px; width:100%; height:100%;" allowfullscreen></iframe>'
        )
    }

    const capture = () => {
        html2canvas(target.current).then((canvas) => {
            const base64image = canvas.toDataURL("image/png")
            debugBase64(base64image)
        })
    }

    return <button onClick={capture}>Take Screenshot</button>
}
