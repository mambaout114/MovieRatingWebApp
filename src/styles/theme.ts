import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  styles: {
    global: {
      'html, body': {
        backgroundColor: 'gray.800', 
        color: 'white', 
      },
    },
  },
});

export default theme;
