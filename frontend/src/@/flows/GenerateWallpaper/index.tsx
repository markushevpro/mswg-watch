import { Generation }   from '/src/@/segments/features/Generation'
import { BottomButton } from '/src/@/shared/ui-kit/BottomButton'
import { Container }    from '/src/@/shared/ui-kit/Container'

import styles                       from './generate-flow.module.css'
import { useGenerateWallpaperFlow } from './hook'

export
function GenerateWallpaperFlow
()
{
    const { ready, active, run } = useGenerateWallpaperFlow()

    if ( !ready ) {
        return null
    }

    if ( !active ) {
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
