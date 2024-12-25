import type { Screen, ScreensLayout }       from '/src/@/services/screens'
import type { GenImageSize, GenScreenSize } from './types'

function getImageSize
( img: HTMLImageElement ): GenImageSize
{
    return {
        sx: 0,
        sy: 0,
        sw: img.width,
        sh: img.height
    }
}

function getScreenSize
( screen: Screen ): GenScreenSize
{
    return {
        dx: screen.left,
        dy: screen.top,
        dw: screen.width * screen.devicePixelRatio,
        dh: screen.height * screen.devicePixelRatio
    }
}

function calculateCrop
( screen: Screen, img: HTMLImageElement ): GenScreenSize & GenImageSize
{
    let { sx, sy, sw, sh }   = getImageSize( img )
    const { dx, dy, dw, dh } = getScreenSize( screen )

    const targetAspect  = dw / dh
    const currentAspect = img.width / img.height

    if ( targetAspect < currentAspect ) {
        // portrait
        const realWidth = img.height * targetAspect
        const offset    = ( img.width - realWidth ) / 2
        sx              = offset
        sw              = realWidth
    } else {
        const realHeight = img.width / targetAspect
        const offset     = ( img.height - realHeight ) / 2
        sy               = offset
        sh               = realHeight
    }

    return {
        sx,
        sy,
        sw,
        sh,
        dx,
        dy,
        dw,
        dh
    }
}

export
async function drawImage
( ctx: CanvasRenderingContext2D, screen: Screen, image: string ): Promise<void>
{
    await new Promise<void>(( resolve ) => {
        const img = new Image()

        img.addEventListener( 'load', () => {
            const { sx, sy, sw, sh, dx, dy, dw, dh } = calculateCrop( screen, img )

            ctx.drawImage( img, sx, sy, sw, sh, dx, dy, dw, dh )
            resolve()
        })

        img.src = image
    })
}

export
function clearScreen
( ctx: CanvasRenderingContext2D, layout: ScreensLayout ): void
{
    ctx.rect( 0, 0, layout.width, layout.height )
    ctx.fill()
}
