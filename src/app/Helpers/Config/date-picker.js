import { createTheme } from '@mui/material/styles'

export const datePickerLightTheme = createTheme({
    components: {
      MuiTextField: {
        styleOverrides: {
          root: {
            color: '#FFFFFF',
            borderRadius: '3px',
            borderWidth: '0',
            borderColor: '#FFFFFF',
            border: '0px solid',
            backgroundColor: '#FFFFFF'
          }
        }
      }
    }
})