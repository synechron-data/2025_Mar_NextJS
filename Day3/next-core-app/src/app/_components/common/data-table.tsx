import React from 'react';

interface DataTableProps<T> {
    items: T[];
    children?: React.ReactNode;
}

const Th = <T extends {}>({ item }: { item: T }) => {
    const allHeads = Object.keys(item).concat("", "actions", "");

    return (
        <tr>
            {
                allHeads.map((head, index) => (
                    <th key={index}>{head.toUpperCase()}</th>
                ))
            }
        </tr>
    );
}

const Tr = <T extends {}>({ item }: { item: T }) => {
    const renderCells = () => {
        const values = Object.values(item) as (string | number)[];
        return values.map((value, index) => <td key={index}>{value}</td>);
    }

    return (
        <tr>
            {renderCells()}
            <td>
                <a href="/#" className="text-primary">Details</a>
            </td>
            <td>
                <a href="/#" className="text-warning">Edit</a>
            </td>
            <td>
                <a href="/#" className="text-danger">Delete</a>
            </td>
        </tr>
    );
}

const DataTable = <T extends { id: number | string }>({ items, children }: DataTableProps<T>) => {
    let headers = null;
    let rows = null;

    if (items && items.length !== 0) {
        headers = items.length > 0 ? <Th item={items[0]} /> : null;
        rows = items.map((item) => (
            <Tr key={item.id} item={item} />
        ));
    }

    return (
        <>
            {
                children &&
                <>
                    {children}
                    <hr />
                </>
            }

            <table className='table table-striped'>
                <thead>{headers}</thead>
                <tbody>{rows}</tbody>
            </table>
        </>
    );
}

export default DataTable