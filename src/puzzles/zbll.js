// ZBLL, grouped into its 7 standard edge-shape families (see README.md's
// "About the built-in algorithms" section for provenance). Within each
// family, cases are further grouped by the source's original subgroup key
// (e.g. "T1".."T6", each ~12 cases) via the `group` field, so the sidebar
// shows collapsible groups instead of a flat 72-case scroll (same mechanism
// as FTO's LBT set). Individual case names (T1..T72 etc.) are sequential
// across the whole family, not tied 1:1 to the group key.
export const zbllSets = [
  {
    "id": "zbll-t",
    "name": "ZBLL T",
    "source": "Provided by the project's user, from a personal ZBLL reference (originally a JS object named `zbll_juliette`). Where the source listed alternate algorithms for a case (separated by \"/\"), only the first is kept here.",
    "cases": [
      {
        "name": "T1",
        "group": "T1",
        "alg": "R U R' U R U2 R' U2 R' U' R U' R' U2 R"
      },
      {
        "name": "T2",
        "group": "T1",
        "alg": "U x D' R' U R D R2' D2 R U' R' D2 (R l)"
      },
      {
        "name": "T3",
        "group": "T1",
        "alg": "U R U2 R' U' R U' R2 U2 R U R' U R"
      },
      {
        "name": "T4",
        "group": "T1",
        "alg": "U' R' U2 R U R' U R2 U2 R' U' R U' R'"
      },
      {
        "name": "T5",
        "group": "T1",
        "alg": "R U R' U R U2 R' U' R U2 R' U' R U' R'"
      },
      {
        "name": "T6",
        "group": "T1",
        "alg": "U' R U' R' U2 R U R' U2 R U R' U R U' R'"
      },
      {
        "name": "T7",
        "group": "T1",
        "alg": "U R U2 R' U' R U' R' U R U R' U R U2 R'"
      },
      {
        "name": "T8",
        "group": "T1",
        "alg": "U' R' U2 R U R' U R U' R' U' R U' R' U2 R"
      },
      {
        "name": "T9",
        "group": "T1",
        "alg": "R U R' U R U' R' U R' U' R2 U' R2 U2 R"
      },
      {
        "name": "T10",
        "group": "T1",
        "alg": "R' U' R U' R' U R U' R U R2 U R2 U2 R'"
      },
      {
        "name": "T11",
        "group": "T1",
        "alg": "R U R2 U' R2 U' R2 U2 R U' R U' R'"
      },
      {
        "name": "T12",
        "group": "T1",
        "alg": "R' U' R2 U R2 U R2 U2 R' U R' U R"
      },
      {
        "name": "T13",
        "group": "T2",
        "alg": "U' R U' R2 D' r U2 r' D R2 U R'"
      },
      {
        "name": "T14",
        "group": "T2",
        "alg": "U R' U R2 D r' U2 r D' R2 U' R"
      },
      {
        "name": "T15",
        "group": "T2",
        "alg": "U' R U R' F' R U R' U' R' F R U' R' F R U R U' R' F'"
      },
      {
        "name": "T16",
        "group": "T2",
        "alg": "U' R U2 R' U2 R U R2 D' R U' R' D R U2 R U' R'"
      },
      {
        "name": "T17",
        "group": "T2",
        "alg": "U' R U R' U2 R' D' R U R' D R2 U' R' U R U' R'"
      },
      {
        "name": "T18",
        "group": "T2",
        "alg": "U R' U' R U2 R D R' U' R D' R2 U R U' R' U R"
      },
      {
        "name": "T19",
        "group": "T2",
        "alg": "U2 R U R' U' R U R2 D' R U' R' D R U2 R U' R'"
      },
      {
        "name": "T20",
        "group": "T2",
        "alg": "U2 R' U' R U R' U' R2 D R' U R D' R' U2 R' U R"
      },
      {
        "name": "T21",
        "group": "T2",
        "alg": "U' F R' D' R U R' D R U R' D' R U' R' D R U' F'"
      },
      {
        "name": "T22",
        "group": "T2",
        "alg": "U R' F' R U R' U2 R' D R U2 R' D' R U' R' F R U R"
      },
      {
        "name": "T23",
        "group": "T2",
        "alg": "U' R (U' D) R' U2 R D' R U R' U2 R U R2"
      },
      {
        "name": "T24",
        "group": "T2",
        "alg": "U R U' R' U R U R' U' R U R' U R' D' R U R' D R"
      },
      {
        "name": "T25",
        "group": "T3",
        "alg": "U R' U R U2 r' R' F R F' r"
      },
      {
        "name": "T26",
        "group": "T3",
        "alg": "U' R U' R' U2 L R U' R' U L'"
      },
      {
        "name": "T27",
        "group": "T3",
        "alg": "U' R' U' R2 U R' F' R U R' U' R' F R2 U' R' U' R' U R"
      },
      {
        "name": "T28",
        "group": "T3",
        "alg": "U' r U' r U2 R' F R U2 r2 F"
      },
      {
        "name": "T29",
        "group": "T3",
        "alg": "U' R' U' R U' R' U2 R' D' R U' R' D R U R"
      },
      {
        "name": "T30",
        "group": "T3",
        "alg": "R U R D R' U' R D' R' U2 R' U' R U' R'"
      },
      {
        "name": "T31",
        "group": "T3",
        "alg": "U R D R' U' R D' R' U' R' U R U' R' U R U R' U' R"
      },
      {
        "name": "T32",
        "group": "T3",
        "alg": "U F U' R' U2 R U F' R' U' R U R' U R"
      },
      {
        "name": "T33",
        "group": "T3",
        "alg": "U R U' R' U R U R' U' R U R' U' R' D' R U' R' D R"
      },
      {
        "name": "T34",
        "group": "T3",
        "alg": "U R U R' U R U' R' U' R' F2 R F2 L' U2 L"
      },
      {
        "name": "T35",
        "group": "T3",
        "alg": "U R' U2 R U R' U R F U R U2 R' U R U R' F'"
      },
      {
        "name": "T36",
        "group": "T3",
        "alg": "U r' U' l' U2 R U' R' U2 l R U' R' U2 r"
      },
      {
        "name": "T37",
        "group": "T4",
        "alg": "U' F R U R' U' R U' R' U' R U R' F'"
      },
      {
        "name": "T38",
        "group": "T4",
        "alg": "R U R' U2 R U' R' U2 R U' R2 F' R U R U' R' F"
      },
      {
        "name": "T39",
        "group": "T4",
        "alg": "l' U2 R' D2 R U2 R' D2 (R l)"
      },
      {
        "name": "T40",
        "group": "T4",
        "alg": "l U2 R D2 R' U2 R D2 (R' l')"
      },
      {
        "name": "T41",
        "group": "T4",
        "alg": "R U R2 D' R U2 R' D R U2 R U R' U' R U' R'"
      },
      {
        "name": "T42",
        "group": "T4",
        "alg": "R' U2 R U R' U R U' R' U2 R' D' R U2 R' D R2"
      },
      {
        "name": "T43",
        "group": "T4",
        "alg": "U2 R U R' U R' D' R U' R' D R U R U2 R'"
      },
      {
        "name": "T44",
        "group": "T4",
        "alg": "U2 R' U' R U' R D R' U R D' R' U' R' U2 R"
      },
      {
        "name": "T45",
        "group": "T4",
        "alg": "U' R U' R2 D' R U' R' D R U' R U R' U R U R'"
      },
      {
        "name": "T46",
        "group": "T4",
        "alg": "U R' U R2 D R' U R D' R' U R' U' R U' R' U' R"
      },
      {
        "name": "T47",
        "group": "T4",
        "alg": "U2 R' U' R U' F U' R' U R U F' R' U R"
      },
      {
        "name": "T48",
        "group": "T4",
        "alg": "U2 R U R' L' U2 R U' R' U2 L U R U' R'"
      },
      {
        "name": "T49",
        "group": "T5",
        "alg": "r U R' U' r' F R F'"
      },
      {
        "name": "T50",
        "group": "T5",
        "alg": "R U2 R' U2 R' F R U R U' R' F'"
      },
      {
        "name": "T51",
        "group": "T5",
        "alg": "U' R' U' R U D' R U' R U R U' R2 D"
      },
      {
        "name": "T52",
        "group": "T5",
        "alg": "U R' D R2 U' R' U R U R' U' R U R2 D' R"
      },
      {
        "name": "T53",
        "group": "T5",
        "alg": "F' U' r' F2 r U' r' F' r F"
      },
      {
        "name": "T54",
        "group": "T5",
        "alg": "R U S' R' U' R S R2 F R F'"
      },
      {
        "name": "T55",
        "group": "T5",
        "alg": "U2 R U R' U R U R' U2 L R U' R' U L'"
      },
      {
        "name": "T56",
        "group": "T5",
        "alg": "U2 R2 U R' U' R' U R' (U' D) U' R' U2 R D'"
      },
      {
        "name": "T57",
        "group": "T5",
        "alg": "U R' U' R U' R2 F' R U R U' R' F U R U' R' U2 R"
      },
      {
        "name": "T58",
        "group": "T5",
        "alg": "U' r' F R F' r U' R' U' R U R' U' R U' R'"
      },
      {
        "name": "T59",
        "group": "T5",
        "alg": "R U' R' U' R U R D R' U2 R D' R' U' R'"
      },
      {
        "name": "T60",
        "group": "T5",
        "alg": "U M U' r U R' U' R' F R F' (r' R) U M'"
      },
      {
        "name": "T61",
        "group": "T6",
        "alg": "F R F' r U R' U' r'"
      },
      {
        "name": "T62",
        "group": "T6",
        "alg": "U2 R U R' U' R' F' R U2 R U2 R' F"
      },
      {
        "name": "T63",
        "group": "T6",
        "alg": "U R U R' U' D R' U R' U' R' U R2 D'"
      },
      {
        "name": "T64",
        "group": "T6",
        "alg": "R D R' U' R D' R2 U R U' R' U' R U R' U' R"
      },
      {
        "name": "T65",
        "group": "T6",
        "alg": "U2 F U R U2 R' U R U R' F'"
      },
      {
        "name": "T66",
        "group": "T6",
        "alg": "U R U R' U' R U' R' U' F R U R' U' R' F' R"
      },
      {
        "name": "T67",
        "group": "T6",
        "alg": "U2 R' U' R U' R' U' R U2 r' R' F R F' r"
      },
      {
        "name": "T68",
        "group": "T6",
        "alg": "U R' U2 R F U' R' U R U F' R' U R"
      },
      {
        "name": "T69",
        "group": "T6",
        "alg": "U2 F R U R' U' R U R' U' F' R U R' U' R' F R F'"
      },
      {
        "name": "T70",
        "group": "T6",
        "alg": "F U R' U' R F' R' U' R U R' U R"
      },
      {
        "name": "T71",
        "group": "T6",
        "alg": "R' U R U R' U' R' D' R U2 R' D R U R"
      },
      {
        "name": "T72",
        "group": "T6",
        "alg": "U M U R' F' r U r U' r' F (r' R) U' M'"
      }
    ]
  },
  {
    "id": "zbll-u",
    "name": "ZBLL U",
    "source": "Provided by the project's user, from a personal ZBLL reference (originally a JS object named `zbll_juliette`). Where the source listed alternate algorithms for a case (separated by \"/\"), only the first is kept here.",
    "cases": [
      {
        "name": "U1",
        "group": "U1",
        "alg": "U R' F' R U R' U' R' F D' R U R' D R2"
      },
      {
        "name": "U2",
        "group": "U1",
        "alg": "U2 (l' R') D2 R U R' D2 R2 D' R' U' R D x'"
      },
      {
        "name": "U3",
        "group": "U1",
        "alg": "U2 R U R' U R U2 R2 U' R U' R' U2 R"
      },
      {
        "name": "U4",
        "group": "U1",
        "alg": "R' U' R U' R' U2 R2 U R' U R U2 R'"
      },
      {
        "name": "U5",
        "group": "U1",
        "alg": "U' R' U' R U R' U R U2 R' U R U2 R' U' R"
      },
      {
        "name": "U6",
        "group": "U1",
        "alg": "U' R U R' U' R U' R' U2 R U' R' U2 R U R'"
      },
      {
        "name": "U7",
        "group": "U1",
        "alg": "U R U2 R' U' R U' R' U' R U R' U R U2 R'"
      },
      {
        "name": "U8",
        "group": "U1",
        "alg": "U R' U2 R U R' U R U R' U' R U' R' U2 R"
      },
      {
        "name": "U9",
        "group": "U1",
        "alg": "U R U2 R2 U' R2 U' R' U R' U' R U R' U R"
      },
      {
        "name": "U10",
        "group": "U1",
        "alg": "U R' U2 R2 U R2 U R U' R U R' U' R U' R'"
      },
      {
        "name": "U11",
        "group": "U1",
        "alg": "U2 R U R' U R' U2 R2 U R2 U R2 U' R'"
      },
      {
        "name": "U12",
        "group": "U1",
        "alg": "R' U' R U' R U2 R2 U' R2 U' R2 U R"
      },
      {
        "name": "U13",
        "group": "U2",
        "alg": "R U (R' L') U2 R U' R' U' R U' M' (x')"
      },
      {
        "name": "U14",
        "group": "U2",
        "alg": "U2 L' R U R' U R U R' U2 L R U' R'"
      },
      {
        "name": "U15",
        "group": "U2",
        "alg": "R' U2 R U2 R' F' R U R' U' R' F R2"
      },
      {
        "name": "U16",
        "group": "U2",
        "alg": "U2 R2 D R' U' R D' R' U' R' U R U R'"
      },
      {
        "name": "U17",
        "group": "U2",
        "alg": "R U' R' U' R U R D R' U R D' R2"
      },
      {
        "name": "U18",
        "group": "U2",
        "alg": "U2 R' U R U R' U' R' D' R U' R' D R2"
      },
      {
        "name": "U19",
        "group": "U2",
        "alg": "U' R U2 R2 F R F' U' S' R U' R' S"
      },
      {
        "name": "U20",
        "group": "U2",
        "alg": "U' R' U2 R F U' R' U R U R' U R U' F'"
      },
      {
        "name": "U21",
        "group": "U2",
        "alg": "U F U R U' R' F' R U R' U' M' U R U' r'"
      },
      {
        "name": "U22",
        "group": "U2",
        "alg": "F U R U2 R' U R U R' U R U2 R' U R U R' F'"
      },
      {
        "name": "U23",
        "group": "U2",
        "alg": "F U R U2 R2 U2 R U R' U R U2 R U R' F'"
      },
      {
        "name": "U24",
        "group": "U2",
        "alg": "U' R U2 R2 D' R U' R' D R U' R' F R U R U' R' F'"
      },
      {
        "name": "U25",
        "group": "U3",
        "alg": "R' F R U' R' U' R U R' F' R U R' U' R' F R F' R"
      },
      {
        "name": "U26",
        "group": "U3",
        "alg": "U' F2 R U' R' U' R U R' F' R U R' U' R' F R F2'"
      },
      {
        "name": "U27",
        "group": "U3",
        "alg": "U' R2 F' R U R' U' R' F R2 U' R' U2 R2 U R' U R"
      },
      {
        "name": "U28",
        "group": "U3",
        "alg": "U R' U R U R' F' R U R' U' R' F R2 U' R' U2 R U' R' U2 R"
      },
      {
        "name": "U29",
        "group": "U3",
        "alg": "(l R) U2 R' U2 R' F R F' r U' L' U R'"
      },
      {
        "name": "U30",
        "group": "U3",
        "alg": "(r' L') U2 L U2 r U' r' F R' F R F' r"
      },
      {
        "name": "U31",
        "group": "U3",
        "alg": "U' r U R' U' r' F R2 U' R' U' R U2 R' U' F'"
      },
      {
        "name": "U32",
        "group": "U3",
        "alg": "U F U R U2 R' U R U2 R' U' R' F' R U2 R U2 R'"
      },
      {
        "name": "U33",
        "group": "U3",
        "alg": "U F U R U2 R' U R U R2 F' r U R U' r'"
      },
      {
        "name": "U34",
        "group": "U3",
        "alg": "U' F' U' r' F2 r U' r' F' r2 U R' U' r' F R"
      },
      {
        "name": "U35",
        "group": "U3",
        "alg": "U' R' U' R F R2 D' R U R' D R2 U' F'"
      },
      {
        "name": "U36",
        "group": "U3",
        "alg": "U' F U R2 D' R U' R' D R2 F' R' U R"
      },
      {
        "name": "U37",
        "group": "U4",
        "alg": "F R U' R' U R U R' U R U' R' F'"
      },
      {
        "name": "U38",
        "group": "U4",
        "alg": "U F' R U R' U' R' F R2 U R' U2 R U R' U2 R U' R'"
      },
      {
        "name": "U39",
        "group": "U4",
        "alg": "U2 (l' R') D2 R U2 R' D2 R U2 l"
      },
      {
        "name": "U40",
        "group": "U4",
        "alg": "(l R) D2 R' U2 R D2 R' U2 l'"
      },
      {
        "name": "U41",
        "group": "U4",
        "alg": "R U R' U R U' R' U2 R' D' R U2 R' D R2 U' R'"
      },
      {
        "name": "U42",
        "group": "U4",
        "alg": "U R2 D' R U2 R' D R U2 R U R' U' R U' R' U2 R"
      },
      {
        "name": "U43",
        "group": "U4",
        "alg": "R' U2 R U R' U R' D' R U' R' D R U R"
      },
      {
        "name": "U44",
        "group": "U4",
        "alg": "U2 R U2 R' U' R' D' R U R' D R U' R U' R'"
      },
      {
        "name": "U45",
        "group": "U4",
        "alg": "U' R U' R' U' R U' R' U R' D' R U R' D R2 U R'"
      },
      {
        "name": "U46",
        "group": "U4",
        "alg": "U' R' U R U R' U R U' R D R' U' R D' R2 U' R"
      },
      {
        "name": "U47",
        "group": "U4",
        "alg": "R' U' R U2 R' F' R U R' U' R' F R2 U2 R' U R"
      },
      {
        "name": "U48",
        "group": "U4",
        "alg": "U2 R U R' U R U R' U2 R U' R2 D' R U' R' D R"
      },
      {
        "name": "U49",
        "group": "U5",
        "alg": "R2 D' R U2 R' D R U2 R"
      },
      {
        "name": "U50",
        "group": "U5",
        "alg": "R2 D' r U2 r' D R U2 R"
      },
      {
        "name": "U51",
        "group": "U5",
        "alg": "U R' U' R2 D R' U' R D' R2 U2 R"
      },
      {
        "name": "U52",
        "group": "U5",
        "alg": "U2 R' U R U R' U2 R U R D R' U2 R D' R'"
      },
      {
        "name": "U53",
        "group": "U5",
        "alg": "R U' R' D R' U' R D' R2 U R' U' R' U2 R'"
      },
      {
        "name": "U54",
        "group": "U5",
        "alg": "U' R2 F' R U2 R U2 R' F U' R U R' U' R"
      },
      {
        "name": "U55",
        "group": "U5",
        "alg": "R D r' U2 r D' R' U2 R' U R U R' U R"
      },
      {
        "name": "U56",
        "group": "U5",
        "alg": "R2 U' S R2 S' R2 (U D') R U2 R' D R U2 R"
      },
      {
        "name": "U57",
        "group": "U5",
        "alg": "U F U R U2 R' U R U2 R2 F R F' R U' R' F'"
      },
      {
        "name": "U58",
        "group": "U5",
        "alg": "F U R U' R D R' U' R D' R2 U R U R' F'"
      },
      {
        "name": "U59",
        "group": "U5",
        "alg": "U' R' U2 R' D' R U2 R' D R U2 R U R' U R"
      },
      {
        "name": "U60",
        "group": "U5",
        "alg": "U' R' U R U' R' U' R U2 R D R' U' R D' R2 U' R"
      },
      {
        "name": "U61",
        "group": "U6",
        "alg": "U2 R2 D R' U2 R D' R' U2 R'"
      },
      {
        "name": "U62",
        "group": "U6",
        "alg": "U2 R2 D r' U2 r D' R' U2 R'"
      },
      {
        "name": "U63",
        "group": "U6",
        "alg": "U R U R2 D' R U R' D R2 U2 R'"
      },
      {
        "name": "U64",
        "group": "U6",
        "alg": "R U' R' U' R U2 R' U' R' D' R U2 R' D R"
      },
      {
        "name": "U65",
        "group": "U6",
        "alg": "R' U' R U R U R' U' R' U F R U R U' R' F'"
      },
      {
        "name": "U66",
        "group": "U6",
        "alg": "U' R U R' U R U' R' U F' R U2 R' U2 R' F R"
      },
      {
        "name": "U67",
        "group": "U6",
        "alg": "U2 R' D' r U2 r' D R U2 R U' R' U' R U' R'"
      },
      {
        "name": "U68",
        "group": "U6",
        "alg": "U R' U R' (U' D') R U' R' U2 R U' R' D R U' R"
      },
      {
        "name": "U69",
        "group": "U6",
        "alg": "U' F' U' L' U2 L U' L' U2 L2 F' L' F L' U L F"
      },
      {
        "name": "U70",
        "group": "U6",
        "alg": "U R U R' U R U' R' U R U' R' U' r' F R F' M'"
      },
      {
        "name": "U71",
        "group": "U6",
        "alg": "U' R U2 R D R' U2 R D' R' U2 R' U' R U' R'"
      },
      {
        "name": "U72",
        "group": "U6",
        "alg": "U' R U' R' U R U R' U2 R' D' R U R' D R2 U R'"
      }
    ]
  },
  {
    "id": "zbll-l",
    "name": "ZBLL L",
    "source": "Provided by the project's user, from a personal ZBLL reference (originally a JS object named `zbll_juliette`). Where the source listed alternate algorithms for a case (separated by \"/\"), only the first is kept here.",
    "cases": [
      {
        "name": "L1",
        "group": "L1",
        "alg": "U' R' U' R' F D' R U R' D R2 U' R' F' R"
      },
      {
        "name": "L2",
        "group": "L1",
        "alg": "U2 R U R' U R U' R' U R U' R' U R U2 R'"
      },
      {
        "name": "L3",
        "group": "L1",
        "alg": "R U2 R' U' R U' R' U2 R U R' U R U2 R'"
      },
      {
        "name": "L4",
        "group": "L1",
        "alg": "R U R' U R U2 R' U2 R U2 R' U' R U' R'"
      },
      {
        "name": "L5",
        "group": "L1",
        "alg": "R U R' U R U2 R' U R' U' R U' R' U2 R"
      },
      {
        "name": "L6",
        "group": "L1",
        "alg": "R2 U' R U R U' R' U' R U' R' U R' U R2"
      },
      {
        "name": "L7",
        "group": "L1",
        "alg": "U' R' U' R U' R' U2 R U' R U R' U R U2 R'"
      },
      {
        "name": "L8",
        "group": "L1",
        "alg": "U' R2 U R' U' R' U R U R' U R U' R U' R2"
      },
      {
        "name": "L9",
        "group": "L1",
        "alg": "R U2 R' U' R U' R' U R' U2 R U R' U R"
      },
      {
        "name": "L10",
        "group": "L1",
        "alg": "U2 R2 U R' U R' U' R U' R' U' R U R U' R2"
      },
      {
        "name": "L11",
        "group": "L1",
        "alg": "U' R' U2 R U R' U R U' R U2 R' U' R U' R'"
      },
      {
        "name": "L12",
        "group": "L1",
        "alg": "U R2 U' R U' R U R' U R U R' U' R' U R2"
      },
      {
        "name": "L13",
        "group": "L2",
        "alg": "F R U R2 F R F' R U' R' F'"
      },
      {
        "name": "L14",
        "group": "L2",
        "alg": "R' (U' D) R' U' R D' R2 U R' U' R2 U2 R"
      },
      {
        "name": "L15",
        "group": "L2",
        "alg": "U2 R' U' R U R' F' R U R' U' R' F R2"
      },
      {
        "name": "L16",
        "group": "L2",
        "alg": "U2 L' U2 R U' R' U2 L R U' R'"
      },
      {
        "name": "L17",
        "group": "L2",
        "alg": "R' U R U' R' U' R U' R' U R2 D R' U' R D' R'"
      },
      {
        "name": "L18",
        "group": "L2",
        "alg": "U' R U' R' U R U R' U R U' R2 D' R U R' D R"
      },
      {
        "name": "L19",
        "group": "L2",
        "alg": "U' r U2 r2' R F R' F' r2 U2 r'"
      },
      {
        "name": "L20",
        "group": "L2",
        "alg": "r U2 r2' F R F' R' r2 U2 r'"
      },
      {
        "name": "L21",
        "group": "L2",
        "alg": "F R U R' U' F' r U r' U R U' M' U' r'"
      },
      {
        "name": "L22",
        "group": "L2",
        "alg": "U' r U r' R U R' U' r U' r' F U R U' R' F'"
      },
      {
        "name": "L23",
        "group": "L2",
        "alg": "R U' R' U R U' R' U' R U R' U2 R' D' R U R' D R"
      },
      {
        "name": "L24",
        "group": "L2",
        "alg": "U' R' D' R U' R' D R U2 R U' R' U R U R' U' R U R'"
      },
      {
        "name": "L25",
        "group": "L3",
        "alg": "F R' F' r U R U' r'"
      },
      {
        "name": "L26",
        "group": "L3",
        "alg": "F R U R' U' R' F' R U2 R U2 R'"
      },
      {
        "name": "L27",
        "group": "L3",
        "alg": "U' R2 U R' U' R' U R' D U' R' U R D'"
      },
      {
        "name": "L28",
        "group": "L3",
        "alg": "R U' R' U R U' R' U' R U R2 D' R U' R' D R"
      },
      {
        "name": "L29",
        "group": "L3",
        "alg": "U2 R' F' R U R' U' R' F R U' R U R' U R"
      },
      {
        "name": "L30",
        "group": "L3",
        "alg": "U' L R U' R' U L' R U R' U R U' R'"
      },
      {
        "name": "L31",
        "group": "L3",
        "alg": "U' L U' R U R' L' U2 R U' R' U' R U' R'"
      },
      {
        "name": "L32",
        "group": "L3",
        "alg": "U L U r' D' F r U r' F' D r U2 L'"
      },
      {
        "name": "L33",
        "group": "L3",
        "alg": "U' R' U2 R U R' U' F' R U R' U' R' F R2 U R' U R"
      },
      {
        "name": "L34",
        "group": "L3",
        "alg": "U' R U R' U R U' R' U' r' F R F' M'"
      },
      {
        "name": "L35",
        "group": "L3",
        "alg": "S U2 R' U2 R U2 F R f'"
      },
      {
        "name": "L36",
        "group": "L3",
        "alg": "U' R' U2 R2 U R' U' R' U2 F R U R U' R' F'"
      },
      {
        "name": "L37",
        "group": "L4",
        "alg": "U F' r U R' U' r' F R"
      },
      {
        "name": "L38",
        "group": "L4",
        "alg": "U2 R2' D' r U2 (r' R) U R' D R U R"
      },
      {
        "name": "L39",
        "group": "L4",
        "alg": "U F U R U2 R' U R2 D R' U R D' R2 F'"
      },
      {
        "name": "L40",
        "group": "L4",
        "alg": "U F' R U2 R' U2 R' F R U R U' R'"
      },
      {
        "name": "L41",
        "group": "L4",
        "alg": "U2 F R U' R' U' R U2 R' U' F'"
      },
      {
        "name": "L42",
        "group": "L4",
        "alg": "U2 R' F R U R U' R' F' U R U R' U R U' R'"
      },
      {
        "name": "L43",
        "group": "L4",
        "alg": "r' F R' F' (r R) U2 R' U R U R' U R"
      },
      {
        "name": "L44",
        "group": "L4",
        "alg": "R' U' R F U' R' U' R U F' R' U2 R"
      },
      {
        "name": "L45",
        "group": "L4",
        "alg": "U' F R' F' R U R U' R' F U R U' R' U R U' R' F'"
      },
      {
        "name": "L46",
        "group": "L4",
        "alg": "R' U' R U' R' U R F R' U R U' F'"
      },
      {
        "name": "L47",
        "group": "L4",
        "alg": "U' R' U' R' D' R U2 R' D R U R U' R' U' R"
      },
      {
        "name": "L48",
        "group": "L4",
        "alg": "U F' R U2 R' U2 R' F U2 R U R U' R2 U2 R"
      },
      {
        "name": "L49",
        "group": "L5",
        "alg": "U' R' U2 R' D' R U2 R' D R2"
      },
      {
        "name": "L50",
        "group": "L5",
        "alg": "U' R' U2 R' D' r U2 r' D R2"
      },
      {
        "name": "L51",
        "group": "L5",
        "alg": "U2 R' U2 R U R2 D' R U R' D R2"
      },
      {
        "name": "L52",
        "group": "L5",
        "alg": "R D R' U2 R D' R' U' R' U2 R U' R' U' R"
      },
      {
        "name": "L53",
        "group": "L5",
        "alg": "U2 F R U' R' U R U R2 D' R U R' D R2 U' R' F'"
      },
      {
        "name": "L54",
        "group": "L5",
        "alg": "U' R' U R U' R' U F' R U2 R' U2 R' F R2"
      },
      {
        "name": "L55",
        "group": "L5",
        "alg": "U2 R' U' R U' R' U' R U2 R D r' U2 r D' R'"
      },
      {
        "name": "L56",
        "group": "L5",
        "alg": "U' R' U2 R' D' R U2 R' (U' D) (F B') R2 (F' B) U' R2"
      },
      {
        "name": "L57",
        "group": "L5",
        "alg": "U' R' U2 R U2 R' U' R2 D R' U2 R D' R2 U2 R"
      },
      {
        "name": "L58",
        "group": "L5",
        "alg": "U2 F R U' R' U' R2 D R' U R D' R' U R' U' F'"
      },
      {
        "name": "L59",
        "group": "L5",
        "alg": "F' R U R' U' R' F R2 U' R' U' R U' R' U R U R'"
      },
      {
        "name": "L60",
        "group": "L5",
        "alg": "U' R' U R2 D R' U R D' R' U2 R' U R U R' U' R"
      },
      {
        "name": "L61",
        "group": "L6",
        "alg": "R U2 R D R' U2 R D' R2"
      },
      {
        "name": "L62",
        "group": "L6",
        "alg": "U' R' F' R U R' U' R' F R2 U' R' U2 R"
      },
      {
        "name": "L63",
        "group": "L6",
        "alg": "U R U2 R' U' R2 D R' U' R D' R2"
      },
      {
        "name": "L64",
        "group": "L6",
        "alg": "U' R' D' R U2 R' D R U R U2 R' U R U R'"
      },
      {
        "name": "L65",
        "group": "L6",
        "alg": "U F R U R' U' R' F' U' R U R U' R' U' R' U R"
      },
      {
        "name": "L66",
        "group": "L6",
        "alg": "U R' F' R U2 R U2 R' F U' R U R' U' R U' R'"
      },
      {
        "name": "L67",
        "group": "L6",
        "alg": "U R U R' U R U R' U2 R' D' r U2 r' D R"
      },
      {
        "name": "L68",
        "group": "L6",
        "alg": "R' U R' D' R U R' U2 R U R' (U D) R U' R"
      },
      {
        "name": "L69",
        "group": "L6",
        "alg": "R U2 R' U2 R U R2 D' R U2 R' D R2 U2 R'"
      },
      {
        "name": "L70",
        "group": "L6",
        "alg": "U2 R' F' R U R' U' R' F D' R U' R' D R2 U R' U R"
      },
      {
        "name": "L71",
        "group": "L6",
        "alg": "U R U R' U R U2 R D R' U2 R D' R' U2 R'"
      },
      {
        "name": "L72",
        "group": "L6",
        "alg": "R U' R2 D' R U' R' D R U2 R U' R' U' R U R'"
      }
    ]
  },
  {
    "id": "zbll-h",
    "name": "ZBLL H",
    "source": "Provided by the project's user, from a personal ZBLL reference (originally a JS object named `zbll_juliette`). Where the source listed alternate algorithms for a case (separated by \"/\"), only the first is kept here.",
    "cases": [
      {
        "name": "H1",
        "group": "H1",
        "alg": "R U R' U R U' R' U R U' R' U R' U' R2 U' R' U R' U R"
      },
      {
        "name": "H2",
        "group": "H1",
        "alg": "R U R' U R U2 R' U' R' U2 R U R' U R"
      },
      {
        "name": "H3",
        "group": "H1",
        "alg": "U' R U2 R' U' R U R' U' R U' R'"
      },
      {
        "name": "H4",
        "group": "H1",
        "alg": "U' R' U2 R U R' U' R U R' U R"
      },
      {
        "name": "H5",
        "group": "H1",
        "alg": "U2 R U R' U R U' R' U R U2 R'"
      },
      {
        "name": "H6",
        "group": "H1",
        "alg": "R' U' R U' R' U R U' R' U2 R"
      },
      {
        "name": "H7",
        "group": "H1",
        "alg": "U R U2 R' U' R U' R' U' R' U' R U' R' U2 R"
      },
      {
        "name": "H8",
        "group": "H1",
        "alg": "U R' U2 R U R' U R U R U R' U R U2 R'"
      },
      {
        "name": "H9",
        "group": "H2",
        "alg": "U F U R U' R' U R U' R' U R U' R' F'"
      },
      {
        "name": "H10",
        "group": "H2",
        "alg": "x' U' R U' R' U R' F2 R U' R U R' U x"
      },
      {
        "name": "H11",
        "group": "H2",
        "alg": "U' R U R' U y' R' U R U' R2 F R F' R"
      },
      {
        "name": "H12",
        "group": "H2",
        "alg": "U' R' U' R U' y R U' R' U (l R) U' R' U l'"
      },
      {
        "name": "H13",
        "group": "H2",
        "alg": "R' F' R U R' U' R' F D' R U2 R' D R U R U' R' U' R"
      },
      {
        "name": "H14",
        "group": "H2",
        "alg": "R' U' F' U F R U' F U R U' R' U R U' R' F'"
      },
      {
        "name": "H15",
        "group": "H2",
        "alg": "R' U2 R U R' U R U R' U' R U R' F' R U R' U' R' F R2"
      },
      {
        "name": "H16",
        "group": "H2",
        "alg": "R U' R' U R U R' U' L U L' U' R U R' U2 L U L'"
      },
      {
        "name": "H17",
        "group": "H3",
        "alg": "R U R' U R U r' F R' F' r"
      },
      {
        "name": "H18",
        "group": "H3",
        "alg": "R' F' R U2 R U2 R' F U' R U' R'"
      },
      {
        "name": "H19",
        "group": "H3",
        "alg": "U R U R' U R U2 R' F R U' R' U' R U2 R' U' F'"
      },
      {
        "name": "H20",
        "group": "H3",
        "alg": "R' U' R D' R U' R' U2 R U2 R U R U' R2 D"
      },
      {
        "name": "H21",
        "group": "H3",
        "alg": "U' R U R2 F R F' r U' r' U r U r'"
      },
      {
        "name": "H22",
        "group": "H3",
        "alg": "U R' F R' F' R2 U' r' U r U' r' U' r"
      },
      {
        "name": "H23",
        "group": "H3",
        "alg": "F R' F' R U2 R U2 R' U' R' F2 r U r' F R"
      },
      {
        "name": "H24",
        "group": "H3",
        "alg": "U2 R' U' R U' R' U F' R U R' U' R' F R2 U' R' U R"
      },
      {
        "name": "H25",
        "group": "H3",
        "alg": "U' R U2 R' U' R2 D R' U R D' R2 U' R U' R'"
      },
      {
        "name": "H26",
        "group": "H3",
        "alg": "U R' U2 R U R2' D' R U' R' D R2 U R' U R"
      },
      {
        "name": "H27",
        "group": "H3",
        "alg": "U' R' U2 R U R' U' F' R U R' U' R' F R U2 R"
      },
      {
        "name": "H28",
        "group": "H3",
        "alg": "U2 R2 D' R U' R' D R2 U' R2 D' R U2 R' D R2"
      },
      {
        "name": "H29",
        "group": "H4",
        "alg": "F R U' R' U R U2 R' U' R U R' U' F'"
      },
      {
        "name": "H30",
        "group": "H4",
        "alg": "U F R U R' U' R' F' U2 R U R' U R2 U2 R'"
      },
      {
        "name": "H31",
        "group": "H4",
        "alg": "F U R U' R' F' r' F' r U r U' r' F"
      },
      {
        "name": "H32",
        "group": "H4",
        "alg": "U' R' U' F' U F R U R U R' U' R' F R F'"
      },
      {
        "name": "H33",
        "group": "H4",
        "alg": "U R U2 R' U' R U R' U' F' R U R' U' R' F R2 U' R'"
      },
      {
        "name": "H34",
        "group": "H4",
        "alg": "U2 R' F' R U R' U' R' F D' R U' R' D R U2 R"
      },
      {
        "name": "H35",
        "group": "H4",
        "alg": "U2 F U' R U2 R' U2 R U' R' U' R U R' U F'"
      },
      {
        "name": "H36",
        "group": "H4",
        "alg": "U2 R' F R U R' U' F' R U' R' U R' F R F' U R"
      },
      {
        "name": "H37",
        "group": "H4",
        "alg": "U R U2 R2 F U' R2 U' R2 U F' U R"
      },
      {
        "name": "H38",
        "group": "H4",
        "alg": "U R U2 R' U' R U R' U2 R' F R2 U' R' U' R U R' F'"
      },
      {
        "name": "H39",
        "group": "H4",
        "alg": "U R' U2 R U2 R2 F' R U R U' R' F U R"
      },
      {
        "name": "H40",
        "group": "H4",
        "alg": "U' F' R U2 R' U2 R' F R U R U R' U' R U' R'"
      }
    ]
  },
  {
    "id": "zbll-pi",
    "name": "ZBLL Pi",
    "source": "Provided by the project's user, from a personal ZBLL reference (originally a JS object named `zbll_juliette`). Where the source listed alternate algorithms for a case (separated by \"/\"), only the first is kept here.",
    "cases": [
      {
        "name": "Pi1",
        "group": "Pi1",
        "alg": "F R U R' U' R U R' U' F' R U R' U' M' U R U' r'"
      },
      {
        "name": "Pi2",
        "group": "Pi1",
        "alg": "U R U R' U R U2 R' U R U R' U R U2 R'"
      },
      {
        "name": "Pi3",
        "group": "Pi1",
        "alg": "R' U2 R2 U R2 U R2 U2 R'"
      },
      {
        "name": "Pi4",
        "group": "Pi1",
        "alg": "R U2 R2 U' R2 U' R2 U2 R"
      },
      {
        "name": "Pi5",
        "group": "Pi1",
        "alg": "U R U2 R' U' R U' R2 U' R U' R' U2 R"
      },
      {
        "name": "Pi6",
        "group": "Pi1",
        "alg": "U R U R' U R U2 R2 U2 R U R' U R"
      },
      {
        "name": "Pi7",
        "group": "Pi1",
        "alg": "R U R' U' R' U2 R U R' U R2 U2 R'"
      },
      {
        "name": "Pi8",
        "group": "Pi1",
        "alg": "R U R' U R U2 R' U' R U R' U R U2 R'"
      },
      {
        "name": "Pi9",
        "group": "Pi1",
        "alg": "U R' U2 R U2 R' U R U2 R' U R U2 R' U' R"
      },
      {
        "name": "Pi10",
        "group": "Pi1",
        "alg": "U' R U2 R' U2 R U' R' U2 R U' R' U2 R U R'"
      },
      {
        "name": "Pi11",
        "group": "Pi1",
        "alg": "U2 R' U R U' R2 U2 R U R' U R2 U' R' U R"
      },
      {
        "name": "Pi12",
        "group": "Pi1",
        "alg": "U2 R U' R' U R2 U2 R' U' R U' R2 U R U' R'"
      },
      {
        "name": "Pi13",
        "group": "Pi2",
        "alg": "U' R U R' U r' F R F' r U' R' U R U2 R'"
      },
      {
        "name": "Pi14",
        "group": "Pi2",
        "alg": "F U R' U' R2 U' R2 U2 R U2 R U R' F'"
      },
      {
        "name": "Pi15",
        "group": "Pi2",
        "alg": "F R2' U' R U' R U' R' U2 R' U R2 F'"
      },
      {
        "name": "Pi16",
        "group": "Pi2",
        "alg": "U2 F R2 U' R U2 R U R' U R' U R2 F'"
      },
      {
        "name": "Pi17",
        "group": "Pi2",
        "alg": "U2 R U R' U R U R' U' R U R D R' U R D' R2"
      },
      {
        "name": "Pi18",
        "group": "Pi2",
        "alg": "R2 D' R U R' D R U R U' R' U R U R' U R"
      },
      {
        "name": "Pi19",
        "group": "Pi2",
        "alg": "U R U2 R' U' F' R U2 R' U' R U' R' F R U' R'"
      },
      {
        "name": "Pi20",
        "group": "Pi2",
        "alg": "r' U' R U' R' U R U' R' U R' F R F' U r"
      },
      {
        "name": "Pi21",
        "group": "Pi2",
        "alg": "R (U D') R U R' D R2 U' R' U' R2 U2 R"
      },
      {
        "name": "Pi22",
        "group": "Pi2",
        "alg": "U2 R U2 R' U R' D' R U R' D R2 U' R' U R U' R'"
      },
      {
        "name": "Pi23",
        "group": "Pi2",
        "alg": "U' r U R' U R' F R F' R U' R' U R U2 r'"
      },
      {
        "name": "Pi24",
        "group": "Pi2",
        "alg": "U R U R' U' R U R2 D' R U' R' D R U' R U2 R'"
      },
      {
        "name": "Pi25",
        "group": "Pi3",
        "alg": "U2 r' F R F' r U' R' U' R U' R'"
      },
      {
        "name": "Pi26",
        "group": "Pi3",
        "alg": "U' R U R' U F' R U2 R' U2 R' F R"
      },
      {
        "name": "Pi27",
        "group": "Pi3",
        "alg": "U' F U R U2 R' U R U R' F' R U2 R' U' R U' R'"
      },
      {
        "name": "Pi28",
        "group": "Pi3",
        "alg": "U2 R U2 R' U' R U r' F2 r U2 R' U' r' F r"
      },
      {
        "name": "Pi29",
        "group": "Pi3",
        "alg": "U2 R U R' F' R U R' U' R' F R U R U' R' U R U2 R'"
      },
      {
        "name": "Pi30",
        "group": "Pi3",
        "alg": "U R U R' U R U' R2 F R2 U' R' U' R U R' F' R U' R'"
      },
      {
        "name": "Pi31",
        "group": "Pi3",
        "alg": "R' U' R U R2 F' R U R U' R' F U' R U R' U R"
      },
      {
        "name": "Pi32",
        "group": "Pi3",
        "alg": "U2 R' F' r U' r' F2 R U R U2 R' U2 R' F R F'"
      },
      {
        "name": "Pi33",
        "group": "Pi3",
        "alg": "R U2 R D' R U' R' D R' U' R2 U2 R"
      },
      {
        "name": "Pi34",
        "group": "Pi3",
        "alg": "R' U' R U' R2 D' R U R' D R2 U' R' U2 R"
      },
      {
        "name": "Pi35",
        "group": "Pi3",
        "alg": "U2 R' U2 R' F' R U R U' R' F U R U' R' U2 R"
      },
      {
        "name": "Pi36",
        "group": "Pi3",
        "alg": "U2 R' U R U' R' U R U R' U2 r' F R F' r"
      },
      {
        "name": "Pi37",
        "group": "Pi4",
        "alg": "U F U R U' R' U R U2 R' U' R U R' F'"
      },
      {
        "name": "Pi38",
        "group": "Pi4",
        "alg": "R2 F R U R U' R' F' R U' R' U' R U R' U R"
      },
      {
        "name": "Pi39",
        "group": "Pi4",
        "alg": "U' r' F' r U' r' F2 r2 U R' U' r' F R F'"
      },
      {
        "name": "Pi40",
        "group": "Pi4",
        "alg": "U' R U R' U R U2 R2 U' R' F R U R U' R' F' R"
      },
      {
        "name": "Pi41",
        "group": "Pi4",
        "alg": "F R U R' U' R' F' R U2 R' U' R2 U' R2 U2 R"
      },
      {
        "name": "Pi42",
        "group": "Pi4",
        "alg": "U R U R2 F' R U R U' R' F U R U' R' U R U2 R'"
      },
      {
        "name": "Pi43",
        "group": "Pi4",
        "alg": "U' F U' R U' R' U R U R' U2 R U2 R' U F'"
      },
      {
        "name": "Pi44",
        "group": "Pi4",
        "alg": "U R2 D' R U' R' D R U R' D' R U R' D R U R U' R' U' R"
      },
      {
        "name": "Pi45",
        "group": "Pi4",
        "alg": "U2 R U R D R' U' R D' R U' R U' R' U2 R"
      },
      {
        "name": "Pi46",
        "group": "Pi4",
        "alg": "U R U R' U R' D R2 U' R' U R U' R D' R' U' R'"
      },
      {
        "name": "Pi47",
        "group": "Pi4",
        "alg": "R' U' F' R U R' U' R' F R2 U2 R' U2 R"
      },
      {
        "name": "Pi48",
        "group": "Pi4",
        "alg": "U' R U R' U R U' R' U' R' F' R U2 R U2 R' F"
      },
      {
        "name": "Pi49",
        "group": "Pi5",
        "alg": "F U R U' R' U R U' R2 F' R U R U' R'"
      },
      {
        "name": "Pi50",
        "group": "Pi5",
        "alg": "U F U R U2 R' U2 R U R2 F' R U2 R U2 R'"
      },
      {
        "name": "Pi51",
        "group": "Pi5",
        "alg": "U' R U R' U R U' R' U F2 r U2 r' U' r' F r"
      },
      {
        "name": "Pi52",
        "group": "Pi5",
        "alg": "U R U R' U' R U R2 D' R U R' D R U R U' R' U R U2 R'"
      },
      {
        "name": "Pi53",
        "group": "Pi5",
        "alg": "U2 R' U2 R U R' U' R U R2 F R U R U' R' F' R"
      },
      {
        "name": "Pi54",
        "group": "Pi5",
        "alg": "U R2 F R U R U' R' F' R U2 R U R2 U R2 U2 R'"
      },
      {
        "name": "Pi55",
        "group": "Pi5",
        "alg": "U R' U' R U' B2 R' U2 R U2 l U2 l'"
      },
      {
        "name": "Pi56",
        "group": "Pi5",
        "alg": "R' F2 R U2 R U2 R' F2 U' R U' R'"
      },
      {
        "name": "Pi57",
        "group": "Pi5",
        "alg": "U' R' U' R U' R' U R U' R' U R' D' R U R' D R2"
      },
      {
        "name": "Pi58",
        "group": "Pi5",
        "alg": "R2 D R' U R D' R' U R' U' R U R' U' R U' R'"
      },
      {
        "name": "Pi59",
        "group": "Pi5",
        "alg": "R' U' R' D' R U' R' D R2 U R' U' R U R' U R"
      },
      {
        "name": "Pi60",
        "group": "Pi5",
        "alg": "R U R' U R U' R' U R2 D R' U' R D' R' U' R'"
      },
      {
        "name": "Pi61",
        "group": "Pi6",
        "alg": "R U R' U' R' F R2 U R' U' R U R' U' F'"
      },
      {
        "name": "Pi62",
        "group": "Pi6",
        "alg": "U2 R U2 R' U2 R' F R2 U' R' U2 R U2 R' U' F'"
      },
      {
        "name": "Pi63",
        "group": "Pi6",
        "alg": "r' F' r U r U2 r' F2 U' R U R' U' R U' R'"
      },
      {
        "name": "Pi64",
        "group": "Pi6",
        "alg": "U' R' U' R U R' U' R2 D R' U' R D' R' U' R' U R U' R' U2 R"
      },
      {
        "name": "Pi65",
        "group": "Pi6",
        "alg": "R U2 R2 U' R2 U' R' U2 R' F R U R' U' R' F' R2"
      },
      {
        "name": "Pi66",
        "group": "Pi6",
        "alg": "R' F R U R' U' R' F' R2 U' R' U R U' R' U2 R"
      },
      {
        "name": "Pi67",
        "group": "Pi6",
        "alg": "R U R' U F2 R U2 R' U2 R' F2 R"
      },
      {
        "name": "Pi68",
        "group": "Pi6",
        "alg": "(R U R' U R U2' R') U' (R U' L' U R' U' L)"
      },
      {
        "name": "Pi69",
        "group": "Pi6",
        "alg": "U R U R' U R U' R' U R U' R D R' U' R D' R2"
      },
      {
        "name": "Pi70",
        "group": "Pi6",
        "alg": "R2 D' R U' R' D R U' R U R' U' R U R' U R"
      },
      {
        "name": "Pi71",
        "group": "Pi6",
        "alg": "R U R D R' U R D' R2 U' R U R' U' R U' R'"
      },
      {
        "name": "Pi72",
        "group": "Pi6",
        "alg": "R' U' R U' R' U R U' R2 D' R U R' D R U R"
      }
    ]
  },
  {
    "id": "zbll-s",
    "name": "ZBLL S",
    "source": "Provided by the project's user, from a personal ZBLL reference (originally a JS object named `zbll_juliette`). Where the source listed alternate algorithms for a case (separated by \"/\"), only the first is kept here.",
    "cases": [
      {
        "name": "S1",
        "group": "S1",
        "alg": "U' R' U R2 U R' U R U2 R U2 R U R' U R2"
      },
      {
        "name": "S2",
        "group": "S1",
        "alg": "U' R' U2 R2 U R  U' R' U R U R2 U' R'"
      },
      {
        "name": "S3",
        "group": "S1",
        "alg": "R U R' U R U2 R'"
      },
      {
        "name": "S4",
        "group": "S1",
        "alg": "U' R' U2 R U R' U R"
      },
      {
        "name": "S5",
        "group": "S1",
        "alg": "R U R2 U' R2 U' R2 U2 R2 U2 R'"
      },
      {
        "name": "S6",
        "group": "S1",
        "alg": "U2 R' U' R U' R U R2 U R2 U2 R'"
      },
      {
        "name": "S7",
        "group": "S1",
        "alg": "U' R U R' U' R' U2 R U R U' R' U R' U R"
      },
      {
        "name": "S8",
        "group": "S1",
        "alg": "U' R' U' R U R U R' U' R' U R U R U' R'"
      },
      {
        "name": "S9",
        "group": "S1",
        "alg": "R U R' U R U' R' U R' U' R2 U' R' U R' U R"
      },
      {
        "name": "S10",
        "group": "S1",
        "alg": "R U R' U R U R U R U R U' R' U' R2"
      },
      {
        "name": "S11",
        "group": "S1",
        "alg": "U R U R' U R' U' R2 U' R' U R' U' R U R' U R"
      },
      {
        "name": "S12",
        "group": "S1",
        "alg": "R U R' U R U' R' U R' U' R' U R U' R' U' R2 U R"
      },
      {
        "name": "S13",
        "group": "S2",
        "alg": "F U' R' U R U F' R U R2 U R2 U2 R'"
      },
      {
        "name": "S14",
        "group": "S2",
        "alg": "U R' D' R U' R' D R U2 R U R' U2 R U R'"
      },
      {
        "name": "S15",
        "group": "S2",
        "alg": "R' U2 R U R' U' R F U' R' U' R U F'"
      },
      {
        "name": "S16",
        "group": "S2",
        "alg": "R' U R U2 R' U R U2 R D R' U' R D' R'"
      },
      {
        "name": "S17",
        "group": "S2",
        "alg": "L' U2 R U' R' U2 L U R U' R' U R U2 R'"
      },
      {
        "name": "S18",
        "group": "S2",
        "alg": "U F R U R' U' R U R2 U' F' U R U R U' R'"
      },
      {
        "name": "S19",
        "group": "S2",
        "alg": "U2 R U R' F' R U R' U R U2 R' F R U' R'"
      },
      {
        "name": "S20",
        "group": "S2",
        "alg": "U R U2 L' R' U2 R U2 R' U2 L U' R U' R'"
      },
      {
        "name": "S21",
        "group": "S2",
        "alg": "U' R U' R2 U2 D' R U R' U D R2 U R'"
      },
      {
        "name": "S22",
        "group": "S2",
        "alg": "U F U R' F R F' R U' R' U R U' R' F'"
      },
      {
        "name": "S23",
        "group": "S2",
        "alg": "R U R' U' L' U R U' L U' L' U R' U' L"
      },
      {
        "name": "S24",
        "group": "S2",
        "alg": "F R U' R U2 R' U2 R' U' R U2 R' U' R2 U' R2 F'"
      },
      {
        "name": "S25",
        "group": "S3",
        "alg": "R U' L' U R' U' L"
      },
      {
        "name": "S26",
        "group": "S3",
        "alg": "U R' U2 R U R' U' R' D' R U2 R' D R2"
      },
      {
        "name": "S27",
        "group": "S3",
        "alg": "U' R' D U' R' U R U2 D' R2 U R' U' R'"
      },
      {
        "name": "S28",
        "group": "S3",
        "alg": "U R' U' R' U R2 D' U2 R U R' U' D R'"
      },
      {
        "name": "S29",
        "group": "S3",
        "alg": "R2 D R' U2 R D' R' U' R' U R U2 R'"
      },
      {
        "name": "S30",
        "group": "S3",
        "alg": "D' R U R' U R U' R' U' D R2 U' R U' R' U R' U R2"
      },
      {
        "name": "S31",
        "group": "S3",
        "alg": "R U R' U R U R' U' R U R D R' U' R D' R' U2 R'"
      },
      {
        "name": "S32",
        "group": "S3",
        "alg": "U' R' U2 R U R' U' R' D' R U' R' D R U R U' R' U' R"
      },
      {
        "name": "S33",
        "group": "S3",
        "alg": "U' R' U2 F' R U R' U' R' F R U2 R"
      },
      {
        "name": "S34",
        "group": "S3",
        "alg": "R2 U R U R' U' R' U' R' L' U R' U' L"
      },
      {
        "name": "S35",
        "group": "S3",
        "alg": "U R U2 R' U2 R' F R2 U R' U' R U R' U' F'"
      },
      {
        "name": "S36",
        "group": "S3",
        "alg": "R U R' U R U' R' U' R' F R2 U' R' U' R U R' F'"
      },
      {
        "name": "S37",
        "group": "S4",
        "alg": "U' R2 U R' U R D R' U2 R D' R' U R U' R2'"
      },
      {
        "name": "S38",
        "group": "S4",
        "alg": "U' R U R' U R U' R D R' U' R D' R2"
      },
      {
        "name": "S39",
        "group": "S4",
        "alg": "U2 R U' R' U' R U' R' U2 R U R2 D' R U2 R' D R"
      },
      {
        "name": "S40",
        "group": "S4",
        "alg": "U F U R U' R' U R U' l U' R2 D' R U R' x"
      },
      {
        "name": "S41",
        "group": "S4",
        "alg": "U2 R2 D' R U' R' D R U' R U R' U R"
      },
      {
        "name": "S42",
        "group": "S4",
        "alg": "U R U2 R' L' U2 R U R' U2 L R U2 R'"
      },
      {
        "name": "S43",
        "group": "S4",
        "alg": "R' D' R U R' D R2 U' R' U R U R' U' R U2 R' U R U2 R'"
      },
      {
        "name": "S44",
        "group": "S4",
        "alg": "R U' R' U' R U R D R' U2 R D' R2 U R U2 R'"
      },
      {
        "name": "S45",
        "group": "S4",
        "alg": "U' R' U2 R' D' R U R' D R U' R U R' U R"
      },
      {
        "name": "S46",
        "group": "S4",
        "alg": "U R' U' R U' R2 F' R U R U' R' F U2 R"
      },
      {
        "name": "S47",
        "group": "S4",
        "alg": "U2 R U R' U R' D' R U R' D R U' R U2 R'"
      },
      {
        "name": "S48",
        "group": "S4",
        "alg": "U2 R U2 R' U' R U R' U' R U R D R' U2 R D' R2"
      },
      {
        "name": "S49",
        "group": "S5",
        "alg": "f R' F' R U2 R U2 R' U2 S'"
      },
      {
        "name": "S50",
        "group": "S5",
        "alg": "U R' D' R U R' D R2 U R' U2 R U R'"
      },
      {
        "name": "S51",
        "group": "S5",
        "alg": "R' D R' U R D' U R U' R' U' R2 U R U' R'"
      },
      {
        "name": "S52",
        "group": "S5",
        "alg": "U R' U2 R U R2 D' R U' R' D R U2 R"
      },
      {
        "name": "S53",
        "group": "S5",
        "alg": "U2 R2 D' r U2 r' D R2 U R' U R"
      },
      {
        "name": "S54",
        "group": "S5",
        "alg": "R' U2 R U R' U R' D' R U2 R' D R U2 R"
      },
      {
        "name": "S55",
        "group": "S5",
        "alg": "R L' U R' U' L U2 R U2 R'"
      },
      {
        "name": "S56",
        "group": "S5",
        "alg": "U2 R2 D' R U2 R' D R2 U R' U R"
      },
      {
        "name": "S57",
        "group": "S5",
        "alg": "R2 F R U R U' R' F' R U' R' U R"
      },
      {
        "name": "S58",
        "group": "S5",
        "alg": "U R U R' U R' U' R' D' R U R' D R' U2 R'"
      },
      {
        "name": "S59",
        "group": "S5",
        "alg": "U' R' U' F U' R2 U R2 U F' R U' R U' R'"
      },
      {
        "name": "S60",
        "group": "S5",
        "alg": "U' R2 D' R U2 R D2 R' U' R D2 R' U R' D R U2 R"
      },
      {
        "name": "S61",
        "group": "S6",
        "alg": "U2 R U R' U' R U R2 D' R U2 R' D R2 U2 R'"
      },
      {
        "name": "S62",
        "group": "S6",
        "alg": "R U R' U R U' R2 F' R U R U' R' F R U' R'"
      },
      {
        "name": "S63",
        "group": "S6",
        "alg": "U2 R U R' U R2 D r' U2 r D' R2"
      },
      {
        "name": "S64",
        "group": "S6",
        "alg": "R' U R U2 R' U R2 D R' U R D' R'"
      },
      {
        "name": "S65",
        "group": "S6",
        "alg": "U' R' U' R U R2 U' R' U' R U D' R U R' D R'"
      },
      {
        "name": "S66",
        "group": "S6",
        "alg": "U2 R U R' U R2 D R' U2 R D' R2"
      },
      {
        "name": "S67",
        "group": "S6",
        "alg": "U2 R' U2 R U2 L U' R' U L' R"
      },
      {
        "name": "S68",
        "group": "S6",
        "alg": "R U2 R D R' U2 R D' R' U R' U R U2 R'"
      },
      {
        "name": "S69",
        "group": "S6",
        "alg": "R U R2 F' R U2 R U2 R' F R U' R'"
      },
      {
        "name": "S70",
        "group": "S6",
        "alg": "U R U R' U' R U R2 D' R U R' D R U R U2 R'"
      },
      {
        "name": "S71",
        "group": "S6",
        "alg": "F' R U R' U R U2 R' F U R U' R' U2 R U' R'"
      },
      {
        "name": "S72",
        "group": "S6",
        "alg": "U R' F R U R' U' R' F' D' R U R' D R2"
      }
    ]
  },
  {
    "id": "zbll-as",
    "name": "ZBLL AS",
    "source": "Provided by the project's user, from a personal ZBLL reference (originally a JS object named `zbll_juliette`). Where the source listed alternate algorithms for a case (separated by \"/\"), only the first is kept here.",
    "cases": [
      {
        "name": "AS1",
        "group": "AS1",
        "alg": "U' R2' D' R U2 R' D R U R' F R U R U' R' F' R"
      },
      {
        "name": "AS2",
        "group": "AS1",
        "alg": "U R U2 R2 U' R' U R U' R' U' R2 U R"
      },
      {
        "name": "AS3",
        "group": "AS1",
        "alg": "R' U' R U' R' U2 R"
      },
      {
        "name": "AS4",
        "group": "AS1",
        "alg": "U R U2 R' U' R U' R'"
      },
      {
        "name": "AS5",
        "group": "AS1",
        "alg": "R' U' R2 U R2 U R2 U2 R2 U2 R"
      },
      {
        "name": "AS6",
        "group": "AS1",
        "alg": "U2 R U R' U R' U' R2 U' R2 U2 R"
      },
      {
        "name": "AS7",
        "group": "AS1",
        "alg": "U R' U' R U R U2 R' U' R' U R U' R U' R'"
      },
      {
        "name": "AS8",
        "group": "AS1",
        "alg": "U R U R' U' R' U' R U R U' R' U' R' U R"
      },
      {
        "name": "AS9",
        "group": "AS1",
        "alg": "U R U R' U R' U' R U R' U' R2 U' R2 U R U' R' U R"
      },
      {
        "name": "AS10",
        "group": "AS1",
        "alg": "R' U' R U' R' U' R' U' R' U' R' U R U R2"
      },
      {
        "name": "AS11",
        "group": "AS1",
        "alg": "U R U R' U' R U R2 U' R2 U' R' U R U' R' U R' U R"
      },
      {
        "name": "AS12",
        "group": "AS1",
        "alg": "U2 R U R' U R' U' R' U R U' R' U' R' U' R' U2 R"
      },
      {
        "name": "AS13",
        "group": "AS2",
        "alg": "U' R U2 R2 U' R2 U' R' F U' R' U' R U F'"
      },
      {
        "name": "AS14",
        "group": "AS2",
        "alg": "U' R D R' U R D' R' U2 R' U' R U2 R' U' R"
      },
      {
        "name": "AS15",
        "group": "AS2",
        "alg": "U' R U2 R' U' R U R' L' U R U' L U2 R'"
      },
      {
        "name": "AS16",
        "group": "AS2",
        "alg": "R U' R' U2 R U' R' U2 R' D' R U R' D R"
      },
      {
        "name": "AS17",
        "group": "AS2",
        "alg": "U' F U' R' U R U F' R' U R U' R' U2 R"
      },
      {
        "name": "AS18",
        "group": "AS2",
        "alg": "U R U R' U L' U2 R U2 R' U2 R L U2 R'"
      },
      {
        "name": "AS19",
        "group": "AS2",
        "alg": "R U R' F' R U2 R' U' R U' R' F R U' R'"
      },
      {
        "name": "AS20",
        "group": "AS2",
        "alg": "R U  R' U' R' U' F U R2 U' R' U R U' R' F'"
      },
      {
        "name": "AS21",
        "group": "AS2",
        "alg": "U R' U R2 U2 D R' U' R U' D' R2 U' R"
      },
      {
        "name": "AS22",
        "group": "AS2",
        "alg": "R' U R U R' U r U' R' U R U r' R' F R F' U R"
      },
      {
        "name": "AS23",
        "group": "AS2",
        "alg": "z D' R' D R U R' D' R U' R U R' D R U' z'"
      },
      {
        "name": "AS24",
        "group": "AS2",
        "alg": "R U2 R' U' R U r' F r U2 R' U' r' F2 r"
      },
      {
        "name": "AS25",
        "group": "AS3",
        "alg": "R' U L U' R U L'"
      },
      {
        "name": "AS26",
        "group": "AS3",
        "alg": "U' R U2 R' U' R U R D R' U2 R D' R2"
      },
      {
        "name": "AS27",
        "group": "AS3",
        "alg": "U R D' U R U' R' U2 D R2 U' R U R"
      },
      {
        "name": "AS28",
        "group": "AS3",
        "alg": "U' R U R U' R2 D U2 R' U' R U D' R"
      },
      {
        "name": "AS29",
        "group": "AS3",
        "alg": "R2 D' R U2 R' D R U R U' R' U2 R"
      },
      {
        "name": "AS30",
        "group": "AS3",
        "alg": "D R' U' R U' R' U R U D' R2 U R' U R U' R U' R2"
      },
      {
        "name": "AS31",
        "group": "AS3",
        "alg": "R' U' R U' R' U' R U R' U' R' D' R U R' D R U2 R"
      },
      {
        "name": "AS32",
        "group": "AS3",
        "alg": "U R U2 R' U' R U R D  R' U R D' R' U' R' U R U R'"
      },
      {
        "name": "AS33",
        "group": "AS3",
        "alg": "U2 F U R U' R' U R U' R2 F' R U2 R U2 R'"
      },
      {
        "name": "AS34",
        "group": "AS3",
        "alg": "U2 F R U' R' U R U R2 F' R U R U R' U' R U' R'"
      },
      {
        "name": "AS35",
        "group": "AS3",
        "alg": "U2 R' U2 R' F' R U R U' R' F U2 R"
      },
      {
        "name": "AS36",
        "group": "AS3",
        "alg": "U2 L' U R U' L R U R U R U' R' U' R2"
      },
      {
        "name": "AS37",
        "group": "AS4",
        "alg": "R D' R2 D R2 U' R2 D' R2 D R2 U R"
      },
      {
        "name": "AS38",
        "group": "AS4",
        "alg": "U R' U' R U' R' U R' D' R U R' D R2"
      },
      {
        "name": "AS39",
        "group": "AS4",
        "alg": "l U' R' D R2 U l' U R' U' R U R' U' F'"
      },
      {
        "name": "AS40",
        "group": "AS4",
        "alg": "U' R' D' R U2 R' D R2 U' R' U2 R U R' U R U R'"
      },
      {
        "name": "AS41",
        "group": "AS4",
        "alg": "U2 R2 D R' U R D' R' U R' U' R U' R'"
      },
      {
        "name": "AS42",
        "group": "AS4",
        "alg": "U R U2 R' L' U2 R U' R' U2 L R U2 R'"
      },
      {
        "name": "AS43",
        "group": "AS4",
        "alg": "U' R U R' U' R' U' R U R U' R' U' R2 D' R U' R' D R U2 R"
      },
      {
        "name": "AS44",
        "group": "AS4",
        "alg": "U' R U2 R' U' R2 D R' U2 R D' R' U' R' U R U R'"
      },
      {
        "name": "AS45",
        "group": "AS4",
        "alg": "U R U2 R' U R' D' R U' R' D R U' R U' R'"
      },
      {
        "name": "AS46",
        "group": "AS4",
        "alg": "U' R2 D R' U2 R D' R' U' R' U R U' R' U  R U2 R'"
      },
      {
        "name": "AS47",
        "group": "AS4",
        "alg": "U2 R' U' R U' R D R' U' R D' R' U R' U2 R"
      },
      {
        "name": "AS48",
        "group": "AS4",
        "alg": "U2 R' U2 F' R U R' U' R' F R2 U R' U R"
      },
      {
        "name": "AS49",
        "group": "AS5",
        "alg": "U' R U2 R2 D' R U2 R' D R2 U' R' U R U' R'"
      },
      {
        "name": "AS50",
        "group": "AS5",
        "alg": "U' R D R' U' R D' R2 U' R U2 R' U' R"
      },
      {
        "name": "AS51",
        "group": "AS5",
        "alg": "R D' R U' R' D U' R' U R U R2 U' R' U R"
      },
      {
        "name": "AS52",
        "group": "AS5",
        "alg": "R U R' F' R U R' U' R' F R2 U R' U' R U' R'"
      },
      {
        "name": "AS53",
        "group": "AS5",
        "alg": "U2 R2 D r' U2 r D' R2 U' R U' R'"
      },
      {
        "name": "AS54",
        "group": "AS5",
        "alg": "R U2 R' U' R U' R D R' U2 R D' R' U2 R'"
      },
      {
        "name": "AS55",
        "group": "AS5",
        "alg": "L R' U' R U L' U2 R' U2 R"
      },
      {
        "name": "AS56",
        "group": "AS5",
        "alg": "U2 R2 D R' U2 R D' R2 U' R U' R'"
      },
      {
        "name": "AS57",
        "group": "AS5",
        "alg": "R U R' F' R U2 R' U2 R' F R2 U' R'"
      },
      {
        "name": "AS58",
        "group": "AS5",
        "alg": "R U2' R' U' R' D' R U' R' D R2 U' R' U R U' R'"
      },
      {
        "name": "AS59",
        "group": "AS5",
        "alg": "U R U R' U2 R U R' U' F' R U2 R' U' R U' R' F"
      },
      {
        "name": "AS60",
        "group": "AS5",
        "alg": "R2 D' R U' R' D F R U R U' R' F' R"
      },
      {
        "name": "AS61",
        "group": "AS6",
        "alg": "U' R U2 R' U' F' R U R' U' R' F R2 U' R'"
      },
      {
        "name": "AS62",
        "group": "AS6",
        "alg": "U' R' U2 R' D' R U R' D R2 U' R' U2 R"
      },
      {
        "name": "AS63",
        "group": "AS6",
        "alg": "U2 R' U' R U' R2 D' r U2 r' D R2"
      },
      {
        "name": "AS64",
        "group": "AS6",
        "alg": "R U' R' U2 R U' R2 D' R U' R' D R"
      },
      {
        "name": "AS65",
        "group": "AS6",
        "alg": "U R U R' U' R2 U R U R' U' D R' U' R D' R"
      },
      {
        "name": "AS66",
        "group": "AS6",
        "alg": "U2 R' U' R U' R2 D' R U2 R' D R2"
      },
      {
        "name": "AS67",
        "group": "AS6",
        "alg": "U2 R U2 R' U2 L' U R U' R' L"
      },
      {
        "name": "AS68",
        "group": "AS6",
        "alg": "R' U2 R' D' R U2 R' D R U' R U' R' U2 R"
      },
      {
        "name": "AS69",
        "group": "AS6",
        "alg": "R' U' R U R' F R U R' U' R' F' R2"
      },
      {
        "name": "AS70",
        "group": "AS6",
        "alg": "U R U2 R D' R U' R' D R U R U' R U' R'"
      },
      {
        "name": "AS71",
        "group": "AS6",
        "alg": "U R U R' U R' F U' R2 U' R2 U F' U R"
      },
      {
        "name": "AS72",
        "group": "AS6",
        "alg": "U' R U R' U R' U' R2 U' R D' R U R' D R U R"
      }
    ]
  }
];
