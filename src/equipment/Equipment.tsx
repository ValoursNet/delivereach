import { Button, HStack } from "@chakra-ui/react";
import { useEquipment } from "../contexts/EquipmentContext";
import { EquipmentCard } from "./EquipmentCard";
import { EquipmentType } from "./constants/equipment-types";
import { Theme } from "../theme";
import { useGameSettingsContext } from "../contexts/GameSettingsContext";

export const Equipment = () => {
  const {
    [EquipmentType.GROUND]: ground,
    [EquipmentType.SEA]: sea,
    [EquipmentType.AIR]: air,
    canUpgradeGround,
    canUpgradeSea,
    canUpgradeAir,
  } = useEquipment();
  const { currentTier, unlockedSea, unlockSea, unlockedAir, unlockAir } =
    useGameSettingsContext();

  return (
    <HStack
      w={"100%"}
      h={"100%"}
      justifyContent={"space-evenly"}
      backgroundColor={Theme.UIBackgroundColor}
      p={Theme.BorderAndPaddingWidth}
      position={"relative"}
    >
      <EquipmentCard canUpgrade={canUpgradeGround} {...ground} />
      {currentTier < 1 ? (
        <>
          <Button
            background={Theme.DisabledBackground}
            color={Theme.ButtonTextColor}
            _hover={{ background: Theme.DisabledBackground }}
            isDisabled
          >
            LOCKED
          </Button>
          <Button
            background={Theme.DisabledBackground}
            color={Theme.ButtonTextColor}
            _hover={{ background: Theme.DisabledBackground }}
            isDisabled
          >
            LOCKED
          </Button>
        </>
      ) : (
        <>
          {currentTier < 2 ? (
            <>
              {unlockedSea ? (
                <EquipmentCard canUpgrade={canUpgradeSea} {...sea} />
              ) : (
                <Button
                  backgroundColor={Theme.ButtonBackgroundColor}
                  color={Theme.ButtonTextColor}
                  _hover={{
                    backgroundColor: Theme.UIBorderColor,
                  }}
                  onClick={unlockSea}
                >
                  UNLOCK SEA
                </Button>
              )}
              <Button
                background={Theme.DisabledBackground}
                color={Theme.ButtonTextColor}
                _hover={{ background: Theme.DisabledBackground }}
                isDisabled
              >
                LOCKED
              </Button>
            </>
          ) : (
            <>
              {unlockedSea ? (
                <EquipmentCard canUpgrade={canUpgradeSea} {...sea} />
              ) : (
                <Button
                  backgroundColor={Theme.ButtonBackgroundColor}
                  color={Theme.ButtonTextColor}
                  _hover={{
                    backgroundColor: Theme.UIBorderColor,
                  }}
                  onClick={unlockSea}
                >
                  UNLOCK SEA
                </Button>
              )}
              {unlockedAir ? (
                <EquipmentCard canUpgrade={canUpgradeAir} {...air} />
              ) : (
                <Button
                  backgroundColor={Theme.ButtonBackgroundColor}
                  color={Theme.ButtonTextColor}
                  _hover={{
                    backgroundColor: Theme.UIBorderColor,
                  }}
                  onClick={unlockAir}
                >
                  UNLOCK AIR
                </Button>
              )}
            </>
          )}
        </>
      )}
    </HStack>
  );
};
