
import cn from 'classnames'

import { Button } from '/src/@/shared/ui-kit/Button'

import type { ComponentProps } from 'react'

import styles from './bottom-button.module.css'

export
function BottomButton
({ className, children, ...props }: ComponentProps<typeof Button> )
{
    return (
        <Button appearance='primary' {...props} className={cn( className, styles.button )}>
            { children }
        </Button>
    )
}
