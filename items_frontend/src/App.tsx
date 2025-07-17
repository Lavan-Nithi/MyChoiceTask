import { useState } from "react";
import { Box, ChakraProvider, Grid, Heading, Flex } from "@chakra-ui/react";
import ItemForm from "./components/ItemCreate";
import ItemList from "./components/ItemList";
import ItemDetail from "./components/ItemInfo";

function App() {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const BOX_HEIGHT = "450px";
  return (
    <ChakraProvider>
      <Flex
        bg="gray.900"
        minHeight="100vh"
        direction="column"
        align="center"
        justify="center"
        p={8}
      >
        <Heading mb={10} color="white" textAlign="center" fontSize={"xxx-large"}>
          Item Manager
        </Heading>

        <Grid
          templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }}
          gap={10}
          alignItems="flex-start"
          w="100%"
          maxW="1400px"
        >
          <Box
            bg="gray.700"
            p={6}
            borderRadius="md"
            border="1px solid"
            borderColor="white"
            w="100%"
            height={BOX_HEIGHT}
            maxW="100%"
            boxShadow="md"
          >
            <ItemList onSelect={setSelectedId} selectedId={selectedId} />
          </Box>

          <Box
            bg="gray.700"
            p={6}
            borderRadius="md"
            border="1px solid"
            borderColor="white"
            w="100%"
            maxW="100%"
            height={BOX_HEIGHT}
            boxShadow="md"
          >
            <ItemForm onCreate={() => setSelectedId(null)} />
          </Box>

          <Box
            bg="gray.700"
            p={6}
            borderRadius="md"
            border="1px solid"
            borderColor="white"
            w="100%"
            maxW="100%"
            height={BOX_HEIGHT}
            minHeight="300px"
            boxShadow="md"
            display="flex"
            justifyContent="center"
            textAlign="center"
          >
            {selectedId ? (
              <ItemDetail id={selectedId} />
            ) : (
              <Heading color="white" fontSize="lg" alignSelf="center">
                Select an item to view or update details
              </Heading>
            )}
          </Box>
        </Grid>
      </Flex>
    </ChakraProvider>
  );
}

export default App;
