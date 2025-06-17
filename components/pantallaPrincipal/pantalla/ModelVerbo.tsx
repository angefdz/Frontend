// ModalVerbo.tsx
import ModalConjugadorVerbo from '@/components/conjugador/ModalConjugadorVerbo';
import React from 'react';
import { Modal } from 'react-native';

interface Props {
  visible: boolean;
  verbo: string;
  onClose: () => void;
  onConfirm: (formaConjugada: string) => void;
}

export default function ModalVerbo({ visible, verbo, onClose, onConfirm }: Props) {
  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <ModalConjugadorVerbo
        visible={visible}
        verbo={verbo}
        onClose={onClose}
        onConfirm={onConfirm}
      />
    </Modal>
  );
}
