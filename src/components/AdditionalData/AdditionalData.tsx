import React, { memo, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { useCustomModal } from '../Modal/ModalHelper';

const AdditionalData = memo(() => {

    const { openModal } = useCustomModal();
    const session = useSelector((state: RootState) => state.auth.session);

    useEffect(() => {
        if (session === 'expired') {
          openModal('expiredSession')
        }
      }, [session]);
      

  return (
    <>
    </>
  );
});

export default AdditionalData;
