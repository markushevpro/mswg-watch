import { ScreenView } from '/src/@/segments/composition/ScreenView'
import { useScreens } from '/src/@/services/screens'

import type { Screen } from '/src/@/services/screens'

import { EDITOR_PADDING } from './consts'

export
function ScreensList
()
{
    const { fixed } = useScreens()

    if ( !fixed ) {
        return null
    }

    return (
        <>
            {
                fixed.map(( screen: Screen ) => (
                    <ScreenView
                        key={screen.label}
                        offset={EDITOR_PADDING}
                        screen={screen}
                    />
                ))
            }
        </>
    )
}
