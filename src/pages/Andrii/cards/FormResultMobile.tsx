import React from 'react';
import { RentCar } from '../../../interfaces';
import { StyledTableCellMobile } from '../styledComponents/StyledTableCellMobile'
import { StyledTableRow } from '../styledComponents/StyledTableRow'
import { StyledButton } from '../styledComponents/StyledButton'
import { createTransform } from '../animations/animation' 
import { Table, TableBody, TableContainer, useTheme } from '@mui/material';

interface FormResultsMobileProps {
  form: RentCar;
  onDelete: () => void;
}

export const FormResultsMobile: React.FC<FormResultsMobileProps> = ({ form, onDelete }) => {
    const theme = useTheme()
    const Transform = createTransform(theme)
  
    const MobileStyle = {
      display: 'flex',
      maxWidth: 320,
      minWidth: 260,
      marginBottom: '20px',
      marginTop: '50px',
      backgroundColor: theme.palette.background.default,
      borderRadius: '5px',
      boxShadow: '0 0 10px rgba(0,0,0,0.25)',
    }  
  
    return (
      <TableContainer sx={ MobileStyle }>
          <Table aria-label="customize table">
              <TableBody sx={Transform}>
                  <StyledTableRow>
                      <StyledTableCellMobile>First Name</StyledTableCellMobile>
                      <StyledTableCellMobile>{form.firstName}</StyledTableCellMobile>
                  </StyledTableRow>
                  <StyledTableRow>
                      <StyledTableCellMobile>Last Name</StyledTableCellMobile>
                      <StyledTableCellMobile>{form.lastName}</StyledTableCellMobile>
                  </StyledTableRow>
                  <StyledTableRow>
                      <StyledTableCellMobile>Phone Number</StyledTableCellMobile>
                      <StyledTableCellMobile>{form.phoneNumber}</StyledTableCellMobile>
                  </StyledTableRow>
                  <StyledTableRow>
                      <StyledTableCellMobile>Email</StyledTableCellMobile>
                      <StyledTableCellMobile>{form.email}</StyledTableCellMobile>
                  </StyledTableRow>
                  <StyledTableRow>
                      <StyledTableCellMobile>Place Of Issue</StyledTableCellMobile>
                      <StyledTableCellMobile>{form.placeOfIssue}</StyledTableCellMobile>
                  </StyledTableRow>
                  <StyledTableRow>
                      <StyledTableCellMobile>Start Rent Date</StyledTableCellMobile>
                      <StyledTableCellMobile>{form.startRentDate.format('YYYY-MM-DD HH:mm')}</StyledTableCellMobile>
                  </StyledTableRow>
                  <StyledTableRow>
                      <StyledTableCellMobile>End Rent Date</StyledTableCellMobile>
                      <StyledTableCellMobile>{form.finishRentDate.format('YYYY-MM-DD HH:mm')}</StyledTableCellMobile>
                  </StyledTableRow>
                  <StyledTableRow>
                      <StyledTableCellMobile>Comments</StyledTableCellMobile>
                      <StyledTableCellMobile>{form.comments}</StyledTableCellMobile>
                  </StyledTableRow>
                  <StyledTableRow sx={{ backgroundColor: 'f5f5f5', justifyContent: 'flex-end',}}>
                      <StyledTableCellMobile colSpan={2}>
                          <StyledButton onClick={onDelete}>Delete</StyledButton>
                      </StyledTableCellMobile>
                  </StyledTableRow>
              </TableBody>
          </Table>
      </TableContainer>
    );
  };