import { useState } from "react";
import { Container, VStack, Text, Input, Button, HStack, Box, useToast } from "@chakra-ui/react";
import { FaDollarSign, FaCoins } from "react-icons/fa";

const Index = () => {
  const [amount, setAmount] = useState("");
  const [coins, setCoins] = useState(0);
  const toast = useToast();

  const handleDeposit = () => {
    const depositAmount = parseFloat(amount);
    if (isNaN(depositAmount) || depositAmount <= 0) {
      toast({
        title: "Invalid amount",
        description: "Please enter a valid amount to deposit.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    const newCoins = depositAmount * 10; // Assuming 1 dollar = 10 coins
    setCoins(coins + newCoins);
    setAmount("");
    toast({
      title: "Deposit successful",
      description: `You have received ${newCoins} coins.`,
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <VStack spacing={4}>
        <Text fontSize="3xl" fontWeight="bold">
          Casino Platform
        </Text>
        <Text fontSize="xl">Deposit money and convert to coins to play games</Text>
        <HStack spacing={2}>
          <Input placeholder="Enter amount in dollars" value={amount} onChange={(e) => setAmount(e.target.value)} />
          <Button leftIcon={<FaDollarSign />} colorScheme="teal" onClick={handleDeposit}>
            Deposit
          </Button>
        </HStack>
        <Box mt={4} p={4} borderWidth={1} borderRadius="md" width="100%" textAlign="center">
          <Text fontSize="2xl">Your Coins</Text>
          <HStack justifyContent="center" mt={2}>
            <FaCoins size="24" />
            <Text fontSize="2xl" fontWeight="bold">
              {coins}
            </Text>
          </HStack>
        </Box>
      </VStack>
    </Container>
  );
};

export default Index;
