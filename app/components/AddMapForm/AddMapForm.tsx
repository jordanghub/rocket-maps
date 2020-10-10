import React, { ChangeEvent, FormEvent, useCallback, useState } from 'react';
import { remote } from 'electron';
import { useDispatch } from 'react-redux';
import { addNewMapAction } from 'store/thunk';
import { Transition } from 'react-transition-group';
import { unwrapResult } from '@reduxjs/toolkit';
import { AppDispatch } from 'index';
import { PacmanLoader as Loader } from 'react-spinners';
import { IAddMapFormProps } from './interface';
import * as Styled from './AddMapForm.style';

interface IFormErrors {
  mapName?: string;
  archivePath?: string;
}

interface IFormInput {
  name: string;
  value: any;
  touched: boolean;
  error: string;
}

interface IFormValues {
  [key: string]: IFormInput;
}

interface IChangeInputDataProps {
  name?: string;
  value: any;
  touched?: boolean;
  error?: string;
}

interface IChangeInputValue {
  key: string;
  data: IChangeInputDataProps;
}

const validateFormData = ({ mapName, archivePath }: IFormErrors) => {
  const errors: IFormErrors = {};
  if (!mapName || (mapName && mapName.trim() === '')) {
    errors.mapName = 'Le nom de la map ne doit pas être vide';
  }
  if (!archivePath || (archivePath && archivePath.trim() === '')) {
    errors.archivePath = "Le chemin vers l'archive ne doit pas être vide";
  }

  return errors;
};

const initialFormValues: IFormValues = {
  mapName: {
    name: 'mapName',
    value: '',
    touched: false,
    error: '',
  },
  archivePath: {
    name: 'archivePath',
    value: '',
    touched: false,
    error: '',
  },
};

export const AddMapFrom = ({ handleClose, isOpened }: IAddMapFormProps) => {
  const [formValues, changeFormValues] = useState(initialFormValues);
  const [isFormSubmitted, changeIsFormSubmitted] = useState(false);
  const [isFormSubmitting, changeisFormSubmitting] = useState(false);
  const [formErrors, changeFormErrors] = useState<IFormErrors>({});

  const handleFormValueChange = useCallback(
    ({ key, data }: IChangeInputValue) => {
      const formData = Object.entries(formValues);

      const values: any = {};

      formData.forEach(([itemKey, itemData]) => {
        values[itemKey] = key === itemKey ? data.value : itemData.value;
      });

      const newFormValues = {
        ...formValues,
        [key]: {
          ...formValues[key],
          touched: true,
          ...data,
        },
      };
      changeFormValues(newFormValues);
      changeFormErrors(validateFormData(values));
    },
    [formValues]
  );

  const dispatch: AppDispatch = useDispatch();

  const addMapSubmit = useCallback(
    async (payload) => {
      try {
        const result = await dispatch(addNewMapAction(payload));
        const unpackedResult = unwrapResult(result);

        if (unpackedResult === true) {
          return true;
        }

        if (
          unpackedResult &&
          (unpackedResult.mapName || unpackedResult.archivePath)
        ) {
          changeFormErrors(unpackedResult);
        }
      } catch (err) {
        return false;
      }

      return false;
    },
    [dispatch]
  );

  const handleSubmit = useCallback(
    async (evt: FormEvent<HTMLFormElement>) => {
      if (isFormSubmitting) {
        return;
      }
      evt.preventDefault();

      changeIsFormSubmitted(true);
      changeisFormSubmitting(true);

      const errors = validateFormData({
        mapName: formValues.mapName.value,
        archivePath: formValues.archivePath.value,
      });

      if (errors.mapName || errors.archivePath) {
        changeFormErrors(errors);
        changeisFormSubmitting(false);
        return;
      }

      const result = await addMapSubmit({
        mapName: formValues.mapName.value,
        archivePath: formValues.archivePath.value,
      });

      changeisFormSubmitting(false);
      if (result) {
        changeFormValues(initialFormValues);
        changeIsFormSubmitted(false);
        handleClose();
      }
    },
    [formValues, isFormSubmitting, handleClose, addMapSubmit]
  );

  const handleMapNameChange = useCallback(
    (evt: ChangeEvent<HTMLInputElement>) => {
      handleFormValueChange({
        key: 'mapName',
        data: {
          value: evt.target.value,
        },
      });
    },
    [handleFormValueChange]
  );

  const handleChooseFileButtonClick = useCallback(async () => {
    try {
      const result = await remote.dialog.showOpenDialog({
        properties: ['openFile'],
        filters: [{ name: 'Archive', extensions: ['zip'] }],
      });

      if (result.canceled) {
        return;
      }
      handleFormValueChange({
        key: 'archivePath',
        data: {
          value: result.filePaths[0],
        },
      });
      // eslint-disable-next-line no-empty
    } catch (err) {}
  }, [handleFormValueChange]);

  return (
    <Transition in={isOpened} mountOnEnter unmountOnExit timeout={300}>
      {(animationState: string) => (
        <Styled.ModalWrapper animationState={animationState}>
          <Styled.ModalBackground onClick={handleClose} />

          <Styled.ModalContent>
            <Styled.Wrapper>
              <h2>Ajouter une nouvelle map</h2>

              <form onSubmit={handleSubmit}>
                <label htmlFor="input-mapName">
                  <span>Nom de la map à ajouter</span>
                  {(formValues.mapName.touched || isFormSubmitted) &&
                    formErrors.mapName && (
                      <Styled.FormError isError={!!formErrors.mapName}>
                        {formErrors.mapName}
                      </Styled.FormError>
                    )}
                  <input
                    id="input-mapName"
                    type="text"
                    placeholder="Nom de la map"
                    value={formValues.mapName.value}
                    onChange={handleMapNameChange}
                  />
                </label>

                <label htmlFor="input-filePath">
                  <span>
                    Chemin de l'archive contenant la map (celle téléchargée sur
                    le site au dessus)
                  </span>
                  {(formValues.archivePath.touched || isFormSubmitted) &&
                    formErrors.archivePath && (
                      <Styled.FormError isError={!!formErrors.archivePath}>
                        {formErrors.archivePath}
                      </Styled.FormError>
                    )}

                  <Styled.ChooseFileButton
                    onClick={handleChooseFileButtonClick}
                    type="button"
                  >
                    Choisir le fichier
                  </Styled.ChooseFileButton>
                  <input
                    id="input-filePath"
                    type="hidden"
                    value={formValues.archivePath.value}
                  />
                </label>

                <Styled.SubmitButton type="submit" disabled={isFormSubmitting}>
                  {isFormSubmitting ? (
                    <Styled.Loader>
                      <Loader color="orange" size="15" />
                    </Styled.Loader>
                  ) : (
                    <span>Ajouter</span>
                  )}
                </Styled.SubmitButton>
              </form>
            </Styled.Wrapper>
          </Styled.ModalContent>
        </Styled.ModalWrapper>
      )}
    </Transition>
  );
};
