import { ScreensList } from '/src/@/segments/composition/ScreensList'
import { useScreens }  from '/src/@/services/screens'

export
function ScreensScreen
()
{
    const { layout } = useScreens()

    if ( !layout ) {
        return (
            <>Calculating sizes...</>
        )
    }

    return (
        <ScreensList />
    )
}
