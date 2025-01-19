import { Generation }   from '/src/@/segments/features/Generation'
import { BottomButton } from '/src/@/shared/ui-kit/BottomButton'
import { Container }    from '/src/@/shared/ui-kit/Container'

import styles                       from './generate-flow.module.css'
import { useGenerateWallpaperFlow } from './hook'

export
function GenerateWallpaperFlow
()
{
    const { loaded, ready, run } = useGenerateWallpaperFlow()

    if ( !loaded ) {
        return null
    }

    if ( !ready ) {
        return (
            <BottomButton onClick={run}>
                Generate
            </BottomButton>
        )
    }

    return (
        <Container className={styles.overlay}>
            <Generation />
        </Container>
    )
}
