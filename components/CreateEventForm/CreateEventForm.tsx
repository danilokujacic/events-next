import { UserProfile } from '@auth0/nextjs-auth0';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { FunctionComponent, MouseEvent, useEffect, useState } from 'react';
import { Button, Toast, ToastContainer } from 'react-bootstrap';
import illustration from '../../assets/register_illustration.svg';
import getEntity from '../../utils/Auth0/getEntity';
import FormContext from '../../helpers/formContext';
import Date from '../Form/Date';
import Dropdown from '../Form/Dropdown';
import Input from '../Form/Input';
import Select from '../Form/Select/Select';
import Textarea from '../Form/Textarea';
import styles from './CreateEventForm.module.scss';
import { submitForm } from '../../utils/CreateEventForm/actions';

const initialState = {
  title: '',
  files: [],
  description: '',
  startDate: '',
  endDate: '',
  usersInvolved: [],
};

const CreateEventForm: FunctionComponent<{ user: any }> = ({
  user: currentUser,
}) => {
  const [inputs, setInputs] = useState<{ [key: string]: any }>(initialState);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [showToast, setShowToast] = useState<boolean | string>(false);
  const [submitDisabled, setSubmitDisabled] = useState<boolean>(true);
  const [users, setUsers] = useState<{ label: string; value: string }[]>([]);

  useEffect(() => {
    (async () => {
      const auth0users = await getEntity('users');
      setUsers(
        auth0users
          .map((user: UserProfile) => ({
            value: user.nickname,
            label: user.name,
          }))
          .filter(
            (user: { label: string; value: string }) =>
              user.value !== currentUser.nickname,
          ),
      );
      setSubmitDisabled(false);
    })();
  }, []);

  const router = useRouter();

  const resetForm = () => {
    setInputs(initialState);
  };

  const disableButtons = (reverse = false) => [
    setSubmitDisabled(reverse ? false : true),
  ];

  const handleSubmit = async (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    const data = await submitForm(inputs, disableButtons);

    if (typeof data === 'object' && data.invalid) {
      return setErrors(data.errors);
    }

    if (typeof data === 'string') {
      setShowToast(data);

      await setTimeout(() => {
        router.push('/');
      }, 3000);
    }
  };

  const handleFiles = (name: string, files: File[]) => {
    setInputs({ ...inputs, [name]: files });
  };
  const handleInputChange = (name: string, value: string) => {
    setInputs({ ...inputs, [name]: value });
  };
  return (
    <div
      className={`${styles['form-container']} d-flex w-75 m-auto mt-5 shadow-lg`}>
      <div className={styles['form-image-holder']}>
        <Image src={illustration} />
      </div>
      <div className={styles['form-inputs']}>
        <form>
          <FormContext.Provider value={{ values: inputs, errors }}>
            <Input
              required
              onInputChange={handleInputChange}
              name='title'
              label='Title'
            />
            <Dropdown
              required
              name='files'
              label='Import event images'
              multiple
              onRemove={handleFiles}
              onDrop={handleFiles}
            />
            <Textarea
              required
              name='description'
              onInputChange={handleInputChange}
              label='Description'
            />
            <div className='w-full d-flex'>
              <Date
                required
                className={styles['form-date-element']}
                label='Start date'
                id='startDate'
                value={inputs.startDate || ''}
                name='startDate'
                onInputChange={handleInputChange}
              />
              <Date
                required
                className={styles['form-date-element']}
                label='End date'
                id='endDate'
                value={inputs.endDate || ''}
                name='endDate'
                onInputChange={handleInputChange}
              />
            </div>
            {users ? (
              <Select
                required
                multiple
                name='usersInvolved'
                onInputChange={handleInputChange}
                label='Select people'
                options={users}
                id='selectPeople'
              />
            ) : (
              <></>
            )}

            <div className='d-flex mt-4 justify-content-end'>
              <Button
                disabled={submitDisabled}
                color='primary'
                className={styles['form-action-button']}
                type='button'
                variant='outline-primary'
                onClick={resetForm}>
                Reset
              </Button>
              <Button
                disabled={submitDisabled}
                color='primary'
                className={`${styles['form-action-button']} ${
                  submitDisabled ? styles['button-loading'] : ''
                }`}
                type='button'
                onClick={handleSubmit}>
                <span>Submit</span>
                {submitDisabled ? (
                  <span
                    className='spinner-border spinner-border-sm'
                    role='status'
                    aria-hidden='true'></span>
                ) : (
                  <></>
                )}
              </Button>
            </div>
          </FormContext.Provider>
        </form>
      </div>
      <ToastContainer className='p-3' position='bottom-end'>
        <Toast bg='primary' show={!!showToast}>
          <Toast.Body className={styles['toast-text']}>
            Event Test successfully created!
          </Toast.Body>
        </Toast>
      </ToastContainer>
    </div>
  );
};

export default CreateEventForm;
