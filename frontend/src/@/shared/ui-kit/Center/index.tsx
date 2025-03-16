import cn from 'classnames'

import type { PropsWithChildren } from 'react'

import styles from './center.module.css'

interface PCenter
    extends
    PropsWithChildren
{
    className?: string
}

export
function Center
({ children, className }: PCenter )
{
    return (
        <div className={cn( styles.center, className )}>
            { children }
        </div>
    )
}
