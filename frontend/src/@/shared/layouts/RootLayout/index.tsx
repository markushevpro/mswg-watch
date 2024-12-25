import 'rsuite/dist/rsuite.min.css'

import '/src/@/shared/styles/globals.css'

import type { ReactNode } from 'react'

interface PRootLayout
{
    children: ReactNode
}

export
function RootLayout
({ children }: Readonly<PRootLayout> )
{
    return (
        <>
            { children }
        </>
    )
}
