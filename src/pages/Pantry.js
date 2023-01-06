import * as React from "react";
import Button from "@mui/material/Button";
import PropTypes from "prop-types";
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import DeleteIcon from "@mui/icons-material/Delete";
import { visuallyHidden } from "@mui/utils";
import Drawer from "../components/Drawer";
import { Grid } from "@mui/material";
import Transitions from "../components/Transition";
import { useParams } from "react-router-dom";
import ProductionQuantityLimitsIcon from "@mui/icons-material/ProductionQuantityLimits";
import Share from "../components/Share";
import pantryService from "../services/pantry-service";
import productsService from "../services/products-service";

function createData(products, category, amount, unit, expiry) {
	return {
		products,
		category,
		amount,
		unit,
		expiry,
	};
}

function descendingComparator(a, b, orderBy) {
	if (b[orderBy] < a[orderBy]) {
		return -1;
	}
	if (b[orderBy] > a[orderBy]) {
		return 1;
	}
	return 0;
}

function getComparator(order, orderBy) {
	return order === "desc"
		? (a, b) => descendingComparator(a, b, orderBy)
		: (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
	const stabilizedThis = array.map((el, index) => [el, index]);
	stabilizedThis.sort((a, b) => {
		const order = comparator(a[0], b[0]);
		if (order !== 0) {
			return order;
		}
		return a[1] - b[1];
	});
	return stabilizedThis.map(el => el[0]);
}

const headCells = [
	{
		id: "products",
		numeric: false,
		disablePadding: true,
		label: "Product",
	},
	{
		id: "category",
		numeric: true,
		disablePadding: false,
		label: "Category",
	},
	{
		id: "amount",
		numeric: true,
		disablePadding: false,
		label: "Amount",
	},
	{
		id: "unit",
		numeric: true,
		disablePadding: false,
		label: "Unit",
	},
	{
		id: "expiry",
		numeric: true,
		disablePadding: false,
		label: "Expiry date",
	},
];

function EnhancedTableHead(props) {
	const {
		onSelectAllClick,
		order,
		orderBy,
		numSelected,
		rowCount,
		onRequestSort,
	} = props;
	const createSortHandler = property => event => {
		onRequestSort(event, property);
	};

	return (
		<TableHead>
			<TableRow>
				<TableCell padding='checkbox'>
					<Checkbox
						color='primary'
						indeterminate={numSelected > 0 && numSelected < rowCount}
						checked={rowCount > 0 && numSelected === rowCount}
						onChange={onSelectAllClick}
						inputProps={{
							"aria-label": "select all",
						}}
					/>
				</TableCell>
				{headCells.map(headCell => (
					<TableCell
						key={headCell.id}
						align={headCell.numeric ? "right" : "left"}
						padding={headCell.disablePadding ? "none" : "normal"}
						sortDirection={orderBy === headCell.id ? order : false}>
						<TableSortLabel
							active={orderBy === headCell.id}
							direction={orderBy === headCell.id ? order : "asc"}
							onClick={createSortHandler(headCell.id)}>
							{headCell.label}
							{orderBy === headCell.id ? (
								<Box component='span' sx={visuallyHidden}>
									{order === "desc" ? "sorted descending" : "sorted ascending"}
								</Box>
							) : null}
						</TableSortLabel>
					</TableCell>
				))}
			</TableRow>
		</TableHead>
	);
}

EnhancedTableHead.propTypes = {
	numSelected: PropTypes.number.isRequired,
	onRequestSort: PropTypes.func.isRequired,
	onSelectAllClick: PropTypes.func.isRequired,
	order: PropTypes.oneOf(["asc", "desc"]).isRequired,
	orderBy: PropTypes.string.isRequired,
	rowCount: PropTypes.number.isRequired,
};

function EnhancedTableToolbar(props) {
	const { numSelected } = props;
	const currentPantry = pantryService.getCurrentPantryByID();
	let { id } = useParams();

	document.addEventListener("DOMContentLoaded", () => {
		pantryService.getPantryByID(id);
	});

	const pantryName = currentPantry.content.name;

	return (
		<>
			<Toolbar
				sx={{
					pl: { sm: 2 },
					pr: { xs: 1, sm: 1 },
					...(numSelected > 0 && {
						bgcolor: theme =>
							alpha(
								theme.palette.primary.main,
								theme.palette.action.activatedOpacity
							),
					}),
				}}>
				{numSelected > 0 ? (
					<Typography
						sx={{ flex: "1 1 100%" }}
						color='inherit'
						variant='subtitle1'
						component='div'>
						{numSelected} selected
					</Typography>
				) : (
					<Typography
						sx={{ flex: "1 1 100%" }}
						variant='h6'
						id='tableTitle'
						component='div'>
						{pantryName}
					</Typography>
				)}
				{numSelected > 0 ? (
					<Tooltip title='Delete'>
						<IconButton>
							<DeleteIcon />
						</IconButton>
					</Tooltip>
				) : (
					<>
						<Share></Share>
						<IconButton>
							<Button
								href='/add-product'
								style={{ color: "white", justifyContent: "flex-end" }}
								color='inherit'
								size='small'
								startIcon={<ProductionQuantityLimitsIcon />}>
								Add Product
							</Button>
						</IconButton>
					</>
				)}
			</Toolbar>
		</>
	);
}

EnhancedTableToolbar.propTypes = {
	numSelected: PropTypes.number.isRequired,
};

function Test(array) {
	let { id } = useParams();

	
	productsService.getPantryProducts(id).then(response => {
		response.content.forEach(element => {
			array.push({products: element.name, category: element.categories[0].name, amount: element.amount, unit: element.unit, expiry: element.expieryDate})
		});
	});
	array.push(productsService.pobierz());
	array.push({products: "Cupcakes", category: "Sweets", amount: 20, unit: "kg", expiry: "10.12.2022"})
	array.push({products: "Cola", category: "Sweets", amount: 20, unit: "kg", expiry: "10.12.2022"})
}

export default function EnhancedTable() {
	let { id } = useParams(); //id of user pantry
	// let pantryProducts;
	let rows = [];

	Test(rows);
	console.log(rows);

	const url = "?url=https%3A%2F%2Flocalhost%3A3000%2Fpantry%2F" + id;
	document.addEventListener("DOMContentLoaded", () => {
		pantryService.getQR(url);
	});

	// document.addEventListener("DOMContentLoaded", () => {
	// 	productsService.getPantryProducts(id).then(response => {
	// 		response.content.forEach(element => {
	// 			rows.push(createData(element.name, element.categories[0].name, element.amount, element.unit, element.expieryDate))
	// 		});
	// 	});
	// })
	// console.log(rows)

	// const rows = [
	// 	createData("Cupcakes", "Sweets", 20, "kg", "10.12.2022"),
	// 	createData("Cola", "Drinks", 5, "l", "22.12.2022"),
	// 	createData("Sugar", "Spices", 8, "kg", "10.12.2025"),
	// 	createData("Sprite", "Drinks", 20, "l", "10.04.2022"),
	// ];

	// let rows = [
	// 	{products: "Cupcakes", category: "Sweets", amount: 20, unit: "kg", expiry: "10.12.2022"}
	// ]
	// console.log(rows)

	const [order, setOrder] = React.useState("asc");
	const [orderBy, setOrderBy] = React.useState("category");
	const [selected, setSelected] = React.useState([]);
	const [page, setPage] = React.useState(0);
	const [dense, setDense] = React.useState(false);
	const [rowsPerPage, setRowsPerPage] = React.useState(5);

	const handleRequestSort = (event, property) => {
		const isAsc = orderBy === property && order === "asc";
		setOrder(isAsc ? "desc" : "asc");
		setOrderBy(property);
	};

	const handleSelectAllClick = event => {
		if (event.target.checked) {
			const newSelected = rows.map(n => n.products);
			setSelected(newSelected);
			return;
		}
		setSelected([]);
	};

	const handleClick = (event, products) => {
		const selectedIndex = selected.indexOf(products);
		let newSelected = [];

		if (selectedIndex === -1) {
			newSelected = newSelected.concat(selected, products);
		} else if (selectedIndex === 0) {
			newSelected = newSelected.concat(selected.slice(1));
		} else if (selectedIndex === selected.length - 1) {
			newSelected = newSelected.concat(selected.slice(0, -1));
		} else if (selectedIndex > 0) {
			newSelected = newSelected.concat(
				selected.slice(0, selectedIndex),
				selected.slice(selectedIndex + 1)
			);
		}

		setSelected(newSelected);
	};

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = event => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};

	const handleChangeDense = event => {
		setDense(event.target.checked);
	};

	const isSelected = products => selected.indexOf(products) !== -1;

	// Avoid a layout jump when reaching the last page with empty rows.
	const emptyRows =
		page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

	return (
		<>
			<Drawer></Drawer>
			<Transitions>
				<div class='ml-20 mr-6 pb-2 pt-4 lg:ml-20 md:ml-20 sm:max-w-4xl lg:max-w-screen-3xl md:px-24'>
					<div class=''>
						<Box sx={{ width: "100%" }}>
							<Paper sx={{ width: "100%", mb: 2 }}>
								<EnhancedTableToolbar numSelected={selected.length} />
								<TableContainer>
									<Table
										sx={{ minWidth: 750 }}
										aria-labelledby='tableTitle'
										size={dense ? "small" : "medium"}>
										<EnhancedTableHead
											numSelected={selected.length}
											order={order}
											orderBy={orderBy}
											onSelectAllClick={handleSelectAllClick}
											onRequestSort={handleRequestSort}
											rowCount={rows.length}
										/>
										<TableBody>
											{stableSort(rows, getComparator(order, orderBy))
												.slice(
													page * rowsPerPage,
													page * rowsPerPage + rowsPerPage
												)
												.map((row, index) => {
													const isItemSelected = isSelected(row.products);
													const labelId = `enhanced-table-checkbox-${index}`;

													return (
														<TableRow
															hover
															onClick={event =>
																handleClick(event, row.products)
															}
															role='checkbox'
															aria-checked={isItemSelected}
															tabIndex={-1}
															key={row.products}
															selected={isItemSelected}>
															<TableCell padding='checkbox'>
																<Checkbox
																	color='primary'
																	checked={isItemSelected}
																	inputProps={{
																		"aria-labelledby": labelId,
																	}}
																/>
															</TableCell>
															<TableCell
																component='th'
																id={labelId}
																scope='row'
																padding='none'>
																{row.products}
															</TableCell>
															<TableCell align='right'>
																{row.category}
															</TableCell>
															<TableCell align='right'>{row.amount}</TableCell>
															<TableCell align='right'>{row.unit}</TableCell>
															<TableCell align='right'>{row.expiry}</TableCell>
														</TableRow>
													);
												})}
											{emptyRows > 0 && (
												<TableRow
													style={{
														height: (dense ? 33 : 53) * emptyRows,
													}}>
													<TableCell colSpan={6} />
												</TableRow>
											)}
										</TableBody>
									</Table>
								</TableContainer>
								<Grid container direction='row' justifyContent='flex-end'>
									<FormControlLabel
										control={
											<Switch checked={dense} onChange={handleChangeDense} />
										}
										label='Dense padding'
									/>
								</Grid>
								<Grid container direction='row' justifyContent='flex-end'>
									<TablePagination
										rowsPerPageOptions={[5, 10, 25]}
										component='div'
										count={rows.length}
										rowsPerPage={rowsPerPage}
										page={page}
										onPageChange={handleChangePage}
										onRowsPerPageChange={handleChangeRowsPerPage}
									/>
								</Grid>
							</Paper>
						</Box>
					</div>
				</div>
			</Transitions>
		</>
	);
}