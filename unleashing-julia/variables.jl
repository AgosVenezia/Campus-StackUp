# Assign values to variables
x = 42         # Integer
pi = 3.14      # Floating-point number
name = "Julia" # String

print(12)
print(12)
#= Output:
1212
=#
println(12)
println(12)
#= Output:
12
12
=#

name = "Alice"
age = 30
# Simple interpolation
message = "Hi, I’m $name and I’m $age years old."
println(message)  # Output: Hi, I’m Alice and I’m 30 years old.
# Interpolating expressions
calculation = "5 + 10 equals $(5 + 10)."
println(calculation)  # Output: 5 + 10 equals 15.