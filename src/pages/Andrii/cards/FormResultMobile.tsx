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

    const handleEditClick = () => {
      setEditingData(form);
    };
  
    const handleSaveClick = () => {
      if (editingData !== null) {
        onEdit(editingData);
      }
      setEditingData(null);
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
                            <StyledTextField value={editingData.firstName} onChange={(e) => setEditingData({...editingData, firstName: e.target.value})} /> 
                            : 
                            form.firstName
                        }
                        </StyledTableCellMobile>
                  </StyledTableRow>
                  <StyledTableRow>
                      <StyledTableCellMobile>Last Name</StyledTableCellMobile>
                      <StyledTableCellMobile>
                        {editingData ? 
                            <StyledTextField value={editingData.lastName} onChange={(e) => setEditingData({...editingData, lastName: e.target.value})} /> 
                            : 
                            form.lastName
                        }
                        </StyledTableCellMobile>
                  </StyledTableRow>
                  <StyledTableRow>
                      <StyledTableCellMobile>Phone Number</StyledTableCellMobile>
                      <StyledTableCellMobile>
                        {editingData ? 
                            <StyledTextField value={editingData.phoneNumber} onChange={(e) => setEditingData({...editingData, phoneNumber: e.target.value})} /> 
                            : 
                            form.phoneNumber
                        }
                        </StyledTableCellMobile>
                  </StyledTableRow>
                  <StyledTableRow>
                      <StyledTableCellMobile>Email</StyledTableCellMobile>
                      <StyledTableCellMobile>
                        {editingData ? 
                            <StyledTextField value={editingData.email} onChange={(e) => setEditingData({...editingData, email: e.target.value})} /> 
                            : 
                            form.email
                        }
                        </StyledTableCellMobile>
                  </StyledTableRow>
                  <StyledTableRow>
                      <StyledTableCellMobile>Place Of Issue</StyledTableCellMobile>
                      <StyledTableCellMobile>
                        {editingData ? 
                            <StyledTextField value={editingData.placeOfIssue} onChange={(e) => setEditingData({...editingData, placeOfIssue: e.target.value})} /> 
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