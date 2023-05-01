import { EquipmentType } from "../../equipment/constants/equipment-types";

export type LocationBaseType = {
  name: string;
  baseTime: number;
  routeType: EquipmentType;
};
