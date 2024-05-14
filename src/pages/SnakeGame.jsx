import { useState, useEffect, useCallback } from "react";
import { Container, VStack, Text, Button, Box, useToast } from "@chakra-ui/react";

const SnakeGame = () => {
  const [coins, setCoins] = useState(100);
  const [gameOver, setGameOver] = useState(false);
  const [snake, setSnake] = useState([{ x: 10, y: 10 }]);
  const [food, setFood] = useState({ x: 15, y: 15 });
  const [direction, setDirection] = useState({ x: 0, y: 0 });
  const [speed, setSpeed] = useState(200);
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
    setSnake([{ x: 10, y: 10 }]);
    setFood({ x: 15, y: 15 });
    setDirection({ x: 1, y: 0 });
  };

  const moveSnake = useCallback(() => {
    setSnake((prevSnake) => {
      const newSnake = [...prevSnake];
      const head = { ...newSnake[0] };
      head.x += direction.x;
      head.y += direction.y;
      newSnake.unshift(head);
      if (head.x === food.x && head.y === food.y) {
        setFood({ x: Math.floor(Math.random() * 20), y: Math.floor(Math.random() * 20) });
      } else {
        newSnake.pop();
      }
      return newSnake;
    });
  }, [direction, food]);

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

  useEffect(() => {
    const handleKeyDown = (e) => {
      switch (e.key) {
        case "ArrowUp":
          setDirection({ x: 0, y: -1 });
          break;
        case "ArrowDown":
          setDirection({ x: 0, y: 1 });
          break;
        case "ArrowLeft":
          setDirection({ x: -1, y: 0 });
          break;
        case "ArrowRight":
          setDirection({ x: 1, y: 0 });
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    if (!gameOver) {
      const interval = setInterval(moveSnake, speed);
      return () => clearInterval(interval);
    }
  }, [moveSnake, gameOver, speed]);

  useEffect(() => {
    const head = snake[0];
    if (head.x < 0 || head.x >= 20 || head.y < 0 || head.y >= 20 || snake.slice(1).some((segment) => segment.x === head.x && segment.y === head.y)) {
      setGameOver(true);
    }
  }, [snake]);

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
          <Box display="grid" gridTemplateColumns="repeat(20, 20px)" gridTemplateRows="repeat(20, 20px)">
            {Array.from({ length: 20 }).map((_, row) => Array.from({ length: 20 }).map((_, col) => <Box key={`${row}-${col}`} width="20px" height="20px" bg={snake.some((segment) => segment.x === col && segment.y === row) ? "green.500" : food.x === col && food.y === row ? "red.500" : "gray.200"} />))}
          </Box>
        </Box>
      </VStack>
    </Container>
  );
};

export default SnakeGame;
