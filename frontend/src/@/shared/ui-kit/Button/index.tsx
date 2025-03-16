import { Loader, Button as RButton } from 'rsuite'

import type { ButtonProps } from 'rsuite'

interface PButton
    extends
    ButtonProps
{
    loading?: boolean
}

export
function Button
({ loading, children, ...rest }: PButton )
{
    return (
        <RButton {...rest}>
            {
                loading
                    ? <Loader />
                    : children
            }
        </RButton>
    )
}
