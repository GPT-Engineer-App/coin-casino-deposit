import { useState } from "react";
import { Container, VStack, Text, Button, Box } from "@chakra-ui/react";

const TicTacToe = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);

  const handleClick = (index) => {
    if (board[index] || calculateWinner(board)) return;
    const newBoard = board.slice();
    newBoard[index] = isXNext ? "X" : "O";
    setBoard(newBoard);
    setIsXNext(!isXNext);
  };

  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  };

  const winner = calculateWinner(board);
  const status = winner ? `Winner: ${winner}` : `Next player: ${isXNext ? "X" : "O"}`;

  return (
    <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <VStack spacing={4}>
        <Text fontSize="3xl" fontWeight="bold">
          Tic Tac Toe
        </Text>
        <Text fontSize="xl">{status}</Text>
        <Box display="grid" gridTemplateColumns="repeat(3, 100px)" gridGap={2}>
          {board.map((value, index) => (
            <Button key={index} width="100px" height="100px" onClick={() => handleClick(index)} fontSize="2xl">
              {value}
            </Button>
          ))}
        </Box>
      </VStack>
    </Container>
  );
};

export default TicTacToe;
