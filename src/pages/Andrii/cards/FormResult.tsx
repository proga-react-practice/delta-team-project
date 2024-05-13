import React, {useState} from 'react';
import { Dayjs } from 'dayjs';
import { RentCar } from '../../../interfaces';
import { StyledTableCell } from '../styledComponents/StyledTableCell'
import { StyledTableRow } from '../styledComponents/StyledTableRow'
import { StyledButtonDelete } from '../styledComponents/StyledButtonDelete'
import { StyledButtonEdit } from '../styledComponents/StyledButtonEdit'
import { StyledButtonSave } from '../styledComponents/StyledButtonSave'
import { StyledTextField } from '../styledComponents/StyledTextField'
import { createTransform } from '../animations/animation' 
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { Table, TableBody, TableContainer, TableHead, TableRow, useTheme, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';

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

  const [openDialog, setOpenDialog] = useState(false);

  const handleEditClick = (index: number) => {
    setEditingIndex(index);
    setEditingData(forms[index]);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setEditingIndex(null);
    setEditingData(null);
    setOpenDialog(false);
  };

  const handleSaveClick = () => {
    if (editingIndex !== null && editingData !== null) {
      onEdit(editingIndex, editingData);
    }
    setEditingIndex(null);
    setEditingData(null);
    setOpenDialog(false);
  };

  const handleInputChange = (prop: keyof RentCar) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditingData(prev => ({
      ...prev,
      [prop]: event.target.value,
    }) as RentCar);
  };

  const handleDateChange = (prop: keyof RentCar) => (newValue: Dayjs | null) => {
    setEditingData(prev => ({
      ...prev,
      [prop]: newValue,
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
                      <Dialog open={openDialog} onClose={handleCloseDialog}>
                        <DialogTitle>Edit Form</DialogTitle>
                        <DialogContent>
                          {editingData && (
                            <>
                              <StyledTextField
                                label = 'First Name'
                                value={editingData.firstName}
                                onChange={handleInputChange('firstName')}
                              />
                              <StyledTextField
                                value={editingData?.lastName || ''}
                                onChange={handleInputChange('lastName')}
                              />
                              <StyledTextField
                                value={editingData?.phoneNumber}
                                onChange={handleInputChange('phoneNumber')}
                              />
                              <StyledTextField
                                value={editingData?.email}
                                onChange={handleInputChange('email')}
                              />
                              <StyledTextField
                                value={editingData?.placeOfIssue}
                                onChange={handleInputChange('placeOfIssue')}
                              />
                              <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DateTimePicker
                                  value={editingData?.startRentDate || null}
                                  onChange={handleDateChange('startRentDate')}
                                  sx={DateAndTimeStyle}
                                />
                                <DateTimePicker
                                  value={editingData?.finishRentDate || null}
                                  onChange={handleDateChange('finishRentDate')}
                                  sx={DateAndTimeStyle}
                                />
                              </LocalizationProvider>
                              <StyledTextField
                                value={editingData?.comments}
                                onChange={handleInputChange('comments')}
                              />
                            </>
                          )}
                        </DialogContent>
                        <DialogActions sx={DialogButtons}>
                          <StyledButtonDelete sx={{width: '40%'}} onClick={handleCloseDialog}>Close</StyledButtonDelete>
                          <StyledButtonSave sx={{width: '40%'}} onClick={handleSaveClick}>Save</StyledButtonSave>
                        </DialogActions>
                      </Dialog>                    
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