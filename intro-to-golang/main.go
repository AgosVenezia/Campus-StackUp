/*package main

import "fmt"

func main() {
        // HELLO, WORLD!
        fmt.Println("Hello, World!") // This should print an output
        
        // VARIABLES
        helloWorld1 := "Hello, World!"
        fmt.Println(helloWorld1)
        var helloWorld2 = "Hello, World!"
        fmt.Println(helloWorld2)
        const hW = "Hello, World!"
        fmt.Println(hW)
        var assignFromConst = hW
        fmt.Println(assignFromConst)

        helloWorld2 = hW + helloWorld1  // joining two strings with + operator
	fmt.Println(helloWorld2)
	hW = hW + hW

        var helloWorld string
	fmt.Println(helloWorld)
	var number int
	fmt.Println(number)

        // TYPES
        var number uint8
        helloWorld := "WHAT"
        fmt.Println(helloWorld + number)
        // var number int
        fmt.Println(number)
}

// FUNCTIONS
func Hello(s any) {
        fmt.Println("Hello,", s)
}

func main() {
        name := "StackUp User"
        Hello(name)
}*/

/*package main

import "fmt"

func Add(x int, y int) int {
	z := x + y
	return z
}

func main() {
	sum := Add(5, 10)
	fmt.Println(sum)
}*/

/*package main

import (
	"stackup.dev/intro-to-golang/hello"
)

func main() {
    hello.hello("S")
}*/


/*// IF AND IF-ELSE
package main

import (
	"fmt"
)

func main() {
	age := 12
	if age >= 18 {
    	fmt.Println("You are now of legal age!")
	} else {
    	fmt.Println("You are a minor!")
	}
}

package main

import "fmt"

func is_legal_age(age int) (msg string, legal bool) {
	var m string
	var is_legal bool
	if age >= 18 {
    	m = "You are now of legal age!"
    	is_legal = true
    	return m, is_legal
	}
	m = "You are a minor!"
	is_legal = false
	return m, is_legal
}
func main() {

	msg, legal := is_legal_age(10)
	if legal {
    	fmt.Println(msg)
	} else {
    	fmt.Println(msg)
	}

}*/

/*// SWITCH-CASE STATEMENTS
package main

import (
	"fmt"
	"runtime"
)

func main() {
	fmt.Print("Go runs on ")
	switch os := runtime.GOOS; os {
	case "darwin":
    	fmt.Println("OS X.")
	case "linux":
    	fmt.Println("Linux.")
	default:
    	// freebsd, openbsd,
    	// plan9, windows...
    	fmt.Printf("%s.\n", os)
	}
}*/

/*// LOOPS
package main

import "fmt"

func main() {
	/*c := 32
	for i := 0; i < c; i++ {
		fmt.Println(i)
	}*/
        /*s := "String"
        for i := 0; i < len(s); i++ {
                //fmt.Println(s[i])
                fmt.Println(string(s[i]))
        }
}*/

// NEW DEPENDENCY
package main

import (
	"fmt"
	"log"

	"github.com/elastic/go-sysinfo"
)

func main() {
	hostinfo, err := sysinfo.Host()
	if err != nil {
		log.Fatalln(err)
	} else {
		fmt.Println(hostinfo.Info().MACs)
	}
}