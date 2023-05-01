import { EquipmentType } from "../equipment/constants/equipment-types";
import { LocationBaseType } from "./types/location-base-type";

// Western Hemisphere & Europe
export const LEVEL_TWO_LOCATIONS: LocationBaseType[] = [
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
    name: "Toronto",
    baseTime: 20,
    routeType: EquipmentType.SEA,
  },
  {
    name: "Rio de Janeiro",
    baseTime: 30,
    routeType: EquipmentType.AIR,
  },
  {
    name: "Rome",
    baseTime: 35,
    routeType: EquipmentType.GROUND,
  },
  {
    name: "Los Angeles",
    baseTime: 30,
    routeType: EquipmentType.SEA,
  },
  {
    name: "Mexico City",
    baseTime: 25,
    routeType: EquipmentType.AIR,
  },
  {
    name: "Barcelona",
    baseTime: 20,
    routeType: EquipmentType.GROUND,
  },
  {
    name: "Sao Paulo",
    baseTime: 25,
    routeType: EquipmentType.SEA,
  },
];
