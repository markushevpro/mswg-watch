import { create } from 'zustand'

import type { Screen, ScreensLayout, SystemScreensState } from '/src/@/services/screens'
import type { CSSProperties }                             from 'react'

export
interface IScreensStoreBase
{
    fixed: Screen[] | undefined
    layout: ScreensLayout | undefined
}

export
interface IScreensStoreFront
{
    style: CSSProperties | undefined
}

export
interface IScreensStoreCalculated
extends
IScreensStoreBase,
IScreensStoreFront
{}

interface IScreensStoreData
    extends
    SystemScreensState,
    IScreensStoreCalculated
{}

interface IScreensStoreActions
{
    update: ( payload: Partial<IScreensStoreData> ) => void
}

export
type IScreensStore = IScreensStoreData & IScreensStoreActions

export
const useScreensStore = create<IScreensStore>(( set ) => ({
    loading: true,
    error:   false,
    denied:  false,
    screens: undefined,
    fixed:   undefined,
    layout:  undefined,
    style:   undefined,
    details: undefined,

    update: ( payload: Partial<IScreensStoreData> ) => {
        set({ ...payload })
    }
}))
