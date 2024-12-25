'use client'

import { useCallback, useEffect } from 'react'

import { GetKnownScreens, UpdateScreens } from '/wailsjs/go/main/App'

import type { IScreensStore } from './store'

import { convertScreen, getSystemScreens } from './helpers'
import { useScreensStore }                 from './store'


interface HScreens
    extends
    IScreensStore
{
    available: boolean
    refresh: () => Promise<void>
    retry: () => Promise<void>
}

export
function useScreens
(): HScreens
{
    const { known, screens, update, ...rest } = useScreensStore()

    const getScreens = useCallback(
        async (): Promise<void> => {
            update({
                loading: true,
                error:   false
            })

            const res = await getSystemScreens()

            update( res )
        },
        [ update ]
    )

    const refresh = useCallback(
        async () => {
            if ( screens && known ) {
                const current = screens.map( convertScreen )
                UpdateScreens( current )
            }
        },
        [ screens, known ]
    )

    const onStartup = useCallback(
        async () => {
            const known = await GetKnownScreens()
            update({ known })
        },
        [ update ]
    )

    useEffect(
        () => {
            void onStartup()
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        []
    )

    return {
        ...rest,
        screens,
        known,
        update,
        refresh,
        available: typeof window !== 'undefined' && !!window.getScreenDetails,
        retry:     getScreens
    }
}
