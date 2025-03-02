import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Button, Card, Row } from 'antd';
import React from 'react';

interface CardViewProps {
    data: any[];
    handleEdit: (data: any) => void;
    handleDelete: (data: any) => void;
}

const CardView: React.FC<CardViewProps> = ({ data, handleEdit, handleDelete }) => {
    return (
        <Row className="card-container">
            {data.map((user: any) => (
                <Card
                    hoverable
                    className="custom-card"
                    key={user.id}
                >
                    <div className="card-content">
                        <div className="avatar-container">
                            <img
                                alt="avatar"
                                src={user.avatar}
                                className="avatar"
                            />
                        </div>
                        <div className="user-info">
                            <div className="user-name">
                                <strong>{`${user.first_name} ${user.last_name}`}</strong>
                            </div>
                            <div className="user-email">{user.email}</div>
                        </div>

                    </div>
                    <div className="card-overlay">
                        <Button
                            icon={<EditOutlined />}
                            onClick={() => handleEdit(user)}
                            className="overlay-button edit-button"
                        />
                        <Button
                            icon={<DeleteOutlined />}
                            onClick={() => handleDelete(user.id)}
                            danger
                            className="overlay-button delete-button"
                        />
                    </div>
                </Card>
            ))}
        </Row>
    );
};

export default CardView;
