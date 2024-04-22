import React, { useState, useRef, useEffect } from 'react';
import { useFormik } from 'formik';
import axios from 'axios';
import {
  Button, Form, Col, Container, Card, Row, FormLabel,
} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { useTranslation } from 'react-i18next';
import signupImages from '../../images/signup.jpg';

import storage from '../../services/localStorage';

const Signup = () => {
  const { t } = useTranslation();
  const [registrationFailed, setRegistrationFailed] = useState(false);
  const navigate = useNavigate();

  const inputRef = useRef(null);
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const validationSchema = () => yup.object().shape({
    username: yup
      .string()
      .trim()
      .required(t('signupPage.shemaRequired'))
      .min(3, t('signupPage.shemaUsername'))
      .max(20, t('signupPage.shemaUsername')),
    password: yup
      .string()
      .trim()
      .required(t('signupPage.shemaRequired'))
      .min(6, t('signupPage.shemaPassword')),
    confirmPassword: yup
      .string()
      .test(
        'confirmPassword',
        t('signupPage.shemaConfirmPassword'),
        (password, context) => password === context.parent.password,
      ),
  });

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      setRegistrationFailed(false);

      try {
        const { username, password } = values;
        const { data } = await axios.post('/api/v1/signup', { username, password });
        storage.setUserData(data);
        navigate('/');
      } catch (error) {
        if (!error.isAxiosError) {
          throw error;
        }

        if (error.response && error.response.status === 409) {
          setRegistrationFailed(true);
          inputRef.current.select();
          return;
        }

        throw error;
      }
    },
  });

  return (
    <Container fluid className="h-100">
      <Row className="justify-content-center align-items-center h-100">
        <Col xs={12} md={8} xxl={6}>
          <Card className="shadow-sm">
            <Card.Body className="d-flex flex-column flex-md-row justify-content-around align-items-center p-5">
              <div>
                <img
                  src={signupImages}
                  className="rounded-circle"
                  alt={t('signupPage.header')}
                />
              </div>
              <Form onSubmit={formik.handleSubmit} className="w-50">
                <h1 className="text-center mb-4">{t('signupPage.signup')}</h1>
                <Form.Group className="form-floating mb-3">
                  <Form.Control
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.username}
                    placeholder={t('signupPage.shemaUsername')}
                    name="username"
                    id="username"
                    autoComplete="username"
                    isInvalid={
                      (formik.errors.username && formik.touched.username)
                      || registrationFailed
                    }
                    required
                    ref={inputRef}
                  />
                  <FormLabel htmlFor="username">
                    {t('signupPage.username')}
                    {' '}
                  </FormLabel>
                  <Form.Control.Feedback type="invalid" tooltip placement="right">
                    {formik.errors.username || null}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="form-floating mb-3">
                  <Form.Control
                    type="password"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password}
                    placeholder={t('signupPage.shemaPassword')}
                    name="password"
                    autoComplete="new-password"
                    id="password"
                    isInvalid={
                      (formik.errors.password && formik.touched.password)
                      || registrationFailed
                    }
                    required
                  />
                  <Form.Control.Feedback type="invalid" tooltip>
                    {formik.errors.password || null}
                  </Form.Control.Feedback>
                  <Form.Label htmlFor="password">{t('signupPage.password')}</Form.Label>
                </Form.Group>
                <Form.Group className="form-floating mb-3">
                  <Form.Control
                    type="password"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.confirmPassword}
                    placeholder={t('signupPage.shemaConfirmPassword')}
                    name="confirmPassword"
                    autoComplete="new-password"
                    id="confirmPassword"
                    isInvalid={
                      (formik.errors.confirmPassword && formik.touched.confirmPassword)
                      || registrationFailed
                    }
                    required
                  />
                  <Form.Control.Feedback type="invalid" tooltip>
                    {registrationFailed
                      ? t('signupPage.repeatUser')
                      : formik.errors.confirmPassword}
                  </Form.Control.Feedback>
                  <Form.Label htmlFor="confirmPassword">{t('signupPage.confirmPassword')}</Form.Label>
                </Form.Group>
                <Button
                  type="submit"
                  variant="outline-primary"
                  className="w-100"
                >
                  {t('signupPage.registration')}
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>

  );
};

export default Signup;
