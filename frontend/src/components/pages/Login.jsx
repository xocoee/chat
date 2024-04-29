import React, { useState, useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useNavigate, Link } from 'react-router-dom';
import {
  Button, Form, Col, Container, Card, Row, FloatingLabel,
} from 'react-bootstrap';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

import loginImages from '../../images/login.jpg';
import routes from '../../utils/routes.js';
import { setCredentials } from '../../store/authSlice.js';

const Login = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [authFailed, setAuthFailed] = useState(false);
  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: yup.object({
      username: yup.string()
        .typeError(t('required'))
        .required(t('required')),
      password: yup.string()
        .typeError(t('required'))
        .required(t('required')),
    }),

    onSubmit: async (values) => {
      setAuthFailed(false);

      try {
        const res = await axios.post(routes.login(), values);
        const userData = res.data;
        dispatch(setCredentials(userData));
        navigate(routes.root());
      } catch (error) {
        formik.setSubmitting(false);
        if (error.isAxiosError && error.response.status === 401) {
          setAuthFailed(true);
          inputRef.current.select();
          return;
        }
        toast.error(t('toastMessage.dataLoadingError'));
        throw error;
      }
    },
  });

  return (
    <Container fluid className="h-100">
      <Row className="justify-content-center align-content-center h-100">
        <Col xs={12} md={8} xxl={6}>
          <Card className="shadow-sm">
            <Card.Body className="row p-5">
              <Col className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                <img
                  src={loginImages}
                  className="rounded-circle"
                  alt={t('loginPage.header')}
                />
              </Col>
              <Col xs={12} md={6} className="mt-3 mt-md-0">
                <h1 className="text-center mb-4">{t('loginPage.enter')}</h1>
                <Form onSubmit={formik.handleSubmit}>
                  <FloatingLabel className="mb-3" controlId="username" label={t('loginPage.username')}>
                    <Form.Control
                      type="text"
                      placeholder={t('loginPage.username')}
                      onChange={formik.handleChange}
                      value={formik.values.username}
                      isInvalid={authFailed}
                      required
                      ref={inputRef}
                    />
                  </FloatingLabel>

                  <FloatingLabel className="mb-4" controlId="password" label={t('loginPage.password')}>
                    <Form.Control
                      type="password"
                      placeholder={t('loginPage.password')}
                      onChange={formik.handleChange}
                      value={formik.values.password}
                      isInvalid={authFailed}
                      required
                    />
                    <Form.Control.Feedback type="invalid" tooltip>
                      {t('loginPage.noValidUsername')}
                    </Form.Control.Feedback>
                  </FloatingLabel>
                  <Button type="submit" variant="outline-primary" className="w-100 mb-3">
                    {t('loginPage.enter')}
                  </Button>
                </Form>
              </Col>
            </Card.Body>
            <Card.Footer className="p-4">
              <div className="text-center">
                <span>{t('loginPage.notAccount')}</span>
                {' '}
                <Link to={routes.signupPage()}>{t('loginPage.signup')}</Link>
              </div>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
