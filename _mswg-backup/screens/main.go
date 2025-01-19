package screens

import (
	"strconv"
	"mswg/config"
	"mswg/types"
)

var currentSum = ""
var knownScreens = []types.Screen{}

// PUBLIC

func Load() {
	var cfg = config.Load()

	knownScreens = cfg.Known
	currentSum = getSum( cfg.Last )
}

func GetKnown() []types.Screen {
	return knownScreens
}

func Check( list []types.Screen ) {
	var ids = getIDs( list )
	var sum = getSum( ids )

	if sum != currentSum {
		updateKnown( list )
		updateConfig( ids )
	}
}

// PRIVATE

func updateKnown( list []types.Screen ) {
	var update = []types.Screen{}

	copy(update, knownScreens)

	for _, screen := range list {
		if ( !isKnown( screen )) {
			update = append( update, screen )
		}
	}

	knownScreens = update
}

func isKnown( screen types.Screen ) bool {
	for _, check := range knownScreens {
		if screen.Id == check.Id {
			return true
		}
	}

	return false
}

func updateConfig( ids []string ) {	
	config.Save(types.Config{
		Known: knownScreens,
		Last: ids,
	})
}

func getIDs( screens []types.Screen ) []string {
	var res = []string{}

	for _, screen := range screens {
		res = append( res, screen.Id )
	}

	return res
}

func getSum( ids []string ) string {
	var res = ""

	for index, id := range ids {
		res += strconv.Itoa( index ) + ">" + id + "|"
	}

	return res
}