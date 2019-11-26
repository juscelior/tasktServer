﻿import React from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import Loader from '../../Loader';

export default class TopWorkers extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            error: null,
            isLoaded: false,
            workerList: [],
            api: props.api,
        };

    }

    componentDidMount() {
        this.GetAPIData();
    }

    GetAPIData() {
        setTimeout(
            function () {
                this.GetAPIData();
            }
                .bind(this),
            15000
        );

        console.log('running ' + this.state.api);

        fetch(this.state.api)
            .then(res => res.json())
            .then(
                (result) => {
                    console.log(result);
                    this.setState({
                        isLoaded: true,
                        workerList: result
                    });
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                    console.log(error);
                    this.setState({
                        isLoaded: true,
                        error

                    });
                }
        )

    }






    render() {
        const { error, isLoaded, workerList, api } = this.state;
        const divStyle = {
            backgroundColor: '#fff'
         };

        const columns = [
            {
                Header: 'Worker ID',
                accessor: 'workerID', 
                Cell: row => <div><span title={row.value}>{row.value}</span></div>
            },
            {
                Header: 'Worker Name',
                accessor: 'userName',
                Cell: row => <div><span title={row.value}>{row.value}</span></div>
            },
            {
                Header: 'Total Tasks',
                accessor: 'totalTasks',
                Cell: row => <div><span title={row.value}>{row.value}</span></div>
            },
            {
                Header: 'Running Tasks',
                accessor: 'runningTasks',
                Cell: row => <div><span title={row.value}>{row.value}</span></div>
            },
            {
                Header: 'Completed Tasks',
                accessor: 'completedTasks',
                Cell: row => <div><span title={row.value}>{row.value}</span></div>
            },
            {
                Header: 'Closed Tasks',
                accessor: 'closedTasks',
                Cell: row => <div><span title={row.value}>{row.value}</span></div>
            },
            {
                Header: 'Error Tasks',
                accessor: 'errorTasks',
                Cell: row => <div><span title={row.value}>{row.value}</span></div>
            }]


        if (error) {
            return <div>Error</div>;
        } else if (!isLoaded) {
            return <Loader type='spin' color='white' width='50px' height='50px'></Loader>;
        } else {
            return (

                <div style={divStyle}>
                    <ReactTable
                        data={workerList}
                        columns={columns}
                        defaultPageSize={5}
                        className="-striped -highlight"               
                    />                   
                </div>

            );
        }
    }
}