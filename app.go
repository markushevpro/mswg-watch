package main

import (
	"context"
	"os"
	"os/exec"
	"syscall"
	"log"
	"strconv"
	osRuntime "runtime"

	"github.com/energye/systray"
	"github.com/energye/systray/icon"
	"github.com/wailsapp/wails/v2/pkg/runtime"	
	"github.com/wailsapp/wails/v2/pkg/options"

	"github.com/reujab/wallpaper"

	"mswg-watch/internal/images"
)

type App struct {
	ctx context.Context
}

func NewApp() *App {
	return &App{}
}

func systemTray( a *App ) func() {
	return func() {
		systray.SetIcon( icon.Data )
		systray.SetTitle( "MSWG Watch" )

		systray.SetOnClick(func(_ systray.IMenu) {
			runtime.WindowShow(a.ctx)
		})

		systray.SetOnRClick(func(menu systray.IMenu) {
			menu.ShowMenu()
		})
		
		systray.CreateMenu()

		mQuit := systray.AddMenuItem("Quit", "Close application")
		mQuit.Enable()
		mQuit.Click(func() {
			os.Exit(0)
		})
	}
}

func (a *App) startup(ctx context.Context) {
	a.ctx = ctx
	systray.Run(systemTray(a), func() {})
}

func (a *App) restart( data options.SecondInstanceData ) {
	a.Restart()
}

// FRONTEND

func (a *App) GetImages() []images.ImageInfo {
	return images.GetImages()
}

func (a *App) SetImage( id string, data string ) {
	images.UpdateImage( id, data )
}

func (a *App) IsWallpaperExist( filename string ) bool {
	var res = images.IsExist( filename )
	log.Print("Check: " + filename + ", result: " + strconv.FormatBool(res))
	return res
}

func (a *App) SaveWallpaper( filename string, data string ) string {
	log.Print("Saving: " + filename)
	return images.Generate( filename, data )
}

func (a *App) SetWallpaper( filename string ) {
	cwd, err := os.Getwd()

	if err == nil {
		wallpaper.SetFromFile( cwd + "/" + images.WallpaperFile( filename ))
		wallpaper.SetMode( wallpaper.Span )
	}
}

func (a *App) Restart() error {
	self, err := os.Executable()

	if err != nil {
		return err
	}

	args := os.Args
	env := os.Environ()

	if osRuntime.GOOS == "windows" {
		cmd := exec.Command(self, args[1:]...)
		cmd.Stdout = os.Stdout
		cmd.Stderr = os.Stderr
		cmd.Stdin = os.Stdin
		cmd.Env = env
		err := cmd.Start()
		if err == nil {
			os.Exit(0)
		}
		return err
	}

	return syscall.Exec(self, args, env)
}