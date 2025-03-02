import { AppstoreAddOutlined, LogoutOutlined, SearchOutlined, TableOutlined } from '@ant-design/icons';
import { Button, Col, Input, Row, Typography } from 'antd';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import CustomButton from '../components/Button';
import { deleteUserRequest, fetchUsersStart } from '../features/user/userSlice';
import { RootState } from '../store/store';
import CardView from './CardView';
import TableView from './TableView';
import FormPage from './UserForm';

const { Title, Text } = Typography;

const Home = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { users } = useSelector((state: RootState) => state.user);
    const [searchText, setSearchText] = useState('');
    const [formPageStatus, setFormPageStatus] = useState(false);
    const [listData, setListData] = useState<any>([]);
    const [editData, setEditData] = useState<any>();
    const [viewMode, setViewMode] = useState<'table' | 'card'>('table');
    const [filteredData, setFilteredData] = useState<any[]>([]);
    const localItem = localStorage.getItem('userData');
    const userData = localItem ? JSON.parse(localItem) : null;

    const handleSearch = (value: string) => {
        const filtered = listData && listData.filter((item: any) =>
            item.first_name.toLowerCase().includes(value.toLowerCase()) ||
            item.last_name.toLowerCase().includes(value.toLowerCase())
        );
        setFilteredData([...filtered]);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchText(e.target.value);
        handleSearch(e.target.value);
    };

    const handleEdit = (data: any) => {
        setFormPageStatus(true)
        setEditData(data)
        console.log('Edit user with id:', data);
    };

    const handleDelete = (id: number) => {
        if (!id) return
        dispatch(deleteUserRequest(id));
    };

    useEffect(() => {
        dispatch(fetchUsersStart());
    }, [dispatch]);

    useEffect(() => {
        let tempListData: any = []
        if (users) tempListData = users
        if (tempListData && tempListData.data && !searchText) {
            setFilteredData([...tempListData.data])
            setListData([...tempListData.data])
        };
    }, [users, searchText]);

    const handleCreateUser = () => {
        setFormPageStatus(true)
    }

    const handleLogout = () => {
        navigate('/login');
        localStorage.clear()
        localStorage.removeItem('userData')
        window.location.reload();
    }


    return (
        <div className="home-container">
            <div className="header">
                <Row justify="end" align="middle">
                    <Col>
                        <Title level={5} className="header-title">{userData && userData.username}</Title>
                    </Col>
                    <Col>
                        <Button
                            type="primary"
                            danger
                            icon={<LogoutOutlined />}
                            className="logout-button"
                            onClick={() => handleLogout()}
                        />
                    </Col>
                </Row>
            </div>
            <>
                {formPageStatus ? <FormPage userToEdit={editData} setFormPageStatus={setFormPageStatus} />
                    : <>
                        <div className="content-container">
                            <div className="left-section">
                                <Title level={4}>User</Title>
                                <Row className="left-subcard">
                                    <Text className={viewMode === 'table' ? "active-tab" : ''} onClick={() => setViewMode('table')}>
                                        <TableOutlined /> Table
                                    </Text>
                                    <Text className={viewMode === 'card' ? "active-tab" : ''} onClick={() => setViewMode('card')} >
                                        <AppstoreAddOutlined /> Card
                                    </Text>
                                </Row>
                            </div>
                            <div className="right-section">
                                <Row justify="end" style={{ marginBottom: '20px' }}>
                                    <Col>
                                        <Input
                                            placeholder="Search by name"
                                            value={searchText}
                                            onChange={handleInputChange}
                                            addonAfter={<SearchOutlined />}
                                            className="search-input"
                                            style={{ width: '200px' }}
                                        />
                                    </Col>
                                    <Col style={{ marginLeft: '10px' }}>
                                        <CustomButton text="Create" color="blue" width="100px" onClick={() => handleCreateUser()} />
                                    </Col>
                                </Row>
                            </div>
                        </div>
                        {viewMode === 'table' ? (
                            <TableView data={filteredData} handleEdit={handleEdit} handleDelete={handleDelete} />
                        ) : (
                            <CardView data={filteredData} handleEdit={handleEdit} handleDelete={handleDelete} />
                        )}
                    </>
                }
            </>
        </div>
    );
};

export default Home;
