import { EquipmentType } from "../equipment/constants/equipment-types";
import { LocationBaseType } from "./types/location-base-type";

// Global
export const LEVEL_THREE_LOCATIONS: LocationBaseType[] = [
  {
    name: "New York City",
    baseTime: 20,
    routeType: EquipmentType.AIR,
  },
  {
    name: "Paris",
    baseTime: 10,
    routeType: EquipmentType.GROUND,
  },
  {
    name: "Tokyo",
    baseTime: 40,
    routeType: EquipmentType.SEA,
  },
  {
    name: "Sydney",
    baseTime: 40,
    routeType: EquipmentType.AIR,
  },
  {
    name: "Rio de Janeiro",
    baseTime: 30,
    routeType: EquipmentType.AIR,
  },
  {
    name: "Cape Town",
    baseTime: 35,
    routeType: EquipmentType.SEA,
  },
  {
    name: "Dubai",
    baseTime: 40,
    routeType: EquipmentType.GROUND,
  },
  {
    name: "Beijing",
    baseTime: 35,
    routeType: EquipmentType.AIR,
  },
  {
    name: "Santiago",
    baseTime: 30,
    routeType: EquipmentType.GROUND,
  },
  {
    name: "Buenos Aires",
    baseTime: 30,
    routeType: EquipmentType.SEA,
  },
  {
    name: "Mumbai",
    baseTime: 37,
    routeType: EquipmentType.SEA,
  },
];
