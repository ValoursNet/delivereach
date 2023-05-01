import { Grid, GridItem, Text, Tooltip } from "@chakra-ui/react";
import { memo, useContext, useEffect, useState } from "react";
import { Handle, Position } from "reactflow";
import { TickContext } from "./contexts/TickContext";
import { JourneyContext } from "./contexts/JourneyContext";
import { useEquipment } from "./contexts/EquipmentContext";
import { node } from "./Maparea";
import { displayTime, getJourneyReward } from "./utils";
import { MoneyDisplay } from "./MoneyDisplay";
import { Theme } from "./theme";
import { EquipmentType } from "./equipment/constants/equipment-types";
import { useGameSettingsContext } from "./contexts/GameSettingsContext";

export const LocationNode = memo(
  ({ data, id }: { data: node["data"]; id: string }) => {
    const { muted, currentTier } = useGameSettingsContext();
    const income = getJourneyReward(data.baseTime, data.routeType, currentTier);
    const locationType = data.routeType;
    const [incomeOpen, setIncomeOpen] = useState(false);
    const [currentIncome, setCurrentIncome] = useState(0);
    const { tick, addMoney } = useContext(TickContext);
    const { addJourney, removeJourney, journeyList } =
      useContext(JourneyContext);
    const { canSendEquipmentOnJourney, AIR, GROUND, SEA } = useEquipment();
    const sendAudio = new Audio("/audio/send.wav");

    const getCurrentSpeedFactor = () => {
      switch (locationType) {
        case EquipmentType.AIR:
          return AIR.speedFactor;
        case EquipmentType.GROUND:
          return GROUND.speedFactor;
        case EquipmentType.SEA:
          return SEA.speedFactor;
      }
    };

    const getPercentPerTick = () => {
      const percentPerTick = 100 / (data.baseTime / getCurrentSpeedFactor());
      return percentPerTick;
    };

    const timeToDestination = displayTime(
      data.baseTime / getCurrentSpeedFactor()
    );

    const canSend = canSendEquipmentOnJourney(locationType);

    const addJourneyToList = () => {
      if (!canSend) return;
      if (!muted) sendAudio.play();
      addJourney({
        sourceId: "1",
        targetId: id,
        edgeId: id,
        percent: 0,
        equipmentType: locationType,
        perTick: getPercentPerTick(),
      });
    };

    useEffect(() => {
      setIncomeOpen(false);
      let incomeThisTick = 0;
      journeyList
        .filter((journey) => journey.targetId === id)
        .forEach((journey) => {
          if (journey.percent >= 100) {
            // If two nodes are triggered at the same time, you don't get both incomes
            setIncomeOpen(true);
            incomeThisTick += income;
            removeJourney(journey.journeyId);
          }
        });
      setCurrentIncome(incomeThisTick);
      addMoney(incomeThisTick);
    }, [tick]);

    // create an interval, where when triggered it will setIncomeOpen for 3 seconds, then set it to false
    // if the function is called again, it will reset the timer
    // if the function is called again while the timer is running, it will reset the timer

    const isHome = data.baseTime === 0;

    const handleColor = () => {
      if (isHome) {
        return "white";
      }

      if (data.routeType === EquipmentType.GROUND) {
        return Theme.GroundColor;
      } else if (data.routeType === EquipmentType.AIR) {
        return Theme.AirColor;
      } else if (data.routeType === EquipmentType.SEA) {
        return Theme.SeaColor;
      }
    };

    return (
      <div
        className="react-flow__node-default"
        onClick={() => addJourneyToList()}
        style={{
          cursor: !isHome ? "pointer" : "default",
          background: "transparent",
          width: "10px",
        }}
      >
        <>
          <Tooltip
            sx={{
              fontFamily: Theme.FontFamily,
              color: Theme.PositiveIncomeColor,
            }}
            label={"+$" + currentIncome}
            placement="top"
            isOpen={incomeOpen}
          >
            <div
              style={{
                position: "absolute",
                // center using left and top and transform
                left: "50%",
                top: "50%",
                transform: "translate(-50%, -50%)",
                padding: "2px",
                background: "rgba(0,0,0,1)",
                border: `2px solid ${handleColor()}`,
                color: "#fff",
                margin: "10px",
                minWidth: "max-content",
                fontSize: "20px",
              }}
            >
              <Grid
                templateColumns={"repeat(2, 1fr)"}
                templateRows={"repeat(2m 1fr)"}
                opacity={canSend ? 1 : 0.5}
              >
                {!isHome && (
                  <>
                    <GridItem
                      borderRight={`1px solid ${handleColor()}`}
                      p={"2px"}
                    >
                      <Text>{timeToDestination}</Text>
                    </GridItem>
                    <GridItem
                      p={"2px"}
                      justifyContent={"center"}
                      display={"flex"}
                    >
                      <MoneyDisplay
                        color={Theme.PositiveIncomeColor}
                        money={income}
                      />
                    </GridItem>
                  </>
                )}

                <GridItem
                  colSpan={2}
                  borderTop={!isHome ? `1px solid ${handleColor()}` : undefined}
                  p={"2px"}
                >
                  <Text>{data.label}</Text>
                </GridItem>
              </Grid>
            </div>
          </Tooltip>
          <Handle
            type="source"
            position={Position.Top}
            id="a"
            style={{ background: "#555", opacity: 0 }}
          />
          <Handle
            type="target"
            position={Position.Bottom}
            id="b"
            style={{ opacity: 0 }}
          />
        </>
      </div>
    );
  }
);
