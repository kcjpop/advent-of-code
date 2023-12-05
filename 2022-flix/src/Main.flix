// The main entry point.
def main(): Unit \ IO = {

    List.range(0, 5)
    |> List.map(_ -> List.range(5, 10))
    |> List.transpose
    |> println;


    println("Eval each Day in the REPL for the anwser, e.g. `:eval Day01.partOne()`")
}
