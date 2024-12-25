package images

import (
	"encoding/base64"
	"os"
	"log"
	"strings"
	"net/http"
	"io"
	"io/ioutil"
	"mswg/types"
)

var imagesDir = "./cache"

// PUBLIC

func GetImages() []types.ImageInfo {
	checkDir()

	var res = []types.ImageInfo{}
	
	files, err := os.ReadDir( imagesDir )

    if err != nil {
        log.Fatal(err)
    }
 
    for _, file := range files {
		res = append( res, types.ImageInfo{
			Filename: file.Name(),
			Data: readImage( file.Name()),
		})
    }

	return res
}

func UpdateImage( id string, data string ) {
	var filename = imagesDir + "/" + id + ".png"

	checkDir()

	if ( data != "" ) {
		saveFile( filename, data )
	} else {
		removeFile( filename )
	}
}

// PRIVATE

func saveFile( filename string, data string ) {
    idx := strings.Index(data, ";base64,")

    if idx < 0 {
        return
    }

    reader := base64.NewDecoder(base64.StdEncoding, strings.NewReader(data[idx+8:]))
    
	f, err := os.Create(filename)

    if err != nil {
        return
    }

    io.Copy(f, reader)
    f.Close()
}

func removeFile( filename string ) {
	os.Remove( filename ) 
}

func toBase64(b []byte) string {
	return base64.StdEncoding.EncodeToString(b)
}

func readImage( filename string ) string {
	bytes, err := ioutil.ReadFile( imagesDir + "/" + filename )

	if err != nil {
		log.Print(err)
		return ""
	}

	var res string

	mimeType := http.DetectContentType(bytes)

	switch mimeType {
		case "image/jpeg":
			res += "data:image/jpeg;base64,"
		case "image/png":
			res += "data:image/png;base64,"
	}

	res += toBase64(bytes)
	
	return res
}

func checkDir() {
	os.MkdirAll( imagesDir, os.ModePerm )
}