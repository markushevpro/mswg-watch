import { types } from '/wailsjs/go/models'

import { create } from 'zustand'

import type { Screen, ScreensLayout, SystemScreensState } from '/src/@/services/screens'
import type { CSSProperties }                             from 'react'


interface IScreensStoreData
    extends
    SystemScreensState
{
    known: types.Screen[] | undefined
    fixed: Screen[] | undefined
    layout: ScreensLayout | undefined
    style: CSSProperties | undefined
}

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
    known:   undefined,

    update: ( payload: Partial<IScreensStoreData> ) => {
        set({ ...payload })
    }
}))
