import { create } from 'zustand'

import type { Screen, ScreensLayout, SystemScreensState } from '/src/@/services/screens'
import type { CSSProperties }                             from 'react'

export
interface ScreensStoreBase
{
    fixed: Screen[] | undefined
    layout: ScreensLayout | undefined
}

export
interface ScreensStoreFront
{
    style: CSSProperties | undefined
}

export
interface ScreensStoreCalculated
    extends
    ScreensStoreBase,
    ScreensStoreFront
{}

interface ScreensStoreData
    extends
    SystemScreensState,
    ScreensStoreCalculated
{}

interface ScreensStoreActions
{
    update: ( payload: Partial<ScreensStoreData> ) => void
}

export
type ScreensStore = ScreensStoreData & ScreensStoreActions

export
const useScreensStore = create<ScreensStore>(( set ) => ({
    loading: true,
    error:   false,
    denied:  false,
    screens: undefined,
    fixed:   undefined,
    layout:  undefined,
    style:   undefined,
    details: undefined,

    update: ( payload: Partial<ScreensStoreData> ) => {
        set({ ...payload })
    }
}))
