import { Button } from 'rsuite'

import { Center } from '/src/@/shared/ui-kit/Center'

interface PErrorScreen
{
    title: string
    text?: string
    button?: string
    action?: () => void
}

export
function ErrorScreen
({ title, text, button, action }: PErrorScreen )
{
    return (
        <Center>
            <h1>{ title }</h1>

            {
                text && (
                    <p>{ text }</p>
                )
            }

            {
                ( button && action ) && (
                    <>
                        <br />

                        <Button appearance="primary" onClick={action}>
                            { button }
                        </Button>
                    </>
                )
            }
        </Center>
    )
}
