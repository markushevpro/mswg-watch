import { useCallback, useEffect, useMemo } from 'react'

import { useHookResult } from '/src/@/shared/hooks/useHookResult'

import type { ScreensStore } from './store'

import { getSystemScreens } from './helpers'
import { useScreensStore }  from './store'

interface HScreensLoader
    extends
    Pick<ScreensStore, 'denied' | 'error' | 'loading' | 'details'>
{
    available: boolean
    canRequest: boolean
    load: () => Promise<void>
    request: () => void
}

export
function useScreensLoader
(): HScreensLoader
{
    const { details, denied, error, loading, update } = useScreensStore()

    const available = useMemo(
        () => typeof window !== 'undefined' && !!window.getScreenDetails,
        []
    )

    const canRequest = useMemo(
        () => available && !denied,
        [ available, denied ]
    )

    const load = useCallback(
        async () => {
            update({
                loading: true,
                error:   false
            })

            const res = await getSystemScreens()

            update({
                ...res,
                loading: false
            })
        },
        [ update ]
    )

    const request = useCallback(
        () => {
            if ( typeof window !== 'undefined' ) {
                void load()
            }
        },
        [ load ]
    )

    useEffect(
        () => {
            void load()
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        []
    )

    return useHookResult({
        details,
        available,
        denied,
        loading,
        error,
        canRequest,
        load,
        request
    })
}
