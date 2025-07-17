import React, { useState } from "react";
import { createItem } from "../api";
import { Input, Select, Button, VStack, Heading, useToast } from "@chakra-ui/react";

interface Props {
  onCreate: () => void;
}

const ItemCreate: React.FC<Props> = ({ onCreate }) => {
  const [name, setName] = useState("");
  const [group, setGroup] = useState<"Primary" | "Secondary">("Primary");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const toast = useToast();

  const handleSubmit = async () => {
    if (!name.trim()) {
      toast({
        title: "Name is required",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    setIsSubmitting(true);
    try {
      await createItem({ name, group });
      setName("");
      toast({
        title: "Item created successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      onCreate();
    } catch (error: any) {
      toast({
        title: "Error creating item",
        description: error.response?.data?.error || error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

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
        Create Item
      </Heading>
      <Input
        placeholder="Item name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        bg="white"
        isDisabled={isSubmitting}
      />
      <Select
        value={group}
        onChange={(e) => setGroup(e.target.value as "Primary" | "Secondary")}
        bg="white"
        isDisabled={isSubmitting}
      >
        <option value="Primary">Primary</option>
        <option value="Secondary">Secondary</option>
      </Select>
      <Button
        onClick={handleSubmit}
        colorScheme="blue"
        isLoading={isSubmitting}
        loadingText="Creating..."
        fontWeight="semibold"
      >
        Create Item
      </Button>
    </VStack>
  );
};

export default ItemCreate;
