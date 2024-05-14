import { useState, useEffect } from "react";
import { Container, VStack, Text, Button, Box, useToast } from "@chakra-ui/react";

const SnakeGame = () => {
  const [coins, setCoins] = useState(100);
  const [gameOver, setGameOver] = useState(false);
  const toast = useToast();

  const handleStartGame = () => {
    if (coins < 10) {
      toast({
        title: "Insufficient coins",
        description: "You need at least 10 coins to play.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    setCoins(coins - 10);
    setGameOver(false);
  };

  useEffect(() => {
    if (gameOver) {
      toast({
        title: "Game Over",
        description: "You lost the game.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  }, [gameOver]);

  return (
    <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <VStack spacing={4}>
        <Text fontSize="3xl" fontWeight="bold">
          Snake Game
        </Text>
        <Text fontSize="xl">Bet 10 coins to play the game</Text>
        <Button colorScheme="teal" onClick={handleStartGame}>
          Start Game
        </Button>
        <Box mt={4} p={4} borderWidth={1} borderRadius="md" width="100%" textAlign="center">
          <Text fontSize="2xl">Your Coins</Text>
          <Text fontSize="2xl" fontWeight="bold">
            {coins}
          </Text>
        </Box>
        <Box mt={4} p={4} borderWidth={1} borderRadius="md" width="100%" textAlign="center">
          {}
        </Box>
      </VStack>
    </Container>
  );
};

export default SnakeGame;
