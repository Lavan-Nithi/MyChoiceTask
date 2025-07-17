import React, { useEffect, useState } from "react";
import { getItem, updateItem } from "../api";
import { Item } from "../types";
import {
  Input,
  Select,
  Button,
  VStack,
  Box,
  Text,
  useToast,
  Spinner,
  Heading,
} from "@chakra-ui/react";

interface Props {
  id: number;
}

const formatDateTime = (isoString: string) => {
  const date = new Date(isoString);
  return date.toLocaleString();
};

const ItemInfo: React.FC<Props> = ({ id }) => {
  const [item, setItem] = useState<Item | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const toast = useToast();

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const res = await getItem(id);
        setItem(res.data);
      } catch (error) {
        toast({
          title: "Failed to load item",
          status: "error",
          duration: 4000,
          isClosable: true,
        });
      }
    };
    fetchItem();
  }, [id, toast]);

  const handleUpdate = async () => {
    if (!item) return;

    setIsUpdating(true);
    try {
      await updateItem(id, { name: item.name, group: item.group });
      toast({
        title: "Item updated",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error: any) {
      toast({
        title: "Error updating item",
        description: error.response?.data?.error || error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsUpdating(false);
    }
  };

  if (!item)
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="200px"
      >
        <Spinner size="xl" color="green.400" />
      </Box>
    );

  return (
    <VStack
      mb={5}
      bg="gray.700"
      p={6}
      spacing={5}
      align="stretch"
      maxW="400px"
      w="100%"
    >
      <Heading size="lg" color="white" textAlign="center">
        Update Item
      </Heading>
      <Input
        value={item.name}
        onChange={(e) => setItem({ ...item, name: e.target.value })}
        bg="white"
        isDisabled={isUpdating}
        focusBorderColor="red.500"
      />
      <Select
        value={item.group}
        onChange={(e) =>
          setItem({ ...item, group: e.target.value as "Primary" | "Secondary" })
        }
        bg="white"
        isDisabled={isUpdating}
        focusBorderColor="red.500"
      >
        <option value="Primary">Primary</option>
        <option value="Secondary">Secondary</option>
      </Select>
      <Text color="gray.300" fontSize="sm">
        Created: {formatDateTime(item.created_at)}
      </Text>
      <Text color="gray.300" fontSize="sm">
        Updated: {formatDateTime(item.updated_at)}
      </Text>
      <Button
        onClick={handleUpdate}
        colorScheme="red"
        isLoading={isUpdating}
        loadingText="Updating..."
        fontWeight="semibold"
        w="full"
      >
        Update Item
      </Button>
    </VStack>
  );
};

export default ItemInfo;
