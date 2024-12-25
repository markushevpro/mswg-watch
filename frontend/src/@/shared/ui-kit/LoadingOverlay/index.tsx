import { Loader } from 'rsuite'

import { Center } from '/src/@/shared/ui-kit/Center'

interface PLoadingOverlay
{
    className?: string
}

export
function LoadingOverlay
({ className }: PLoadingOverlay )
{
    return (
        <Center className={className}>
            <noscript>You need to enable JavaScript to use this app.</noscript>
            <Loader />
        </Center>
    )
}
