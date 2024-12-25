package main

import (
	"context"
	"os"
	"os/exec"
	"syscall"
	osRuntime "runtime"

	"github.com/energye/systray"
	"github.com/energye/systray/icon"
	"github.com/wailsapp/wails/v2/pkg/runtime"

	"mswg/screens"
	"mswg/images"
	"mswg/types"
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

		systray.SetOnClick(func(_ systray.IMenu) {
			runtime.WindowShow(a.ctx)
		})
	}
}

func (a *App) startup(ctx context.Context) {
	a.ctx = ctx
	screens.Load()
	systray.Run(systemTray(a), func() {})
}

// FRONTEND

func (a *App) GetKnownScreens() []types.Screen {
	return screens.GetKnown()
}

func (a *App) GetImages() []types.ImageInfo {
	return images.GetImages()
}

func (a *App) UpdateScreens( list []types.Screen ) {
	screens.Check( list )
}

func (a *App) SetImage( id string, data string ) {
	images.UpdateImage( id, data )
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