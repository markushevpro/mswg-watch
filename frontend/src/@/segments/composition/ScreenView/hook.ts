import { useCallback, useMemo } from 'react'

import { useImages }         from '/src/@/services/images'
import { getID, useScreens } from '/src/@/services/screens'
import { useHookResult }     from '/src/@/shared/hooks/useHookResult'
import { SetImage }          from '/wailsjs/go/main/App'

import type { TImageData }    from '/src/@/services/images'
import type { Screen }        from '/src/@/services/screens'
import type { CSSProperties } from 'react'

import { getScreenStyle } from './helpers'

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
    const { zoom }                        = useScreens()
    const { images, update: updateImage } = useImages()

    const image = useMemo(
        () => images?.[ screen.id ?? screen.label ],
        [ images, screen.id, screen.label ]
    )

    const style = useMemo(
        () => getScreenStyle( screen, zoom, offset ),
        [ screen, zoom, offset ]
    )

    const update = useCallback(
        ( data: TImageData ) => {
            updateImage( screen.id ?? screen.label )( data )
            void SetImage( getID( screen ), data ?? '' )
        },
        [ screen, updateImage ]
    )

    return useHookResult({
        style,
        image,
        update
    })
}
