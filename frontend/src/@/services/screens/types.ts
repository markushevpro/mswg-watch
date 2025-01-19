declare global {
    interface Window {
        getScreenDetails?: () => Promise<GetScreenDetails>
    }
}

export
interface GetScreenDetails
{
    screens: Screen[]
    addEventListener: ( name: string, event: EventListener ) => void
    removeEventListener: ( name: string, event: EventListener ) => void
}

export
interface SystemScreensState
{
    loading: boolean
    error: boolean
    denied: boolean
    screens: Screen[] | undefined
    details: GetScreenDetails | undefined
}

export
interface ScreenOrientation
{
    angle: number
    type: string
    onchange: never
}

export
interface Screen
{
    id?: string
    availHeight?: number
    availLeft?: number
    availTop?: number
    availWidth?: number
    colorDepth?: number
    devicePixelRatio: number
    height: number
    isExtended?: boolean
    isInternal?: boolean
    isPrimary?: boolean
    label: string
    left: number
    onchange?: never
    orientation?: ScreenOrientation
    pixelDepth?: number
    top: number
    width: number
}

export
interface ScreensLayout
{
    left: number
    top: number
    width: number
    height: number
}
