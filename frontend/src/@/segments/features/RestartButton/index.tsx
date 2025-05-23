import { Reload }      from '@rsuite/icons'
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
            void Restart()
        },
        []
    )

    return (
        <Button
            className={styles.reload}
            onClick={reloadApp}
        >
            <Reload />
        </Button>
    )
}
