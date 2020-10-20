import React from 'react'
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';

const TableGenerator = (props) => {

    const { 
        products, 
        columns, 
        _handleChangePage, 
        _handleChangeRowsPerPage,
        totalCount,
        page,
        rowsPerPage,
        pagination
    } = props.data;

    const customTotal = (from, to, size) => (
        <span className="react-bootstrap-table-pagination-total">
          Showing { from } to { to } of { size } Results
        </span>
    );

    console.log('page',page)

    const options = {
        page:page,
        sizePerPage:rowsPerPage,
        paginationSize: 4,
        pageStartIndex: 1,
        totalSize:totalCount,
        // alwaysShowAllBtns: true, // Always show next and previous button
        // withFirstAndLast: false, // Hide the going to First and Last page button
        // hideSizePerPage: true, // Hide the sizePerPage dropdown always
        // hidePageListOnlyOnePage: true, // Hide the pagination list when only one page
        firstPageText: 'First',
        prePageText: 'Back',
        nextPageText: 'Next',
        lastPageText: 'Last',
        nextPageTitle: 'First page',
        prePageTitle: 'Pre page',
        firstPageTitle: 'Next page',
        lastPageTitle: 'Last page',
        showTotal: true,
        paginationTotalRenderer: customTotal,
        disablePageTitle: true,
        onPageChange: (newPage) => _handleChangePage(newPage),
        onSizePerPageChange: (rowsPerPageCount) => _handleChangeRowsPerPage(rowsPerPageCount),
        sizePerPageList: [
            {
                text: '10', value: 10
            }, 
            {
                text: '25', value: 25
            }, 
            {
                text: '50', value: 50
            },
            {
                text: '100', value: 100
            },
        ]
    };

    return (
        <div> 
            {
                pagination ? (
                    <BootstrapTable 
                        keyField='id' 
                        data={ products } 
                        columns={ columns } 
                        pagination={ paginationFactory(options) }
                    />
                ) : (
                    <BootstrapTable 
                        keyField='id' 
                        data={ products } 
                        columns={ columns } 
                    />
                )
            }
            
        </div>
    )
}

export default TableGenerator
