import {
  Text,
  VStack,
  Grid,
  GridItem,
  HStack,
  Tooltip,
} from "@chakra-ui/react";
import { EquipmentTypeState, useEquipment } from "../contexts/EquipmentContext";
import { useContext, useEffect, useState } from "react";
import { purchaseUpgrade } from "./utils/purchase-upgrade";
import { purchaseEquipment } from "./utils/purchase-equipment";
import { sellEquipment } from "./utils/sell-equipment";
import { TickContext } from "../contexts/TickContext";
import { Theme } from "../theme";
import { EquipmentType } from "./constants/equipment-types";
import { MoneyDisplay } from "../MoneyDisplay";
import { useGameSettingsContext } from "../contexts/GameSettingsContext";
import { CargoShipIcon, CyclingIcon, HelicopterIcon } from "../icons/Icons";

export type EquipmentCardProps = EquipmentTypeState & {
  canUpgrade: boolean;
};

export const EquipmentCard: React.FC<EquipmentCardProps> = ({
  name,
  amount,
  onJourney,
  buyPrice,
  sellPrice,
  upgradePrice,
  equipmentType,
  canUpgrade,
}) => {
  const { upgradeEquipment, increaseEquipment, decreaseEquipment } =
    useEquipment();
  const { money, subtractMoney, addMoney } = useContext(TickContext);
  const { muted, currentTier } = useGameSettingsContext();

  const upgradeAudio = new Audio("/audio/upgrade.wav");
  const buyAudio = new Audio("/audio/buy.wav");

  const canBuy = money >= buyPrice;
  const canSell = amount > 1;
  const canUpgradeEquipment =
    canUpgrade &&
    money >= upgradePrice * (amount > 0 ? amount : 1) &&
    !(equipmentType === EquipmentType.GROUND && amount === 0);

  const onUpgrade = () => {
    if (!canUpgradeEquipment) return;
    if (!muted) upgradeAudio.play();
    purchaseUpgrade({
      money,
      upgradeCost: upgradePrice * (amount > 0 ? amount : 1),
      subtractMoney,
      upgradeEquipment: () => upgradeEquipment(equipmentType),
    });
  };

  const onBuy = () => {
    if (!canBuy) return;
    if (!muted) buyAudio.play();
    purchaseEquipment({
      money,
      buyPrice,
      subtractMoney,
      increaseEquipment: () => increaseEquipment(equipmentType),
    });
  };

  const onSell = () => {
    if (!canSell) return;
    sellEquipment({
      sellPrice,
      decreaseEquipment: () => decreaseEquipment(equipmentType),
      addMoney,
    });
  };

  const COMMON_GRID_ITEM_PROPS = {
    overflow: "hidden",
    minWidth: 0,
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    backgroundColor: Theme.ButtonBackgroundColor,
  };

  const DISABLED_GRID_ITEM_PROPS = {
    overflow: "hidden",
    minWidth: 0,
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    background: Theme.DisabledBackground,
    cursor: "not-allowed",
  };

  const getEquipmentTypeColor = () => {
    switch (equipmentType) {
      case EquipmentType.GROUND:
        return Theme.GroundColor;
      case EquipmentType.AIR:
        return Theme.AirColor;
      case EquipmentType.SEA:
        return Theme.SeaColor;
    }
  };

  const EquipmentTypeIcon = () => {
    switch (equipmentType) {
      case EquipmentType.GROUND:
        return <CyclingIcon />;
      case EquipmentType.AIR:
        return <HelicopterIcon />;
      case EquipmentType.SEA:
        return <CargoShipIcon />;
    }
  };

  const [animateHeading, setAnimateHeading] = useState(false);

  useEffect(() => {
    setAnimateHeading(false);
    setTimeout(() => setAnimateHeading(true), 100);
  }, [currentTier]);

  return (
    <Grid
      w={"100%"}
      h={"100%"}
      templateRows={"repeat(8, 1fr)"}
      templateColumns={"repeat(2, 1fr)"}
      maxW={"300px"}
      backgroundColor={Theme.UIBorderColor}
      padding={Theme.BorderAndPaddingWidth}
      gap={Theme.BorderAndPaddingWidth}
      color={Theme.ButtonTextColor}
    >
      <GridItem
        rowSpan={2}
        colSpan={2}
        {...COMMON_GRID_ITEM_PROPS}
        borderLeft={"10px solid"}
        borderRight={"10px solid"}
        borderColor={getEquipmentTypeColor()}
      >
        <HStack
          className={
            currentTier !== 0 && animateHeading
              ? "animate__animated animate__flash"
              : undefined
          }
        >
          <EquipmentTypeIcon />
          <Text textAlign={"center"}>{name}</Text>
        </HStack>
      </GridItem>
      <GridItem
        colSpan={2}
        rowSpan={2}
        {...COMMON_GRID_ITEM_PROPS}
        cursor={"default"}
      >
        <VStack>
          {/* <Text>In Use / Owned</Text> */}
          <Text>
            In Use: {onJourney} / {amount} (Owned)
          </Text>
        </VStack>
      </GridItem>
      <Tooltip
        label={canBuy ? "" : "Not enough money"}
        placement="top"
        background={Theme.GameScreenBorderColor}
        color={Theme.UIBackgroundColor}
        hasArrow
      >
        <GridItem
          colSpan={1}
          rowSpan={2}
          {...(canBuy ? COMMON_GRID_ITEM_PROPS : DISABLED_GRID_ITEM_PROPS)}
          onClick={onBuy}
          cursor={canBuy ? "pointer" : "not-allowed"}
        >
          <HStack>
            <Text>Buy</Text>
            <MoneyDisplay money={-buyPrice} color={Theme.NegativeIncomeColor} />
          </HStack>
        </GridItem>
      </Tooltip>
      <Tooltip
        label={
          amount === 0
            ? "Nothing to sell"
            : amount === 1
            ? "Cannot sell last equipment"
            : ""
        }
        placement="top"
        background={Theme.GameScreenBorderColor}
        color={Theme.UIBackgroundColor}
        hasArrow
      >
        <GridItem
          colSpan={1}
          rowSpan={2}
          {...(canSell ? COMMON_GRID_ITEM_PROPS : DISABLED_GRID_ITEM_PROPS)}
          onClick={onSell}
          cursor={canSell ? "pointer" : "not-allowed"}
        >
          <HStack>
            <Text>Sell</Text>
            <MoneyDisplay money={sellPrice} color={Theme.PositiveIncomeColor} />
          </HStack>
        </GridItem>
      </Tooltip>
      <Tooltip
        label={canUpgradeEquipment ? "" : "Not enough money"}
        placement="top"
        background={Theme.GameScreenBorderColor}
        color={Theme.UIBackgroundColor}
        hasArrow
      >
        <GridItem
          colSpan={2}
          rowSpan={2}
          {...(canUpgradeEquipment
            ? COMMON_GRID_ITEM_PROPS
            : DISABLED_GRID_ITEM_PROPS)}
          onClick={onUpgrade}
          cursor={canUpgradeEquipment ? "pointer" : "not-allowed"}
        >
          <HStack
            className={
              canUpgradeEquipment && currentTier !== 0
                ? "animate__animated animate__flash"
                : undefined
            }
          >
            <Text>Upgrade</Text>
            <MoneyDisplay
              money={-(upgradePrice * (amount > 0 ? amount : 1))}
              color={Theme.NegativeIncomeColor}
            />
          </HStack>
        </GridItem>
      </Tooltip>
    </Grid>
  );
};
