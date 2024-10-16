/**
 * Modal
 *
 * - O modal fecha ao clicar em qualquer elemento, resolva o problema
 */

import { useState } from 'react'

import styles from '@/styles/modal.module.css'
import { Modal } from '@/components/Modal'
import { useToast } from '@/contexts/ToastContext'

export default function Home() {
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const { addToast } = useToast()

  function handleModalConfirm() {
    setModalIsOpen(false)
    addToast('sucesso!', 'success', 5000)
  }

  function handleModalClose() {
    setModalIsOpen(false)
  }

  function renderModalContent() {
    return (
      <div data-modal-content className={styles['modal-form']}>
        <form onSubmit={() => false}>
          <div>
            <label htmlFor="input-name">Nome</label>
            <input type="text" id="input-name" placeholder="Insira um nome" />
          </div>

          <div>
            <label htmlFor="input-name">E-mail</label>
            <input type="email" id="input-email" placeholder="Insira um e-mail válido" />
          </div>
        </form>
      </div>
    )
  }

  return (
    <>
      <main className={styles.container}>
        <button type="button" onClick={() => setModalIsOpen(true)}>
          Abrir modal
        </button>
      </main>

      <Modal
        isOpen={modalIsOpen}
        title="Criar novo usuário"
        onClose={handleModalClose}
        onConfirm={handleModalConfirm}
        footer={{ confirmText: 'Criar usuário' }}
      >
        {renderModalContent()}
      </Modal>
    </>
  )
}
