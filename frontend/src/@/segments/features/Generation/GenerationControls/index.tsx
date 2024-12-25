import { Close }      from '@rsuite/icons'
import { IconButton } from 'rsuite'

import { useGeneration }   from '/src/@/services/generation'
import { BottomButton }    from '/src/@/shared/ui-kit/BottomButton'
import { FloatingButtons } from '/src/@/shared/ui-kit/FloatingButtons'
import { LoadingOverlay }  from '/src/@/shared/ui-kit/LoadingOverlay'

import styles from './generation-controls.module.css'

export
function GenerationControls
()
{
    const { done, loading, download, stop } = useGeneration()

    if ( !done ) {
        return (
            <LoadingOverlay className={styles.overlay} />
        )
    }

    return (
        <>
            <BottomButton loading={loading} onClick={download}>
                Download
            </BottomButton>

            <FloatingButtons>
                <IconButton icon={<Close />} onClick={stop} />
            </FloatingButtons>
        </>
    )
}
