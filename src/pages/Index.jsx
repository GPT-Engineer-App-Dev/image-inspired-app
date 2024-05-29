import { Box, Button, Container, Flex, Heading, Text, VStack } from "@chakra-ui/react";
import { useState, useEffect } from "react";

const Index = () => {
  const [time, setTime] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [splits, setSplits] = useState([]);

  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setTime((time) => time + 10);
      }, 10);
    } else if (!isActive && time !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, time]);

  const handleStart = () => {
    setIsActive(true);
  };

  const handleStop = () => {
    setIsActive(false);
  };

  const handleReset = () => {
    setIsActive(false);
    setTime(0);
    setSplits([]);
  };

  const handleSplit = () => {
    setSplits([...splits, time]);
  };

  const formatTime = (time) => {
    const milliseconds = `0${(time % 1000) / 10}`.slice(-2);
    const seconds = `0${Math.floor((time / 1000) % 60)}`.slice(-2);
    const minutes = `0${Math.floor((time / 60000) % 60)}`.slice(-2);
    const hours = `0${Math.floor(time / 3600000)}`.slice(-2);
    return `${hours}:${minutes}:${seconds}.${milliseconds}`;
  };

  return (
    <Container centerContent maxW="container.xl" height="100vh" p={4}>
      <VStack spacing={8} align="stretch">
        <Heading size="2xl" textAlign="center" mb={4} color="whiteAlpha.900">Stopwatch</Heading>
        <Flex justifyContent="center" alignItems="center">
          <Text fontSize="6xl" fontFamily="monospace" color="whiteAlpha.900">{formatTime(time)}</Text>
        </Flex>
        <Flex justifyContent="space-around">
          <Button colorScheme="blue" onClick={handleStart} isDisabled={isActive}>Start</Button>
          <Button colorScheme="red" onClick={handleStop} isDisabled={!isActive}>Stop</Button>
          <Button colorScheme="gray" onClick={handleReset}>Reset</Button>
          <Button colorScheme="green" onClick={handleSplit}>Split</Button>
        </Flex>
        <VStack spacing={2} mt={4}>
          {splits.map((split, index) => (
            <Text key={index} fontSize="md" color="whiteAlpha.800">{`Split ${index + 1}: ${formatTime(split)}`}</Text>
          ))}
        </VStack>
      </VStack>
    </Container>
  );
};

export default Index;