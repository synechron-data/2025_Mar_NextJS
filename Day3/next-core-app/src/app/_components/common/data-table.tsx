import React from 'react';

interface DataTableProps<T> {
    items: T[];
    children?: React.ReactNode;
    onSelect?: (item: T, allowEdit: boolean) => void;
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

interface TrProps<T> {
    item: T;
    onSelect?: (item: T, allowEdit: boolean) => void;
};

const Tr = <T extends { id: number | string }>({ item, onSelect }: TrProps<T>) => {
    const renderCells = () => {
        const values = Object.values(item) as (string | number)[];
        return values.map((value, index) => <td key={index}>{value}</td>);
    }

    return (
        <tr>
            {renderCells()}
            <td>
                <a href="/#" className="text-primary" onClick={(e) => {
                    e.preventDefault();
                    onSelect && onSelect(item, false);
                }}>Details</a>
            </td>
            <td>
                <a href="/#" className="text-warning" onClick={(e) => {
                    e.preventDefault();
                    onSelect && onSelect(item, true);
                }}>Edit</a>
            </td>
            <td>
                <a href="/#" className="text-danger">Delete</a>
            </td>
        </tr>
    );
}

const DataTable = <T extends { id: number | string }>({ items, children, onSelect }: DataTableProps<T>) => {
    let headers = null;
    let rows = null;

    if (items && items.length !== 0) {
        headers = items.length > 0 ? <Th item={items[0]} /> : null;
        rows = items.map((item) => (
            <Tr key={item.id} item={item} onSelect={onSelect} />
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