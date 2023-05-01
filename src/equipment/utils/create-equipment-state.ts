import { EquipmentTypeState } from "../../contexts/EquipmentContext";
import { AIR_EQUIPMENT } from "../constants/air-equipment";
import {
  BUY_PRICES,
  GROUND_FACTOR,
  UPGRADE_PRICES,
  AIR_FACTOR,
  SEA_FACTOR,
  SPEED_FACTORS,
} from "../constants/balance-constants";
import { EquipmentType } from "../constants/equipment-types";
import { GROUND_EQUIPMENT } from "../constants/ground-equipment";
import { SEA_EQUIPMENT } from "../constants/sea-equipment";

export const createEquipmentState = (
  equipmentType: EquipmentType,
  nextEquipmentTier: number
): Omit<EquipmentTypeState, "amount" | "onJourney"> => {
  switch (equipmentType) {
    case EquipmentType.GROUND:
      return {
        ...GROUND_EQUIPMENT[nextEquipmentTier],
        speedFactor: SPEED_FACTORS[nextEquipmentTier],
        buyPrice: BUY_PRICES[nextEquipmentTier] * GROUND_FACTOR,
        sellPrice: (BUY_PRICES[nextEquipmentTier] * GROUND_FACTOR) / 2,
        upgradePrice: UPGRADE_PRICES[nextEquipmentTier] * GROUND_FACTOR,
        equipmentType: EquipmentType.GROUND,
      };
    case EquipmentType.AIR:
      return {
        ...AIR_EQUIPMENT[nextEquipmentTier],
        speedFactor: SPEED_FACTORS[nextEquipmentTier],
        buyPrice: BUY_PRICES[nextEquipmentTier] * AIR_FACTOR,
        sellPrice: (BUY_PRICES[nextEquipmentTier] * AIR_FACTOR) / 2,
        upgradePrice: UPGRADE_PRICES[nextEquipmentTier] * AIR_FACTOR,
        equipmentType: EquipmentType.AIR,
      };
    case EquipmentType.SEA:
      return {
        ...SEA_EQUIPMENT[nextEquipmentTier],
        speedFactor: SPEED_FACTORS[nextEquipmentTier],
        buyPrice: BUY_PRICES[nextEquipmentTier] * SEA_FACTOR,
        sellPrice: (BUY_PRICES[nextEquipmentTier] * SEA_FACTOR) / 2,
        upgradePrice: UPGRADE_PRICES[nextEquipmentTier] * SEA_FACTOR,
        equipmentType: EquipmentType.SEA,
      };
  }
};
