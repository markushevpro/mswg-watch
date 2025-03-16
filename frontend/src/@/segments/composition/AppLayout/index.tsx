import { useCallback }                from 'react'
import { Header, Content, Container } from 'rsuite'

import { CloseButton }  from '/src/@/segments/features/CloseButton'
import { ReloadButton } from '/src/@/segments/features/RestartButton'

import type { PropsWithChildren } from 'react'

import styles from './app-layout.module.css'

export
function AppLayout
({ children }: PropsWithChildren )
{
    const maximize = useCallback(
        () => {
            // @ts-expect-error undefined
            runtime.WindowToggleMaximise()
        },
        []
    )

    return (
        <main className={styles.pageContainer}>
            <Container>
                <Header className={styles.header} onDoubleClick={maximize}>
                    MultiScreens Wallpaper Generator
                    <ReloadButton />
                    <CloseButton />
                </Header>

                <Content>
                    { children }
                </Content>
            </Container>
        </main>
    )
}
