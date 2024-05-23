import React from 'react';
import dayjs from 'dayjs';
import { RentCar } from '../../../interfaces';
import { textPattern, numberPattern, emailPattern, format } from '../../../pattern';
import { StyledTableCellMobile } from '../styledComponents/StyledTableCellMobile'
import { StyledTableRow } from '../styledComponents/StyledTableRow'
import { StyledButtonDelete } from '../styledComponents/StyledButtonDelete'
import { StyledButtonEdit } from '../styledComponents/StyledButtonEdit'
import { StyledButtonSave } from '../styledComponents/StyledButtonSave'
import { StyledTextField } from '../styledComponents/StyledTextField'
import { createTransform } from '../animations/animation' 
import { useForm, Controller } from 'react-hook-form';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { Table, TableBody, TableContainer, MenuItem } from '@mui/material';
import { useCarGroupContext } from '../../../Context';
import { StyledSelect } from '../styledComponents/StyledSelect';

interface FormResultsMobileProps {
  form: RentCar;
  onDelete: (index: number) => void;
  index: number;
  onSave: (data: RentCar) => void;
  isEditing: boolean;
  onEdit: (index: number) => void;
}

export const FormResultsMobile: React.FC<FormResultsMobileProps> = ({ form, onDelete, index, onSave, onEdit, isEditing }) => {
  
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<RentCar>({
    defaultValues: form,
    mode: "onChange",
  });
  const Transform = createTransform()

  const onSubmit = (data: RentCar) => {
    isEditing ? onSave(data) : onEdit(index);
  };

  const { carGroup } = useCarGroupContext();

  const MobileStyle = {
    display: 'flex',
    maxWidth: 350,
    minWidth: 280,
    marginBottom: '20px',
    marginTop: '50px',
    backgroundColor: "secondary.main",
    borderRadius: '5px',
    boxShadow: '0 0 10px rgba(0,0,0,0.25)',
  }  

  const Field = {
    padding: '0px',
  }

  return (
    <TableContainer sx={ MobileStyle } component={'form'} onSubmit={handleSubmit(onSubmit)}>
        <Table aria-label="customize table">
            <TableBody sx={Transform}>
                <StyledTableRow>
                    <StyledTableCellMobile>First Name</StyledTableCellMobile>
                    <StyledTableCellMobile>
                      {isEditing ? 
                        <StyledTextField 
                            {...register('firstName', { 
                              required: 'First name is required', 
                              pattern: {
                                  value: textPattern, 
                                  message: 'First name must start with a capital letter and cannot contain numbers or special characters'
                              } 
                          })}
                          sx={Field}
                          name="firstName"
                          error={Boolean(errors.firstName)}
                          helperText={errors.firstName?.message}
                        />
                          : 
                          form.firstName
                      }
                      </StyledTableCellMobile>
                </StyledTableRow>
                <StyledTableRow>
                    <StyledTableCellMobile>Last Name</StyledTableCellMobile>
                    <StyledTableCellMobile>
                      {isEditing ? 
                        <StyledTextField 
                          {...register('lastName', { 
                              required: 'Last name is required', 
                              pattern: {
                                  value: textPattern, 
                                  message: 'Last name must start with a capital letter and cannot contain numbers or special characters'
                              } 
                          })}
                          name="lastName"
                          sx={Field}
                          error={Boolean(errors.lastName)}
                          helperText={errors.lastName?.message}
                        />
                        : 
                        form.lastName
                      }
                      </StyledTableCellMobile>
                </StyledTableRow>
                <StyledTableRow>
                    <StyledTableCellMobile>Phone Number</StyledTableCellMobile>
                    <StyledTableCellMobile>
                      {isEditing ? 
                        <StyledTextField 
                          {...register('phoneNumber', { 
                              required: 'Phone number is required', 
                              pattern: {
                                  value: numberPattern, 
                                  message: 'Phone number must be in format: +38(0__) ___ ____'
                              } 
                          })}
                          name="phoneNumber"
                          sx={Field}
                          error={Boolean(errors.phoneNumber)}
                          helperText={errors.phoneNumber?.message}
                        />

                        : 
                        form.phoneNumber
                      }
                      </StyledTableCellMobile>
                </StyledTableRow>
                <StyledTableRow>
                    <StyledTableCellMobile>Email</StyledTableCellMobile>
                    <StyledTableCellMobile>
                      {isEditing ? 
                        <StyledTextField 
                          {...register('email', { 
                              required: 'Email is required', 
                              pattern: {
                                  value: emailPattern,
                                  message: 'Email must contain @'
                              } 
                          })}
                          name='email'
                          sx={Field}
                          error={Boolean(errors.email)}
                          helperText={errors.email?.message}
                        />
                        : 
                        form.email
                      }
                      </StyledTableCellMobile>
                </StyledTableRow>
                <StyledTableRow>
                    <StyledTableCellMobile>Place Of Issue</StyledTableCellMobile>
                    <StyledTableCellMobile>
                      {isEditing ? 
                        <StyledTextField 
                          {...register('placeOfIssue', { 
                            required: 'Place of Issue is required', 
                            pattern: {
                                value: textPattern, 
                                message: 'Place of Issue must start with a capital letter and cannot contain numbers or special characters'
                            } 
                          })}
                          name='placeOfIssue'
                          sx={Field}
                          error={Boolean(errors.placeOfIssue)}
                          helperText={errors.placeOfIssue?.message}
                        />
                        : 
                        form.placeOfIssue
                      }
                      </StyledTableCellMobile>
                </StyledTableRow>
                <StyledTableRow>
                  <StyledTableCellMobile>Start Rent Date</StyledTableCellMobile>
                  <StyledTableCellMobile>
                    {isEditing ? 
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <Controller 
                          name="startRentDate"
                          control = {control}
                          defaultValue={form.startRentDate}
                          render={ ({field}) => (
                            <DateTimePicker
                              {...field}
                              format={format}
                              minDateTime={dayjs()}
                            />  
                          )}
                        />
                        
                      </LocalizationProvider>
                      : 
                      form.startRentDate?.format(format)
                    }
                  </StyledTableCellMobile>
              </StyledTableRow>
              <StyledTableRow>
                  <StyledTableCellMobile>Finish Rent Date</StyledTableCellMobile>
                  <StyledTableCellMobile sx={{ alignItem: 'center'}}>
                    {isEditing ? 
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <Controller 
                            name="finishRentDate"
                            control = {control}
                            defaultValue={form.finishRentDate}
                            render={ ({field}) => (
                              <DateTimePicker
                                  {...field}
                                  format={format}
                                  minDateTime={form.finishRentDate ? form.startRentDate?.add(5, 'hour') : dayjs()}
                              />
                            )}
                          />
                        </LocalizationProvider>
                        : 
                        form.finishRentDate?.format(format)
                    }
                  </StyledTableCellMobile>
              </StyledTableRow>
                <StyledTableRow>
                    <StyledTableCellMobile>Comments</StyledTableCellMobile>
                    <StyledTableCellMobile>
                      {isEditing ? 
                          <Controller
                              name="comments"
                              control={control}
                              defaultValue={form.comments}
                              render={({ field: { onChange, value } }) => (
                                  <StyledTextField 
                                      value={value} 
                                      sx={Field}
                                      onChange={onChange} 
                                  />
                              )}
                          /> 
                          : 
                          form.comments
                      }
                      </StyledTableCellMobile>
                </StyledTableRow>
                <StyledTableRow>
                    <StyledTableCellMobile>Car</StyledTableCellMobile>
                    <StyledTableCellMobile>
                      {isEditing ?  
                        <Controller
                          name="selectedCar"
                          control={control}
                          defaultValue={form.selectedCar}
                          rules={{ required: true }}
                          render={({ field }) => (
                            <StyledSelect {...field}>
                              {carGroup.cars.map((car, index) => (
                                <MenuItem sx={{width: '100%'}} key={index} value={car.brand + ' ' + car.model}>
                                  {car.brand + ' ' + car.model}
                                </MenuItem>
                              ))}
                            </StyledSelect> 
                          )}
                        />
                        : 
                        form.selectedCar
                      }
                    </StyledTableCellMobile>
                </StyledTableRow>
                <StyledTableRow>
                    <StyledTableCellMobile>
                      {isEditing ? 
                        <StyledButtonSave type='submit'>Save</StyledButtonSave>
                        :
                        <StyledButtonEdit type='submit'>Edit</StyledButtonEdit>
                      }  
                    </StyledTableCellMobile>
                    <StyledTableCellMobile>
                      <StyledButtonDelete variant="contained" onClick={() => onDelete(index)}>Delete</StyledButtonDelete>
                    </StyledTableCellMobile>
                </StyledTableRow>
            </TableBody>
        </Table>
    </TableContainer>
  );
};