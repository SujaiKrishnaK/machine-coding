let data = [
  { user: 8, duration: 50, equipment: ["bench"] },
  { user: 7, duration: 150, equipment: ["dumbbell"] },
  { user: 1, duration: 10, equipment: ["barbell"] },
  { user: 7, duration: 100, equipment: ["bike", "kettlebell"] },
  { user: 7, duration: 200, equipment: ["bike"] },
  { user: 2, duration: 200, equipment: ["treadmill"] },
  { user: 2, duration: 200, equipment: ["bike"] },
];

export default function mergeData(sessions) {
  const map = new Map();

  for (const obj of sessions) {
    const { user, duration, equipment } = obj;

    if (!map.has(user)) {
      map.set(user, {
        user: user,
        duration: duration,
        equipment: new Set(equipment),
      });
    } else {
      let retirevedObj = map.get(user);
      retirevedObj.duration += duration;
      for (const eq of equipment) {
        retirevedObj.equipment.add(eq);
      }
    }
  }
  return Array.from(map.values()).map((x) => ({
    user: x.user,
    duration: x.duration,
    equipment: Array.from(x.equipment),
  }));
}

console.log(mergeData(data));
