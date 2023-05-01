import {
  AIR_FACTOR,
  GROUND_FACTOR,
  SEA_FACTOR,
} from "./equipment/constants/balance-constants";
import { EquipmentType } from "./equipment/constants/equipment-types";

export const displayNumber = (
  amount: number
): {
  amount: number;
  suffix: string;
} => {
  if (amount < 1000) {
    return {
      amount: amount,
      suffix: "",
    };
  }

  if (amount < 1000000) {
    return {
      amount: parseFloat((amount / 1000).toFixed(2)),
      suffix: "K",
    };
  }

  if (amount < 1000000000) {
    return {
      amount: parseFloat((amount / 1000000).toFixed(1)),
      suffix: "M",
    };
  }

  if (amount < 1000000000000) {
    return {
      amount: parseFloat((amount / 1000000000).toFixed(0)),
      suffix: "B",
    };
  }

  return {
    amount: parseFloat((amount / 1000000000000).toFixed(0)),
    suffix: "T",
  };
};

export const displayDistance = (distance: number) => {
  if (distance < 1000) {
    return `${distance} km`;
  }

  if (distance < 1000000) {
    return `${(distance / 1000).toFixed(1)} M km`;
  }

  if (distance < 1000000000) {
    return `${(distance / 1000000).toFixed(0)} B km`;
  }

  if (distance < 1000000000000) {
    return `${(distance / 1000000000).toFixed(0)} T km`;
  }

  return `${(distance / 1000000000000).toFixed(0)} Q km`;
};

export const displayTime = (time: number) => {
  if (time < 60) {
    return `${time.toFixed(1)} sec`;
  }

  if (time < 3600) {
    return `${(time / 60).toFixed(1)} min`;
  }

  if (time < 86400) {
    return `${(time / 3600).toFixed(1)} hrs`;
  }

  if (time < 604800) {
    return `${(time / 86400).toFixed(1)} days`;
  }

  return `${(time / 604800).toFixed(1)} weeks`;
};

export const getJourneyReward = (
  baseTime: number,
  equipmentType: EquipmentType,
  currentTier: number
) => {
  switch (equipmentType) {
    case EquipmentType.GROUND:
      return 10 * (baseTime * (currentTier + 1)) * GROUND_FACTOR;
    case EquipmentType.AIR:
      return 10 * (baseTime * (currentTier + 1)) * AIR_FACTOR;
    case EquipmentType.SEA:
      return 10 * (baseTime * (currentTier + 1)) * SEA_FACTOR;
  }
};
