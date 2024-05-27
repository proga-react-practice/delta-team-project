import React, { useState } from 'react';
import dayjs from 'dayjs';
import { RentCar } from '../../../interfaces';
import { textPattern, numberPattern, emailPattern, format } from '../../../pattern';
import { StyledTableCell } from '../styledComponents/StyledTableCell';
import { StyledTableRow } from '../styledComponents/StyledTableRow';
import { StyledButtonDelete } from '../styledComponents/StyledButtonDelete';
import { StyledButtonEdit } from '../styledComponents/StyledButtonEdit';
import { StyledButtonSave } from '../styledComponents/StyledButtonSave';
import { StyledTextField } from '../styledComponents/StyledTextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { DateTimeValidationError } from '@mui/x-date-pickers/models';
import { useForm, Controller } from 'react-hook-form';
import { useCarGroupContext } from '../../../Context';
import { Box, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';

interface FormResultsProps {
  form: RentCar;
  onDelete: (index: number) => void;
  index: number;
  onSave: (data: RentCar) => void;
  isEditing: boolean;
  onEdit: (index: number | null) => void;
}

export const FormResults: React.FC<FormResultsProps> = ({ form, onDelete, index, onSave, onEdit, isEditing }) => {
  // const Transform = createTransform();

  const [error, setError] = React.useState<DateTimeValidationError | null>(null);

  const { handleSubmit, control, formState: { errors } } = useForm<RentCar>();

  const [openDialog, setOpenDialog] = useState(false);

  const { carGroup } = useCarGroupContext();

  const handleEdit = (index: number) =>{
    onEdit(index);
    setOpenDialog(true);
  }

  const handleSave = (data: RentCar) =>{
    onSave(data);
    setOpenDialog(false);
  }

  const onSubmit = (data: RentCar) => {
    isEditing ? handleSave(data) : handleEdit(index);
  };

  const handleCloseDialog = () => {
    onEdit(null);
    setOpenDialog(false);
  };

  const errorMessage = React.useMemo(() => {
    switch (error) {
      case 'maxDate':
      case 'minDate': {
        return 'Finish Rent Date should be at least 5 hours later than Start Rent Date';
      }

      case 'invalidDate': {
        return 'Your date is not valid';
      }

      default: {
        return '';
      }
    }
  }, [error]);

  const DialogButtons = {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
  }

  const DateAndTimeStyle = {
    width: '100%',
    padding: '10px',
    marginBottom: '10px',
    boxSizing: 'border-box',
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'quaternary.main',
      },
      '&:hover fieldset': {
        borderColor: 'quaternary.dark',
      },
      '&.Mui-focused fieldset': {
        borderColor: 'quaternary.dark',
      },
    },
    '& .MuiFormLabel-root': {
      color: "quaternary.dark",
    },
    '& .MuiFormLabel-root.Mui-focused': {
      color: "secondary.dark",
    },
  }

  const ModalStyle = {
    backgroundColor: 'secondary.main',
  }

  const carId = form.selectedCar;
  const cars = carGroup.cars;
  const selectedCar = cars.find(car => car.id === carId);

  return (
    <>
    <Box id={`form${index}`} component={'form'} onSubmit={handleSubmit(onSubmit)}/>
      <StyledTableRow key={index}>
          {isEditing ? (
            <>
              <Dialog component={'form'} open={openDialog} onClose={handleCloseDialog} onSubmit={handleSubmit(onSubmit)}>
                <Box sx={ModalStyle}>
                  <DialogTitle>Edit Form</DialogTitle>
                  <DialogContent>
                    <Box sx={{marginTop: '1%'}}>
                      <Controller
                        name="firstName"
                        control={control}
                        defaultValue={form.firstName}
                        rules={{ required: 'This field is required', pattern: { value: textPattern, message: 'First Name must start with a capital letter and cannot contain numbers or special characters' } }}
                        render={({ field }) => <StyledTextField label='First Name' {...field} error={!!errors.firstName} helperText={errors.firstName?.message} />}
                      />
                      <Controller
                        name="lastName"
                        control={control}
                        defaultValue={form.lastName}
                        rules={{ required: 'This field is required', pattern: { value: textPattern, message: 'Last Name must start with a capital letter and cannot contain numbers or special characters' } }}
                        render={({ field }) => <StyledTextField label='Last Name' {...field} error={!!errors.lastName} helperText={errors.lastName?.message} />}
                      />
                      <Controller
                        name="phoneNumber"
                        control={control}
                        defaultValue={form.phoneNumber}
                        rules={{ required: 'This field is required', pattern: { value: numberPattern, message: 'Phone number must be in the format +38(0xx) xxx xxxx and contain only digits.' } }}
                        render={({ field }) => <StyledTextField label='Phone number' {...field} error={!!errors.phoneNumber} helperText={errors.phoneNumber?.message} />}
                      />
                      <Controller
                        name="email"
                        control={control}
                        defaultValue={form.email}
                        rules={{ required: 'This field is required', pattern: { value: emailPattern, message: 'Email must contain @' } }}
                        render={({ field }) => <StyledTextField label='Email' {...field} error={!!errors.email} helperText={errors.email?.message} />}
                      />
                      <Controller
                        name="placeOfIssue"
                        control={control}
                        defaultValue={form.placeOfIssue}
                        rules={{ required: 'This field is required', pattern: { value: textPattern, message: 'Place of Issue must start with a capital letter and cannot contain numbers or special characters' } }}
                        render={({ field }) => <StyledTextField label='Place of Issue' {...field} error={!!errors.placeOfIssue} helperText={errors.placeOfIssue?.message} />}
                      />
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <Controller
                          name="startRentDate"
                          control={control}
                          defaultValue={form.startRentDate}
                          render={({ field }) => (
                            <DateTimePicker
                              {...field}
                              label="Start Rent Date"
                              minDateTime={dayjs()}
                              onError={(newError) => setError(newError)}
                              slotProps={{
                                textField: {
                                  helperText: errorMessage,
                                },
                              }}
                              sx={DateAndTimeStyle}
                            />
                          )}
                        />

                        <Controller
                          name="finishRentDate"
                          control={control}
                          defaultValue={form.finishRentDate}
                          render={({ field }) => (
                            <DateTimePicker
                              {...field}
                              label="Finish Rent Date"
                              minDateTime={form?.finishRentDate ? form.startRentDate?.add(5, 'hour') : dayjs()}
                              onError={(newError) => setError(newError)}
                              slotProps={{
                                textField: {
                                  helperText: errorMessage,
                                },
                              }}
                              sx={DateAndTimeStyle}
                            />
                          )}
                        />
                      </LocalizationProvider>
                      <Controller
                        name="comments"
                        control={control}
                        defaultValue={form.comments}
                        render={({ field }) => <StyledTextField label="Comments" {...field} />}
                      />
                      <StyledTextField 
                        label='Selected Car' 
                        value={selectedCar?.brand + ' ' + selectedCar?.model}
                        InputProps={{
                          readOnly: true,
                        }}
                      />
                    </Box>
                  </DialogContent>
                  <DialogActions sx={DialogButtons}>
                    <StyledButtonDelete sx={{ width: '40%' }} onClick={handleCloseDialog}>Close</StyledButtonDelete>
                    <StyledButtonSave sx={{ width: '40%' }} type='submit'>Save</StyledButtonSave>
                  </DialogActions>
                </Box>
              </Dialog>
            </>
          ) : (
            <>
              <StyledTableCell>{form.firstName}</StyledTableCell>
              <StyledTableCell>{form.lastName}</StyledTableCell>
              <StyledTableCell>{form.phoneNumber}</StyledTableCell>
              <StyledTableCell>{form.email}</StyledTableCell>
              <StyledTableCell>{form.placeOfIssue}</StyledTableCell>
              <StyledTableCell>{form.startRentDate?.format(format)}</StyledTableCell>
              <StyledTableCell>{form.finishRentDate?.format(format)}</StyledTableCell>
              <StyledTableCell>{form.comments}</StyledTableCell>
              <StyledTableCell>{selectedCar?.brand + ' ' + selectedCar?.model}</StyledTableCell>
              <StyledTableCell>
                <StyledButtonDelete onClick={() => onDelete(index)}>Delete</StyledButtonDelete>
                <StyledButtonEdit form={`form${index}`} type='submit'>Edit</StyledButtonEdit>
              </StyledTableCell>
            </>
          )}
      </StyledTableRow>
    </>
  );
};