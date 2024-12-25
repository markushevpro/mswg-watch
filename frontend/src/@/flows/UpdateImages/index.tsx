import { LoadScreensFlow }  from '/src/@/flows/LoadScreens'
import { ScreensScreen }    from '/src/@/screens/Screens'
import { ScreensContainer } from '/src/@/segments/composition/ScreensContainer'

import type { PropsWithChildren } from 'react'

export
function UpdateImagesFlow
({ children }: PropsWithChildren )
{
    return (
        <LoadScreensFlow>
            <ScreensContainer>
                <ScreensScreen />
                { children }
            </ScreensContainer>
        </LoadScreensFlow>
    )
}
