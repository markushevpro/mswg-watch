import { useScreens } from '/src/@/services/screens'
import { Center }     from '/src/@/shared/ui-kit/Center'
import { Container }  from '/src/@/shared/ui-kit/Container'

import type { PropsWithChildren } from 'react'

export
function ScreensContainer
({ children }: PropsWithChildren )
{
    const { style } = useScreens()

    return (
        <Center>
            <Container style={style}>
                { children }
            </Container>
        </Center>
    )
}
