import { useCallback, useMemo } from 'react'

import { useGeneration } from '/src/@/services/generation'
import { useScreens }    from '/src/@/services/screens'
import { useHookResult } from '/src/@/shared/hooks/useHookResult'

interface HGenerateWallpaperFlow
{
    loaded: boolean
    ready: boolean
    run: () => void
}

export
function useGenerateWallpaperFlow
(): HGenerateWallpaperFlow
{
    const { ready, update } = useGeneration()
    const { layout, fixed } = useScreens()

    const loaded = useMemo(
        () => !!( layout && fixed ), 
        [ fixed, layout ]
    )

    const run = useCallback(
        () => {
            update({ ready: true })
        },
        [ update ]
    )

    return useHookResult({
        loaded,
        ready,
        run
    })
}
