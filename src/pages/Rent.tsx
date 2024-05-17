import { useState } from 'react';
import RentCarForm from './Andrii/forms/RentCarForm';
import { FormResults } from './Andrii/cards/FormResult';
import { FormResultsMobile} from './Andrii/cards/FormResultMobile';
import { RentCar } from '../interfaces';
import { useMediaQuery} from '@mui/material';
import theme from '../theme';
import Box from '@mui/material/Box';

function Rent() {
  const [submittedForms, setSubmittedForms] = useState<RentCar[]>([]);
  const isMobile = useMediaQuery(theme.breakpoints.down('lg'));

  const handleSubmit = (data: RentCar) => {
    setSubmittedForms([...submittedForms, data]);
  };

  const handleDelete = (index: number) => {
    const newSubmittedForms = [...submittedForms];
    newSubmittedForms.splice(index, 1);
    setSubmittedForms(newSubmittedForms);
  };

  const handleEdit = (index: number, newData: RentCar) => {
    const newSubmittedForms = [...submittedForms];
    newSubmittedForms[index] = newData;
    setSubmittedForms(newSubmittedForms);
  };

  const RentStyle = {
    display: 'flex',
    width: '100%',
    flexDirection: {xs: 'column', md: 'row'},
    justifyContent: {xs: 'center', md: 'space-around'},
  }

  const RentCar = {
    width: {xs: '100%', md: '50%', lg: '35%'},
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'start',
  }

  const FormResult = {
    width: {xs: '100%', md: '67%', lg: '60%'},
    display: 'flex',
    flexDirection: {lg: 'row', xs: 'column'},
    justifyContent: 'space-around',
    alignItems: {lg: 'start', md: 'center', xs: 'center'},
  }

  return (
      <Box sx={ RentStyle }>
        <Box sx={ RentCar }>
          <RentCarForm onSubmit={handleSubmit} />
        </Box>
        <Box sx={FormResult}>
          {isMobile ?
            submittedForms.map((form, index) => ( 
              <FormResultsMobile key={index} form={form} onDelete={() => handleDelete(index)} onEdit={(newData) => handleEdit(index, newData)} />
            )) :
            <FormResults forms={submittedForms} onDelete={handleDelete} onEdit={handleEdit} />
          }
        </Box>
      </Box>
  );
}

export default Rent;