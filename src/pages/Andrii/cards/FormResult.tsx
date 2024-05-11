import React, {useState} from 'react';
import { RentCar } from '../../../interfaces';
import { StyledTableCell } from '../styledComponents/StyledTableCell'
import { StyledTableRow } from '../styledComponents/StyledTableRow'
import { StyledButtonDelete } from '../styledComponents/StyledButtonDelete'
import { StyledButtonEdit } from '../styledComponents/StyledButtonEdit'
import { StyledButtonSave } from '../styledComponents/StyledButtonSave'
import { StyledTextField } from '../styledComponents/StyledTextField'
import { createTransform } from '../animations/animation' 
import { Table, TableBody, TableContainer, TableHead, TableRow, useTheme } from '@mui/material';

interface FormResultsProps {
  forms: RentCar[];
  onDelete: (index: number) => void;
  onEdit: (index: number, newData: RentCar) => void;
}

export const FormResults: React.FC<FormResultsProps> = ({ forms, onDelete, onEdit }) => {
  const theme = useTheme()
  const Transform = createTransform(theme)

  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editingData, setEditingData] = useState<RentCar | null>(null);

  const handleEditClick = (index: number) => {
    setEditingIndex(index);
    setEditingData(forms[index]);
  };

  const handleSaveClick = () => {
    if (editingIndex !== null && editingData !== null) {
      onEdit(editingIndex, editingData);
    }
    setEditingIndex(null);
    setEditingData(null);
  };

  const handleInputChange = (prop: keyof RentCar) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditingData(prev => ({
      ...prev,
      [prop]: event.target.value || '',
    }) as RentCar);
  };

  const FormResultStyle = {
    ...Transform,
    display: 'flex',
    width: '100%',
    minWidth: '820px',
    flexDirection: 'column',
    justifyContent: 'space-around',
    marginBottom: '20px',
    marginTop: '50px',
    backgroundColor: theme.palette.secondary.main,
    borderRadius: '5px',
    boxShadow: '0 0 10px rgba(0,0,0,0.15)',
  }

  return (
    <TableContainer sx={FormResultStyle}>
      <Table aria-label="customize table">
        <TableHead>
          <TableRow>
            <StyledTableCell>First Name</StyledTableCell>
            <StyledTableCell>Last Name</StyledTableCell>
            <StyledTableCell>Phone Number</StyledTableCell>
            <StyledTableCell>Email</StyledTableCell>
            <StyledTableCell>Place Of Issue</StyledTableCell>
            <StyledTableCell>Start Rent Date</StyledTableCell>
            <StyledTableCell>End Rent Date</StyledTableCell>
            <StyledTableCell>Comments</StyledTableCell>
            <StyledTableCell>Action</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
              {forms.map((form, index) => (
                <StyledTableRow key={index}>
                  {index === editingIndex ? (
                    <React.Fragment>
                      <StyledTableCell>
                        <StyledTextField
                          value={editingData?.firstName}
                          onChange={handleInputChange('firstName')}
                        />
                      </StyledTableCell>
                      <StyledTableCell>
                      <StyledTextField
                          value={editingData?.lastName || ''}
                          onChange={handleInputChange('lastName')}
                        />
                      </StyledTableCell>
                      <StyledTableCell>
                        <StyledTextField
                          value={editingData?.phoneNumber}
                          onChange={handleInputChange('phoneNumber')}
                        />
                      </StyledTableCell>
                      <StyledTableCell>
                        <StyledTextField
                          value={editingData?.email}
                          onChange={handleInputChange('email')}
                        />
                      </StyledTableCell>
                      <StyledTableCell>
                        <StyledTextField
                          value={editingData?.placeOfIssue}
                          onChange={handleInputChange('placeOfIssue')}
                        />
                      </StyledTableCell>
                      <StyledTableCell>
                        <StyledTextField
                          value={editingData?.startRentDate.format('YYYY-MM-DD HH:mm')}
                          onChange={handleInputChange('startRentDate')}
                        />
                      </StyledTableCell>
                      <StyledTableCell>
                        <StyledTextField
                          value={editingData?.finishRentDate.format('YYYY-MM-DD HH:mm')}
                          onChange={handleInputChange('finishRentDate')}
                        />
                      </StyledTableCell>
                      <StyledTableCell>
                        <StyledTextField
                          value={editingData?.comments}
                          onChange={handleInputChange('comments')}
                        />
                      </StyledTableCell>
                      <StyledTableCell>
                        <StyledButtonSave onClick={handleSaveClick}>Save</StyledButtonSave>
                      </StyledTableCell>                    
                    </React.Fragment>
                  ) : (
                    <React.Fragment>
                      <StyledTableCell>{form.firstName}</StyledTableCell>
                      <StyledTableCell>{form.lastName}</StyledTableCell>
                      <StyledTableCell>{form.phoneNumber}</StyledTableCell>
                      <StyledTableCell>{form.email}</StyledTableCell>
                      <StyledTableCell>{form.placeOfIssue}</StyledTableCell>
                      <StyledTableCell>{form.startRentDate.format('YYYY-MM-DD HH:mm')}</StyledTableCell>
                      <StyledTableCell>{form.finishRentDate.format('YYYY-MM-DD HH:mm')}</StyledTableCell>
                      <StyledTableCell>{form.comments}</StyledTableCell>
                      <StyledTableCell>
                        <StyledButtonDelete onClick={() => onDelete(index)}>Delete</StyledButtonDelete>
                        <StyledButtonEdit onClick={() => handleEditClick(index)}>Edit</StyledButtonEdit>
                      </StyledTableCell>
                    </React.Fragment>
                  )}
                </StyledTableRow>
              ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};