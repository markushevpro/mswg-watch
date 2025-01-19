
import { createRef } from 'react'
import { create }    from 'zustand'

import type { MutableRefObject } from 'react'

interface IGenerationStoreData
{
    ref: MutableRefObject<HTMLCanvasElement | null>
    working: boolean
    ready: boolean
}

interface IGenerationStoreActions
{
    update: ( payload: Partial<IGenerationStoreData> ) => void
}

export
type IGenerationStore = IGenerationStoreData & IGenerationStoreActions

export
const useGenerationStore = create<IGenerationStore>(( set ) => ({
    working: false,
    ready:   false,
    ref:     createRef<HTMLCanvasElement>(),

    update: ( payload: Partial<IGenerationStoreData> ) => {
        set({ ...payload })
    }
}))
