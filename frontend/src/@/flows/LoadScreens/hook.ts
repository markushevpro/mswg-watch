import { useMemo } from 'react'

import { useScreens }       from '/src/@/services/screens'
import { useScreensLoader } from '/src/@/services/screens/loader'
import { useHookResult }    from '/src/@/shared/hooks/useHookResult'

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
    const { screens } = useScreens()

    const { available, denied, error, loading, request, canRequest } = useScreensLoader()

    const errorText = useMemo(
        () => error ? getErrorText( available, denied ) : null, 
        [ available, denied, error ]
    )

    return useHookResult({
        loading: loading || ( !screens && !error ),
        error:   errorText,
        canRequest,
        request
    })
}
