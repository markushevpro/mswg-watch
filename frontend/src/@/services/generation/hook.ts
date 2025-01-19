'use client'

import { useCallback } from 'react'

import { useImages }     from '/src/@/services/images'
import { useScreens }    from '/src/@/services/screens'
import { useHookResult } from '/src/@/shared/hooks/useHookResult'

import type { IGenerationStore } from './store'
import type { RefObject }        from 'react'

import { generateAndUpdate }  from './helpers'
import { useGenerationStore } from './store'

interface HGeneration
    extends
    IGenerationStore
{
    ref: RefObject<HTMLCanvasElement>
    generate: () => void
}

export
function useGeneration
(): HGeneration
{
    const { images }             = useImages()
    const { sid, layout, fixed } = useScreens()

    const { ref, working, update, ready } = useGenerationStore()


    const generate = useCallback(
        async (): Promise<void> => {
            update({
                ready:   false,
                working: true
            })

            await generateAndUpdate( sid, ref.current, images, layout, fixed )
        },
        [ update, layout, fixed, ref, images, sid ]
    )

    return useHookResult({
        ready,
        working,
        ref,
        update,
        generate
    })
}
