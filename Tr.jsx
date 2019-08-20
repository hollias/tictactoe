import React, { memo } from 'react';
import Td from './Td'

const Tr = memo(({ rowIndex, rowData, dispatch }) => {
    console.log('tr rendered')
    return (
        <tr>
            {Array(rowData.length).fill().map((td, i) => (<Td key={i} dispatch={dispatch} cellIndex={i} rowIndex={rowIndex} cellData={rowData[i]}></Td>))}
        </tr>
    );
});

export default Tr;