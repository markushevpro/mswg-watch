export
function downloadFile
( data: string, filename: string ): void
{
    const link = document.createElement( 'a' )

    link.download = filename
    link.href     = data

    link.click()
}
