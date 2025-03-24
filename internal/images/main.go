package images

import (
	"os"
	"log"
	"strings"

	"io"
	"io/ioutil"
	
	"encoding/base64"
	"net/http"
)

type ImageInfo struct {
	Filename string `json:"filename"`
	Data string `json:"data"`
}

var imagesDir = "./cache"
var wallpaperPath = "./render"

// PUBLIC

func GetImages() []ImageInfo {
	checkDir()

	var res = []ImageInfo{}
	
	files, err := os.ReadDir( imagesDir )

    if err != nil {
        log.Fatal(err)
    }
 
    for _, file := range files {
		res = append( res, ImageInfo{
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

func Generate( filename string, data string ) string {
	var target = WallpaperFile( filename )

	log.Print( target )

	if ( data != "" ) {
		saveFile( target, data )
		return target
	}

	return ""
}

func WallpaperFile( filename string ) string {
	return wallpaperPath + "/" + filename
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

func IsExist( filename string ) bool {
	_, err := os.Stat(  WallpaperFile( filename )); 
	
	return err == nil		
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