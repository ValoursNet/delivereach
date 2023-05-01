import { EquipmentType } from "../equipment/constants/equipment-types";
import { LocationBaseType } from "./types/location-base-type";

// Local
export const LEVEL_ZERO_LOCATIONS: LocationBaseType[] = [
  {
    name: "Baker Street",
    baseTime: 1.5,
    routeType: EquipmentType.GROUND,
  },
  {
    name: "Oxford Street",
    baseTime: 2.0,
    routeType: EquipmentType.GROUND,
  },
  {
    name: "Kingsway",
    baseTime: 2.5,
    routeType: EquipmentType.GROUND,
  },
  {
    name: "The Strand",
    baseTime: 3.0,
    routeType: EquipmentType.GROUND,
  },
  {
    name: "Fleet Street",
    baseTime: 3.5,
    routeType: EquipmentType.GROUND,
  },
  {
    name: "Bond Street",
    baseTime: 4.0,
    routeType: EquipmentType.GROUND,
  },
];
