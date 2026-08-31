// See README.md's "About the built-in algorithms" section for provenance.
export const cll2x2Sets = [
  {
    "id": "cll",
    "name": "CLL",
    "source": "Supplied by the project's user (2x2algs.txt). Each named group (S/AS/Pi/U/L/T/H) holds several distinct cases from the source, numbered sequentially here (e.g. S1..S6); H has only 4 per method, matching the source. Parenthesized AUF prefixes (e.g. \"(U2)\") are kept as real leading moves, just with the cosmetic parens stripped; the one \"(U/U')\" (either AUF works) took the first option. Every case was parsed and round-trip-verified against the real `cubing` engine before being included.",
    "cases": [
      {
        "name": "S1",
        "group": "S",
        "alg": "R U R' U R U2 R'"
      },
      {
        "name": "S2",
        "group": "S",
        "alg": "U' R' F R2 F' U' R' U' R2 U R'"
      },
      {
        "name": "S3",
        "group": "S",
        "alg": "F R' F' R U2 R U2 R'"
      },
      {
        "name": "S4",
        "group": "S",
        "alg": "R U' R' F R' F' R"
      },
      {
        "name": "S5",
        "group": "S",
        "alg": "U2 R U' R U' R' U R' U' F R' F'"
      },
      {
        "name": "S6",
        "group": "S",
        "alg": "R' F2 R U2 R U' R' F"
      },
      {
        "name": "AS1",
        "group": "AS",
        "alg": "U2 R' F' R U' R' F2 R"
      },
      {
        "name": "AS2",
        "group": "AS",
        "alg": "R U2 R' F R' F' R U' R U' R'"
      },
      {
        "name": "AS3",
        "group": "AS",
        "alg": "U2 F' R U R' U2 R' F2 R"
      },
      {
        "name": "AS4",
        "group": "AS",
        "alg": "U2 R' F R F' R U R'"
      },
      {
        "name": "AS5",
        "group": "AS",
        "alg": "U R U R2 F' R F R U' R2 F R"
      },
      {
        "name": "AS6",
        "group": "AS",
        "alg": "U2 R U2 R' U2 R' F R F'"
      },
      {
        "name": "Pi1",
        "group": "Pi",
        "alg": "R U' R2 U R2 U R2 U' R"
      },
      {
        "name": "Pi2",
        "group": "Pi",
        "alg": "U' R' U' R' F R F' R U' R' U2 R"
      },
      {
        "name": "Pi3",
        "group": "Pi",
        "alg": "U2 R' F R F' R U' R' U' R U' R'"
      },
      {
        "name": "Pi4",
        "group": "Pi",
        "alg": "U F R2 U' R2 U R2 U R2 F'"
      },
      {
        "name": "Pi5",
        "group": "Pi",
        "alg": "R U2 R' U' R U R' U2 R' F R F'"
      },
      {
        "name": "Pi6",
        "group": "Pi",
        "alg": "U F R' F' R U2 R U' R' U R U2 R'"
      },
      {
        "name": "U1",
        "group": "U",
        "alg": "F R U R' U' F'"
      },
      {
        "name": "U2",
        "group": "U",
        "alg": "R2 F2 R U R U2 R2 F' R U' R"
      },
      {
        "name": "U3",
        "group": "U",
        "alg": "U' F R U R' U2 F' R U' R' F"
      },
      {
        "name": "U4",
        "group": "U",
        "alg": "F R' F' R U' R U' R' U2 R U' R'"
      },
      {
        "name": "U5",
        "group": "U",
        "alg": "U R U' R2 F R F' R U R' U' R U R'"
      },
      {
        "name": "U6",
        "group": "U",
        "alg": "U R' U R' F R F' R U2 R' U R"
      },
      {
        "name": "L1",
        "group": "L",
        "alg": "U F' R U R' U' R' F R"
      },
      {
        "name": "L2",
        "group": "L",
        "alg": "F R' F' R U R U' R'"
      },
      {
        "name": "L3",
        "group": "L",
        "alg": "R U2 R2 F R F' R U2 R'"
      },
      {
        "name": "L4",
        "group": "L",
        "alg": "U R' U R' U2 R U' R' U R U' R2"
      },
      {
        "name": "L5",
        "group": "L",
        "alg": "U' R U' R' U R U' R' F R' F' R2 U R'"
      },
      {
        "name": "L6",
        "group": "L",
        "alg": "R' U' R U2 R' F R' F' R U' R"
      },
      {
        "name": "T1",
        "group": "T",
        "alg": "R U R' U' R' F R F'"
      },
      {
        "name": "T2",
        "group": "T",
        "alg": "U2 R' F' R U R U' R' F"
      },
      {
        "name": "T3",
        "group": "T",
        "alg": "U' R U F R' F' R U2 R U2 R2"
      },
      {
        "name": "T4",
        "group": "T",
        "alg": "U' R' U R' U2 R U2 R' U R2 U' R'"
      },
      {
        "name": "T5",
        "group": "T",
        "alg": "U2 R U R' U2 R U R' U R' F R F'"
      },
      {
        "name": "T6",
        "group": "T",
        "alg": "U R' U R U2 R2 F R F' R"
      },
      {
        "name": "H1",
        "group": "H",
        "alg": "R2 U2 R U2 R2"
      },
      {
        "name": "H2",
        "group": "H",
        "alg": "x' U2 R' F2 R2 U2 R' U2"
      },
      {
        "name": "H3",
        "group": "H",
        "alg": "R U R' U R U R' F R' F' R"
      },
      {
        "name": "H4",
        "group": "H",
        "alg": "U F R2 U' R2 U' R2 U R2 F'"
      }
    ]
  },
  {
    "id": "eg1",
    "name": "EG1",
    "source": "Supplied by the project's user (2x2algs.txt). Each named group (S/AS/Pi/U/L/T/H) holds several distinct cases from the source, numbered sequentially here (e.g. S1..S6); H has only 4 per method, matching the source. Parenthesized AUF prefixes (e.g. \"(U2)\") are kept as real leading moves, just with the cosmetic parens stripped; the one \"(U/U')\" (either AUF works) took the first option. Every case was parsed and round-trip-verified against the real `cubing` engine before being included.",
    "cases": [
      {
        "name": "S1",
        "group": "S",
        "alg": "U' F' L U2 F2 R U'"
      },
      {
        "name": "S2",
        "group": "S",
        "alg": "R U R' F2 U F R U R'"
      },
      {
        "name": "S3",
        "group": "S",
        "alg": "U2 F R' F' R U R' F' R2 U R'"
      },
      {
        "name": "S4",
        "group": "S",
        "alg": "F' U R U' R' U F R U R'"
      },
      {
        "name": "S5",
        "group": "S",
        "alg": "U R U' R' U R U' R' U F R U' R'"
      },
      {
        "name": "S6",
        "group": "S",
        "alg": "R' F R2 U' R' U R U' R' F"
      },
      {
        "name": "AS1",
        "group": "AS",
        "alg": "U' B U' R2 F2 U' F"
      },
      {
        "name": "AS2",
        "group": "AS",
        "alg": "U R U' R' F' U' F2 R U' R'"
      },
      {
        "name": "AS3",
        "group": "AS",
        "alg": "F' R U R' U' R U R2 F' R"
      },
      {
        "name": "AS4",
        "group": "AS",
        "alg": "R U' R' F' U' R U R' U' F"
      },
      {
        "name": "AS5",
        "group": "AS",
        "alg": "U' R U R' F' U' R U R' U' R U R'"
      },
      {
        "name": "AS6",
        "group": "AS",
        "alg": "U2 R U' R2 F R U' R' F R F'"
      },
      {
        "name": "Pi1",
        "group": "Pi",
        "alg": "U2 F2 R U R' U2 R U R' U' F"
      },
      {
        "name": "Pi2",
        "group": "Pi",
        "alg": "U' R U' R2 F R2 U' R'"
      },
      {
        "name": "Pi3",
        "group": "Pi",
        "alg": "U' F R' F U' F2 R U R"
      },
      {
        "name": "Pi4",
        "group": "Pi",
        "alg": "U' R U' R' U R U' R' F R U' R'"
      },
      {
        "name": "Pi5",
        "group": "Pi",
        "alg": "U F U' R U2 R' F' R U R' F'"
      },
      {
        "name": "Pi6",
        "group": "Pi",
        "alg": "F R U' R' F R U2 R' U F'"
      },
      {
        "name": "U1",
        "group": "U",
        "alg": "R U R' U R U' R2 F' R2 U R'"
      },
      {
        "name": "U2",
        "group": "U",
        "alg": "U' y R' U R' U' R U' R' U' F2 R2"
      },
      {
        "name": "U3",
        "group": "U",
        "alg": "U F' U2 R U2 R' U2 F"
      },
      {
        "name": "U4",
        "group": "U",
        "alg": "U2 R' F R F' R' F R2 U' R'"
      },
      {
        "name": "U5",
        "group": "U",
        "alg": "U2 R' F R F' U R U' R' F R U' R'"
      },
      {
        "name": "U6",
        "group": "U",
        "alg": "U' R' F R U' R' F R U' R U R' F'"
      },
      {
        "name": "L1",
        "group": "L",
        "alg": "R U' R' U R U' R2 F' R F"
      },
      {
        "name": "L2",
        "group": "L",
        "alg": "U R' F R U' R' F R2 U R' F'"
      },
      {
        "name": "L3",
        "group": "L",
        "alg": "R' U R2 U' R2 U' F R2 U' R'"
      },
      {
        "name": "L4",
        "group": "L",
        "alg": "R' F R2 U R' F' R U2 R'"
      },
      {
        "name": "L5",
        "group": "L",
        "alg": "U R U R' F' R U R' U' F R' F' R"
      },
      {
        "name": "L6",
        "group": "L",
        "alg": "U R' U2 F R U2 R U' R2 F"
      },
      {
        "name": "T1",
        "group": "T",
        "alg": "U F R U' R2 F' R U R' F' R"
      },
      {
        "name": "T2",
        "group": "T",
        "alg": "U F' R' F R2 U R' U' R U R'"
      },
      {
        "name": "T3",
        "group": "T",
        "alg": "U2 R U' R2 F R U R U2 R'"
      },
      {
        "name": "T4",
        "group": "T",
        "alg": "U' R U' R' F' U' F R' F' R F"
      },
      {
        "name": "T5",
        "group": "T",
        "alg": "R' F' R2 U R' F' R U R'"
      },
      {
        "name": "T6",
        "group": "T",
        "alg": "U' R U' R' U2 F R U2 R' F"
      },
      {
        "name": "H1",
        "group": "H",
        "alg": "R' F R2 U' R2 U' F U R"
      },
      {
        "name": "H2",
        "group": "H",
        "alg": "F' U R U' R2 F2 R U' F"
      },
      {
        "name": "H3",
        "group": "H",
        "alg": "R' U' R' F2 U F' R F'"
      },
      {
        "name": "H4",
        "group": "H",
        "alg": "R U R' F' R U R' U' R U R'"
      }
    ]
  },
  {
    "id": "eg2",
    "name": "EG2",
    "source": "Supplied by the project's user (2x2algs.txt). Each named group (S/AS/Pi/U/L/T/H) holds several distinct cases from the source, numbered sequentially here (e.g. S1..S6); H has only 4 per method, matching the source. Parenthesized AUF prefixes (e.g. \"(U2)\") are kept as real leading moves, just with the cosmetic parens stripped; the one \"(U/U')\" (either AUF works) took the first option. Every case was parsed and round-trip-verified against the real `cubing` engine before being included.",
    "cases": [
      {
        "name": "S1",
        "group": "S",
        "alg": "U' F U' R2 U' R' U2 R U' R2 F'"
      },
      {
        "name": "S2",
        "group": "S",
        "alg": "R U R' U R U2 R B2 R2"
      },
      {
        "name": "S3",
        "group": "S",
        "alg": "R U' R' F R' F' R' F2 R2"
      },
      {
        "name": "S4",
        "group": "S",
        "alg": "U F R2 F' R2 F' R U' R"
      },
      {
        "name": "S5",
        "group": "S",
        "alg": "R' U R' F R2 U' F R' F'"
      },
      {
        "name": "S6",
        "group": "S",
        "alg": "R2 B2 R' U' R' F R' F' R"
      },
      {
        "name": "AS1",
        "group": "AS",
        "alg": "U2 R' U R U' R2 F R F' R U R' U' R' F2 R2"
      },
      {
        "name": "AS2",
        "group": "AS",
        "alg": "R' U' R U' R' U2 R' F2 R2"
      },
      {
        "name": "AS3",
        "group": "AS",
        "alg": "U2 R' F R F' R U R B2 R2"
      },
      {
        "name": "AS4",
        "group": "AS",
        "alg": "R' U2 R U' R2 F' R U' F R"
      },
      {
        "name": "AS5",
        "group": "AS",
        "alg": "U2 F R F' U R2 F' R U' R"
      },
      {
        "name": "AS6",
        "group": "AS",
        "alg": "U' R2 F' R2 F' R U R2 U' R"
      },
      {
        "name": "Pi1",
        "group": "Pi",
        "alg": "F U' R U2 R U' R' U R' F'"
      },
      {
        "name": "Pi2",
        "group": "Pi",
        "alg": "R' U2 R2 U' R' F2 R2 F'"
      },
      {
        "name": "Pi3",
        "group": "Pi",
        "alg": "U2 R' F' U R' F R2 U2 R' U R"
      },
      {
        "name": "Pi4",
        "group": "Pi",
        "alg": "U R' F U' R U R' F2 U2 R"
      },
      {
        "name": "Pi5",
        "group": "Pi",
        "alg": "U R' U' R' F2 R2 U R' F2 R"
      },
      {
        "name": "Pi6",
        "group": "Pi",
        "alg": "U R' U2 R U' R2 F2 R F R"
      },
      {
        "name": "U1",
        "group": "U",
        "alg": "F U' R U2 R U' R' U2 R' U' F'"
      },
      {
        "name": "U2",
        "group": "U",
        "alg": "F R U R' U' F R2 B2"
      },
      {
        "name": "U3",
        "group": "U",
        "alg": "U' R' U' R U R' F2 R U' R' U R"
      },
      {
        "name": "U4",
        "group": "U",
        "alg": "R2 F2 R U R U2 R2 F R F' R"
      },
      {
        "name": "U5",
        "group": "U",
        "alg": "U' R2 B2 R' U R' U' R' F R F'"
      },
      {
        "name": "U6",
        "group": "U",
        "alg": "U R' U R U2 R' F' R U2 R' U R"
      },
      {
        "name": "L1",
        "group": "L",
        "alg": "R' U' R' F' R U' R U' R' F R"
      },
      {
        "name": "L2",
        "group": "L",
        "alg": "U R2 B2 R' U R U' R' F R' F'"
      },
      {
        "name": "L3",
        "group": "L",
        "alg": "R' U' F2 R U2 R' U2 F R"
      },
      {
        "name": "L4",
        "group": "L",
        "alg": "U2 R' U' R U R' F' R U R' U' R' F' R2"
      },
      {
        "name": "L5",
        "group": "L",
        "alg": "F R' F' R U R U' R B2 R2"
      },
      {
        "name": "L6",
        "group": "L",
        "alg": "U' R U R U' R' F R' F' R2 B2 R2"
      },
      {
        "name": "T1",
        "group": "T",
        "alg": "F R F' R U R' U' R B2 R2"
      },
      {
        "name": "T2",
        "group": "T",
        "alg": "R U R' U' R' F R F' R2 B2 R2"
      },
      {
        "name": "T3",
        "group": "T",
        "alg": "U2 R' U R' F U' R U R2"
      },
      {
        "name": "T4",
        "group": "T",
        "alg": "U R2 F2 R U' F R' F' R U R"
      },
      {
        "name": "T5",
        "group": "T",
        "alg": "U2 R' F2 R U' R' U R' F R U' R"
      },
      {
        "name": "T6",
        "group": "T",
        "alg": "U2 R' U2 R' F2 R F2 R"
      },
      {
        "name": "H1",
        "group": "H",
        "alg": "U R2 F U2 F2 R2 F' R2"
      },
      {
        "name": "H2",
        "group": "H",
        "alg": "R2 U2 R U2 B2 R2"
      },
      {
        "name": "H3",
        "group": "H",
        "alg": "R' U' R U2 R2 F' R U' F R"
      },
      {
        "name": "H4",
        "group": "H",
        "alg": "R U2 B2 R' U R U' B R'"
      }
    ]
  },
  {
    "id": "leg1",
    "name": "LEG1",
    "source": "Supplied by the project's user (2x2algs.txt). Each named group (S/AS/Pi/U/L/T/H) holds several distinct cases from the source, numbered sequentially here (e.g. S1..S6); H has only 4 per method, matching the source. Parenthesized AUF prefixes (e.g. \"(U2)\") are kept as real leading moves, just with the cosmetic parens stripped; the one \"(U/U')\" (either AUF works) took the first option. Every case was parsed and round-trip-verified against the real `cubing` engine before being included.",
    "cases": [
      {
        "name": "S1",
        "group": "S",
        "alg": "U2 R' F R2 F' R2 U2 R"
      },
      {
        "name": "S2",
        "group": "S",
        "alg": "U' R U R2 F' U F2 R2 F'"
      },
      {
        "name": "S3",
        "group": "S",
        "alg": "U2 F R' F' R2 U2 R U' R2"
      },
      {
        "name": "S4",
        "group": "S",
        "alg": "U R2 U' R2 F' R U2 R' U2 R' F"
      },
      {
        "name": "S5",
        "group": "S",
        "alg": "U2 F2 R F' U R' F U' R2"
      },
      {
        "name": "S6",
        "group": "S",
        "alg": "U' R U2 R U' R2 F R2 F'"
      },
      {
        "name": "AS1",
        "group": "AS",
        "alg": "U2 x' R U' R2 U R2 B2 R'"
      },
      {
        "name": "AS2",
        "group": "AS",
        "alg": "U R2 U R2 U' R U2 R' U' R U R'"
      },
      {
        "name": "AS3",
        "group": "AS",
        "alg": "U' F R2 F' R2 U R' U2 R'"
      },
      {
        "name": "AS4",
        "group": "AS",
        "alg": "U' F' R U2 R U2 R' F R2 U R2"
      },
      {
        "name": "AS5",
        "group": "AS",
        "alg": "F' U2 R U R' U' R' F2 R2 F' R'"
      },
      {
        "name": "AS6",
        "group": "AS",
        "alg": "U2 R2 U R' U2 R2 F R F'"
      },
      {
        "name": "Pi1",
        "group": "Pi",
        "alg": "U2 F R F' R' F R2 F' R' U2 R"
      },
      {
        "name": "Pi2",
        "group": "Pi",
        "alg": "U' R U R' U' R U2 R U' R2"
      },
      {
        "name": "Pi3",
        "group": "Pi",
        "alg": "U2 R F' U R' F2 U R F"
      },
      {
        "name": "Pi4",
        "group": "Pi",
        "alg": "U' R2 U R' F R F' U R'"
      },
      {
        "name": "Pi5",
        "group": "Pi",
        "alg": "U R U' R' F R F' R2 U2 R"
      },
      {
        "name": "Pi6",
        "group": "Pi",
        "alg": "U R U R' U R2 U' R2 F R2 F'"
      },
      {
        "name": "U1",
        "group": "U",
        "alg": "R' U R' U' R U' R' U' R2"
      },
      {
        "name": "U2",
        "group": "U",
        "alg": "U2 R2 U R2 F' R2 F' R2 F R2"
      },
      {
        "name": "U3",
        "group": "U",
        "alg": "U R U R' F R2 F' R U' R'"
      },
      {
        "name": "U4",
        "group": "U",
        "alg": "U' R2 U R' U R' F R F' R U R2"
      },
      {
        "name": "U5",
        "group": "U",
        "alg": "U' R2 U R' U2 R' F' U' F"
      },
      {
        "name": "U6",
        "group": "U",
        "alg": "U R2 U' R U2 R F R F'"
      },
      {
        "name": "L1",
        "group": "L",
        "alg": "R2 U R' U' F R2 F' U R'"
      },
      {
        "name": "L2",
        "group": "L",
        "alg": "U2 R U' R' U' R2 U' R2 F R F'"
      },
      {
        "name": "L3",
        "group": "L",
        "alg": "R' U R' U R2 U' R U2 R'"
      },
      {
        "name": "L4",
        "group": "L",
        "alg": "U' R' U R' U' R U R' F R2 F' R"
      },
      {
        "name": "L5",
        "group": "L",
        "alg": "F' U F R U2 R U' R2"
      },
      {
        "name": "L6",
        "group": "L",
        "alg": "U R U' R U' R2 U' F R F'"
      },
      {
        "name": "T1",
        "group": "T",
        "alg": "U F R' F' R2 U R2 U R U R'"
      },
      {
        "name": "T2",
        "group": "T",
        "alg": "U R U' F R2 F' U R U' R2"
      },
      {
        "name": "T3",
        "group": "T",
        "alg": "U2 R U2 R' U R' U' R U2 R U R'"
      },
      {
        "name": "T4",
        "group": "T",
        "alg": "U F R F' R' F R2 F' U R' U R"
      },
      {
        "name": "T5",
        "group": "T",
        "alg": "R2 U' R' F R' F' R U' R U' R2"
      },
      {
        "name": "T6",
        "group": "T",
        "alg": "U' R' F R2 F' R' U2 F R F'"
      },
      {
        "name": "H1",
        "group": "H",
        "alg": "x R U2 R U' R' U F' R"
      },
      {
        "name": "H2",
        "group": "H",
        "alg": "R2 U R' U R U' R U R' U R2"
      },
      {
        "name": "H3",
        "group": "H",
        "alg": "U' F' R' U' F2 R U' F R'"
      },
      {
        "name": "H4",
        "group": "H",
        "alg": "R U' F R' F' R U' R2"
      }
    ]
  }
];
