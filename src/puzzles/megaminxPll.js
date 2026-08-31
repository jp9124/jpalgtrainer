// See README.md's "About the built-in algorithms" section for provenance.
export const megaminxPllSets = [{
  "id": "megaminx-pll",
  "name": "PLL",
  "source": "Supplied by the project's user (ollalgs.js/pllalgs.js). Grouped by the source's own algsGroups_OLL/algsGroups_PLL; a group with more than 6 cases is split in half (a/b). BR/BL/DR were rewritten as a y-rotation conjugate of an existing face (e.g. BR -> y R y') rather than given dedicated keys, each verified to produce an identical resulting pattern to the original token. A leading/embedded \"x'\" in 5 algorithms (a vestigial 3x3-notation artifact -- x/z rotation isn't valid on megaminx here, only y/y') was dropped after confirming the rest of the algorithm still round-trips correctly. The single empty \"solved\" PLL entry is omitted -- not a practicable case. Every case was parsed and round-trip-verified against the real `cubing` engine before being included.",
  "cases": [
    {
      "name": "A1+",
      "group": "Group A",
      "alg": "F' R' F R U' R' F' R2 U R' U' R' F R"
    },
    {
      "name": "A1-",
      "group": "Group A",
      "alg": "R' F' R U R U' R2' F R U R' F' R F"
    },
    {
      "name": "A2+",
      "group": "Group A",
      "alg": "y R' y' R' U L U' R' U L' U' R2 y R y'"
    },
    {
      "name": "A2-",
      "group": "Group A",
      "alg": "y R' y' R2' U L U' R U L' U' R y R y'"
    },
    {
      "name": "B1+",
      "group": "Group B",
      "alg": "R U R' U' R' U2' R U R U' R2' U2 R"
    },
    {
      "name": "B1-",
      "group": "Group B",
      "alg": "R' U' R U R U2 R' U' R' U R2 U2' R'"
    },
    {
      "name": "B2+",
      "group": "Group B",
      "alg": "R2 U R2' U2 R U2' R U R' U' R U' R2' U2 R U R'"
    },
    {
      "name": "B2-",
      "group": "Group B",
      "alg": "R2' U' R2 U2' R' U2 R' U' R U R' U R2 U2' R' U' R"
    },
    {
      "name": "C1+",
      "group": "Group Ca",
      "alg": "R U2 R' U' R U2' R' U R U R2' U' R U' R U R2' U R"
    },
    {
      "name": "C1-",
      "group": "Group Ca",
      "alg": "R' U2' R U R' U2 R U' R' U' R2 U R' U R' U' R2 U' R'"
    },
    {
      "name": "C2+",
      "group": "Group Ca",
      "alg": "R' U' R U' R U2 R2' U' R2 U' R2' U2' R U R' U2 R"
    },
    {
      "name": "C2-",
      "group": "Group Ca",
      "alg": "R U R' U R' U2' R2 U R2' U R2 U2 R' U' R U2' R'"
    },
    {
      "name": "C3+",
      "group": "Group Ca",
      "alg": "R2' U2 R2 U R2' U' R2 U2' R2' U' R2 U2 R2' U2' R2"
    },
    {
      "name": "C3-",
      "group": "Group Ca",
      "alg": "R2 U2' R2' U' R2 U R2' U2 R2 U R2' U2' R2 U2 R2'"
    },
    {
      "name": "C4+",
      "group": "Group Cb",
      "alg": "R2' U2' R2 U' R2' U2' R2 U' R2' U2 R2 U R2' U2 R2"
    },
    {
      "name": "C4-",
      "group": "Group Cb",
      "alg": "R2' U2 R2 U R2' U2 R2 U R2' U2' R2 U' R2' U2' R2"
    },
    {
      "name": "C5+",
      "group": "Group Cb",
      "alg": "R' U2' R F U' R' U' R U F' U R' U2 R"
    },
    {
      "name": "C5-",
      "group": "Group Cb",
      "alg": "R U2 R' y R' y' U R U R' U' y R y' U' R U2' R'"
    },
    {
      "name": "C6+",
      "group": "Group Cb",
      "alg": "R U' R' U2 R2 U R' U2 R U' R' U' R U' R' U' R'"
    },
    {
      "name": "C6-",
      "group": "Group Cb",
      "alg": "R' U R U2' R2' U' R U2' R' U R U R' U R U R"
    },
    {
      "name": "D+",
      "group": "Group D",
      "alg": "R U2 R' U' R U R' U R U2' R' U2 R U2 R'"
    },
    {
      "name": "D-",
      "group": "Group D",
      "alg": "R' U2' R U R' U' R U' R' U2 R U2' R' U2' R"
    },
    {
      "name": "E1",
      "group": "Group E",
      "alg": "R U R' U R' U' R F' R U R' U' R' F R2 U' R2' U R"
    },
    {
      "name": "E2",
      "group": "Group E",
      "alg": "R U' R' y' B y R U R' y' B' y R U R' y' B y R U' R' y' B' y"
    },
    {
      "name": "E3",
      "group": "Group E",
      "alg": "L' R U2 R' U' R U R' U' R U R' U' R U' R' L"
    },
    {
      "name": "F1+",
      "group": "Group Fa",
      "alg": "R2 U2 R2' U R2 U2 R2'"
    },
    {
      "name": "F1-",
      "group": "Group Fa",
      "alg": "R2 U2' R2' U' R2 U2' R2'"
    },
    {
      "name": "F2+",
      "group": "Group Fa",
      "alg": "R U R' U2 R' U2' R2 U' R' U R' U2 R"
    },
    {
      "name": "F2-",
      "group": "Group Fa",
      "alg": "R' U' R U2' R U2 R2' U R U' R U2' R'"
    },
    {
      "name": "F3+",
      "group": "Group Fa",
      "alg": "R' U2' R U' R U R2' U2 R U2' R U' R'"
    },
    {
      "name": "F3-",
      "group": "Group Fb",
      "alg": "R U2 R' U R' U' R2 U2' R' U2 R' U R"
    },
    {
      "name": "F4+",
      "group": "Group Fb",
      "alg": "R U R' U R2 U2' R2' U2' R U2 R U2 R' U2' R'"
    },
    {
      "name": "F4-",
      "group": "Group Fb",
      "alg": "R' U' R U' R2' U2 R2 U2 R' U2' R' U2' R U2 R"
    },
    {
      "name": "F5+",
      "group": "Group Fb",
      "alg": "R U2 R U2' R' U2' R' U2 R2 U2 R2' U' R U' R'"
    },
    {
      "name": "F5-",
      "group": "Group Fb",
      "alg": "R' U2' R' U2 R U2 R U2' R2' U2' R2 U R' U R"
    },
    {
      "name": "G1+",
      "group": "Group G",
      "alg": "R' U2 R2 U2' R' U2 R' U R U2 R' U R2 U2 R2' U2' R"
    },
    {
      "name": "G1-",
      "group": "Group G",
      "alg": "R U2' R2' U2 R U2' R U' R' U2' R U' R2' U2' R2 U2 R'"
    },
    {
      "name": "G2+",
      "group": "Group G",
      "alg": "R U' R2' U' F U F' R2 U2' R' U R U2 R' F U' F'"
    },
    {
      "name": "G2-",
      "group": "Group G",
      "alg": "F U2' R' U' R F' R' U' R F U' R' U2' R U2 F'"
    },
    {
      "name": "H1+",
      "group": "Group H",
      "alg": "R' y' B' y R U R' y' B y R U R' y' B' y R U R' y' B y R U R' y' B' y R U R' y' B y R U"
    },
    {
      "name": "H1-",
      "group": "Group H",
      "alg": "R' y' B' y R U' R' y' B y R U' R' y' B' y R U' R' y' B y R U' R' y' B' y R U' R' y' B y R U'"
    },
    {
      "name": "H2+",
      "group": "Group H",
      "alg": "R2 U2 R2' U' R2 U' R2' y' R2' U' R2 U' R2' U2 R2"
    },
    {
      "name": "H2-",
      "group": "Group H",
      "alg": "R2' U2' R2 U R2' U R2 y R2 U R2' U R2 U2' R2'"
    },
    {
      "name": "I1+",
      "group": "Group Ia",
      "alg": "R U2 R' U R' U' R U F' R U R' U' R' F U R2 U R'"
    },
    {
      "name": "I1-",
      "group": "Group Ia",
      "alg": "R2 U2' R2' U' R2 bR2' U R2' U' R2 U' bR2 U' R2'"
    },
    {
      "name": "I2+",
      "group": "Group Ia",
      "alg": "R U' R2' U' F' R U R U' R' F U' R' U R U' R U2' R'"
    },
    {
      "name": "I2-",
      "group": "Group Ia",
      "alg": "R2 U bR2' U R2' U R2 U' bR2 R2' U R2 U2 R2'"
    },
    {
      "name": "I3+",
      "group": "Group Ia",
      "alg": "R' U2 R2 U2 R' U2' R' U2' R U2 R U R' U2' R U' R'"
    },
    {
      "name": "I3-",
      "group": "Group Ia",
      "alg": "R U2' R2' U2' R U2 R U2 R' U2' R' U' R U2 R' U R"
    },
    {
      "name": "I4+",
      "group": "Group Ib",
      "alg": "R' U' R' U2' F' R U R U' R' F R' U2 R U R"
    },
    {
      "name": "I4-",
      "group": "Group Ib",
      "alg": "R' U2 R U R' U R' U2' R U R' U R2 U' R' U2 R"
    },
    {
      "name": "I5+",
      "group": "Group Ib",
      "alg": "R' U' R' U2' R F' R U R' U' R' F U2 R U R"
    },
    {
      "name": "I5-",
      "group": "Group Ib",
      "alg": "R' U2' R U R2' U' R U' R' U2 R U' R U' R' U2' R"
    },
    {
      "name": "I6+",
      "group": "Group Ib",
      "alg": "R2 U2' R2' F' R2 U2 R2' F2 R2 U2' R2' F' R2 U2 R2'"
    },
    {
      "name": "I6-",
      "group": "Group Ib",
      "alg": "R2' F2 R2 U' R2' F2' R2 U2 R2' F2 R2 U' R2' F2' R2"
    },
    {
      "name": "J1+",
      "group": "Group J",
      "alg": "R U R' F' R U R' U' R' F R2 U' R'"
    },
    {
      "name": "J1-",
      "group": "Group J",
      "alg": "F U' R' F R2 U' R' U' R U R' F' R U R' F'"
    },
    {
      "name": "J2+",
      "group": "Group J",
      "alg": "R' U2' R U2 R' U R U R U2 R' U' R U' R2' U' R"
    },
    {
      "name": "J2-",
      "group": "Group J",
      "alg": "R U2 R' U2' R U' R' U' R' U2' R U R' U R2 U R'"
    },
    {
      "name": "J3+",
      "group": "Group J",
      "alg": "R U R' U' R' U2' R U R U R2' U R2 U2 R2' U2' R"
    },
    {
      "name": "J3-",
      "group": "Group J",
      "alg": "R U' R2' U' R U' R' U2 R U R U R' U2 R U2' R'"
    },
    {
      "name": "K1+",
      "group": "Group K",
      "alg": "R2' U2 R2 U R2' U' R2 U R2' U' R2 U R2' U2 R2"
    },
    {
      "name": "K1-",
      "group": "Group K",
      "alg": "R2 U2' R2' U' R2 U R2' U' R2 U R2' U' R2 U2' R2'"
    },
    {
      "name": "K2+",
      "group": "Group K",
      "alg": "R' U2 R U' R' U2 R U2' R' U' R U2' R' U R U2' R' U R"
    },
    {
      "name": "K2-",
      "group": "Group K",
      "alg": "R U2' R' U R U2' R' U2 R U R' U2 R U' R' U2 R U' R'"
    },
    {
      "name": "L1",
      "group": "Group La",
      "alg": "R' U2 R U R' U R U' R' U2 R U' R U R' U R U2' R'"
    },
    {
      "name": "L2",
      "group": "Group La",
      "alg": "R' U2' R U' R' U R U R' U R2 U R' U R U R' U' R U2' R'"
    },
    {
      "name": "L3+",
      "group": "Group La",
      "alg": "F U2' F' U2' R F R' U' R F' U2' R' U' R U2' R'"
    },
    {
      "name": "L3-",
      "group": "Group La",
      "alg": "R U R' U' R' U2 R U R U R2' U R U' R U R' U' R U2' R'"
    },
    {
      "name": "L4+",
      "group": "Group La",
      "alg": "R U R U R' U R' U R U' R U2' R' U2' R' U' R U2 R'"
    },
    {
      "name": "L4-",
      "group": "Group Lb",
      "alg": "R U2' R' U R U2 R U2 R' U R' U' R U' R U' R' U' R'"
    },
    {
      "name": "L5+",
      "group": "Group Lb",
      "alg": "R' U2' R U R' U R2 U2' R' U' R U R' U2' R U' R'"
    },
    {
      "name": "L5-",
      "group": "Group Lb",
      "alg": "R U2 R' U' R U' R2' U2 R U R' U' R U2 R' U R"
    },
    {
      "name": "L6+",
      "group": "Group Lb",
      "alg": "R U R' U2 R U' R' U R U2 R2' U' R U' R' U2 R"
    },
    {
      "name": "L6-",
      "group": "Group Lb",
      "alg": "R' U' R U2' R' U R U' R' U2' R2 U R' U R U2' R'"
    },
    {
      "name": "M",
      "group": "Group M",
      "alg": "R' U2 R U2 R' U' F R2 U R2' U R2 U2' R2' F' R"
    },
    {
      "name": "N1+",
      "group": "Group N",
      "alg": "R U2 R' F' R U R' U' R' F R2 U2' R'"
    },
    {
      "name": "N1-",
      "group": "Group N",
      "alg": "R' U2 R' U2' R U' R' U2' R U2 R"
    },
    {
      "name": "N2+",
      "group": "Group N",
      "alg": "R L U2 L' U R' L U' R U2 L' U2 R'"
    },
    {
      "name": "N2-",
      "group": "Group N",
      "alg": "R' L' U2' R U' L R' U L' U2' R U2' L"
    },
    {
      "name": "P1+",
      "group": "Group Pa",
      "alg": "R' F R2 U R' U R U2' R' U R' F' R F U' F'"
    },
    {
      "name": "P1-",
      "group": "Group Pa",
      "alg": "R' U2' F' U2 F R2 U2' R' F R' F' R2 U2 R'"
    },
    {
      "name": "P2+",
      "group": "Group Pa",
      "alg": "F U F' R' F R U' R U2 R' U' R U' R2' F' R"
    },
    {
      "name": "P2-",
      "group": "Group Pa",
      "alg": "y R' y' R' U2' R U R' U R2 U L' U' R' U L"
    },
    {
      "name": "P3+",
      "group": "Group Pb",
      "alg": "F R U' R' U' R U R U2 R' U' R U' R2' F'"
    },
    {
      "name": "P3-",
      "group": "Group Pb",
      "alg": "y R' y' R' U R U R' U' R' U2' R U R' U R2 y R y'"
    },
    {
      "name": "P4+",
      "group": "Group Pb",
      "alg": "F R2 U R' U R U2' R' U' R' U R U R' F'"
    },
    {
      "name": "P4-",
      "group": "Group Pb",
      "alg": "y R' y' R2' U' R U' R' U2 R U R U' R' U' R y R y'"
    },
    {
      "name": "Q1+",
      "group": "Group Q",
      "alg": "R2' U2 R2 U R2' U2 R2 U' R2' U2 R2 U R2' U2 R2"
    },
    {
      "name": "Q1-",
      "group": "Group Q",
      "alg": "R2 U2' R2' U' R2 U2' R2' U R2 U2' R2' U' R2 U2' R2'"
    },
    {
      "name": "Q2+",
      "group": "Group Q",
      "alg": "R' U2' R U' R' U2' R2 U2' R' U' R U2' R'"
    },
    {
      "name": "Q2-",
      "group": "Group Q",
      "alg": "R U2 R' U R U2 R2' U2 R U R' U2 R"
    },
    {
      "name": "R1+",
      "group": "Group Ra",
      "alg": "R' U2 R U' R2' U2 R2 U R' U' R' U2' R U' R"
    },
    {
      "name": "R1-",
      "group": "Group Ra",
      "alg": "R U2' R' U R2 U2' R2' U' R U R U2 R' U R'"
    },
    {
      "name": "R2+",
      "group": "Group Ra",
      "alg": "R' U R' U2 R U R U' R2' U2' R2 U R' U2' R"
    },
    {
      "name": "R2-",
      "group": "Group Ra",
      "alg": "R U' R U2' R' U' R' U R2 U2 R2' U' R U2 R'"
    },
    {
      "name": "R3+",
      "group": "Group Rb",
      "alg": "R U R2' U R U R U' R' U' R U' R2' U' R U' R' U R"
    },
    {
      "name": "R3-",
      "group": "Group Rb",
      "alg": "R' U' R2 U' R' U' R' U R U R' U R2 U R' U R U' R'"
    },
    {
      "name": "R4+",
      "group": "Group Rb",
      "alg": "R' U' R U R' U R2 U R' U R U R' U' R' U' R2 U' R'"
    },
    {
      "name": "R4-",
      "group": "Group Rb",
      "alg": "R U R' U' R U' R2' U' R U' R' U' R U R U R2' U R"
    },
    {
      "name": "S1+",
      "group": "Group Sa",
      "alg": "R' U2' R U R' U R U R U2' R' U2' R U' R'"
    },
    {
      "name": "S1-",
      "group": "Group Sa",
      "alg": "R' U' R U2' R' U2' R U R U R' U R U2' R'"
    },
    {
      "name": "S2+",
      "group": "Group Sa",
      "alg": "R2 U2' R2' U2' R2 U' R' U2 R' U' R' U2' R2 U R2' U R"
    },
    {
      "name": "S2-",
      "group": "Group Sa",
      "alg": "R2' U2 R2 U2 R2' U R U2' R U R U2 R2' U' R2 U' R'"
    },
    {
      "name": "S3+",
      "group": "Group Sa",
      "alg": "R2 U2' R2' U' R F' R U R2' U' R' F R3 U2' R2'"
    },
    {
      "name": "S3-",
      "group": "Group Sa",
      "alg": "R' U' R U' R2' F' R U R U' R' F U R U2' R' U2' R"
    },
    {
      "name": "S4+",
      "group": "Group Sb",
      "alg": "R2' U2' R2 U' R2' U2' R2 U R2' U2 R2 U R2' U2 R2"
    },
    {
      "name": "S4-",
      "group": "Group Sb",
      "alg": "R2' U2 R2 U R2' U2 R2 U' R2' U2' R2 U' R2' U2' R2"
    },
    {
      "name": "S5+",
      "group": "Group Sb",
      "alg": "R' U2' R U' F U' R' U R U F' R' U2 R"
    },
    {
      "name": "S5-",
      "group": "Group Sb",
      "alg": "R U2 R' U y R' y' U R U' R' U' y R y' R U2' R'"
    },
    {
      "name": "S6+",
      "group": "Group Sb",
      "alg": "R U R U R' U R U R' U2' R U' R2' U2' R U R'"
    },
    {
      "name": "S6-",
      "group": "Group Sb",
      "alg": "R' U' R' U' R U' R' U' R U2 R' U R2 U2 R' U' R"
    },
    {
      "name": "T1",
      "group": "Group Ta",
      "alg": "R U R' U' R' F R2 U' R' U' R U R' F'"
    },
    {
      "name": "T2+",
      "group": "Group Ta",
      "alg": "R' U2' R U2 R' F R U R' U' R' F' R2"
    },
    {
      "name": "T2-",
      "group": "Group Ta",
      "alg": "R2' F R U R U' R' F' R U2' R' U2 R"
    },
    {
      "name": "T3+",
      "group": "Group Ta",
      "alg": "R2' U2 R2 U R2' U' R2 U R2' U2 R2"
    },
    {
      "name": "T3-",
      "group": "Group Tb",
      "alg": "R2 U2' R2' U' R2 U R2' U' R2 U2' R2'"
    },
    {
      "name": "T4+",
      "group": "Group Tb",
      "alg": "R U R' F' R U R' U' R' F R U' R' F R2 U' R' U' R U R' F'"
    },
    {
      "name": "T4-",
      "group": "Group Tb",
      "alg": "R' U' R U2' R2' U2' R2 U' R2' U2' R2 U R' U R"
    },
    {
      "name": "U1+",
      "group": "Group U",
      "alg": "R' U' R U' R U R2' U R U' R U' R'"
    },
    {
      "name": "U1-",
      "group": "Group U",
      "alg": "R U R' U R' U' R2 U' R' U R' U R"
    },
    {
      "name": "U2+",
      "group": "Group U",
      "alg": "R U R' U2 R' U' R U' R U R2' U R U' R U2' R'"
    },
    {
      "name": "U2-",
      "group": "Group U",
      "alg": "R U2 R' U R' U' R2 U' R' U R' U R U2' R U' R'"
    },
    {
      "name": "V1+",
      "group": "Group Va",
      "alg": "R' U2 R' dR' R U' R' dR R U R U' R' U' R"
    },
    {
      "name": "V1-",
      "group": "Group Va",
      "alg": "R U2 R2' F R F' R U' R' F' U F R U' R'"
    },
    {
      "name": "V2+",
      "group": "Group Va",
      "alg": "R' U R U R' U' R' dR' R U R' dR R U2' R"
    },
    {
      "name": "V2-",
      "group": "Group Va",
      "alg": "R U' R' F U R U' R' F' R U R' F' U' F R U R'"
    },
    {
      "name": "V3+",
      "group": "Group Vb",
      "alg": "R U R2 U' R' U' R U R' U' R' U R2' U R U' R"
    },
    {
      "name": "V3-",
      "group": "Group Vb",
      "alg": "R' U2' R U R U' R' F R' U2 R U2' F' R U R'"
    },
    {
      "name": "V4+",
      "group": "Group Vb",
      "alg": "R' U R' U' R2 U' R U R U' R' U R U R2' U' R'"
    },
    {
      "name": "V4-",
      "group": "Group Vb",
      "alg": "R U' R' F U2 R' U2' R F' R U R' U' R' U2 R"
    },
    {
      "name": "W",
      "group": "Group W",
      "alg": "R' U2' R' U2 R U2 R U' R2' U2 R2 U2 R' U R"
    },
    {
      "name": "X1",
      "group": "Group Xa",
      "alg": "F U2 R U2' R' U R U R' U2' F' R' U' R U2' R' U2' R"
    },
    {
      "name": "X2",
      "group": "Group Xa",
      "alg": "F R U R' F U R' U' F' U R2 U2' R' F'"
    },
    {
      "name": "X3",
      "group": "Group Xa",
      "alg": "R' U' R U' R' U2 R2 U R' U2 R' U2' R2 U' R' U2 R' U R"
    },
    {
      "name": "X4",
      "group": "Group Xa",
      "alg": "R' U' R2 U' R' U R U' R2' U' R2 U R' U' R U R2' U2 R"
    },
    {
      "name": "X5+",
      "group": "Group Xa",
      "alg": "R' U R U2 R' U2 R U R2' U' R U' R' U' R U2 R' U R2"
    },
    {
      "name": "X5-",
      "group": "Group Xb",
      "alg": "R2' U' R U2' R' U R U R' U R2 U' R' U2' R U2' R' U' R"
    },
    {
      "name": "X6+",
      "group": "Group Xb",
      "alg": "R' U2 R' U' R2 U' R' U' R U R' U R' U R2 U' R' U2' R"
    },
    {
      "name": "X6-",
      "group": "Group Xb",
      "alg": "R U2' R U R2' U R U R' U' R U' R U' R2' U R U2 R'"
    },
    {
      "name": "X7+",
      "group": "Group Xb",
      "alg": "R2 U' R2' U' F U F' R2 U2' R2' U R2 U2 R2' F U' F'"
    },
    {
      "name": "X7-",
      "group": "Group Xb",
      "alg": "R U R2' F' R U2' R U' R' U2' R' F R U R U R' U2' R U' R'"
    },
    {
      "name": "Y1+",
      "group": "Group Y",
      "alg": "F R U' R' U' R U R' F' R U R' U' R' F R F'"
    },
    {
      "name": "Y1-",
      "group": "Group Y",
      "alg": "F R' F' R U R U' R' F R U' R' U R U R' F'"
    },
    {
      "name": "Y2+",
      "group": "Group Y",
      "alg": "R2 U2' R2' U2 R2 U' R2' U2 R2 U2' R2'"
    },
    {
      "name": "Y2-",
      "group": "Group Y",
      "alg": "R2' U2 R2 U2' R2' U R2 U2' R2' U2 R2"
    },
    {
      "name": "Y3+",
      "group": "Group Y",
      "alg": "y R2 U R2' U R2 U2' R2' U2 R2 U R2' U R2 U2' R2'"
    },
    {
      "name": "Y3-",
      "group": "Group Y",
      "alg": "R' U' F R U' R' U' R U2 R' F' R F U' F' R' U2 R"
    },
    {
      "name": "Z1",
      "group": "Group Z",
      "alg": "R' U' F R U' R' U' R U2 R' F' R F U' F' R' U2 R"
    },
    {
      "name": "Z2",
      "group": "Group Z",
      "alg": "R' U2' R' U' R F R' F' U R F' U' F U2' R"
    },
    {
      "name": "Z3",
      "group": "Group Z",
      "alg": "R' L' U2 L U R y R y' F U2' y R' y' U' F'"
    }
  ]
}];
