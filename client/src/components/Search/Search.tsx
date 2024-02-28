import styles from "./Search.module.css";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface ModalState {
  isOpen: boolean;
}

const SearchInput = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [modalState, setModalState] = useState<ModalState>({ isOpen: false });
  const searchInputRef = useRef<HTMLInputElement>(null);

  const router = useRouter();

  const toggleModal = (): void => {
    setModalState((prevModal) => ({ isOpen: !prevModal.isOpen }));
  };

  const onSearch = (event: React.FormEvent) => {
    event.preventDefault();

    const encodedSearchQuery = encodeURI(searchQuery);
    router.push(`/search?q=${encodedSearchQuery}`);
  };

  useEffect(() => {
    if (modalState.isOpen && searchInputRef.current) {
      searchInputRef.current.focus(); // Set focus on input field
    }
  }, [modalState.isOpen]);

  return (
    <div>
      <button className={styles.searchLogoButton} onClick={toggleModal}>
        <Image
          className={styles.searchLogoImage}
          src="/search.png"
          alt="search-logo"
          width={30}
          height={30}
        ></Image>
      </button>
      {modalState.isOpen && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <form onSubmit={onSearch}>
              <input
                placeholder="Search..."
                className={styles.input}
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                ref={searchInputRef}
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
