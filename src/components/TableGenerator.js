import React from 'react'
import BootstrapTable from 'react-bootstrap-table-next';

const TableGenerator = (props) => {

    const { products, columns } = props.data;

    return (
        <div>
            <BootstrapTable keyField='id' data={ products } columns={ columns } />
        </div>
    )
}

export default TableGenerator
