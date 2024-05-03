import { VStack ,Image,Text, Button, border, UnorderedList} from '@chakra-ui/react'
import React from 'react'

const Card = ({amount,img,checkouthandler}) => {
  return (
    <VStack>
     <Text fontWeight="bold" fontSize="x-large">Advanced Analyze using AI</Text>
    <VStack width="300px" height="68vh" border="1px solid black">
    <Image src={img} boxSize={"60"} height="47%" width="100%" borderRadius="md"/>
    <Text fontWeight="bold" fontSize="large" margin="7px" textAlign="center">Your Youtube Comment Analyze With AI</Text>
    <Text fontSize="medium">₹{amount}</Text>
    <Button colorScheme='facebook' onClick={()=>checkouthandler(amount)} >Buy Now</Button>
   </VStack>
   </VStack>
  )
}

export default Card