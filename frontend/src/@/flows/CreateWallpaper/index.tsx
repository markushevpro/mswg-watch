'use client'

import { GenerateWallpaperFlow } from '/src/@/flows/GenerateWallpaper'
import { UpdateImagesFlow }      from '/src/@/flows/UpdateImages'
import { Center }                from '/src/@/shared/ui-kit/Center'

export
function CreateWallpaperFlow
()
{
    return (
        <Center>
            <UpdateImagesFlow>
                <GenerateWallpaperFlow />
            </UpdateImagesFlow>
        </Center>
    )
}
