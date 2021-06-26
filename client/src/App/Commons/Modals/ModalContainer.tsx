import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { Modal } from "semantic-ui-react";
import { RootStoreContext } from "../../stores/RootStore";

const ModalContainer = () => {
  const rootStore = useContext(RootStoreContext);
  const {
    modal: { open, content },
    closeModal,
  } = rootStore.modalStore;

  return (
    <Modal size="mini" open={open} onClose={closeModal}>
      <Modal.Content>{content}</Modal.Content>
    </Modal>
  );
};

export default observer(ModalContainer);
