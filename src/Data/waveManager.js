export const waves = [
  {
    id: 1,
    gold: 4,
    enemies: [{ character: 1, position: 0 }],
  },

  {
    id: 2,
    gold: 4,
    enemies: [
      { character: 1, position: 0, evolved: false },
      { character: 1, position: 1, evolved: false },
    ],
  },

  {
    id: 3,
    gold: 4,
    enemies: [
      { character: 1, position: 0, evolved: false },
      { character: 1, position: 1, evolved: false },
      { character: 2, position: 4, evolved: false },
    ],
  },

  {
    id: 4,
    gold: 5,
    enemies: [
      { character: 1, position: 0, evolved: false },
      { character: 1, position: 1, evolved: false },
      { character: 2, position: 4, evolved: false },
      { character: 2, position: 5, evolved: false },
    ],
  },

  {
    id: 5,
    gold: 5,
    enemies: [
      { character: 1, position: 0, evolved: false },
      { character: 3, position: 1, evolved: false },
      { character: 1, position: 2, evolved: false },
      { character: 2, position: 4, evolved: false },
      { character: 2, position: 5, evolved: false },
    ],
  },

  {
    id: 6,
    gold: 6,
    enemies: [
      { character: 1, position: 0, evolved: true },
      { character: 3, position: 1, evolved: false },
      { character: 1, position: 2, evolved: false },
      { character: 2, position: 4, evolved: true },
      { character: 2, position: 5, evolved: false },
    ],
  },
];
