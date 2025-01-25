using Random
correct_number = rand(1:10)  # Generate a number from 1 to 10.
value = 0
while true
	print("Please enter a number between 1 and 10: ")
	input = strip(readline(stdin))
	global value = tryparse(Int, input)
	if value == correct_number
		println("You successfully guessed $(input).")
		break
	else
		continue  # This can be omitted but written for clarity.
	end
end