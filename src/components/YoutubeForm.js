import { Formik, Form, Field, ErrorMessage, FieldArray, FastField } from 'formik';
import * as Yup from 'yup';
import TextError from './TextError'

const initialValues = {
  name: '',
  email: '',
  channel: '',
  comments: '',
  address: '',
  social: {
    facebook: '',
    twitter: ''
  },
  phoneNumbers: ['', ''],
  phNumbers: ['']
}

const onSubmit = values => {
  console.log(values)
}

const validationSchema = Yup.object({
  name: Yup
    .string()
    .required('Required'),
  email: Yup
    .string()
    .required('Required')
    .email('Invalid email format'),
  channel: Yup
    .string()
    .required('Required'),
  address: Yup
    .string()
    .required('Required')
})

const YoutubeForm = () => {
  return ( 
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
      validateOnChange={false} // Prevent Validation to run when onChange event is triggered
      validateOnBlur={false} // Prevent Validation to run when onBlur event is triggered
    >
      <Form>
        <div className="form-control">
          <label htmlFor="name">Name</label>
          <Field
            type="text"
            id="name"
            name="name"
          />
          <ErrorMessage name="name" component={TextError}/>
        </div>

        <div className="form-control">
          <label htmlFor="email">E-mail</label>
          <Field
            type="email"
            id="email"
            name="email"
          />
          <ErrorMessage name="email">
            {(errorMsg) => <div className="error">{errorMsg}</div>}
          </ErrorMessage>
        </div>

        <div className="form-control">
          <label htmlFor="channel">Channel</label>
          <Field
            type="text"
            id="channel"
            name="channel"
            placeholder="Youtube channel name"
          />
          <ErrorMessage name="channel"/>
        </div>

        <div className="form-control">
          <label htmlFor="comments">Comments</label>
          <Field
            as="textarea"
            id="comments"
            name="comments"
          />
        </div>

        <div className="form-control">
          <label htmlFor="address">Address</label>
          <FastField name="address">
            {
              ({field, form, meta}) => {
                console.log("Field render")
                // <Field> runs whenever any Field element onChange
                // <FastField> only runs whenever the Field element onChange
                return (
                  <div>
                    <input type="text" id="address" {...field}/>
                    {
                      meta.touched && meta.error ?
                      <div>{meta.error}</div>
                      :
                      null
                    }
                  </div>
                )
              }
            }
          </FastField>
        </div>

        <div className="form-control">
          <label htmlFor="facebook">Facebook profile</label>
          <Field type="text" id="facebook" name="social.facebook"/>
        </div>

        <div className="form-control">
          <label htmlFor="twitter">Twitter profile</label>
          <Field type="text" id="twitter" name="social.twitter"/>
        </div>

        <div className="form-control">
          <label htmlFor="primaryPh">Primary phone number</label>
          <Field type="text" id="primaryPh" name="phoneNumbers[0]"/>
        </div>

        <div className="form-control">
          <label htmlFor="secondaryPh">Secondary phone number</label>
          <Field type="text" id="secondaryPh" name="phoneNumbers[1]"/>
        </div>

        <div className="form-control">
          <label>List of phone numbers</label>
          <FieldArray name="phNumbers">
            {
              (fieldArrayProps) => {
                const { push, remove, form } = fieldArrayProps
                const { values } = form
                const { phNumbers } = values
                console.log("Form errors", form.errors) // Validation run when one of the form's events are triggered
                return (
                  <div>
                    {phNumbers.map((phNumber, index) => (
                      <div key={index}>
                        <Field name={`phNumbers[${index}]`}/>
                        {
                          index > 0 && 
                          <button type="button" onClick={() => remove(index)}> - </button>
                        }
                        <button type="button" onClick={() => push("")}> + </button>
                      </div>
                    ))}
                  </div>
                )
              }
            }
          </FieldArray>
        </div>

        <button type="submit">Submit</button>
      </Form>
    </Formik>
  );
}
 
export default YoutubeForm;