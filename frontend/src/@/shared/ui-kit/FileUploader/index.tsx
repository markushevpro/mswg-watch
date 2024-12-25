import { Uploader } from 'rsuite'

import { Button } from '/src/@/shared/ui-kit/Button'

import type { PropsWithChildren } from 'react'
import type { UploaderProps }     from 'rsuite/esm/Uploader'



interface PFileUploader
    extends PropsWithChildren
{
    className?: string
    loading?: boolean
    onUpload: UploaderProps['onUpload']
}

export
function FileUploader
({ children, loading, className, onUpload }: PFileUploader )
{
    return (
        <Uploader
            draggable
            action=""
            className={className}
            fileListVisible={false}
            listType="picture"
            onUpload={onUpload}
        >
            <Button loading={loading}>
                { children }
            </Button>
        </Uploader>
    )
}
