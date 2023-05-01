import {
  Modal,
  ModalContent,
  ModalOverlay,
  VStack,
  Text,
  Stack,
  Grid,
  GridItem,
  HStack,
  Box,
  Button,
  Input,
  InputGroup,
} from "@chakra-ui/react";
import { useGameSettingsContext } from "./contexts/GameSettingsContext";
import { Theme } from "./theme";
import { MoneyDisplay } from "./MoneyDisplay";
import { displayTime } from "./utils";
import { useState } from "react";

export const Tutorial = () => {
  const {
    showTutorial,
    setShowTutorial,
    setCompanyName: saveCompanyName,
  } = useGameSettingsContext();
  const [step, setStep] = useState(0);
  const [companyName, setCompanyName] = useState("DELIVEREACH");

  const handleClose = () => {
    setShowTutorial(false);
  };

  const handleBegin = () => {
    saveCompanyName(companyName);
    setShowTutorial(false);
  };

  return (
    <Modal
      isOpen={showTutorial}
      onClose={handleClose}
      size={"xl"}
      closeOnOverlayClick={false}
      returnFocusOnClose={false}
      autoFocus={false}
    >
      <ModalOverlay />
      <ModalContent
        backgroundColor={Theme.UIBackgroundColor}
        color={Theme.ButtonTextColor}
        border={`${Theme.BorderAndPaddingWidth} solid`}
        borderColor={Theme.UIBorderColor}
        px={20}
        py={5}
        maxH={"75vh"}
        my={"auto"}
        overflowY={"auto"}
      >
        <Stack gap={5}>
          <HStack w={"100%"} justifyContent={"center"}>
            <Text fontSize={30} fontFamily={Theme.FontFamily}>
              Delivereach
            </Text>
          </HStack>
          {step === 0 && (
            <>
              <Text fontFamily={Theme.FontFamily}>
                After one too many next day deliveries not arriving on time
                you're sick of the global elite running the delivery racket.
                You've decided to step up and start your own company - hopefully
                making a fortune along the way.
              </Text>
              <Stack>
                <Text fontFamily={Theme.FontFamily}>
                  To send a delivery, click a destination.{" "}
                </Text>
                <VStack>
                  <Grid
                    templateColumns={"repeat(2, 1fr)"}
                    templateRows={"repeat(2m 1fr)"}
                    border={"3px solid #fff"}
                    fontFamily={Theme.FontFamily}
                  >
                    <GridItem borderRight={"3px solid #fff"} p={"5px"}>
                      <Text
                        fontFamily={Theme.FontFamily}
                        textTransform={"uppercase"}
                      >
                        {displayTime(10)}
                      </Text>
                    </GridItem>
                    <GridItem
                      p={"5px"}
                      justifyContent={"center"}
                      display={"flex"}
                    >
                      <MoneyDisplay money={10} />
                    </GridItem>

                    <GridItem
                      colSpan={2}
                      borderTop={"3px solid #fff"}
                      p={"5px"}
                      display={"flex"}
                      justifyContent={"center"}
                    >
                      <Text
                        fontFamily={Theme.FontFamily}
                        textTransform={"uppercase"}
                      >
                        Destination
                      </Text>
                    </GridItem>
                  </Grid>
                </VStack>
              </Stack>
              <HStack w={"100%"} justifyContent={"center"}>
                <Button
                  backgroundColor={Theme.ButtonBackgroundColor}
                  color={Theme.ButtonTextColor}
                  _hover={{
                    backgroundColor: Theme.UIBorderColor,
                  }}
                  onClick={() => setStep(1)}
                >
                  <Text fontFamily={Theme.FontFamily}>Next Page</Text>
                </Button>
              </HStack>
            </>
          )}
          {step === 1 && (
            <>
              <VStack>
                <Text fontFamily={Theme.FontFamily}>
                  You can only send a delivery to a destination if you have
                  available equipment of the correct type. The type can be seen
                  by each destination, and at the top of the equipment panel.
                </Text>
                <VStack w={"100%"} justifyContent={"space-between"}>
                  <HStack>
                    <Box p={"20px"} backgroundColor={Theme.GroundColor} />{" "}
                    <Text>= </Text>{" "}
                    <Box
                      border={`${Theme.BorderAndPaddingWidth} solid`}
                      borderColor={Theme.UIBorderColor}
                      backgroundColor={Theme.ButtonBackgroundColor}
                    >
                      <Box
                        borderLeft={`10px solid`}
                        borderRight={`10px solid`}
                        borderColor={Theme.GroundColor}
                        p={"10px"}
                      >
                        <Text fontFamily={Theme.FontFamily}>EQUIPMENT</Text>
                      </Box>
                    </Box>
                  </HStack>
                  <HStack>
                    <Box p={"20px"} backgroundColor={Theme.SeaColor} />{" "}
                    <Text>= </Text>{" "}
                    <Box
                      border={`${Theme.BorderAndPaddingWidth} solid`}
                      borderColor={Theme.UIBorderColor}
                      backgroundColor={Theme.ButtonBackgroundColor}
                    >
                      <Box
                        borderLeft={`10px solid`}
                        borderRight={`10px solid`}
                        borderColor={Theme.SeaColor}
                        p={"10px"}
                      >
                        <Text fontFamily={Theme.FontFamily}>EQUIPMENT</Text>
                      </Box>
                    </Box>
                  </HStack>
                  <HStack>
                    <Box p={"20px"} backgroundColor={Theme.AirColor} />{" "}
                    <Text>= </Text>{" "}
                    <Box
                      border={`${Theme.BorderAndPaddingWidth} solid`}
                      borderColor={Theme.UIBorderColor}
                      backgroundColor={Theme.ButtonBackgroundColor}
                    >
                      <Box
                        borderLeft={`10px solid`}
                        borderRight={`10px solid`}
                        borderColor={Theme.AirColor}
                        p={"10px"}
                      >
                        <Text
                          textAlign={"center"}
                          fontFamily={Theme.FontFamily}
                        >
                          EQUIPMENT
                        </Text>
                      </Box>
                    </Box>
                  </HStack>
                </VStack>
              </VStack>
              <HStack w={"100%"} justifyContent={"center"}>
                <Button
                  backgroundColor={Theme.ButtonBackgroundColor}
                  color={Theme.ButtonTextColor}
                  _hover={{
                    backgroundColor: Theme.UIBorderColor,
                  }}
                  onClick={() => setStep(2)}
                >
                  <Text fontFamily={Theme.FontFamily}>Next Page</Text>
                </Button>
              </HStack>
            </>
          )}
          {step === 2 && (
            <>
              <Text fontFamily={Theme.FontFamily}>
                You can buy, sell and upgrade your equipment in the equipment
                panel. Upgraded equipment will allow you to reach destinations a
                lot faster, a lot further, and for a much larger reward.
              </Text>
              <Text fontFamily={Theme.FontFamily}>
                Begin your journey by entering your company name below:
              </Text>
              <InputGroup border={`${Theme.BorderAndPaddingWidth} solid`}>
                <Input
                  border={"none"}
                  fontFamily={Theme.FontFamily}
                  textTransform={"uppercase"}
                  placeholder={"Company Name"}
                  onChange={(e) => setCompanyName(e.target.value)}
                  _focus={{ outline: "none", boxShadow: "none" }}
                  outline={"none"}
                  value={companyName}
                />
                <Button
                  right={0}
                  onClick={() => setCompanyName("DELIVEREACH")}
                  backgroundColor={Theme.ButtonBackgroundColor}
                  isDisabled={companyName === "DELIVEREACH"}
                  borderRadius={0}
                  _hover={
                    companyName === "DELIVEREACH"
                      ? {}
                      : { color: Theme.UIBorderColor }
                  }
                >
                  X
                </Button>
              </InputGroup>
              <HStack w={"100%"} justifyContent={"center"}>
                <Button
                  backgroundColor={Theme.ButtonBackgroundColor}
                  color={Theme.ButtonTextColor}
                  _hover={
                    companyName === ""
                      ? {}
                      : { backgroundColor: Theme.UIBorderColor }
                  }
                  isDisabled={companyName === ""}
                  onClick={handleBegin}
                >
                  <Text fontFamily={Theme.FontFamily}>Start Delivering</Text>
                </Button>
              </HStack>
            </>
          )}
        </Stack>
      </ModalContent>
    </Modal>
  );
};
