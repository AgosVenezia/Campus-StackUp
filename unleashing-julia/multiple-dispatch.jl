function hello(x::Int)
    println("Hello, you are a $(x)!")
  end
  
  function hello(x::String)
    println("Hello, my name is $(x).")
  end
  
  function hello(x::Bool)
    if x
      println("Hello, you are so honest.")
    else
      println("Hello, you are a liar.")
    end
  end
  methods(hello)