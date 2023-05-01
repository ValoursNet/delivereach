import { Box, Grid, GridItem } from "@chakra-ui/react";
import { MapArea } from "./Maparea";
import { Equipment } from "./equipment/Equipment";
import { Theme } from "./theme";
import { TopBar } from "./TopBar";
import { Tutorial } from "./Tutorial";

export const GameScreen = () => {
  return (
    <Box w={"100%"} h={"100%"}>
      <Grid
        h={"100%"}
        w={"100%"}
        templateRows={"repeat(100, 1fr)"}
        templateColumns={"repeat(1, 1fr)"}
      >
        <GridItem
          overflow={"hidden"}
          rowSpan={5}
          display={"flex"}
          alignItems={"center"}
          backgroundColor={Theme.UIBackgroundColor}
          borderBottom={`${Theme.BorderAndPaddingWidth} solid`}
          borderColor={Theme.GameScreenBorderColor}
        >
          <TopBar />
        </GridItem>
        <GridItem overflow={"hidden"} rowSpan={70}>
          <MapArea />
        </GridItem>
        <GridItem
          overflow={"hidden"}
          rowSpan={25}
          display={"flex"}
          alignItems={"center"}
          borderTop={`${Theme.BorderAndPaddingWidth} solid`}
          borderColor={Theme.GameScreenBorderColor}
        >
          <Equipment />
        </GridItem>
      </Grid>
      <Tutorial />
    </Box>
  );
};
