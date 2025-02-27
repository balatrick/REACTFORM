import { Formik, Field, Form } from 'formik';
import { useState } from 'react';

const SimpleForm = () => {
  return (
    <Formik
      initialValues={{
        userInfo: {
          name: '',
          emails: ['']  // Initial value for emails is an array with one empty string
        }
      }}
      onSubmit={values => {
        console.log(values);
      }}
    >
      {({ values, setFieldValue }) => (
        <Form>
          <div>
            <label htmlFor="name">Name:</label>
            <Field name="userInfo.name" />
          </div>
          
          <div>
            <label htmlFor="emails">Emails:</label>
            {values.userInfo.emails.map((email, index) => (
              <div key={index}>
                <Field name={`userInfo.emails[${index}]`} />
                <button
                  type="button"
                  onClick={() => {
                    // Remove an email from the array
                    const newEmails = [...values.userInfo.emails];
                    newEmails.splice(index, 1);
                    setFieldValue('userInfo.emails', newEmails);
                  }}
                >
                  Remove Email
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => {
                // Add a new empty email field to the array
                setFieldValue('userInfo.emails', [...values.userInfo.emails, '']);
              }}
            >
              Add Email
            </button>
          </div>

          <button type="submit">Submit</button>
        </Form>
      )}
    </Formik>
  );
};

export default SimpleForm;