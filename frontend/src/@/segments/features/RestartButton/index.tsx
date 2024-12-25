import { useCallback } from 'react'

import { Button }  from '/src/@/shared/ui-kit/Button'
import { Restart } from '/wailsjs/go/main/App'

import styles from './reload-button.module.css'

export
function ReloadButton
()
{

    const reloadApp = useCallback(
        () => {
            Restart()
        },
        []
    )

    return (
        <Button
            className={styles.close}
            onClick={reloadApp}
        >
            ×
        </Button>
    )
}
