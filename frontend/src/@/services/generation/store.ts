import { createRef } from 'react'
import { create }    from 'zustand'

import type { MutableRefObject } from 'react'

interface GenerationStoreData
{
    ref: MutableRefObject<HTMLCanvasElement | null>
    working: boolean
    ready: boolean
}

interface GenerationStoreActions
{
    update: ( payload: Partial<GenerationStoreData> ) => void
}

export
type GenerationStore = GenerationStoreData & GenerationStoreActions

export
const useGenerationStore = create<GenerationStore>(( set ) => ({
    working: false,
    ready:   false,
    ref:     createRef<HTMLCanvasElement>(),

    update: ( payload: Partial<GenerationStoreData> ) => {
        set({ ...payload })
    }
}))
