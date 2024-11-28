import React, { useState } from "react";
import { Table, Button, message } from "antd";

const FileTable = () => {
    const [data, setData] = useState([
        {
            key: "1",
            name: "Folder 1",
            type: "Folder",
            size: "-",
            isFolder: true,
            children: [
                { key: "1-1", name: "File 1-1", type: "File", size: "15 KB" },
                { key: "1-2", name: "File 1-2", type: "File", size: "20 KB" },
                {
                    key: "1-3",
                    name: "Folder 1-1",
                    type: "Folder",
                    size: "-",
                    isFolder: true,
                    children: [
                        {
                            key: "1-3-1",
                            name: "File 1-3-1",
                            type: "File",
                            size: "10 KB",
                        },
                    ],
                },
            ],
        },
        {
            key: "2",
            name: "Folder 2",
            type: "Folder",
            size: "-",
            isFolder: true,
            children: [
                { key: "2-1", name: "File 2-1", type: "File", size: "10 KB" },
                { key: "2-2", name: "File 2-2", type: "File", size: "30 KB" },
            ],
        },
        { key: "3", name: "File 3", type: "File", size: "25 KB" },
    ]);

    const [selectedKeys, setSelectedKeys] = useState([]);
    const collectKeys = (item) => {
        let keys = [item.key];
        if (item.children) {
            keys = keys.concat(item.children.flatMap(collectKeys));
        }
        return keys;
    };

    const handleSelectionChange = (selectedRowKeys, selectedRows) => {
        const allKeys = new Set(selectedRowKeys);

        selectedRows.forEach((row) => {
            if (row.isFolder) {
                collectKeys(row).forEach((key) => allKeys.add(key));
            }
        });

        setSelectedKeys([...allKeys]);
    };

    const handleDelete = () => {
        if (selectedKeys.length === 0) {
            message.warning("No file or folder selected for deletion");
            return;
        }

        const deleteRecursively = (items) =>
            items
                .filter((item) => !selectedKeys.includes(item.key))
                .map((item) => ({
                    ...item,
                    children: item.children
                        ? deleteRecursively(item.children)
                        : undefined,
                }));

        setData(deleteRecursively(data));
        message.success(`${selectedKeys.length} item(s) deleted successfully`);
        setSelectedKeys([]);
    };

    const rowSelection = {
        selectedRowKeys: selectedKeys,
        onChange: handleSelectionChange,
    };

    const columns = [
        {
            title: "Name",
            dataIndex: "name",
            render: (text, record) =>
                record.isFolder ? <b>{text}</b> : <span>{text}</span>,
        },
        {
            title: "Type",
            dataIndex: "type",
        },
        {
            title: "Size",
            dataIndex: "size",
        },
    ];

    return (
        <div>
            {contextHolder}
            <Table
                rowSelection={rowSelection}
                columns={columns}
                dataSource={data}
                expandable={{
                    rowExpandable: (record) => record.isFolder,
                    childrenColumnName: "children",
                }}
                pagination={false}
            />
            <Button
                type="primary"
                danger
                onClick={handleDelete}
                disabled={selectedKeys.length === 0}
                style={{ marginTop: "20px" }}
            >
                Delete Selected
            </Button>
        </div>
    );
};

export default FileTable;
