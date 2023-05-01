import { createContext, useContext, useEffect, useState } from "react";
import { TickContext } from "./TickContext";

export type Journey = {
  sourceId: string;
  targetId: string;
  edgeId: string;
  percent: number;
  perTick: number;
  equipmentType: string;
  journeyId: number;
};

type JourneyContextType = {
    journeyList: Journey[];
    addJourney: (journey: Omit<Journey, "journeyId">) => void;
    removeJourney: (targetJourneyId: Journey["journeyId"]) => void;
    setJourneyList: React.Dispatch<React.SetStateAction<Journey[]>>;
    journeysDone: number;
    setNodePositions: React.Dispatch<NodePos[]>;
    nodePositions: NodePos[];
};

export type NodePos = {
    id:string, 
    position:{
        x:number,
        y:number
    }
};


export const JourneyContext = createContext<JourneyContextType>(
  {} as JourneyContextType
);

export const JourneyProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { tick } = useContext(TickContext);
  //journeyList should be an object, not an array
  const [journeyList, setJourneyList] = useState<Journey[]>([]);
  const [latestJourneyId, setLatestJourneyId] = useState(0);
  const [deliveriesMade, setDeliveriesMade] = useState(0);
  const [nodePositions, setNodePositions] = useState<NodePos[]>([]);

  const addJourney = (journey: Omit<Journey, "journeyId">) => {
    setJourneyList((existingJourneys) => [
      ...existingJourneys,
      { ...journey, journeyId: latestJourneyId },
    ]);
    setLatestJourneyId((latestJourneyId) => latestJourneyId + 1);
  };

  const removeJourney = (targetJourneyId: Journey["journeyId"]) => {
    setJourneyList((existingJourneys) =>
      existingJourneys.filter(
        (journeyItem) => journeyItem.journeyId !== targetJourneyId
      )
    );
    setDeliveriesMade((deliveriesMade) => deliveriesMade + 1);
  };

  useEffect(() => {
    setJourneyList((existingJourneys) =>
      existingJourneys
        .map((journeyItem) => ({
          ...journeyItem,
          percent: journeyItem.percent + journeyItem.perTick,
        }))
    );
  }, [tick]);

  const value = {
    journeyList,
    addJourney,
    removeJourney,
    setJourneyList,
    journeysDone: deliveriesMade,
    setNodePositions,
    nodePositions
  };

  return (
    <JourneyContext.Provider value={value}>{children}</JourneyContext.Provider>
  );
};
