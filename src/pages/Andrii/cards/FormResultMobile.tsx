import React, {useState} from 'react';
import dayjs from 'dayjs';
import { RentCar } from '../../../interfaces';
import { StyledTableCellMobile } from '../styledComponents/StyledTableCellMobile'
import { StyledTableRow } from '../styledComponents/StyledTableRow'
import { StyledButtonDelete } from '../styledComponents/StyledButtonDelete'
import { StyledButtonEdit } from '../styledComponents/StyledButtonEdit'
import { StyledButtonSave } from '../styledComponents/StyledButtonSave'
import { StyledTextField } from '../styledComponents/StyledTextField'
import { createTransform } from '../animations/animation' 
import { Table, TableBody, TableContainer, useTheme } from '@mui/material';

interface FormResultsMobileProps {
  form: RentCar;
  onDelete: () => void;
  onEdit: (newData: RentCar) => void;
}

export const FormResultsMobile: React.FC<FormResultsMobileProps> = ({ form, onDelete, onEdit }) => {
    const theme = useTheme()
    const Transform = createTransform(theme)
    const [editingData, setEditingData] = useState<RentCar | null>(null);

    const textPattern = /^[A-Z][a-z]*$/;
    const numberPattern = /^\+38\(0\d{2}\) \d{3} \d{4}$/;
    const emailPattern = /.+@.+/;

    const handleEditClick = () => {
      setEditingData(form);
    };
  
    const handleSaveClick = () => {
      if (editingData !== null) {
        if (!validateForm()) {
          return;
        }
        onEdit(editingData);
      }
      setEditingData(null);
    };

    const validateForm = () => {
      if (editingData) {
        if (
          editingData.firstName === "" ||
          editingData.lastName === "" ||
          editingData.phoneNumber === "" ||
          editingData.email === "" ||
          editingData.placeOfIssue === "" ||
          editingData.startRentDate === null ||
          editingData.finishRentDate === null ||
          !textPattern.test(editingData.firstName) ||
          !textPattern.test(editingData.lastName) ||
          !textPattern.test(editingData.placeOfIssue) ||
          !numberPattern.test(editingData.phoneNumber) ||
          !emailPattern.test(editingData.email)
        ) {
          return false;
        }
      }
      return true;
    };
  
    const MobileStyle = {
      display: 'flex',
      maxWidth: 320,
      minWidth: 260,
      marginBottom: '20px',
      marginTop: '50px',
      backgroundColor: theme.palette.secondary.main,
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
                            <StyledTextField 
                              value={editingData.firstName} 
                              onChange={(e) => setEditingData({...editingData, firstName: e.target.value})} 
                              error={editingData.firstName === '' || !textPattern.test(editingData.firstName)}
                              helperText={editingData.firstName === '' ? 'This field is required' : !textPattern.test(editingData.firstName) ? 'First Name must start with a capital letter and cannot contain numbers or special characters' : ''}
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
                            <StyledTextField 
                              value={editingData.lastName} 
                              onChange={(e) => setEditingData({...editingData, lastName: e.target.value})} 
                              error={editingData.lastName === '' || !textPattern.test(editingData.lastName)}
                              helperText={editingData.lastName === '' ? 'This field is required' : !textPattern.test(editingData.lastName) ? 'Last Name must start with a capital letter and cannot contain numbers or special characters' : ''}
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
                            <StyledTextField 
                              value={editingData.phoneNumber} 
                              onChange={(e) => setEditingData({...editingData, phoneNumber: e.target.value})} 
                              error={editingData.phoneNumber === '' || !numberPattern.test(editingData.phoneNumber)}
                              helperText={editingData.phoneNumber === '' ? 'This field is required' : !numberPattern.test(editingData.phoneNumber) ? 'Phone number must be in the format +38(0xx) xxx xxxx and contain only digits.' : ''}
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
                            <StyledTextField 
                              value={editingData.email} 
                              onChange={(e) => setEditingData({...editingData, email: e.target.value})} 
                              error={editingData.email === '' || !emailPattern.test(editingData.email)}
                              helperText={editingData.email === '' ? 'This field is required' : !emailPattern.test(editingData.email) ? 'Email must contain @' : ''}
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
                            <StyledTextField 
                              value={editingData.placeOfIssue} 
                              onChange={(e) => setEditingData({...editingData, placeOfIssue: e.target.value})} 
                              error={editingData.placeOfIssue === '' || !textPattern.test(editingData.placeOfIssue)}
                              helperText={editingData.placeOfIssue === '' ? 'This field is required' : !textPattern.test(editingData.placeOfIssue) ? 'Place of Issue must start with a capital letter and cannot contain numbers or special characters' : ''}
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
                            <StyledTextField value={editingData.startRentDate.format('YYYY-MM-DD HH:mm')} onChange={(e) => setEditingData({...editingData, startRentDate: dayjs(e.target.value)})} /> 
                            : 
                            form.startRentDate.format('YYYY-MM-DD HH:mm')
                        }
                        </StyledTableCellMobile>
                  </StyledTableRow>
                  <StyledTableRow>
                      <StyledTableCellMobile>Finish Rent Date</StyledTableCellMobile>
                      <StyledTableCellMobile>
                        {editingData ? 
                            <StyledTextField value={editingData.finishRentDate.format('YYYY-MM-DD HH:mm')} onChange={(e) => setEditingData({...editingData, finishRentDate: dayjs(e.target.value)})} /> 
                            : 
                            form.finishRentDate.format('YYYY-MM-DD HH:mm')
                        }
                        </StyledTableCellMobile>
                  </StyledTableRow>
                  <StyledTableRow>
                      <StyledTableCellMobile>Comments</StyledTableCellMobile>
                      <StyledTableCellMobile>
                        {editingData ? 
                            <StyledTextField value={editingData.comments} onChange={(e) => setEditingData({...editingData, comments: e.target.value})} /> 
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