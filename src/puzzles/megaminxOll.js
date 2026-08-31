// See README.md's "About the built-in algorithms" section for provenance.
export const megaminxOllSets = [{
  "id": "megaminx-oll",
  "name": "OLL",
  "source": "Supplied by the project's user (ollalgs.js/pllalgs.js). Grouped by the source's own algsGroups_OLL/algsGroups_PLL; a group with more than 6 cases is split in half (a/b). BR/BL/DR were rewritten as a y-rotation conjugate of an existing face (e.g. BR -> y R y') rather than given dedicated keys, each verified to produce an identical resulting pattern to the original token. A leading/embedded \"x'\" in 5 algorithms (a vestigial 3x3-notation artifact -- x/z rotation isn't valid on megaminx here, only y/y') was dropped after confirming the rest of the algorithm still round-trips correctly. The single empty \"solved\" PLL entry is omitted -- not a practicable case. Every case was parsed and round-trip-verified against the real `cubing` engine before being included.",
  "cases": [
    {
      "name": "1A",
      "group": "Group 1",
      "alg": "L R U R' U' R' F R F' L'"
    },
    {
      "name": "1B",
      "group": "Group 1",
      "alg": "L F R' F' R U R U' R' L'"
    },
    {
      "name": "2A",
      "group": "Group 2",
      "alg": "R U R' U R U R' U2' R U' R'"
    },
    {
      "name": "2B",
      "group": "Group 2",
      "alg": "R bR R' F R bR' R' F'"
    },
    {
      "name": "2C",
      "group": "Group 2",
      "alg": "R U2' R' U' R U2' R'"
    },
    {
      "name": "2D",
      "group": "Group 2",
      "alg": "R' F R bR' R' F' R bR"
    },
    {
      "name": "3A+",
      "group": "Group 3",
      "alg": "R U R' U R U2' R'"
    },
    {
      "name": "3A-",
      "group": "Group 3",
      "alg": "R' U' R U' R' U2 R"
    },
    {
      "name": "3B+",
      "group": "Group 3",
      "alg": "R U2 R' U' R U' R'"
    },
    {
      "name": "3B-",
      "group": "Group 3",
      "alg": "R' U2' R U R' U R"
    },
    {
      "name": "4A",
      "group": "Group 4",
      "alg": "R U R' U R U' R' U R U2' R'"
    },
    {
      "name": "4B",
      "group": "Group 4",
      "alg": "R' U2' R U R' U' R U R' U R"
    },
    {
      "name": "4C",
      "group": "Group 4",
      "alg": "R U R' U R U R' U' R U2' R'"
    },
    {
      "name": "4D",
      "group": "Group 4",
      "alg": "R U2' R' U2' R U2 R' U2' R U' R'"
    },
    {
      "name": "4E+",
      "group": "Group 4",
      "alg": "R' U2 R U R' U' R U R' U2 R"
    },
    {
      "name": "4E-",
      "group": "Group 4",
      "alg": "R' U2' R2 U R2' U R2 U2' R'"
    },
    {
      "name": "5+",
      "group": "Group 5",
      "alg": "R U R' U2 R U2' R' U R U2' R'"
    },
    {
      "name": "5-",
      "group": "Group 5",
      "alg": "R U2 R' U' R U2 R' U2' R U' R'"
    },
    {
      "name": "6A",
      "group": "Group 6",
      "alg": "R U2' R' F R' F' R U' R U2' R'"
    },
    {
      "name": "6B",
      "group": "Group 6",
      "alg": "F R U' R' U2 R U R' F'"
    },
    {
      "name": "7A",
      "group": "Group 7",
      "alg": "R U R' U' R' F R F'"
    },
    {
      "name": "7B",
      "group": "Group 7",
      "alg": "F R U R' U' F'"
    },
    {
      "name": "8A+",
      "group": "Group 8",
      "alg": "R' U' R' F R F' U R"
    },
    {
      "name": "8A-",
      "group": "Group 8",
      "alg": "R' U2' F' U F U R"
    },
    {
      "name": "8B+",
      "group": "Group 8",
      "alg": "R U R2' U' R' F R U R U' F'"
    },
    {
      "name": "8B-",
      "group": "Group 8",
      "alg": "F R U R' U' R U R' U R U2' R' F'"
    },
    {
      "name": "9A+",
      "group": "Group 9",
      "alg": "R' F R U R' U' F' U R"
    },
    {
      "name": "9A-",
      "group": "Group 9",
      "alg": "R U R' F' U' F U R U2' R'"
    },
    {
      "name": "9B+",
      "group": "Group 9",
      "alg": "R' U' F' U' F U2 R"
    },
    {
      "name": "9B-",
      "group": "Group 9",
      "alg": "F U R U R' U2' F'"
    },
    {
      "name": "10A+",
      "group": "Group 10",
      "alg": "R U R' U2 R U' R' U2' R' F R F'"
    },
    {
      "name": "10A-",
      "group": "Group 10",
      "alg": "R' F' U' F U2' R U R' U2 R"
    },
    {
      "name": "10B+",
      "group": "Group 10",
      "alg": "R U' R' U2' R' F R F' U2 R U R'"
    },
    {
      "name": "10B-",
      "group": "Group 10",
      "alg": "R U2 R' U R' F R F' R U2 R'"
    },
    {
      "name": "11A+",
      "group": "Group 11",
      "alg": "R' U' F' U' F R2 U R2' U R2 U2' R'"
    },
    {
      "name": "11A-",
      "group": "Group 11",
      "alg": "R U2 R' U R' F' U' F U R2 U2 R'"
    },
    {
      "name": "11B+",
      "group": "Group 11",
      "alg": "R' U2' R' F R F' R U R' U R"
    },
    {
      "name": "11B-",
      "group": "Group 11",
      "alg": "R' U' R' L F R F' L' U R"
    },
    {
      "name": "12+",
      "group": "Group 12",
      "alg": "F R U' R' U2 R U R' U R U' R' F'"
    },
    {
      "name": "12-",
      "group": "Group 12",
      "alg": "R' U2' R U' R' U F' U F U R"
    },
    {
      "name": "13+",
      "group": "Group 13",
      "alg": "R' F R U2 R' F' R F U2' F'"
    },
    {
      "name": "13-",
      "group": "Group 13",
      "alg": "F R' F' U2' F R F' R' U2 R"
    },
    {
      "name": "14A+",
      "group": "Group 14",
      "alg": "F R U2 R' U2' F'"
    },
    {
      "name": "14A-",
      "group": "Group 14",
      "alg": "y R' y' R' U2' R U2 y R y'"
    },
    {
      "name": "14B+",
      "group": "Group 14",
      "alg": "R' U2 R U2 R' F' U F R"
    },
    {
      "name": "14B-",
      "group": "Group 14",
      "alg": "R' F' U' F R U2' R' U2' R"
    },
    {
      "name": "15A+",
      "group": "Group 15",
      "alg": "R' F R U R' F' R F U' F'"
    },
    {
      "name": "15A-",
      "group": "Group 15",
      "alg": "F R' F' U' F R F' R' U R"
    },
    {
      "name": "15B+",
      "group": "Group 15",
      "alg": "L' F U R U R' U2' F' L"
    },
    {
      "name": "15B-",
      "group": "Group 15",
      "alg": "F R' F' U' F R F' R' U' R U R' U R"
    },
    {
      "name": "16A+",
      "group": "Group 16",
      "alg": "R' F R2 U R' U R U2' R2' F' R"
    },
    {
      "name": "16A-",
      "group": "Group 16",
      "alg": "R' U2' R' F R F' R U' R' U2' R"
    },
    {
      "name": "16B+",
      "group": "Group 16",
      "alg": "F R U2 R' U' F R' F' R U' F'"
    },
    {
      "name": "16B-",
      "group": "Group 16",
      "alg": "R' U' R U' R' F U R U' R' F' U2 R"
    },
    {
      "name": "17A+",
      "group": "Group 17",
      "alg": "R' U2' R' F R F' U2 R"
    },
    {
      "name": "17A-",
      "group": "Group 17",
      "alg": "F U R U2' R' U2 R U R' F'"
    },
    {
      "name": "17B+",
      "group": "Group 17",
      "alg": "y' L' y F R U R' U' F' y' L y"
    },
    {
      "name": "17B-",
      "group": "Group 17",
      "alg": "L y R' y' R' U' R U y R y' L'"
    },
    {
      "name": "18A",
      "group": "Group 18",
      "alg": "R' F U R U' R2' F' R2 U R' U' R"
    },
    {
      "name": "18B",
      "group": "Group 18",
      "alg": "F R' F' L F R2 U R' U' F' L'"
    },
    {
      "name": "18C",
      "group": "Group 18",
      "alg": "F U R U' R' U R U' R' F'"
    },
    {
      "name": "18D",
      "group": "Group 18",
      "alg": "R' U2' R U R' F R' F' R U R"
    },
    {
      "name": "18E+",
      "group": "Group 18",
      "alg": "R' F' U2' F R U R' U R"
    },
    {
      "name": "18E-",
      "group": "Group 18",
      "alg": "R' F' U' F U' R U R' U R"
    },
    {
      "name": "19A+",
      "group": "Group 19a",
      "alg": "F U R U' R' U R U R' U2' F'"
    },
    {
      "name": "19A-",
      "group": "Group 19a",
      "alg": "F U2 R U' R' U' R U R' U' F'"
    },
    {
      "name": "19B+",
      "group": "Group 19a",
      "alg": "R U2' R' F' U' F U' R U' R'"
    },
    {
      "name": "19B-",
      "group": "Group 19a",
      "alg": "R' U2' R U R' F' U' F R U R' U R"
    },
    {
      "name": "19C+",
      "group": "Group 19a",
      "alg": "y' R' U2 R y R' y' R y R y' R' U2 R' U R"
    },
    {
      "name": "19C-",
      "group": "Group 19a",
      "alg": "R U2' R' F R' F' R U2' R U' R'"
    },
    {
      "name": "19D+",
      "group": "Group 19b",
      "alg": "F U R U R' U' R U R' U2' F'"
    },
    {
      "name": "19D-",
      "group": "Group 19b",
      "alg": "y R' y' U' R' U' R U R' U' R U2 y R y'"
    },
    {
      "name": "19E+",
      "group": "Group 19b",
      "alg": "F U R U' R U R' U R U2' R2' F'"
    },
    {
      "name": "19E-",
      "group": "Group 19b",
      "alg": "R' U' R' F R2 U' R' U2 R U R' F' R"
    },
    {
      "name": "19F+",
      "group": "Group 19b",
      "alg": "R U2' R' U2' R U R' U2' R' F R F'"
    },
    {
      "name": "19F-",
      "group": "Group 19b",
      "alg": "R' U2' R2 U R2' U R U2' R' F R F'"
    },
    {
      "name": "20A+",
      "group": "Group 20a",
      "alg": "y R' y' R' U2' R U2 R' U' R U y R y'"
    },
    {
      "name": "20A-",
      "group": "Group 20a",
      "alg": "F R U2 R' U2' R U R' U' F'"
    },
    {
      "name": "20B+",
      "group": "Group 20a",
      "alg": "R' F' U' F U R U2' R' U2' R U R' U R"
    },
    {
      "name": "20B-",
      "group": "Group 20a",
      "alg": "R' F' U' F U R2 U2 R' U' R U' R'"
    },
    {
      "name": "20C+",
      "group": "Group 20a",
      "alg": "y R' y' U2' R' U R U' R' U R U y R y'"
    },
    {
      "name": "20C-",
      "group": "Group 20a",
      "alg": "F U2 R U' R' U R U' R' U' F'"
    },
    {
      "name": "20D+",
      "group": "Group 20b",
      "alg": "R' F R' F' R2 U' R' F' U' F R"
    },
    {
      "name": "20D-",
      "group": "Group 20b",
      "alg": "F R U' R' U R U2' R' U' R U' R' F'"
    },
    {
      "name": "20E+",
      "group": "Group 20b",
      "alg": "F R U R' U' R U2 R' U' R U' R' F'"
    },
    {
      "name": "20E-",
      "group": "Group 20b",
      "alg": "R' U2' R F U R' U R2 U2' R' F'"
    },
    {
      "name": "20F+",
      "group": "Group 20b",
      "alg": "R U2' R' U' R U' R' U' R' F R F'"
    },
    {
      "name": "20F-",
      "group": "Group 20b",
      "alg": "R' U' R F U' R' U2 R U2 R U' R' F'"
    },
    {
      "name": "21A+",
      "group": "Group 21a",
      "alg": "F U2 R U2' R' U R U' R' F'"
    },
    {
      "name": "21A-",
      "group": "Group 21a",
      "alg": "y R' y' U2' R' U2 R U' R' U R y R y'"
    },
    {
      "name": "21B+",
      "group": "Group 21a",
      "alg": "R' U2' F' U F U' R U R' U R"
    },
    {
      "name": "21B-",
      "group": "Group 21a",
      "alg": "R' F' U' F R U2' R' U2 R U' R' U2 R"
    },
    {
      "name": "21C+",
      "group": "Group 21a",
      "alg": "R' F' U2' F2 R U R' U' F' U2 R"
    },
    {
      "name": "21C-",
      "group": "Group 21b",
      "alg": "y R' y' U' R' U R U2' R' U2 R U' R' U R y R y'"
    },
    {
      "name": "21D+",
      "group": "Group 21b",
      "alg": "R' F' U' F U2' R U2 R' U R"
    },
    {
      "name": "21D-",
      "group": "Group 21b",
      "alg": "y R' y' U2' R' U2 R U2' R' U2 R y R y'"
    },
    {
      "name": "21E+",
      "group": "Group 21b",
      "alg": "y R' y' R' U' R U R' U2' R U2 y R y'"
    },
    {
      "name": "21E-",
      "group": "Group 21b",
      "alg": "F R U R' U' R U2 R' U2' F'"
    },
    {
      "name": "22A",
      "group": "Group 22",
      "alg": "R U2 R2' F R F' R U2' R'"
    },
    {
      "name": "22B",
      "group": "Group 22",
      "alg": "F R' F' R U R U' R'"
    },
    {
      "name": "23A",
      "group": "Group 23",
      "alg": "R U2 R' U R U' R' U2' R' F R F'"
    },
    {
      "name": "23B",
      "group": "Group 23",
      "alg": "R U2' R' U' F R' F' R U' R U' R'"
    },
    {
      "name": "24A+",
      "group": "Group 24",
      "alg": "F U R U' R' F'"
    },
    {
      "name": "24A-",
      "group": "Group 24",
      "alg": "R' U' F' U F R"
    },
    {
      "name": "24B+",
      "group": "Group 24",
      "alg": "R U y R' y' U' R' U R y R y' R'"
    },
    {
      "name": "24B-",
      "group": "Group 24",
      "alg": "R' U' F U R U' R' F' R"
    },
    {
      "name": "25A+",
      "group": "Group 25",
      "alg": "F R U R2' U' F' U F R F'"
    },
    {
      "name": "25A-",
      "group": "Group 25",
      "alg": "F R U R2' U' F' U F R F'"
    },
    {
      "name": "25B+",
      "group": "Group 25",
      "alg": "R' U2 R U2 R' F R' F' R U R"
    },
    {
      "name": "25B-",
      "group": "Group 25",
      "alg": "F R' F' R U2 R U R' U' R U2' R'"
    },
    {
      "name": "26A+",
      "group": "Group 26",
      "alg": "R U R' U R' F R F' U R U2 R'"
    },
    {
      "name": "26A-",
      "group": "Group 26",
      "alg": "F R U R2' U' F' U F R F'"
    },
    {
      "name": "26B+",
      "group": "Group 26",
      "alg": "F U R U' y R y' R' F' R y R' y' R'"
    },
    {
      "name": "26B-",
      "group": "Group 26",
      "alg": "y R' y' U' R' U F' R y R y' R' F R"
    },
    {
      "name": "27A+",
      "group": "Group 27",
      "alg": "y' L' y F R' F' R U R U' R' y' L y"
    },
    {
      "name": "27A-",
      "group": "Group 27",
      "alg": "L y R' y' R y R y' R' U' R' U R L'"
    },
    {
      "name": "27B+",
      "group": "Group 27",
      "alg": "F R' F' R U2' R U' R' U R U2 R'"
    },
    {
      "name": "27B-",
      "group": "Group 27",
      "alg": "R' F R F' R' F R F' R U R' U' R U R'"
    },
    {
      "name": "28+",
      "group": "Group 28",
      "alg": "y' B y R2 U' R' U R' y' B' y"
    },
    {
      "name": "28-",
      "group": "Group 28",
      "alg": "y R' y' R2' F R F' R y R y'"
    },
    {
      "name": "29+",
      "group": "Group 29",
      "alg": "F U2 R U' R' U R U2' R' F'"
    },
    {
      "name": "29-",
      "group": "Group 29",
      "alg": "y R' y' U2' R' U R U' R' U2 R y R y'"
    },
    {
      "name": "30A+",
      "group": "Group 30",
      "alg": "F U2 R U2' R' F'"
    },
    {
      "name": "30A-",
      "group": "Group 30",
      "alg": "y R' y' U2' R' U2 R y R y'"
    },
    {
      "name": "30B+",
      "group": "Group 30",
      "alg": "y R' y' L R' F R' F' R2 L' y R y'"
    },
    {
      "name": "30B-",
      "group": "Group 30",
      "alg": "R U' R' U R U' R' U' F R' F' R2 U R'"
    },
    {
      "name": "31A+",
      "group": "Group 31",
      "alg": "F R' F' R U2' R U2 R'"
    },
    {
      "name": "31A-",
      "group": "Group 31",
      "alg": "y R' y' R' F R' F' R2 y R y'"
    },
    {
      "name": "31B+",
      "group": "Group 31",
      "alg": "F U R U R' U' R U' R' F'"
    },
    {
      "name": "31B-",
      "group": "Group 31",
      "alg": "y R' y' U' R' U' R U R' U R y R y'"
    },
    {
      "name": "32A+",
      "group": "Group 32",
      "alg": "R U R' U' R' F R2 U R' U' F'"
    },
    {
      "name": "32A-",
      "group": "Group 32",
      "alg": "R' U' R U R y R' y' R2' U' R U y R y'"
    },
    {
      "name": "32B+",
      "group": "Group 32",
      "alg": "F U F' R' F R U' R' F' R"
    },
    {
      "name": "32B-",
      "group": "Group 32",
      "alg": "R U2' R2' F R F' R U2 R'"
    },
    {
      "name": "33A+",
      "group": "Group 33",
      "alg": "F U R U' R' F' R' U2' R U R' U R"
    },
    {
      "name": "33A-",
      "group": "Group 33",
      "alg": "R' U' R U' R' U F' U' F R U R' U R"
    },
    {
      "name": "33B+",
      "group": "Group 33",
      "alg": "F U R U R' U' R U R' U' R U' R' F'"
    },
    {
      "name": "33B-",
      "group": "Group 33",
      "alg": "y R' y' U' R' U' R U R' U' R U R' U R y R y'"
    },
    {
      "name": "34A",
      "group": "Group 34",
      "alg": "F R' F' R U R U R' U R U' R' U R U2 R'"
    },
    {
      "name": "34B",
      "group": "Group 34",
      "alg": "F R' F' R U2' R U' R' U' R U' R'"
    },
    {
      "name": "34C",
      "group": "Group 34",
      "alg": "R U R' U R' F R F' U R U2' R' U R U2' R'"
    },
    {
      "name": "34D",
      "group": "Group 34",
      "alg": "F R' F' R U R U R' U R U2 R'"
    },
    {
      "name": "34E+",
      "group": "Group 34",
      "alg": "F R' F' R U2 R' U' R2 U' R2' U2 R"
    },
    {
      "name": "34E-",
      "group": "Group 34",
      "alg": "F R' F' R U R U' R2' U2' R U R' U R"
    },
    {
      "name": "35A+",
      "group": "Group 35a",
      "alg": "y' B y R U' R U R' U' R U R2' y' B' y"
    },
    {
      "name": "35A-",
      "group": "Group 35a",
      "alg": "F R' F' R U R U R' U' R U' R'"
    },
    {
      "name": "35B+",
      "group": "Group 35a",
      "alg": "R' F R F' U' F R' F' R2 U' R'"
    },
    {
      "name": "35B-",
      "group": "Group 35a",
      "alg": "R U2' R2' F' U' F R2 U2' R2' U2' R"
    },
    {
      "name": "35C+",
      "group": "Group 35a",
      "alg": "R' F R2 y R' y' R2' F' R2 y R y' R'"
    },
    {
      "name": "35C-",
      "group": "Group 35a",
      "alg": "R y R' y' R2' F R2 y R y' R2' F' R"
    },
    {
      "name": "35D+",
      "group": "Group 35b",
      "alg": "F R U R' U' R U R' U' F'"
    },
    {
      "name": "35D-",
      "group": "Group 35b",
      "alg": "y R' y' R' U' R U R' U' R U y R y'"
    },
    {
      "name": "35E+",
      "group": "Group 35b",
      "alg": "R' U' R' F R F' R' F R F' U R"
    },
    {
      "name": "35E-",
      "group": "Group 35b",
      "alg": "y' L' y F R U R' U' R U R' U' F' y' L y"
    },
    {
      "name": "35F+",
      "group": "Group 35b",
      "alg": "F' U' F2 R' F' R U' R' F R F'"
    },
    {
      "name": "35F-",
      "group": "Group 35b",
      "alg": "R U R2' F R F' U F R' F' R"
    },
    {
      "name": "36A+",
      "group": "Group 36a",
      "alg": "F U2' F' U' R' F R U2' R' F' R"
    },
    {
      "name": "36A-",
      "group": "Group 36a",
      "alg": "R U R' U2 R' F R F' R U2 R'"
    },
    {
      "name": "36B+",
      "group": "Group 36a",
      "alg": "F R' F' U' F U R2 U R' U' R U' R' F'"
    },
    {
      "name": "36B-",
      "group": "Group 36a",
      "alg": "y R' y' U2' R' U2' R U R' U2' R U y R y'"
    },
    {
      "name": "36C+",
      "group": "Group 36a",
      "alg": "R' U' R U2' R' U F' U F U R"
    },
    {
      "name": "36C-",
      "group": "Group 36a",
      "alg": "R U R' U2 R U' y R y' U' y R' y' U' R'"
    },
    {
      "name": "36D+",
      "group": "Group 36b",
      "alg": "R U2' R' U' F R' F' R2 U2' R'"
    },
    {
      "name": "36D-",
      "group": "Group 36b",
      "alg": "R' U2 R U2 R2' F R F' U R"
    },
    {
      "name": "36E+",
      "group": "Group 36b",
      "alg": "L F R U R' U' R U R' U' F' L'"
    },
    {
      "name": "36E-",
      "group": "Group 36b",
      "alg": "y' L' y y R' y' R' U' R U R' U' R U y R y' y' L y"
    },
    {
      "name": "36F+",
      "group": "Group 36b",
      "alg": "R U2' R2' U2' R U' R' U2' F R F'"
    },
    {
      "name": "36F-",
      "group": "Group 36b",
      "alg": "F' R U2' R2' F R F' R U2 R' F"
    },
    {
      "name": "37A+",
      "group": "Group 37a",
      "alg": "R' U2' F R' F' R2 U R' U R"
    },
    {
      "name": "37A-",
      "group": "Group 37a",
      "alg": "R U2' R2' F R F' U2' R U' R'"
    },
    {
      "name": "37B+",
      "group": "Group 37a",
      "alg": "F R' F' R U2 R U' R' U R U2' R'"
    },
    {
      "name": "37B-",
      "group": "Group 37a",
      "alg": "R U2 R' U' R U R' U2' R' F R F'"
    },
    {
      "name": "37C+",
      "group": "Group 37a",
      "alg": "R U R' U2 F R' F' R2 U2 R'"
    },
    {
      "name": "37C-",
      "group": "Group 37b",
      "alg": "R' U' R U' R2' F R F' U2 R"
    },
    {
      "name": "37D+",
      "group": "Group 37b",
      "alg": "F R' F' U' R U2' R U2 R2' U R"
    },
    {
      "name": "37D-",
      "group": "Group 37b",
      "alg": "R U2 R' U' R U2 R' F' U' F R U2' R'"
    },
    {
      "name": "37E+",
      "group": "Group 37b",
      "alg": "F R' F' R U2' R U2' R' U R U2' R'"
    },
    {
      "name": "37E-",
      "group": "Group 37b",
      "alg": "R' U' R U' R' U F' U' F U2 R"
    }
  ]
}];
