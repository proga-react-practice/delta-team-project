import React, { useState } from 'react';
import RentCarForm from './Andrii/forms/RentCarForm';
import { FormResults } from './Andrii/cards/FormResult';
import { FormResultsMobile} from './Andrii/cards/FormResultMobile';
import { RentCar, initialFormState } from '../interfaces';
import { ThemeProvider } from '@mui/material/styles';
import { useMediaQuery } from '@mui/material';
import theme from '../theme';
import Box from '@mui/material/Box';

function Rent() {
  const [form, setForm] = useState<RentCar>(initialFormState);
  const [submittedForms, setSubmittedForms] = useState<RentCar[]>([]);
  const isMobile = useMediaQuery(theme.breakpoints.down('lg'));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmittedForms([...submittedForms, form]);
    setForm(initialFormState);
  };

  const handleDelete = (index: number) => {
    const newSubmittedForms = [...submittedForms];
    newSubmittedForms.splice(index, 1);
    setSubmittedForms(newSubmittedForms);
  };

  const RentStyle = {
    display: 'flex',
    width: '100%',
    flexDirection: {xs: 'column', md: 'row'},
    justifyContent: {xs: 'center', md: 'space-around'},
  }

  const RentCar = {
    width: {xs: '100%', md: '25%', lg: '30%'},
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  }

  const FormResult = {
    width: {xs: '100%', md: '67%', lg: '60%'},
    display: 'flex',
    flexDirection: {lg: 'row', xs: 'column'},
    justifyContent: 'space-around',
    alignItems: {lg: 'start', md: 'center', xs: 'center'},
  }

  return (
    <ThemeProvider theme={theme}>
      <Box sx={ RentStyle }>
        <Box sx={ RentCar }>
          <RentCarForm form={form} setForm={setForm} onSubmit={handleSubmit} />
        </Box>
        <Box sx={FormResult}>
          {isMobile ?
            submittedForms.map((form, index) => ( 
              <FormResultsMobile key={index} form={form} onDelete={() => handleDelete(index)} />
            )) :
            <FormResults forms={submittedForms} onDelete={handleDelete} />
          }
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default Rent;