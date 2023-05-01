import { createContext, useContext, useEffect, useState } from "react";
import { createEquipmentState } from "../equipment/utils/create-equipment-state";
import { GROUND_EQUIPMENT } from "../equipment/constants/ground-equipment";
import { AIR_EQUIPMENT } from "../equipment/constants/air-equipment";
import { SEA_EQUIPMENT } from "../equipment/constants/sea-equipment";
import { EquipmentType } from "../equipment/constants/equipment-types";
import { JourneyContext } from "./JourneyContext";
import { useGameSettingsContext } from "./GameSettingsContext";
import { useToast } from "@chakra-ui/react";

export type EquipmentTypeState = {
  name: string;
  amount: number;
  onJourney: number;
  buyPrice: number;
  sellPrice: number;
  upgradePrice: number;
  equipmentType: EquipmentType;
  speedFactor: number;
};

type EquipmentContextType = {
  [EquipmentType.GROUND]: EquipmentTypeState;
  [EquipmentType.SEA]: EquipmentTypeState;
  [EquipmentType.AIR]: EquipmentTypeState;
  canUpgradeGround: boolean;
  canUpgradeSea: boolean;
  canUpgradeAir: boolean;
  upgradeEquipment: (type: EquipmentType) => void;
  increaseEquipment: (type: EquipmentType) => void;
  decreaseEquipment: (type: EquipmentType) => void;
  canSendEquipmentOnJourney: (type: EquipmentType) => boolean;
};

const EquipmentContext = createContext<EquipmentContextType | undefined>(
  undefined
);

const initialEquipmentState = {
  [EquipmentType.GROUND]: {
    ...createEquipmentState(EquipmentType.GROUND, 0),
    amount: 1,
    onJourney: 0,
  },
  [EquipmentType.SEA]: {
    ...createEquipmentState(EquipmentType.SEA, 0),
    amount: 0,
    onJourney: 0,
  },
  [EquipmentType.AIR]: {
    ...createEquipmentState(EquipmentType.AIR, 0),
    amount: 0,
    onJourney: 0,
  },
};

const EquipmentProvider = ({ children }: { children: React.ReactNode }) => {
  const equipmentToast = useToast();
  const { journeyList } = useContext(JourneyContext);
  const { currentTier, increaseTier } = useGameSettingsContext();
  const [groundState, setGroundState] = useState<EquipmentTypeState>(
    initialEquipmentState[EquipmentType.GROUND]
  );

  const [seaState, setSeaState] = useState<EquipmentTypeState>(
    initialEquipmentState[EquipmentType.SEA]
  );

  const [airState, setAirState] = useState<EquipmentTypeState>(
    initialEquipmentState[EquipmentType.AIR]
  );

  const noEquipment =
    groundState.amount === 0 && seaState.amount === 0 && airState.amount === 0;

  const canUpgradeGround =
    groundState.name !== GROUND_EQUIPMENT.slice(-1)[0].name && !noEquipment;

  const canUpgradeSea =
    seaState.name !== SEA_EQUIPMENT.slice(-1)[0].name && !noEquipment;

  const canUpgradeAir =
    airState.name !== AIR_EQUIPMENT.slice(-1)[0].name && !noEquipment;

  useEffect(() => {
    const groundOnJourney = journeyList.filter(
      (journey) => journey.equipmentType === EquipmentType.GROUND
    ).length;

    const seaOnJourney = journeyList.filter(
      (journey) => journey.equipmentType === EquipmentType.SEA
    ).length;

    const airOnJourney = journeyList.filter(
      (journey) => journey.equipmentType === EquipmentType.AIR
    ).length;

    setGroundState((prevState) => ({
      ...prevState,
      onJourney: groundOnJourney,
    }));

    setSeaState((prevState) => ({
      ...prevState,
      onJourney: seaOnJourney,
    }));

    setAirState((prevState) => ({
      ...prevState,
      onJourney: airOnJourney,
    }));
  }, [journeyList.length]);

  const checkForTierIncrease = (equipmentIndex: number) => {
    if (currentTier < equipmentIndex) {
      increaseTier();
    }
  };

  const upgradeEquipment = (type: EquipmentType) => {
    switch (type) {
      case EquipmentType.GROUND:
        if (canUpgradeGround) {
          setGroundState((prevState) => {
            const currentIndex = GROUND_EQUIPMENT.findIndex(
              (equipment) => equipment.name === prevState.name
            );
            checkForTierIncrease(currentIndex + 1);
            return {
              ...createEquipmentState(EquipmentType.GROUND, currentIndex + 1),
              amount: prevState.amount,
              onJourney: prevState.onJourney,
            };
          });
        }
        equipmentToast({
          title: "Ground Equipment Upgraded",
          description: "Speed increased by 10%!",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        break;
      case EquipmentType.SEA:
        if (canUpgradeSea) {
          setSeaState((prevState) => {
            const currentIndex = SEA_EQUIPMENT.findIndex(
              (equipment) => equipment.name === prevState.name
            );
            checkForTierIncrease(currentIndex + 1);
            return {
              ...createEquipmentState(EquipmentType.SEA, currentIndex + 1),
              amount: prevState.amount,
              onJourney: prevState.onJourney,
            };
          });
        }
        equipmentToast({
          title: "Sea Equipment Upgraded",
          description: "Speed increased by 10%!",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        break;
      case EquipmentType.AIR:
        if (canUpgradeAir) {
          setAirState((prevState) => {
            const currentIndex = AIR_EQUIPMENT.findIndex(
              (equipment) => equipment.name === prevState.name
            );
            checkForTierIncrease(currentIndex + 1);
            return {
              ...createEquipmentState(EquipmentType.AIR, currentIndex + 1),
              amount: prevState.amount,
              onJourney: prevState.onJourney,
            };
          });
        }
        equipmentToast({
          title: "Air Equipment Upgraded",
          description: "Speed increased by 10%!",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        break;
    }
  };

  const increaseEquipment = (type: EquipmentType) => {
    switch (type) {
      case EquipmentType.GROUND:
        setGroundState((prevState) => ({
          ...prevState,
          amount: prevState.amount + 1,
        }));
        break;
      case EquipmentType.SEA:
        setSeaState((prevState) => ({
          ...prevState,
          amount: prevState.amount + 1,
        }));
        break;
      case EquipmentType.AIR:
        setAirState((prevState) => ({
          ...prevState,
          amount: prevState.amount + 1,
        }));
        break;
    }
  };

  const decreaseEquipment = (type: EquipmentType) => {
    switch (type) {
      case EquipmentType.GROUND:
        setGroundState((prevState) => ({
          ...prevState,
          amount: prevState.amount - 1,
        }));
        break;
      case EquipmentType.SEA:
        setSeaState((prevState) => ({
          ...prevState,
          amount: prevState.amount - 1,
        }));
        break;
      case EquipmentType.AIR:
        setAirState((prevState) => ({
          ...prevState,
          amount: prevState.amount - 1,
        }));
        break;
    }
  };

  const canSendEquipmentOnJourney = (type: EquipmentType) => {
    switch (type) {
      case EquipmentType.GROUND:
        if (groundState.amount <= groundState.onJourney) {
          return false;
        }

        return true;
      case EquipmentType.SEA:
        if (seaState.amount <= seaState.onJourney) {
          return false;
        }

        return true;
      case EquipmentType.AIR:
        if (airState.amount <= airState.onJourney) {
          return false;
        }

        return true;
    }
  };

  const value = {
    [EquipmentType.GROUND]: groundState,
    [EquipmentType.SEA]: seaState,
    [EquipmentType.AIR]: airState,
    canUpgradeGround,
    canUpgradeSea,
    canUpgradeAir,
    upgradeEquipment,
    increaseEquipment,
    decreaseEquipment,
    canSendEquipmentOnJourney,
  };

  return (
    <EquipmentContext.Provider value={value}>
      {children}
    </EquipmentContext.Provider>
  );
};

const useEquipment = () => {
  const context = useContext(EquipmentContext);
  if (!context) {
    throw new Error("useEquipment must be used within a EquipmentProvider");
  }
  return context;
};

export { EquipmentProvider as default, useEquipment };
