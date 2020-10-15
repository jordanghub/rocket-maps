import React, { useCallback } from 'react';
import { remote } from 'electron';
import { useDispatch } from 'react-redux';
import { addNewMapAction } from 'store/thunk';
import { unwrapResult } from '@reduxjs/toolkit';
import { AppDispatch } from 'store/store';
import { PacmanLoader as Loader } from 'react-spinners';
import { Modal } from 'components/Modal';
import { useTranslation } from 'hooks/useTranslation';
import { MessagesLabelKey } from 'appConst/messages';
import {
  Form,
  Field,
  FormRenderProps,
  AnyObject,
  FieldRenderProps,
} from 'react-final-form';
import { IAddMapFormProps } from './interface';
import * as Styled from './AddMapForm.style';

export const validateFormData = ({ mapName, archivePath }: AnyObject) => {
  const errors: AnyObject = {};

  if (!mapName || (mapName && mapName.trim() === '')) {
    errors.mapName = MessagesLabelKey.NEW_MAP_FORM_ERROR_MAP_NAME_EMPTY;
  }
  if (!archivePath || (archivePath && archivePath.trim() === '')) {
    errors.archivePath = MessagesLabelKey.NEW_MAP_FORM_ERROR_ARCHIVE_PATH_EMPTY;
  }

  return errors;
};

export const AddMapFrom = ({ handleClose, isOpened }: IAddMapFormProps) => {
  const dispatch: AppDispatch = useDispatch();
  const { translate } = useTranslation();

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
          return unpackedResult;
        }
      } catch (err) {
        return false;
      }

      return false;
    },
    [dispatch]
  );

  const handleFormMapSubmit = useCallback(
    async (data: AnyObject) => {
      const result = await addMapSubmit({
        mapName: data.mapName,
        archivePath: data.archivePath,
      });

      if (result === true) {
        handleClose();

        return true;
      }

      return result;
    },
    [handleClose, addMapSubmit]
  );

  return (
    <Modal isOpened={isOpened} handleClose={handleClose} background="#393940">
      <Styled.Wrapper>
        <h2>{translate('NEW_MAP_FORM_TITLE')}</h2>
        <Form
          onSubmit={handleFormMapSubmit}
          initialValues={{ archivePath: '', mapName: '' }}
          validate={validateFormData}
          render={({ handleSubmit, submitting }: FormRenderProps) => {
            return (
              <form onSubmit={handleSubmit}>
                <Field name="mapName">
                  {({
                    input,
                    meta,
                  }: FieldRenderProps<string, HTMLInputElement>) => (
                    <label htmlFor="input-mapName">
                      <span>{translate('NEW_MAP_FORM_MAP_NAME_LABEL')}</span>
                      {!!(meta.touched && (meta.error || meta.submitError)) && (
                        <Styled.FormError
                          isError={!!(meta.error || meta.submitError)}
                        >
                          {translate(meta.error || meta.submitError)}
                        </Styled.FormError>
                      )}
                      <input
                        id="input-mapName"
                        type="text"
                        placeholder={translate(
                          'NEW_MAP_FORM_MAP_NAME_PLACEHOLDER'
                        )}
                        value={input.value}
                        onChange={input.onChange}
                      />
                    </label>
                  )}
                </Field>

                <Field name="archivePath">
                  {({
                    input,
                    meta,
                  }: FieldRenderProps<string, HTMLInputElement>) => {
                    const handlePreviewChange = async () => {
                      try {
                        const result = await remote.dialog.showOpenDialog({
                          properties: ['openFile'],
                          filters: [{ name: 'Archive', extensions: ['zip'] }],
                        });

                        if (result.canceled) {
                          return;
                        }

                        input.onChange(result.filePaths[0]);

                        // eslint-disable-next-line no-empty
                      } catch (err) {}
                    };
                    return (
                      <label htmlFor="input-filePath">
                        <span>{translate('NEW_MAP_FORM_ARCHIVE_LABEL')}</span>
                        {!!(
                          meta.touched &&
                          (meta.error || meta.submitError)
                        ) && (
                          <Styled.FormError
                            isError={!!(meta.error || meta.submitError)}
                          >
                            {translate(meta.error || meta.submitError)}
                          </Styled.FormError>
                        )}

                        <small style={{ margin: '0 0 1rem 0' }}>
                          {input.value !== ''
                            ? input.value
                            : translate('NEW_MAP_FORM_NO_PATH_SELECTED')}
                        </small>

                        <Styled.ChooseFileButton
                          onClick={handlePreviewChange}
                          type="button"
                        >
                          {translate('NEW_MAP_FORM_CHOOSE_FILE')}
                        </Styled.ChooseFileButton>
                        <input
                          id="input-filePath"
                          type="hidden"
                          value={input.value}
                        />
                      </label>
                    );
                  }}
                </Field>

                <Styled.SubmitButton type="submit" disabled={submitting}>
                  {submitting ? (
                    <Styled.Loader>
                      <Loader color="orange" size="15px" />
                    </Styled.Loader>
                  ) : (
                    <span>{translate('NEW_MAP_FORM_SUBMIT_BUTTON')}</span>
                  )}
                </Styled.SubmitButton>
              </form>
            );
          }}
        />
      </Styled.Wrapper>
    </Modal>
  );
};
