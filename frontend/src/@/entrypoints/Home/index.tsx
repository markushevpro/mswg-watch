import { UpdateImagesFlow } from '/src/@/flows/UpdateImages'
import { LoadScreensFlow }  from '/src/@/flows/LoadScreens'
import { WatcherFlow }      from '/src/@/flows/Watcher'
import { AppLayout }        from '/src/@/segments/composition/AppLayout'

export
function HomePage
()
{
    return (
        <AppLayout>
            <LoadScreensFlow>
                <UpdateImagesFlow />
                <WatcherFlow />
            </LoadScreensFlow>
        </AppLayout>
    )
}
