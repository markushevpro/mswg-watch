'use client'

import { useEffect, useMemo } from 'react'
import { useWindowSize }      from 'usehooks-ts'

import { useHookResult } from '/src/@/shared/hooks/useHookResult'

import type { ScreensStore }  from './store'
import type { CSSProperties } from 'react'

import {  fixScreens, getSID, getZoom } from './helpers'
import { useScreensStore }              from './store'

interface HScreens
    extends
    Pick<ScreensStore, 'screens' | 'fixed' | 'layout' | 'update'>
{
    sid: string
    zoom: number
    style: CSSProperties
}

export
function useScreens
(): HScreens
{
    const size = useWindowSize()

    const { screens, fixed, layout, update } = useScreensStore()

    const sid = useMemo(
        () => getSID( fixed ),
        [ fixed ]
    )

    const zoom = useMemo(
        () => layout ? getZoom( layout, size ) : 1,
        [ layout, size ]
    )

    const style: CSSProperties = useMemo(
        () => (
            layout
                ? {
                    width:  layout.width / zoom,
                    height: layout.height / zoom
                }
                : {}
        ),
        [ layout, zoom ]
    )

    useEffect(
        () => {
            if ( screens ) {
                update( fixScreens( screens ))
            }
        },
        [ screens, update ]
    )

    return useHookResult({
        sid,
        layout,
        fixed,
        screens,
        zoom,
        style,
        update
    })
}
