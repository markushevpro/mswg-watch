import { useCallback } from 'react'

import { Button } from '/src/@/shared/ui-kit/Button'

import styles from './close-button.module.css'

export
function CloseButton
()
{
    const closeApp = useCallback(
        () => {
            // @ts-expect-error undefined
            runtime.WindowHide()
        },
        []
    )

    return (
        <Button
            className={styles.close}
            onClick={closeApp}
        >
            ×
        </Button>
    )
}
