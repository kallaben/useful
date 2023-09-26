const availableWeights = [20, 10, 5, 2.5, 1.25];
const numberOfSets = 5;
const barWeight = 20;
const workSetWeight = 22.5;

function getNecessaryWeights(desiredTotalWeight) {
  return availableWeights.reduce(
    ({ remainingWeight, weights }, currentWeight) => {
      if (remainingWeight <= 0) {
        return { remainingWeight, weights };
      }

      const weightOnBar = currentWeight * 2;
      const numberOfWeights = Math.floor(remainingWeight / weightOnBar);

      return {
        weights: [...weights, ...Array(numberOfWeights).fill(currentWeight)],
        remainingWeight: remainingWeight - weightOnBar * numberOfWeights,
      };
    },
    { weights: [], remainingWeight: desiredTotalWeight },
  ).weights;
}

const increment = (workSetWeight - barWeight) / (numberOfSets - 1);
console.log({ desiredIncrement: increment });

for (let setNumber = 0; setNumber < numberOfSets; setNumber++) {
  const necessaryWeights = getNecessaryWeights(increment * setNumber);

  console.log({
    setNumber: setNumber + 1,
    weights: necessaryWeights,
    totalWeight:
      barWeight + necessaryWeights.reduce((sum, weight) => sum + weight * 2, 0),
  });
}
