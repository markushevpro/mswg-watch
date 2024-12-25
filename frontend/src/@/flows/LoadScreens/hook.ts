import { useCallback, useEffect, useMemo } from 'react'
import { useInterval, useWindowSize }      from 'usehooks-ts'

import { appendID, calculateScreensLayout, fixScreenOffsetMap, useScreens } from '/src/@/services/screens'
import { useHookResult }                                                    from '/src/@/shared/hooks/useHookResult'

import { getErrorText } from './helpers'

interface HLoadScreensFlow
{
    loading: boolean
    error: string | null
    canRequest: boolean
    request: () => void
}

export
function useLoadScreensFlow
(): HLoadScreensFlow
{
    const size = useWindowSize()

    const { denied, error, loading, available, screens, known, update, retry, refresh } = useScreens()

    const canRequest = useMemo(() => available && !denied, [ available, denied ])
    const errorText  = useMemo(() => error ? getErrorText( available, denied ) : null, [ available, denied, error ])

    const request = useCallback(
        () => {
            if ( typeof window !== 'undefined' ) {
                void retry()
            }
        },
        [ retry ]
    )

    const updateFixed = useCallback(
        (): void => {
            if ( screens ) {
                const data = calculateScreensLayout([].slice.call( screens ), size )

                update({
                    layout: data,
                    fixed:  screens.map( fixScreenOffsetMap( data.left, data.top )).map( appendID ),
                    style:  {
                        width:  data.width / data.zoom,
                        height: data.height / data.zoom
                    }
                })
            }
        },
        [ screens, size, update ]
    )

    useEffect(
        () => {
            updateFixed()
        },
        [ updateFixed ]
    )

    useEffect(
        () => {
            void retry()
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        []
    )

    useInterval(
        () => {
            void refresh()
        },
        5000
    )

    return useHookResult({
        loading: loading || !known,
        error:   errorText,
        canRequest,
        request
    })
}
