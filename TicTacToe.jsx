import React, { useState, useReducer, useCallback } from 'react';
import Table from './Table'

const initialState = {
    winner : '',
    turn : 'O',
    tableData : [['','',''],['','',''],['','','']]
}

export const SET_WINNER = 'SET_WINNER';
export const CLICK_CELL = 'CLICK_CELL';
export const CHANGE_TURN = 'CHANGE_TURN';

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
                tableData
            }    
        }
        case CHANGE_TURN:
            console.log('now turn ', state.turn)
            return {
                ...state,
                turn : state.turn === 'O' ? 'X' : 'O'
            }
    }
}

const TicTacToe = () => {
    const [state, dispatch] = useReducer(reducer, initialState);

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