import React, { useEffect, useState } from "react";
import { Item } from "../types";
import { getItems } from "../api";
import { List, Button, Box, ListItem, Heading } from "@chakra-ui/react";

interface Props {
  onSelect: (id: number) => void;
  selectedId: number | null;
}

const ItemList: React.FC<Props> = ({ onSelect, selectedId }) => {
  const [items, setItems] = useState<Item[]>([]);

  const fetchItems = async () => {
    try {
      const res = await getItems();
      setItems(res.data);
    } catch (error) {
      console.error("Failed to fetch items:", error);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <Box
      display="flex"
      flexDirection="column"
      height="100%"
      
    >
      <Heading size="lg" m={5} color="white" textAlign="center">
        Item List
      </Heading>
      <Box
        flex="1"
        overflowY="auto"
        pr={2}
        mb={4}
      >
        <List spacing={3}>
          {items.map((item) => {
            const isSelected = selectedId === item.id;
            return (
              <ListItem
                key={item.id}
                onClick={() => onSelect(item.id)}
                cursor="pointer"
                bg={isSelected ? "green.500" : "gray.500"}
                color="white"
                p={3}
                borderRadius="md"
                _hover={{ bg: isSelected ? "green.300" : "green.300" }}
                transition="background-color 0.2s"
              >
                {item.name} ({item.group})
              </ListItem>
            );
          })}
        </List>
      </Box>

      <Button
        onClick={fetchItems}
        mt="auto"
        colorScheme="green"
        w="full"
        fontWeight="semibold"
      >
        Refresh
      </Button>
    </Box>
  );
};

export default ItemList;