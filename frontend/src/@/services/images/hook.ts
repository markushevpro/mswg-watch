'use client'

import { useCallback, useEffect } from 'react'

import { useHookResult } from '/src/@/shared/hooks/useHookResult'
import { GetImages }     from '/wailsjs/go/main/App'

import type { TImageData, TImages } from './types'

import { useImagesStore } from './store'

interface HImages
{
    images: TImages
    update: ( label: string ) => ( image: TImageData ) => void
}

export
function useImages
(): HImages
{
    const { images, update: updateStore } = useImagesStore()

    const update = useCallback(
        ( id: string ) => ( image: TImageData ) => {
            const updated = { ...images }
            updated[ id ] = image
            updateStore({ images: updated })
        },
        [ images, updateStore ]
    )

    const preloadImages = useCallback(
        async () => {
            const list    = await GetImages()
            const updated = { ...images }

            list.forEach(({ filename, data }) => {
                const id = filename.split( '.' )[ 0 ]

                if ( id ) {
                    updated[ id ] = data
                }
            })
            updateStore({ images: updated })
        },
        [ images, updateStore ]
    )

    useEffect(
        () => {
            void preloadImages()
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        []
    )

    return useHookResult({
        images,
        update
    })
}
