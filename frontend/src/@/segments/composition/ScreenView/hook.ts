
import { useCallback, useMemo } from 'react'

import { useImages }                 from '/src/@/services/images'
import { convertScreen, useScreens } from '/src/@/services/screens'
import { useHookResult }             from '/src/@/shared/hooks/useHookResult'

import type { TImageData }    from '/src/@/services/images'
import type { Screen }        from '/src/@/services/screens'
import type { CSSProperties } from 'react'

import { getScreenStyle } from './helpers'

import { SetImage } from '/wailsjs/go/main/App'

interface HScreenView
{
    style: CSSProperties
    image: TImageData | undefined
    update: ( data: TImageData ) => void
}

export
function useScreenView
( screen: Screen, offset: number ): HScreenView
{
    const { layout }                      = useScreens()
    const { images, update: updateImage } = useImages()

    const zoom  = useMemo(() => layout?.zoom ?? 1, [ layout?.zoom ])
    const image = useMemo(() => images?.[ screen.id ?? screen.label ], [ images, screen.id, screen.label ])
    const style = useMemo(() => getScreenStyle( screen, zoom, offset ), [ screen, zoom, offset ])

    console.log({
        images,
        id: screen.id,
        image
    })

    const update = useCallback(
        ( data: TImageData ) => {
            updateImage( screen.id ?? screen.label )( data )
            SetImage( convertScreen( screen ).id, data ?? '' )
        },
        [ screen, updateImage ]
    )

    return useHookResult({
        style,
        image,
        update
    })
}
