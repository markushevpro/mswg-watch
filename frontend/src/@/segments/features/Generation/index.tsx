import { Center } from '/src/@/shared/ui-kit/Center'

import { GenerationCanvas }   from './GenerationCanvas'
import { GenerationControls } from './GenerationControls'

export
function Generation
()
{
    return (
        <Center>
            <GenerationCanvas />
            <GenerationControls />
        </Center>
    )
}
