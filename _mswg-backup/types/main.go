package types

type Config struct {
	Known []Screen `json:"known"`
	Last []string `json:"last"`
}

type ImageInfo struct {
	Filename string `json:"filename"`
	Data string `json:"data"`
}

type ScreenOrientation struct {
	Angle int `json:"angle"`
	Type string `json:"type"`
}

type Screen struct {
	Id string `json:"id"`
	AvailHeight int `json:"availHeight"`
	AvailLeft int `json:"availLeft"`
	AvailTop int `json:"availTop"`
	AvailWidth int `json:"availWidth"`
	ColorDepth int `json:"colorDepth"`
	DevicePixelRatio float64 `json:"devicePixelRatio"`
	Height int `json:"height"`
	IsExtended bool `json:"isExtended"`
	IsIntenal bool `json:"isInternal"`
	IsPrimary bool `json:"isPrimary"`
	Label string `json:"label"`
	Left int `json:"left"`
	Orientation ScreenOrientation `json:"orientation"`
	PixelDepth int `json:"pixelDepth"`
	Top int `json:"top"`
	Width int `json:"width"`
}