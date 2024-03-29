import React from 'react';
import Drawer from '../components/Drawer';
import Transitions from '../components/Transition'
import summaryService from "../services/summary-service";
import WButtonCustom from '../components/WButtonCustom.js'
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import pantryService from '../services/pantry-service';
import { useEffect } from 'react';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

function createData(name, data2, data3, data4, data5, data6, data7, data8) {
    return { name, data2, data3, data4, data5, data6, data7, data8 };
}

export default function Statistics() {
    const [rows, setRows] = React.useState([])
    const [average, setAverage] = React.useState([])
    const [age, setAge] = React.useState(0);
    const [count, setCount] = React.useState(0);
    const [L, setL] = React.useState(0);
    const [ML, setML] = React.useState(0);
    const [kg, setKg] = React.useState(0);
    const [g, setG] = React.useState(0);
    const [piece, setPiece] = React.useState(0);
    const [bottle, setBottle] = React.useState(0);
    const [can, setCan] = React.useState(0);

    useEffect(() => {
        if ((localStorage.getItem("CurrentPantrySummary") != null)) {
            const summary = summaryService.getCurrentSummary();
            if (summary) {
                setAge(summary.content.pantryAge);
                setCount(summary.content.totalItemCount);
                setL(summary.content.totalQuantityByUnit.L);
                setML(summary.content.totalQuantityByUnit.ML);
                setKg(summary.content.totalQuantityByUnit.kg);
                setG(summary.content.totalQuantityByUnit.g);
                setPiece(summary.content.totalQuantityByUnit.Piece);
                setBottle(summary.content.totalQuantityByUnit.Bottle);
                setCan(summary.content.totalQuantityByUnit.Can);
            }
        }
    }, []);

    if ((localStorage.getItem("CurrentPantrySummary") != null)) {
        document.addEventListener("DOMContentLoaded", () => {
            let rows = []
            let average = []
            const currentPantry = pantryService.getCurrentPantryByID();
            const id = currentPantry.content.id;
            summaryService.getPantrySummary(id)
            .then(response => {
                for (let element of response.content.categorySummaries) {
                    rows.push(createData(element.categoryName, element.amountPerUnit.L, element.amountPerUnit.ML, element.amountPerUnit.kg, element.amountPerUnit.g, element.amountPerUnit.Piece, element.amountPerUnit.Bottle, element.amountPerUnit.Can));
                    average.push(createData(element.categoryName, element.averageMonthlyConsumption.L, element.averageMonthlyConsumption.ML, element.averageMonthlyConsumption.kg, element.averageMonthlyConsumption.g, element.averageMonthlyConsumption.Piece, element.averageMonthlyConsumption.Bottle, element.averageMonthlyConsumption.Can));
                }
                setRows(rows)
                setAverage(average)
            })


        })
    }

    if ((localStorage.getItem("CurrentPantrySummary") == null)) {
        return (
            <><Drawer></Drawer>
                <Transitions>
                    <section>
                        <div className='pantry-info'>
                            <p className="text-base text-gray-700 md:text-lg text-white">
                                Please enter desired pantry before visiting statistics page.
                            </p>
                            <div className='button-box'>
                                <WButtonCustom link="/dashboard" name="Dashboard" icon={<HomeOutlinedIcon />} />
                            </div>
                        </div>
                    </section>
                </Transitions>
            </>
        );
    } else {
        return (
            <><Drawer />
                <Transitions>
                    <div className="px-4 pb-2 pt-4 lg:mx-auto md:mx-auto ml-14 sm:max-w-xl lg:max-w-screen-xl md:px-24 lg:px-8 darkthemebg">
                        <div className="max-w-xl mb-10 md:mx-auto sm:text-center lg:max-w-2xl md:mb-12">
                            <div>
                                <p className="inline-block px-3 py-px mb-4 text-xs font-semibold tracking-wider text-teal-900 uppercase rounded-full text-black bg-white">
                                    STATISTICS
                                </p>
                            </div>
                            <h2 className="max-w-lg mb-6 font-sans text-3xl font-bold leading-none tracking-tight text-gray-900 sm:text-4xl md:mx-auto text-white">
                                <span className="relative inline-block">
                                    <svg
                                        viewBox="0 0 52 24"
                                        fill="currentColor"
                                        className="absolute top-0 left-0 z-0 hidden w-32 -mt-8 -ml-20 text-blue-gray-100 lg:w-32 lg:-ml-28 lg:-mt-10 sm:block"
                                    >
                                        <defs>
                                            <pattern
                                                id="d5589eeb-3fca-4f01-ac3e-983224745704"
                                                x="0"
                                                y="0"
                                                width=".135"
                                                height=".30"
                                            >
                                                <circle cx="1" cy="1" r=".7" />
                                            </pattern>
                                        </defs>
                                        <rect
                                            fill="url(#d5589eeb-3fca-4f01-ac3e-983224745704)"
                                            width="52"
                                            height="24"
                                        />
                                    </svg>
                                    <span className="relative">Welcome</span>
                                </span>{' '}
                                to your statistics and summaries page
                            </h2>
                            <p className="text-base text-gray-700 md:text-lg text-white">
                                We've prepared statistics and summaries for your amazing pantry
                            </p>
                        </div>
                        <div className="relative w-full p-px mx-auto mb-4 overflow-hidden transition-shadow duration-300 border rounded lg:mb-8 lg:max-w-4xl group hover:shadow-xl">
                            <div className="absolute bottom-0 left-0 w-full h-1 duration-300 origin-left transform scale-x-0 bg-deep-purple-accent-400 group-hover:scale-x-100" />
                            <div className="absolute bottom-0 left-0 w-1 h-full duration-300 origin-bottom transform scale-y-0 bg-deep-purple-accent-400 group-hover:scale-y-100" />
                            <div className="absolute top-0 left-0 w-full h-1 duration-300 origin-right transform scale-x-0 bg-deep-purple-accent-400 group-hover:scale-x-100" />
                            <div className="absolute bottom-0 right-0 w-1 h-full duration-300 origin-top transform scale-y-0 bg-deep-purple-accent-400 group-hover:scale-y-100" />
                            <div className="relative flex flex-col items-center h-full py-10 duration-300 rounded-sm transition-color sm:items-stretch sm:flex-row darkthemebg">
                                <div className="ml-4 px-12 py-8 text-center darkthemebg">
                                    <h6 className="text-4xl font-bold sm:text-5xl">
                                        {(count / 500 * 100).toFixed(2)}%
                                    </h6>
                                    <p className="text-center md:text-base">
                                        Pantry fulfilment
                                    </p>
                                </div>
                                <div className="w-56 h-1 transition duration-300 transform bg-gray-300 rounded-full group-hover:bg-deep-purple-accent-400 group-hover:scale-110 sm:h-auto sm:w-1 mr-4 ml-4" />
                                <div className="px-12 py-8 text-center darkthemebg">
                                    <h6 className="text-4xl font-bold text-deep-purple-accent-400 sm:text-5xl">
                                        {L + ML + kg + g + piece + bottle + can}
                                    </h6>
                                    <p className="text-center md:text-base">
                                        Total product quantity
                                    </p>
                                </div>
                                <div className="w-56 h-1 transition duration-300 transform bg-gray-300 rounded-full group-hover:bg-deep-purple-accent-400 group-hover:scale-110 sm:h-auto sm:w-1 mr-4 ml-4" />
                                <div className="px-12 py-8 text-center darkthemebg">
                                    <h6 className="text-4xl font-bold text-deep-purple-accent-400 sm:text-5xl">
                                        {count}
                                    </h6>
                                    <p className="text-center md:text-base">
                                        Amount of unique products
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="max-w-xl md:mx-auto sm:text-center lg:max-w-2xl md:mb-1">
                            <div>
                                <p className="inline-block px-3 py-px mb-2 text-xs font-semibold tracking-wider text-teal-900 uppercase rounded-full text-black bg-white">
                                    SUMMARY
                                </p>
                            </div>
                        </div>
                        <div className="max-w-xl md:mx-auto sm:text-center lg:max-w-2xl">
                            <p className="text-base text-gray-700 md:text-lg text-white">
                                Category summary
                            </p>
                        </div>
                        <div className='border'>
                            <TableContainer component={Paper}>
                                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                                    <TableHead>
                                        <TableRow>
                                            <StyledTableCell>Category</StyledTableCell>
                                            <StyledTableCell align="right">Unit&nbsp;(l)</StyledTableCell>
                                            <StyledTableCell align="right">Unit&nbsp;(ml)</StyledTableCell>
                                            <StyledTableCell align="right">Unit&nbsp;(kg)</StyledTableCell>
                                            <StyledTableCell align="right">Unit&nbsp;(g)</StyledTableCell>
                                            <StyledTableCell align="right">Unit&nbsp;(piece)</StyledTableCell>
                                            <StyledTableCell align="right">Unit&nbsp;(bottle)</StyledTableCell>
                                            <StyledTableCell align="right">Unit&nbsp;(can)</StyledTableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {rows.map((row) => (
                                            <StyledTableRow key={row.name}>
                                                <StyledTableCell component="th" scope="row">
                                                    {row.name}
                                                </StyledTableCell>
                                                <StyledTableCell align="right">{row.data2}</StyledTableCell>
                                                <StyledTableCell align="right">{row.data3}</StyledTableCell>
                                                <StyledTableCell align="right">{row.data4}</StyledTableCell>
                                                <StyledTableCell align="right">{row.data5}</StyledTableCell>
                                                <StyledTableCell align="right">{row.data6}</StyledTableCell>
                                                <StyledTableCell align="right">{row.data7}</StyledTableCell>
                                                <StyledTableCell align="right">{row.data8}</StyledTableCell>
                                            </StyledTableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </div>
                        <div className="max-w-xl md:mx-auto sm:text-center lg:max-w-2xl">
                            <p className="pt-4 text-base text-gray-700 md:text-lg text-white">
                                Average monthly consumption
                            </p>
                        </div>
                        <div className='border'>
                            <TableContainer component={Paper}>
                                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                                    <TableHead>
                                        <TableRow>
                                            <StyledTableCell>Category</StyledTableCell>
                                            <StyledTableCell align="right">Unit&nbsp;(l)</StyledTableCell>
                                            <StyledTableCell align="right">Unit&nbsp;(ml)</StyledTableCell>
                                            <StyledTableCell align="right">Unit&nbsp;(kg)</StyledTableCell>
                                            <StyledTableCell align="right">Unit&nbsp;(g)</StyledTableCell>
                                            <StyledTableCell align="right">Unit&nbsp;(piece)</StyledTableCell>
                                            <StyledTableCell align="right">Unit&nbsp;(bottle)</StyledTableCell>
                                            <StyledTableCell align="right">Unit&nbsp;(can)</StyledTableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {average.map((average) => (
                                            <StyledTableRow key={average.name}>
                                                <StyledTableCell component="th" scope="row">
                                                    {average.name}
                                                </StyledTableCell>
                                                <StyledTableCell align="right">{average.data2}</StyledTableCell>
                                                <StyledTableCell align="right">{average.data3}</StyledTableCell>
                                                <StyledTableCell align="right">{average.data4}</StyledTableCell>
                                                <StyledTableCell align="right">{average.data5}</StyledTableCell>
                                                <StyledTableCell align="right">{average.data6}</StyledTableCell>
                                                <StyledTableCell align="right">{average.data7}</StyledTableCell>
                                                <StyledTableCell align="right">{average.data8}</StyledTableCell>
                                            </StyledTableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </div>
                        <p className="pt-4 mx-auto mb-4 text-gray-600 sm:text-center lg:max-w-2xl lg:mb-6 md:px-16 text-white">
                            Keep it going, thank you for being amazing!
                        </p>
                    </div>
                </Transitions>
            </>
        )
    }
}