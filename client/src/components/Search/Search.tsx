import styles from "./Search.module.css";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface ModalState {
  isOpen: boolean;
}

const SearchInput = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [modalState, setModalState] = useState<ModalState>({ isOpen: false });

  const router = useRouter();

  const toggleModal = (): void => {
    setModalState((prevModal) => ({ isOpen: !prevModal.isOpen }));
  };

  const onSearch = (event: React.FormEvent) => {
    event.preventDefault();

    const encodedSearchQuery = encodeURI(searchQuery);
    router.push(`/search?q=${encodedSearchQuery}`);
  };

  return (
    <div>
      <button onClick={toggleModal}>Search</button>
      {modalState.isOpen && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <form onSubmit={onSearch}>
              <input
                placeholder="Search..."
                className={styles.input}
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
              />
            </form>
            <button className={styles.closeButton} onClick={toggleModal}>
              &times;
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchInput;
