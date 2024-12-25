import type { TImageData } from '/src/@/services/images'
import type { FileType }   from 'rsuite/esm/Uploader'

import { ImagePreview }          from './ImagePreview'
import { ImageUploaderControls } from './ImageUploaderControls'

interface PImageView
{
    data: TImageData
    uploading: boolean
    upload: ( data: FileType ) => void
    remove: () => void
}

export
function ImageView
({ data, uploading, upload, remove }: PImageView )
{
    return (
        <>
            <ImageUploaderControls remove={remove} upload={upload} uploading={uploading} />
            <ImagePreview src={data as string} />
        </>
    )
}
