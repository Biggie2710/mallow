import { Space, Table } from 'antd';
import React from 'react';
import CustomButton from '../components/Button';

interface TableViewProps {
    data: any[];
    handleEdit: (data: any) => void;
    handleDelete: (data: any) => void;
}

const TableView: React.FC<TableViewProps> = ({ data, handleEdit, handleDelete }) => {
    const columns = [
        {
            title: '',
            dataIndex: 'avatar',
            key: 'avatar',
            width: 300,
            render: (avatar: string) => (
                <img
                    src={avatar}
                    alt="Avatar"
                    style={{
                        width: 50,
                        height: 50,
                        borderRadius: '50%',
                        display: 'block',
                        margin: '0 auto',
                    }}
                />
            ),
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'First Name',
            dataIndex: 'first_name',
            key: 'first_name',
        },
        {
            title: 'Last Name',
            dataIndex: 'last_name',
            key: 'last_name',
        },
        {
            title: 'Action',
            key: 'action',
            render: (text: any, record: any) => (
                <Space size="middle">
                    <CustomButton text="Edit" color="green" width="80px" onClick={() => handleEdit(record)} />
                    <CustomButton text="Delete" color="red" width="80px" onClick={() => handleDelete(record.id)} />
                </Space>
            ),
        },
    ];

    return <Table columns={columns} dataSource={data} pagination={{ pageSize: 5 }} rowKey="id" />;
};

export default TableView;
