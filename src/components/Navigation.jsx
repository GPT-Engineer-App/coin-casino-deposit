import { HStack, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const Navigation = () => {
  return (
    <HStack spacing={4} p={4} bg="gray.100" justifyContent="center">
      <Button as={Link} to="/" colorScheme="teal">
        Home
      </Button>
      <Button as={Link} to="/snake-game" colorScheme="teal">
        Snake Game
      </Button>
    </HStack>
  );
};

export default Navigation;
