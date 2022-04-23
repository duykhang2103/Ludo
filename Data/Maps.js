export const Maps = [
  {
    id: 0,
    width: 3,
    height: 3,
    maxPlayer: 4,
    cells: [
      {
        id: 0,
        next: [1],
        player: [],
        isPath: true,
        type: "path",
      },
      {
        id: 1,
        next: [2],
        player: [],
        isPath: true,
        type: "path",
      },
      {
        id: 2,
        next: [5],
        player: [],
        isPath: true,
        type: "path",
      },
      {
        id: 3,
        next: [0],
        player: [],
        isPath: true,
        type: {
          name: "checkpoint",
          next: [4],
        },
      },
      {
        id: 4,
        next: [],
        player: [],
        isPath: false,
        type: {
          name: "finish",
          next: [],
        },
      },
      {
        id: 5,
        next: [8],
        player: [],
        isPath: true,
        type: "path",
      },
      {
        id: 6,
        next: [3],
        player: [],
        isPath: true,
        type: "path",
      },
      {
        id: 7,
        next: [6],
        player: [],
        isPath: true,
        type: "path",
      },
      {
        id: 8,
        next: [7],
        player: [],
        isPath: true,
        type: "path",
      },
    ]
  }
]
