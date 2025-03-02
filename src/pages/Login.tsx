import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, message } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../store/store';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userToken } = useSelector((state: RootState) => state.user);
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);
  const hasRunRef = useRef(false);

  const handleLogin = (values: any) => {
    const { email, password } = values;
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailRegex.test(email)) {
      message.error('Please enter a valid email address.');
      setLoading(false)
      return;
    }
    if (email !== 'eve.holt@reqres.in') {
      message.error('Email does not match our records.');
      setLoading(false)
      return;
    }
    if (password.length <= 8) {
      message.error('Password must be more than 8 characters.');
      setLoading(false)
      return;
    }
    if (password !== 'cityslicka') {
      message.error('Password does not match our records.');
      setLoading(false)
      return;
    }
    dispatch({ type: 'user/loginRequest', payload: { email, password } });
  };

  useEffect(() => {
    if (userToken && !hasRunRef.current) {
      hasRunRef.current = true;
      setLoading(false);
      navigate('/');
      message.success('Login successful');
    }
  }, [userToken, navigate]);

  return (
    <div className="login-container">
      <div className="login-form-container">
        <h1 className="login-title">Login</h1>
        <Form
          name="login-form"
          initialValues={{
            email: 'eve.holt@reqres.in',
            password: 'cityslicka',
            remember: rememberMe,
          }}
          onFinish={(values) => {
            setLoading(true)
            handleLogin(values)
          }}
          layout="vertical"
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: 'Please input your email!' }]}
          >
            <Input
              prefix={<UserOutlined />}
              placeholder="Email"
            />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Password"
            />
          </Form.Item>

          <Form.Item name="remember" valuePropName="checked">
            <Checkbox
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            >
              Remember me
            </Checkbox>
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
              loading={loading}
              disabled={loading}
            >
              Login
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;
