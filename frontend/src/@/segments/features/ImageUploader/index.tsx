import { Center } from '/src/@/shared/ui-kit/Center'

import type { TImageData } from '/src/@/services/images'


import { ImageView }        from './ImageView'
import { UploaderView }     from './UploaderView'
import { useImageUploader } from './hook'
import styles               from './image-uploader.module.css'

interface PImageUploader
{
    data?: TImageData
    onChange: ( value: TImageData ) => void
}

export
function ImageUploader
({ data, onChange }: PImageUploader )
{
    const { uploading, upload, remove } = useImageUploader( data, onChange )

    return (
        <div className={styles.container}>
            <Center>
                {
                    data
                        ? (
                            <ImageView
                                data={data}
                                remove={remove}
                                upload={upload}
                                uploading={uploading}
                            />
                        )
                        : (
                            <UploaderView upload={upload} uploading={uploading} />
                        )
                }
            </Center>
        </div>
    )
}
