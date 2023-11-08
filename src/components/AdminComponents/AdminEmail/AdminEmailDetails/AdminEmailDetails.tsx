import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  sendEmailWithProductInfo,
  sendEmailWithCollectionInfo,
  setEmailType,
  updateSubject,
  updateText,
  updateLocalization
} from '../../../../app/reducers/emailSlice';
import RadioButtonGroup from '../../../RadioButtonGroup/RadioButtonGroup';
import InputWithLanguage from '../../../Input/InputWithLanguage/InputWithLanguage';
import TextAreaWithLanguage from '../../../TextArea/TextAreaWithLanguage/TextAreaWithLanguage';
import Button from '../../../Button/Button';
import { AppDispatch, RootState } from '../../../../app/store';
import { AVAILABLE_LANGUAGES } from '../../../../constants';
import { sendNotification } from '../../../NotificationCenter/notificationHelpers';
import NotificationMessage from '../../../Messages/NotificationMessage/NotificationMessage';
import styles from './AdminEmailDetails.module.css'

const EmailForm = () => {
  const dispatch = useDispatch<AppDispatch>();
  const emailType = useSelector((state: RootState) => state.email.emailType);
  const status = useSelector((state: RootState) => state.email.status);
  const subject = useSelector((state: RootState) => state.email.subject);
  const text = useSelector((state: RootState) => state.email.text);
  const productIds = useSelector((state: RootState) => state.email.productIds);
  const collectionIds = useSelector((state: RootState) => state.email.collectionIds);
  const localization = useSelector((state: RootState) => state.email.localization);
  const currentLanguage = useSelector((state: RootState) => state.language.currentLanguage);

  // Инициализируем локальное состояние с учетом текущего языка
  const [localSubject, setLocalSubject] = useState(
    currentLanguage === 'EN' ? subject : localization[currentLanguage]?.subject || ''
  );
  const [localText, setLocalText] = useState(
    currentLanguage === 'EN' ? text : localization[currentLanguage]?.text || ''
  );

  // При изменении языка обновляем локальные значения для соответствующего поля
  const handleLanguageChange = (language: string, type: 'subject' | 'text') => {
    if (type === 'subject') {
      setLocalSubject(language === 'EN' ? subject : localization[language]?.subject || '');
    } else if (type === 'text') {
      setLocalText(language === 'EN' ? text : localization[language]?.text || '');
    }
  };

  // Обработчик отправки формы
  const handleSendEmails = () => {
      // Формируем объект данных электронной почты
      let emailData;

      switch (emailType) {
        case 'product':
          emailData = {
            subject: subject,
            text: text,
            productIds,
            localization
          };
          dispatch(sendEmailWithProductInfo(emailData)).then((result) => {
            console.log(status)
            console.log(result)
            if (status === 'succeeded') {
              sendNotification(dispatch, 'success', 'Product emails sended!');
            } else {
              sendNotification(dispatch, 'error', 'Failed to send product emails.');
            }
          });
          break;
        case 'collection':
          emailData = {
            subject: subject,
            text: text,
            collectionIds,
            localization
          };
          dispatch(sendEmailWithCollectionInfo(emailData)).then(() => {
            if (status === 'succeeded') {
              sendNotification(dispatch, 'success', 'Collections emails sended!');
            } else {
              sendNotification(dispatch, 'error', 'Failed to send collections emails.');
            }
          });
          break;
        // Добавьте дополнительные кейсы для других типов писем
        default:
          // Логика обработки по умолчанию или ошибка
          console.error("Unknown email type");
      }
  };

  const handleSubjectChange = (event: React.ChangeEvent<HTMLInputElement>, language: string) => {
    const value = event.target.value; // извлекаем value из event
    if (language === 'EN') {
      dispatch(updateSubject(value));
    } else {
      // Предполагаем, что локализация уже содержит предыдущие данные
      const currentLocalization = localization[language] || { subject: '', text: '' };
      dispatch(updateLocalization({
        language,
        subject: value,
        text: currentLocalization.text // Не изменяем текст
      }));
    }
  };

  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>, language: string) => {
    const value = event.target.value; // извлекаем value из event
    if (language === 'EN') {
      dispatch(updateText(value));
    } else {
      // Обновляем локализацию для text
      const currentLocalization = localization[language] || { text: '' };
      dispatch(updateLocalization({
        language,
        text: value,
        subject: currentLocalization.subject // Не изменяем subject
      }));
    }
  };

  return (
    <div className={styles.container}>
      <h2>Send Emails to Users</h2>
      <div className={styles.info}>
        <RadioButtonGroup
          orientation='horizontal'
          options={[
            { label: 'Product Emails', value: 'product' },
            { label: 'Collection Emails', value: 'collection' }
          ]}
          onChange={(value) => dispatch(setEmailType(value as 'product' | 'collection'))}
          selectedValue={emailType}
        />
        <InputWithLanguage
          label="Email Subject"
          placeholder="Enter subject"
          value={localSubject}
          onChange={handleSubjectChange}
          languages={AVAILABLE_LANGUAGES}
          initialLanguage={currentLanguage}
          onLanguageChange={(lang) => handleLanguageChange(lang, 'subject') }
        />
        <TextAreaWithLanguage
          label="Email Text"
          placeholder="Enter email text"
          value={localText}
          onChange={handleTextChange}
          languages={AVAILABLE_LANGUAGES}
          initialLanguage={currentLanguage}    
          onLanguageChange={(lang) => handleLanguageChange(lang, 'text') }
        />
      </div>
      <NotificationMessage type='default' iconLeft='info' message='Emails will be sent to all users who have selected the receive emails option'/>
      <Button variant='secondary' state={status === 'loading' ? 'loading' : 'default'} onClick={handleSendEmails}>SEND EMAILS</Button>
    </div>
  );
};

export default EmailForm;
