'use client'

import { useCallback, useEffect } from 'react'

import { useImages }     from '/src/@/services/images'
import { useScreens }    from '/src/@/services/screens'
import { downloadFile }  from '/src/@/services/system'
import { useHookResult } from '/src/@/shared/hooks/useHookResult'

import type { IGenerationStore } from './store'
import type { RefObject }        from 'react'

import { clearScreen, drawImage } from './helpers'
import { useGenerationStore }     from './store'

interface HGeneration
    extends
    IGenerationStore
{
    ref: RefObject<HTMLCanvasElement>
    redraw: () => void
    download: (() => void ) | undefined
    stop: () => void
}

export
function useGeneration
(): HGeneration
{
    const { images }        = useImages()
    const { layout, fixed } = useScreens()

    const { ref, loading, update, ...rest } = useGenerationStore()

    const redraw = useCallback(
        async (): Promise<void> => {
            if ( layout && fixed && images && ref.current ) {
                update({ done: false })

                const ctx = ref.current.getContext( '2d' )

                if ( ctx ) {
                    clearScreen( ctx, layout )

                    for ( let i = 0; i < ( fixed?.length ?? 0 ); i++ ) {
                        const screen = fixed?.[ i ]
                        if ( screen && images[ screen.label ]) {
                            await drawImage( ctx, screen, images[ screen.label ] as string )
                        }
                    }

                    update({ done: true })
                }
            }
        },
        [ layout, fixed, images, ref, update ]
    )

    const startRedraw = useCallback(
        (): void => {
            void redraw()
        },
        [ redraw ]
    )

    const handleDownload = useCallback(
        (): void => {
            if ( ref.current ) {
                update({ loading: true })

                setTimeout(() => {
                    if ( ref.current ) {
                        downloadFile( ref.current.toDataURL(), 'mswg-wallpaper.png' )
                    }
                }, 0 )

                setTimeout(() => { update({ loading: false }) }, 1000 )
            }
        },
        [ ref, update ]
    )

    const stop = useCallback(
        () => {
            update({ active: false })
        },
        [ update ]
    )

    useEffect(() => {
        void redraw()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return useHookResult({
        ...rest,
        loading,
        ref,
        update,
        redraw:   startRedraw,
        download: loading ? undefined : handleDownload,
        stop
    })
}
