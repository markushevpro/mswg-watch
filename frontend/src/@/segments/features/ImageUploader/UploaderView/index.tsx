
import { FileUpload } from '@rsuite/icons'

import { FileUploader } from '/src/@/shared/ui-kit/FileUploader'

import type { FileType } from 'rsuite/esm/Uploader'

interface PUploaderView
{
    uploading: boolean
    upload: ( file: FileType ) => void
}

export
function UploaderView
({ uploading, upload }: PUploaderView )
{
    return (
        <FileUploader loading={uploading} onUpload={upload}>
            <FileUpload />
        </FileUploader>
    )
}
