import { CreateWallpaperFlow } from '/src/@/flows/CreateWallpaper'
import { AppLayout }           from '/src/@/segments/composition/AppLayout'

export
function HomePage
()
{
    return (
        <AppLayout>
            <CreateWallpaperFlow />
        </AppLayout>
    )
}
