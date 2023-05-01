import { EquipmentType } from "../equipment/constants/equipment-types";
import { LocationBaseType } from "./types/location-base-type";

// Europe
export const LEVEL_ONE_LOCATIONS: LocationBaseType[] = [
  {
    name: "Paris",
    baseTime: 10,
    routeType: EquipmentType.GROUND,
  },
  {
    name: "Amsterdam",
    baseTime: 10,
    routeType: EquipmentType.SEA,
  },
  {
    name: "Brussels",
    baseTime: 10,
    routeType: EquipmentType.AIR,
  },
  {
    name: "Berlin",
    baseTime: 20,
    routeType: EquipmentType.GROUND,
  },
  {
    name: "Rome",
    baseTime: 20,
    routeType: EquipmentType.SEA,
  },
  {
    name: "Barcelona",
    baseTime: 20,
    routeType: EquipmentType.AIR,
  },
  {
    name: "Vienna",
    baseTime: 30,
    routeType: EquipmentType.GROUND,
  },
  {
    name: "Athens",
    baseTime: 30,
    routeType: EquipmentType.SEA,
  },
  {
    name: "Moscow",
    baseTime: 30,
    routeType: EquipmentType.AIR,
  },
];
