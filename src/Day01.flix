def readInput(): Result[String, String] \ IO = {
    let path = "resources/day01.txt";
    File.read(path)
}

def sumCalories(s: String): Int32 = s
    |> String.split({ regex = "\n" })
    |> List.map(Int32.parse(10) >> Result.sum)
    |> List.sum

@Test
def testSumCalories01(): Bool = Assert.eq(sumCalories("1000
2000
3000"), 6000)

@Test
def testSumCalories02(): Bool = Assert.eq(sumCalories("1000"), 1000)

@Test
def testSumOfEmptyString(): Bool = Assert.eq(sumCalories(""), 0)

@Test
def testSumOfInvalidString(): Bool = Assert.eq(sumCalories("nanannan"), 0)


def findMostCalories(input: String) : Int32 = {
    let splitByEmptyLine = String.split({ regex = "\n\n" });

    input
    |> splitByEmptyLine
    |> List.map(sumCalories)
    |> List.maximum
    |> Option.sum
}

namespace Day01 {
    pub def run(): String \ IO = {
        match readInput() {
            case Ok(input) => input |> findMostCalories |> x -> "${x}"
            case Err(msg) => "Failed to read input: ${msg}"
        }
    }
}
