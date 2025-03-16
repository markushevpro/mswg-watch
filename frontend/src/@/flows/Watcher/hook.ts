/* eslint-disable @typescript-eslint/no-misused-promises */
import { useCallback, useEffect, useState } from 'react'
import { useDebounceCallback }              from 'usehooks-ts'

import { generateAndUpdate, useGeneration } from '/src/@/services/generation'
import { useImages }                        from '/src/@/services/images'
import { fixScreens, getSID }               from '/src/@/services/screens'
import { useScreensStore }                  from '/src/@/services/screens/store'
import { digest }                           from '/src/@/shared/utils/hash'
import { IsWallpaperExist, SetWallpaper }   from '/wailsjs/go/main/App'

import type { GetScreenDetails, Screen, ScreensLayout } from '/src/@/services/screens'

export
function useWatcherFlow
()
{    
    const { images }  = useImages()
    const { details } = useScreensStore()
    const { ref }     = useGeneration()

    const [ known, $known ] = useState<string>( '' )

    const regenerate = useCallback(
        async ( sid: string, layout?: ScreensLayout, screens?: Screen[]) => {
            const file  = await digest( sid ) + '.png'
            const exist = await IsWallpaperExist( file )

            if ( !exist ) {
                await generateAndUpdate( sid, ref.current, images, layout, screens )
            } else {
                await SetWallpaper( file )
            }
        },
        [ images, ref ]
    )

    const handler = useDebounceCallback(
        useCallback(
            async ( e: unknown ) => {
                const { screens } = ( e as { target: GetScreenDetails }).target

                if ( screens ) {
                    const { fixed, layout } = fixScreens( screens )
                    const sid               = getSID( fixed )

                    if ( sid !== known ) {
                        await regenerate( sid, layout, fixed )
                        $known( sid )
                        window.location.reload()
                    }
                }
            },
            [ known, regenerate ]
        ),
        1000
    )

    useEffect(
        () => {
            if ( details ) {
                details.addEventListener( 'screenschange', handler )

                return () => {
                    details.removeEventListener( 'screenschange', handler )
                }
            }
        },
        [ details, handler ]
    )
}