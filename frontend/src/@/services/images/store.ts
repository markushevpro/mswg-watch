import { create } from 'zustand'

import type { TImages } from './types'

interface ImagesStoreData
{
    images: TImages
}

interface ImagesStoreActions
{
    update: ( payload: Partial<ImagesStoreData> ) => void
}

export
type ImagesStore = ImagesStoreData & ImagesStoreActions

export
const useImagesStore = create<ImagesStore>(( set ) => ({
    images: {},

    update: ( payload: Partial<ImagesStoreData> ) => {
        set({ ...payload })
    }
}))
