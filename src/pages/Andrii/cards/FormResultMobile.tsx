import React, {useState} from 'react';
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
import { Table, TableBody, TableContainer } from '@mui/material';

interface FormResultsMobileProps {
  form: RentCar;
  onDelete: () => void;
  onEdit: (newData: RentCar) => void;
}

export const FormResultsMobile: React.FC<FormResultsMobileProps> = ({ form, onDelete, onEdit }) => {
  const Transform = createTransform()
  const [editingData, setEditingData] = useState<RentCar | null>(null);

  const { handleSubmit, control } = useForm<RentCar>();

  const handleEditClick = () => {
    setEditingData(form);
  };

  const handleSaveClick = handleSubmit((data: RentCar) => {
    if (data !== null) {
      onEdit(data);
    }
    setEditingData(null);
  });

  const MobileStyle = {
    display: 'flex',
    maxWidth: 320,
    minWidth: 260,
    marginBottom: '20px',
    marginTop: '50px',
    backgroundColor: "secondary.main",
    borderRadius: '5px',
    boxShadow: '0 0 10px rgba(0,0,0,0.25)',
  }  

  return (
    <TableContainer sx={ MobileStyle }>
        <Table aria-label="customize table">
            <TableBody sx={Transform}>
                <StyledTableRow>
                    <StyledTableCellMobile>First Name</StyledTableCellMobile>
                    <StyledTableCellMobile>
                      {editingData ? 
                          <Controller
                            name="firstName"
                            control={control}
                            defaultValue={editingData.firstName}
                            rules={{
                              required: 'First Name is required',
                              pattern: {
                                value: textPattern,
                                message: 'First Name must start with a capital letter and cannot contain numbers or special characters'
                              }
                            }}
                            render={({ field: { onChange, value }, fieldState: { error } }) => (
                              <StyledTextField 
                                value={value} 
                                onChange={onChange} 
                                error={!!error}
                                helperText={error ? error.message : null}
                              />
                            )}
                        />
                          : 
                          form.firstName
                      }
                      </StyledTableCellMobile>
                </StyledTableRow>
                <StyledTableRow>
                    <StyledTableCellMobile>Last Name</StyledTableCellMobile>
                    <StyledTableCellMobile>
                      {editingData ? 
                        <Controller
                          name="lastName"
                          control={control}
                          defaultValue={editingData.lastName}
                          rules={{
                            required: 'This field is required',
                            pattern: {
                              value: textPattern,
                              message: 'Last Name must start with a capital letter and cannot contain numbers or special characters'
                            }
                          }}
                          render={({ field: { onChange, value }, fieldState: { error } }) => (
                            <StyledTextField 
                              value={value} 
                              onChange={onChange} 
                              error={!!error}
                              helperText={error ? error.message : null}
                            />
                          )}
                        />
                          : 
                          form.lastName
                      }
                      </StyledTableCellMobile>
                </StyledTableRow>
                <StyledTableRow>
                    <StyledTableCellMobile>Phone Number</StyledTableCellMobile>
                    <StyledTableCellMobile>
                      {editingData ? 
                          <Controller
                              name="phoneNumber"
                              control={control}
                              defaultValue={editingData.phoneNumber}
                              rules={{
                                  required: 'Phone number is required',
                                  pattern: {
                                      value: numberPattern,
                                      message: 'Phone number must be in the format +38(0xx) xxx xxxx and contain only digits.'
                                  }
                              }}
                              render={({ field: { onChange, value }, fieldState: { error } }) => (
                                  <StyledTextField 
                                      value={value} 
                                      onChange={onChange} 
                                      error={!!error}
                                      helperText={error ? error.message : null}
                                  />
                              )}
                          />
                          : 
                          form.phoneNumber
                      }
                      </StyledTableCellMobile>
                </StyledTableRow>
                <StyledTableRow>
                    <StyledTableCellMobile>Email</StyledTableCellMobile>
                    <StyledTableCellMobile>
                      {editingData ? 
                          <Controller
                              name="email"
                              control={control}
                              defaultValue={editingData.email}
                              rules={{
                                  required: 'Email is required',
                                  pattern: {
                                      value: emailPattern,
                                      message: 'Email must contain @'
                                  }
                              }}
                              render={({ field: { onChange, value }, fieldState: { error } }) => (
                                  <StyledTextField 
                                      value={value} 
                                      onChange={onChange} 
                                      error={!!error}
                                      helperText={error ? error.message : null}
                                  />
                              )}
                          />
                          : 
                          form.email
                      }
                      </StyledTableCellMobile>
                </StyledTableRow>
                <StyledTableRow>
                    <StyledTableCellMobile>Place Of Issue</StyledTableCellMobile>
                    <StyledTableCellMobile>
                      {editingData ? 
                          <Controller
                              name="placeOfIssue"
                              control={control}
                              defaultValue={editingData.placeOfIssue}
                              rules={{
                                  required: 'Place of Issue is required',
                                  pattern: {
                                      value: textPattern,
                                      message: 'Place of Issue must start with a capital letter and cannot contain numbers or special characters'
                                  }
                              }}
                              render={({ field: { onChange, value }, fieldState: { error } }) => (
                                  <StyledTextField 
                                      value={value} 
                                      onChange={onChange} 
                                      error={!!error}
                                      helperText={error ? error.message : null}
                                  />
                              )}
                          />
                          : 
                          form.placeOfIssue
                      }
                      </StyledTableCellMobile>
                </StyledTableRow>
                <StyledTableRow>
                  <StyledTableCellMobile>Start Rent Date</StyledTableCellMobile>
                  <StyledTableCellMobile>
                    {editingData ? 
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <Controller 
                          name="startRentDate"
                          control = {control}
                          defaultValue={editingData.startRentDate}
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
                  <StyledTableCellMobile>
                    {editingData ? 
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <Controller 
                            name="finishRentDate"
                            control = {control}
                            defaultValue={editingData.finishRentDate}
                            render={ ({field}) => (
                              <DateTimePicker
                                  {...field}
                                  format={format}
                                  minDateTime={editingData.finishRentDate ? editingData.startRentDate?.add(5, 'hour') : dayjs()}
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
                      {editingData ? 
                          <Controller
                              name="comments"
                              control={control}
                              defaultValue={editingData.comments}
                              render={({ field: { onChange, value } }) => (
                                  <StyledTextField 
                                      value={value} 
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
                    <StyledTableCellMobile>
                        <StyledButtonDelete onClick={onDelete}>Delete</StyledButtonDelete>
                    </StyledTableCellMobile>
                    <StyledTableCellMobile>
                          {editingData ? 
                              <StyledButtonSave onClick={handleSaveClick}>Save</StyledButtonSave>
                              : 
                              <StyledButtonEdit onClick={handleEditClick}>Edit</StyledButtonEdit>
                          }
                    </StyledTableCellMobile>
                </StyledTableRow>
            </TableBody>
        </Table>
    </TableContainer>
  );
};