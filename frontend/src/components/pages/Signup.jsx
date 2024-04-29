import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { Formik } from 'formik';
import axios from 'axios';
import {
  Button, Form, Col, Container, Card, Row, FloatingLabel,
} from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { useTranslation } from 'react-i18next';

import signupImages from '../../images/signup.jpg';
import routes from '../../utils/routes.js';
import { setCredentials } from '../../store/authSlice';

const Signup = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const inputRef = useRef();

  const onSubmitSignUp = async ({ username, password }, props) => {
    const { setErrors, setSubmitting } = props;

    try {
      const res = await axios.post(routes.createNewUser(), { username, password });
      const userData = res.data;
      dispatch(setCredentials(userData));
      navigate(routes.root());
    } catch (err) {
      setSubmitting(false);
      if (err.isAxiosError && err.response.status === 409) {
        setErrors({ username: t('signupPage.repeatUser') });
        inputRef.current.select();
        return;
      }
      toast.error(t('toastMessage.dataLoadingError'));
      throw err;
    }
  };

  const validationSchema = yup.object().shape({
    username: yup
      .string()
      .required(t('signupPage.shemaRequired'))
      .min(3, t('signupPage.shemaUsername'))
      .max(20, t('signupPage.shemaUsername')),
    password: yup
      .string()
      .required(t('signupPage.shemaRequired'))
      .min(6, t('signupPage.shemaPassword')),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password'), null], t('signupPage.shemaConfirmPassword'))
      .required(t('signupPage.shemaRequired')),
  });

  const getFormikForm = () => (
    <Formik
      validationSchema={validationSchema}
      onSubmit={onSubmitSignUp}
      initialValues={{ username: '', password: '', confirmPassword: '' }}
      validateOnChange={false}
      validateOnBlur
    >
      {({
        handleSubmit,
        handleChange,
        handleBlur,
        values,
        errors,
        touched,
        isSubmitting,
      }) => (
        <Form className="w-50" onSubmit={handleSubmit}>
          <h1 className="text-center mb-4">{t('signupPage.signup')}</h1>

          <FloatingLabel className="mb-3" controlId="username" label={t('signupPage.username')}>
            <Form.Control
              type="text"
              placeholder={t('signupPage.username')}
              value={values.username}
              onChange={handleChange}
              onBlur={handleBlur}
              isInvalid={touched.username && !!errors.username}
              ref={inputRef}
              required
              autoFocus
            />
            <Form.Control.Feedback type="invalid" tooltip>
              {touched.username && errors.username}
            </Form.Control.Feedback>
          </FloatingLabel>

          <FloatingLabel className="mb-3" controlId="password" label={t('signupPage.password')}>
            <Form.Control
              type="password"
              placeholder={t('signupPage.password')}
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              isInvalid={touched.password && !!errors.password}
              required
            />
            <Form.Control.Feedback type="invalid" tooltip>
              {touched.password && errors.password}
            </Form.Control.Feedback>
          </FloatingLabel>

          <FloatingLabel className="mb-3" controlId="confirmPassword" label={t('signupPage.confirmPassword')}>
            <Form.Control
              type="password"
              placeholder={t('signupPage.confirmPassword')}
              value={values.confirmPassword}
              onChange={handleChange}
              onBlur={handleBlur}
              isInvalid={touched.confirmPassword && !!errors.confirmPassword}
              required
            />
            <Form.Control.Feedback type="invalid" tooltip>
              {touched.confirmPassword && errors.confirmPassword}
            </Form.Control.Feedback>
          </FloatingLabel>

          <Button variant="outline-primary" type="submit" disabled={isSubmitting} className="w-100">{t('signupPage.registration')}</Button>
        </Form>
      )}
    </Formik>
  );

  return (
    <Container fluid className="h-100">
      <Row className="justify-content-center align-content-center h-100">
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
              {getFormikForm()}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Signup;
