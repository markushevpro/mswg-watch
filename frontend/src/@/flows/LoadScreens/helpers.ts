export
function getErrorText
( available?: boolean, denied?: boolean ): string
{
    if ( !available ) {
        return 'Unfortanetly, your browser doesn&apos;t support this feature'
    }

    if ( denied ) {
        return 'Probably you denied access to screens information'
    }

    return 'Please allow to access your screens'
}
