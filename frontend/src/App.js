import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { selectCurrentUser, selectIsAuthenticated } from './features/auth/authSlice';
import { refreshToken } from './features/auth/authActions';

// Layout Components
import MainLayout from './components/layouts/MainLayout';
import AuthLayout from './components/layouts/AuthLayout';

// Auth Pages
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import ForgotPassword from './pages/auth/ForgotPassword';
import ResetPassword from './pages/auth/ResetPassword';

// Main Pages
import Dashboard from './pages/Dashboard';
import Calendar from './pages/Calendar';
import Rehearsals from './pages/rehearsals/Rehearsals';
import RehearsalDetail from './pages/rehearsals/RehearsalDetail';
import CreateRehearsal from './pages/rehearsals/CreateRehearsal';
import Profile from './pages/profile/Profile';
import EditProfile from './pages/profile/EditProfile';
import GroupManagement from './pages/groups/GroupManagement';
import GroupDetail from './pages/groups/GroupDetail';
import Resources from './pages/resources/Resources';
import ResourceDetail from './pages/resources/ResourceDetail';
import NotFound from './pages/NotFound';

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  return children;
};

const App = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);
  
  // Check token validity on mount and refresh if needed
  useEffect(() => {
    if (currentUser) {
      dispatch(refreshToken());
    }
  }, [dispatch, currentUser]);

  return (
    <Routes>
      {/* Auth Routes */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
      </Route>

      {/* Protected Routes */}
      <Route element={<MainLayout />}>
        <Route path="/" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
        <Route path="/calendar" element={
          <ProtectedRoute>
            <Calendar />
          </ProtectedRoute>
        } />
        <Route path="/rehearsals" element={
          <ProtectedRoute>
            <Rehearsals />
          </ProtectedRoute>
        } />
        <Route path="/rehearsals/create" element={
          <ProtectedRoute>
            <CreateRehearsal />
          </ProtectedRoute>
        } />
        <Route path="/rehearsals/:id" element={
          <ProtectedRoute>
            <RehearsalDetail />
          </ProtectedRoute>
        } />
        <Route path="/profile" element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        } />
        <Route path="/profile/edit" element={
          <ProtectedRoute>
            <EditProfile />
          </ProtectedRoute>
        } />
        <Route path="/groups" element={
          <ProtectedRoute>
            <GroupManagement />
          </ProtectedRoute>
        } />
        <Route path="/groups/:id" element={
          <ProtectedRoute>
            <GroupDetail />
          </ProtectedRoute>
        } />
        <Route path="/resources" element={
          <ProtectedRoute>
            <Resources />
          </ProtectedRoute>
        } />
        <Route path="/resources/:id" element={
          <ProtectedRoute>
            <ResourceDetail />
          </ProtectedRoute>
        } />
      </Route>

      {/* 404 Route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
