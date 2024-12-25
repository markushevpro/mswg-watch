import cn from 'classnames'

import type { CSSProperties, PropsWithChildren } from 'react'


import styles from './container.module.css'

interface PContainer
    extends
    PropsWithChildren
{
    className?: string
    style?: CSSProperties
}

export
function Container
({ children, className, style }: PContainer )
{
    return (
        <div className={cn( styles.container, className )} style={style}>
            { children }
        </div>
    )
}
