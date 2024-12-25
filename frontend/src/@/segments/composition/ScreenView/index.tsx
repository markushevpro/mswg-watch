import { ImageUploader } from '/src/@/segments/features/ImageUploader'

import type { Screen } from '/src/@/services/screens'


import { useScreenView } from './hook'
import styles            from './screen.module.css'

interface PScreenView
{
    screen: Screen
    offset: number
}

export
function ScreenView
({ screen, offset }: PScreenView )
{
    const { style, image, update } = useScreenView( screen, offset )

    return (
        <div className={styles.screen} style={style}>
            <ImageUploader data={image} onChange={update} />
        </div>
    )
}
