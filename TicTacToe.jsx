import React, { useState, useReducer, useEffect } from 'react';
import Table from './Table'

const initialState = {
    winner : '',
    turn : 'O',
    tableData : [['','',''],['','',''],['','','']],
    recentCell : [-1, -1]
}

export const SET_WINNER = 'SET_WINNER';
export const CLICK_CELL = 'CLICK_CELL';
export const CHANGE_TURN = 'CHANGE_TURN';
export const RESET_GAME = 'RESET_GAME';

const reducer = (state, action) => {
    switch (action.type){
        case SET_WINNER:
            return {
                ...state,
                winner : action.winner
            }
        case CLICK_CELL:{
            const tableData = [...state.tableData];
            tableData[action.row] = [...tableData[action.row]];
            tableData[action.row][action.cell] = state.turn;
            return {
                ...state,
                tableData,
                recentCell : [action.row, action.cell],
            }    
        }
        case CHANGE_TURN:
            console.log('now turn ', state.turn)
            return {
                ...state,
                turn : state.turn === 'O' ? 'X' : 'O'
            }
        case RESET_GAME:
            return {
                ...state,
                turn : 'O',
                tableData : [['','',''],['','',''],['','','']],
                recentCell : [-1, -1]
            }
        default:
            return state;    
    }
}

const TicTacToe = () => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const { tableData, turn, winner, recentCell } = state;

    const [row, cell] = recentCell;

    useEffect(() => {
        const [row, cell] = recentCell;
        console.log('row : ', row);
        console.log('cell : ', cell);

        if(row < 0){
            return;
        }

        let win = false;

        if(tableData[row][0] === turn && tableData[row][1] === turn && tableData[row][2] === turn ){
            win = true;
        }
        if(tableData[0][cell] === turn && tableData[1][cell] === turn && tableData[2][cell] === turn ){
            win = true;
        }
        if(tableData[0][0] === turn && tableData[1][1] === turn && tableData[2][2] === turn ){
            win = true;
        }
        if(tableData[0][2] === turn && tableData[1][1] === turn && tableData[2][0] === turn ){
            win = true;
        }
        console.log(recentCell, win, tableData, turn);
        if(win){
            dispatch({
                type : SET_WINNER,
                winner : turn
            });
            dispatch({
                type : RESET_GAME,
            })
        }else{
            let all = true;
            tableData.forEach((row) => {    //무승부
                row.forEach((cell) => {
                    if(!cell){
                        all = false;
                    }
                })
            });
            if(all){
                dispatch({
                    type : RESET_GAME,
                })
            }else{
                dispatch({
                    type: CHANGE_TURN
                })
            }

        }
    }, [recentCell]);

    // const [winner, setWinner] = useState();
    // const [turn, setTurn] = useState('O');
    // const [tableData, setTableData] = useState([['','',''],['','',''],['','','']]);

    return (
        <>
            <Table tableData={state.tableData} dispatch={dispatch}/>   
            {state.winner && <div>{state.winner}의 승리</div> }
        </>
    );
};

export default TicTacToe;