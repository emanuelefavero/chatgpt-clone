import styles from '@/styles/Loader.module.scss'

export default function Loader() {
  return (
    <div className={styles.loaderContainer}>
      <span className={styles.loader}></span>
    </div>
  )
}
