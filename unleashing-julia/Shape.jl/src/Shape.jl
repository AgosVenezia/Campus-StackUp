#=
module Shape

greet() = print("Hello World!")

end # module Shape
=#

module Shape

export Square
export Rectangle
export area

abstract type AbstractShape end
abstract type Polygon <: AbstractShape end
abstract type Irregular <: AbstractShape end

abstract type Quadrilateral <: Polygon end

struct Square <: Quadrilateral
	len::Float64
	Square(len::AbstractFloat) = len < 0 ? error("Length is less than 0.") : new(convert(Float64, len))
	Square(len::Integer) = len < 0 ? error("Length is less than 0.") : new(convert(Float64, len))
end

struct Rectangle <: Quadrilateral
	len::Float64
	width::Float64
	function Rectangle(len::T, width::Z) where T <: Union{AbstractFloat, Integer} where Z <: Union{AbstractFloat, Integer}
    	len < 0 && return error("Length is less than 0.")
    	width < 0 && return error("Width is less than 0.")
    	new(convert(Float64, len), convert(Float64, width))
	end
end

area(shape::Square) = shape.len ^ 2
area(shape::Rectangle) = shape.len * shape.width

end # module Shape