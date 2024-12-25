package config

import (
    "encoding/json"
    "io/ioutil"
    "os"
	"mswg/types"
)

var configPath = "./screens.json"

// PUBLIC

func Load() types.Config {
    f, err := os.Open( configPath )

    if err != nil {
		return types.Config{
			Known: []types.Screen{},
			Last: []string{},
		}
    }

    defer f.Close()

    bytes, _ := ioutil.ReadAll( f )

    var cfg types.Config

    json.Unmarshal(bytes, &cfg)

	return cfg
}

func Save( cfg types.Config ) {
	// Save config
}