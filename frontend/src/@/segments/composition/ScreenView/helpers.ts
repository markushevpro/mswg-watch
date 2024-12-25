import type { Screen }        from '/src/@/services/screens'
import type { CSSProperties } from 'react'

export
function getScreenStyle
( screen: Screen, zoom: number, offset: number ): CSSProperties
{
    return {
        left:   screen.left / zoom + offset,
        top:    screen.top / zoom + offset,
        width:  ( screen.width * screen.devicePixelRatio ) / zoom,
        height: ( screen.height * screen.devicePixelRatio ) / zoom
    }
}
