package oldscreens

import (
	"context"
	"log"
    "strconv"
	"slices"
    "github.com/wailsapp/wails/v2/pkg/runtime"
)

type FrontendScreenOrientation struct {
    Angle int
    Onchange nil
    Type string
}

type FrontendScreen struct {
    AvailHeight int
    AvailLeft int
    AvailTop int
    AvailWidth int
    ColorDepth int
    DevicePixelRatio int
    Height int
    IsExtended bool
    IsInternal bool
    IsPrimary bool
    Label string
    Left int
    Orientation FrontendScreenOrientation
    PixelDepth int
    Top int
    Width int
}

type ScreenSize struct {
	Width int
	Height int
}

type Screen struct {
	Id string
	Size ScreenSize
	PhysicalSize ScreenSize
}

var screenSum = ""
var knownScreens = []Screen{}
var lastScreens = []Screen{}

func screenFromRuntime(screen runtime.Screen) Screen {
	return Screen{ 
		Id: screensGetIDR( screen ),
		Size: ScreenSize(screen.Size),
		PhysicalSize: ScreenSize(screen.PhysicalSize),
	}
}

func screensGetAll(ctx context.Context) []Screen {
	rscreens, err := runtime.ScreenGetAll(ctx)

	if err != nil {
		log.Fatal(err)
	}

	res := []Screen{}

	for _, val := range rscreens {
		res = append( res, screenFromRuntime( val ))
	}

	return res
}

func screensWatch(ctx context.Context) {
	screens := screensGetAll(ctx)

	sum := screensGetSum( screens )

	if sum != screenSum {
		screensRebuild( screens )
		screensUpdate( screens )
	}
}

func screensLoad() {
	config := configLoad()

	knownScreens = config.Known
	lastScreens = config.Last
	screenSum = screensGetSum(lastScreens)

	log.Print("Config loaded successfully")
}

func screensUpdate(screens []Screen) {
	screensUpdateKnown( screens )
	screensUpdateLast( screens )
	
	screenSum = screensGetSum(screens)

	screensSave()
}

func screensUpdateKnown(screens []Screen) {
	for _, screen := range screens {
		if ( !screensIsKnown( screen )) {
			knownScreens = append( knownScreens, screen )
		}
	}
}

func screensIsKnown( screen Screen ) bool {
	return slices.Contains( knownScreens, screen )
}

func screensUpdateLast(screens []Screen) {
	lastScreens = screens
}

func screensSave() {
	configSave( knownScreens, lastScreens )
}

func screensRebuild(screens []Screen) {   
	log.Print("Rebuild")
}

func screensGetSum( screens []Screen) string {
	sum := ""
	ids := screensGetIDs( screens )

	for index, id := range ids {
		sum = sum + "|" + strconv.Itoa( index ) + ">" + id
	}

	return sum
}

func screensGetIDs( screens []Screen) []string {
	ids := []string{}

	for _, screen := range screens {
		ids = append( ids, screensGetID( screen ) )
	}

	return ids
}

func screensGetIDR( screen runtime.Screen ) string {
	return strconv.Itoa(screen.Size.Width) + "x" + strconv.Itoa(screen.Size.Height) + "-" + strconv.Itoa(screen.PhysicalSize.Width) + "x" + strconv.Itoa(screen.PhysicalSize.Height)
}

func screensGetID( screen Screen ) string {
	return strconv.Itoa(screen.Size.Width) + "x" + strconv.Itoa(screen.Size.Height) + "-" + strconv.Itoa(screen.PhysicalSize.Width) + "x" + strconv.Itoa(screen.PhysicalSize.Height)
}