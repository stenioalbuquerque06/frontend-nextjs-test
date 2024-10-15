/**
 * Modal de confirmação
 *
 * - Crie um component para o modal de confirmação
 * - Utilize o código abaixo como base
 * - O modal deve ser aberto ao clicar no botão "Abrir modal de confirmação"
 * - O título deve ser "Confirmação"
 * - O conteudo deve ser dinâmico
 */

import { useState } from 'react'

import styles from '@/styles/modal.module.css'
import { Modal } from '@/components/Modal'
import { useToast } from '@/contexts/ToastContext'

export default function Home() {
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const { addToast } = useToast()

  function onClose() {
    setModalIsOpen(false)
  }

  function handleConfirm() {
    addToast('sucesso!', 'success')
    setModalIsOpen(false)
  }

  function renderModalContent() {
    return (
      <div data-modal-content className={styles['modal-confirm']}>
        <p>Tem certeza desta ação?</p>
      </div>
    )
  }

  return (
    <>
      <main className={styles.container}>
        <button type="button" onClick={() => setModalIsOpen(true)}>
          Abrir modal de confirmação
        </button>
      </main>

      <Modal
        isOpen={modalIsOpen}
        title="Confirmação"
        onClose={onClose}
        onConfirm={handleConfirm}
        footer={{ confirmText: 'Confirmar' }}
      >
        {renderModalContent()}
      </Modal>
    </>
  )
}
