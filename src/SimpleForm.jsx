import { Formik, Field, Form } from 'formik';
import { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker'; // Assuming you are using react-datepicker for the date picker
import "react-datepicker/dist/react-datepicker.css";

const SimpleForm = () => {
  const [counties, setCounties] = useState([]);
  const [apiData, setApiData] = useState({ county: '', date: '' });

  // Simulate API call to fetch counties and date (replace with real API call)
  useEffect(() => {
    // Example API response
    const fetchData = async () => {
      const response = await new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            counties: ['County 1', 'County 2', 'County 3'],
            date: '2025-02-27', // Example date
          });
        }, 1000);
      });

      setCounties(response.counties);
      setApiData({ county: response.counties[0], date: response.date });
    };

    fetchData();
  }, []);

  return (
    <Formik
      initialValues={{
        county: '',    // initial value for county dropdown
        date: '',      // initial value for date picker
      }}
      onSubmit={values => {
        console.log(values);  // Handle form submission
      }}
      enableReinitialize // Allow the form to reinitialize when apiData changes
    >
      {({ values, setFieldValue }) => {
        // Update form state when API data is loaded
        useEffect(() => {
          if (apiData.county && apiData.date) {
            setFieldValue('county', apiData.county);
            setFieldValue('date', new Date(apiData.date));
          }
        }, [apiData, setFieldValue]);

        return (
          <Form>
            <div>
              <label htmlFor="county">County:</label>
              <Field as="select" name="county">
                <option value="">Select a county</option>
                {counties.map((county, index) => (
                  <option key={index} value={county}>
                    {county}
                  </option>
                ))}
              </Field>
            </div>

            <div>
              <label htmlFor="date">Date:</label>
              <DatePicker
                selected={values.date}
                onChange={date => setFieldValue('date', date)}
                dateFormat="yyyy-MM-dd"
              />
            </div>

            <button type="submit">Submit</button>
          </Form>
        );
      }}
    </Formik>
  );
};

export default SimpleForm;
