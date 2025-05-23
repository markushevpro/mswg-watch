import type { ScreensLayout, Screen, SystemScreensState } from '/src/@/services/screens'
import type { WindowSize }                                from '/src/@/services/system'
import type { ScreensStoreBase }                          from './store'

function fixScreenOffset
( screen: Screen, offsetX: number, offsetY: number ): Screen
{
    return {
        devicePixelRatio: screen.devicePixelRatio,
        width:            screen.width,
        height:           screen.height,
        label:            screen.label,
        left:             screen.left * screen.devicePixelRatio - offsetX,
        top:              fixedTop( screen, offsetY ) - offsetY
    }
}

function ratioFix
( number: number, pixelRatio: number ): number
{
    return number - ( number * pixelRatio )
}

export
function fixScreenOffsetMap
( offsetX: number, offsetY: number ): ( screen: Screen ) => Screen
{
    return ( screen: Screen ) => fixScreenOffset( screen, offsetX, offsetY )
}

function fixedTop
( screen: Screen, min: number ): number
{
    return screen.top === min ? screen.top : screen.top + ratioFix( screen.height, screen.devicePixelRatio )
}

function fixedLeft
( screen: Screen, min: number ): number
{
    return screen.left === min ? screen.left : screen.left + ratioFix( screen.left, screen.devicePixelRatio )
}

export
function getZoom
( layout: ScreensLayout, size: WindowSize ): number
{
    return Math.max( Math.ceil( 1 / ( size.width / layout.width )), Math.ceil( 1 / ( size.height / layout.height )))
}

// TODO: Refactor for readability
export
function calculateScreensLayout
( screens: Screen[]): ScreensLayout
{
    const _left = screens.reduce(( left, screen ) => Math.min( left, screen.left ), Infinity )
    const _top  = screens.reduce(( top, screen ) => Math.min( top, screen.top ), Infinity )

    const left = screens.reduce(( left, screen ) => Math.min( left, fixedLeft( screen, _left ) * screen.devicePixelRatio ), Infinity )
    const top  = screens.reduce(( top, screen ) => Math.min( top, fixedTop( screen, _top ) * screen.devicePixelRatio ), Infinity )

    const width = screens
        .sort(( a, b ) => fixedLeft( a, left ) * a.devicePixelRatio - fixedLeft( b, left ) * b.devicePixelRatio )
        .map( screen => fixedLeft( screen, left ) * screen.devicePixelRatio - left + screen.width * screen.devicePixelRatio )
        .reduce(( max, offset ) => Math.max( offset, max ), left )

    const height = screens
        .sort(( a, b ) => fixedTop( a, top ) * a.devicePixelRatio - fixedTop( b, top ) * b.devicePixelRatio )
        .map( screen => fixedTop( screen, top ) * screen.devicePixelRatio - top + screen.height * screen.devicePixelRatio )
        .reduce(( max, offset ) => Math.max( offset, max ), top )

    return {
        left,
        top,
        width,
        height
    }
}

function screensAreSame
( screens: Screen[]): boolean
{
    return screens.every( s => (
        s.width === screens[ 0 ].width &&
        s.height === screens[ 0 ].height &&
        s.devicePixelRatio === screens[ 0 ].devicePixelRatio
    ))
}

// Trying to fix WebView2 error with wrong sizes in getScreenDetails
async function fixScreensByBackend
( screens: Screen[]): Promise<Screen[]>
{
    if ( !screensAreSame( screens )) {
        return screens
    }

    // @ts-expect-error undefined
    const backend = await runtime.ScreenGetAll()

    const res = screens.map(( screen, index ) => ({
        id:               screen.id ?? screen.label,
        availHeight:      screen.availHeight,
        availLeft:        screen.availLeft,
        availTop:         screen.availTop,
        availWidth:       screen.availWidth,
        colorDepth:       screen.colorDepth,
        devicePixelRatio: backend[ index ].physicalSize.width / backend[ index ].size.width,
        isExtended:       screen.isExtended,
        isInternal:       screen.isInternal,
        isPrimary:        screen.isPrimary,
        label:            screen.label,
        left:             screen.left,
        onchange:         screen.onchange,
        orientation:      screen.orientation,
        pixelDepth:       screen.pixelDepth,
        top:              screen.top,
        width:            backend[ index ].size.width,
        height:           backend[ index ].size.height
    }))

    return res
}

export
async function getSystemScreens
(): Promise<SystemScreensState>
{
    // console.log( 'Fetching screens...' )

    const defaultResult = {
        loading: false,
        error:   false,
        denied:  false,
        screens: undefined,
        details: undefined
    }

    try {
        const data = await window.getScreenDetails?.()
        const res  = data?.screens

        if ( res ) {
            // console.log( 'Screens ok', res )

            return {
                ...defaultResult,
                screens: await fixScreensByBackend( res ),
                details: data
            }
        } else {
            console.log( 'Screens not fetched' )

            return {
                ...defaultResult,
                error: true
            }
        }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch ( e: any ) {
        console.log( 'error', { e })

        if ( e.message.includes( 'Permission denied' )) {
            console.log( 'Permission denied' )

            return {
                ...defaultResult,
                error:  true,
                denied: true
            }
        } else {
            console.log( 'Unkown error' )

            return {
                ...defaultResult,
                error: true
            }
        }
    }
}

export
function fixScreens
( screens: Screen[]): ScreensStoreBase
{
    const layout = calculateScreensLayout([].slice.call( screens ))

    return {
        layout,
        fixed: screens.map( fixScreenOffsetMap( layout.left, layout.top )).map( appendID )
    }
}

export
function getSID
( screens?: Screen[]): string
{
    return ( screens ?? []).reduce(( all, screen ) => `${all}+${getID( screen )}`, '' )
}

export
function getID
( screen: Screen ): string
{
    return screen.label + '=' + Math.ceil( screen.width * screen.devicePixelRatio ) + 'x' + Math.ceil( screen.height * screen.devicePixelRatio )
}

export
function appendID
( screen: Screen ): Screen
{
    return {
        ...screen,
        id: getID( screen )
    }
}
