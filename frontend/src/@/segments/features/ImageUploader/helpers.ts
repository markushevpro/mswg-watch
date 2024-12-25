import type { TImageData } from '/src/@/services/images'

export
function previewFile
( file: File, callback: ( value: TImageData ) => void ): void
{
    const reader = new FileReader()

    reader.onloadend = () => {
        callback( reader.result as string )
    }

    reader.readAsDataURL( file )
}
