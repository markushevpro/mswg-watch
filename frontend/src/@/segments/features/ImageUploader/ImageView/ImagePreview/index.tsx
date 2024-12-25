import styles from './image-preview.module.css'

interface PImagePreview
{
    src: string
}

export
function ImagePreview
({ src }: PImagePreview )
{
    return (
        <div className={styles.container}>
            {
                src && (
                    <img alt="" src={src} />
                )
            }
        </div>
    )
}
