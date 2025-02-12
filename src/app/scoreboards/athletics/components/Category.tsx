import React from 'react'
import styles from '@/styles/scoreboards/athletics/category.module.css'

const Category: React.FC = () => {
  const category = [
    {
      id: 1,
      name: 'วิ่ง 100 เมตร หญิง'
    },
    {
      id: 2,
      name: 'วิ่ง 100 เมตร ชาย'
    },
    {
      id: 3,
      name: 'วิ่ง 4x100 เมตร หญิง'
    },
    {
      id: 4,
      name: 'วิ่ง 4x100 เมตร ชาย'
    }
  ]
  return (
    <>
      <div>
        <ul className={styles.container}>
          {category.map((item, id) => (
            <li
              className={`text-white mr-1 lg:mr-2 border ${styles['category-button']}`}
              key={id}>
              <button>{item.name}</button>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}
export default Category
