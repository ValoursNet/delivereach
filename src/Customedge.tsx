import { useContext, useEffect, useState } from "react";
import { getStraightPath } from "reactflow";
import { Journey, JourneyContext } from "./contexts/JourneyContext";
import { CyclingIcon } from "./icons/Icons";

export const CustomEdge = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
//   sourcePosition,
//   targetPosition,
  style = {},
  markerEnd,
  target,
}: any) => {
  const [edgePath] = getStraightPath({
    sourceX,
    sourceY,
    // sourcePosition,
    targetX,
    targetY,
    // targetPosition,
    // borderRadius: 0,
  });
  const { journeyList } = useContext(JourneyContext);
  const [edgeJourneys, setEdgeJourneys] = useState<Journey[]>([]);

  useEffect(() => {
    const myList = journeyList.filter((journey) => journey.targetId === target);
    setEdgeJourneys(myList);
    return;
  }, [journeyList, target]);

  return (
    <>
      <path
        id={id}
        style={style}
        className="react-flow__edge-path"
        d={edgePath}
        markerEnd={markerEnd}
      />
      {edgeJourneys.map(() => {
        return (
            <g style={{position:"absolute", top: 0, right: 0, width: "100px", height:"100px", background: "red", zIndex: 99999, display:"block"}}>
                <CyclingIcon/>
            </g>
        //   <text key={"journey-" + index} style={{ stroke: "white" }}>
        //     <textPath
        //       href={`#${id}`}
        //       style={{ fontSize: 12, stroke: "white" }}
        //       startOffset={journey.percent + "%"}
        //       textAnchor="middle"
        //     >
        //       Boat
        //     </textPath>
        //   </text>
        );
      })}
    </>
  );
};
