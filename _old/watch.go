package oldwatch

import (
	"context"
    "time"
)

type WatchHandler func(context.Context)

func watcher(ctx context.Context, handler WatchHandler) {
    ticker := time.NewTicker(5 * time.Second)
    quit := make(chan struct{})
    
    go func() {
        for {
        select {
            case <- ticker.C:
                handler(ctx)
            case <- quit:
                ticker.Stop()
                return
            }
        }
    }()
}