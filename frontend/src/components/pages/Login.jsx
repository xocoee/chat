import React, { useState, useRef, useEffect } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useNavigate, NavLink } from 'react-router-dom';
import {
  Button, Form, Col, Container, Card, Row,
} from 'react-bootstrap';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

import storage from '../../services/localStorage.js';
import loginImages from '../../images/login.jpg';

const Login = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [authFailure, setAuthFailure] = useState(false);

  const inputRef = useRef(null);

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
      setAuthFailure(false);

      try {
        const { data } = await axios.post('/api/v1/login', values);
        storage.setUserData(data);
        navigate('/');
      } catch (error) {
        console.error(error);
        if (!error.isAxiosError) {
          toast.error(t('toastMessage.unknownError'));
          return;
        }

        if (error.response?.status === 401) {
          setAuthFailure(true);
          inputRef.current.select();
        } else {
          toast.error(t('toastMessage.dataLoadingError'));
        }
      }
    },
  });

  return (
    <Container fluid className="h-100">
      <Row className="justify-content-center align-content-center h-100">
        <Col xs={12} md={8} xxl={6}>
          <Card className="shadow-sm">
            <Card.Body className="row p-5">
              <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                <img
                  src={loginImages}
                  className="rounded-circle"
                  alt={t('loginPage.header')}
                />
              </div>
              <Form onSubmit={formik.handleSubmit} className="col-12 col-md-6 mt-3 mt-mb-0">
                <h1 className="text-center mb-4">{t('loginPage.enter')}</h1>
                <fieldset disabled={formik.isSubmitting}>
                  <Form.Group className="mb-3 form-floating">
                    <Form.Control
                      type="text"
                      onChange={formik.handleChange}
                      value={formik.values.username}
                      placeholder={t('loginPage.username')}
                      name="username"
                      autoComplete="username"
                      isInvalid={authFailure}
                      required
                      ref={inputRef}
                    />
                    <label htmlFor="username">{t('loginPage.username')}</label>
                  </Form.Group>
                  <Form.Group className="mb-4 form-floating">
                    <Form.Control
                      type="password"
                      onChange={formik.handleChange}
                      value={formik.values.password}
                      placeholder={t('loginPage.password')}
                      name="password"
                      autoComplete="current-password"
                      isInvalid={authFailure}
                      required
                    />
                    <Form.Label htmlFor="password">{t('loginPage.password')}</Form.Label>
                    <Form.Control.Feedback type="invalid" tooltip>
                      {t('loginPage.noValidUsername')}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Button type="submit" variant="outline-primary" className="w-100 mb-3">
                    {t('loginPage.enter')}
                  </Button>
                </fieldset>
              </Form>
            </Card.Body>
            <Card.Footer className="p-4">
              <div className="text-center">
                <span>{t('loginPage.notAccount')}</span>
                {' '}
                <NavLink to="/signup">{t('loginPage.signup')}</NavLink>
              </div>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
