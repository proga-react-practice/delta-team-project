import React from 'react';
import { TableRow } from '@mui/material';
import { StyledTableCell } from '../styledComponents/StyledTableCell';

export const FormResultsTableHead: React.FC = () => (
  <TableRow>
    <StyledTableCell>First Name</StyledTableCell>
    <StyledTableCell>Last Name</StyledTableCell>
    <StyledTableCell>Phone Number</StyledTableCell>
    <StyledTableCell>Email</StyledTableCell>
    <StyledTableCell>Place Of Issue</StyledTableCell>
    <StyledTableCell>Start Rent Date</StyledTableCell>
    <StyledTableCell>End Rent Date</StyledTableCell>
    <StyledTableCell>Comments</StyledTableCell>
    <StyledTableCell>Car</StyledTableCell>
    <StyledTableCell>Action</StyledTableCell>
  </TableRow>
);
