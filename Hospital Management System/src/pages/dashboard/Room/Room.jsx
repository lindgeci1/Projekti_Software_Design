import React, { useEffect, useState, Suspense, lazy } from 'react';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import { Button, Box, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Typography } from '@mui/material';
import Cookies from 'js-cookie';
import { Add, Delete, Edit } from '@mui/icons-material';
import { useLocation } from 'react-router-dom';
import {jwtDecode}from 'jwt-decode';
const CreateRoom = lazy(() => import('./CreateRoom'));
const UpdateRoom = lazy(() => import('./UpdateRoom'));

function Room({ showCreateForm, setShowCreateForm, showUpdateForm, setShowUpdateForm, setSelectedRoomId }) {
    const [rooms, setRooms] = useState([]);
    const [deleteRoomId, setDeleteRoomId] = useState(null);
    const token = Cookies.get('token');
    const location = useLocation();
    const [userRole, setUserRole] = useState('');
    const handleUpdateButtonClick = (roomId) => {
        setSelectedRoomId(roomId);
        setShowUpdateForm(true);
    };

    useEffect(() => {
        const fetchUserRole = async () => {
            try {
                const decodedToken = jwtDecode(token);
                const userEmail = decodedToken.email;
                
                const userResponse = await axios.get('http://localhost:9004/api/users', {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                const currentUser = userResponse.data.find(user => user.email === userEmail);
                const role = currentUser.role;
                console.log(currentUser);
                // console.log('User Role:', role); // Debug log to verify the user role
                setUserRole(role);
            } catch (err) {
                console.error('Error fetching user role:', err.response ? err.response.data : err.message);
            }
        };

        fetchUserRole();
    }, [token]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [roomRes, patientRes] = await Promise.all([
                    axios.get('http://localhost:9004/api/room', { headers: { 'Authorization': `Bearer ${token}` } }),
                    axios.get('http://localhost:9004/api/patient', { headers: { 'Authorization': `Bearer ${token}` } })
                ]);

                const patients = patientRes.data;
                const roomsDataWithNames = roomRes.data.map(room => {
                    const patient = patients.find(p => p.Patient_ID === room.Patient_ID);
                    return {
                        ...room,
                        Patient_Name: patient ? `${patient.Patient_Fname} ${patient.Patient_Lname}` : 'Unknown',
                    };
                });

                setRooms(roomsDataWithNames);
            } catch (err) {
                console.error(err);
            }
        };

        fetchData();

        // Check if navigation state contains patientId to show the CreateRoom form
        if (location.state?.patientId && location.state?.showCreateForm) {
            setShowCreateForm(true);
        }
    }, [token, location.state, setShowCreateForm]);

    const handleDelete = (id) => {
        setDeleteRoomId(id);
    };

    const handleDeleteConfirm = async () => {
        try {
            await axios.delete(`http://localhost:9004/api/room/delete/${deleteRoomId}`, { headers: { 'Authorization': `Bearer ${token}` } });
            setRooms(rooms.filter(item => item.Room_ID !== deleteRoomId));
            setShowUpdateForm(false);
            setShowCreateForm(false);
        } catch (err) {
            console.error(err);
        }
        setDeleteRoomId(null);
    };

    const handleCreateFormToggle = () => {
        setShowCreateForm(!showCreateForm);
        setShowUpdateForm(false);
    };

    const columns = [
        { field: 'Room_ID', headerName: 'ID', flex: 1 },
        { field: 'Room_type', headerName: 'Room Type', flex: 1 },
        { field: 'Patient_Name', headerName: 'Patient Name', flex: 1 },
        { field: 'Room_cost', headerName: 'Cost (€)', flex: 1 },
        ...(userRole !== 'patient' ? [
        {
            
            field: 'update',
            headerName: 'Update',
            flex: 1,
            renderCell: (params) => (
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleUpdateButtonClick(params.row.Room_ID)}
                    startIcon={<Edit />}
                >
                </Button>
            )
        },
    ] : []),
    ...(userRole == 'admin' ? [
        {
            field: 'delete',
            headerName: 'Delete',
            flex: 1,
            renderCell: (params) => (
                <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleDelete(params.row.Room_ID)}
                    startIcon={<Delete />}
                >
                </Button>
            )
        }
    ] : [])
    ];

    return (
        <div className='container-fluid mt-4'>
            {deleteRoomId && (
                <Dialog
                    open={!!deleteRoomId}
                    onClose={() => setDeleteRoomId(null)}
                >
                    <DialogTitle>Confirm Deletion</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Are you sure you want to delete this room record?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setDeleteRoomId(null)} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={handleDeleteConfirm} color="secondary">
                            Delete
                        </Button>
                    </DialogActions>
                </Dialog>
            )}

            <Box mt={4} display="flex" alignItems="center" justifyContent="space-between">
                <Typography variant="h6">
                    Rooms
                </Typography>
                {userRole == 'admin' && !showCreateForm && (
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleCreateFormToggle}
                        startIcon={<Add />}
                    >
                    </Button>
                )}
            </Box>

            {showCreateForm && (
                <Suspense fallback={<div>Loading...</div>}>
                    <CreateRoom onClose={() => setShowCreateForm(false)} />
                </Suspense>
            )}

            <Box mt={4} style={{ height: '100%', width: '100%' }}>
                <DataGrid
                    rows={rooms}
                    columns={columns}
                    pageSize={10}
                    rowsPerPageOptions={[10]}
                    getRowId={(row) => row.Room_ID}
                />
            </Box>

            {showUpdateForm && (
                <Suspense fallback={<div>Loading...</div>}>
                    <UpdateRoom onClose={() => setShowUpdateForm(false)}/>
                </Suspense>
            )}
        </div>
    );
}

export default Room;
