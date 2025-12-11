import styles from './Header.module.css';

export default function Header() {
  return (
    <header className={styles.header + 'container '}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <h1>UrbanVet</h1>
        </div>
        <nav className={styles.nav}>
          <a href="/" className={styles.link}>Главная</a>
          <a href="/doctors" className={styles.link}>Врачи</a>
          <a href="/about" className={styles.link}>О нас</a>
          <a href="/contact" className={styles.link}>Контакты</a>
        </nav>
      </div>
    </header>
  );
}

 