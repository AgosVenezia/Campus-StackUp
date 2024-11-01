package hello

import "fmt"

func hello(s any) {
	fmt.Println(s)
}

func Hello(s any) {
	hello(s)
}