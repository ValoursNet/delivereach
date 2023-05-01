import ReactFlow, { ReactFlowInstance, useEdgesState, useNodesState } from "reactflow";
import { LocationNode } from "./Locationnode";
import { CustomEdge } from "./Customedge";
import "reactflow/dist/style.css";
import "./map.css";
import { EquipmentType } from "./equipment/constants/equipment-types";
import { Tier, useGameSettingsContext } from "./contexts/GameSettingsContext";
import { TIERED_LOCATIONS } from "./locations/tiered-locations";
import { useContext, useEffect, useMemo, useState } from "react";
import { Box, HStack } from "@chakra-ui/react";
import { MoneyDisplay } from "./MoneyDisplay";
import { Theme } from "./theme";
import { TickContext } from "./contexts/TickContext";
import { JourneyContext, Journey, NodePos } from "./contexts/JourneyContext";
import { CyclingIcon, CargoShipIcon, HelicopterIcon } from "./icons/Icons";

const nodeTypes = {
  locationNode: LocationNode,
};

const edgeTypes = {
  customEdge: CustomEdge,
};

// const initialNodes = [
//   { id: '1', position: { x: 400, y: 400 }, data: { label: 'London' } },
//   { id: '2', position: { x: 0, y: 600 }, data: {label: "Manchester" }, type: 'locationNode' },
//   { id: '3', position: { x: 200, y: 700 }, data: { label: 'New York' }, type: 'locationNode' },
//   { id: '4', position: { x: 500, y: 100 }, data: { label: 'Durban' }, type: 'locationNode' },
// ];
// const initialEdges = [
//     { id: 'e1-2', source: '1', target: '2', animated: true, type: 'customEdge' },
//     { id: 'e1-3', source: '1', target: '3', animated: true, type: 'customEdge' },
//     { id: 'e4-1', source: '1', target: '4', animated: true, type: 'customEdge', label: 'Example edge label', style: { stroke: 'red' } },
// ];

export type node = {
  id: string;
  position: { x: number; y: number };
  data: {
    label: string;
    baseTime: number;
    routeType: EquipmentType;
  };
  type: string;
};

const getNodeLocationOptions = () => {
  const xInterval = 120;
  const yInterval = 100;
  const nodeLocationOptions: { x: number; y: number }[] = [];
  for (let i = 0; i < 16; i++) {
    const row = Math.floor(i / 4);
    nodeLocationOptions.push({ x: i * xInterval, y: 0 + row * yInterval });
  }
  return [
    { x: 200, y: 0 },
    { x: 400, y: 0 },
    { x: 600, y: 0 },
    { x: 800, y: 0 },
    { x: 200, y: 100 },
    { x: 800, y: 100 },
    { x: 200, y: 200 },
    { x: 800, y: 200 },
    { x: 200, y: 300 },
    { x: 600, y: 300 },
    { x: 360, y: 300 },
    { x: 800, y: 300 },
    { x: 200, y: 400 },
  ].sort(() => Math.random() - 0.5);
};

const getNodesAndEdges = (currentTier: Tier) => {
  const locationOptions = getNodeLocationOptions();
  const initialNodes: node[] = [];
  const initialEdges: {
    id: string;
    source: string;
    target: string;
    animated: boolean;
    type: string;
    style: any;
  }[] = [];

  initialNodes.push({
    id: "1",
    position: { x: 500, y: 180 },
    data: {
      label: "Home",
      baseTime: 0,
      routeType: EquipmentType.GROUND,
    },
    type: "locationNode",
  });

  TIERED_LOCATIONS[currentTier].forEach((location, index) => {
    const id = "loc-" + index.toString();
    initialNodes.push({
      id: id,
      position: locationOptions[index], //location.position,
      data: {
        label: location.name,
        baseTime: location.baseTime,
        routeType: location.routeType,
      },
      type: "locationNode",
    });
    initialEdges.push({
      id: "e1-" + id,
      source: "1",
      target: id,
      animated: false,
      style: { stroke: "white", strokeWidth: 2 },
      type: "customEdge",
    });
  });

  return {
    nodes: initialNodes,
    edges: initialEdges,
  };
};

export const MapArea = () => {
  const { currentTier } = useGameSettingsContext();
  const { money } = useContext(TickContext);

  const mapTier = useMemo(() => {
    switch (currentTier) {
      case 0:
        return 0;
      case 1:
      case 2:
        return 1;
      case 3:
      case 4:
      case 5:
        return 2;
      case 6:
      case 7:
      case 8:
        return 3;
      case 9:
      case 10:
        return 4;
      default:
        return 0;
    }
  }, [currentTier]);

  const proOptions = { hideAttribution: true };
  const { nodes: initialNodes, edges: initialEdges } =
    getNodesAndEdges(mapTier);
  const [nodes, setNodes] = useNodesState(initialNodes);
  const [edges, setEdges] = useEdgesState(initialEdges);
  const { setNodePositions, nodePositions, journeyList } = useContext(JourneyContext);
  const [rfInstance, setRfInstance] = useState<ReactFlowInstance>();

  useEffect(() => {
    const { nodes: newNodes, edges: newEdges } = getNodesAndEdges(mapTier);
    setNodes(newNodes);
    setEdges(newEdges);
  }, [mapTier, setNodes, setEdges]);

  useEffect(() => {
    if (rfInstance) {
      const flow = rfInstance.toObject();
      setNodePositions(flow.nodes.map((node) => ({id:node.id, position:{
        x: flow.viewport.x + (node.position.x * flow.viewport.zoom),
        y: flow.viewport.y + (node.position.y * flow.viewport.zoom)
      }})));
    }
  }, [rfInstance, nodes]);

  // const onConnect = useCallback(
  //   (params: Edge | Connection) => setEdges((eds) => addEdge(params, eds)),
  //   [setEdges]
  // );

  return (
    <div
      style={{
        // backgroundImage: "url(./retro-london.png)",
        backgroundImage: "url(./space-bg.png)",
        backgroundSize: "cover",
        width: "100%",
        height: "100%",
        position: "relative",
      }}
    >
      <Box position={"absolute"} bottom={"-5px"} left={0}>
        <HStack
          backgroundColor={Theme.ButtonBackgroundColor}
          color={Theme.ButtonTextColor}
          px={Theme.BorderAndPaddingWidth}
          border={`${Theme.BorderAndPaddingWidth} solid`}
          borderColor={Theme.UIBorderColor}
          fontSize={20}
        >
          <MoneyDisplay money={money} />
        </HStack>
      </Box>
      <div
        style={{ background: "rgba(0,0,0,0.5)", width: "100%", height: "100%" }}
      >
        <ReactFlow
          proOptions={proOptions}
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          edgeTypes={edgeTypes}
          panOnDrag={false}
          selectionOnDrag={false}
          snapToGrid={true}
          snapGrid={[15, 15]}
          panOnScroll={false}
          nodesDraggable={false}
          nodesConnectable={false}
          // elementsSelectable={false}
          edgesFocusable={false}
          zoomOnDoubleClick={false}
          zoomOnScroll={false}
          zoomOnPinch={false}
          maxZoom={0.6}
          fitView={true}
          onInit={setRfInstance}
          style={{
            cursor: "default",
          }}
        >
            <VehicleIcons journeyList={journeyList} nodePositions={nodePositions} />
          {/* <Controls /> */}
          {/* <MiniMap /> */}
        </ReactFlow>
      </div>
    </div>
  );
};

// this function gets a position on a percentage between two points
const getPositionOnLine = (start: { x: number; y: number; }, end: { x: number; y: number; }, percentage: number) => {
    const x = start.x + (end.x - start.x) * percentage;
    const y = start.y + (end.y - start.y) * percentage;
    return { x, y };
};

const getEquiptmentType = (type:string) => {
    switch(type){
        case EquipmentType.GROUND:
            return <CyclingIcon/>;
        case EquipmentType.SEA:
            return <CargoShipIcon/>;
        case EquipmentType.AIR:
            return <HelicopterIcon/>;
    }
}


const VehicleIcons = ({journeyList, nodePositions}:{journeyList:Journey[], nodePositions:NodePos[]}) => {
    const home = nodePositions.find((node) => node.id === "1")!;
    if(!home) return (<></>);
    const { position: homePosition } = home;
    return (
        <>
            {journeyList.map((journey, index) => {
                const { position } = nodePositions.find((node) => node.id === journey.targetId)!;
                const percent = journey.percent > 100 ? 1 : journey.percent / 100;
                const targetPosition = getPositionOnLine(homePosition, position, percent);
                const icon = getEquiptmentType(journey.equipmentType);
                return (
                    <div
                        key={index}
                        style={{
                            position: "absolute",
                            left: targetPosition.x,
                            top: targetPosition.y,
                            width: "24px",
                            height: "24px",
                            background: "black",
                            zIndex: -1,
                        }}
                    >
                        {icon}
                    </div>
                );
            }
                )}
        </>
    );
}
