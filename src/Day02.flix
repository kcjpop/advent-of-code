enum Shape with Eq, ToString {
    case Rock, Paper, Scissors
}

enum GameResult with Eq, ToString {
    case Win, Draw, Lose
}

type alias Round = (Shape, Shape)

def charToShape(c: Char): Shape = match c {
    case 'A' => Rock
    case 'B' => Paper
    case _ => Scissors
}

def charToResultChoice(c: Char) : GameResult = match c {
    case 'X' => Lose
    case 'Y' => Draw
    case _ => Win
}

def shapeForDesiredResult(s: Shape, r: GameResult): Shape = match (s, r) {
    case (Rock, Win) => Paper
    case (Paper, Win) => Scissors
    case (Scissors, Win) => Rock
    case (Rock, Lose) => Scissors
    case (Paper, Lose) => Rock
    case (Scissors, Lose) => Paper
    case (x, Draw) => x
}

@Test
def testShapeForDesiredResult01(): Bool = Assert.eq(shapeForDesiredResult(Rock, Draw), Rock)

@Test
def testShapeForDesiredResult02(): Bool = Assert.eq(shapeForDesiredResult(Paper, Draw), Paper)

@Test
def testShapeForDesiredResult03(): Bool = Assert.eq(shapeForDesiredResult(Scissors, Draw), Scissors)

@Test
def testShapeForDesiredResult04(): Bool = Assert.eq(shapeForDesiredResult(Rock, Win), Paper)

@Test
def testShapeForDesiredResult05(): Bool = Assert.eq(shapeForDesiredResult(Paper, Win), Scissors)

@Test
def testShapeForDesiredResult06(): Bool = Assert.eq(shapeForDesiredResult(Scissors, Win), Rock)

@Test
def testShapeForDesiredResult07(): Bool = Assert.eq(shapeForDesiredResult(Rock, Lose), Scissors)

@Test
def testShapeForDesiredResult08(): Bool = Assert.eq(shapeForDesiredResult(Paper, Lose), Rock)

@Test
def testShapeForDesiredResult09(): Bool = Assert.eq(shapeForDesiredResult(Scissors, Lose), Paper)


def toRoundFirstHalf(s: String) : Round = {
    let opponent = String.charAt(0, s) |> charToShape;
    let me = String.charAt(2, s) |> charToShape;

    (opponent, me)
}

def toRoundSecondHalf(s: String) : Round = {
    let opponent = String.charAt(0, s) |> charToShape;
    let me = String.charAt(2, s) |> charToResultChoice |> shapeForDesiredResult(opponent);

    (opponent, me)
}

def pointForChoice(r: Round): Int32 = {
    match snd(r) {
        case Rock => 1
        case Paper => 2
        case Scissors => 3
    }
}

@Test
def testPointForChoice01(): Bool = Assert.eq(pointForChoice((Rock, Rock)), 1)

@Test
def testPointForChoice02(): Bool = Assert.eq(pointForChoice((Rock, Paper)), 2)

@Test
def testPointForChoice03(): Bool = Assert.eq(pointForChoice((Rock, Scissors)), 3)

def pointForRound(r: Round): Int32 = match r {
    case (Scissors, Rock) => 6
    case (Paper, Scissors) => 6
    case (Rock, Paper) => 6
    case (x, y) if x == y => 3
    case _ => 0
}

@Test
def pointForRound01(): Bool = Assert.eq(pointForRound((Rock, Scissors)), 6)

@Test
def pointForRound02(): Bool = Assert.eq(pointForRound((Rock, Rock)), 3)

@Test
def pointForRound03(): Bool = Assert.eq(pointForRound((Rock, Paper)), 0)

def getRoundScore(r: Round): Int32 = pointForChoice(r) + pointForRound(r)

def calcSecondHalf(input: String): Int32 = {
    String.trim(input)
    |> String.split({ regex = "\n" })
    |> List.map(toRoundSecondHalf >> getRoundScore)
    |> List.sum
}

def calcFirstHalf(input: String): Int32 = {
    String.trim(input)
    |> String.split({ regex = "\n" })
    |> List.map(toRoundFirstHalf >> getRoundScore)
    |> List.sum
}

namespace Day02 {
    def readInput(): Result[String, String] \ IO = {
        let path = "resources/day02.txt";
        File.read(path)
    }

    // Should be 13009
    pub def firstHalf(): String \ IO = match readInput() {
        case Ok(input) => input |> calcFirstHalf |> x -> "${x}"
        case Err(msg) => "Failed to read input: ${msg}"
    }

    // Should be 10398
    pub def secondHalf(): String \ IO = match readInput() {
        case Ok(input) => input |> calcSecondHalf |> x -> "${x}"
        case Err(msg) => "Failed to read input: ${msg}"
    }
}
