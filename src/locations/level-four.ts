import { EquipmentType } from "../equipment/constants/equipment-types";
import { LocationBaseType } from "./types/location-base-type";

// Solar System
export const LEVEL_FOUR_LOCATIONS: LocationBaseType[] = [
  {
    name: "Mercury",
    baseTime: 40,
    routeType: EquipmentType.AIR,
  },
  {
    name: "Venus",
    baseTime: 45,
    routeType: EquipmentType.AIR,
  },
  {
    name: "Mars",
    baseTime: 50,
    routeType: EquipmentType.GROUND,
  },
  {
    name: "Jupiter",
    baseTime: 55,
    routeType: EquipmentType.AIR,
  },
  {
    name: "Saturn",
    baseTime: 60,
    routeType: EquipmentType.AIR,
  },
  {
    name: "Uranus",
    baseTime: 55,
    routeType: EquipmentType.AIR,
  },
  {
    name: "Neptune",
    baseTime: 50,
    routeType: EquipmentType.AIR,
  },
  {
    name: "Pluto",
    baseTime: 45,
    routeType: EquipmentType.AIR,
  },
  {
    name: "Ceres",
    baseTime: 40,
    routeType: EquipmentType.SEA,
  },
  {
    name: "Eris",
    baseTime: 35,
    routeType: EquipmentType.AIR,
  },
  {
    name: "Haumea",
    baseTime: 30,
    routeType: EquipmentType.GROUND,
  },
];
