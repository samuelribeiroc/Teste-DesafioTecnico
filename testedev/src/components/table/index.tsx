import * as React from 'react';
import { alpha } from '@mui/material/styles';
import { Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Toolbar,
  Typography,
  Paper,
  Checkbox,
  IconButton,
  Tooltip, 
  Button} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { visuallyHidden } from '@mui/utils';
import dayjs, { Dayjs } from 'dayjs';
import CreateModal from '../modal';
import { useRouter } from 'next/navigation';

export interface Data {
  action: string;
  date: string;
  id: number;
  name: string;
  value: number;
}

function createData(
  id: number,
  name: string,
  value: number,
  date: string,
  action: string,
): Data {
  return {
    id,
    name,
    value,
    date,
    action,
  };
}

export const rows = [
  createData(1, 'Invest 1', 305.00, '22-04-2022', 'Visualize'),
  createData(2, 'Invest 2', 452.00, '26-04-2022', 'Visualize'),
  createData(3, 'Invest 3', 262.50, '17-12-2021', 'Visualize'),
  createData(4, 'Invest 4', 159.00, '22-06-2002', 'Visualize'),
  createData(5, 'Invest 5', 356.00, '02-02-2020', 'Visualize'),
  createData(6, 'Invest 6', 408.00, '26-11-2023', 'Visualize'),
  createData(7, 'Invest 7', 237.00, '23-04-2019', 'Visualize'),
  createData(8, 'Invest 8', 375.00, '21-03-2023', 'Visualize'),
  createData(9, 'Invest 9', 518.00, '28-01-2017', 'Visualize'),
  createData(10, 'Invest 10', 392.00, '12-05-2021', 'Visualize'),
  createData(11, 'Invest 11', 318.00, '12-06-2024', 'Visualize'),
  createData(12, 'Invest 12', 360.00, '04-07-2009', 'Visualize'),
  createData(13, 'Invest 13', 437.00, '13-09-2021', 'Visualize'),
];

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

type Order = 'asc' | 'desc';

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key,
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string },
) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// Since 2020 all major browsers ensure sort stability with Array.prototype.sort().
// stableSort() brings sort stability to non-modern browsers (notably IE11). If you
// only support modern browsers you can replace stableSort(exampleArray, exampleComparator)
// with exampleArray.slice().sort(exampleComparator)
function stableSort<T>(array: readonly T[], comparator: (a: T, b: T) => number) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

interface HeadCell {
  disablePadding: boolean;
  id: keyof Data;
  label: string;
  numeric: boolean;
}

const headCells: readonly HeadCell[] = [
  {
    id: 'name',
    numeric: false,
    disablePadding: true,
    label: 'Investment title',
  },
  {
    id: 'value',
    numeric: true,
    disablePadding: false,
    label: 'Initial investment',
  },
  {
    id: 'date',
    numeric: true,
    disablePadding: false,
    label: 'Application date',
  },
  {
    id: 'action',
    numeric: false,
    disablePadding: false,
    label: ' ',
  },
];

interface EnhancedTableProps {
  numSelected: number;
  onRequestSort: (event: React.MouseEvent<unknown>, property: keyof Data) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
    props;
  const createSortHandler =
    (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              'aria-label': 'select all desserts',
            }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

interface EnhancedTableToolbarProps {
  numSelected: number;
  handleOpen: () => void;
}

function EnhancedTableToolbar(props: EnhancedTableToolbarProps) {
  const { numSelected, handleOpen } = props;

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: '1 1 100%' }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: '1 1 100%' }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Your investments
        </Typography>
      )}
      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Create new investment">
          <Button
            startIcon={<AddIcon color='secondary' sx={{display: {md: 'block', xs: 'none'}}} />}
            variant='contained'
            sx={{
              minWidth: '36px',
              width: { md: '300px', sm: '36px', xs: '36px' },
              padding: { md: '6px 16px', sm: '6px', xs: '6px' },
              borderRadius: { md: '16px', sm: '50px', xs: '50px' },
              display: { md: 'inherit', sm: 'flex', xs: 'flex !important' },
              justifyContent: { md: 'auto', sm: 'center', xs: 'center' },
              alignItems: { md: 'auto', sm: 'center', xs: 'center' },
            }}
            onClick={handleOpen}
          >
            <AddIcon color='secondary' sx={{display: { md: 'none', sm: 'flex', xs: 'flex' }}} />
            <Typography variant='body2' fontWeight={700} color='secondary' sx={{ display: {md: 'block', sm: 'none', xs: 'none'}}}>
              Create new investment
            </Typography>
          </Button>
        </Tooltip>
      )}
    </Toolbar>
  );
}

export default function InvestmentsTable() {
  const router = useRouter();

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [order, setOrder] = React.useState<Order>('asc');
  const [orderBy, setOrderBy] = React.useState<keyof Data>('date');
  const [selected, setSelected] = React.useState<readonly number[]>([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof Data,
  ) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event: React.MouseEvent<unknown>, id: number) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected: readonly number[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (id: number) => selected.indexOf(id) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const visibleRows = React.useMemo(
    () =>
      stableSort(rows, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage,
      ),
    [order, orderBy, page, rowsPerPage],
  );

  return (
    <Box sx={{ width: '100%', mt: '32px' }}>
      <CreateModal open={open} handleClose={handleClose} />
      <Paper
        sx={{
          width: '100%',
          mb: 2,
          bgcolor: '#080808',
          color: '#fcfcfc',
          borderRadius: '16px',
          boxShadow: 'none'
        }}>
        <EnhancedTableToolbar numSelected={selected.length} handleOpen={handleOpen} />
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={'small'}
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {visibleRows.map((row, index) => {
                const isItemSelected = isSelected(row.id);
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    hover
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.id}
                    selected={isItemSelected}
                  >
                    <TableCell
                      padding="checkbox"
                      onClick={(event) => handleClick(event, row.id)}
                      sx={{ cursor: 'pointer' }}
                    >
                      <Checkbox
                        color="primary"
                        checked={isItemSelected}
                        inputProps={{
                          'aria-labelledby': labelId,
                        }}
                      />
                    </TableCell>
                    <TableCell
                      component="th"
                      id={labelId}
                      scope="row"
                      padding="none"
                      sx={{ color: '#fcfcfc' }}
                    >
                      {row.name}
                    </TableCell>
                    <TableCell align="right" sx={{ color: '#fcfcfc' }}>{row.value}</TableCell>
                    <TableCell align="right" sx={{ color: '#fcfcfc' }}>{row.date}</TableCell>
                    <TableCell align="right" sx={{ color: '#fcfcfc' }}>
                      <Button onClick={() => router.push(`/visualize/${row.id}`)}>{row.action}</Button>
                    </TableCell>
                  </TableRow>
                );
              })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: 33 * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
}
