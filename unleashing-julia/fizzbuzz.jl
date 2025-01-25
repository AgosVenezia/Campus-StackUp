numbers = collect(1:100)
function fizz_buzz(ns)
	for number in ns
		if number % 3 == 0
			println(number, " => Fizz")
		elseif number % 5 == 0
			println(number, " => Buzz")
		else
			# Optional but this `else` block can be removed
		end 
	end
end

fizz_buzz(numbers)